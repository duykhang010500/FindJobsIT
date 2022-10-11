import React from 'react';
import { Box, styled } from '@mui/material';
import ReactQuill from 'react-quill';

type Props = {
  id?: string;
  error?: any;
  value?: string;
  onChange: () => void;
  helperText?: React.ReactNode;
};

const EditorWrapper = styled(Box)({
  '& .ql-container': {
    minHeight: 200,
    maxHeight: 250,

    overflow: 'auto',
  },
  '& .ql-picker-options': {
    borderRadius: 8,
  },
});

const Editor = (props: Props) => {
  return (
    <>
      <EditorWrapper
        sx={{
          ...(props.error && {
            border: '1px solid red',
          }),
        }}
      >
        <ReactQuill
          theme='snow'
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          placeholder='Write something ...'
        />
      </EditorWrapper>
      {props.helperText && props.helperText}
    </>
  );
};

export default Editor;
