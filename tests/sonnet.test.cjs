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
  const ctx = { window: {} };
  vm.runInNewContext(read(`assets/${file}`), ctx);
  return JSON.parse(JSON.stringify(ctx.window[name]));
}
const general = load('sonnet-data.js', 'SONNET_ATLAS');
const html = load('sonnet-html-data.js', 'SONNET_HTML_ATLAS');

test('existing six collections remain byte-identical to the reviewed main', () => {
  const snapshots = [
    ['data.js','JEV_ATLAS',86,'a5f6d2816da8a38334f953de15495d3de9d5121f246c0c9210513a7815c574ba'],
    ['opus-data.js','OPUS_ATLAS',150,'2b18c12b0553f3ac46a7cec7791a53c06b0b4de3068bb807d7f819584827ebdf'],
    ['opus-html-data.js','OPUS_HTML_ATLAS',100,'d1ffb9ad477b4832f7cf581eb1da8e5a603522d8a9014d5d17ccadaa73473b4e'],
    ['astra-data.js','ASTRA_ATLAS',140,'435ab766d0fe571181705ba63660893a271dc8a6327e48ed9c69571896396e4b'],
    ['astra-html-data.js','ASTRA_HTML_ATLAS',100,'50f9d24b360a2d56f20744436179ad895f07c238ee925902f70e16b48f819e9b'],
    ['fable-data.js','FABLE_ATLAS',100,'3fae85999c23bde9abfbfcc5f5ada2cb83e1e3659dc7a67499f30a3e8ea418f9']
  ];
  for (const [file,name,count,sha] of snapshots) {
    assert.equal(crypto.createHash('sha256').update(read(`assets/${file}`)).digest('hex'),sha,file);
    assert.equal(load(file,name).cases.length,count,file);
  }
});

test('Sonnet sources separate unique community projects, official demos and partner reports', () => {
  assert.equal(general.cases.length,20);
  const subsets = ['community','official-demo','partner-report'].map(origin=>general.cases.filter(c=>c.evidence.origin===origin));
  assert.deepEqual(subsets.map(s=>s.length),[12,3,5]);
  assert.equal(new Set(subsets[0].map(c=>c.source)).size,12);
  assert.equal(new Set(subsets[1].map(c=>c.demo)).size,3);
  assert.equal(new Set(subsets[2].map(c=>c.author)).size,5);
  assert.ok(subsets[2].every(c=>!c.demo && !c.code && !c.prompt && c.media.type==='report'));
  assert.equal(new Set(general.cases.map(c=>c.id)).size,20);
  assert.equal(new Set(general.cases.map(c=>c.title)).size,20);
  assert.equal(new Set(general.cases.map(c=>c.category)).size,5);
});

test('all new cases have Korean copy, dated primary evidence and safe existing-link types', () => {
  for (const data of [general,html]) {
    for (const c of data.cases) {
      assert.match(c.title+c.summary,/[가-힣]/);
      assert.ok(data.categories.some(cat=>cat.id===c.category));
      assert.equal(c.reviewed,'2026-10-03');
      assert.ok(c.published===null || /^2026-09-28(?:T[\d:.]+Z)?$/.test(c.published),c.id);
      for (const key of ['purpose','input','workflow','result','limitations','modelEvidence','status','access','tools']) assert.ok(c.evidence[key]?.length>10,`${c.id} ${key}`);
      assert.ok(c.evidence.sources.length);
      for (const url of [c.source,c.demo,c.code,c.prompt,...c.evidence.sources.map(s=>s.url)].filter(Boolean)) {
        const u=new URL(url);
        assert.equal(u.protocol,'https:'); assert.equal(u.username+u.password,'');
        assert.ok(data.linkHosts.includes(u.hostname),url);
      }
      assert.ok(!c.demo || c.media.type==='demo' || c.media.type==='mp4',c.id);
      if (!c.media.poster.startsWith('assets/')) assert.ok(data.posterHosts.includes(new URL(c.media.poster).hostname));
      else {assert.match(c.media.poster,/^assets\/sonnet-thumbs\/[a-z0-9-]+\.svg$/);assert.ok(fs.existsSync(path.join(root,c.media.poster)));}
    }
  }
});

