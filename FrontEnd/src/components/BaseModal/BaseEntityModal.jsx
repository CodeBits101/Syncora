import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  getSprintByProjectId,
  getStoriesByProjectIdAndSprintId,
} from "../../services/manager/manager";
import { ToastContainer, toast } from "react-toastify";

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

export default function EntityFormModal({
  open,
  handleClose,
  title,
  fields,
  initialValues,
  onSubmit,
  gridLayout = false,
  id
}) {
  // Build base validation schema dynamically from fields

  console.log(id)

  let schema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        switch (field.type) {
          case "number":
            acc[field.name] = Yup.number()
              .typeError(`${field.label} must be a number`)
              .required(`${field.label} is required`);
            break;
          case "date":
            acc[field.name] = Yup.date()
              .typeError(`${field.label} must be a valid date`)
              .required(`${field.label} is required`);
            break;
          default:
            acc[field.name] = Yup.string().required(
              `${field.label} is required`
            );
        }
      }
      return acc;
    }, {})
  );

  // Apply date validation only if both date fields are present in this modal
  const fieldNames = fields.map((f) => f.name);
  if (fieldNames.includes("start_date") && fieldNames.includes("end_date")) {
    schema = withPlannedDateValidation(schema);
  }

  //sprints by project id
  const [sprintOptions, setSprintOptions] = useState([]);
  const [storyOptions, setStoryOptions] = useState([]);

  const fetchSprintByProjectId = async (id) => {
    try {
      const response = await getSprintByProjectId(id);
      setSprintOptions(response); // ensure response is an array
    } catch (error) {
      console.error("Fetch sprint error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch sprints");
      setSprintOptions([]);
    }
  };

  const fetchStoriesBySprintIdandProjectId = async (pid, sid) => {
    try {
      const response = await getStoriesByProjectIdAndSprintId(pid, sid);
      setStoryOptions(response); // ensure response is an array
    } catch (error) {
      console.error("Fetch sprint error:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch sprints");
      setSprintOptions([]);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          ...style,
          width: gridLayout ? "80%" : style.maxWidth || "500px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <>
              <Form>
                <Box
                  sx={{
                    display: gridLayout ? "grid" : "block",
                    gridTemplateColumns: gridLayout
                      ? {
                          xs: "1fr", // mobile
                          sm: "1fr 1fr", // tablet
                          md: "1fr 1fr 1fr", // desktop
                        }
                      : "none",
                    gap: gridLayout ? 2 : 0,
                  }}
                >
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
                          error={
                            touched[field.name] && Boolean(errors[field.name])
                          }
                          helperText={touched[field.name] && errors[field.name]}
                          sx={
                            gridLayout
                              ? { gridColumn: "1 / -1" } // span entire row
                              : {}
                          }
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
                          onChange={(e) => {
                            handleChange(e);
                            if (field.name === "projectId") {
                              fetchSprintByProjectId(e.target.value);
                            }
                            // If this is the project dropdown
                          }}
                          onBlur={handleBlur}
                          error={
                            touched[field.name] && Boolean(errors[field.name])
                          }
                          helperText={touched[field.name] && errors[field.name]}
                        >
                          {field.options.map((option) => (
                            <MenuItem
                              key={option.id ?? option}
                              value={option.id ?? option}
                            >
                              {field.name === "assignedToId"
                                ? option.empName
                                : option.title || "Unknown"}
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
                        error={
                          touched[field.name] && Boolean(errors[field.name])
                        }
                        helperText={touched[field.name] && errors[field.name]}
                        InputLabelProps={
                          field.type === "date" ? { shrink: true } : {}
                        }
                      />
                    );
                  })}

                  {values.projectId && sprintOptions.length > 0 && (
                    <TextField
                      select
                      fullWidth
                      margin="normal"
                      label="Sprint"
                      name="sprintId"
                      value={values.sprintId || ""}
                      onChange={(e) => {
                        handleChange(e);
                        fetchStoriesBySprintIdandProjectId(
                          values.projectId,
                          e.target.value
                        );
                      }}
                      onBlur={handleBlur}
                      error={touched.sprintId && Boolean(errors.sprintId)}
                      helperText={touched.sprintId && errors.sprintId}
                    >
                      {sprintOptions.map((sprint) => (
                        <MenuItem key={sprint.id} value={sprint.id}>
                          {sprint.sprintName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  {values.sprintId && storyOptions.length > 0 && (
                    <TextField
                      select
                      fullWidth
                      margin="normal"
                      label="Story"
                      name="storyId"
                      value={values.storyId || ""}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.storyId && Boolean(errors.storyId)}
                      helperText={touched.storyId && errors.storyId}
                    >
                      {storyOptions.map((story) => (
                        <MenuItem key={story.id} value={story.id}>
                          {story.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    {id?"Update":"Create"}
                  </Button>
                </Box>
              </Form>
            </>
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
