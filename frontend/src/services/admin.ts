import { IUserLogin } from '../store/auth/types';
import { IIndustry } from '../store/industries/types';
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
    return axiosInstance.patch(`/admin/service/${id}`, formData);
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
  updateIndustry: (id: number, formData: IIndustry) => {
    return axiosInstance.post(`/admin/job/industry/${id}`, formData);
  },
  deleteIndustry: (id: number) => {
    return axiosInstance.delete(`/admin/job/industry/${id}`);
  },
  //order
  getOrderedServices: () => {
    return axiosInstance.get('/admin/orders');
  },
  changeStatusOrder: (orderId: number, status: number) => {
    return axiosInstance.post(`/admin/order/${orderId}?status=${status}`);
  },

  //dashboard
  getDashboard: () => {
    return axiosInstance.get('/admin/dashboard');
  },
};

export default adminServices;
