import { styled, Tooltip } from '@mui/material';

import { useSelector } from 'react-redux';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Image from '../Image';
import { AppState } from '../../store/reducer';
import BusinessIcon from '@mui/icons-material/Business';

type Props = {
  handleChange?: any;
  avt?: any;
  isShowAvatar?: any;
};

const AvatarUploadWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  margin: 'auto',
  padding: '5px',
  width: '144px',
  height: '144px',
  borderRadius: '50%',
  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
  '& > div': {
    width: '100%',
    height: '100%',
  },
});

const UploadButton = styled('label')({
  zIndex: 2,
  top: -5,
  right: 2,
  width: 35,
  height: 35,
  borderRadius: '100%',
  backgroundColor: '#fff',
  position: 'absolute',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.12)',
});

const UploadAvatar = ({ handleChange, avt }: Props) => {
  const { currentUser } = useSelector((state: AppState) => state.auth);

  const company_info = currentUser?.info?.info_company;

  return (
    <AvatarUploadWrapper>
      <input
        id='upload'
        type='file'
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Tooltip title='Upload avatar' placement='top'>
        <UploadButton htmlFor='upload'>
          <ModeEditOutlineIcon sx={{ fontSize: '17px' }} />
        </UploadButton>
      </Tooltip>

      {avt && (
        <Image
          sx={{ borderRadius: '50%' }}
          alt='siuuu'
          src={URL.createObjectURL(avt)}
        />
      )}
      {company_info?.logo && !avt && (
        <Image
          alt='siuuu'
          src={company_info.logo}
          sx={{ borderRadius: '50%' }}
        />
      )}
      {!company_info?.logo && !avt && (
        <BusinessIcon sx={{ color: 'rgb(99, 115, 129)', fontSize: '40px' }} />
      )}
    </AvatarUploadWrapper>
  );
};

export default UploadAvatar;
