'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function setup(t, file) {
  const dom = new JSDOM(read(file), { url: `https://example.com/jev/${file}`, runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  dom.window.eval(read('assets/guide.js'));
  return dom.window.document;
}

test('all menu routes, assets and related-demo links resolve under a project subpath', t => {
  const data = new JSDOM('', { runScripts: 'outside-only' });
  t.after(() => data.window.close());
  data.window.eval(read('assets/data.js'));
  const ids = new Set(data.window.JEV_ATLAS.cases.map(c => c.id));
  for (const file of ['index.html', 'learn.html', 'ideas.html']) {
    const d = setup(t, file);
    const menu = d.querySelector('nav[aria-label="주 메뉴"]');
    assert.equal(menu.querySelectorAll('a').length, 3);
    assert.equal(menu.querySelectorAll('[aria-current="page"]').length, 1);
    const current = new URL(menu.querySelector('[aria-current="page"]').href).pathname;
    assert.equal(current, `/jev/${file === 'index.html' ? '' : file}`);
    for (const n of d.querySelectorAll('a[href], script[src], link[href]')) {
      const url = new URL(n.href || n.src);
      if (url.origin !== 'https://example.com') continue;
      assert.ok(url.pathname.startsWith('/jev/'), url.href);
      const local = url.pathname.slice('/jev/'.length) || 'index.html';
      assert.ok(fs.existsSync(path.join(root, local)), url.href);
      if (url.hash.startsWith('#case=')) assert.ok(ids.has(url.hash.slice(6)), url.href);
      else if (url.hash) assert.ok(d.getElementById(url.hash.slice(1)), url.href);
    }
  }
});

test('mail examples expose only the selected scenario and keep the simulated-example disclosure', t => {
  const d = setup(t, 'learn.html');
  const panels = [...d.querySelectorAll('[data-example-panel]')];
  for (const button of d.querySelectorAll('[data-example]')) {
    button.click();
    const visible = panels.filter(p => !p.hidden);
    assert.equal(visible.length, 1);
    assert.equal(visible[0].id, button.getAttribute('aria-controls'));
    assert.equal(d.querySelectorAll('[data-example][aria-pressed="true"]').length, 1);
  }
  assert.match(d.querySelector('.example-disclosure').textContent, /실제 Jev 호출.*일어나지 않습니다/);
});

test('idea categories show their matching cards, update the count and reset to all twelve', t => {
  const d = setup(t, 'ideas.html');
  const cards = [...d.querySelectorAll('[data-idea-category]')];
  assert.equal(cards.length, 12);
  for (const button of d.querySelectorAll('[data-idea-filter]:not([data-idea-filter="all"])')) {
    button.click();
    const visible = cards.filter(card => !card.hidden);
    assert.equal(visible.length, 3);
    assert.ok(visible.every(card => card.dataset.ideaCategory === button.dataset.ideaFilter));
    assert.equal(d.getElementById('idea-count').textContent, '3개 아이디어');
    assert.equal(d.querySelectorAll('[data-idea-filter][aria-pressed="true"]').length, 1);
  }
  d.querySelector('[data-idea-filter="all"]').click();
  assert.equal(cards.filter(card => !card.hidden).length, 12);
  assert.equal(d.getElementById('idea-count').textContent, '12개 아이디어');
});
