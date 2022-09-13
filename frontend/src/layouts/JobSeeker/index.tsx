import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
// import Footer from './Footer';
import Header from './Header/Header';

type Props = {};

const JobSeekerLayout = (props: Props) => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </Fragment>
  );
};

export default JobSeekerLayout;
