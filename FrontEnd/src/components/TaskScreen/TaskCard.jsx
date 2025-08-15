import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BugReportIcon from "@mui/icons-material/BugReport";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import EyeModal from "./EyeModal";
import { IoIosNotifications } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { sendMail } from "../../services/main/auth";

const typeIcons = {
  bug: <BugReportIcon fontSize="small" color="error" />,
  task: <CheckCircleIcon fontSize="small" sx={{ color: "#1E4DB7" }} />,
  story: <AutoStoriesIcon fontSize="small" sx={{ color: "#2196f3" }} />,
};
const priorityColors = {
  red: "#ff1744",
  yellow: "#ffeb3b",
  green: "#00e676",
  default: "#9e9e9e",
};

// Styled eye icon wrapper for pointer cursor
const EyeIconWrapper = styled("span")({
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
});

const TaskCard = ({
  task,
  index,
  columnId,
  overlay = false,
  sprintId,
  projectId,
  updateTask = () => {},
}) => {
  const id = `${columnId}:${index}`;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTask, setModalTask] = React.useState(null);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: overlay ? 0.8 : 1,
    cursor: isDragging ? "grabbing" : "grab",
    mb: 1,
    position: "relative",
    backgroundClip: "padding-box",
    height: "120px", // fixed height
    maxHeight: "120px",
    minHeight: "120px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // No special background for subtasks
  };

  const role = localStorage.getItem("role");

  // console.log("In TaskCard, task: ", task)
  const handleNotify = async () => {
    const data = {
      to: task?.assignToEmail,
      subject: task?.title,
      body: `Hey you have assigned with a ${task.type} with Title -: ${
        task?.title
      } Description -: ${task.description || "Nothing..."}`,
    };
    try {
      await toast.promise(
        sendMail(data), // Promise from your API
        {
          pending: "Sending email...",
          success: "Notification email sent successfully ",
          error: {
            render({ data }) {
              // data is the error object
              return data?.response?.data?.message || "Mail failure occurred ";
            },
          },
        }
      );
    } catch (error) {
      console.error("Mail error:", error);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={style}
      data-card-id={id}
    >
      <CardContent
        sx={{
          p: 1.5,
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: isDragging ? "#1E4DB7" : "inherit" }}
          >
            {task.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {typeIcons[task.type]}
            {role == "ROLE_MANAGER" && (
              <IoIosNotifications
                style={{ cursor: "pointer" }}
                onClick={() => handleNotify()}
                color="#7A7A73"
                size={25}
              />
            )}
            {task.type === "subtask" && (
              <Typography
                variant="caption"
                sx={{ color: "#1E4DB7", fontWeight: 700, letterSpacing: 0.5 }}
              >
                Subtask
              </Typography>
            )}
            <Box
              width={10}
              height={10}
              borderRadius="50%"
              bgcolor={
                priorityColors[(task.priority || "").toLowerCase()] ||
                priorityColors.default
              }
              border="1px solid #bbb"
            />
          </Box>
        </Box>
        <Box sx={{ position: "relative", flex: 1, overflow: "hidden" }}>
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              lineHeight: 1.4,
              mb: 1.5,
              maxHeight: "2.8em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
            }}
          >
            {task.description}
          </Typography>
          {/* Fade-out effect for overflow */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "1.5em",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), #fff 90%)",
              pointerEvents: "none",
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </Typography>
          <EyeIconWrapper
            onClick={(e) => {
              e.stopPropagation();
              setModalTask(task);
              setModalOpen(true);
            }}
          >
            <VisibilityIcon fontSize="small" sx={{ opacity: 0.7 }} />
          </EyeIconWrapper>
          <EyeModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            task={modalTask}
            updateTask={updateTask}
            sprintId={sprintId}
            projectId={projectId}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
