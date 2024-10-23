import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL as string;
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Interceptor", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   console.log("Unauthorized access - 401");
    //   window.location.href = "/signin";
    // }
    return Promise.reject(error);
  }
);
export default axiosInstance;
