import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, styled } from '@mui/material';

import { companyData } from '../../../mock/companyData';
import CompanyCard from './CompanyCard';

type Props = {};

const CompanyListWrapper = styled(Box)({
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
        autoplay={{ delay: 3000, disableOnInteraction: true }}
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
