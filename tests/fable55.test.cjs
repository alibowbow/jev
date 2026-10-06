'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function load(file, name) {
  const ctx = { window: {} }; vm.runInNewContext(read(`assets/${file}`), ctx);
  return JSON.parse(JSON.stringify(ctx.window[name]));
}
const atlas = load('fable55-data.js', 'FABLE55_ATLAS');
const previous = [
  ['data.js','JEV_ATLAS'], ['opus-data.js','OPUS_ATLAS'], ['opus-html-data.js','OPUS_HTML_ATLAS'],
  ['astra-data.js','ASTRA_ATLAS'], ['astra-html-data.js','ASTRA_HTML_ATLAS'], ['fable-data.js','FABLE_ATLAS'],
  ['sonnet-data.js','SONNET_ATLAS'], ['sonnet-html-data.js','SONNET_HTML_ATLAS']
].map(([file,name]) => load(file,name));

test('Fable 5.5 adds 20 distinct attributed projects without relabeling existing cases', () => {
  assert.equal(atlas.cases.length,20); assert.equal(atlas.categories.length,5);
  for (const key of ['id','title','source']) assert.equal(new Set(atlas.cases.map(c=>c[key])).size,20,key);
  const oldSources = new Set(previous.flatMap(d=>d.cases.map(c=>c.source)));
  const oldMedia = new Set(previous.flatMap(d=>d.cases.map(c=>c.media.videoId).filter(Boolean)));
  for (const c of atlas.cases) {
    assert.ok(!oldSources.has(c.source),c.id); assert.ok(!oldMedia.has(c.media.videoId),c.id);
    assert.equal(c.evidence.origin,'community-claimed');
    assert.ok(atlas.categories.some(cat=>cat.id===c.category));
    assert.match(c.title+c.summary,/[가-힣]/);
    assert.equal(c.reviewed,'2026-10-06');
    assert.ok(!Number.isNaN(Date.parse(c.published)),c.id);
    assert.ok(Date.parse(c.published)<Date.parse('2026-10-07'),c.id);
    for (const key of ['purpose','input','workflow','result','limitations','modelEvidence','status','access','tools']) assert.ok(c.evidence[key]?.length>10,`${c.id} ${key}`);
    assert.match(c.evidence.modelEvidence,/Fable 5\.5/);
    for (const u of [c.source,c.demo,c.code,...c.evidence.sources.map(s=>s.url)].filter(Boolean)) {
      const url=new URL(u);assert.equal(url.protocol,'https:');assert.equal(url.username+url.password,'');
      assert.ok(atlas.linkHosts.includes(url.hostname),u);
    }
  }
  assert.equal(new Set(atlas.cases.map(c=>c.media.videoId)).size,20);
});

test('Fable 5.5 media stay original, audio status explicit and inaccessible demo excluded', () => {
  assert.equal(atlas.cases.filter(c=>c.media.type==='mp4').length,20);
  assert.equal(atlas.cases.filter(c=>c.media.hasAudio===true).length,15);
  assert.equal(atlas.cases.filter(c=>c.media.hasAudio===false).length,5);
  for (const c of atlas.cases) {
    assert.equal(new URL(c.media.url).hostname,'video.twimg.com');
    assert.ok(c.media.url.includes(`/${c.media.videoId}/`));
    assert.ok(c.media.poster.includes(`/${c.media.videoId}/`));
    assert.ok(atlas.posterHosts.includes(new URL(c.media.poster).hostname));
    assert.ok(c.media.alt?.length>5);
    assert.ok(!c.demo?.includes('pokemon-redstone.vercel.app'));
  }
  const body=JSON.stringify(atlas.cases);
  assert.match(body,/Opus 5\.5/); assert.match(body,/402/);
  assert.match(body,/ccfc2a5a5e6d4dade7e100912d6c245f1a82a6d9/);
  assert.notEqual(atlas.storageKey,previous[5].storageKey);
});

test('Sonnet data remain byte-identical alongside existing preservation checks', () => {
  for (const [file,sha] of [['sonnet-data.js','b9dc1bb3cc25fb6679de85a2688b5386fa80f7c0fc7997c3cded8d8cabb4b90c'],['sonnet-html-data.js','31f70488c6d88e8d56c65a26e08075c1a44e4f95c21454146daad05620d7066d']]) {
    assert.equal(crypto.createHash('sha256').update(read(`assets/${file}`)).digest('hex'),sha);
  }
});

