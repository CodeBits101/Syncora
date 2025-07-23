import axios from "axios";

export const getAboutSyncora = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_NODE_API}/about`);
    return response.data;
  } catch (error) {
    console.error("Error fetching about Syncora:", error);
    throw error;
  }
};
