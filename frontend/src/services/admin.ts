import { IUserLogin } from '../store/auth/types';
import { ILocation } from '../store/location/types';
import axiosInstance from './axiosInstance';

const adminServices = {
  // auth
  login: (formData: IUserLogin) => {
    return axiosInstance.post('/admin/login', formData);
  },
  getCurrentInfo: () => {
    return axiosInstance.get('/admin/info');
  },
  //companies
  getCompaniesList: () => {
    return axiosInstance.get('/admin/companies');
  },
  //candidates
  getCandidatesList: () => {
    return axiosInstance.get('/admin/members');
  },
  //services
  createService: (formData: any) => {
    return axiosInstance.post('/admin/service/0', formData);
  },
  getServicesList: () => {
    return axiosInstance.get('/admin/services');
  },
  updateService: (id: any, formData: any) => {
    return axiosInstance.post(`/admin/service/${id}`, formData);
  },
  deleteService: (id: string) => {
    return axiosInstance.delete(`/admin/service/${id}`);
  },
  //location
  createLocation: (formData: any) => {
    return axiosInstance.post('/admin/job/location/0', formData);
  },
  getLocationList: () => {
    return axiosInstance.get('/admin/job/locations');
  },
  updateLocation: (formData: ILocation, id: number) => {
    return axiosInstance.post(`/admin/job/location/${id}`, formData);
  },
  deleteLocation: (id: number) => {
    return axiosInstance.delete(`/admin/job/location/${id}`);
  },
  //industries
  createIndustry: (formData: any) => {
    return axiosInstance.post('/admin/job/industry/0', formData);
  },
  getIndustriesList: () => {
    return axiosInstance.get('/admin/job/industries');
  },
  updateIndustry: (id: string) => {
    return axiosInstance.post(`/admin/job/industry/${id}`);
  },
  deleteIndustry: (id: string) => {
    return axiosInstance.delete(`/admin/job/industry/${id}`);
  },
};

export default adminServices;
