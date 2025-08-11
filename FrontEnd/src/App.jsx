import { useState, Suspense } from "react";
import "./App.css";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import ProfileCard from "./components/ProfileCard/ProfileCard";
import { Routes, Route, Navigate } from "react-router-dom";
import AboutDev from "./screens/developer/AboutDev";
import AboutProject from "./screens/main/AboutProject";
import NotFoundPage from "./screens/main/NotFoundPage";
import LoginPage from "./screens/Login";
import Signup from "./screens/Signup";

import ProjectStatus from "./screens/manager/ProjectStatus";

import { manager, developer, admin, tester, roleExtraRoutes } from "../configs";
import Home from "./Layout/Home/Home";
import TaskBoard from "./components/TaskScreen/TaskBoard";
import UnAuthorised from "./screens/main/UnAuthorised";

import Calendar from "./components/Calendar/Calendar";
import { ToastContainer } from "react-toastify";
import ProjectDetails from '../src/components/shared/ProjectDetails'

import ProjectDetails from "./components/shared/ProjectDetails";

function App() {
  const [count, setCount] = useState(0);
  const [role, setRole] = useState(localStorage.getItem("role"));
  //this should be replaced with global store/cookie role value
  const user = { role: "ROLE_MANAGER" };
  const getRoleRoutes = () => {
    switch (role) {
      case "ROLE_DEVELOPER":
        return renderRoleRoutes(developer);
      case "ROLE_ADMIN":
        return renderRoleRoutes(admin);
      case "ROLE_MANAGER":
        return renderRoleRoutes(manager);
      case "ROLE_TESTER":
        return renderRoleRoutes(tester);
      default:
        return <Route path="*" element={<UnAuthorised />} />;
    }
  };

  const renderMenuRoutes = (menu) => {
    return menu.flatMap(({ label, path, component: Component, submenu }) => {
      const routes = [
        <Route
          key={label}
          path={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />,
      ];

      if (submenu) {
        routes.push(
          ...submenu.map(
            ({ label: subLabel, path: subPath, component: SubComponent }) => (
              <Route
                key={subLabel}
                path={subPath}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <SubComponent />
                  </Suspense>
                }
              />
            )
          )
        );
      }

      return routes;
    });
  };

  const renderRoleRoutes = (roleConfig) => (
    <Route
      path={`/${roleConfig.path}`}
      element={<Home roleConfig={roleConfig} />}
    >
      <Route
        index
        element={<Navigate to={roleConfig.menu[0].path} replace />}
      />
      {renderMenuRoutes(roleConfig.menu)}
      {roleExtraRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>
  );

  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/dev" element={<AboutDev />} />
        {/* <Route path="/backlog" element={<BacklogTable />} /> */}

        {/* <Route path="/manager/projects/:taskstatus" element={<ProjectStatus />} /> */}

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        <Route path="/register" element={<Signup />} />

        {/* for testing manager sprints screen */}

        <Route path="/projectstatus" element={<ProjectStatus />} />
        {/* 
        {getRoleRoutes()} */}

        <Route path="/scrumBoard/:sprintId/:projectId" element={<TaskBoard />} />

        {getRoleRoutes()}

        <Route path="/" element={<AboutProject />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/unautho" element={<UnAuthorised />} />

       <Route path="/project/:projectName" element = {<ProjectDetails/>} />

        <Route path="/project/:projectName" element = {<ProjectDetails/>} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <div className='p-3'>SYNCORA 
      <p className='px-3'>This is project management system </p>

     </div> */}
    </>
  );
}

export default App;
