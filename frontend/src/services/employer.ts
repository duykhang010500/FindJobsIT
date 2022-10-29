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
    return axiosInstance.post('/employer/hr/job/0', formData);
  },
  getJobs: () => {
    return axiosInstance.get('/employer/hr/job');
  },
  updateJob: (id: any, formData: any) => {
    return axiosInstance.patch('/employer/hr/job/' + id, formData);
  },
  deleteJob: (id: any) => {
    return axiosInstance.delete('/employer/hr/job/' + id);
  },

  //candidates
  getCandidates: () => {
    return axiosInstance.get('/employer/hr/candidates');
  },
  getDetailCandidate: (id: number) => {
    return axiosInstance.get('/employer/hr/candidate/' + id);
  },

  updateStatus: (id: any, formData: any) => {
    return axiosInstance.post('/employer/hr/candidate/status/' + id, formData);
  },
  //services
  getListServices: () => {
    return axiosInstance.get('/employer/services');
  },
};

export default employerServices;
