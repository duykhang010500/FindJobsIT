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
  getOtherJobs: (id: number) => {
    return axiosInstance.get(`/job-relevant/${id}`);
  },
  getRelevantJobs: (id: any) => {
    return axiosInstance.get('/job-relevant/' + id);
  },
  searchJob: (keywords: any, locations: any, industries: any) => {
    return axiosInstance.get('/jobs', {
      params: {
        keywords,
        locations,
        industries,
      },
    });
  },
  searchCandidates: (params: any) => {
    return axiosInstance.get('/employer/search-resume', {
      params: {
        ...params,
      },
    });
  },

  getAllCompany: () => {
    return axiosInstance.get('/companies');
  },
  getCompany: (id: number) => {
    return axiosInstance.get(`company/${id}`);
  },
};

export default guestServices;
