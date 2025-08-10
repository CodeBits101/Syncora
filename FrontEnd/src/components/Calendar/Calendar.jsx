// import React, { useEffect, useState } from "react";
// import {
//   Inject,
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   DragAndDrop,
//   Resize,
// } from "@syncfusion/ej2-react-schedule";
// import { registerLicense } from "@syncfusion/ej2-base";
// import "./Calendar.css";
// import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
// import ReplayIcon from "@mui/icons-material/Replay";
// import CampaignIcon from "@mui/icons-material/Campaign";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import BugReportIcon from "@mui/icons-material/BugReport";
// import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { createRoot } from "react-dom/client";
// import { fetchSprints } from "./fakeSprintApi";

// registerLicense(
//   "Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCdkx+WmFZfVtgdVVMYlpbR35PMyBoS35Rc0VrWX5fcHZTRWhUWEdxVEFd"
// );

// function Calendar() {
//   const [sprints, setsprints] = useState([]);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchSprints().then((data) => setsprints(data));
//   }, []);

//   const typeToIcon = {
//     sprint: <DirectionsRunIcon fontSize="small" />,
//     retrospective: <ReplayIcon fontSize="small" />,
//     standup: <CampaignIcon fontSize="small" />,
//     task: <TaskAltIcon fontSize="small" />,
//     bug: <BugReportIcon fontSize="small" />,
//     story: <BookmarkBorderOutlinedIcon fontSize="small" />,
//   };

//   const sortEvents = (events) => {
//     return [...events].sort((a, b) => {
//       const isSprintA = a.type === "sprint";
//       const isSprintB = b.type === "sprint";

//       if (isSprintA && !isSprintB) return -1;
//       if (!isSprintA && isSprintB) return 1;

//       return new Date(a.StartTime) - new Date(b.StartTime);
//     });
//   };

//   useEffect(() => {
//     const sprintEvents = sprints.flatMap((sprint, index) => {
//       const startDate = new Date(sprint.startDate);
//       const endDate = sprint.endDate
//         ? new Date(sprint.endDate)
//         : new Date(
//             startDate.getTime() +
//               parseInt(sprint.durationInWeeks) * 7 * 24 * 60 * 60 * 1000
//           );

//       const retrospectiveDate = new Date(endDate);
//       retrospectiveDate.setDate(retrospectiveDate.getDate() + 1);

//       return [
//         {
//           Id: 1000 + index * 3,
//           Subject: sprint.name,
//           StartTime: startDate,
//           EndTime: endDate,
//           IsAllDay: true,
//           CategoryColor: "#cbe2ffff",
//           type: "sprint",
//         },
//         {
//           Id: 1000 + index * 3 + 1,
//           Subject: `Retrospective: ${sprint.name}`,
//           StartTime: new Date(retrospectiveDate.setHours(14, 0, 0)),
//           EndTime: new Date(retrospectiveDate.setHours(15, 0, 0)),
//           IsAllDay: false,
//           CategoryColor: "#ffc369ff",
//           type: "retrospective",
//         },
//       ];
//     });

//     const today = new Date();
//     const standupEvents = [];

//     for (let i = 0; i < 30; i++) {
//       const date = new Date(today);
//       date.setDate(date.getDate() + i);

//       const day = date.getDay();
//       if (day !== 0 && day !== 6) {
//         const start = new Date(date);
//         start.setHours(8, 0, 0);
//         const end = new Date(date);
//         end.setHours(9, 0, 0);

//         standupEvents.push({
//           Id: 2000 + i,
//           Subject: "Daily Standup",
//           StartTime: start,
//           EndTime: end,
//           IsAllDay: false,
//           CategoryColor: "#e6ffcc",
//           type: "standup",
//         });
//       }
//     }

//     setEvents(sortEvents([...sprintEvents, ...standupEvents]));
//   }, [sprints]);

