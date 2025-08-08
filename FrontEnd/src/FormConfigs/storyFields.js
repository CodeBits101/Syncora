// storyFields.js

const storyFields = (projects = [], stories = []) => [
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
    name: "sprintId", // renamed from storyPoint
    label: "Select Sprints",
    type: "select",
    options: [
      { value: 1, label: "Sprint Alpha" },
      { value: 2, label: "Sprint Beta" },
      { value: 3, label: "Sprint Gamma" },
    ],
  },
  {
    name: "startDate",
    label: "Planned Start Date",
    type: "date",
    required: true,
    InputLabelProps: { shrink: true },
  },
  {
    name: "endDate",
    label: "Planned End Date",
    type: "date",
    required: true,
    InputLabelProps: { shrink: true },
  },
];

export default storyFields;
