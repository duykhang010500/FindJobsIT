import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
  Link,
} from '@mui/material';

type Props = {
  img?: string;
  title?: string;
  job?: number;
  id: number;
};

const CompanyCardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: 'transparent',
  margin: '20px 10px',
  padding: '10px',
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#fff',
    boxShadow: '4px 4px 16px 0 rgba(245, 34, 45,0.2)',
    color: 'red !important',
    transform: 'scale(1.01)',
  },
  borderRadius: '12px',
}));

const CompanyCard: React.FC<Props> = ({ img, title, job, id }) => {
  return (
    <CompanyCardWrapper>
      <CardMedia
        component='img'
        alt='company-logo'
        image={`${
          img
            ? img
            : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7cc1hYELgMuLrly1P-C6RJhqcnRAppKIQA&usqp=CAU`
        }`}
        sx={{
          margin: 'auto',
          width: '100px',
          height: '100px',
          objectFit: 'fill',
        }}
      />
      <CardContent>
        <Link
          component={RouterLink}
          to={`/company/${id}`}
          sx={{
            '&:hover': {
              color: '#faad14',
            },
          }}
        >
          <Typography
            variant='h4'
            fontWeight={700}
            align='center'
            color='inherit'
          >
            {title}
          </Typography>
          {/* <Typography variant='caption'>{job}</Typography> */}
        </Link>
      </CardContent>
    </CompanyCardWrapper>
  );
};

export default CompanyCard;
