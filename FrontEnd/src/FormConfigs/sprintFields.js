// sprintFields.js
export const sprintFields = [
    // Readonly display
  { name: "project_name", label: "Project", type: "readonly", auto: true },
  
  
  { name: "sname", label: "Sprint Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "start_date", label: "Planned Start Date", type: "date", required: true },
  { name: "end_date", label: "Planned End Date", type: "date", required: true },
  { name: "status", label: "Status", type: "hidden", required: true },
  

  // Hidden auto-filled fields
  { name: "project_id", type: "hidden", auto: true },
  { name: "created_by", type: "hidden", auto: true }
];
