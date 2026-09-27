'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/astra-data.js'), 'utf8'), context);
const data = context.window.ASTRA_ATLAS;

test('Astra has 140 sourced projects, 59 art cases and 132 original videos without duplicate media', () => {
  assert.equal(data.cases.length, 140);
  assert.equal(data.cases.filter(c => c.category === 'motion').length, 59);
  const videos = data.cases.filter(c => c.media.type === 'mp4');
  assert.equal(videos.length, 132);
  assert.equal(new Set(videos.map(c => c.media.videoId)).size, videos.length);
  for (const key of ['id', 'source', 'title']) assert.equal(new Set(data.cases.map(c => c[key])).size, 140);
  for (const c of data.cases) {
    assert.match(c.title + c.summary, /[가-힣]/);
    assert.ok(data.categories.some(cat => cat.id === c.category));
    assert.ok(c.author && c.handle && c.note);
    assert.match(c.published, /^2026-09-\d{2}$/);
    for (const key of ['source', 'research', 'demo', 'code']) if (c[key]) {
      const u = new URL(c[key]);
      assert.equal(u.protocol, 'https:');
      assert.ok(data.linkHosts.includes(u.hostname));
      assert.equal(u.username + u.password, '');
    }
    if (c.media.poster) assert.ok(data.posterHosts.includes(new URL(c.media.poster).hostname));
    else assert.equal(c.media.type, 'image');
    if (c.media.type === 'mp4') {
      const u = new URL(c.media.url);
      assert.equal(u.hostname, 'video.twimg.com');
      if (c.media.gifId) {
        assert.equal(u.pathname, `/tweet_video/${c.media.gifId}.mp4`);
        assert.equal(c.media.hasAudio, false);
      } else {
        assert.ok(u.pathname.includes(`/${c.media.videoId}/`));
        assert.ok(c.media.duration > 0);
      }
      assert.ok([true, false, null].includes(c.media.hasAudio));
      assert.equal(c.media.previewFallback, false);
      assert.match(c.media.evidence, /^https:\/\/cdn\.syndication\.twimg\.com\/tweet-result\?/);
      assert.equal(new URL(c.media.evidence).searchParams.get('id'), c.source.split('/').at(-1));
    }
  }
});

test('all pages share the new identity and model navigation, without catalogue slogans', () => {
  for (const file of ['index.html', 'opus.html', 'astra.html', 'learn.html', 'ideas.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(html, /<title>[^<]*AI Showcase<\/title>/);
    assert.match(html, /href="astra.html"[^>]*>GPT‑6 Astra<\/a>/);
    assert.ok(!html.includes('상상이 <span>작품이 되는 순간.'));
    assert.ok(!html.includes('어디까지 만들 수 있을까?'));
    assert.ok(!html.includes('brand-divider'));
  }
  const html = fs.readFileSync(path.join(root, 'astra.html'), 'utf8');
  assert.match(html, /name="referrer" content="no-referrer"/);
  assert.ok(!html.includes('assets/opus-data.js'));
  assert.ok(!html.includes('assets/data.js'));
  for (const m of html.matchAll(/(?:src|href)="(assets\/[^"?]+)/g)) assert.ok(fs.existsSync(path.join(root, m[1])));
});
