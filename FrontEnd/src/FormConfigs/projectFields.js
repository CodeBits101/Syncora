export const projectFields = (empList = []) => [
  { name: "title", label: "Project Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "startDate", label: "Planned Start Date", type: "date", required: true , InputLabelProps: { shrink: true } },
  { name: "endDate", label: "Planned End Date", type: "date", required: true, InputLabelProps: { shrink: true }  },
  { name: "empList", label: "Add Employees", type: "multiselect-chip", options: empList, required: false}
  // { name: "project_status", label: "Status", type: "select", options: [INPROGRESS , CLOSED , COMPLETED , HOLD , REOPEN], required: true },
  // { name: "project_code", label: "Project Code", type: "text" }, // to be discussed..
];

export const editProjectFields = (employeesToAdd =[], employeesToRemove =[]) => [
  { name: "title", label: "Project Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "startDate", label: "Planned Start Date", type: "date", required: true , InputLabelProps: { shrink: true } },
  { name: "endDate", label: "Planned End Date", type: "date", required: true, InputLabelProps: { shrink: true }  },
  { name: "projectStatus", label: "Status", type: "select", options: [ {id: "INPROGRESS", title: "IN PROGRESS"} , {id: "CLOSED", title: "CLOSED"} , {id: "COMPLETED" ,title: "COMPLETED"}, {id: "HOLD",title: "HOLD"} , {id: "REOPEN",title: "REOPEN"}], required: true },
  { name: "employeesToAdd", label: "Add Employees", type: "multiselect-chip", options: employeesToAdd, required: false},
  { name: "employeesToRemove", label: "Release Employees", type: "multiselect-chip", options: employeesToRemove, required: false}
];