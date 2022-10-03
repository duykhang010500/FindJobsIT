import React from 'react';

import { Stack, Typography } from '@mui/material';
import Image from '../../../components/Image';

import Candidate from '../../../assets/images/Candidate.png';
import FindCandidate from '../../../assets/images/FindCandidate.png';
import JobImg from '../../../assets/images/JobImg.png';
import Promotion from '../../../assets/images/Promotion.png';
import Setting from '../../../assets/images/Setting.png';

type Props = {};

const Banner = (props: Props) => {
  return (
    <Stack spacing={6}>
      <Stack direction='row' spacing={2}>
        <Image
          src={JobImg}
          alt='find-job-seeker-img'
          sx={{ width: 64, height: 64 }}
        />
        <Stack justifyContent='space-around'>
          <Typography variant='h4'>Post Job</Typography>
          <Typography variant='body2'>
            Solutions connection, recruit and choose candidate
          </Typography>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2}>
        <Image
          src={FindCandidate}
          alt='find-job-seeker-img'
          sx={{ width: 64, height: 64 }}
        />
        <Stack justifyContent='space-around'>
          <Typography variant='h4'>Easily to find candidate</Typography>
          <Typography variant='body2'>
            Easily to find candidate and filter CV
          </Typography>
        </Stack>
      </Stack>

      <Stack direction='row' spacing={2}>
        <Image
          src={Candidate}
          alt='find-job-seeker-img'
          sx={{ width: 64, height: 64 }}
        />
        <Stack justifyContent='space-around'>
          <Typography variant='h4'>Easily to find candidate</Typography>
          <Typography variant='body2'>
            Easily to find candidate and filter CV
          </Typography>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2}>
        <Image
          src={Promotion}
          alt='find-job-seeker-img'
          sx={{ width: 64, height: 64 }}
        />
        <Stack justifyContent='space-around'>
          <Typography variant='h4'>Manage your brand</Typography>
          <Typography variant='body2'>
            Build and promotion your brand to world
          </Typography>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2}>
        <Image
          src={Setting}
          alt='find-job-seeker-img'
          sx={{ width: 64, height: 64 }}
        />
        <Stack justifyContent='space-around'>
          <Typography variant='h4'>Configuration</Typography>
          <Typography variant='body2'>Make your style</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Banner;
