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
  boxSizing: 'unset',
  backgroundColor: 'transparent',
  margin: 0,
  padding: '10px 20px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#fff',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
  },
  borderRadius: '12px',
}));

const CompanyCard: React.FC<Props> = ({ img, title, job, id }) => {
  return (
    <CompanyCardWrapper>
      <CardMedia
        component='img'
        image={`${
          img
            ? img
            : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7cc1hYELgMuLrly1P-C6RJhqcnRAppKIQA&usqp=CAU`
        }`}
        alt='company-logo'
        sx={{
          width: '60px',
          height: '60px',
          margin: 'auto',
          borderRadius: '8px',
        }}
      />
      <CardContent>
        <Link component={RouterLink} to={`/company/${id}`}>
          <Typography variant='body2' fontWeight={700}>
            {title}
          </Typography>
          <Typography variant='caption'>{job}</Typography>
        </Link>
      </CardContent>
    </CompanyCardWrapper>
  );
};

export default CompanyCard;
