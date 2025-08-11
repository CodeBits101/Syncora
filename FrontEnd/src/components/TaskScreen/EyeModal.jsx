import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
  IconButton,
  Box,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteSubtaskById,
  getSubTasksByUserAndBug,
  getSubTasksByUserAndTask,
} from "../../services/manager/manager";
import { mapApiSubtasksToRichFormat } from "./data/taskScreenService";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";

export default function JiraModal({
  open,
  onClose,
  task,
  updateTask,
  sprintId,
  projectId,
}) {
  const get = (v, fallback = "-") => (v ? v : fallback);
  const getPriorityColor = (priority) => {
    if (priority === "red") return "#ff0000";
    if (priority === "yellow") return "#ffff00";
    if (priority === "green") return "#00cc66";
    return "text.secondary";
  };
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (isNaN(d)) return date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [apiSubtasks, setApiSubtasks] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [subtaskToDelete, setSubtaskToDelete] = useState(null);

  useEffect(() => {
    async function fetchSubTaskData() {
      if (task.type === "bug") {
        const subtaskData = await getSubTasksByUserAndBug(task.backendId);
        const mapped = mapApiSubtasksToRichFormat(subtaskData);
        setApiSubtasks(mapped);
      }
      if (task.type === "task") {
        const subtaskData = await getSubTasksByUserAndTask(task.backendId);
        const mapped = mapApiSubtasksToRichFormat(subtaskData);
        setApiSubtasks(mapped);
      }
    }
    if (open) {
      fetchSubTaskData();
    } else {
      setApiSubtasks([]);
    }
  }, [open, task?.id]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const scrollRef = useRef(null);
  const [atBottom, setAtBottom] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const bottomReached = scrollTop + clientHeight >= scrollHeight - 5;
    setAtBottom(bottomReached);
  };

  const requestDeleteSubtask = (backendId) => {
    setSubtaskToDelete(backendId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSubtaskById(subtaskToDelete);
      setApiSubtasks((prev) =>
        prev.filter((st) => st.backendId !== subtaskToDelete)
      );
    } catch (err) {
      console.error("Error deleting subtask:", err);
    } finally {
      setConfirmOpen(false);
      setSubtaskToDelete(null);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            height: "55vh",
            width: "60vw",
            maxWidth: "60vw",
            minWidth: "60vw",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <DialogTitle
            sx={{
              textAlign: "left",
              padding: 0,
              pl: 2,
              pr: 2,
              pt: 2,
              pb: 0,
              m: 0,
            }}
          >
            <Box sx={{ minHeight: 32 }}>
              <Typography variant="h6" sx={{ wordBreak: "break-word", pl: 0 }}>
                {task?.title || "Untitled Task"}
              </Typography>
            </Box>
          </DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent
          style={{
            display: "flex",
            gap: "24px",
            height: "65vh",
            overflow: "hidden",
          }}
        >
          {/* Left Section */}
          <Box
            flex={2.2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
              maxHeight: "100%",
              minWidth: 0,
              overflowY: "auto",
              overflowX: "hidden",
              pr: 1,
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <Box sx={{ pl: 2, pr: 2 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: "bold", pl: 0 }}
              >
                Description
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {task?.description}
                </Typography>
              </Box>

              {Array.isArray(apiSubtasks) && apiSubtasks.length > 0 && (
                <Box mt={3}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Sub-Tasks
                  </Typography>
                  <Stack spacing={1}>
                    {apiSubtasks
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((st, idx) => (
                        <Box
                          key={st.id || idx}
                          display="flex"
                          alignItems="center"
                          gap={2}
                          p={1}
                          borderRadius={1}
                          bgcolor="#f7f7f7"
                        >
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {st.title}
                          </Typography>
                          {st.status && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {st.status}
                            </Typography>
                          )}
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => requestDeleteSubtask(st.backendId)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                  </Stack>

                  {apiSubtasks.length > itemsPerPage && (
                    <Stack
                      direction="row"
                      spacing={2}
                      mt={2}
                      justifyContent="center"
                    >
                      <Button
                        size="small"
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      >
                        Previous
                      </Button>
                      <Typography variant="body2" sx={{ alignSelf: "center" }}>
                        Page {currentPage} of{" "}
                        {Math.ceil(apiSubtasks.length / itemsPerPage)}
                      </Typography>
                      <Button
                        size="small"
                        disabled={
                          currentPage ===
                          Math.ceil(apiSubtasks.length / itemsPerPage)
                        }
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(
                              prev + 1,
                              Math.ceil(apiSubtasks.length / itemsPerPage)
                            )
                          )
                        }
                      >
                        Next
                      </Button>
                    </Stack>
                  )}
                </Box>
              )}
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            flex={1.2}
            borderLeft="1px solid #ddd"
            pl={2}
            sx={{
              maxHeight: "100%",
              minWidth: 0,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
              Details
            </Typography>
            <Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={2}
                alignItems="center"
              >
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Assignee
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: "80px" }}
                >
                  {get(task?.assignee)}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={2}
                alignItems="center"
              >
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Sprint
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: "80px" }}
                >
                  {get(task?.sprint)}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={2}
                alignItems="center"
              >
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Reporter
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: "80px" }}
                >
                  {get(task?.creator)}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={2}
                alignItems="center"
              >
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Status
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: "80px" }}
                >
                  {task?.status || "-"}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={2}
                alignItems="center"
              >
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Type
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: "80px" }}
                >
                  {get(task?.type)}
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                mb={2}
                alignItems="center"
              >
                <Typography variant="body2" sx={{ minWidth: "120px" }}>
                  Priority
                </Typography>
                <Box
                  sx={{
                    marginLeft: "80px",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: getPriorityColor(get(task?.priority, "red")),
                    display: "inline-block",
                    mr: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this subtask? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
