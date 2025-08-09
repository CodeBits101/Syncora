export const taskFields = (projects = [], employees = []) => [
  { name: "title", label: "Task Title", type: "text", required: true },

  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { id: "HIGH", title: "High" },
      { id: "LOW", title: "Low" },
      { id: "MEDIUM", title: "Medium" },
      { id: "VERYHIGH", title: "Very High" },
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
  { name: "start_date", label: "Planned Start Date", type: "date" },
  { name: "end_date", label: "Planned End Date", type: "date" },
  {
    name: "storyPoint",
    label: "Story Points(Should be a number)",
    type: "number",
    placeholder: "Enter story points",
    required: true,
  },
];