//   return (
//     <div className="calendar-container">
//       <ScheduleComponent
//         height="100%"
//         currentView="Month"
//         eventSettings={{ dataSource: events }}
//         rowAutoHeight={true}
//         showWeekend={false}
//         actionBegin={(args) => {
//           if (args.requestType === "eventCreate") {
//             const newEvent = Array.isArray(args.data)
//               ? args.data[0]
//               : args.data;

//             newEvent.CategoryColor = "#e3d7ff";

//             const title = newEvent.Subject?.toLowerCase() || "";

//             if (title === "daily standup") {
//               newEvent.CategoryColor = "#e6ffcc";
//               newEvent.type = "standup";
//             } else if (title.startsWith("retrospective:")) {
//               newEvent.CategoryColor = "#ffc369ff";
//               newEvent.type = "retrospective";
//             }

//             setEvents((prev) => sortEvents([...prev, newEvent]));
//           }
//         }}
//         eventRendered={(args) => {
//           const { CategoryColor, type, Subject } = args.data;

//           args.element.style.backgroundColor = CategoryColor || "#ccc";
//           args.element.style.color = "black";
//           args.element.style.display = "flex";
//           args.element.style.alignItems = "center";
//           args.element.style.justifyContent = "flex-start";
//           args.element.style.paddingLeft = "8px";
//           args.element.style.gap = "6px";

//           args.element.innerHTML = "";

//           const container = document.createElement("div");
//           container.style.display = "flex";
//           container.style.alignItems = "center";
//           container.style.gap = "6px";

//           const icon = typeToIcon[type] || <CheckCircleIcon fontSize="small" />;
//           const content = (
//             <>
//               {icon}
//               <span>{Subject}</span>
//             </>
//           );

//           const root = createRoot(container);
//           root.render(content);

//           args.element.appendChild(container);
//         }}
//       >
//         <Inject
//           services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize]}
//         />
//       </ScheduleComponent>
//     </div>
//   );
// }

// export default Calendar;

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
    fetchSprints(selectedOption).then((data) => setSprints(data));
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
    const sprintEvents = sprints.flatMap((sprint, index) => {
      const startDate = new Date(sprint.startDate);
      const endDate = sprint.endDate ? new Date(sprint.endDate) : null;

      const retrospectiveDate = endDate
        ? new Date(endDate)
        : new Date(startDate);
      if (endDate) retrospectiveDate.setDate(retrospectiveDate.getDate() + 1);

      return [
        {
          Id: 1000 + index * 3,
          Subject: sprint.sprintName,
          StartTime: startDate,
          EndTime: endDate,
          IsAllDay: true,
          CategoryColor: "#cbe2ffff",
          type: "sprint",
        },
        {
          Id: 1000 + index * 3 + 1,
          Subject: `Retrospective: ${sprint.sprintName}`,
          StartTime: new Date(retrospectiveDate.setHours(14, 0, 0)),
          EndTime: new Date(retrospectiveDate.setHours(15, 0, 0)),
          IsAllDay: false,
          CategoryColor: "#ffc369ff",
          type: "retrospective",
        },
      ];
    });

    // const today = new Date();
    const standupEvents = [];

    // for (let i = 0; i < 30; i++) {
    //   const date = new Date(today);
    //   date.setDate(date.getDate() + i);

    //   const day = date.getDay();
    //   if (day !== 0 && day !== 6) {
    //     const start = new Date(date);
    //     start.setHours(8, 0, 0);
    //     const end = new Date(date);
    //     end.setHours(9, 0, 0);

    //     standupEvents.push({
    //       Id: 2000 + i,
    //       Subject: "Daily Standup",
    //       StartTime: start,
    //       EndTime: end,
    //       IsAllDay: false,
    //       CategoryColor: "#e6ffcc",
    //       type: "standup",
    //     });
    //   }
    // }

    setEvents(sortEvents([...sprintEvents, ...standupEvents]));
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

export default Calendar;
