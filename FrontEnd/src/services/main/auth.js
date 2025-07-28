import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "../../utils/basicUtil";


export const getProfile = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NODE_API}/profile`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SPRING_API}/employees/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SPRING_API}/employees/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const getEmployeeByRole = async (role) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SPRING_API}/employees/${role}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee by role:", error);
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${import.meta.env.VITE_SPRING_API}/employees/changepassword`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const getEmployeeById = async () => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${import.meta.env.VITE_SPRING_API}/employees/byid`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
