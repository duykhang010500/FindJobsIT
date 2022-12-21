import React from 'react';

import { Link } from 'react-router-dom';

import {
  styled,
  Box,
  Typography,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Stack,
} from '@mui/material';

import WorkRoundedIcon from '@mui/icons-material/WorkRounded';

type Props = {
  banner?: string;
  logo?: string;
  name: string;
  industry_name: string;
  id: number;
};

const CompanyCard = (props: Props) => {
  return (
    <Card
      sx={{
        p: 2,
        '&:hover': {
          boxShadow: '4px 4px 16px 0px rgba(245, 34, 45,0.2)',
        },
      }}
    >
      <Link to={`/company/${props.id}`}>
        <CardMedia
          component='img'
          height={140}
          sx={{ borderRadius: 1 }}
          src={props.banner}
          alt='Banner'
        />
      </Link>
      <CardContent>
        <Stack spacing={1}>
          <Avatar
            variant='rounded'
            sx={{
              mt: -6,
              width: 70,
              height: 70,
              border: '1px solid silver',
              p: 1,
              // backgroundColor: '#fff',
            }}
            src={props.logo}
          />
          <Typography
            variant='h4'
            gutterBottom
            component={Link}
            to={`/company/${props.id}`}
            sx={{
              textDecoration: 'none',
              textTransform: 'uppercase',
              color: '#4096ff',
              '&:hover': {
                color: '#faad14',
                textDecoration: 'underline',
              },
            }}
          >
            {props.name}
          </Typography>
          <Typography variant='h4' sx={{ color: '#595959' }}>
            <WorkRoundedIcon
              sx={{ color: '#8c8c8c', mr: 2, verticalAlign: 'bottom' }}
            />
            {props.industry_name}
          </Typography>
        </Stack>
      </CardContent>
      {/* <CardActions>
        <Button variant='outlined' fullWidth>
          Follow
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default CompanyCard;
