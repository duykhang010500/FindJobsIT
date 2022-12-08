import React from 'react';

import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppState } from '../../store/reducer';
import Image from '../../components/Image';

type Props = {};

const DetailCompanyImages = (props: Props) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant='h3'
        gutterBottom
        fontWeight={600}
        textAlign='center'
        textTransform='uppercase'
        sx={{ color: '#001d66' }}
      >
        Company Images
      </Typography>
      <CompanyImagesList />
    </Box>
  );
};

const CompanyImagesList = () => {
  const { company } = useSelector((state: AppState) => state.companies);
  return (
    <Box sx={{ mt: 4 }}>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={40}
        modules={[Autoplay]}
        // loop={true}
        autoplay={{ delay: 3000 }}
      >
        {company?.images?.split(',').map((img: any) => (
          <SwiperSlide>
            <Image
              src={img}
              alt={'logo-company'}
              sx={{ border: '1px solid #f2f4f5', padding: 1 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default DetailCompanyImages;
