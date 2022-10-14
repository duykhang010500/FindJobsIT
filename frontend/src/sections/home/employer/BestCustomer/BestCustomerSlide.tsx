import React from 'react';
import { Box, styled } from '@mui/material';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from '../../../../components/Image';

import VNG from '../../../../assets/images/VNG.svg';
import Lazada from '../../../../assets/images/Lazafa.svg';
import FPT from '../../../../assets/images/FPT.svg';
import BOSCH from '../../../../assets/images/BOSCH.jpg';
import LG from '../../../../assets/images/LG.svg';
import VNPT from '../../../../assets/images/VNPT.svg';

type Props = {};

const CompanyCard = styled(Box)({
  padding: '10px',
  border: '1px solid #d9d9d9',
});

const companyData = [
  { title: 'VNG', img: VNG },
  { title: 'Lazada', img: Lazada },
  { title: 'FPT', img: FPT },
  { title: 'BOSCH', img: BOSCH },
  { title: 'VNPT', img: VNPT },
  { title: 'LG', img: LG },
];

const BestCustomerSlide = (props: Props) => {
  return (
    <Box sx={{ mt: 3 }}>
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
        spaceBetween={40}
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {companyData.map((item) => (
          <SwiperSlide key={item.title}>
            <CompanyCard>
              <Image src={item.img} alt={item.title} />
            </CompanyCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BestCustomerSlide;
