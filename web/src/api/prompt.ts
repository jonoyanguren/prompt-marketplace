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

export const getPromptsByCategory = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<Prompt[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/prompt/category/${categoryId}`
    );
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

export const getPromptsByText = async ({
  text,
}: {
  text: string;
}): Promise<Prompt[]> => {
  try {
    const response = await axios.get(`${API_URL}/prompt/search/${text}`);
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

export const getPromptById = async ({
  id,
}: {
  id: string;
}): Promise<Prompt> => {
  try {
    const response = await axios.get(`${API_URL}/prompt/${id}`);
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

export const upvotePrompt = async ({ id }: { id: string }) => {
  try {
    const response = await axios.post(`${API_URL}/prompt/${id}/upvote`);
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

export const downvotePrompt = async ({ id }: { id: string }) => {
  try {
    const response = await axios.post(`${API_URL}/prompt/${id}/downvote`);
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
