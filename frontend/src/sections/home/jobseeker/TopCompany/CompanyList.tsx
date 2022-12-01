import React from 'react';
import { useSelector } from 'react-redux';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, styled, Container } from '@mui/material';

import { companyData } from '../../../../mock/companyData';
import CompanyCard from '../../../../components/CompanyCard';
import { AppState } from '../../../../store/reducer';

type Props = {};

const CompanyListWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '20px',
  paddingBottom: '30px',
}));

const CompanyList: React.FC = (props: Props) => {
  const { list } = useSelector((state: AppState) => state.companies);

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
          {list?.map((company: any) => {
            return (
              <SwiperSlide key={company.title}>
                <CompanyCard
                  title={company.name}
                  img={company.logo}
                  id={company.id}
                  // job={company.job}
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
