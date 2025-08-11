import React, { useEffect, useState } from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";
import "./Calendar.css";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ReplayIcon from "@mui/icons-material/Replay";
import CampaignIcon from "@mui/icons-material/Campaign";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import BugReportIcon from "@mui/icons-material/BugReport";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createRoot } from "react-dom/client";
import { fetchSprints } from "./CalendarService";
import ChooseProjectModal from "../BaseModal/ChooseProjectModal";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCdkx+WmFZfVtgdVVMYlpbR35PMyBoS35Rc0VrWX5fcHZTRWhUWEdxVEFd"
);

function Calendar() {
  const [sprints, setSprints] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(true);
const [showMainUI, setShowMainUI] = useState(false);
const [selectedOption, setSelectedOption] = useState("");
const [projectName, setProjectName] = useState("");


  useEffect(() => {
  if (selectedOption) {
    fetchSprints(selectedOption).then((data) => {
      const activeSprints = data.filter(s => s.sprintStatus === 'ACTIVE');
      setSprints(activeSprints);

    });
  }
}, [selectedOption]);


  const typeToIcon = {
    sprint: <DirectionsRunIcon fontSize="small" />,
    retrospective: <ReplayIcon fontSize="small" />,
    standup: <CampaignIcon fontSize="small" />,
    task: <TaskAltIcon fontSize="small" />,
    bug: <BugReportIcon fontSize="small" />,
    story: <BookmarkBorderOutlinedIcon fontSize="small" />,
  };

  const sortEvents = (events) => {
    return [...events].sort((a, b) => {
      const isSprintA = a.type === "sprint";
      const isSprintB = b.type === "sprint";

      if (isSprintA && !isSprintB) return -1;
      if (!isSprintA && isSprintB) return 1;

      return new Date(a.StartTime) - new Date(b.StartTime);
    });
  };

  useEffect(() => {
  if (!sprints || sprints.length === 0) return;

  const events = [];

  sprints.forEach((sprint, index) => {
    const startDate = new Date(sprint.startDate);
    const endDate = sprint.endDate ? new Date(sprint.endDate) : null;
    // -----------------
    // Sprint main event
    // -----------------
    events.push({
      Id: 1000 + index * 10,
      Subject: sprint.sprintName,
      StartTime: startDate,
      EndTime: endDate,
      IsAllDay: true,
      CategoryColor: "#69acffff", // Light blue for sprints
      type: "sprint",
    });

    // -----------------
    // Retrospective
    // -----------------
    if (endDate) {
  
  const retroBase = new Date(endDate);
  retroBase.setDate(retroBase.getDate()); // Day after sprint end

  // If retroBase is Saturday (6) or Sunday (0), move to Monday
  if (retroBase.getDay() === 6) {
    retroBase.setDate(retroBase.getDate() + 2);
  } else if (retroBase.getDay() === 0) {
    retroBase.setDate(retroBase.getDate() + 1);
  }

  const retroStart = new Date(retroBase);
  retroStart.setHours(14, 0, 0, 0); // 2 PM

  const retroEnd = new Date(retroBase);
  retroEnd.setHours(15, 0, 0, 0); // 3 PM

  
  events.push({
    Id: 1000 + index * 10 + 1,
    Subject: `Retrospective:${sprint.sprintName}`,
    StartTime: retroStart,
    EndTime: retroEnd,
    IsAllDay: false,
    CategoryColor: "#ffc369ff", // Yellow for retros
    type: "retrospective",
  });
}



    // -----------------
    // Standups during sprint only (weekdays)
    // -----------------
    if (endDate) {
      let current = new Date(startDate);
      while (current <= endDate) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
          const standupStart = new Date(current);
          standupStart.setHours(8, 0, 0);
          const standupEnd = new Date(current);
          standupEnd.setHours(9, 0, 0);

          events.push({
            Id: 1000 + index * 10 + events.length,
            Subject: `Daily Standup - ${sprint.sprintName}`,
            StartTime: standupStart,
            EndTime: standupEnd,
            IsAllDay: false,
            CategoryColor: "#d0faa3ff", // Light green
            type: "standup",
          });
        }
        current.setDate(current.getDate() + 1);
      }
    }

    // -----------------
    // Bugs
    // -----------------
    sprint.bugs?.forEach((bug, bugIndex) => {
      events.push({
        Id: 1000 + index * 10 + events.length + bugIndex,
        Subject: ` Bug: ${bug.title}`,
        StartTime: bug.startDate, // Can adjust to bug-specific date if available
        EndTime: bug.startDate,
        IsAllDay: true,
        CategoryColor: "#ff9999", // Red-ish for bugs
        type: "bug",
      });
    });

    // -----------------
    // Tasks
    // -----------------
    sprint.tasks?.forEach((task, taskIndex) => {
      events.push({
        Id: 1000 + index * 10 + events.length + taskIndex,
        Subject: ` Task: ${task.title || "Untitled"}`,
        StartTime: task.startDate, // Can adjust if task-specific date exists
        EndTime: task.startDate,
        IsAllDay: true,
        CategoryColor: "#ab7ff5ff", // Blue for tasks
        type: "task",
      });
    });
  });

  setEvents(sortEvents(events));
}, [sprints]);


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
      <div className="calendar-container">
      <ScheduleComponent
        height="100%"
        currentView="Month"
        eventSettings={{ dataSource: events }}
        rowAutoHeight={true}
        showWeekend={false}
        actionBegin={(args) => {
          if (args.requestType === "eventCreate") {
            const newEvent = Array.isArray(args.data)
              ? args.data[0]
              : args.data;

            newEvent.CategoryColor = "#e3d7ff";

            const title = newEvent.Subject?.toLowerCase() || "";

            if (title === "daily standup") {
              newEvent.CategoryColor = "#e6ffcc";
              newEvent.type = "standup";
            } else if (title.startsWith("retrospective:")) {
              newEvent.CategoryColor = "#ffc369ff";
              newEvent.type = "retrospective";
            }

            setEvents((prev) => sortEvents([...prev, newEvent]));
          }
        }}
        eventRendered={(args) => {
          const { CategoryColor, type, Subject } = args.data;

          args.element.style.backgroundColor = CategoryColor || "#ccc";
          args.element.style.color = "black";
          args.element.style.display = "flex";
          args.element.style.alignItems = "center";
          args.element.style.justifyContent = "flex-start";
          args.element.style.paddingLeft = "8px";
          args.element.style.gap = "6px";

          args.element.innerHTML = "";

          const container = document.createElement("div");
          container.style.display = "flex";
          container.style.alignItems = "center";
          container.style.gap = "6px";

          const icon = typeToIcon[type] || <CheckCircleIcon fontSize="small" />;
          const content = (
            <>
              {icon}
              <span>{Subject}</span>
            </>
          );

          const root = createRoot(container);
          root.render(content);

          args.element.appendChild(container);
        }}
      >
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
        />
      </ScheduleComponent>
    </div>
    )}
    </>
  );
}

export default Calendar;