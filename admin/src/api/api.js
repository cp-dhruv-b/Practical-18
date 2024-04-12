
import axios from "axios";

const baseUrl = "http://localhost:3000/admin";

export const makeApiRequest = async (method, endpoint, data = null, token = null) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let response;
    switch (method) {
      case "get":
        response = await axios.get(`${baseUrl}/${endpoint}`, config);
        break;
      case "post":
        response = await axios.post(`${baseUrl}/${endpoint}`, data, config);
        break;
      case "put":
        response = await axios.put(`${baseUrl}/${endpoint}`, data, config);
        break;
      case "delete":
        response = await axios.delete(`${baseUrl}/${endpoint}`, config);
        break;
      default:
        throw new Error(`Invalid HTTP method: ${method}`);
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


