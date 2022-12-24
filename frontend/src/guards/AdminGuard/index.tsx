import React from 'react';
import { useDispatch } from 'react-redux';

import { Navigate } from 'react-router-dom';
import { logout } from '../../store/auth/action';

type Props = {
  children: React.ReactNode;
};

const AdminGuard = ({ children }: Props) => {
  const dispatch = useDispatch();
  if (localStorage.getItem('role') !== '0') {
    dispatch(logout());
    return <Navigate to='/admin/login' />;
  }

  return <>{children}</>;
};

export default AdminGuard;
