import { useRoutes } from 'react-router-dom';
import EmployerLayout from '../layouts/Employer';
import JobSeekerLayout from '../layouts/JobSeeker';
import PageNotFound from '../pages/404';
import Login from '../pages/auth/employer/Login';
import Register from '../pages/auth/employer/Register';
import Home from '../pages/Home';
import JobDescription from '../pages/JobDetails';
import Statistics from '../sections/employer-dashboard/Statistics';

type Props = {};

const Router = (props: Props) => {
  return useRoutes([
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
      element: <EmployerLayout />,
      children: [{ path: 'dashboard', element: <Statistics /> }],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
};

export default Router;
