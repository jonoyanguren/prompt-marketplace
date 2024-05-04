import axios from "axios";
import { Prompt } from "../types";
import { API_URL } from "../conf";
import { handleAxiosError } from ".";

export const getAllPrompts = async (): Promise<Prompt[]> => {
  try {
    const response = await axios.get(`${API_URL}/prompt`);
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
