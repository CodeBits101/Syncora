import { config } from "../config";
import axios from "axios";

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
