import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  Grid,
  Button,
} from '@mui/material';

import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { useDispatch } from 'react-redux';
import { followCompany, unFollowCompany } from '../../store/companies/action';

type Props = {};

const DetailCompanyHeading = (props: Props) => {
  const dispatch = useDispatch();

  const [followed, setFollowed] = useState<boolean>(false);

  const { id } = useParams();

  const { company, followingCompany } = useSelector(
    (state: AppState) => state.companies
  );

  useEffect(() => {
    if (followingCompany.find((item: any) => item.comp_id === Number(id))) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [followingCompany]);

  return (
    <Box sx={{ marginTop: '-100px' }}>
      <Card sx={{ p: 3 }}>
        <Grid container alignItems='center'>
          <Grid item md={2}>
            <Avatar sx={{ width: 100, height: 100 }} src={company?.logo} />
          </Grid>
          <Grid item md={8}>
            <Typography
              variant='h3'
              textTransform='uppercase'
              gutterBottom
              fontWeight={600}
              sx={{ color: '#001d66' }}
            >
              {company?.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <Typography gutterBottom>
                  <PlaceRoundedIcon
                    sx={{ verticalAlign: 'middle', mr: 2, color: '#ff4d4f' }}
                  />
                  {company?.location_name}
                </Typography>
                <Typography gutterBottom>
                  <PeopleIcon
                    sx={{ verticalAlign: 'middle', mr: 2, color: '#8c8c8c' }}
                  />
                  {company?.company_size}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography gutterBottom>
                  <LanguageRoundedIcon
                    sx={{ verticalAlign: 'middle', mr: 2, color: '#69b1ff' }}
                  />
                  {company?.website}
                </Typography>
              </Grid>
              <Grid item md={4}></Grid>
            </Grid>
          </Grid>
          <Grid item md={2}>
            {followed ? (
              <Button
                variant='contained'
                startIcon={<BookmarkRoundedIcon />}
                onClick={() => dispatch(unFollowCompany(Number(id)))}
              >
                Following
              </Button>
            ) : (
              <Button
                variant='contained'
                startIcon={<BookmarkRoundedIcon />}
                onClick={() => dispatch(followCompany(Number(id)))}
              >
                Follow
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default DetailCompanyHeading;
