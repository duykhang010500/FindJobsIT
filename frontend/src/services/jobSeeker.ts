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
  forgotPassword: (formData: any) => {
    return axiosInstance.post('/reset-password', formData);
  },
  resetPassword: (token: any, formData: any) => {
    return axiosInstance.put(`/reset-password?token=${token}`, formData);
  },

  //job
  getJobsList: () => {
    return axiosInstance.get('/jobs');
  },
  getIndustriesList: () => {
    return axiosInstance.get('/industries');
  },
  getLocationList: () => {
    return axiosInstance.get('/location');
  },

  //cv
  getCV: () => {
    return axiosInstance.get('/my/resume');
  },
  updateCV: (formData: any) => {
    return axiosInstance.post('/my/resume', formData);
  },
  updateCVType: (cv_type: number) => {
    return axiosInstance.post('/my/update-cv-type', { cv_type });
  },

  //job
  applyJob: (id: any, formData: any) => {
    return axiosInstance.post('/apply/' + id, formData);
  },
  getJobsApplied: () => {
    return axiosInstance.get('/my/saved');
  },
  savedJob: (id: any) => {
    return axiosInstance.post('/my/jobsaved', {
      job_id: id,
    });
  },
  getSavedJobs: () => {
    return axiosInstance.get('/my/jobsaves');
  },
  deleteJobSaved: (id: any) => {
    return axiosInstance.delete('/my/jobsaved/' + id);
  },
};

export default jobSeekerServices;
