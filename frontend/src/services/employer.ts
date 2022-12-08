import { IUserLogin } from '../store/auth/types';
import { Folder } from '../store/folders/types';
import { Office } from '../store/offices/types';
import axiosInstance from './axiosInstance';

const employerServices = {
  //auth
  register: (formData: any) => {
    return axiosInstance.post('/employer/register', formData);
  },
  login: (formData: IUserLogin) => {
    return axiosInstance.post('/employer/login', formData);
  },
  forgotPassword: (formData: any) => {
    return axiosInstance.post('/employer/reset-password', formData);
  },
  resetPassword: (token: any, formData: any) => {
    return axiosInstance.put(
      `/employer/reset-password?token=${token}`,
      formData
    );
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
  updateJobStatus: (jobID: number, status: number) => {
    return axiosInstance.patch(`/employer/hr/job/${jobID}/update-status`, {
      status,
    });
  },

  //candidates
  getCandidates: () => {
    return axiosInstance.get('/employer/hr/candidates');
  },
  getDetailCandidate: (id: number) => {
    return axiosInstance.get('/employer/hr/candidate/' + id);
  },
  getDetailResumeCandidate: (id: number) => {
    return axiosInstance.get('/employer/resume/' + id);
  },
  updateStatus: (id: any, formData: any) => {
    return axiosInstance.post('/employer/hr/candidate/status/' + id, formData);
  },
  sendMail: (formData: any) => {
    return axiosInstance.post('/employer/hr/send-mail', formData);
  },
  getSentMailList: () => {
    return axiosInstance.get('/employer/hr/mail-candidates');
  },
  getCandidatesByJob: (jobID: number) => {
    return axiosInstance.get(`/employer/hr/job/candidates/${jobID}`);
  },
  savedCandidates: (resumeID: number, folderID: number) => {
    return axiosInstance.post('/employer/hr/resume/saved', {
      resume_id: resumeID,
      employer_folder_id: folderID,
    });
  },
  getAllSavedCandidates: () => {
    return axiosInstance.get('/employer/hr/resume/saved');
  },
  getCandidatesByFolder: (folder_id: number) => {
    return axiosInstance.get('/employer/hr/folder/' + folder_id);
  },
  deleteSavedCandidate: (id: number) => {
    return axiosInstance.delete(`/employer/hr/resume/saved/${id}`);
  },

  //services
  getListServices: () => {
    return axiosInstance.get('/employer/services');
  },
  orderServices: (formData: any) => {
    return axiosInstance.post('/employer/confirm-order', formData);
  },
  getOrderedServices: () => {
    return axiosInstance.get('/employer/hr/orders/active');
  },
  getDetailOrderedService: (id: any) => {
    return axiosInstance.get('/employer/hr/orders/active/' + id);
  },

  //dashboard
  getDashboard: () => {
    return axiosInstance.get('/employer/hr/dashboard');
  },

  //offices
  createOffice: (formData: Office) => {
    return axiosInstance.post('/employer/hr/office/0', formData);
  },
  getOffices: () => {
    return axiosInstance.get('/employer/hr/offices');
  },
  getOffice: (id: number) => axiosInstance.get(`/employer/hr/office/${id}`),
  updateOffice: (id: number, formData: Office) =>
    axiosInstance.patch(`/employer/hr/office/${id}`, formData),
  deleteOffice: (id: number) =>
    axiosInstance.delete(`/employer/hr/office/${id}`),

  //folders
  createFolder: (folder: Folder) =>
    axiosInstance.post('/employer/hr/folder/0', folder),
  getFolders: () => axiosInstance.get('/employer/hr/folders'),
  getFolder: (id: Partial<Folder>) =>
    axiosInstance.get(`/employer/hr/folder/${id}`),
  updateFolder: (id: Partial<Folder>, folder: Partial<Folder>) =>
    axiosInstance.patch(`/employer/hr/folder/${id}`, folder),
  deleteFolder: (id: Partial<Folder>) =>
    axiosInstance.delete(`/employer/hr/folder/${id}`),
};

export default employerServices;
