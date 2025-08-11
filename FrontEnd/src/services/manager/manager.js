import { config } from "../config";
import axios from "axios";
import { toast } from 'react-toastify';
import { formatToLocalDateTime } from "../../utils/formatToLocalDateTime";
import React from "react";

export async function getAllInprogressProjects() {
  try {
    let url = `${config.serverUrl}/projects`;

    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
     headers: {
        Authorization: `Bearer ${token}`,
      },
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function createProject(data) {
  try {
    let url = `${config.serverUrl}/projects`;

    const token = localStorage.getItem("token");

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}

export async function updateProject(projectId,data) {
   try {
    let url = `${config.serverUrl}/projects/${projectId}`;

    const token = localStorage.getItem("token");

    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}


export async function deleteProject(pid) {
  try {
    const url = `${config.serverUrl}/projects/${pid}`;
    const token = localStorage.getItem("token");

    const response = await axios.delete(url, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Dele project operation failed`);
    throw error;
  }
}

export async function getProjectsByStatus(status) {
  try {
    const url = `${config.serverUrl}/projects/${status}`;
    const token = localStorage.getItem("token");

    const response = await axios.get(url, {
    headers: {
        Authorization: `Bearer ${token}`,
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
    console.log("fetched data ", response.data)
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
    console.log("in create print service");
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
    console.log("Full values object before update:", values);
console.log("ID type:", typeof values.id, "ID value:", values.id);
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

export const getCurrentProjectEmpList = async (pid) => {
  try {
    const url = `${config.serverUrl}/employees/project/${pid}`;
    const token = localStorage.getItem("token");

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


export const getUnassignedEmpList = async () => {
  try {
    const url = `${config.serverUrl}/employees/unassigned`;

    const token = localStorage.getItem("token");

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