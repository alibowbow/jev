'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const source = name => fs.readFileSync(path.join(root, name), 'utf8');
const flush = async () => { for (let i = 0; i < 8; ++i) await Promise.resolve(); };

function setup(t, options = {}) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const page = options.astra ? 'astra.html' : options.opus ? 'opus.html' : 'index.html';
  const dom = new JSDOM(source(page), {
    url: `https://example.com/jev/${page === 'index.html' ? '' : page}${options.hash || ''}`, runScripts: 'outside-only', virtualConsole: vc
  });
  const w = dom.window;
  const d = w.document;
  let timerId = 0;
  const timers = new Map();
  w.setTimeout = (fn, ms) => { timers.set(++timerId, { fn, ms }); return timerId; };
  w.clearTimeout = id => timers.delete(id);
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  w.HTMLDialogElement.prototype.close = function () { this.open = false; this.dispatchEvent(new w.Event('close')); };
  w.HTMLMediaElement.prototype.play = options.play || (() => Promise.resolve());
  w.HTMLMediaElement.prototype.pause = function () {};
  w.HTMLMediaElement.prototype.load = function () {};
  if (options.saved) w.localStorage.setItem('jev-atlas:saved:v1', options.saved);
  if (options.astraSaved) w.localStorage.setItem('astra-atlas:saved:v1', options.astraSaved);
  if (options.opusSaved) w.localStorage.setItem('opus-atlas:saved:v1', options.opusSaved);
  if (options.blockStorage) Object.defineProperty(w, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  w.eval(source(options.astra ? 'assets/astra-data.js' : options.opus ? 'assets/opus-data.js' : 'assets/data.js'));
  if (options.mutate) options.mutate(w.ASTRA_ATLAS || w.OPUS_ATLAS || w.JEV_ATLAS);
  w.eval(source('assets/app.js'));
  t.after(() => { dom.window.close(); assert.deepEqual(errors, [], 'no unhandled DOM runtime errors'); });
  return {
    w, d, timers,
    click: selector => { const n = d.querySelector(selector); assert.ok(n, selector); n.click(); },
    input: value => { const n = d.getElementById('search'); n.value = value; n.dispatchEvent(new w.Event('input')); },
    count: () => d.querySelectorAll('#cards .card').length,
    timeout: async ms => {
      for (const [id, timer] of [...timers]) if (timer.ms === ms) { timers.delete(id); timer.fn(); }
      await flush();
    }
  };
}

test('Astra categories, search, formats and bookmarks work independently of other models', t => {
  const { d, w, count, click, input } = setup(t, { astra: true, saved: '["flight-search"]', opusSaved: '["bricks"]' });
  assert.equal(count(), 140);
  assert.equal(d.querySelectorAll('[data-play]').length, 132);
  assert.equal(d.querySelectorAll('video, iframe').length, 0);
  click('[data-category="motion"]'); assert.equal(count(), 59);
  input('Houdini'); assert.equal(count(), 1);
  click('[data-save="gist-a290"]');
  assert.equal(w.localStorage.getItem('astra-atlas:saved:v1'), '["gist-a290"]');
  assert.equal(w.localStorage.getItem('opus-atlas:saved:v1'), '["bricks"]');
  assert.equal(w.localStorage.getItem('jev-atlas:saved:v1'), '["flight-search"]');
  click('#reset');
  const format = d.getElementById('format'); format.value = 'video'; format.dispatchEvent(new w.Event('change'));
  assert.equal(count(), 132);
  click('#saved-toggle'); assert.equal(count(), 1);
  w.dispatchEvent(new w.StorageEvent('storage', { key: 'opus-atlas:saved:v1', newValue: '[]' }));
  assert.equal(count(), 1);
  w.dispatchEvent(new w.StorageEvent('storage', { key: 'astra-atlas:saved:v1', newValue: '[]' }));
  assert.equal(count(), 0);
});

