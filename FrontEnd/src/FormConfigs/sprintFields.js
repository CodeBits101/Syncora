// sprintFields.js
export const sprintFields = [
    // Readonly display
  // { name: "project_name", label: "Project", type: "readonly", auto: true },
  
  
  { name: "sprintName", label: "Sprint Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "startDate", label: "Planned Start Date", type: "date", required: true },
  { name: "endDate", label: "Planned End Date", type: "date", required: true },
  { name: "status", label: "Status", type: "hidden", required: true },
   { name: "startDate", label: "Planned Start Date", type: "date", required: true , InputLabelProps: { shrink: true } },
  { name: "endDate", label: "Planned End Date", type: "date", required: true, InputLabelProps: { shrink: true }  },
  

  // Hidden auto-filled fields
  { name: "projectId", type: "hidden", auto: true },
  { name: "managerId", type: "hidden", auto: true }
];
