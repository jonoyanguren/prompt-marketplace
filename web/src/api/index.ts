import axios, { AxiosError } from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.method === "put" &&
      config.url &&
      config.url.includes("amazonaws.com")
    ) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.data}`);
    const errorData = {
      code: "API_ERROR",
      status: error.response.status,
      data: error.response.data,
    };
    throw errorData;
  } else if (error.request) {
    console.error("Error: No se recibió respuesta del servidor");
    const errorData = {
      code: "NO_RESPONSE_FROM_SERVER",
      status: error.status,
    };
    throw errorData;
  } else {
    console.error("Error: ", error.message);
    const errorData = {
      code: "UNKNOWN_ERROR",
      status: 0,
    };
    throw errorData;
  }
}
