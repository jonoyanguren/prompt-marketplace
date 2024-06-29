import axios from "axios";
import { handleAxiosError } from ".";
import { API_URL } from "../conf";
import { User } from "../types";

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

export const updateUser = async ({
  userId,
  user,
}: {
  userId: string;
  user: Partial<User>;
}) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, user);
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

export const becomeACreator = async () => {
  try {
    const response = await axios.post(`${API_URL}/user/become-a-creator`);
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
