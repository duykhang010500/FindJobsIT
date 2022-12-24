import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';
import { AppState } from '../store/reducer';
import { employerGetOrderedServices } from '../store/services/actions';

type Props = {
  children: React.ReactNode;
};

const CreateJobGuard = ({ children }: Props) => {
  const dispatch = useDispatch();

  const { activeServices, isLoading } = useSelector(
    (state: AppState) => state.services
  );

  const canPostJob = activeServices.findIndex((item: any) => item.id === 12);

  useEffect(() => {
    dispatch(employerGetOrderedServices());
  }, [dispatch]);

  if (!activeServices) {
    return null;
  }

  if (canPostJob < 0) {
    return <Navigate to='/employer' />;
  } else {
    return <>{children}</>;
  }
};

export default CreateJobGuard;
