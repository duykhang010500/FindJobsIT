import React from 'react';
import { useDispatch } from 'react-redux';

import { Navigate } from 'react-router-dom';
import { logout } from '../../store/auth/action';

type Props = {
  children: React.ReactNode;
};

const EmployerGuard = ({ children }: Props) => {
  const dispatch = useDispatch();
  if (localStorage.getItem('role') !== '1') {
    dispatch(logout());
    return <Navigate to='/employer/login' />;
  }

  return <>{children}</>;
};

export default EmployerGuard;
