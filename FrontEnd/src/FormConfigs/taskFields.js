export const taskFields = [
  { name: "title", label: "Task Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "status", label: "Status", type: "select", options: ["To Do", "In Progress", "Completed", "On Hold"], required: true },
  { name: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High", "Very High"], required: true },
  { name: "assigned_to", label: "Assigned To", type: "select", options: ["SID"], required: true }, // Dynamically from team members
  { name: "start_date", label: "Planned Start Date", type: "date" },
  { name: "end_date", label: "Planned End Date", type: "date" },
  // Hidden Props
  { name: "project_id", type: "hidden", auto: true },
  { name: "sprint_id", type: "hidden", auto: true },
  { name: "story_id", type: "hidden", auto: true },

];

export const taskInitialValues = {
    title: "",
    description:"",
    status:"",
    assigned_to:"",
    priority:""
}