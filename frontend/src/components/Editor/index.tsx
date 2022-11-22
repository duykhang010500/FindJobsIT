import React from 'react';
import ReactQuill from 'react-quill';
import { Box, styled, FormHelperText } from '@mui/material';

type Props = {
  id?: string;
  error?: any;
  value?: string;
  onChange?: () => void;
  helperText?: React.ReactNode;
  isReadOnly?: boolean;
};

const EditorWrapper = styled(Box)({
  '& .ql-container': {
    overflow: 'auto',
    minHeight: 200,
    maxHeight: 250,
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
          readOnly={props?.isReadOnly || false}
          theme='snow'
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          placeholder='Write something ...'
        />
      </EditorWrapper>
      <FormHelperText error={props.error}>
        {props.helperText && props.helperText}
      </FormHelperText>
    </>
  );
};

export default Editor;
