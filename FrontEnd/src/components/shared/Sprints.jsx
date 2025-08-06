import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
  Grid,
  Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EntityFormModal from "../BaseModal/BaseEntityModal";
import { sprintFields } from "../../FormConfigs/sprintFields";
const Sprints = () => {
  const { projectId } = useParams();
  const [projectName, setProjectName] = useState("");

  const [openModal, setOpenModal] = useState(false);
    
  const handleCreateSprint = (data) => {
      console.log("Sprint Created:", data);
       // TODO: call your API here
       setOpenModal(false);
      };


  useEffect(() => {
    const dummyProjects = {
      "101": "Syncora Example Project",
    };
    setProjectName(dummyProjects[projectId] || "Unknown Project");
  }, [projectId]);

  const dummyData = {
    ongoing: [
      {
        id: 3,
        title: "Sprint 3",
        date: "Jul 25 – Aug 1",
        stories: [
          {
            id: 101,
            title: "Story A",
            tasks: ["Task 1", "Bug 1", "Task 2"],
          },
          {
            id: 102,
            title: "Story B",
            tasks: ["Bug 2", "Task 3"],
          },
        ],
      },
    ],
    completed: [
      {
        id: 1,
        title: "Sprint 1",
        date: "Jul 25 – Aug 1",
        stories: [
          {
            id: 101,
            date: "Jul 25 – Aug 1",
            title: "Story A",
            tasks: ["Task 1", "Bug 1", "Task 2"],
          },
          {
            id: 102,
            title: "Story B",
            tasks: ["Bug 2", "Task 3"],
          },
        ],
      },
      {
        id: 2,
        title: "Sprint 2",
        date: "Jul 25 – Aug 1",
        stories: [
          {
            id: 101,
            title: "Story A",
            tasks: ["Task 1", "Bug 1", "Task 2"],
          },
          {
            id: 102,
            title: "Story B",
            tasks: ["Bug 2", "Task 3"],
          },
        ],
      }
    ],
    upcoming: [
      {
        id: 4,
        title: "Sprint 4",
        date: "Jul 25 – Aug 1",
        stories: [
          {
            id: 101,
            title: "Story A",
            tasks: ["Task 1", "Bug 1", "Task 2"],
          },
          {
            id: 102,
            title: "Story B",
            tasks: ["Bug 2", "Task 3"],
          },
        ],
      }
    ],
  };

   return (
    
    <Box p={4} sx={{ backgroundColor: "#f4faff", minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Project: <span style={{ color: "#1976d2" }}>{projectName}</span> — Sprints
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                  + Create Sprint
                </Button>
        </Box>
      </Box>

      {["ongoing", "upcoming", "completed"].map((category) => (
        <Box key={category} mb={4}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textTransform: "capitalize", color: "#1565c0" }}
          >
            {category} Sprints
          </Typography>
          <Divider sx={{ mb: 2, backgroundColor: "#bbdefb" }} />

          {dummyData[category].length === 0 ? (
            <Typography color="text.secondary">
              No {category} sprints found.
            </Typography>
          ) : (
            dummyData[category].map((sprint) => (
              <Accordion key={sprint.id} sx={{ mb: 1, backgroundColor: "#e3f2fd" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>  
                  <Grid container alignItems="center">
                    <Grid item xs={9}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
                        {sprint.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="caption" color="textSecondary">
                        {sprint.date}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  {sprint.stories.map((story) => (
                    <Accordion
                      key={story.id}
                      sx={{ mb: 1, ml: 2, backgroundColor: "#f0f7ff" }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ color: "#0d47a1" }}>{story.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {story.tasks.map((task, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                              <Paper
                                elevation={2}
                                sx={{
                                  p: 2,
                                  backgroundColor: "#ffffff",
                                  borderLeft: task.toLowerCase().includes("bug")
                                    ? "4px solid #d32f2f"
                                    : "4px solid #1976d2",
                                }}
                              >
                                <Typography variant="body2">{task}</Typography>
                                <Chip
                                  label={task.toLowerCase().includes("bug") ? "Bug" : "Task"}
                                  size="small"
                                  sx={{ mt: 1, backgroundColor: task.toLowerCase().includes("bug") ? "#ffcdd2" : "#bbdefb" }}
                                />
                              </Paper>
                              
                            </Grid>
                          ))}
                          

                        </Grid>
                        {/* GO TO DASHBOARD BUTTON */}
                        {/* <Button variant="contained" sx={{ backgroundColor: "#3daa51ff" }}>
                          {sprint.title} Taskboard
                        </Button> */}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      ))}

      <EntityFormModal
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    title="Create Task"
                    fields={sprintFields}
                    initialValues={{
                      sname: "",
                      description: "",
                      start_date: "",
                      end_date: "",
                      status: "",
                      project_id:"",
                      created_by:" "
                    }}
                    onSubmit={handleCreateSprint}
                  />

    </Box>
    
    
  );
};

export default Sprints;
