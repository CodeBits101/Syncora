import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../services/main/department";
import { getEmployeeByRole, registerUser } from "../services/main/auth"; // Assuming this service exists
import empRole from "../utils/empRole";
import Button from "react-bootstrap/Button";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

function ButtonRegisterGroup({ formData, setFormData }) {
  const [buttons, setButtons] = useState([
    { id: 1, label: "Manager", variant: "dark", value: "ROLE_MANAGER" },
    { id: 2, label: "Developer", variant: "light", value: "ROLE_DEVELOPER" },
    { id: 3, label: "Tester", variant: "light", value: "ROLE_TESTER" },
    { id: 4, label: "Admin", variant: "light", value: "ROLE_ADMIN" },
  ]);

  const handleOnClick = (clickedId, role) => {
    console.log("Selected Role:", role);
    setFormData({ ...formData, empRole: role });
    setButtons((prevButtons) =>
      prevButtons.map((btn) =>
        btn.id === clickedId
          ? { ...btn, variant: "dark" }
          : { ...btn, variant: "light" }
      )
    );
  };

  return (
    <div className="d-flex justify-content-center mb-3 gap-2">
      {buttons.map((button) => {
        return (
          <Button
            key={button.id}
            variant={button.variant}
            onClick={() => {
              // Handle button click logic here
              handleOnClick(button.id, button.value);
            }}
          >
            {button.label}
          </Button>
        );
      })}
    </div>
  );
}

const Signup = () => {
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    empName: "",
    email: "",
    password: "",
    phoneNumber: "",
    departmentId: "",
    managerId: "",
    doj: "",
    empRole: "ROLE_MANAGER", //default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await getEmployeeByRole("ROLE_MANAGER");

      setManagers(response);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleRegister = async (e) => {
    console.log(formData);
    setIsLoading(true);
    const localDateTime = `${formData.doj}T00:00:00`;
    setFormData({ ...formData, doj: localDateTime });

    // validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.empName.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!formData.phoneNumber.trim() || !phoneRegex.test(formData.phoneNumber)) {
      toast.error("Enter a valid phone number (Max.10 Digits)");
      return;
    }
    if(!formData.departmentId)
    {
      toast.error("Please select a department")
      return;
    }
    if (!formData.doj) {
      toast.error("Please select a date");
      return;
    }
    if((formData.empRole === "ROLE_DEVELOPER" || formData.empRole === "ROLE_TESTER") && !formData.managerId)
    {
      toast.error("Manager is required for Developers and Testers");
      return;
    }


    try {
      const response = await registerUser(formData);
      console.log("Registration successful:", response);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      // Optionally, you can show an error message to the user
      toast.error("Registration failed. Please try again.");
      toast.error(error.response.data.message || "An error occurred");
    } finally {
      setIsLoading(false);
      setFormData({
        empName: "",
        email: "",
        password: "",
        phoneNumber: "",
        departmentId: "",
        managerId: "",
        doj: "",
        empRole: "ROLE_MANAGER", //default role
      });
      fetchDepartments();
      fetchManagers();
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchManagers();
  }, []);

  return (
  <div className="register-page">
    <div className="auth-container ">
      <div className="auth-box">
        <h2 className="auth-title">Register As</h2>
        <div className="mt-3">
          <ButtonRegisterGroup formData={formData} setFormData={setFormData} />
        </div>
        <div>
          <input
            className="auth-input"
            type="text"
            name="empName"
            placeholder="Name"
            value={formData.empName}
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Form.Group>
            <InputGroup>
              <Form.Control
                style={{ padding: "3%" }}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputGroup.Text
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                style={{ cursor: "pointer" }}
              >
                {isPasswordVisible ? <VscEyeClosed /> : <VscEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <input
            className="auth-input"
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <select
            className="auth-input"
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department.id}>
                {department.deptName}
              </option>
            ))}
          </select>

          {formData.empRole != "ROLE_MANAGER" &&
            formData.empRole != "ROLE_ADMIN" && (
              <select
                className="auth-input"
                name="managerId"
                value={formData.managerId}
                onChange={handleChange}
              >
                <option value="">Select Manager</option>
                {managers.map((manager, index) => (
                  <option key={index} value={manager.id}>
                    {manager.empName}
                  </option>
                ))}
              </select>
            )}

          <input
            className="auth-input"
            type="date"
            name="doj"
            placeholder="Date of Joining"
            value={formData.doj}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            required
          />

          <button onClick={() => handleRegister()} className="auth-button">
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
        <p className="auth-footer">
          Have an account?{" "}
          <a href="/login" className="auth-link">
            Log in
          </a>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
    </div>
  );
};

export default Signup;
