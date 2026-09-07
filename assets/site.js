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

/* Confirmed participants are paged 12 at a time; without JavaScript every
   participant stays visible. */
(() => {
  const PER_PAGE = 12;
  const grid = document.querySelector('.participants-grid');
  if (!grid) return;
  const people = [...grid.querySelectorAll(':scope > .person')];
  if (people.length <= PER_PAGE) return;
  const pages = Math.ceil(people.length / PER_PAGE);
  let page = 0;

  const chevron = (d) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${d}"></path></svg>`;

  const nav = document.createElement('nav');
  nav.className = 'people-pagination';
  nav.setAttribute('aria-label', 'Confirmed participants pages');

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.innerHTML = `${chevron('m15 18-6-6 6-6')}Previous`;

  const next = document.createElement('button');
  next.type = 'button';
  next.innerHTML = `Next${chevron('m9 18 6-6-6-6')}`;

  const status = document.createElement('span');
  status.className = 'page-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  nav.append(prev, status, next);
  grid.after(nav);

  function render() {
    people.forEach((person, i) => {
      person.hidden = Math.floor(i / PER_PAGE) !== page;
    });
    const first = page * PER_PAGE + 1;
    const last = Math.min((page + 1) * PER_PAGE, people.length);
    status.textContent = `${first}\u2013${last} of ${people.length}`;
    prev.disabled = page === 0;
    next.disabled = page === pages - 1;
  }

  function go(delta) {
    const target = page + delta;
    if (target < 0 || target > pages - 1) return;
    page = target;
    render();
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  render();
})();
