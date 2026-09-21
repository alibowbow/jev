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
  const dom = new JSDOM(source('index.html'), {
    url: `https://example.com/jev/${options.hash || ''}`, runScripts: 'outside-only', virtualConsole: vc
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
  w.HTMLMediaElement.prototype.play = () => Promise.resolve();
  w.HTMLMediaElement.prototype.pause = function () {};
  w.HTMLMediaElement.prototype.load = function () {};
  if (options.saved) w.localStorage.setItem('jev-atlas:saved:v1', options.saved);
  if (options.blockStorage) Object.defineProperty(w, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  if (options.twitter) w.twttr = options.twitter;
  w.eval(source('assets/data.js'));
  if (options.mutate) options.mutate(w.JEV_ATLAS);
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
  video.dispatchEvent(new w.Event('loadedmetadata'));
  assert.match(d.getElementById('player-status').textContent, /재생 버튼/);
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

test('X widgets load only after click, recover from failure and do not replace a newer MP4', async t => {
  const { d, w, click } = setup(t);
  click('[data-play="voice-mac"]');
  assert.equal(d.getElementById('player-file').hidden, true);
  const script = d.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
  assert.ok(script);
  script.dispatchEvent(new w.Event('error')); await flush();
  assert.equal(d.getElementById('retry-player').hidden, false);
  const calls = [];
  w.twttr = { widgets: { createTweet: (id, mount, options) => new Promise(resolve => calls.push({ id, mount, options, resolve })) } };
  click('#retry-player'); await flush();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.dnt, true);
  click('[data-play="flight-search"]');
  const currentVideo = d.querySelector('video');
  const iframe = d.createElement('iframe'); calls[0].mount.append(iframe); calls[0].resolve(iframe);
  await flush();
  assert.equal(d.querySelector('video'), currentVideo);
  assert.equal(d.querySelector('#player-host iframe'), null);
  assert.equal(d.getElementById('inline-player').closest('.card').id, 'case-flight-search');
  assert.equal(d.querySelector('[data-play="voice-mac"]').hidden, false);
  assert.match(d.getElementById('player-title').textContent, /항공편/);
});

test('switching cards stops native playback, removes an existing X frame and Escape restores the preview', async t => {
  const { d, w, click } = setup(t, { twitter: { widgets: { createTweet: async (id, mount) => {
    const frame = d.createElement('iframe'); mount.append(frame); return frame;
  } } } });
  click('[data-play="flight-search"]');
  const video = d.querySelector('video');
  let paused = 0;
  video.pause = () => ++paused;
  click('[data-play="voice-mac"]'); await flush();
  assert.equal(paused, 1);
  assert.equal(video.hasAttribute('src'), false);
  assert.equal(video.isConnected, false);
  const frame = d.querySelector('#case-voice-mac iframe');
  assert.ok(frame);
  click('[data-play="drape-try-on"]'); await flush();
  assert.equal(frame.isConnected, false);
  assert.equal(d.querySelectorAll('#cards iframe').length, 1);
  assert.equal(d.querySelectorAll('.is-playing').length, 1);
  assert.ok(d.querySelector('#case-drape-try-on iframe'));
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape' }));
  assert.equal(d.querySelectorAll('#cards iframe, #cards video, .is-playing').length, 0);
  assert.equal(d.activeElement.dataset.play, 'drape-try-on');
  assert.equal(d.querySelector('[data-play="drape-try-on"]').hidden, false);
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

test('filtering during an X request cannot revive a hidden player or replace a later card', async t => {
  const pending = [];
  const { d, click, input } = setup(t, { twitter: { widgets: { createTweet: (id, mount) => new Promise(resolve => pending.push({ mount, resolve })) } } });
  click('[data-play="voice-mac"]'); await flush();
  input('Drape');
  click('[data-play="drape-try-on"]'); await flush();
  const current = d.createElement('iframe'); pending[1].mount.append(current); pending[1].resolve(current); await flush();
  const late = d.createElement('iframe'); pending[0].mount.append(late); pending[0].resolve(late); await flush();
  assert.equal(late.isConnected, false);
  assert.equal(d.querySelector('#player-host iframe'), current);
  assert.equal(d.getElementById('inline-player').closest('.card').id, 'case-drape-try-on');
});

test('X timeout invalidates late success; successful embeds and about dialog remain usable', async t => {
  const pending = [];
  const { d, w, click, timeout } = setup(t, { twitter: { widgets: { createTweet: (id, mount) => new Promise(resolve => pending.push({ mount, resolve })) } } });
  click('[data-play="voice-mac"]'); await flush(); await timeout(18000);
  const late = d.createElement('iframe'); pending[0].mount.append(late); pending[0].resolve(late); await flush();
  assert.equal(d.querySelector('#player-host iframe'), null);
  assert.equal(d.getElementById('retry-player').hidden, false);
  click('#retry-player'); await flush();
  const current = d.createElement('iframe'); pending[1].mount.append(current); pending[1].resolve(current); await flush();
  assert.equal(d.querySelector('#player-host iframe'), current);
  assert.equal(d.querySelector('.player-placeholder'), null);
  click('#close-player'); click('#about');
  assert.equal(d.getElementById('about-dialog').open, true);
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: '/' }));
  assert.notEqual(d.activeElement.id, 'search');
  click('#close-about');
  assert.equal(d.body.classList.contains('modal-open'), false);
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

test('all 50 Jevable cards load their official post on demand without native CDN video', async t => {
  const calls = [];
  const { d, w, count, input, click } = setup(t, { twitter: { widgets: {
    createTweet: async (id, mount, options) => {
      calls.push({ id, options });
      const frame = d.createElement('iframe'); mount.append(frame); return frame;
    }
  } } });
  assert.equal(calls.length, 0);
  input('Drape');
  assert.equal(count(), 1);
  assert.equal(d.querySelector('.card').dataset.id, 'drape-try-on');
  click('#reset');
  const added = w.JEV_ATLAS.cases.filter(c => new URL(c.research).hostname === 'jevable.com');
  assert.equal(added.length, 50);
  for (const c of added) {
    click(`[data-play="${c.id}"]`); await flush();
    assert.equal(calls.at(-1).id, c.source.split('/').pop());
    assert.equal(calls.at(-1).options.dnt, true);
    assert.equal(d.querySelector('video'), null);
    assert.ok(d.querySelector('#player-host iframe'));
    assert.equal(d.getElementById('inline-player').closest('.card').id, `case-${c.id}`);
    assert.equal(d.querySelector('dialog[open]'), null);
    assert.equal(d.getElementById('player-file').hidden, true);
    assert.equal(d.getElementById('player-file').hasAttribute('href'), false);
    assert.equal(d.getElementById('retry-player').hidden, true);
    click('#close-player');
    assert.equal(d.querySelector('#player-host iframe'), null);
  }
  assert.equal(calls.length, 50);
  click('[data-category="simulation"]');
  assert.equal(count(), w.JEV_ATLAS.cases.filter(c => c.category === 'simulation').length);
  input('MuJoCo');
  assert.equal(count(), 1);
  assert.equal(d.querySelector('.card').dataset.id, 'mujoco-robot-arm');
});

test('native player rejects X CDN renditions, lookalike hosts and credentials', t => {
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
