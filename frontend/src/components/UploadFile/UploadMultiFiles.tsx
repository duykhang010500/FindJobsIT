import React, { useState } from 'react';

import { styled, Typography, Box, IconButton } from '@mui/material';

import { useDropzone } from 'react-dropzone';
import Image from '../Image';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type Props = {
  onDrop?: any;
};

const DropZoneStyle = styled('div')(({}) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '70px 40px',
  borderRadius: 8,
  backgroundColor: '#fff',

  border: `1px dashed silver`,
  '&:hover': { opacity: 0.9, cursor: 'pointer', color: '#faad14' },
}));

const UploadMultiFiles = (props: Props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: true,
    onDrop: props.onDrop,
  });

  return (
    <div>
      <DropZoneStyle {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography zIndex={1}>Click to add images</Typography>
      </DropZoneStyle>
    </div>
  );
};

export default UploadMultiFiles;
