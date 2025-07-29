import React, { useState } from "react";
import "./LoginPage.css";
import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { loginUser } from "../services/main/auth";
import Cookies from "js-cookie";
import { roleBasePaths } from "../utils/roleBasedPaths";

const LoginPage = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  //calling login api

  const handleLogin = async (e) => {
    console.log("Logging in with:", username, password);
    setIsLoading(true);
    // validation Logic for email and password

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim() || !password.trim()) {
      toast.error("Email and Password are required");
      return;
    }

    if (!emailRegex.test(username)) {
      toast.error("Enter a valid email address");
      return;
    }
    try {
      const data = {
        email: username,
        password: password,
      };
      const response = await loginUser(data);
      console.log(response);
      toast.success("Login Successfull");

      //setting the token in localstorage
      localStorage.setItem("token", response.jwt);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("empName", response.userName);
      localStorage.setItem("empId", response.id);
      localStorage.setItem("role", response.role);

      //setting token in cookies
      Cookies.set("token", response.jwt, { expires: 7 }); // expires in 7 days
      Cookies.set("empId", response.id);
      Cookies.set("empName", response.userName);
      Cookies.set("role", response.role);
      Cookies.set("user", JSON.stringify(response));

      setRole(response.role);

      //delay navigation by 1500 ms
      const basePath = roleBasePaths[response.role];

      setTimeout(() => {
        if (basePath) {
          navigate(`/${basePath}`);
        } else {
          navigate("/not-foound");
        }
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response.data.message || "Login failed occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo-text">SYNCORA</h1>
        <div className="login-form">
          <div className="input-wrapper">
            <span className="icon">
              <svg
                width="26"
                height="24"
                viewBox="0 0 26 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1844 20.2927V18.4188C21.1844 17.4248 20.7411 16.4715 19.9521 15.7686C19.163 15.0658 18.0928 14.6709 16.9769 14.6709H8.56197C7.44608 14.6709 6.37589 15.0658 5.58683 15.7686C4.79778 16.4715 4.35449 17.4248 4.35449 18.4188V20.2927"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.7695 10.923C15.0932 10.923 16.977 9.24504 16.977 7.17514C16.977 5.10523 15.0932 3.42725 12.7695 3.42725C10.4458 3.42725 8.56201 5.10523 8.56201 7.17514C8.56201 9.24504 10.4458 10.923 12.7695 10.923Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper" style={{ border: "none" }}>
            <span className="icon">
              <svg
                width="31"
                height="32"
                viewBox="0 0 31 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.1935 14.686H6.79821C5.42576 14.686 4.31317 15.8303 4.31317 17.2419V26.1874C4.31317 27.5989 5.42576 28.7432 6.79821 28.7432H24.1935C25.566 28.7432 26.6786 27.5989 26.6786 26.1874V17.2419C26.6786 15.8303 25.566 14.686 24.1935 14.686Z"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.28326 14.6859V9.5742C9.28326 7.87957 9.9378 6.25434 11.1029 5.05605C12.268 3.85776 13.8482 3.18457 15.4959 3.18457C17.1436 3.18457 18.7238 3.85776 19.8888 5.05605C21.0539 6.25434 21.7085 7.87957 21.7085 9.5742V14.6859"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  style={{
                    padding: "4%",
                    paddingLeft: "13%",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    color: "white", // Optional: to make the text visible on dark bg
                  }}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transparentInput"
                />
                <InputGroup.Text
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    color: "white", // Optional: to make the icon visible
                  }}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <VscEyeClosed /> : <VscEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
          <button onClick={() => handleLogin()} className="login-btn">
            {isLoading ? "Logining..." : "Login"}
          </button>
        </div>

        <p className="forgot-password">Forgot password?</p>
        <p className="forgot-password">
          Already have an account?{" "}
          <a className="registerLink" onClick={() => navigate("/register")}>
            Sign in here
          </a>{" "}
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default LoginPage;