test('Astra originals play audibly inside cards and failures never invent silent preview paths', t => {
  const { d, w, click, input } = setup(t, { astra: true });
  const c = w.ASTRA_ATLAS.cases[0];
  click(`[data-play="${c.id}"]`);
  const video = d.querySelector('video');
  assert.equal(video.src, c.media.url);
  assert.equal(video.closest('.card').dataset.id, c.id);
  assert.equal(video.muted, false); assert.equal(video.volume, 1);
  click('#toggle-sound'); assert.equal(video.muted, true);
  click('#toggle-sound'); assert.equal(video.muted, false);
  video.dispatchEvent(new w.Event('error'));
  assert.equal(d.querySelector('video'), null);
  assert.ok(!d.getElementById('player-status').textContent.includes('무음 미리보기'));
  click('#retry-player'); assert.equal(d.querySelector('video').src, c.media.url);
  input('Houdini'); assert.equal(d.querySelector('video'), null);
  assert.equal(d.querySelectorAll('iframe, dialog[open]').length, 0);
  const invalid = setup(t, { astra: true, mutate: data => { data.cases[0].media.url = 'https://ohmyopus.com/media/fake/highlight.mp4'; } });
  invalid.click(`[data-play="${c.id}"]`);
  assert.equal(invalid.d.querySelector('video'), null);
});

test('new Opus art retains correct SVG/GIF behavior and does not offer unavailable highlights', t => {
  const { d, w, click } = setup(t, { opus: true });
  const svg = d.getElementById('case-svg-panda-scooter');
  assert.equal(svg.querySelector('[data-play]'), null);
  assert.equal(svg.querySelector('.media-preview').dataset.animated, 'true');
  assert.match(svg.querySelector('.video-label').textContent, /SVG.*무음/);
  click('[data-play="art-2102761406315839798"]');
  assert.equal(d.querySelector('video').src, 'https://video.twimg.com/tweet_video/HS6BlwZasAA0q6p.mp4');
  assert.equal(d.querySelector('video').loop, true);
  assert.equal(d.getElementById('toggle-sound').hidden, true);
  click('[data-play="art-2103099194693271874"]');
  d.querySelector('video').dispatchEvent(new w.Event('error'));
  assert.ok(!d.getElementById('player-status').textContent.includes('무음 미리보기'));
  click('#retry-player');
  assert.ok(d.querySelector('video').src.includes('video.twimg.com'));
  const invalid = setup(t, { opus: true, mutate: data => { data.cases.find(c => c.media.gifId).media.url = 'https://video.twimg.com/tweet_video/wrong.mp4'; } });
  invalid.click('[data-play="art-2102761406315839798"]');
  assert.equal(invalid.d.querySelector('video'), null);
});

test('new shell boots all catalogue cards without loading players; filters, search, sorting and reset work', t => {
  const { d, w, count, input, click } = setup(t);
  assert.equal(count(), w.JEV_ATLAS.cases.length);
  assert.equal(d.getElementById('total-count').textContent, String(w.JEV_ATLAS.cases.length));
  assert.equal(d.querySelectorAll('iframe, video, script[src*="widgets.js"]').length, 0);
  click('[data-category="browser"]');
  assert.equal(count(), w.JEV_ATLAS.cases.filter(c => c.category === 'browser').length);
  input('Browser Use');
  assert.equal(count(), 1);
  assert.equal(d.querySelector('.card').dataset.id, 'flight-search');
  input('does not exist');
  assert.equal(count(), 0);
  assert.equal(d.getElementById('empty').hidden, false);
  click('#empty-reset');
  assert.equal(count(), w.JEV_ATLAS.cases.length);
  const select = d.getElementById('sort');
  select.value = 'title'; select.dispatchEvent(new w.Event('change'));
  const titles = [...d.querySelectorAll('.card h2')].map(n => n.textContent);
  assert.deepEqual(titles, [...titles].sort((a, b) => a.localeCompare(b, 'ko')));
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: '/' }));
  assert.equal(d.activeElement.id, 'search');
});

