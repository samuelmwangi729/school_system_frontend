import axios from "axios";
import Cookies from "js-cookie";
const backendUrl: string = import.meta.env.VITE_APP_ENV === "production" ? import.meta.env.VITE_PROD_ENDPOIT : import.meta.env.VITE_DEV_ENDPOINT

const token: string | undefined = Cookies.get('token')
export const axiosInstance = axios.create({
    baseURL: backendUrl,
})
type ApiResponse<T = any> = {
  status: "success" | "error";
  message: string;
  data?: T;
};

//add the headers in the requests
axiosInstance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        config.headers['Content-Type'] = 'application/json'
        config.headers['Content-Type'] = 'multipart/form-data'
        return config
    }
)

export const postData = async <T = any>(url: string, body: any): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post(url, body);
    return {
      status: "success",
      message: "Login successful",
      data: response.data,
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Unknown error",
    };
  }
};
