import axios from "axios";
import { handleAxiosError } from ".";
import { API_URL } from "../conf";

export const getMe = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/me`);
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error);
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
