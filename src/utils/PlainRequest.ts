import axios from "axios";
const backendUrl: string = import.meta.env.VITE_APP_ENV === "production" ? import.meta.env.VITE_PROD_ENDPOINT : import.meta.env.VITE_DEV_ENDPOINT
export const axiosInstance = axios.create({
  baseURL: backendUrl,
})
type ApiResponse<T = any> = {
  status: "success" | "error";
  message: string;
  data?: T;
};
export const plainRequest = async <T = any>(url: string, body: any): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post(url, body);
    console.log(response)
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data,
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Unknown error",
    };
  }
};
