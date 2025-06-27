import axios from 'axios' ;  

export const getAboutDev = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_NODE_API}/dev`);
        return response.data;
    } catch (error) {
        console.error("Error fetching developer information:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}