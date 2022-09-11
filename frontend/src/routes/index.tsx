import { useRoutes } from 'react-router-dom';
import JobSeekerLayout from '../layouts/JobSeeker';
import PageNotFound from '../pages/404';
import Home from '../pages/Home';

type Props = {};

const Router = (props: Props) => {
  return useRoutes([
    {
      path: '/',
      element: <JobSeekerLayout />,
      children: [{ element: <Home />, index: true }],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
};

export default Router;
