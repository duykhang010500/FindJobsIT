import { useRoutes } from 'react-router-dom';

//employer routes
import EmployerDashboardLayout from '../layouts/EmployerDashboardLayout';
import EmployerMainLayout from '../layouts/EmployerMainLayout';
import JobSeekerLayout from '../layouts/JobSeeker';
import Login from '../pages/auth/employer/Login';
import Register from '../pages/auth/employer/Register';
import EmployerHomePage from '../pages/employer/EmployerHomePage';
import Statistics from '../sections/employer-dashboard/Statistics';
import EmployerCreateJob from '../pages/employer/jobs/EmployerCreateJob';

//job seeker routes
import Services from '../pages/Services';
import PageNotFound from '../pages/404';
import Home from '../pages/Home';
import JobDescription from '../pages/JobDetails';

//admin
import AdminLayout from '../layouts/AdminLayout';
import DashboardAdmin from '../pages/admin/dashboard';
import AdminLogin from '../pages/auth/admin/AdminLogin';
import EmployerJobsOpen from '../pages/employer/jobs/EmployerJobsOpen';
import EmployerCandidatesList from '../pages/employer/candidates/EmployerCandidatesList';
import EmployerServices from '../pages/employer/services/EmployerServices';

type Props = {};

const Router = (props: Props) => {
  return useRoutes([
    { element: <AdminLogin />, path: 'admin/login' },
    {
      path: '/',
      element: <JobSeekerLayout />,
      children: [
        { element: <Home />, index: true },
        { element: <JobDescription />, path: 'job/:slug' },

        //employer
        { element: <Login />, path: 'employer/login' },
        { element: <Register />, path: 'employer/register' },
      ],
    },
    {
      path: 'employer',
      element: <EmployerMainLayout />,
      children: [
        { element: <EmployerHomePage />, index: true },
        { path: 'services', element: <Services /> },
      ],
    },
    {
      path: 'employer/hr',
      element: <EmployerDashboardLayout />,
      children: [
        { path: 'dashboard', element: <Statistics /> },
        { path: 'jobs/active', element: <EmployerJobsOpen /> },
        { path: 'job/create', element: <EmployerCreateJob /> },
        { path: 'candidates', element: <EmployerCandidatesList /> },
        { path: 'order/active', element: <EmployerServices /> },
      ],
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        { path: 'dashboard', element: <DashboardAdmin /> },
        { path: 'companies' },
        { path: 'companies/jobs' },
        { path: 'candidates/list' },
        { path: 'services/orders' },
        { path: 'services/list' },
        { path: 'setting/location' },
        { path: 'setting/industries' },
        { path: 'settings/degree' },
        { path: 'settings/level' },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
};

export default Router;
