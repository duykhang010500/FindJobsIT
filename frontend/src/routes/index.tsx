import { useRoutes } from 'react-router-dom';
import JobSeekerLayout from '../layouts/JobSeeker';
import PageNotFound from '../pages/404';
import Home from '../pages/Home';
import JobDescription from '../pages/JobDescription';

type Props = {};

const Router = (props: Props) => {
  return useRoutes([
    {
      path: '/',
      element: <JobSeekerLayout />,
      children: [
        { element: <Home />, index: true },
        { element: <JobDescription />, path: '/job/:slug' },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
};

export default Router;
