import axios from 'axios';

const URL: string = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: `${URL}`,
});

const getToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return null;
  }
  return token;
};

axiosInstance.interceptors.request.use((config: any) => {
  config.headers['Authorization'] = `Bearer ${getToken()}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) =>
    Promise.reject(
      (err.response && err.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