test('HTML 100 retains exact numbered file pairs, pinned code and prompt evidence without copying execution files', () => {
  const ledger=JSON.parse(read('docs/sonnet-html100-sources.json'));
  assert.equal(html.cases.length,100);
  assert.equal(ledger.files.length,100);
  assert.equal(ledger.license,null);
  assert.equal(ledger.checks.runtimeReproduced,false);
  assert.equal(ledger.checks.promptMatches,100);
  assert.equal(ledger.httpChecks.length,300);
  assert.ok(ledger.httpChecks.every(r=>r.status===200));
  for (const key of ['id','number','file','demo','prompt','title']) assert.equal(new Set(html.cases.map(c=>c[key])).size,100,key);
  html.cases.forEach((c,i)=>{
    const number=String(i+1).padStart(3,'0'); const record=ledger.files[i];
    assert.equal(c.number,number); assert.equal(c.id,`sonnet-html-${number}`);
    assert.equal(c.file,record.file); assert.equal(c.published,null);
    assert.equal(c.code,`${html.sourceRepository}/blob/${ledger.commit}/${c.file}`);
    assert.equal(c.prompt,c.demo.replace('.html','.txt'));
    assert.equal(record.promptFile,c.file.replace('.html','.txt'));
    assert.equal(record.thumbnail,`thumbs/${c.file.replace('.html','.jpg')}`);
    assert.equal(record.promptMatchesIndex,true);
    assert.equal(c.media.type,'demo');
    for (const key of ['htmlSha256','txtSha256','promptSha256','thumbnailSha256']) assert.match(record[key],/^[a-f0-9]{64}$/);
    assert.ok(!fs.existsSync(path.join(root,c.file)),'third-party execution file not rehosted');
  });
});

test('Sonnet videos match original X IDs and audio-track inspection; mixed tool roles and limits stay explicit', () => {
  const ledger=JSON.parse(read('docs/sonnet-sources.json'));
  const videos=general.cases.filter(c=>c.media.type==='mp4');
  assert.equal(videos.length,10); assert.equal(videos.filter(c=>c.media.hasAudio).length,8);
  for (const c of videos) {
    const record=ledger.cases.find(r=>r.id===c.id);
    assert.equal(record.audioProbe.probeExit,0);
    assert.equal(record.audioProbe.hasAudio,c.media.hasAudio);
    assert.equal(record.audioProbe.url,c.media.url);
    assert.equal(new URL(c.media.url).hostname,'video.twimg.com');
    assert.ok(new URL(c.media.url).pathname.includes(`/${c.media.videoId}/`));
    assert.ok(c.media.poster.includes(`/${c.media.videoId}/`));
  }
  assert.match(general.cases.find(c=>c.id==='sonnet-clawdnam').evidence.tools,/Opus 5.5.*Sonnet 5.5/);
  assert.match(general.cases.find(c=>c.id==='sonnet-puzzle-game').evidence.tools,/ElevenLabs/);
  assert.ok(!general.cases.find(c=>c.id==='sonnet-puzzle-game').demo);
  assert.match(general.cases.find(c=>c.id==='sonnet-tornado').evidence.limitations,/과학적으로 정확한/);
});

