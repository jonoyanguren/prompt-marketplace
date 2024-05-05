import axios from "axios";
import { API_URL } from "../conf";
import { handleAxiosError } from ".";

export const getConfig = async () => {
  try {
    const response = await axios.get(`${API_URL}/config`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
