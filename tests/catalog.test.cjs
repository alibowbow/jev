'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/data.js'),'utf8'),sandbox);
const d=sandbox.window.JEV_ATLAS;
test('120 unique, fully populated cards',()=>{
 assert.equal(d.cases.length,120);
 assert.equal(new Set(d.cases.map(c=>c.id)).size,120);
 assert.equal(new Set(d.cases.map(c=>c.title)).size,120);
 d.cases.forEach((c,i)=>{
  assert.equal(c.number,i+1);assert.match(c.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  ['title','summary','jev','llm','caution'].forEach(k=>assert.ok(c[k].length>5,`${c.id}: ${k}`));
  assert.ok(c.flow.length>=3);assert.ok(c.sources.length>0);
  assert.ok(['demo','example','concept'].includes(c.evidence));
  c.primitives.forEach(p=>assert.ok(['Choice','Noul','Score'].includes(p)));
 });
});
test('12 categories with 10 cards each',()=>{
 assert.equal(d.categories.length,12);assert.equal(new Set(d.categories.map(c=>c.id)).size,12);
 d.categories.forEach(cat=>assert.equal(d.cases.filter(c=>c.category===cat.id).length,10));
 d.cases.forEach(c=>assert.ok(d.categories.some(cat=>cat.id===c.category)));
});
test('evidence is explicit: 7 demos, 30 official patterns, 83 concepts',()=>{
 for(const [key,n]of Object.entries({demo:7,example:30,concept:83}))assert.equal(d.cases.filter(c=>c.evidence===key).length,n);
});
test('all references resolve to HTTPS primary sources',()=>{
 const hosts=new Set(['docs.typesafe.ai','typesafe.ai','www.langchain.com','langfuse.com','developers.cloudflare.com','github.com']);
 Object.values(d.sources).forEach(([title,url])=>{assert.ok(title.length>3);const u=new URL(url);assert.equal(u.protocol,'https:');assert.ok(hosts.has(u.hostname));});
 d.cases.forEach(c=>c.sources.forEach(ref=>assert.ok(d.sources[ref],`${c.id}: ${ref}`)));
});
test('media always has a permanent fallback; no unverified YouTube IDs in cards',()=>{
 Object.values(d.media).forEach(m=>{assert.equal(new URL(m.page).protocol,'https:');assert.ok(m.note);assert.ok(m.credit);if(m.type==='video'){assert.equal(new URL(m.url).protocol,'https:');assert.match(m.url,/\.mp4$/);}});
 d.cases.forEach(c=>{if(c.media)assert.ok(d.media[c.media]);});
 assert.equal(Object.values(d.media).filter(m=>m.type==='video').length,2);
});
test('static entry points exist and no API credentials or remote JS are required',()=>{
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const file of ['assets/data.js','assets/app.js','assets/styles.css','assets/favicon.svg']){assert.ok(fs.existsSync(path.join(root,file)));assert.ok(html.includes(file));}
 assert.ok(!/<script[^>]+src=["']https?:/.test(html));
 assert.ok(html.includes('lang="ko"'));
 assert.ok(html.includes('name="viewport"'));
 assert.ok(html.includes('aria-labelledby="dialog-title"'));
});
