import { useState, useEffect } from "react";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EntityFormModal from "../BaseModal/BaseEntityModal";
import { sprintFields } from "../../FormConfigs/sprintFields";
import { SiPolymerproject } from "react-icons/si";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";
import { formatToLocalDateTime } from "../../utils/formatToLocalDateTime";
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
import { completeSprint, createSprint, deleteSprint, startSprint, updateSprint } from "../../services/manager/manager";
import { toast, ToastContainer } from 'react-toastify';
import { formatDateForInput } from './../../utils/dateFormatForInput';

const Sprints = () => {
  const userRole = localStorage.getItem("role");
  const managerId = localStorage.getItem("empId");

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [editSprint , setEditSprint] = useState(null);
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [sprints, setSprints] = useState({
    ACTIVE: [],
    BACKLOG: [],
    COMPLETED: [],
  });

  const navigate = useNavigate();

  const handleCreateSprint = async (data) => {
    const payload = {
      ...data,
      managerId,
      projectId: selectedOption,
      startDate: formatToLocalDateTime(data.startDate),
      endDate: formatToLocalDateTime(data.endDate),
    };
    try{
      const createdSprint = await createSprint(payload);
      console.log("Sprint created :", createdSprint);
      setOpenModal(false);
      toast.success("Sprint Created Successfully");
      fetchSprints(selectedOption);
    }
    catch(error)
    {
      console.error("Failed to create Sprint", error);
      toast.error("Sprint Creation failed")
    }
  };

  const fetchSprints = async (projectId) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:8080/sprints/${projectId}`
      );
      const sprintList = res.data || [];
      console.log("Sprints fetched:", JSON.stringify(res.data, null, 2));

      // Group sprints by status
      const grouped = {
        ACTIVE: sprintList.filter((s) => s.sprintStatus === "ACTIVE"),
        BACKLOG: sprintList.filter((s) => s.sprintStatus === "BACKLOG"),
        COMPLETED: sprintList.filter((s) => s.sprintStatus === "COMPLETED"),
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

// SetSprint Status to ACTIVE

  const handleStartSprint = async(sprintId, projectId) =>
  {
    try{
      setLoading(true);
      await startSprint(sprintId, projectId);
      await fetchSprints(projectId);
    } 
    catch(ex)
    {
      toast.error("Sprint Start error.")
    }
    finally
    {
      setLoading(false);
    }
  }

  //  set sprint status complete
  const handleCompleteSprint = async(sprintId, projectId) =>
  {
    try{
      console.log(projectId);
      setLoading(true);
      await completeSprint(sprintId);
      await fetchSprints(projectId);
    } 
    catch(ex)
    {
      toast.error("Sprint Complete error.")
    }
    finally
    {
      setLoading(false);
    }
  }

  const handleDeleteSprint = async(sprintId, projectId) =>
    {
    try{
      console.log(projectId);
      setLoading(true);
      await deleteSprint(sprintId);
      toast.success("Sprint Deleted.");
      await fetchSprints(projectId);
    } 
    catch(ex)
    {
      toast.error("Sprint Cannot be Delete.")
    }
    finally
    {
      setLoading(false);
    }
  }

  const openUpdateSprintModal = (sprint) => {
    setSelectedSprint(sprint);
    setOpenModal(true);
  };

  const handleUpdateSprint = async (values) => {
  try {
    console.log(values.id);
    await updateSprint(values); 
    toast.success("Sprint updated successfully!");
    await fetchSprints();
    setOpenModal(false);
    setSelectedSprint(null);
  } catch (ex) {
    toast.error("Sprint could not be updated.");
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
          <ToastContainer/>
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
                      <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        color="primary"
                        onClick={() => navigate("/scrumBoard")}
                      >
                        <MdOutlineDashboardCustomize
                          size={20}
                          color="white"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        Taskboard
                      </Button>
                      {/* SPRINT UPDATE STATUS FUNCTIONS */}
                      {category === "BACKLOG" && (
                        <>
                        {/* Start Sprint */}
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#3daa51ff", mt: 2 }}
                            disabled={sprints.ACTIVE.length > 0}
                            onClick={() => handleStartSprint(sprint.id, sprint.projectId)}
                            startIcon={<PlayArrowIcon />}
                          >
                            Start Sprint
                          </Button>
                          {/* Delete button */}
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 2 }}
                            onClick={() => handleDeleteSprint(sprint.id, sprint.projectId)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete Sprint
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            // onClick={() => handleUpdateSprint(sprint)}
                            onClick={() => openUpdateSprintModal(sprint)}
                            startIcon={< EditNoteRoundedIcon />}
                          >
                            Update Sprint
                          </Button>
                          </>
                      )}
                      {category === "ACTIVE" && (
                        <>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#802fe3ff", mt: 2 }}
                            onClick={() => handleCompleteSprint(sprint.id, sprint.projectId)}
                            startIcon={<DoneIcon />}
                          >
                            Complete Sprint
                          </Button>
                          {/* <Button
                            variant="outlined"
                            color="info"
                            onClick={() => navigate(`/sprint-report/${sprint.id}`)}
                            startIcon={<AssessmentIcon />}
                          >
                            View Report
                          </Button> */}
                        </>
                      )}
                      </Box>
                      {category === "BACKLOG" && sprints.ACTIVE.length > 0 && (
                        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                          Cannot start new sprint while another sprint is active
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </Box>
          ))}

          <EntityFormModal
            open={openModal}
            handleClose={() => {
              setOpenModal(false);
              setSelectedSprint(null);
            }}
            title={selectedSprint ? "Update Sprint" : "Create Sprint"}
            fields={sprintFields}
            initialValues={
              selectedSprint ? {
                  id:selectedSprint.id,
                  sprintName: selectedSprint.sprintName || "",
                  description: selectedSprint.description ||"",
                  startDate: formatDateForInput(selectedSprint.startDate) || "",
                  endDate: formatDateForInput(selectedSprint.endDate) || "",
                  status: "BACKLOG",
            
              }
              :
              {
                sprintName: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "BACKLOG",
              }
            }
            onSubmit={selectedSprint ? handleUpdateSprint: handleCreateSprint}
            submitLabel={selectedSprint ? "Update" : "Create"}
          />
        </Box>
      )}
    </>
  );
};

export default Sprints;
