import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { persistStore } from 'redux-persist';
import store from '../redux/store';
import { logoutUser } from '../redux/userSlice';

const backendUrl: string =
  import.meta.env.VITE_APP_ENV === 'production'
    ? import.meta.env.VITE_PROD_ENDPOINT
    : import.meta.env.VITE_DEV_ENDPOINT;

const accessToken = Cookies.get('access_token');

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

axiosInstance.interceptors.request.use(
  async (req) => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    if (accessToken) {
      try {
        const decoded = jwtDecode<{ exp: number }>(accessToken);
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          req.headers.Authorization = `Bearer ${accessToken}`;
          return req;
        }
      } catch {
        console.warn('Failed to decode access token');
      }
    }

    // Try refresh
    try {
      const { data } = await axios.post(`${backendUrl}/token/refresh`, {
        refresh: refreshToken,
      });

      Cookies.set('access_token', data.access);
      Cookies.set('refresh_token', data.refresh);

      req.headers.Authorization = `Bearer ${data.access}`;
      return req;
    } catch (err) {
      persistStore(store).purge();
      store.dispatch(logoutUser());
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');

      return Promise.reject(err);
    }
  },
  (error) => Promise.reject(error)
);

// ================================
// ✅ API METHODS
// ================================
type ApiResponse<T = any> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
};

export const postData = async <T = any>(
  url: string,
  body: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post(url, body);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data ?? response.data,
    };
  } catch (err: any) {
    return {
      status: 'error',
      message:
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        JSON.stringify(err?.response?.data) ||
        'Unknown error',
    };
  }
};

export const putData = async <T = any>(
  url: string,
  body: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.put(url, body);
    return {
      status: 'success',
      message: response.data.message,
      data: response.data.data ?? response.data,
    };
  } catch (err: any) {
    return {
      status: 'error',
      message:
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0] ||
        JSON.stringify(err?.response?.data) ||
        'Unknown error',
    };
  }
};

export const getData = async <T = any>(url: string): Promise<T> => {
  const response = await axiosInstance.get<T>(url);
  return response.data;
};
