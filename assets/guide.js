/* Small, local interactions for the explanatory pages. No inference API calls. */
(() => {
  'use strict';
  const examples = document.querySelectorAll('[data-example]');
  examples.forEach(button => button.addEventListener('click', () => {
    examples.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-example-panel]').forEach(panel => {
      panel.hidden = panel.dataset.examplePanel !== button.dataset.example;
    });
  }));
  const filters = document.querySelectorAll('[data-idea-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('[data-idea-category]').forEach(card => {
      card.hidden = button.dataset.ideaFilter !== 'all' && card.dataset.ideaCategory !== button.dataset.ideaFilter;
      if (!card.hidden) ++count;
    });
    const status = document.getElementById('idea-count');
    if (status) status.textContent = `${count}개 아이디어`;
  }));
})();
