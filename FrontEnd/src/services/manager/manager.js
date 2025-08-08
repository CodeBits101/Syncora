import { config } from "../config";
import axios from 'axios';

export async function getAllInprogressProjects() {
    try {
        let url = `${config.serverUrl}/projects`;

        const token = sessionStorage.getItem('token')

        const response = await axios.get(url, {
            headers: { token }
        })

        return response.data
    }
    catch (ex) {
        console.log(`exception: `, ex)
    }
}

export async function getProjectsCountByStatus() {
    try {
        let url = `${config.serverUrl}/projects/statuscount`;

        const token = sessionStorage.getItem('token');

        const response = await axios.get(url, {
            headers: { token }
        })

        return response.data
    }
    catch (ex) {
        console.log(`exception: `, ex)
    }

}

export async function createProject(data) {
    try {
        let url = `${config.serverUrl}/projects`;

        const token = sessionStorage.getItem('token')

        const response = await axios.post(url, data, {
      headers: {
        token,
      },
    })
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getProjectsByStatus(status) {
  try {
    const url = `${config.serverUrl}/projects/${status}`;
    const token = sessionStorage.getItem('token');

    const response = await axios.get(url, {
      headers: {
        token
      }
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching projects for status ${status}:`, error);
    throw error;
  }
}