import axiosInstance from './axiosInstance';

const guestServices = {
  getLocations: () => {
    return axiosInstance.get('/locations');
  },
  getIndustries: () => {
    return axiosInstance.get('/industries');
  },
};

export default guestServices;
