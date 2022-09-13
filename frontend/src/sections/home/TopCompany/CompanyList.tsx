import React from 'react';

import { companyData } from '../../../mock/companyData';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, styled } from '@mui/material';

import CompanyCard from './CompanyCard';

type Props = {};

const CompanyListWrapper = styled(Box)({
  padding: 20,
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  '.swiper-slide': {
    width: '15%',
  },
});

const CompanyList: React.FC = (props: Props) => {
  return (
    <CompanyListWrapper>
      <Swiper
        spaceBetween={20}
        modules={[Autoplay]}
        slidesPerView='auto'
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {companyData.map((company) => {
          return (
            <SwiperSlide key={company.title}>
              <CompanyCard
                title={company.title}
                img={company.img}
                job={company.job}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </CompanyListWrapper>
  );
};

export default CompanyList;
