import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const projectStatusOptions = ['Not Started', 'In Progress', 'Completed'];

const CreateProjectModal = ({ open, handleClose, onSubmit }) => {
  const initialValues = {
    pname: '',
    description: '',
    start_date: '',
    end_date: '',
    // project_status: '',
    // project_code: '',
  };

  const validationSchema = Yup.object({
    pname: Yup.string().required('Project name is required'),
    description: Yup.string().required('Description is required'),
    start_date: Yup.date().required('Planned start date is required'),
    end_date: Yup.date()
      .min(Yup.ref('start_date'), 'End date cannot be before start date')
      .required('Planned end date is required'),
    // project_status: Yup.string().required('Status is required'),
    // project_code: Yup.string().required('Project code is required'),
  });

  const handleFormSubmit = (values) => {
    const payload = {
      pname: values.pname,
      description: values.description,
      start_date: values.start_date,
      end_date: values.end_date,
    //   project_status: values.project_status,
    //   project_code: values.project_code,
      created_timestamp: new Date().toISOString(),
      manager_id: 1, // Replace with logged-in user's ID from session or context
    };

    console.log('API Payload:', payload);
    onSubmit(payload); // pass to parent or call API
    handleClose(); // close modal after submit
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Create New Project
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                label="Project Name"
                name="pname"
                value={values.pname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pname && Boolean(errors.pname)}
                helperText={touched.pname && errors.pname}
              />

              <TextField
                fullWidth
                margin="normal"
                multiline
                rows={3}
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              <TextField
                fullWidth
                margin="normal"
                type="date"
                name="start_date"
                label="Planned Start Date"
                InputLabelProps={{ shrink: true }}
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.start_date && Boolean(errors.start_date)}
                helperText={touched.start_date && errors.start_date}
              />

              <TextField
                fullWidth
                margin="normal"
                type="date"
                name="end_date"
                label="Planned End Date"
                InputLabelProps={{ shrink: true }}
                value={values.end_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.end_date && Boolean(errors.end_date)}
                helperText={touched.end_date && errors.end_date}
              />

              <TextField
                select
                fullWidth
                margin="normal"
                name="project_status"
                label="Status"
                value={values.project_status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.project_status && Boolean(errors.project_status)}
                helperText={touched.project_status && errors.project_status}
              >
                {projectStatusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                label="Project Code"
                name="project_code"
                value={values.project_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.project_code && Boolean(errors.project_code)}
                helperText={touched.project_code && errors.project_code}
              />

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
};

export default CreateProjectModal;
