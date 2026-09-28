'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/opus-html-data.js'), 'utf8'), context);
const data = context.window.OPUS_HTML_ATLAS;

test('HTML 100 keeps every original number and matching demo, screenshot, code and prompt', () => {
  assert.equal(data.cases.length, 100);
  for (const key of ['id', 'number', 'title', 'file', 'demo']) assert.equal(new Set(data.cases.map(c => c[key])).size, 100);
  data.cases.forEach((c, i) => {
    const number = String(i + 1).padStart(3, '0');
    assert.equal(c.number, number);
    assert.ok(c.file.startsWith(number + '-'));
    assert.match(c.file, /^\d{3}-[a-z0-9-]+\.html$/);
    assert.match(c.title + c.summary, /[가-힣]/);
    assert.ok(c.originalTitle && c.keywords.includes(c.originalTitle));
    assert.ok(data.categories.some(cat => cat.id === c.category));
    assert.equal(c.demo, `https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/${c.file}`);
    assert.equal(c.media.poster, `https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/thumbs/${c.file.replace('.html', '.jpg')}`);
    assert.equal(c.code, `${data.sourceRepository}/blob/main/${c.file}`);
    assert.equal(c.prompt, c.demo.replace('.html', '.txt'));
    assert.equal(c.source, c.demo);
    assert.equal(c.media.type, 'demo');
  });
});
