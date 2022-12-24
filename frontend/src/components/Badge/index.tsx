import { ReactNode } from 'react';

import { styled } from '@mui/material';

type Props = {
  children: ReactNode;
  status: number;
};

const BadgeStatusStyled = styled('span')({
  backgroundColor: '#fff',
  padding: '3px 10px',
  borderRadius: '16px',
  fontSize: '12px',
  fontWeight: 600,
  border: '1px solid transparent',
});

const BadgeStatus = ({ children, status }: Props) => {
  return (
    <BadgeStatusStyled
      sx={{
        ...(status === 0 && {
          color: '#36cfc9',
          borderColor: '#36cfc9',
        }),
        ...(status === 1 && {
          color: '#52c41a',
          borderColor: '#52c41a',
        }),
        ...(status === 2 && {
          color: '#722ed1',
          borderColor: '#722ed1',
        }),
        ...(status === 3 && {
          color: '#ff4d4f',
          borderColor: '#ff4d4f',
        }),
        ...(status === 4 && {
          color: '#595959',
          borderColor: '#595959',
        }),
        ...(status === 5 && {
          color: '#fa8c16',
          borderColor: '#fa8c16',
        }),
      }}
    >
      {children}
    </BadgeStatusStyled>
  );
};

export default BadgeStatus;
