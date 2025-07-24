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