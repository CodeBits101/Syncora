import { config } from "../config";
import axios from "axios";
import { toast } from 'react-toastify';
import { formatToLocalDateTime } from "../../utils/formatToLocalDateTime";

export async function getAllInprogressProjects() {
  try {
    let url = `${config.serverUrl}/projects`;

    const token = sessionStorage.getItem("token");

    const response = await axios.get(url, {
      headers: { token },
    });

    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function getProjectsCountByStatus() {
  try {
    let url = `${config.serverUrl}/projects/statuscount`;

    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
      headers: { token },
    });

    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function createProject(data) {
  try {
    let url = `${config.serverUrl}/projects`;

    const token = sessionStorage.getItem("token");

    const response = await axios.post(url, data, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function getProjectsByStatus(status) {
  try {
    const url = `${config.serverUrl}/projects/${status}`;
    const token = sessionStorage.getItem("token");

    const response = await axios.get(url, {
      headers: {
        token,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for status ${status}:`, error);
    throw error;
  }
}

//Sprints API here
export const getSprintByProjectId = async (projectId) => {
  try {
    const url = `${config.serverUrl}/sprints/${projectId}`;
    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for status ${status}:`, error);
    throw error;
  }
};

//Stories API here
export const addStory = async (data) => {
  try {
    const url = `${config.serverUrl}/stories/add`;

    const token = localStorage.getItem("token");

    const response = await axios.post(url, data, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
};

export const getStoriesByProjectIdAndSprintId = async (pid, sid) => {
  try {
    const url = `${config.serverUrl}/stories/bypidandsid/${pid}/${sid}`;

    const token = localStorage.getItem("token");
    console.log(token);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
};

//TASKS APIs-:

export const addTask = async (data) => {
  try {
    const url = `${config.serverUrl}/tasks/add`;

    const token = localStorage.getItem("token");
    console.log(token);

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`exception: `, error);
  }
};

//Bugs APis here
export const addBug = async (data) => {
  try {
    const url = `${config.serverUrl}/bugs/add`;

    const token = localStorage.getItem("token");

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(`exception: `, error);
  }
};




// ***************** SPRINT FUNCTIONS ************************
export async function createSprint(data)
{
  try{
    let url = `${config.serverUrl}/sprints`;
    const token = sessionStorage.getItem('token');

    const response = await axios.post(url, data, {
      headers: token,
    })
    return response.data;
  }
  catch(ex){
    console.log("Exception : ", ex);
  }
 
}

export async function startSprint(sprintId, projectId) {
  try {
    console.log("Starting sprint", { sprintId, projectId });

    let url = `${config.serverUrl}/sprints/${sprintId}/start?projectId=${projectId}`;

    const token = localStorage.getItem('token');

    const response = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    toast.success("Sprint Started");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to Start Sprint");
    throw error;
  }
}


export async function completeSprint(sprintId)
{
  try{
    let url = `${config.serverUrl}/sprints/${sprintId}/complete`;
    const token = sessionStorage.getItem('token')

    const response = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    toast.success("Sprint Completed.");
    return response.data;
  }
  catch(error)
  {
    console.error("Failed to complete Sprint"), error;
    throw error;
  }
}

export async function deleteSprint(sprintId)
{
  try{
    let url = `${config.serverUrl}/sprints/${sprintId}`;
    const token = localStorage.getItem('token')

    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
  catch(error)
  {
    console.error("Failed to delete Sprint"), error;
    throw error;
  }
}

export async function updateSprint(values)
{
  try{
    values.startDate = formatToLocalDateTime(values.startDate);
    values.endDate = formatToLocalDateTime(values.endDate);
    let url = `${config.serverUrl}/sprints/${values.id}`;
    const token = localStorage.getItem('token');

    const response = await axios.put(url, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
             }
});

  }
  catch(ex){
    console.log("Exception : ", ex);
  }
  
}