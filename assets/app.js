/* AI Showcase: static catalogue, browser-local bookmarks, on-demand media. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const data = window.FABLE_ATLAS || window.ASTRA_HTML_ATLAS || window.OPUS_HTML_ATLAS || window.ASTRA_ATLAS || window.OPUS_ATLAS || window.JEV_ATLAS;
  if (!data) {
    $('cards').textContent = '목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요.';
    return;
  }
  const htmlCollection = data.kind === 'html-collection';

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
    const url = safeUrl(value, linkHosts);
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

  const linkHosts = data.linkHosts || ['x.com', 'github.com', 'madewithjev.com'];
  const posterHosts = data.posterHosts || ['pbs.twimg.com', 'raw.githubusercontent.com'];
  const categoryMap = new Map(data.categories.map(c => [c.id, c]));
  const caseMap = new Map(data.cases.map(c => [c.id, c]));
  const validIds = new Set(caseMap.keys());
  const storageKey = data.storageKey || 'jev-atlas:saved:v1';
  function readSaved(raw) {
    try {
      const values = JSON.parse(raw || '[]');
      return new Set(Array.isArray(values) ? values.filter(id => validIds.has(id)) : []);
    } catch { return new Set(); }
  }
  let saved = new Set();
  try { saved = readSaved(localStorage.getItem(storageKey)); } catch { /* Storage is optional. */ }
  const state = { category: 'all', query: '', sort: 'curated', savedOnly: false, format: 'all' };
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
      element('span', 'card-number', c.number || String(data.cases.indexOf(c) + 1).padStart(2, '0')), save);
    head.append(top, element('h2', '', c.title), element('p', 'summary', c.summary));
    const media = element('div', 'card-media');
    const playable = c.media.type === 'mp4';
    const preview = playable ? button('media-preview', `${c.title} 영상 재생`, 'play', c.id) : externalLink('', c.demo || c.source);
    preview.className = 'media-preview';
    if (c.media.type === 'svg') preview.dataset.animated = 'true';
    if (playable) {
      preview.setAttribute('aria-expanded', 'false');
      preview.setAttribute('aria-controls', 'inline-player');
    } else preview.setAttribute('aria-label', `${c.title} ${htmlCollection ? '작품 실행' : c.demo ? '데모 열기' : '원본 열기'}`);
    const poster = safeUrl(c.media.poster, posterHosts);
    if (poster) {
      const img = element('img');
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => preview.classList.add('image-failed'), { once: true });
      img.src = poster;
      preview.append(img);
    } else preview.classList.add('image-failed');
    preview.append(element('span', 'image-fallback', playable ? '미리보기 없이 영상 열기' : c.title), element('span', 'media-shade'));
    const play = element('span', 'play-circle');
    play.append(icon(playable ? 'play' : 'share'));
    const mediaBottom = element('span', 'media-bottom');
    const mediaLabel = playable ? (c.media.gifId ? 'GIF 애니메이션 · 무음' : c.media.clipSeconds ? `무음 미리보기 ${c.media.clipSeconds}초` : c.media.hasAudio === true ? '소리 포함 · 전체 영상' : c.media.hasAudio === false ? '무음 원본 영상' : '공개 시연 영상') : (htmlCollection ? '작품 실행 ↗' : c.media.type === 'svg' ? 'SVG 애니메이션 · 무음' : c.demo ? '데모 직접 열기 ↗' : '이미지·원본 보기 ↗');
    mediaBottom.append(element('span', 'video-label', mediaLabel),
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
    if (c.demo) actions.append(externalLink(htmlCollection ? '실행 ↗' : '데모 ↗', c.demo));
    if (c.code) actions.append(externalLink('코드 ↗', c.code));
    if (c.prompt) actions.append(externalLink('프롬프트 ↗', c.prompt));
    if (c.fullVideo) actions.append(externalLink('전체 영상 ↗', c.fullVideo));
    if (!htmlCollection) actions.append(externalLink('원본 ↗', c.source));
    const share = button('share-button', `${c.title} 링크 복사`, 'share', c.id);
    share.append(icon('share'));
    actions.append(share);
    footer.append(element('span', 'author-mark', Array.from(c.author)[0]), element('span', 'author', c.author), actions);
    const disclosure = element('p', 'metric-disclosure', htmlCollection ? c.originalTitle : '제작자 공개 자료 · 독립 재현 아님');
    if ((window.OPUS_ATLAS || window.ASTRA_ATLAS) && c.research) {
      const research = externalLink('수집 출처 ↗', c.research);
      research.className = 'research-link';
      disclosure.append(document.createTextNode(' · '), research);
    }
    bottom.append(metrics, disclosure, footer);
    media.append(preview);
    article.append(head, media, bottom);
    return article;
  }
  function render() {
    // Filtering or sorting removes cards, so stop playback before rebuilding the grid.
    closePlayer(false);
    const words = normalize(state.query).trim().split(/\s+/).filter(Boolean);
    const items = data.cases.filter(c => (state.category === 'all' || c.category === state.category) &&
      (!state.savedOnly || saved.has(c.id)) &&
      (state.format === 'all' || (state.format === 'video' && c.media.type === 'mp4') ||
        (state.format === 'audio' && c.media.type === 'mp4' && c.media.hasAudio === true) ||
        (state.format === 'demo' && c.demo) || (state.format === 'code' && c.code)) &&
      words.every(word => searchIndex.get(c.id).includes(word)));
    if (state.sort === 'title') items.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    if (state.sort === 'newest') items.sort((a, b) => (b.published || '').localeCompare(a.published || ''));
    $('cards').replaceChildren(...items.map(card));
    $('empty').hidden = items.length > 0;
    $('empty-title').textContent = state.savedOnly && !saved.size ? '아직 저장한 사례가 없습니다.' : '일치하는 사례가 없습니다.';
    $('empty-text').textContent = state.savedOnly && !saved.size ? '카드의 북마크 버튼으로 관심 있는 사례를 모아 보세요.' : '검색어를 바꾸거나 다른 분야를 선택해 보세요.';
    const label = state.category === 'all' ? '전체' : categoryMap.get(state.category).name;
    $('result-status').replaceChildren(document.createTextNode(`${label}${state.savedOnly ? ' · 저장한 사례' : ''} `),
      element('b', '', String(items.length)), document.createTextNode('개 사례'));
    $('reset').hidden = state.category === 'all' && !state.query && !state.savedOnly && state.sort === 'curated' && state.format === 'all';
    document.querySelectorAll('[data-category]').forEach(node => node.setAttribute('aria-pressed', String(node.dataset.category === state.category)));
    updateSavedUI();
  }
  function reset() {
    Object.assign(state, { category: 'all', query: '', sort: 'curated', savedOnly: false, format: 'all' });
    $('search').value = '';
    $('sort').value = 'curated';
    if ($('format')) $('format').value = 'all';
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

  const player = $('inline-player');
  const about = $('about-dialog');
  let activeCase = null;
  let activePreview = null;
  let playerEpoch = 0;
  let playerTimer;
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
    if ($('toggle-sound')) $('toggle-sound').hidden = true;
    if ($('player-audio-note')) $('player-audio-note').hidden = true;
    $('player-host').querySelectorAll('video').forEach(video => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
    $('player-host').replaceChildren();
  }
  function closePlayer(restoreFocus = true) {
    if (!activeCase) return;
    stopPlayer();
    const preview = activePreview;
    preview.hidden = false;
    preview.setAttribute('aria-expanded', 'false');
    preview.closest('.card').classList.remove('is-playing');
    player.hidden = true;
    $('player-parking').append(player);
    activeCase = null;
    activePreview = null;
    if (restoreFocus && preview.isConnected) preview.focus({ preventScroll: true });
  }
  const isCurrent = epoch => epoch === playerEpoch && activeCase && !player.hidden && player.isConnected;
  function failedPlayer(epoch) {
    if (!isCurrent(epoch)) return;
    stopPlayer();
    $('player-host').append(element('p', 'player-placeholder', '영상을 불러오지 못했습니다.'));
    $('player-status').hidden = false;
    $('player-status').textContent = '다시 불러오거나 원본에서 영상을 확인해 주세요.';
    $('retry-player').hidden = false;
  }
  function mediaUrl(c) {
    if (window.OPUS_ATLAS || window.ASTRA_ATLAS) {
      const value = safeUrl(c.media.url, window.OPUS_ATLAS ? ['ohmyopus.com', 'video.twimg.com'] : ['video.twimg.com']);
      if (!value || c.media.type !== 'mp4') return null;
      const url = new URL(value);
      if (url.hostname === 'video.twimg.com') {
        if (c.media.gifId) return /^[\w-]+$/.test(c.media.gifId) && url.pathname === `/tweet_video/${c.media.gifId}.mp4` && !url.search && !url.hash ? value : null;
        const videoId = url.pathname.match(/^\/(?:amplify_video|ext_tw_video)\/(\d+)\/(?:pu\/)?vid\/avc1\/\d+x\d+\/[\w-]+\.mp4$/)?.[1];
        return videoId && videoId === c.media.videoId && (!url.search || /^\?tag=\d+$/.test(url.search)) && !url.hash ? value : null;
      }
      return url.pathname === `/media/${c.id}/highlight.mp4` && !url.search && !url.hash ? value : null;
    }
    const value = safeUrl(c.media.url, ['raw.githubusercontent.com', 'jevable.com', 'video.twimg.com']);
    if (!value || c.media.type !== 'mp4') return null;
    const url = new URL(value);
    if (url.hostname === 'raw.githubusercontent.com') return url.pathname.endsWith('.mp4') ? value : null;
    if (url.hostname === 'jevable.com') {
      return /^\d{15,22}$/.test(c.media.id) && url.pathname === `/media/${c.media.id}/0` && !url.search && !url.hash ? value : null;
    }
    const videoId = url.pathname.match(/^\/(?:amplify_video|ext_tw_video)\/(\d+)\/(?:pu\/)?vid\/avc1\/\d+x\d+\/[\w-]+\.mp4$/)?.[1];
    const posterId = c.media.poster?.match(/\/(?:amplify_video_thumb|ext_tw_video_thumb)\/(\d+)\//)?.[1];
    return videoId && videoId === posterId ? value : null;
  }
  function startPlayer(c, fallback = false) {
    stopPlayer();
    const epoch = playerEpoch;
    const host = $('player-host');
    $('retry-player').hidden = !fallback;
    $('retry-player').textContent = window.OPUS_ATLAS && activeCase?.media.videoId ? '원본 다시 재생' : '다시 불러오기';
    $('player-status').hidden = false;
    $('player-status').textContent = '영상을 불러오는 중입니다…';
    const url = mediaUrl(c);
    if (!url) { failedPlayer(epoch); return; }
    const video = element('video');
    video.controls = true;
    video.playsInline = true;
    video.loop = c.media.loop === true;
    video.preload = 'metadata';
    video.muted = false;
    video.defaultMuted = false;
    video.volume = 1;
    const sound = $('toggle-sound');
    const audioNote = $('player-audio-note');
    const updateSound = () => {
      if (!isCurrent(epoch)) return;
      sound.hidden = c.media.hasAudio === false;
      const audible = !video.muted && video.volume > 0;
      sound.textContent = audible ? '소리 끄기' : '소리 켜기';
      sound.setAttribute('aria-pressed', String(audible));
    };
    updateSound();
    audioNote.hidden = c.media.hasAudio !== false;
    audioNote.textContent = fallback ? '선택한 무음 미리보기를 재생 중입니다. ‘원본 다시 재생’으로 돌아갈 수 있습니다.' : c.media.clipSeconds ? '이 미리보기 파일에는 소리가 없습니다. 전체 원본에서 확인해 주세요.' : '공개된 원본 영상에 오디오 트랙이 없습니다.';
    let needsPlaybackGesture = false;
    const requestPlayback = () => {
      if (needsPlaybackGesture) playerTimer = setTimeout(error, 45000);
      needsPlaybackGesture = false;
      video.play().catch(error => {
        if (!isCurrent(epoch) || error.name !== 'NotAllowedError') return;
        clearTimeout(playerTimer);
        needsPlaybackGesture = true;
        const resume = element('button', 'quiet-button', c.media.hasAudio === false ? '영상 재생' : '소리 켜고 재생');
        resume.type = 'button';
        resume.addEventListener('click', () => {
          if (!isCurrent(epoch)) return;
          video.muted = false;
          video.volume = 1;
          requestPlayback();
          updateSound();
        }, { once: true });
        $('player-status').replaceChildren(document.createTextNode('재생 버튼을 한 번 더 눌러 주세요. '), resume);
        $('player-status').hidden = false;
      });
    };
    const toggleSound = () => {
      if (!isCurrent(epoch)) return;
      const audible = !video.muted && video.volume > 0;
      video.muted = audible;
      if (!audible && video.volume === 0) video.volume = 1;
      if (!audible && video.paused) requestPlayback();
      updateSound();
    };
    sound.addEventListener('click', toggleSound);
    video.addEventListener('volumechange', updateSound);
    const poster = safeUrl(c.media.poster, posterHosts);
    if (poster) video.poster = poster;
    video.setAttribute('aria-label', `${c.title} 시연 영상`);
    const ready = event => {
      if (!isCurrent(epoch)) return;
      clearTimeout(playerTimer);
      if (event.type === 'playing') needsPlaybackGesture = false;
      if (needsPlaybackGesture) return;
      $('player-status').textContent = '';
      $('player-status').hidden = true;
    };
    const error = () => {
      if (!isCurrent(epoch)) return;
      if (window.OPUS_ATLAS && !fallback && c.media.videoId && c.media.previewFallback !== false) {
        failedPlayer(epoch);
        const failedEpoch = playerEpoch;
        const preview = element('button', 'quiet-button', '무음 미리보기 보기');
        preview.type = 'button';
        preview.addEventListener('click', () => {
          if (!isCurrent(failedEpoch)) return;
          startPlayer({ ...c, media: { ...c.media, url: `https://ohmyopus.com/media/${c.id}/highlight.mp4`, hasAudio: false } }, true);
        }, { once: true });
        $('player-status').replaceChildren(document.createTextNode('원본 영상을 불러오지 못했습니다. 원본을 다시 재생하거나 무음 미리보기를 선택해 주세요. '), preview);
      } else failedPlayer(epoch);
    };
    video.addEventListener('canplay', ready);
    video.addEventListener('playing', ready);
    video.addEventListener('error', error);
    mediaCleanup = () => {
      sound.removeEventListener('click', toggleSound);
      video.removeEventListener('volumechange', updateSound);
      video.removeEventListener('canplay', ready);
      video.removeEventListener('playing', ready);
      video.removeEventListener('error', error);
    };
    playerTimer = setTimeout(error, 45000);
    video.src = url;
    host.replaceChildren(video);
    // Start from the user's card click; native controls remain available if autoplay is denied.
    requestPlayback();
  }
  function openPlayer(id) {
    const c = caseMap.get(id);
    const article = $(`case-${id}`);
    if (!c || !article || c.media.type !== 'mp4') return;
    closePlayer(false);
    activeCase = c;
    activePreview = article.querySelector('[data-play]');
    activePreview.hidden = true;
    activePreview.setAttribute('aria-expanded', 'true');
    article.classList.add('is-playing');
    article.querySelector('.card-media').append(player);
    player.hidden = false;
    $('player-title').textContent = c.title;
    $('player-note').textContent = c.note;
    $('player-details').open = false;
    const source = safeUrl(c.fullVideo || c.source, linkHosts);
    if (source) $('player-source').href = source;
    else $('player-source').removeAttribute('href');
    const file = mediaUrl(c);
    const fileLink = $('player-file');
    fileLink.hidden = !file;
    if (file) fileLink.href = file;
    else fileLink.removeAttribute('href');
    startPlayer(c);
    $('close-player').focus({ preventScroll: true });
  }
  about.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    const focus = previousFocus.get(about);
    if (focus?.isConnected) focus.focus({ preventScroll: true });
  });
  about.addEventListener('click', event => {
    if (event.target !== about) return;
    const r = about.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) about.close();
  });
  $('close-player').addEventListener('click', () => closePlayer());
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
  $('format')?.addEventListener('change', event => { state.format = event.target.value; render(); });
  $('saved-toggle').addEventListener('click', () => {
    const next = !state.savedOnly;
    reset();
    state.savedOnly = next;
    render();
  });
  $('reset').addEventListener('click', () => { reset(); $('search').focus(); });
  $('empty-reset').addEventListener('click', () => { reset(); $('search').focus(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeCase && !about.open) {
      event.preventDefault();
      closePlayer();
    }
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !about.open &&
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
    article.querySelector('.media-preview').focus({ preventScroll: true });
    // A shared link highlights its card; third-party players still require a click.
  }
  window.addEventListener('hashchange', readHash);
  $('total-count').textContent = String(data.cases.length);
  if ($('video-count')) $('video-count').textContent = String(data.cases.filter(c => c.media.type === 'mp4').length);
  renderCategories();
  render();
  readHash();
})();
