import React from 'react';

import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';

type Props = {
  img?: string;
  title?: string;
  job?: number;
};

const CompanyCardWrapper = styled(Card)({
  boxSizing: 'border-box',
  margin: 2,
  padding: 2,
  border: '2px solid transparent',
  cursor: 'pointer',
  '&:hover': {
    border: '2px solid #FF4842',
  },
});

const CompanyCard: React.FC<Props> = ({ img, title, job }) => {
  return (
    <Link to={`/`} style={{ textDecoration: 'none' }}>
      <CompanyCardWrapper>
        <CardMedia component='img' image={`${img}`} alt='company-logo' />
        <CardContent>
          <Typography variant='body2' fontWeight={700} noWrap>
            {title}
          </Typography>
          <Typography variant='caption'>{job} job</Typography>
        </CardContent>
      </CompanyCardWrapper>
    </Link>
  );
};

export default CompanyCard;
