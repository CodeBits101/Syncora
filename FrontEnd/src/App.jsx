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
import SprintScreen from "./services/manager/SprintScreen";
function App() {
  const [count, setCount] = useState(0);

  //this should be replaced with global store/cookie role value
  const user = { role: "manager" };

  const getRoleRoutes = () => {
    switch (user.role) {
      case "dev":
        return renderRoleRoutes(developer);
      case "admin":
        return renderRoleRoutes(admin);
      case "manager":
        return renderRoleRoutes(manager);
      case "tester":
        return renderRoleRoutes(tester);
      default:
        return <Route path="*" element={<NotFoundPage />} />;
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
    </Route>
  );

  return (
    <>
      <Routes>
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/dev" element={<AboutDev />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Signup />} />
        {/* for testing manager sprints screen */}
        <Route path="/manager/projects/:projectId/sprints" element={<SprintScreen />} />


{/* 
        {getRoleRoutes()} */}
        <Route path="/" element={<AboutProject />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <div className='p-3'>SYNCORA 
      <p className='px-3'>This is project management system </p>
     </div> */}
    </>
  );
}

export default App;
