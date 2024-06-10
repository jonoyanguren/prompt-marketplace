import axios from "axios";
import { Prompt } from "../types";
import { API_URL } from "../conf";
import { handleAxiosError } from ".";

export const getAllPrompts = async ({
  timesFetched,
}: {
  timesFetched?: number;
}): Promise<Prompt[]> => {
  try {
    const url = timesFetched
      ? `${API_URL}/prompt?timesFetched=${timesFetched}`
      : `${API_URL}/prompt`;

    const response = await axios.get(url);
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
  timesFetched,
}: {
  categoryId: string;
  timesFetched?: number;
}): Promise<Prompt[]> => {
  try {
    const url = timesFetched
      ? `${API_URL}/prompt/category/${categoryId}?timesFetched=${timesFetched}`
      : `${API_URL}/prompt/category/${categoryId}`;
    const response = await axios.get(url);
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
  timesFetched,
}: {
  text: string;
  timesFetched?: number;
}): Promise<Prompt[]> => {
  try {
    const url = timesFetched
      ? `${API_URL}/prompt/search/${text}?timesFetched=${timesFetched}`
      : `${API_URL}/prompt/search/${text}`;

    const response = await axios.get(url);
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

export const getMyPrompts = async (): Promise<Prompt[]> => {
  try {
    const response = await axios.get(`${API_URL}/prompt/mine`);
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

export const createPrompt = async ({ prompt }: { prompt: any }) => {
  try {
    const response = await axios.post(`${API_URL}/prompt`, prompt);
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
