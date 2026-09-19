/* Price arithmetic only. Verified rate snapshots live in the linked HTML table. */
(() => {
  'use strict';
  const form = document.getElementById('cost-form');
  if (!form) return;
  const inputs = ['cost-count', 'cost-input', 'cost-output'].map(id => document.getElementById(id));
  const rates = [...document.querySelectorAll('[data-cost-model]')].map(row => ({
    id: row.dataset.costModel,
    input: Number(row.dataset.inputRate),
    output: Number(row.dataset.outputRate),
    result: document.querySelector(`[data-cost-result="${row.dataset.costModel}"]`)
  }));
  const formatNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const formatMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 });
  const usd = value => value > 0 && value < 0.000001 ? '<$0.000001' : formatMoney.format(value);
  const results = document.getElementById('cost-results');
  const error = document.getElementById('cost-error');
  const status = document.getElementById('cost-status');
  function update(announce = true) {
    const invalid = inputs.filter(input => input.value.trim() === '' || !Number.isInteger(input.valueAsNumber) || !input.checkValidity());
    inputs.forEach(input => input.setAttribute('aria-invalid', String(invalid.includes(input))));
    error.hidden = invalid.length === 0;
    results.hidden = invalid.length > 0;
    if (invalid.length) {
      error.textContent = '범위 안의 정수를 입력하세요. 건수 0~1억, 입력 1~32,000토큰, LLM 과금 출력 0~100만 토큰.';
      status.textContent = '';
      return;
    }
    const [count, inputTokens, outputTokens] = inputs.map(input => input.valueAsNumber);
    const costs = rates.map(rate => {
      const input = count * inputTokens * rate.input / 1000000;
      const output = count * outputTokens * rate.output / 1000000;
      return { ...rate, input, output, total: input + output };
    });
    const maximum = Math.max(...costs.map(cost => cost.total));
    costs.forEach(cost => {
      cost.result.querySelector('[data-cost-input-bar]').style.width = `${maximum ? cost.input / maximum * 100 : 0}%`;
      cost.result.querySelector('[data-cost-output-bar]').style.width = `${maximum ? cost.output / maximum * 100 : 0}%`;
      cost.result.querySelector('[data-cost-total]').textContent = usd(cost.total);
      cost.result.querySelector('[data-cost-breakdown]').textContent = `입력 ${usd(cost.input)} + 출력 ${usd(cost.output)}`;
    });
    document.querySelector('[data-cost-axis-mid]').textContent = usd(maximum / 2);
    document.querySelector('[data-cost-axis-max]').textContent = usd(maximum);
    const summary = `${formatNumber.format(count)}건 · 건당 입력 ${formatNumber.format(inputTokens)} / LLM 과금 출력 ${formatNumber.format(outputTokens)}토큰`;
    document.getElementById('cost-caption').textContent = summary;
    if (announce) status.textContent = `${summary}. ${costs.map(cost => `${cost.result.querySelector('span').textContent} ${usd(cost.total)}`).join(', ')}.`;
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', () => update());
  update(false);
})();
