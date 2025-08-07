export const taskFields = [
  { name: "title", label: "Task Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "status", label: "Status", type: "hidden",required: true },
  { name: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High", "Very High"], required: true },
  { name: "assignedToId", label: "Assigned To", type: "select", options: ["Siddhesh", "Yash", "Priyanshu", "Vinay"], required: true }, // Dynamically from team members
  { name: "start_date", label: "Planned Start Date", type: "date" },
  { name: "end_date", label: "Planned End Date", type: "date" },
  // Hidden Props
  { name: "projectId", type: "hidden", auto: true },
  { name: "sprintId", type: "hidden", auto: true },
  { name: "storyId", type: "hidden", auto: true },
  { name: "createdById", type: "hidden", auto: true },

];

