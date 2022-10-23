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
  getCV: () => {
    return axiosInstance.get('/my/resume');
  },
  updateCV: () => {
    return axiosInstance.post('/my/resume');
  },
  applyJob: (id: any, formData: any) => {
    return axiosInstance.post('/apply/' + id, formData);
  },
};

export default jobSeekerServices;
