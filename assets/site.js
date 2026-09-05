/* Paper details use native HTML disclosure; JavaScript only adds author filtering. */
(() => {
  const papers = [...document.querySelectorAll('.paper-row')];
  const days = [...document.querySelectorAll('.day-section')];
  const dateLinks = [...document.querySelectorAll('.date-navigation a')];
  const filter = document.querySelector('.person-filter');
  const filterName = document.getElementById('filtered-person');
  const status = document.getElementById('filter-status');
  const heading = document.getElementById('papers-title');

  function showPapers(personId = '', personName = '') {
    let count = 0;
    for (const paper of papers) {
      paper.hidden =
        Boolean(personId) &&
        !paper.dataset.members.split(' ').includes(personId);
      if (!paper.hidden) count += 1;
    }
    for (const day of days) {
      day.hidden = ![...day.querySelectorAll('.paper-row')].some(
        (paper) => !paper.hidden,
      );
    }
    for (const link of dateLinks) {
      link.hidden = document.getElementById(link.hash.slice(1)).hidden;
    }
    filter.hidden = !personId;
    filterName.textContent = personName;
    status.textContent = `${count} ${count === 1 ? 'paper' : 'papers'}${personName ? ` by ${personName}` : ''}.`;
  }

  document.querySelectorAll('[data-person]').forEach((link) => {
    link.addEventListener('click', () => {
      showPapers(link.dataset.person, link.dataset.personName);
      heading.focus({ preventScroll: true });
    });
  });

  document
    .getElementById('clear-person-filter')
    .addEventListener('click', () => {
      showPapers();
      heading.focus({ preventScroll: true });
    });
})();
