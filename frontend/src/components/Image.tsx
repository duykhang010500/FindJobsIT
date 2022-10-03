import React from 'react';
import { styled } from '@mui/material';

type Props = {
  src: string;
  alt: string;
  sx?: React.CSSProperties;
};

const ImageStyle = styled('img')({
  width: '100%',
  height: '100%',
  display: 'block',
});

const Image = ({ src, alt, sx }: Props) => {
  return <ImageStyle src={src} alt={alt} sx={sx} />;
};

export default Image;
