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


// function mapTasksToStatusGroups(tasks) {
//   // Mapping from normalized API status to the dummy object key and title
//   const statusMap = {
//     TODO: { id: 'todo', title: 'TODO' },
//     INPROGRESS: { id: 'in-progress', title: 'IN PROGRESS' },
//     TESTING: { id: 'testing', title: 'TESTING' },
//     DEPLOYMENT: { id: 'deployment', title: 'DEPLOYMENT' },
//   };

//   // Initialize result with empty taskIds arrays
//   const result = {
//     'todo': { id: 'todo', title: 'TODO', taskIds: [] },
//     'in-progress': { id: 'in-progress', title: 'IN PROGRESS', taskIds: [] },
//     'testing': { id: 'testing', title: 'TESTING', taskIds: [] },
//     'deployment': { id: 'deployment', title: 'DEPLOYMENT', taskIds: [] },
//   };

//   tasks.forEach((task, index) => {
//     const normalizedStatus = task.status.toUpperCase();

//     // Find mapped status info, default to TODO if unknown
//     const mappedStatus = statusMap[normalizedStatus] || statusMap.TODO;

//     // Create dummy key using index or task.id, e.g. task-1
//     const taskKey = `task-${task.id}`;

//     // Add to the corresponding taskIds array
//     result[mappedStatus.id].taskIds.push(taskKey);
//   });

//   return result;
// }