test('bookmarks validate IDs, persist, remove from saved view and handle storage events', t => {
  const { d, w, click, count } = setup(t, { saved: '["missing","flight-search","flight-search"]' });
  assert.equal(d.getElementById('saved-count').textContent, '1');
  click('[data-save="voice-mac"]');
  assert.deepEqual(JSON.parse(w.localStorage.getItem('jev-atlas:saved:v1')), ['flight-search', 'voice-mac']);
  click('#saved-toggle');
  assert.equal(count(), 2);
  click('[data-save="flight-search"]');
  assert.equal(count(), 1);
  click('[data-save="voice-mac"]');
  assert.equal(count(), 0);
  assert.match(d.getElementById('empty-title').textContent, /아직 저장/);
  assert.equal(d.activeElement.id, 'empty-reset');
  w.dispatchEvent(new w.StorageEvent('storage', { key: 'jev-atlas:saved:v1', newValue: '["job-match","invalid"]' }));
  assert.equal(count(), 1);
  w.dispatchEvent(new w.StorageEvent('storage', { key: null, newValue: null }));
  assert.equal(count(), 0);
});

test('unavailable or malformed browser storage never prevents browsing', t => {
  for (const options of [{ saved: '{bad' }, { saved: '{}' }, { blockStorage: true }]) {
    const { d, w, count, click } = setup(t, options);
    assert.equal(count(), w.JEV_ATLAS.cases.length);
    click('[data-save="flight-search"]');
    assert.equal(d.getElementById('saved-count').textContent, '1');
    if (options.blockStorage) assert.match(d.getElementById('toast').textContent, /이 창에만/);
  }
});

test('share link copies, has a visible manual fallback and highlights without loading third parties', async t => {
  const { d, w, click } = setup(t, { hash: '#case=job-match' });
  assert.ok(d.getElementById('case-job-match').classList.contains('highlight'));
  assert.equal(d.activeElement.dataset.play, 'job-match');
  assert.equal(d.querySelectorAll('video, iframe, script[src*="widgets.js"]').length, 0);
  let copied;
  Object.defineProperty(w.navigator, 'clipboard', { configurable: true, value: { writeText: async text => { copied = text; } } });
  click('[data-share="flight-search"]'); await flush();
  assert.equal(copied, 'https://example.com/jev/#case=flight-search');
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Denied'); } } });
  click('[data-share="voice-mac"]'); await flush();
  assert.equal(d.getElementById('share-link').value, 'https://example.com/jev/#case=voice-mac');
  assert.equal(d.activeElement.id, 'share-link');
});

