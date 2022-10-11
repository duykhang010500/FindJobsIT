import axios from 'axios';

const URL: string = 'http://127.0.0.1:8000/api';

const axiosInstance = axios.create({
  baseURL: `${URL}`,
});

axiosInstance.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('accessToken')}`;

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) =>
    Promise.reject(
      (err.response && err.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