function setup(t, options={}) {
  const errors=[]; const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(read('fable55.html'),{url:`https://example.com/jev/fable55.html${options.hash||''}`,runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window,d=w.document;
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.HTMLMediaElement.prototype.play=()=>Promise.resolve();
  w.HTMLMediaElement.prototype.pause=function(){};w.HTMLMediaElement.prototype.load=function(){};
  if(options.saved) w.localStorage.setItem(atlas.storageKey,options.saved);
  w.localStorage.setItem('fable-html100:saved:v1','["fable-html-001"]');
  if(options.blockStorage) Object.defineProperty(w,'localStorage',{get(){throw new Error('Storage denied');}});
  w.eval(read('assets/fable55-data.js'));options.mutate?.(w.FABLE55_ATLAS);w.eval(read('assets/app.js'));
  t.after(()=>{w.close();assert.deepEqual(errors,[]);});
  return {w,d,count:()=>d.querySelectorAll('#cards .card').length,
    click:sel=>{const n=d.querySelector(sel);assert.ok(n,sel);n.click();},
    input:value=>{const n=d.getElementById('search');n.value=value;n.dispatchEvent(new w.Event('input'));},
    select:(id,value)=>{const n=d.getElementById(id);n.value=value;n.dispatchEvent(new w.Event('change'));}};
}

test('page and cards expose attribution clearly without autoplay or widgets', t => {
  const {d,count}=setup(t);assert.equal(count(),20);
  assert.match(d.querySelector('.preview-note').textContent,/모델 미확인.*Fable 5\.1/);
  assert.equal(d.querySelectorAll('.metric-disclosure').length,20);
  for(const el of d.querySelectorAll('.metric-disclosure')) assert.equal(el.textContent,'제작자 주장 · 모델 미확인');
  assert.equal(d.querySelectorAll('iframe,video').length,0);
  assert.equal(d.querySelector('#total-count').textContent,'20');
  assert.equal(d.querySelector('#video-count').textContent,'20');
});

test('categories, Korean and English search, media filters, sorting and empty reset work',t=>{
  const {count,select,input,click,d}=setup(t);
  for(const cat of atlas.categories){click(`[data-category="${cat.id}"]`);assert.equal(count(),atlas.cases.filter(c=>c.category===cat.id).length);}
  click('#reset');input('Three.js');assert.ok(count()>0);input('없음없는사례777');assert.equal(count(),0);
  click('#empty-reset');assert.equal(count(),20);
  for(const [format,num] of [['video',20],['audio',15],['demo',atlas.cases.filter(c=>c.demo).length],['code',atlas.cases.filter(c=>c.code).length]]){select('format',format);assert.equal(count(),num);}
  click('#reset');select('sort','newest');
  const newest=[...atlas.cases].sort((a,b)=>b.published.localeCompare(a.published))[0];
  assert.equal(d.querySelector('.card').dataset.id,newest.id);
});

test('bookmarks stay separate, restore across visits, sync and survive denied storage',t=>{
  const id=atlas.cases[0].id,s=setup(t);s.click(`[data-save="${id}"]`);
  assert.equal(s.w.localStorage.getItem(atlas.storageKey),JSON.stringify([id]));
  assert.equal(s.w.localStorage.getItem('fable-html100:saved:v1'),'["fable-html-001"]');
  const restored=setup(t,{saved:JSON.stringify([id])});restored.click('#saved-toggle');assert.equal(restored.count(),1);
  restored.w.dispatchEvent(new restored.w.StorageEvent('storage',{key:'fable-html100:saved:v1',newValue:'[]'}));assert.equal(restored.count(),1);
  restored.w.dispatchEvent(new restored.w.StorageEvent('storage',{key:atlas.storageKey,newValue:'[]'}));assert.equal(restored.count(),0);
  const blocked=setup(t,{blockStorage:true});blocked.click(`[data-save="${id}"]`);blocked.click('#saved-toggle');assert.equal(blocked.count(),1);assert.match(blocked.d.getElementById('toast').textContent,/이 창에만/);
});

test('details, deep links and sharing retain the collection and restore keyboard focus',async t=>{
  const id=atlas.cases[0].id,{d,w,click}=setup(t,{hash:`#case=${id}`});
  assert.equal(d.querySelector('.highlight').dataset.id,id);assert.equal(d.querySelectorAll('video').length,0);
  const btn=d.querySelector(`[data-details="${id}"]`);btn.focus();btn.click();
  assert.equal(d.getElementById('case-dialog').open,true);assert.match(d.getElementById('case-origin').textContent,/모델 미확인/);
  assert.match(d.getElementById('case-body').textContent,/확인일2026-10-06 \(UTC\)/);
  w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  assert.equal(d.getElementById('case-dialog').open,false);assert.equal(d.activeElement,btn);
  click(`[data-share="${id}"]`);await Promise.resolve();assert.equal(d.getElementById('share-link').value,`https://example.com/jev/fable55.html#case=${id}`);
  const bad=setup(t,{hash:'#case=%E0%A4%A'});assert.match(bad.d.getElementById('toast').textContent,/올바르지 않은/);
});

test('inline media has error retry, source fallback, stale-event and filter cleanup',t=>{
  const c=atlas.cases.find(c=>c.media.hasAudio),{d,w,click,input}=setup(t);click(`[data-play="${c.id}"]`);
  const old=d.querySelector('video');assert.ok(old);assert.equal(old.muted,false);
  click('#toggle-sound');assert.equal(old.muted,true);
  old.dispatchEvent(new w.Event('error'));assert.equal(d.getElementById('retry-player').hidden,false);
  assert.equal(d.getElementById('player-source').href,c.source);click('#retry-player');const retry=d.querySelector('video');
  old.dispatchEvent(new w.Event('error'));assert.equal(d.querySelector('video'),retry);
  input('없음없는사례777');assert.equal(d.querySelectorAll('video').length,0);
});

test('Fable data rendering rejects executable markup, unsafe hosts and wrong video IDs',t=>{
  const id=atlas.cases[0].id,{d,click}=setup(t,{mutate:data=>{
    const c=data.cases[0];c.title='<img src=x onerror=alert(1)>';c.source='javascript:alert(1)';c.media.poster='https://evil.example/a.jpg';c.media.videoId='1';c.evidence.sources=[{label:'bad',url:'https://x.com@evil.example/x'}];
  }});
  assert.equal(d.querySelector('#cards h2').textContent,'<img src=x onerror=alert(1)>');assert.equal(d.querySelectorAll('img[src="x"],a[href^="javascript:"]').length,0);
  assert.equal(d.querySelector(`#case-${id} .media-preview img`),null);click(`[data-details="${id}"]`);
  assert.equal(d.querySelectorAll('#case-body a[href^="https://evil.example"]').length,0);click('#close-case');
  click(`[data-play="${id}"]`);assert.equal(d.querySelectorAll('video').length,0);
});

test('public evidence ledger matches every source, date, linked MP4 and audio inspection', () => {
  const ledger=JSON.parse(read('docs/fable55-sources.json'));
  assert.equal(ledger.cases.length,20);assert.equal(ledger.duplicateCheck.originalSourceAndVideoIdDuplicates,0);
  assert.equal(new Set(atlas.cases.map(c=>c.handle)).size,16);
  assert.equal(atlas.cases.filter(c=>c.demo).length,4);
  assert.equal(atlas.cases.filter(c=>c.code).length,1);
  assert.match(ledger.officialStatus.finding,/Fable 5\.1/);
  for(const c of atlas.cases){
    const row=ledger.cases.find(r=>r.caseId===c.id);assert.ok(row,c.id);
    assert.equal(row.originalPost,c.source);assert.equal(row.publishedAt,c.published);
    assert.equal(row.handle,c.handle);assert.match(row.modelClaimExcerpt,/fable 5\.5/i);
    assert.ok(row.modelClaimExcerpt.trim().split(/\s+/).length<=25,c.id);
    assert.equal(row.originalPostAccess.authorAndExplicitModelClaimChecked,true);
    assert.equal(row.media.url,c.media.url);assert.equal(row.media.videoId,c.media.videoId);
    assert.equal(row.media.hasAudio,c.media.hasAudio);assert.equal(row.media.downloadedSuccessfully,true);
    if(c.demo) assert.ok(row.demoAvailability.some(d=>d.url===c.demo&&d.httpStatus===200&&d.exposedAsDemo));
  }
  assert.doesNotMatch(JSON.stringify(ledger),/\/workspace\/|\/tmp\//);
});


test('Fable video playback rejects a mismatched declared video ID by itself', t => {
  const id=atlas.cases[0].id,{d,click}=setup(t,{mutate:data=>{data.cases[0].media.videoId='1';}});
  click(`[data-play="${id}"]`);assert.equal(d.querySelectorAll('video').length,0);
  assert.equal(d.getElementById('retry-player').hidden,false);
});
