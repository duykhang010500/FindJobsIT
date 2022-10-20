import { IUserLogin } from '../store/auth/types';
import axiosInstance from './axiosInstance';

const employerServices = {
  //auth
  register: (formData: any) => {
    return axiosInstance.post('/employer/register', formData);
  },
  login: (formData: IUserLogin) => {
    return axiosInstance.post('/employer/login', formData);
  },
  getMyInfo: () => {
    return axiosInstance.get('/employer/info');
  },
  updateProfile: (formData: any) => {
    return axiosInstance.post('/employer/hr/profile', formData);
  },
  updateCompany: (formData: any) => {
    return axiosInstance.post('/employer/hr/company', formData);
  },

  //jobs
  createJob: (formData: any) => {
    return axiosInstance.post('/employer/hr/job', formData);
  },

  //candidates
  getCandidates: () => {
    return axiosInstance.get('/employer/hr/candidates');
  },

  //services
  getListServices: () => {
    return axiosInstance.get('/employer/services');
  },
};

export default employerServices;
