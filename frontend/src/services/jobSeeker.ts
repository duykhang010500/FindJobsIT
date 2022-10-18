import { UserRegister, UserLogin } from './../models/auth/index';
import axiosInstance from './axiosInstance';

const jobSeekerServices = {
  register: (formData: UserRegister) => {
    return axiosInstance.post('/register', formData);
  },
  login: (formData: UserLogin) => {
    return axiosInstance.post('/login', formData);
  },
  getCurrentJobSeeker: () => {
    return axiosInstance.get('/info');
  },
  getJobsList: () => {
    return axiosInstance.get('/jobs');
  },
  getIndustriesList: () => {
    return axiosInstance.get('/industries');
  },
  getLocationList: () => {
    return axiosInstance.get('/location');
  },
};

export default jobSeekerServices;
