import { getSprintByProjectId } from "../../../services/manager/manager";
import { statusMap, transformSprintData } from "./dataMapping";

export const changeBugStatus = async (status, taskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/bugs/${status}/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
   } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const changeStoryStatus = async (status, taskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/stories/${status}/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
   } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const changeTaskStatus = async (status, taskId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/tasks/${status}/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
   } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const fetchBoardData = async (sprintId, projectId) => {
  try {
    const sprints = await fetchSprints(projectId);
    if (!sprints || sprints.length === 0) {
      return []; // no sprints found
    }

    console.log("sprints: ", sprints)
    console.log("sprintid",sprintId)
    return transformSprintData(sprints, sprintId)

  } catch (error) {
    console.error("Failed to fetch board data", error);
    throw error;
  }
};

const fetchSprints = async (projectId) => {
    try {
      const res = await getSprintByProjectId(projectId)
      console.log("fetched data ", res)
      console.log(res[0].description)
      return res
    } catch (err) {
      console.error("Error fetching sprints:", err);
    }
  }

export const mapApiSubtasksToRichFormat = (apiSubtasks) => {
  return apiSubtasks.map(subtask => ({
    id: `task-${subtask.id}`,        // formatted id like dummy data
    backendId: subtask.id,
    title: subtask.title,
    description: '',                 // no description from API, so empty string or default
    type: 'subtask',                // fixed value
    priority: 'green',              // default priority, change if you want
    createdAt: null,                // no createdAt from API, set null or default
    updatedAt: null,                // same as above
    assignee: '-',                 // default placeholder, since API doesn't provide
    creator: '-',                  // default placeholder
    dueDate: null,                 // no dueDate, set null
    sprint: '-',                  // no sprint info, placeholder
    comments: null,
    attachments: null,
    status: subtask.status || 'TODO', // use API status or default to TODO
  }));
}

