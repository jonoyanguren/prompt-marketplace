import { AxiosError } from "axios";

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