function setup(t,options={}) {
  const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const page=options.html?'sonnet-html100.html':'sonnet.html';
  const dom=new JSDOM(read(page),{url:`https://example.com/jev/${page}${options.hash||''}`,runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window,d=w.document;
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  w.HTMLMediaElement.prototype.play=()=>Promise.resolve();
  w.HTMLMediaElement.prototype.pause=function(){};w.HTMLMediaElement.prototype.load=function(){};
  const key=options.html?html.storageKey:general.storageKey;
  if (options.saved) w.localStorage.setItem(key,options.saved);
  w.localStorage.setItem('opus-atlas:saved:v1','["bricks"]');
  if (options.blockStorage) Object.defineProperty(w,'localStorage',{get(){throw new Error('Storage denied');}});
  w.eval(read(options.html?'assets/sonnet-html-data.js':'assets/sonnet-data.js'));
  const data=w.SONNET_HTML_ATLAS||w.SONNET_ATLAS;
  options.mutate?.(data);
  w.eval(read('assets/app.js'));
  t.after(()=>{w.close();assert.deepEqual(errors,[]);});
  return {w,d,data,key,count:()=>d.querySelectorAll('#cards .card').length,
    click:sel=>{const node=d.querySelector(sel);assert.ok(node,sel);node.click();},
    input:value=>{const node=d.getElementById('search');node.value=value;node.dispatchEvent(new w.Event('input'));},
    select:(id,value)=>{const node=d.getElementById(id);node.value=value;node.dispatchEvent(new w.Event('change'));}};
}

test('Sonnet filters distinguish report types, video/audio/demo/code and Korean/English search with empty reset',t=>{
  const {count,select,input,click,d}=setup(t);
  assert.equal(count(),20);assert.equal(d.querySelectorAll('video,iframe').length,0);
  for(const [kind,num] of [['community',12],['official-demo',3],['partner-report',5]]){select('origin',kind);assert.equal(count(),num);}
  click('#reset');
  for(const [format,num] of [['video',10],['audio',8],['demo',6],['code',1]]){select('format',format);assert.equal(count(),num);}
  click('#reset');input('플라스마');assert.equal(count(),1);input('Three.js');assert.equal(count(),2);
  input('없음없는사례777');assert.equal(count(),0);assert.equal(d.getElementById('empty').hidden,false);
  click('#empty-reset');assert.equal(count(),20);
});

test('HTML cards keep all original external links and numbered English search without embedded execution',t=>{
  const {count,d,data,input}=setup(t,{html:true});
  assert.equal(count(),100);assert.equal(d.querySelectorAll('iframe,video,[data-play]').length,0);
  for(const c of data.cases){const card=d.getElementById(`case-${c.id}`);assert.equal(card.querySelector('.media-preview').href,c.demo);assert.equal(card.querySelector('.media-preview').target,'_blank');}
  input('001');assert.equal(count(),1);input('Aurora Glass');assert.equal(count(),1);
});

test('save restore, model isolation and denied storage work for both new collections',t=>{
  for(const isHtml of [false,true]){
    const s=setup(t,{html:isHtml});const id=s.data.cases[0].id;
    s.click(`[data-save="${id}"]`);assert.equal(s.w.localStorage.getItem(s.key),JSON.stringify([id]));
    assert.equal(s.w.localStorage.getItem('opus-atlas:saved:v1'),'["bricks"]');
    const restored=setup(t,{html:isHtml,saved:s.w.localStorage.getItem(s.key)});
    restored.click('#saved-toggle');assert.equal(restored.count(),1);
    restored.w.dispatchEvent(new restored.w.StorageEvent('storage',{key:'opus-atlas:saved:v1',newValue:'[]'}));assert.equal(restored.count(),1);
    restored.w.dispatchEvent(new restored.w.StorageEvent('storage',{key:restored.key,newValue:'[]'}));assert.equal(restored.count(),0);
    const blocked=setup(t,{html:isHtml,blockStorage:true});blocked.click(`[data-save="${id}"]`);blocked.click('#saved-toggle');assert.equal(blocked.count(),1);assert.match(blocked.d.getElementById('toast').textContent,/이 창에만/);
  }
});

test('details expose role, limitations, unknown dates and safe sources with Escape focus restoration',t=>{
  const {d,w,click}=setup(t,{html:true});const button=d.querySelector('[data-details]');button.focus();button.click();
  assert.equal(d.getElementById('case-dialog').open,true);
  assert.match(d.getElementById('case-body').textContent,/원문 게시일미상.*확인일2026-10-03 \(UTC\)/);
  assert.match(d.getElementById('case-body').textContent,/生成ログ|생성 로그/);
  assert.ok(d.querySelector('#case-body a').href.includes('/blob/d50dc15'));
  w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  assert.equal(d.getElementById('case-dialog').open,false);assert.equal(d.activeElement,button);
  w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'/',bubbles:true}));assert.equal(d.activeElement,d.getElementById('search'));
  click('[data-details="sonnet-html-001"]');assert.equal(d.querySelectorAll('iframe,video').length,0);
});

