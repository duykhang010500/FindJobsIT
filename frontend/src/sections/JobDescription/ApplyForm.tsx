import { useState } from 'react';

import {
  styled,
  Stack,
  Alert,
  Button,
  Avatar,
  Dialog,
  Divider,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { uploadSingleFile } from '../../utils/upload';
import { useDispatch } from 'react-redux';
import { applyJob } from '../../store/jobs/actions';
import { LoadingButton } from '@mui/lab';

type Props = {
  open: boolean;
  close: () => void;
  job: any;
};

const Upload = styled('div')({
  width: '100%',
  padding: '20px',
  height: '100px',
  display: 'flex',
  marginTop: '20px',
  borderRadius: '10px',
  alignItems: 'center',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '2px dashed silver',
  '&:hover': {
    borderColor: '#ff4d4f',
  },
});

const LabelStyle = styled('label')({
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  position: 'absolute',
});

const ApplyForm = (props: Props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDisable, setIsDisable] = useState<boolean>(true);

  const [fileError, setFileError] = useState<string>('');

  const [fileUpload, setFileUpload] = useState<any>(null);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const handleUploadFile = (e: any) => {
    console.log(e.target.files[0]);

    setFileUpload(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await uploadSingleFile(fileUpload);
    console.log('Res: ', res);
    const formData = {
      resume_file: res,
    };
    await dispatch(applyJob(props.job.id, formData));
    setIsLoading(false);
    props.close();
  };

  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle>
        <Typography>
          <Typography variant='body1' component='span' fontSize={20}>
            You are apply for position &nbsp;
          </Typography>
          <Typography
            fontSize={20}
            color='primary'
            variant='body1'
            component='span'
            fontWeight={600}
          >
            {props?.job?.title}
          </Typography>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Divider sx={{ mb: 3 }} />
        <Stack alignItems='center' spacing={2}>
          <Avatar sx={{ width: 55, height: 55 }} />
          <Typography variant='h5'>{currentUser?.fullname}</Typography>
          <Typography variant='body2' align='center'>
            <Typography sx={{ fontWeight: 500 }} component='span'>
              Email:
            </Typography>{' '}
            {currentUser?.email}
          </Typography>
        </Stack>

        <Upload>
          <FileUploadIcon sx={{ fontSize: '40px', color: '#C0C0C0' }} />
          {fileUpload ? (
            <Typography>{fileUpload.name}</Typography>
          ) : (
            <>
              <Typography>
                <Typography color='primary' component='span' fontWeight={500}>
                  Chose file
                </Typography>{' '}
                or drag it here
              </Typography>
              <Typography variant='caption' sx={{ color: 'rgb(99, 115, 129)' }}>
                Allowed .docx, .pdf
              </Typography>
            </>
          )}
          <LabelStyle htmlFor='upload'></LabelStyle>
          <input
            type='file'
            id='upload'
            style={{ display: 'none' }}
            onChange={handleUploadFile}
          />
        </Upload>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={props.close}>
          Back
        </Button>
        <LoadingButton
          variant='contained'
          disabled={!Boolean(fileUpload)}
          onClick={handleSubmit}
          loading={isLoading}
        >
          Apply
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyForm;
