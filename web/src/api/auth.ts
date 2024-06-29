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

export const register = async ({
  name,
  email,
  password,
  creator,
}: {
  name: string;
  email: string;
  password: string;
  creator: boolean;
}) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
      name,
      email,
      password,
      creator,
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

export const validateEmail = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, {
      code,
      email,
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

export const resendValidationCode = async ({
  email,
}: {
  email: string | undefined;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/resend-code`, {
      email,
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

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
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

export const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
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
