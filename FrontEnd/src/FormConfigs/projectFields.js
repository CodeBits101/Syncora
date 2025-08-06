export const projectFields = [
  { name: "pname", label: "Project Name", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "start_date", label: "Planned Start Date", type: "date", required: true , InputLabelProps: { shrink: true } },
  { name: "end_date", label: "Planned End Date", type: "date", required: true, InputLabelProps: { shrink: true }  },
  // { name: "project_status", label: "Status", type: "select", options: ["IN_PROGRESS" , CLOSED , COMPLETED , HOLD , REOPEN], required: true },
  { name: "project_code", label: "Project Code", type: "text" }, // to be discussed..
];

// Default values for Formik
export const projectInitialValues = {
  pname: "",
  description: "",
  start_date: "",
  end_date: "",
  project_status: "",
  project_code: "",
};
