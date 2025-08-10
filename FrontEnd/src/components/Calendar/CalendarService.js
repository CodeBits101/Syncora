// export async function fetchSprints() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           id: 1,
//           name: 'Sprint 5',
//           startDate: '2025-07-28',
//           endDate: '2025-08-11',
//           goal: 'Refactor core & auth'
//         },
//         {
//           id: 2,
//           name: 'Sprint 6',
//           startDate: '2025-08-15',
//           endDate: '2025-08-28',
//           goal: 'Add user roles & story filters'
//         }
//       ]);
//     }, 400);
//   });
// }



// src/services/sprintService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // change if needed

/**
 * Fetch all sprints from backend
 * @returns {Promise<Array>} List of sprints
 */
export async function fetchSprints(projectId) {
  try {
    const res = await axios.get(`${BASE_URL}/sprints/${projectId}`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching sprints:", error);
    return [];
  }
}

