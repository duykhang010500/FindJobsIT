import axiosInstance from './axiosInstance';

const guestServices = {
  getLocations: () => {
    return axiosInstance.get('/locations');
  },
  getIndustries: () => {
    return axiosInstance.get('/industries');
  },
  getJobs: () => {
    return axiosInstance.get('/jobs');
  },
  getJob: (id: any) => {
    return axiosInstance.get('/job/' + id);
  },
  getRelevantJobs: (id: any) => {
    return axiosInstance.get('/job-relevant/' + id);
  },
};

export default guestServices;
