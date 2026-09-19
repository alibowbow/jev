/* Local explanatory interactions. All results are authored examples; no inference API calls. */
(() => {
  'use strict';
  const examples = document.querySelectorAll('[data-example]');
  examples.forEach(button => button.addEventListener('click', () => {
    examples.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-example-panel]').forEach(panel => {
      panel.hidden = panel.dataset.examplePanel !== button.dataset.example;
      if (!panel.hidden) {
        const status = document.getElementById('example-status');
        if (status) status.textContent = `${panel.dataset.exampleLabel}: ${panel.querySelector('.action-node h3').textContent}`;
      }
    });
  }));

  function readExampleHash() {
    const matching = [...examples].find(button => `#${button.getAttribute('aria-controls')}` === location.hash);
    if (matching) matching.click();
  }
  if (examples.length) {
    readExampleHash();
    window.addEventListener('hashchange', readExampleHash);
  }

  const distributions = {
    clear: { values: [84, 10, 6], title: '분류 결과를 바로 표시', copy: '확률이 영업에 모여 있습니다. 되돌릴 수 있는 라벨 제안부터 연결해 볼 수 있어요.' },
    mixed: { values: [38, 35, 27], title: '추가 정보나 사람의 검토', copy: '영업이 1등이지만 지원과 비슷합니다. 바로 실행하기보다 추가 정보를 모으거나 검토 목록으로 보냅니다.' }
  };
  const probabilityKeys = ['sales', 'support', 'other'];
  const distributionButtons = document.querySelectorAll('[data-distribution]');
  distributionButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.distribution;
    const state = distributions[key];
    if (!state) return;
    distributionButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    probabilityKeys.forEach((name, index) => {
      document.querySelector(`[data-probability-bar="${name}"]`).style.width = `${state.values[index]}%`;
      document.querySelector(`[data-probability-value="${name}"]`).textContent = `${state.values[index]}%`;
    });
    document.querySelector('[data-route]').dataset.route = key;
    document.getElementById('route-title').textContent = state.title;
    document.getElementById('route-copy').textContent = state.copy;
    document.getElementById('distribution-status').textContent = `영업 ${state.values[0]}%, 지원 ${state.values[1]}%, 기타 ${state.values[2]}%. ${state.title}.`;
  }));

  const filters = [...document.querySelectorAll('[data-idea-filter]')];
  const validCategories = new Set(filters.map(button => button.dataset.ideaFilter));
  function filterIdeas(category) {
    if (!validCategories.has(category)) return;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.ideaFilter === category)));
    let count = 0;
    document.querySelectorAll('[data-idea-category]').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.ideaCategory !== category;
      if (!card.hidden) ++count;
    });
    const status = document.getElementById('idea-count');
    if (status) status.textContent = `${count}개 아이디어`;
    const medical = document.getElementById('medical');
    if (medical) medical.hidden = category !== 'medical';
  }
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.ideaFilter;
    filterIdeas(category);
    const url = new URL(location.href);
    url.hash = category === 'all' ? '' : category;
    history.replaceState(null, '', url);
  }));
  function readCategoryHash() {
    const category = location.hash.slice(1);
    if (validCategories.has(category)) filterIdeas(category);
    else if (!category) filterIdeas('all');
  }
  if (filters.length) {
    readCategoryHash();
    window.addEventListener('hashchange', readCategoryHash);
  }
})();
