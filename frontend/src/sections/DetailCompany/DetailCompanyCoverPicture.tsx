import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

type Props = {};

const DetailCompanyCoverPicture = (props: Props) => {
  const { company } = useSelector((state: AppState) => state.companies);
  return (
    <div
      style={{
        backgroundImage: `url(${company?.banners})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '400px',
      }}
    ></div>
  );
};

export default DetailCompanyCoverPicture;
