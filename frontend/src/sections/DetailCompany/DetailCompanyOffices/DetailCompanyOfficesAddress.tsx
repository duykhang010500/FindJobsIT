import React from 'react';

import { Typography, Box, Card, Stack, Grid } from '@mui/material';

import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

type Props = {};

const DetailCompanyOfficesAddress = (props: Props) => {
  const { company } = useSelector((state: AppState) => state.companies);
  return (
    <Box>
      <Typography
        variant='h3'
        gutterBottom
        fontWeight={600}
        textAlign='center'
        textTransform='uppercase'
        sx={{ color: '#001d66' }}
      >
        Office locations
      </Typography>
      <Card
        sx={{
          display: 'flex',
          // alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#fff',
          p: 3,
          mt: 3,
          borderRadius: 2,
        }}
      >
        {company?.offices?.map((office: any, idx: number) => (
          <Box key={idx}>
            <Typography gutterBottom>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
              >
                <Typography>
                  <PlaceRoundedIcon
                    sx={{
                      color: '#ff4d4f',
                      verticalAlign: 'middle',
                      mr: 2,
                    }}
                  />
                  {office?.name} : {office?.address}
                </Typography>
                <Typography>
                  <LocalPhoneRoundedIcon
                    sx={{
                      color: '#595959',
                      verticalAlign: 'middle',
                      ml: 5,
                      mr: 2,
                    }}
                  />
                  {office?.phone}
                </Typography>
              </Stack>
            </Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default DetailCompanyOfficesAddress;
