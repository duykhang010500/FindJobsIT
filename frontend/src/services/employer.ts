import { IUserLogin } from '../store/auth/types';
import axiosInstance from './axiosInstance';

const employerServices = {
  register: (formData: any) => {
    return axiosInstance.post('/employer/register', formData);
  },
  login: (formData: IUserLogin) => {
    return axiosInstance.post('/employer/login', formData);
  },
  getMyInfo: () => {
    return axiosInstance.get('/employer/info');
  },
  createJob: (formData: any) => {
    return axiosInstance.post('/employer/hr/job', formData);
  },
  getCandidates: () => {
    return axiosInstance.get('/employer/hr/candidates');
  },
};

export default employerServices;
