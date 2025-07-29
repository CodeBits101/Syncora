import axios from "axios";

export const getDepartments = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SPRING_API}/departments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

export const addDepartment = async (deptName) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SPRING_API}/departments`,
      { deptName }
    );
    return response.data; // This is just the ApiResponse message
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};