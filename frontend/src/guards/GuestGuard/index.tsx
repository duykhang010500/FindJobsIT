import React from 'react';

import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: Props) => {
  // if (localStorage.getItem('role') === '2') {
  //   return <Navigate to='/employer' />;
  // }
  // if (localStorage.getItem('role') === '1') {
  //   return <Navigate to='/' />;
  // }
  // if (localStorage.getItem('role') === '0') {
  //   return <Navigate to='/admin/dashboard' />;
  // }

  return <>{children}</>;
};

export default GuestGuard;
