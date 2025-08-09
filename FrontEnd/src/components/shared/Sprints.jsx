import { useState, useEffect } from "react";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EntityFormModal from "../BaseModal/BaseEntityModal";
import { sprintFields } from "../../FormConfigs/sprintFields";
import { SiPolymerproject } from "react-icons/si";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSprintByProjectId } from "../../services/manager/manager";

const Sprints = () => {
  const userRole = localStorage.getItem("role");
  const managerId = localStorage.getItem("empId");

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [projectName, setProjectName] = useState("");
  const [sprints, setSprints] = useState({
    ACTIVE: [],
    BACKLOG: [],
    COMPLETED: [],
  });

  const navigate = useNavigate();

  const handleCreateSprint = (data) => {
    const payload = {
      ...data,
      managerId,
      projectId: selectedOption,
    };
    console.log("Sprint Created:", payload);
    // TODO: call your create sprint API here
    setOpenModal(false);
  };

  const fetchSprints = async (projectId) => {
    try {
      setLoading(true);
      setError("");
      const res = await getSprintByProjectId(projectId)
      const sprintList = res || [];
      console.log("Sprints fetched:", JSON.stringify(res.data, null, 2));

      // Group sprints by status
      const grouped = {
        ACTIVE: sprintList.filter((s) => s.status === "ACTIVE"),
        BACKLOG: sprintList.filter((s) => s.status === "BACKLOG"),
        COMPLETED: sprintList.filter((s) => s.status === "COMPLETED"),
      };
      setSprints(grouped);

      // Optional: If your API returns projectName in the response
       if (sprintList.length > 0 && sprintList[0]?.projectName) {
      setProjectName(sprintList[0].projectName);
    }
    } catch (err) {
      console.error("Error fetching sprints:", err);
      setError("Failed to load sprints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOption) {
      fetchSprints(selectedOption);
    }
  }, [selectedOption]);

  return (
    <>
      <ChooseProjectModal
        showModal={showModal}
        showMainUI={showMainUI}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        setShowModal={setShowModal}
        setShowMainUI={setShowMainUI}
      />

      {showMainUI && (
        <Box p={4} sx={{ backgroundColor: "#f4faff", minHeight: "100vh" }}>
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Project: <span style={{ color: "#1976d2" }}>{projectName}</span> — Sprints
            </Typography>
            <Box display="flex" sx={{ gap: 2 }} justifyContent="flex-end" mb={2}>
              {userRole === "ROLE_MANAGER" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenModal(true)}
                >
                  + Create Sprint
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowModal(true)}
              >
                <SiPolymerproject
                  color="white"
                  size={20}
                  style={{ marginRight: "10px" }}
                />
                Choose Project
              </Button>
            </Box>
          </Box>

          {loading && <Typography>Loading sprints...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {["ACTIVE", "BACKLOG", "COMPLETED"].map((category) => (
            <Box key={category} mb={4}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textTransform: "capitalize", color: "#1565c0" }}
              >
                {category} Sprints
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: "#bbdefb" }} />

              {sprints[category].length === 0 ? (
                <Typography color="text.secondary">
                  No {category} sprints found.
                </Typography>
              ) : (
                sprints[category].map((sprint) => (
                  <Accordion
                    key={sprint.id}
                    sx={{ mb: 1, backgroundColor: "#e3f2fd" }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid container alignItems="center">
                        <Grid item xs={9}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "500" }}
                          >
                            {sprint.sprintName}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="caption" color="textSecondary">
                            {`${sprint.startDate} – ${sprint.endDate}`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#3daa51ff", mt: 2 }}
                        onClick={() => navigate("/scrumBoard")}
                      >
                        <MdOutlineDashboardCustomize
                          size={20}
                          color="white"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Taskboard
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </Box>
          ))}

          <EntityFormModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            title="Create Sprint"
            fields={sprintFields}
            initialValues={{
              sprintName: "",
              description: "",
              startDate: "",
              endDate: "",
              status: "BACKLOG",
            }}
            onSubmit={handleCreateSprint}
          />
        </Box>
      )}
    </>
  );
};

export default Sprints;
