import React, { useState } from 'react';

import { styled, Typography, Box, IconButton } from '@mui/material';

import { useDropzone } from 'react-dropzone';
import Image from '../Image';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type Props = {
  onDrop?: any;
  file?: any;
  remove?: any;
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

const UploadSingleFile = (props: Props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: props.onDrop,
    // onDrop: (acceptedFiles) => {
    //   setFile(
    //     acceptedFiles.map((file) =>
    //       Object.assign(file, {
    //         preview: URL.createObjectURL(file),
    //       })
    //     )
    //   );
    // },
  });

  const thumbs = props.file.map((file: any) => (
    <Box
      sx={{
        borderRadius: 1,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
        zIndex: 2,
      }}
    >
      <Image alt='banner' src={file.preview} />
    </Box>
  ));

  return (
    <div>
      <DropZoneStyle {...getRootProps()}>
        <input {...getInputProps()} />

        {!props.file.length && (
          <Typography zIndex={1}>Click to add banner</Typography>
        )}
        {thumbs}
      </DropZoneStyle>
      {props.file.length > 0 && (
        <IconButton sx={{ my: 1 }} onClick={props.remove}>
          <DeleteRoundedIcon sx={{ color: '#ff4d4f' }} />
        </IconButton>
      )}
    </div>
  );
};

export default UploadSingleFile;
