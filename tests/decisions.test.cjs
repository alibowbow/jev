'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function setup(t) {
  const errors = [];
  const console = new VirtualConsole();
  console.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(read('decisions.html'), { url:'https://example.com/jev/decisions.html', runScripts:'outside-only', virtualConsole:console });
  const w = dom.window, d = w.document;
  w.HTMLElement.prototype.scrollIntoView = function() {};
  w.HTMLDialogElement.prototype.showModal = function() { this.open = true; };
  w.HTMLDialogElement.prototype.close = function() { this.open = false; this.dispatchEvent(new w.Event('close')); };
  w.eval(read('assets/decisions-data.js'));
  w.eval(read('assets/app.js'));
  t.after(() => { w.close(); assert.deepEqual(errors, []); });
  const click = s => { const el = d.querySelector(s); assert.ok(el, s); el.click(); };
  const select = (id, val) => { const el=d.getElementById(id); el.value=val; el.dispatchEvent(new w.Event('change')); };
  const search = val => { const el=d.getElementById('search'); el.value=val; el.dispatchEvent(new w.Event('input')); };
  return {w,d,click,select,search,count:()=>d.querySelectorAll('#cards .card').length};
}

test('catalogue records keep distinct cases, source types and local explanatory covers', t => {
  const {w,d} = setup(t), data=w.DECISIONS_ATLAS;
  assert.equal(data.cases.length,30);
  assert.equal(new Set(data.cases.map(c=>c.id)).size,30);
  assert.deepEqual(Object.fromEntries(['official-use','partner-report','community','official-demo','recipe'].map(o=>[o,data.cases.filter(c=>c.evidence.origin===o).length])), {'official-use':3,'partner-report':5,'community':13,'official-demo':3,'recipe':6});
  for (const c of data.cases) {
    assert.ok(data.categories.some(x=>x.id===c.category));
    assert.ok(c.evidence.input && c.evidence.workflow && c.evidence.result && c.evidence.limitations);
    assert.ok(fs.existsSync(path.join(root,c.media.poster)));
    for (const value of [c.source,c.code,c.demo,c.fullVideo].filter(Boolean)) {
      const url=new URL(value); assert.equal(url.protocol,'https:'); assert.ok(data.linkHosts.includes(url.hostname), value);
    }
  }
  assert.equal(d.querySelectorAll('#cards .card').length,30);
  assert.equal(d.querySelectorAll('video, iframe').length,0);
  assert.equal(d.querySelectorAll('.media-preview img').length,30);
  assert.match(d.body.textContent,/가상 시장|모의 거래/);
  assert.match(d.body.textContent,/표지/);
});

test('source and format filters, search, bookmarks and details compose', t => {
  const s=setup(t);
  s.select('origin','partner-report'); assert.equal(s.count(),5);
  s.click('#reset'); s.select('format','video'); assert.equal(s.count(),8);
  assert.ok([...s.d.querySelectorAll('.card-actions a')].some(a=>a.href.includes('youtube.com')));
  s.click('#reset'); s.search('Whisper'); assert.equal(s.count(),1);
  s.click('[data-save]'); assert.deepEqual(JSON.parse(s.w.localStorage.getItem('decisions-showcase:saved:v1')),['decisions-pat-voice']);
  assert.equal(s.w.localStorage.getItem('jev-atlas:saved:v1'),null);
  s.click('[data-details]');
  assert.match(s.d.getElementById('case-body').textContent,/합성 음성|합성 명령/);
  assert.match(s.d.getElementById('case-body').textContent,/한계/);
  assert.ok(s.d.querySelector('#case-body a[href^="https://www.aiformortals.co/"]'));
  s.click('#close-case');
  s.click('#reset'); s.select('origin','official-demo'); assert.equal(s.count(),3);
  s.select('format','demo'); assert.equal(s.count(),3);
  assert.ok([...s.d.querySelectorAll('.media-preview')].every(a=>a.href.includes('.openai.chatgpt.site/')));
});

test('all existing navigation links to the Decisions page and the new page links back', t => {
  for (const file of ['index.html','learn.html','ideas.html','opus.html','opus-html100.html','astra.html','astra-html100.html','fable.html','sonnet.html','sonnet-html100.html','argon.html','argon-html100.html','fable55.html','fable55-status.html','decisions.html']) {
    const dom=new JSDOM(read(file),{url:`https://example.com/jev/${file}`});
    const menu=dom.window.document.querySelector('.site-nav');
    const link=menu.querySelector('a[href="decisions.html"]');
    assert.ok(link, file); assert.equal(link.href,'https://example.com/jev/decisions.html');
    if(file==='decisions.html') assert.equal(link.getAttribute('aria-current'),'true');
    dom.window.close();
  }
});