test('case links focus the correct card, malformed links are handled and sharing keeps the collection route',async t=>{
  const s=setup(t,{hash:'#case=sonnet-puzzle-game'});assert.equal(s.d.querySelector('.highlight').dataset.id,'sonnet-puzzle-game');assert.equal(s.d.querySelectorAll('video').length,0);
  s.click('[data-share="sonnet-puzzle-game"]');await Promise.resolve();
  assert.equal(s.d.getElementById('share-link').value,'https://example.com/jev/sonnet.html#case=sonnet-puzzle-game');
  const h=setup(t,{html:true,hash:'#case=sonnet-html-100'});assert.equal(h.d.querySelector('.highlight').dataset.id,'sonnet-html-100');
  const bad=setup(t,{hash:'#case=%E0%A4%A'});assert.match(bad.d.getElementById('toast').textContent,/올바르지 않은/);
});

test('inline audible playback, mute toggle, error retry and stale events preserve source access',t=>{
  const {d,w,click,input}=setup(t);click('[data-play="sonnet-goldilocks"]');
  const old=d.querySelector('video');assert.equal(old.closest('.card').dataset.id,'sonnet-goldilocks');assert.equal(old.muted,false);assert.equal(old.volume,1);
  click('#toggle-sound');assert.equal(old.muted,true);click('#toggle-sound');assert.equal(old.muted,false);
  click('[data-details="sonnet-goldilocks"]');w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(d.querySelector('video'),old);
  old.dispatchEvent(new w.Event('error'));assert.equal(d.getElementById('retry-player').hidden,false);assert.ok(d.getElementById('player-source').href.startsWith('https://x.com/'));assert.equal(d.querySelectorAll('video').length,0);
  click('#retry-player');const retry=d.querySelector('video');assert.ok(retry);old.dispatchEvent(new w.Event('error'));assert.equal(d.querySelector('video'),retry);
  input('BMW');assert.equal(d.querySelectorAll('video').length,0);click('[data-play="sonnet-bmw-threejs"]');assert.equal(d.getElementById('toggle-sound').hidden,true);assert.match(d.getElementById('player-audio-note').textContent,/오디오 트랙이 없습니다/);
});

test('unsafe links, injected markup, wrong video IDs and failed thumbnails never execute data HTML',t=>{
  const {d,w,click}=setup(t,{mutate:data=>{
    const c=data.cases[0];c.title='<img src=x onerror=alert(1)>';c.source='javascript:alert(1)';c.media.poster='assets/sonnet-thumbs/../evil.svg';c.media.videoId='123';c.evidence.sources=[{label:'<script>bad</script>',url:'https://x.com@evil.example/x'}];
  }});
  assert.equal(d.querySelector('#cards h2').textContent,'<img src=x onerror=alert(1)>');assert.equal(d.querySelectorAll('img[src="x"]').length,0);
  assert.ok(!d.querySelector('.card:first-child .media-preview img'));assert.equal(d.querySelectorAll('a[href^="javascript:"]').length,0);
  click('[data-details="sonnet-goldilocks"]');assert.equal(d.querySelectorAll('#case-body a[href]').length,0);click('#close-case');
  click('[data-play="sonnet-goldilocks"]');assert.equal(d.querySelectorAll('video').length,0);assert.equal(d.getElementById('retry-player').hidden,false);
  const img=d.querySelector('.card:nth-child(2) img');img.dispatchEvent(new w.Event('error'));assert.equal(img.closest('.media-preview').classList.contains('image-failed'),true);
});