test('MP4 errors and timeouts show a source and retry; closing removes media and restores focus', async t => {
  const { d, w, click, timeout } = setup(t);
  const trigger = d.querySelector('[data-play="flight-search"]'); trigger.focus(); trigger.click();
  assert.equal(d.getElementById('inline-player').closest('.card').id, 'case-flight-search');
  assert.equal(d.getElementById('inline-player').hidden, false);
  assert.equal(trigger.hidden, true);
  assert.equal(trigger.getAttribute('aria-expanded'), 'true');
  assert.equal(d.querySelector('dialog[open]'), null);
  assert.equal(d.body.classList.contains('modal-open'), false);
  assert.match(d.getElementById('player-source').href, /^https:\/\/x.com\//);
  let video = d.querySelector('video');
  video.dispatchEvent(new w.Event('canplay'));
  assert.equal(d.getElementById('player-status').hidden, true);
  video.dispatchEvent(new w.Event('error'));
  assert.equal(d.getElementById('retry-player').hidden, false);
  assert.equal(d.querySelector('video'), null);
  click('#retry-player');
  video = d.querySelector('video'); assert.ok(video);
  await timeout(45000);
  assert.equal(d.getElementById('retry-player').hidden, false);
  click('#retry-player'); click('#close-player');
  assert.equal(d.querySelector('video'), null);
  assert.equal(d.body.classList.contains('modal-open'), false);
  assert.equal(d.getElementById('inline-player').parentElement.id, 'player-parking');
  assert.equal(d.getElementById('inline-player').hidden, true);
  assert.equal(trigger.hidden, false);
  assert.equal(trigger.getAttribute('aria-expanded'), 'false');
  assert.equal(d.activeElement, trigger);
});

test('switching video cards stops the old file and never inserts a social post', t => {
  const { d, w, click } = setup(t);
  click('[data-play="drape-try-on"]');
  const first = d.querySelector('video');
  let paused = 0; first.pause = () => ++paused;
  click('[data-play="proq-plan-classifier"]');
  const second = d.querySelector('video');
  assert.equal(paused, 1);
  assert.equal(first.hasAttribute('src'), false);
  assert.equal(first.isConnected, false);
  assert.equal(second.closest('.card').id, 'case-proq-plan-classifier');
  assert.equal(d.querySelectorAll('#cards video, .is-playing').length, 2);
  assert.equal(d.querySelector('[data-play="drape-try-on"]').hidden, false);
  first.dispatchEvent(new w.Event('error'));
  first.dispatchEvent(new w.Event('canplay'));
  assert.equal(d.querySelector('video'), second);
  assert.equal(d.getElementById('player-status').hidden, false);
  assert.equal(d.getElementById('retry-player').hidden, true);
  assert.equal(d.querySelectorAll('iframe, script[src*="widgets.js"], dialog[open]').length, 0);
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape' }));
  assert.equal(d.querySelectorAll('#cards video, .is-playing').length, 0);
  assert.equal(d.activeElement.dataset.play, 'proq-plan-classifier');
});

test('search, category, sort and saved-view changes stop media without stealing filter focus', async t => {
  const { d, w, click, input } = setup(t);
  const checks = [
    () => { d.getElementById('search').focus(); input('Browser'); assert.equal(d.activeElement.id, 'search'); },
    () => click('[data-category="browser"]'),
    () => { const sort = d.getElementById('sort'); sort.value = 'title'; sort.dispatchEvent(new w.Event('change')); },
    () => click('#saved-toggle')
  ];
  for (const update of checks) {
    click('[data-play="flight-search"]');
    const video = d.querySelector('video');
    let paused = 0; video.pause = () => ++paused;
    update();
    assert.equal(paused, 1);
    assert.equal(video.hasAttribute('src'), false);
    assert.equal(d.querySelectorAll('#cards video, #cards iframe, .is-playing').length, 0);
    assert.equal(d.getElementById('inline-player').parentElement.id, 'player-parking');
    click('#reset');
  }
  click('[data-play="flight-search"]');
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: '/' }));
  assert.equal(d.activeElement.id, 'search');
});

test('late media callbacks and timeouts cannot replace a newer card after filtering', t => {
  const { d, w, click, input, timers } = setup(t);
  click('[data-play="voice-mac"]');
  const first = d.querySelector('video');
  const oldTimeout = [...timers.values()].find(timer => timer.ms === 45000).fn;
  input('Drape');
  click('[data-play="drape-try-on"]');
  const current = d.querySelector('video');
  current.dispatchEvent(new w.Event('canplay'));
  oldTimeout();
  first.dispatchEvent(new w.Event('error'));
  first.dispatchEvent(new w.Event('playing'));
  assert.equal(d.querySelector('video'), current);
  assert.equal(d.getElementById('player-status').hidden, true);
  assert.equal(d.getElementById('retry-player').hidden, true);
  assert.equal(current.closest('.card').id, 'case-drape-try-on');
});

