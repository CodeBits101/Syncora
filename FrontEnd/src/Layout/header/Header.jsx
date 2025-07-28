import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import logo from "../../assets/logo_light.png";
import { useNavigate } from "react-router-dom";
import { getOrSetUserFromCookie } from "../../utils/cookieUser";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userFromCookie = getOrSetUserFromCookie();
    setUser(userFromCookie);
  }, []);
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar style={{ padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: 50, width: 160, objectFit: "cover" }}
            />
          </Box>
          <Typography variant="h6" noWrap style={{ padding: 15 }}>
            <div className="d-flex align-items-center">
              <FaRegUserCircle size={25} className="me-2" />
              <span
                onClick={() => {
                  navigate("/profile");
                }}
                className="cursor-pointer"
              >
                {user ? user.userName?.split(" ")[0] : "User"}
              </span>
            </div>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
