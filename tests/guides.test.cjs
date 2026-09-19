'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function setup(t, file, hash = '') {
  const dom = new JSDOM(read(file), { url: `https://example.com/jev/${file}${hash}`, runScripts: 'outside-only' });
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
      else if (url.hash) {
        const target = local === file ? d : new JSDOM(read(local)).window.document;
        assert.ok(target.getElementById(url.hash.slice(1)), url.href);
      }
    }
  }
});

test('scenario diagrams expose only the selected scenario and keep the simulated-example disclosure', t => {
  const d = setup(t, 'learn.html', '#example-medical');
  assert.equal(d.getElementById('example-medical').hidden, false);
  assert.equal(d.querySelector('[data-example=medical]').getAttribute('aria-pressed'), 'true');
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

test('idea categories show their matching cards, update the count and reset to all eighteen', t => {
  const d = setup(t, 'ideas.html');
  const cards = [...d.querySelectorAll('[data-idea-category]')];
  assert.equal(cards.length, 18);
  for (const button of d.querySelectorAll('[data-idea-filter]:not([data-idea-filter="all"])')) {
    button.click();
    const visible = cards.filter(card => !card.hidden);
    const expected = button.dataset.ideaFilter === 'medical' ? 6 : 3;
    assert.equal(visible.length, expected);
    assert.ok(visible.every(card => card.dataset.ideaCategory === button.dataset.ideaFilter));
    assert.equal(d.getElementById('idea-count').textContent, `${expected}개 아이디어`);
    assert.equal(d.querySelectorAll('[data-idea-filter][aria-pressed="true"]').length, 1);
  }
  d.querySelector('[data-idea-filter="all"]').click();
  assert.equal(cards.filter(card => !card.hidden).length, 18);
  assert.equal(d.getElementById('idea-count').textContent, '18개 아이디어');
});


test('probability comparison updates all marks, percentages, routing and accessible feedback together', t => {
  const d = setup(t, 'learn.html');
  for (const [key, expected, heading] of [
    ['mixed', [38, 35, 27], '추가 정보나 사람의 검토'],
    ['clear', [84, 10, 6], '분류 결과를 바로 표시']
  ]) {
    d.querySelector(`[data-distribution="${key}"]`).click();
    const values = [...d.querySelectorAll('[data-probability-value]')].map(node => parseInt(node.textContent, 10));
    assert.deepEqual(values, expected);
    assert.equal(values.reduce((sum, value) => sum + value, 0), 100);
    assert.deepEqual([...d.querySelectorAll('[data-probability-bar]')].map(node => node.style.width), expected.map(value => `${value}%`));
    assert.equal(d.getElementById('route-title').textContent, heading);
    assert.ok(d.getElementById('distribution-status').textContent.includes(heading));
    assert.equal(d.querySelectorAll('[data-distribution][aria-pressed="true"]').length, 1);
  }
});

test('medical deep link exposes six proposals with review scope and resets without leaving stale state', t => {
  const d = setup(t, 'ideas.html', '#medical');
  assert.equal(d.getElementById('medical').hidden, false);
  assert.equal(d.querySelectorAll('[data-idea-category="medical"]:not([hidden])').length, 6);
  assert.equal(d.querySelectorAll('[data-idea-category]:not([hidden])').length, 6);
  assert.equal(d.querySelector('[data-idea-filter="medical"]').getAttribute('aria-pressed'), 'true');
  for (const card of d.querySelectorAll('[data-idea-category="medical"]')) {
    assert.ok(card.querySelector('.clinical-boundary').textContent.length > 20);
  }
  d.querySelector('[data-idea-filter="all"]').click();
  assert.equal(d.getElementById('medical').hidden, true);
  assert.equal(d.defaultView.location.hash, '');
  d.querySelector('[data-idea-filter="medical"]').click();
  assert.equal(d.defaultView.location.hash, '#medical');
  d.defaultView.history.replaceState(null, '', '#content');
  d.defaultView.dispatchEvent(new d.defaultView.HashChangeEvent('hashchange'));
  assert.equal(d.querySelectorAll('[data-idea-category]:not([hidden])').length, 3);
  assert.equal(d.getElementById('medical').hidden, true);
});