test('source-information dialog remains usable with inline playback', t => {
  const { d, w, click } = setup(t);
  click('[data-play="voice-mac"]');
  click('#about');
  assert.equal(d.getElementById('about-dialog').open, true);
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: '/' }));
  assert.notEqual(d.activeElement.id, 'search');
  click('#close-about');
  assert.equal(d.body.classList.contains('modal-open'), false);
  click('#close-player');
  assert.equal(d.querySelector('video'), null);
});

test('catalogue text is rendered literally and unsafe media URLs are refused', t => {
  const { d, click } = setup(t, { mutate: data => {
    const flight = data.cases.find(c => c.id === 'flight-search');
    flight.title = '<img src=x onerror=alert(1)>';
    flight.media.url = 'https://raw.githubusercontent.com.evil.example/demo.mp4';
    flight.source = 'javascript:alert(1)';
  } });
  assert.equal(d.querySelector('#case-flight-search h2').textContent, '<img src=x onerror=alert(1)>');
  assert.equal(d.querySelector('#case-flight-search h2 img'), null);
  assert.equal(d.querySelector('a[href^="javascript:"]'), null);
  click('[data-play="flight-search"]');
  assert.equal(d.querySelector('video'), null);
  assert.equal(d.getElementById('retry-player').hidden, false);
});

test('every card opens one video with native controls and no expanded X post', t => {
  const { d, w, count, input, click } = setup(t);
  let playCalls = 0;
  w.HTMLMediaElement.prototype.play = () => { ++playCalls; return Promise.resolve(); };
  input('Drape');
  assert.equal(count(), 1);
  click('#reset');
  for (const c of w.JEV_ATLAS.cases) {
    click(`[data-play="${c.id}"]`);
    const video = d.querySelector('video');
    assert.ok(video, c.id);
    assert.equal(video.src, c.media.url);
    assert.equal(video.controls, true);
    assert.equal(video.playsInline, true);
    assert.equal(video.closest('.card').id, `case-${c.id}`);
    assert.equal(d.querySelectorAll('video').length, 1);
    assert.equal(d.querySelectorAll('iframe, script[src*="widgets.js"], dialog[open]').length, 0);
    assert.equal(d.getElementById('player-file').href, c.media.url);
    assert.equal(d.getElementById('retry-player').hidden, true);
  }
  assert.equal(playCalls, w.JEV_ATLAS.cases.length);
  click('#close-player');
  assert.equal(d.querySelector('video'), null);
  click('[data-category="simulation"]');
  assert.equal(count(), w.JEV_ATLAS.cases.filter(c => c.category === 'simulation').length);
  input('MuJoCo');
  assert.equal(count(), 1);
});

test('native player rejects unverified video paths, lookalike hosts and credentials', t => {
  for (const url of ['https://video.twimg.com/demo.mp4', 'https://raw.githubusercontent.com.evil.example/demo.mp4', 'https://raw.githubusercontent.com@evil.example/demo.mp4', 'https://user:pass@raw.githubusercontent.com/demo.mp4']) {
    const { d, click } = setup(t, { mutate: data => {
      data.cases.find(c => c.id === 'flight-search').media.url = url;
    } });
    click('[data-play="flight-search"]');
    assert.equal(d.querySelector('video'), null);
    assert.equal(d.getElementById('player-file').hidden, true);
    assert.equal(d.getElementById('player-file').hasAttribute('href'), false);
    assert.equal(d.getElementById('retry-player').hidden, false);
  }
});

test('directory media must match the current post and publisher media must match its thumbnail', t => {
  for (const url of [
    'https://jevable.com/media/2101118529936519453/0',
    'https://jevable.com/media/2101388186916454439/0?url=https://evil.example/video',
    'https://jevable.com/project/2101388186916454439',
    'https://jevable.com.evil.example/media/2101388186916454439/0',
    'https://video.twimg.com/amplify_video/2101118259076734976/vid/avc1/640x360/test.mp4'
  ]) {
    const { d, click } = setup(t, { mutate: data => {
      data.cases.find(c => c.id === 'drape-try-on').media.url = url;
    } });
    click('[data-play="drape-try-on"]');
    assert.equal(d.querySelector('video'), null);
    assert.equal(d.getElementById('player-file').hasAttribute('href'), false);
    assert.equal(d.getElementById('retry-player').hidden, false);
  }
});

