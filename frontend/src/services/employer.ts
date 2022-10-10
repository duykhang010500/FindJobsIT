import axiosInstance from './axiosInstance';

const employerServices = {
  register: (formData: any) => {
    return axiosInstance.post('/employer/register', formData);
  },
};

export default employerServices;
