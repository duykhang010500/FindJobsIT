import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, styled, Container } from '@mui/material';

import { companyData } from '../../../mock/companyData';
import CompanyCard from '../../../components/CompanyCard';

type Props = {};

const CompanyListWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '20px',
  paddingBottom: '30px',
}));

const CompanyList: React.FC = (props: Props) => {
  return (
    <Container>
      <CompanyListWrapper>
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 4,
            },
            900: {
              slidesPerView: 6,
            },
          }}
          spaceBetween={20}
          modules={[Autoplay]}
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
    </Container>
  );
};

export default CompanyList;