test('Opus mixes real video previews and source cards without loading any player initially', t => {
  const { d, w, count } = setup(t, { opus: true });
  assert.equal(count(), 150);
  assert.equal(d.querySelectorAll('video, iframe').length, 0);
  assert.equal(d.querySelectorAll('[data-play]').length, 123);
  assert.equal(d.getElementById('video-count').textContent, '123');
  for (const c of w.OPUS_ATLAS.cases) {
    const card = d.getElementById(`case-${c.id}`);
    assert.ok([...card.querySelectorAll('a')].some(a => a.href === new URL(c.source).href), c.id);
    assert.equal(card.querySelector('.research-link').href, c.research);
    if (c.media.type === 'mp4') {
      const label = card.querySelector('.video-label').textContent;
      assert.match(label, c.media.gifId ? /GIF 애니메이션 · 무음/ : c.media.clipSeconds ? /무음 미리보기 [\d.]+초/ : c.media.hasAudio ? /소리 포함 · 전체 영상/ : c.media.hasAudio === false ? /무음 원본 영상/ : /공개 시연 영상/);
    }
    else {
      assert.equal(card.querySelector('[data-play]'), null);
      assert.equal(card.querySelector('.media-preview').tagName, 'A');
    }
  }
});

test('Opus format, category and text filters compose and reset; newest sort uses publication dates', t => {
  const { d, w, count, click, input } = setup(t, { opus: true });
  const format = d.getElementById('format');
  const selectFormat = value => { format.value = value; format.dispatchEvent(new w.Event('change')); };
  selectFormat('demo'); assert.equal(count(), 17);
  click('[data-category="game"]'); assert.equal(count(), 5);
  input('Turbo'); assert.equal(count(), 1);
  click('#reset'); assert.equal(count(), 150); assert.equal(format.value, 'all');
  selectFormat('code'); assert.equal(count(), 18);
  selectFormat('audio'); assert.equal(count(), w.OPUS_ATLAS.cases.filter(c => c.media.type === 'mp4' && c.media.hasAudio === true).length);
  assert.equal(d.querySelector('#case-willowmere'), null);
  assert.equal(d.querySelector('#case-lens-lab'), null);
  selectFormat('video'); assert.equal(count(), 123);
  click('[data-play="lens-lab"]');
  selectFormat('demo'); assert.equal(d.querySelector('video'), null);
  click('#reset');
  const sort = d.getElementById('sort'); sort.value = 'newest'; sort.dispatchEvent(new w.Event('change'));
  const ids = [...d.querySelectorAll('.card')].map(c => c.dataset.id);
  const dates = ids.map(id => w.OPUS_ATLAS.cases.find(c => c.id === id).published);
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test('Opus bookmarks are isolated from existing Jev bookmarks and storage events', t => {
  const { d, w, click, count } = setup(t, { opus: true, saved: '["flight-search"]', opusSaved: '["lens-lab","invalid"]' });
  assert.equal(d.getElementById('saved-count').textContent, '1');
  click('[data-save="bricks"]');
  assert.equal(w.localStorage.getItem('jev-atlas:saved:v1'), '["flight-search"]');
  assert.deepEqual(JSON.parse(w.localStorage.getItem('opus-atlas:saved:v1')), ['lens-lab', 'bricks']);
  click('#saved-toggle'); assert.equal(count(), 2);
  w.dispatchEvent(new w.StorageEvent('storage', { key: 'jev-atlas:saved:v1', newValue: '[]' }));
  assert.equal(count(), 2);
  w.dispatchEvent(new w.StorageEvent('storage', { key: 'opus-atlas:saved:v1', newValue: '["turbo-kart"]' }));
  assert.equal(count(), 1);
});

test('Opus previews play inside cards and reject mismatched paths and lookalike hosts', t => {
  const { d, w, click } = setup(t, { opus: true });
  click('[data-play="lens-lab"]');
  const video = d.querySelector('video');
  assert.equal(video.closest('.card').id, 'case-lens-lab');
  assert.equal(video.controls, true); assert.equal(video.playsInline, true);
  assert.equal(video.src, w.OPUS_ATLAS.cases[0].media.url);
  click('[data-play="bricks"]');
  assert.equal(video.hasAttribute('src'), false);
  assert.equal(d.querySelectorAll('video').length, 1);
  assert.equal(d.querySelectorAll('iframe, dialog[open]').length, 0);
  assert.equal(d.getElementById('player-source').href, 'https://www.youtube.com/watch?v=lCR9epzSNGc');
  for (const url of ['https://ohmyopus.com.evil.example/media/lens-lab/highlight.mp4', 'https://ohmyopus.com/media/bricks/highlight.mp4', 'https://ohmyopus.com/media/lens-lab/highlight.mp4?url=https://evil.example']) {
    const s = setup(t, { opus: true, mutate: data => { data.cases[0].media.url = url; } });
    s.click('[data-play="lens-lab"]');
    assert.equal(s.d.querySelector('video'), null);
    assert.equal(s.d.getElementById('retry-player').hidden, false);
  }
});

test('a shared Opus image case focuses its demo link and retains the separate page when shared', async t => {
  const { d, w, click } = setup(t, { opus: true, hash: '#case=turbo-kart' });
  assert.equal(d.activeElement.className, 'media-preview');
  assert.equal(d.activeElement.href, 'https://bridge-mind.github.io/turbo-kart-rally/');
  assert.equal(d.querySelector('video'), null);
  let copied;
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: async text => { copied = text; } } });
  click('[data-share="lens-lab"]'); await flush();
  assert.equal(copied, 'https://example.com/jev/opus.html#case=lens-lab');
});

