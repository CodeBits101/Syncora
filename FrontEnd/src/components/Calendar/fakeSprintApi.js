export async function fetchSprints() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Sprint 5',
          startDate: '2025-07-28',
          endDate: '2025-08-11',
          goal: 'Refactor core & auth'
        },
        {
          id: 2,
          name: 'Sprint 6',
          startDate: '2025-08-15',
          endDate: '2025-08-28',
          goal: 'Add user roles & story filters'
        },
        {
          id: 3,
          name: 'Sprint 7',
          startDate: '2025-09-03',
          durationInWeeks: '2',
          goal: 'Some bugs need to be taken care of'
        }
      ]);
    }, 400);
  });
}
