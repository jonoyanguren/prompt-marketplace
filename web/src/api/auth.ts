import axios from "axios";
import { API_URL } from "../conf";
import { handleAxiosError } from ".";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
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