test('sound starts enabled, toggles in the card and follows native volume changes', t => {
  const { d, w, click } = setup(t, { opus: true });
  click('[data-play="paper-planes"]');
  const video = d.querySelector('video');
  const sound = d.getElementById('toggle-sound');
  assert.equal(video.muted, false);
  assert.equal(video.defaultMuted, false);
  assert.equal(video.volume, 1);
  assert.equal(sound.hidden, false);
  assert.equal(sound.textContent, '소리 끄기');
  click('#toggle-sound');
  assert.equal(video.muted, true);
  assert.equal(sound.textContent, '소리 켜기');
  assert.equal(sound.getAttribute('aria-pressed'), 'false');
  click('#toggle-sound');
  assert.equal(video.muted, false);
  video.volume = 0; video.dispatchEvent(new w.Event('volumechange'));
  assert.equal(sound.textContent, '소리 켜기');
  click('#toggle-sound');
  assert.equal(video.volume, 1);
  assert.equal(video.muted, false);
  click('[data-play="lens-lab"]');
  video.dispatchEvent(new w.Event('volumechange'));
  assert.equal(sound.hidden, true, 'silent source has no misleading sound toggle');
  assert.equal(d.getElementById('player-audio-note').hidden, false);
  assert.match(d.getElementById('player-audio-note').textContent, /원본 영상에 오디오 트랙이 없습니다/);
});

test('silent previews disclose absent audio and shared player restores controls for an audio source', t => {
  const { d, click } = setup(t, { opus: true });
  click('[data-play="willowmere"]');
  assert.equal(d.getElementById('toggle-sound').hidden, true);
  assert.match(d.getElementById('player-audio-note').textContent, /미리보기 파일에는 소리가 없습니다/);
  click('[data-play="paper-planes"]');
  assert.equal(d.getElementById('toggle-sound').hidden, false);
  assert.equal(d.getElementById('player-audio-note').hidden, true);
  click('#close-player');
  assert.equal(d.querySelector('video'), null);
  assert.equal(d.getElementById('toggle-sound').hidden, true);
});

