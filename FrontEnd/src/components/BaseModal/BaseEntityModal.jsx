import React from "react";
import { Modal, Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

// Generic date validation
const withPlannedDateValidation = (schema) => {
  return schema.shape({
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End Date must be after Start Date"),
  });
};

export default function EntityFormModal({ open, handleClose, title, fields, initialValues, onSubmit }) {
  // Build base validation schema dynamically from fields
  let schema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        acc[field.name] = Yup.string().required(`${field.label} is required`);
      }
      return acc;
    }, {})
  );

  // Apply date validation only if both date fields are present in this modal
  const fieldNames = fields.map((f) => f.name);
  if (fieldNames.includes("start_date") && fieldNames.includes("end_date")) {
    schema = withPlannedDateValidation(schema);
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              {fields.map((field) => {
                if (field.type === "textarea") {
                  return (
                    <TextField
                      key={field.name}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={3}
                      label={field.label}
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    />
                  );
                }
                if (field.type === "select") {
                  return (
                    <TextField
                      key={field.name}
                      select
                      fullWidth
                      margin="normal"
                      label={field.label}
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field.name] && Boolean(errors[field.name])}
                      helperText={touched[field.name] && errors[field.name]}
                    >
                      {field.options.map((option) => (
                        <MenuItem  key={option.id ?? option} value={option.id ?? option}>
                          {option.title ?? "UnKnown"}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }
                if (field.type === "hidden") return null;
                if (field.type === "readonly") {
                  return (
                    <TextField
                      key={field.name}
                      label={field.label}
                      value={values[field.name]}
                      InputProps={{ readOnly: true }}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                  );
                }

                return (
                  <TextField
                    key={field.name}
                    fullWidth
                    margin="normal"
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    value={values[field.name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  />
                );
              })}

              <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}




// dynamically handling all select fields
// import { useEffect, useState } from "react";

// export default function BaseEntityModal({ open, handleClose, title, fields, initialValues, contextValues, onSubmit }) {
//   const [dynamicFields, setDynamicFields] = useState(fields);

//   useEffect(() => {
//     async function fetchOptions() {
//       const updatedFields = await Promise.all(fields.map(async (field) => {
//         if (field.type === "select" && field.optionsApi) {
//           try {
//             const url = typeof field.optionsApi === "function" 
//               ? field.optionsApi(contextValues) 
//               : field.optionsApi;
//             const res = await fetch(url);
//             const data = await res.json();
//             return { ...field, options: data.map(item => ({ value: item.id, label: item.name })) };
//           } catch (err) {
//             console.error(`Error fetching options for ${field.name}:`, err);
//             return { ...field, options: [] };
//           }
//         }
//         return field;
//       }));
//       setDynamicFields(updatedFields);
//     }

//     if (open) fetchOptions();
//   }, [open, fields, contextValues]);

//   // ... your Formik logic using dynamicFields instead of fields
// }
