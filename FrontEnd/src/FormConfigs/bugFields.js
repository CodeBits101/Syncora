export const bugFields = (projects = [], employees = []) => [
  { name: "title", label: "Task Title", type: "text", required: true },

  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { id: "high", title: "High" },
      { id: "low", title: "Low" },
      { id: "medium", title: "Medium" },
      { id: "veryhigh", title: "Very High" },
    ],
    required: true,
  },
  {
    name: "projectId", // renamed from storyPoint
    label: "Select Project",
    type: "select",
    options: projects,
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    name: "assignedToId",
    label: "Assigned To",
    type: "select",
    options: employees,
    required: true,
  }, // Dynamically from team members
  { name: "startDate", label: "Planned Start Date", type: "date" },
  { name: "endDate", label: "Planned End Date", type: "date" },
  {
    name: "storyPoint",
    label: "Story Points(Should be a number)",
    type: "number",
    placeholder: "Enter story points",
    required: true,
  },
];
