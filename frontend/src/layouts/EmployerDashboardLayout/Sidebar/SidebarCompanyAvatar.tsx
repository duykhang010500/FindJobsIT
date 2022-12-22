import { useSelector } from 'react-redux';

import { styled, Stack, Typography, Box } from '@mui/material';

import Image from '../../../components/Image';

import { AppState } from '../../../store/reducer';

import BusinessIcon from '@mui/icons-material/Business';

type Props = {};

const LogoCompanyWrapper = styled(Box)({
  margin: 'auto !important',
  width: 120,
  height: 120,
  padding: 1,
  borderRadius: '50%',
  border: '2px dashed #f2f4f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& > svg': {
    width: '50%',
    height: '50%',
  },
});

const SidebarCompanyAvatar = (props: Props) => {
  const { currentUser } = useSelector((state: AppState) => state.auth);

  return (
    <Stack spacing={2}>
      <Typography variant='h2' align='center' gutterBottom>
        {currentUser?.info?.info_company?.name}
      </Typography>
      <LogoCompanyWrapper>
        {currentUser?.info?.info_company?.logo ? (
          <Image
            src={`${currentUser?.info?.info_company?.logo}`}
            alt={`logo`}
            sx={{ borderRadius: '50%' }}
          />
        ) : (
          <BusinessIcon sx={{ color: 'rgb(99, 115, 129)' }} />
        )}
      </LogoCompanyWrapper>

      {/* <Box
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h5'>Following</Typography>
        <Typography variant='h5'>
          {currentUser?.info?.info_company?.followed || 0}
        </Typography>
      </Box> */}
    </Stack>
  );
};

export default SidebarCompanyAvatar;
