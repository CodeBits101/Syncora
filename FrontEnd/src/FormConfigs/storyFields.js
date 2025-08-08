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
  
 
  { name: "projectId", type: "hidden", auto: true },
  { name: "sprintId", type: "hidden", auto: true },
];

export default storyFields;
