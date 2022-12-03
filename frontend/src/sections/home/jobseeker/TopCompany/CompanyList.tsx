import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, styled, Link, Stack, Typography, Button } from '@mui/material';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { companyData } from '../../../../mock/companyData';
import CompanyCard from '../../../../components/CompanyCard';
import { AppState } from '../../../../store/reducer';

type Props = {};

const CompanyListWrapper = styled(Box)(({ theme }) => ({
  padding: '20px',
}));

const CompanyList: React.FC = (props: Props) => {
  const { list } = useSelector((state: AppState) => state.companies);

  return (
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
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        {list?.map((company: any) => {
          return (
            <SwiperSlide key={company.title}>
              <CompanyCard
                title={company.name}
                img={company.logo}
                id={company.title}
                // job={company.job}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Stack direction='row' justifyContent='center' sx={{ mt: 4 }}>
        <RouterLink to='/companies' style={{ textDecoration: 'none' }}>
          <Button color='info' endIcon={<KeyboardArrowRightIcon />}>
            View more
          </Button>
        </RouterLink>
      </Stack>
    </CompanyListWrapper>
  );
};

export default CompanyList;
