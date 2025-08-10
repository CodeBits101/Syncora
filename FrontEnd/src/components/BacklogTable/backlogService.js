import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/**
 * Fetch backlog items for a specific project
 * @param {number} projectId - The project ID
 * @returns {Promise<Array>} Array of backlog items
 */
export const fetchBacklogItems = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/backlog/items/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
   } catch (error) {
    console.error('Error fetching backlog items:', error);
    throw error;
  }
};

/**
 * Transform backend data to match frontend format
 * @param {Array} backendData - Raw data from backend
 * @returns {Array} Transformed data for frontend
 */
export const transformBacklogData = (backendData) => {
  return backendData.map(item => ({
    gridId: `${item.id}-${item.type}`, // unique for DataGrid
    backendId: item.id,                // preserve real ID for API updates
    title: item.title,
    type: item.type, // STORY, TASK, BUG
    priority: item.priority, // HIGH, MEDIUM, LOW
    assignee: item.assignedToName || 'Unassigned',
    status: item.status || 'To Do',
    // Add any additional fields that might be needed
  }));
};

/**
 * Get backlog items with transformation
 * @param {number} projectId - The project ID
 * @returns {Promise<Array>} Transformed backlog items
 */
export const getBacklogItems = async (projectId) => {
  try {
    const rawData = await fetchBacklogItems(projectId);
    return transformBacklogData(rawData);
  } catch (error) {
    console.error('Error getting backlog items:', error);
    throw error;
  }
};

/**
 * Delete a story by id
 * @param {number} id - backend id
 */
export const deleteStory = async (id) => {
  try {
    // adjust path if backend has a different route
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/stories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(`Error deleting story ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a task by id
 * @param {number} id - backend id
 */
export const deleteTask = async (id) => {
  try {
    // adjust path if backend has a different route
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(`Error deleting task ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a bug by id
 * @param {number} id - backend id
 */
export const deleteBug = async (id) => {
  try {
    // adjust path if backend has a different route
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/bugs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(`Error deleting bug ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch a story by its ID
 * @param {number} id - Story ID
 * @returns {Promise<Object>} Story object
 */
export const getStoryById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/stories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching story with id ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch a task by its ID
 * @param {number} id - Task ID
 * @returns {Promise<Object>} Task object
 */
export const getTaskById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch a bug by its ID
 * @param {number} id - Bug ID
 * @returns {Promise<Object>} Bug object
 */
export const getBugById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/bugs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching bug with id ${id}:`, error);
    throw error;
  }
};
