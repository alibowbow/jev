/* Jev Atlas: static catalogue, browser-local bookmarks, on-demand media. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const data = window.JEV_ATLAS;
  if (!data) {
    $('cards').textContent = '목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';
    return;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  const paths = {
    search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    bookmark: 'M6 4h12v17l-6-4-6 4z',
    close: 'M6 6l12 12M6 18 18 6',
    play: 'M8 5l11 7-11 7z',
    share: 'M15 3h6v6m0-6L10 14M11 4H4v16h16v-7'
  };
  function icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', paths[name] || paths.play);
    svg.append(path);
    return svg;
  }
  document.querySelectorAll('[data-icon]').forEach(node => node.replaceChildren(icon(node.dataset.icon)));

  // Only catalogue publishers are used for links and media. Never insert HTML from data.
  function safeUrl(value, hosts) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password && hosts.includes(url.hostname) ? url.href : null;
    } catch { return null; }
  }
  function externalLink(label, value) {
    const link = element('a', '', label);
    const url = safeUrl(value, ['x.com', 'github.com', 'madewithjev.com']);
    if (url) link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  function button(className, label, action, id) {
    const node = element('button', className);
    node.type = 'button';
    node.setAttribute('aria-label', label);
    node.dataset[action] = id;
    return node;
  }

  const categoryMap = new Map(data.categories.map(c => [c.id, c]));
  const caseMap = new Map(data.cases.map(c => [c.id, c]));
  const validIds = new Set(caseMap.keys());
  const storageKey = 'jev-atlas:saved:v1';
  function readSaved(raw) {
    try {
      const values = JSON.parse(raw || '[]');
      return new Set(Array.isArray(values) ? values.filter(id => validIds.has(id)) : []);
    } catch { return new Set(); }
  }
  let saved = new Set();
  try { saved = readSaved(localStorage.getItem(storageKey)); } catch { /* Storage is optional. */ }
  const state = { category: 'all', query: '', sort: 'curated', savedOnly: false };
  const normalize = value => String(value).normalize('NFKC').toLocaleLowerCase('ko');
  const searchIndex = new Map(data.cases.map(c => [c.id, normalize([
    c.title, c.summary, c.author, c.handle, categoryMap.get(c.category).name,
    ...c.metrics.map(m => `${m.value} ${m.label}`), ...(c.keywords || [])
  ].join(' '))]));
  let toastTimer;
  function notify(message) {
    $('toast').textContent = message;
    $('toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2800);
  }
  function updateSavedUI() {
    $('saved-count').textContent = String(saved.size);
    $('saved-toggle').setAttribute('aria-pressed', String(state.savedOnly));
    document.querySelectorAll('[data-save]').forEach(node => {
      const on = saved.has(node.dataset.save);
      node.setAttribute('aria-pressed', String(on));
      node.setAttribute('aria-label', `${caseMap.get(node.dataset.save).title} ${on ? '저장 취소' : '저장'}`);
    });
  }
  function renderCategories() {
    for (const category of [{ id: 'all', name: '전체' }, ...data.categories]) {
      const node = button('category', category.name, 'category', category.id);
      node.append(element('span', '', category.name), element('span', 'category-count', String(
        category.id === 'all' ? data.cases.length : data.cases.filter(c => c.category === category.id).length
      )));
      $('categories').append(node);
    }
  }
  function card(c) {
    const article = element('article', 'card');
    article.id = `case-${c.id}`;
    article.dataset.id = c.id;
    const head = element('div', 'card-head');
    const top = element('div', 'card-top');
    const save = button('save-button', `${c.title} 저장`, 'save', c.id);
    save.append(icon('bookmark'));
    top.append(element('span', 'category-label', categoryMap.get(c.category).name),
      element('span', 'card-number', String(data.cases.indexOf(c) + 1).padStart(2, '0')), save);
    head.append(top, element('h2', '', c.title), element('p', 'summary', c.summary));
    const preview = button('media-preview', `${c.title} 영상 보기`, 'play', c.id);
    const poster = safeUrl(c.media.poster, ['pbs.twimg.com', 'raw.githubusercontent.com']);
    if (poster) {
      const img = element('img');
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => preview.classList.add('image-failed'), { once: true });
      img.src = poster;
      preview.append(img);
    } else preview.classList.add('image-failed');
    preview.append(element('span', 'image-fallback', '미리보기 없이 영상 열기'), element('span', 'media-shade'));
    const play = element('span', 'play-circle');
    play.append(icon('play'));
    const mediaBottom = element('span', 'media-bottom');
    mediaBottom.append(element('span', 'video-label', c.media.type === 'x' ? 'X에서 공개한 시연' : '공개 시연 영상'),
      element('span', 'media-credit', c.author));
    preview.append(play, mediaBottom);
    const bottom = element('div', 'card-bottom');
    const metrics = element('div', 'metrics');
    for (const m of c.metrics) {
      const metric = element('div', 'metric');
      metric.append(element('strong', '', m.value), element('span', '', m.label));
      metrics.append(metric);
    }
    const footer = element('div', 'card-footer');
    const actions = element('div', 'card-actions');
    if (c.code) actions.append(externalLink('코드 ↗', c.code));
    actions.append(externalLink('원본 ↗', c.source));
    const share = button('share-button', `${c.title} 링크 복사`, 'share', c.id);
    share.append(icon('share'));
    actions.append(share);
    footer.append(element('span', 'author-mark', Array.from(c.author)[0]), element('span', 'author', c.author), actions);
    bottom.append(metrics, element('p', 'metric-disclosure', '제작자 공개 시연 · 독립 재현 아님'), footer);
    article.append(head, preview, bottom);
    return article;
  }
  function render() {
    const words = normalize(state.query).trim().split(/\s+/).filter(Boolean);
    const items = data.cases.filter(c => (state.category === 'all' || c.category === state.category) &&
      (!state.savedOnly || saved.has(c.id)) && words.every(word => searchIndex.get(c.id).includes(word)));
    if (state.sort === 'title') items.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    $('cards').replaceChildren(...items.map(card));
    $('empty').hidden = items.length > 0;
    $('empty-title').textContent = state.savedOnly && !saved.size ? '아직 저장한 사례가 없습니다.' : '일치하는 사례가 없습니다.';
    $('empty-text').textContent = state.savedOnly && !saved.size ? '카드의 북마크 버튼으로 관심 있는 사례를 모아 보세요.' : '검색어를 바꾸거나 다른 분야를 선택해 보세요.';
    const label = state.category === 'all' ? '전체' : categoryMap.get(state.category).name;
    $('result-status').replaceChildren(document.createTextNode(`${label}${state.savedOnly ? ' · 저장한 사례' : ''} `),
      element('b', '', String(items.length)), document.createTextNode('개 사례'));
    $('reset').hidden = state.category === 'all' && !state.query && !state.savedOnly && state.sort === 'curated';
    document.querySelectorAll('[data-category]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.category === state.category)));
    updateSavedUI();
  }
  function reset() {
    Object.assign(state, { category: 'all', query: '', sort: 'curated', savedOnly: false });
    $('search').value = '';
    $('sort').value = 'curated';
    render();
  }
  function toggleSave(id) {
    if (!validIds.has(id)) return;
    const had = saved.has(id);
    had ? saved.delete(id) : saved.add(id);
    let persisted = true;
    try { localStorage.setItem(storageKey, JSON.stringify([...saved])); } catch { persisted = false; }
    if (state.savedOnly) {
      render();
      ($('cards').querySelector('[data-save]') || $('empty-reset')).focus({ preventScroll: true });
    } else updateSavedUI();
    notify(persisted ? (had ? '저장한 사례에서 제거했습니다.' : '이 브라우저에 저장했습니다.') : '이 창에만 반영했습니다. 브라우저 저장소를 사용할 수 없습니다.');
  }
  async function shareCase(id) {
    if (!validIds.has(id)) return;
    const url = new URL(location.href);
    url.hash = `case=${id}`;
    try {
      await navigator.clipboard.writeText(url.href);
      notify('사례 링크를 복사했습니다.');
    } catch {
      let field = $('share-link');
      if (!field) {
        field = element('input', 'share-link');
        field.id = 'share-link';
        field.readOnly = true;
        field.setAttribute('aria-label', '사례 링크 — 선택하여 복사');
        $('cards').before(field);
      }
      field.value = url.href;
      field.focus();
      field.select();
      notify('선택된 링크를 직접 복사해 주세요.');
    }
  }

  const player = $('player-dialog');
  const about = $('about-dialog');
  let activeCase = null;
  let playerEpoch = 0;
  let playerTimer;
  let widgetsPromise = null;
  let mediaCleanup = () => {};
  const previousFocus = new Map();
  function openDialog(dialog) {
    if (dialog.open) return;
    previousFocus.set(dialog, document.activeElement);
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    dialog.querySelector('button').focus({ preventScroll: true });
  }
  function stopPlayer() {
    ++playerEpoch;
    clearTimeout(playerTimer);
    mediaCleanup();
    mediaCleanup = () => {};
    $('player-host').querySelectorAll('video').forEach(video => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
    $('player-host').replaceChildren();
  }
  const isCurrent = epoch => epoch === playerEpoch && player.open;
  function failedPlayer(epoch) {
    if (!isCurrent(epoch)) return;
    stopPlayer();
    $('player-host').append(element('p', 'player-placeholder', '영상을 불러오지 못했습니다.'));
    $('player-status').textContent = '영상 로딩이 지연되거나 재생할 수 없습니다. 영상 파일이나 원본을 열거나 다시 불러와 주세요.';
    $('retry-player').hidden = false;
  }
  function loadWidgets() {
    if (window.twttr?.widgets?.createTweet) return Promise.resolve(window.twttr);
    if (widgetsPromise) return widgetsPromise;
    widgetsPromise = new Promise((resolve, reject) => {
      const script = element('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      let settled = false;
      const finish = error => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        if (error) { script.remove(); reject(error); } else resolve(window.twttr);
      };
      const timer = setTimeout(() => finish(new Error('Widget timeout')), 12000);
      script.onerror = () => finish(new Error('Widget unavailable'));
      script.onload = () => window.twttr?.widgets?.createTweet ? finish() : finish(new Error('Widget API unavailable'));
      document.head.append(script);
    }).catch(error => { widgetsPromise = null; throw error; });
    return widgetsPromise;
  }
  async function startPlayer(c) {
    stopPlayer();
    const epoch = playerEpoch;
    const host = $('player-host');
    host.classList.toggle('x-host', c.media.type === 'x');
    $('retry-player').hidden = true;
    $('player-status').textContent = '영상을 불러오는 중입니다…';
    const placeholder = element('div', 'player-placeholder');
    placeholder.append(element('span', 'loader'), document.createTextNode('공개 시연을 불러오고 있습니다.'));
    host.append(placeholder);
    // First-time publisher CDN requests can take longer than a cached embed.
    playerTimer = setTimeout(() => failedPlayer(epoch), c.media.type === 'mp4' ? 45000 : 18000);
    if (c.media.type === 'mp4') {
      const url = safeUrl(c.media.url, ['raw.githubusercontent.com', 'video.twimg.com']);
      if (!url || !new URL(url).pathname.endsWith('.mp4')) { failedPlayer(epoch); return; }
      const video = element('video');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', `${c.title} 시연 영상`);
      const ready = () => {
        if (!isCurrent(epoch)) return;
        clearTimeout(playerTimer);
        $('player-status').textContent = '재생 버튼을 눌러 영상을 볼 수 있습니다.';
      };
      const error = () => failedPlayer(epoch);
      video.addEventListener('loadedmetadata', ready);
      video.addEventListener('error', error);
      mediaCleanup = () => {
        video.removeEventListener('loadedmetadata', ready);
        video.removeEventListener('error', error);
      };
      video.src = url;
      host.replaceChildren(video);
      // Native controls work even when autoplay is denied by browser policy.
      video.play().catch(() => {});
      return;
    }
    if (c.media.type !== 'x' || !/^\d{15,22}$/.test(c.media.id)) { failedPlayer(epoch); return; }
    try {
      const twitter = await loadWidgets();
      if (!isCurrent(epoch)) return;
      const mount = element('div', 'tweet-mount');
      // Each request owns its container. Late widget callbacks cannot replace a newer player.
      host.append(mount);
      const tweet = await twitter.widgets.createTweet(c.media.id, mount, { dnt: true, conversation: 'none', theme: 'light', lang: 'ko' });
      if (!isCurrent(epoch)) { mount.remove(); return; }
      if (!tweet) { failedPlayer(epoch); return; }
      clearTimeout(playerTimer);
      placeholder.remove();
      $('player-status').textContent = 'X 게시물의 재생 버튼을 눌러 주세요. 재생이 안 되면 원본에서 볼 수 있습니다.';
    } catch { failedPlayer(epoch); }
  }
  function openPlayer(id) {
    const c = caseMap.get(id);
    if (!c) return;
    activeCase = c;
    $('player-title').textContent = c.title;
    $('player-category').textContent = categoryMap.get(c.category).name;
    $('player-note').textContent = c.note;
    const source = safeUrl(c.source, ['x.com', 'github.com']);
    if (source) $('player-source').href = source;
    else $('player-source').removeAttribute('href');
    const file = c.media.type === 'mp4' && safeUrl(c.media.url, ['raw.githubusercontent.com', 'video.twimg.com']);
    const fileLink = $('player-file');
    fileLink.hidden = !file;
    if (file) fileLink.href = file;
    else fileLink.removeAttribute('href');
    openDialog(player);
    startPlayer(c);
  }
  for (const dialog of [player, about]) {
    dialog.addEventListener('close', () => {
      if (dialog === player) { stopPlayer(); activeCase = null; }
      if (!player.open && !about.open) document.body.classList.remove('modal-open');
      const focus = previousFocus.get(dialog);
      if (focus?.isConnected) focus.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    });
  }
  $('close-player').addEventListener('click', () => player.close());
  $('retry-player').addEventListener('click', () => { if (activeCase) startPlayer(activeCase); });
  $('about').addEventListener('click', () => openDialog(about));
  $('close-about').addEventListener('click', () => about.close());
  $('cards').addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.save) toggleSave(target.dataset.save);
    if (target.dataset.play) openPlayer(target.dataset.play);
    if (target.dataset.share) shareCase(target.dataset.share);
  });
  $('categories').addEventListener('click', event => {
    const target = event.target.closest('[data-category]');
    if (!target) return;
    state.category = target.dataset.category;
    render();
  });
  $('search').addEventListener('input', event => { state.query = event.target.value; render(); });
  $('sort').addEventListener('change', event => { state.sort = event.target.value; render(); });
  $('saved-toggle').addEventListener('click', () => {
    const next = !state.savedOnly;
    reset();
    state.savedOnly = next;
    render();
  });
  $('reset').addEventListener('click', () => { reset(); $('search').focus(); });
  $('empty-reset').addEventListener('click', () => { reset(); $('search').focus(); });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !player.open && !about.open &&
        !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
      event.preventDefault();
      $('search').focus();
    }
  });
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    saved = readSaved(event.newValue);
    if (state.savedOnly) render(); else updateSavedUI();
  });
  function readHash() {
    if (!location.hash.startsWith('#case=')) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(6)); } catch { notify('올바르지 않은 사례 링크입니다.'); return; }
    if (!validIds.has(id)) { notify('이 사례 링크를 찾을 수 없습니다.'); return; }
    reset();
    const article = $(`case-${id}`);
    article.classList.add('highlight');
    article.scrollIntoView({ block: 'center', behavior: 'instant' });
    article.querySelector('[data-play]').focus({ preventScroll: true });
    // A shared link highlights its card; third-party players still require a click.
  }
  window.addEventListener('hashchange', readHash);
  $('total-count').textContent = String(data.cases.length);
  renderCategories();
  render();
  readHash();
})();
