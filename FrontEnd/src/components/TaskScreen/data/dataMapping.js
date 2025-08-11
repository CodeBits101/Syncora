export const statusMap = {
  TODO: { id: 'todo', title: 'TODO' },
  INPROGRESS: { id: 'in-progress', title: 'IN PROGRESS' },
  TESTING: { id: 'testing', title: 'TESTING' },
  DEPLOYMENT: { id: 'deployment', title: 'DEPLOYMENT' },
};

export function transformSprintData(apiData, sprintId) {
  const sprint = apiData.find(s => s.id == sprintId);
  console.log("GPT function", sprint)
  if (!sprint) return null;

  let frontendIdCounter = 1; // counter for task-N ids

  const mapTask = (item, type) => {
    const statusKey = item.status.replace(/\s+/g, '').toUpperCase();
    const statusInfo = statusMap[statusKey];

    const frontendId = `task-${frontendIdCounter++}`;

    return {
      id: frontendId,           // frontend's sequential id
      backendId: item.id,       // backend's id
      title: item.title || '',
      description: item.description || '',
      type: type, // "task" or "bug"
      priority: mapPriority(item.priority),
      createdAt: item.createdTimeStamp || null,
      updatedAt: item.updatedTimeStamp || null,
      assignee: item.assignedTo || '',
      creator: item.createdBy || item.reportedBy || '',
      dueDate: item.endDate || null,
      sprint: item.sprintName || sprint.sprintName,
      comments: null,
      attachments: null,
      status: statusInfo?.title || 'TODO',
      subtasks: []
    };
  };

  function mapPriority(priority) {
    switch (priority?.toUpperCase()) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return 'yellow';
      case 'LOW': return 'green';
      default: return 'yellow';
    }
  }

  const tasks = {};
  const columns = {
    'todo': { id: 'todo', title: 'TODO', taskIds: [] },
    'in-progress': { id: 'in-progress', title: 'IN PROGRESS', taskIds: [] },
    'testing': { id: 'testing', title: 'TESTING', taskIds: [] },
    'deployment': { id: 'deployment', title: 'DEPLOYMENT', taskIds: [] },
  };

  // Merge tasks and bugs into one list for sequential numbering
  const allItems = [
    ...sprint.tasks.map(t => ({ ...t, _type: 'task' })),
    ...sprint.bugs.map(b => ({ ...b, _type: 'bug' }))
  ];

  allItems.forEach(item => {
    const mapped = mapTask(item, item._type);
    tasks[mapped.id] = mapped;
    const colKey = statusMap[item.status.replace(/\s+/g, '').toUpperCase()]?.id;
    if (colKey) columns[colKey].taskIds.push(mapped.id);
  });

  return {
    columns,
    tasks,
    columnOrder: ['todo', 'in-progress', 'testing', 'deployment']
  };
}
