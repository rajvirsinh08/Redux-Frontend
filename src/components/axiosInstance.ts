import axios from 'axios';

// Create Axios instance with base URL
const baseUrl = process.env.REACT_APP_BASE_URL as string;
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized access globally
    // if (error.response && error.response.status === 401) {
    //   console.log("Unauthorized access - 401");
    //   window.location.href = "/signin";
    // }
    return Promise.reject(error);
  }
);
export default axiosInstance;
