import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

/**
 * Fetch backlog items for a specific project
 * @param {number} projectId - The project ID
 * @returns {Promise<Array>} Array of backlog items
 */
export const fetchBacklogItems = async (projectId) => {
  try {
    const response = await axios.get(`${BASE_URL}/backlog/items/${projectId}`);
    return response.data;
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
    id: item.id,
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


