import React from 'react';
import { styled } from '@mui/material';

type Props = {
  sx?: React.CSSProperties;
};
const StatusStyled = styled('div')({
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  backgroundColor: '#52c41a',
});
const StatusBadge = ({ sx }: Props) => {
  return <StatusStyled sx={sx} />;
};

export default StatusBadge;
