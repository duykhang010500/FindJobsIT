import { IUserLogin } from '../store/auth/types';
import axiosInstance from './axiosInstance';

const adminServices = {
  login: (formData: IUserLogin) => {
    return axiosInstance.post('/admin/login', formData);
  },
};

export default adminServices;