test('Opus original media must match the verified video ID and safe CDN URL', t => {
  const invalid = ['https://video.twimg.com/amplify_video/123/vid/avc1/1080x1080/file.mp4',
    'https://video.twimg.com.evil.example/amplify_video/2102437792425070592/vid/avc1/1080x1080/file.mp4',
    'https://video.twimg.com/amplify_video/2102437792425070592/vid/avc1/1080x1080/file.mp4?url=https://evil.example'];
  for (const url of invalid) {
    const { d, click } = setup(t, { opus: true, mutate: data => { data.cases.find(c => c.id === 'paper-planes').media.url = url; } });
    click('[data-play="paper-planes"]');
    assert.equal(d.querySelector('video'), null);
  }
});

test('an unavailable Opus original offers an explicit silent preview and can retry the original', t => {
  const { d, w, click } = setup(t, { opus: true });
  click('[data-play="paper-planes"]');
  const original = d.querySelector('video');
  original.dispatchEvent(new w.Event('error'));
  assert.equal(d.querySelector('video'), null, 'never silently replace the audio source');
  assert.equal(d.getElementById('retry-player').hidden, false);
  click('#player-status button');
  const preview = d.querySelector('video');
  assert.notEqual(preview, original);
  assert.equal(preview.src, 'https://ohmyopus.com/media/paper-planes/highlight.mp4');
  assert.equal(preview.closest('.card').id, 'case-paper-planes');
  assert.equal(d.getElementById('toggle-sound').hidden, true);
  assert.match(d.getElementById('player-audio-note').textContent, /선택한 무음 미리보기/);
  assert.match(d.getElementById('player-file').href, /^https:\/\/video\.twimg\.com\//);
  assert.equal(d.getElementById('retry-player').hidden, false);
  click('#retry-player');
  assert.match(d.querySelector('video').src, /^https:\/\/video\.twimg\.com\//);
  assert.equal(d.getElementById('toggle-sound').hidden, false);
  preview.dispatchEvent(new w.Event('error'));
  assert.match(d.querySelector('video').src, /^https:\/\/video\.twimg\.com\//, 'stale preview cannot replace the retried original');
});


test('blocked audible playback exposes a user gesture retry and ignores stale rejections', async t => {
  let rejectPlay;
  let calls = 0;
  const { d, w, click, timers } = setup(t, { opus: true, play: () => {
    calls++;
    return calls === 1 ? new Promise((resolve, reject) => { rejectPlay = reject; }) : Promise.resolve();
  } });
  click('[data-play="paper-planes"]');
  const video = d.querySelector('video');
  rejectPlay({ name: 'NotAllowedError' });
  await flush();
  assert.match(d.getElementById('player-status').textContent, /소리 켜고 재생/);
  assert.equal([...timers.values()].some(t => t.ms === 45000), false);
  video.dispatchEvent(new w.Event('canplay'));
  assert.equal(d.getElementById('player-status').hidden, false, 'canplay does not hide the gesture button');
  click('#player-status button');
  assert.equal(calls, 2);
  assert.equal(video.muted, false);
  assert.equal(video.volume, 1);
  video.dispatchEvent(new w.Event('playing'));
  assert.equal(d.getElementById('player-status').hidden, true);

  let rejectOld;
  const other = setup(t, { opus: true, play: () => new Promise((resolve, reject) => { rejectOld = reject; }) });
  other.click('[data-play="paper-planes"]');
  const staleRejection = rejectOld;
  other.click('[data-play="bricks"]');
  staleRejection({ name: 'NotAllowedError' });
  await flush();
  assert.equal(other.d.querySelector('#player-status button'), null);
});
