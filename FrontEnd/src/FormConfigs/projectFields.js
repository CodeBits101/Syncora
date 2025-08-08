export const projectFields = [
  { name: "title", label: "Project Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "startDate", label: "Planned Start Date", type: "date", required: true , InputLabelProps: { shrink: true } },
  { name: "endDate", label: "Planned End Date", type: "date", required: true, InputLabelProps: { shrink: true }  },
  // { name: "project_status", label: "Status", type: "select", options: ["INPROGRESS" , CLOSED , COMPLETED , HOLD , REOPEN], required: true },
  // { name: "project_code", label: "Project Code", type: "text" }, // to be discussed..
];

