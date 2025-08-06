export const bugFields = [
  { name: "title", label: "Bug Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "status", label: "Status", type: "select", options: ["Open", "In Progress", "Resolved", "Closed"], required: true },
  { name: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High"], required: true },

  // Read-only display fields
  { name: "project_name", label: "Project", type: "readonly", auto: true },
  { name: "reporter_name", label: "Reported By", type: "readonly", auto: true },
  { name: "task_name", label: "Task", type: "readonly", auto: true },

  // Actual backend-only fields (hidden)
  { name: "reported_by", type: "hidden", auto: true },
  { name: "project_id", type: "hidden", auto: true },
  { name: "task_id", type: "hidden", auto: true }
];
