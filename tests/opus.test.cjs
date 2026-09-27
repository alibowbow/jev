'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/opus-data.js'), 'utf8'), context);
const data = context.window.OPUS_ATLAS;

test('100 distinct Opus projects retain original and collection sources, dates and Korean descriptions', () => {
  assert.equal(data.cases.length, 100);
  for (const key of ['id', 'source', 'research', 'title']) assert.equal(new Set(data.cases.map(c => c[key])).size, 100, key);
  assert.equal(data.categories.length, 7);
  for (const c of data.cases) {
    assert.match(c.id, /^[a-z0-9-]+$/);
    assert.match(c.title + c.summary, /[가-힣]/);
    assert.ok(data.categories.some(cat => cat.id === c.category));
    assert.ok(c.author && c.note);
    assert.match(c.published, /^2026-09-2[2-7]$/);
    assert.equal(c.reviewed, '2026-09-27');
    if (c.code) assert.ok(['github.com', 'gist.github.com'].includes(new URL(c.code).hostname), `${c.id}: code must point to a repository, not a hosted demo`);
    for (const key of ['source', 'research', 'demo', 'code', 'fullVideo']) if (c[key]) {
      const u = new URL(c[key]);
      assert.equal(u.protocol, 'https:');
      assert.ok(data.linkHosts.includes(u.hostname));
      assert.equal(u.username + u.password, '');
    }
    if (c.media.type === 'mp4') {
      assert.ok([true, false, null].includes(c.media.hasAudio));
      assert.equal(c.media.audioVerifiedAt, c.media.hasAudio === null ? null : '2026-09-27');
      if (c.media.clipSeconds) {
        assert.equal(c.media.url, `https://ohmyopus.com/media/${c.id}/highlight.mp4`);
        assert.ok(c.media.clipSeconds > 0 && c.media.clipSeconds <= c.media.sourceSeconds + 0.1);
        assert.equal(c.media.hasAudio, false);
        assert.match(c.note, /무음 미리보기/);
      } else {
        assert.equal(new URL(c.media.url).hostname, 'video.twimg.com');
        assert.ok(c.media.url.includes(`/${c.media.videoId}/`));
        assert.ok(c.media.duration > 0);
        assert.match(c.media.evidence, /^https:\/\/cdn\.syndication\.twimg\.com\//);
      }
    }
  }
});

test('every existing page links to the separate Opus page and its assets are local', () => {
  for (const file of ['index.html', 'learn.html', 'ideas.html', 'opus.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(html, /<a href="opus.html"[^>]*>Opus5.5<\/a>/);
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
  }
  const html = fs.readFileSync(path.join(root, 'opus.html'), 'utf8');
  assert.match(html, /<html lang="ko">/);
  assert.ok(!html.includes('assets/data.js'));
  assert.ok(!html.includes('widgets.js'));
  for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?]+)/g)) assert.ok(fs.existsSync(path.join(root, match[1])));
});
