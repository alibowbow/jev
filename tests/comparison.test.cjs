'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const read = file => fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');
function setup(t) {
  const dom = new JSDOM(read('learn.html'), { runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  dom.window.eval(read('assets/comparison.js'));
  const d = dom.window.document;
  return {
    d,
    set(id, value) {
      const input = d.getElementById(id);
      input.value = value;
      input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
    },
    totals: () => [...d.querySelectorAll('[data-cost-total]')].map(n => n.textContent)
  };
}

test('costs include billed LLM output while Jev remains input-only, and scale with volume', t => {
  const { d, set, totals } = setup(t);
  assert.deepEqual(totals(), ['$0.42', '$2.60', '$9.375', '$125.00', '$125.00']);
  set('cost-output', '200');
  assert.deepEqual(totals(), ['$0.42', '$4.40', '$15.00', '$200.00', '$200.00']);
  assert.match(d.querySelector('[data-cost-result="luna"] small').textContent, /입력 \$2.00 \+ 출력 \$2.40/);
  set('cost-count', '1000');
  assert.deepEqual(totals(), ['$0.042', '$0.44', '$1.50', '$20.00', '$20.00']);
  assert.match(d.getElementById('cost-status').textContent, /Jev \$0.042/);
  const last = d.querySelector('[data-cost-result="fable"]');
  assert.equal(last.querySelector('[data-cost-input-bar]').style.width, '50%');
  assert.equal(last.querySelector('[data-cost-output-bar]').style.width, '50%');
});

test('zero requests clear every cost and bar without NaN, and tiny costs remain visible', t => {
  const { d, set, totals } = setup(t);
  set('cost-count', '0');
  assert.deepEqual(totals(), ['$0.00', '$0.00', '$0.00', '$0.00', '$0.00']);
  assert.equal(d.getElementById('cost-results').hidden, false);
  for (const bar of d.querySelectorAll('[data-cost-input-bar], [data-cost-output-bar]')) assert.equal(bar.style.width, '0%');
  set('cost-count', '1');
  set('cost-input', '1');
  set('cost-output', '0');
  assert.equal(totals()[0], '<$0.000001');
  assert.equal(totals()[4], '$0.00001');
});

test('invalid inputs hide stale estimates and recovery restores the calculation', t => {
  const { d, set, totals } = setup(t);
  for (const [id, value, valid] of [
    ['cost-count', '', '10000'], ['cost-count', '-1', '10000'],
    ['cost-count', '1.5', '10000'], ['cost-count', '100000001', '10000'],
    ['cost-input', '0', '1000'], ['cost-input', '32001', '1000'],
    ['cost-output', '1000001', '50']
  ]) {
    set(id, value);
    assert.equal(d.getElementById('cost-results').hidden, true);
    assert.equal(d.getElementById('cost-error').hidden, false);
    assert.equal(d.getElementById(id).getAttribute('aria-invalid'), 'true');
    set(id, valid);
    assert.equal(d.getElementById('cost-results').hidden, false);
    assert.equal(d.getElementById('cost-error').hidden, true);
    assert.deepEqual(totals(), ['$0.42', '$2.60', '$9.375', '$125.00', '$125.00']);
  }
});
