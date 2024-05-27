import axios from "axios";
import { handleAxiosError } from ".";
import { API_URL } from "../conf";

export const getPlatforms = async () => {
  try {
    const response = await axios.get(`${API_URL}/platform`);
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

export const votePlatform = async ({ id }: { id: string }) => {
  try {
    const response = await axios.post(`${API_URL}/platform/upvote`, {
      platformId: id,
    });
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
