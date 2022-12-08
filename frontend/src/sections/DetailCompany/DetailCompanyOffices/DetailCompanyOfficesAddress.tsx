import React from 'react';

import { Typography, Box, Card, Stack } from '@mui/material';

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
      <Card sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, mt: 3 }}>
        {company?.offices?.map((office: any, idx: number) => (
          <div key={idx}>
            <Typography gutterBottom>
              <Stack direction='row' alignItems='center'>
                <Typography style={{ minWidth: '400px' }}>
                  <PlaceRoundedIcon
                    sx={{ color: '#ff4d4f', verticalAlign: 'middle', mr: 2 }}
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
          </div>
        ))}
      </Card>
    </Box>
  );
};

export default DetailCompanyOfficesAddress;
