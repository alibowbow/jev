'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const collections = [
  ['fable-data.js', 'FABLE_ATLAS', 'Fable-5.1-100-HTML-Files', 'fable-', 42],
  ['astra-html-data.js', 'ASTRA_HTML_ATLAS', 'GPT-6-Astra-100-HTML-Files', 'astra-html-', 34]
];
for (const [file, global, slug, prefix, artCount] of collections) {
  test(`${global} preserves 001–100 and links each matching original asset`, () => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(root, 'assets', file), 'utf8'), context);
    const data = context.window[global];
    assert.equal(data.cases.length, 100);
    assert.equal(data.cases.filter(c => c.category === 'art').length, artCount);
    assert.match(data.sourceCommit, /^[a-f0-9]{40}$/);
    assert.equal(data.sourceRepository, `https://github.com/MiaAI-Lab/${slug}`);
    for (const key of ['id', 'number', 'title', 'file', 'demo']) assert.equal(new Set(data.cases.map(c => c[key])).size, 100);
    data.cases.forEach((c, i) => {
      const number = String(i + 1).padStart(3, '0');
      assert.equal(c.number, number);
      assert.equal(c.id, prefix + number);
      assert.ok(c.file.startsWith(number + '-'));
      assert.match(c.title + c.summary, /[가-힣]/);
      assert.ok(c.originalTitle && c.keywords.includes(c.originalTitle));
      assert.ok(data.categories.some(cat => cat.id === c.category));
      assert.equal(c.demo, `https://miaai-lab.github.io/${slug}/${c.file}`);
      assert.equal(c.media.poster, `https://miaai-lab.github.io/${slug}/thumbs/${c.file.replace('.html', '.jpg')}`);
      assert.equal(c.code, `${data.sourceRepository}/blob/main/${c.file}`);
      assert.equal(c.prompt, c.demo.replace('.html', '.txt'));
      assert.equal(c.source, c.demo);
      assert.equal(c.media.type, 'demo');
      assert.ok(data.linkHosts.includes(new URL(c.demo).hostname));
      assert.ok(data.posterHosts.includes(new URL(c.media.poster).hostname));
    });
  });
}
