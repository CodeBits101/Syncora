// storyFields.js

export const storyFields = (projects = [], sprints = []) => [
  {
    name: "title",
    label: "Story Title",
    type: "text",
    placeholder: "Enter story title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe the story",
    required: false,
  },

  {
    name: "projectId", // renamed from storyPoint
    label: "Select Project",
    type: "select",
    options: projects,
    required: true,
  },
  {
    name: "start_date",
    label: "Planned Start Date",
    type: "date",
    required: true,
    InputLabelProps: { shrink: true },
  },
  {
    name: "end_date",
    label: "Planned End Date",
    type: "date",
    required: true,
    InputLabelProps: { shrink: true },
  },
];

export const updateStoryFields = (sprints = []) => [
  {
    name: "title",
    label: "Story Title",
    type: "text",
    placeholder: "Enter story title",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe the story",
    required: false,
  },

  {
    name: "projectName", // renamed from storyPoint
    label: "Project Name",
    type: "readonly",
    required: true,
  },
  {
    name: "sprintId", // renamed from storyPoint
    label: "Select Sprint",
    type: "select",
    options: sprints,
  },
  {
    name: "start_date",
    label: "Planned Start Date",
    type: "date",
    required: true,
    InputLabelProps: { shrink: true },
  },
  {
    name: "end_date",
    label: "Planned End Date",
    type: "date",
    required: true,
    InputLabelProps: { shrink: true },
  },
];
