import { AxiosError } from "axios";

export function handleAxiosError(error: AxiosError): never {
  if (error.response) {
    console.error(
      `Error ${error.response.status}: ${error.response.data.message}`
    );
    throw error.response.data;
  } else if (error.request) {
    console.error("Error: No se recibió respuesta del servidor");
    throw error;
  } else {
    console.error("Error: ", error.message);
    throw error;
  }
}
