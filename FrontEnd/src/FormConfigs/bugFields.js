export const bugFields = [
  { name: "title", label: "Bug Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High", "VeryHigh"], required: true },
  { name: "assignedToId", label: "Assigned To", type: "select",options: ["Shreyash","Priya", "Yash", "Siddhesh"], auto: true },
  
  // Actual backend-only fields (hidden)
  { name: "status", label: "Status", type:"hidden", required: true },
  { name: "reportedById", type: "hidden", auto: true },
  { name: "projectId", type: "hidden", auto: true },
  { name: "storyId", type: "hidden", auto: true }
];
