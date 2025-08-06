// storyFields.js

const storyFields = [
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
    name: "storyPoint",
    label: "Story Points",
    type: "number",
    placeholder: "Enter points (1-100)",
    required: false,
  },
  {
    name: "start_date",
    label: "Planned Start Date",
    type: "date",
    required: false,
  },
  {
    name: "end_date",
    label: "Planned End Date",
    type: "date",
    required: false,
  },
  
];

export default storyFields;
