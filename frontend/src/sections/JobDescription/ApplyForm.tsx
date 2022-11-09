import { useState } from 'react';

import {
  Card,
  Box,
  styled,
  Stack,
  Button,
  Avatar,
  Dialog,
  Divider,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Collapse,
  Tooltip,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { uploadSingleFile } from '../../utils/upload';
import { useDispatch } from 'react-redux';
import { applyJob } from '../../store/jobs/actions';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

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

const ApplyOption = styled(Card)({
  width: '100%',
  padding: 10,
  marginTop: '10px',
});

const ApplyForm = (props: Props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openUpload, setOpenUpload] = useState<boolean>(false);

  // const [fileError, setFileError] = useState<string>('');
  const [applyType, setApplyType] = useState<any>(null);

  const [fileUpload, setFileUpload] = useState<any>(null);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const { cv } = useSelector((state: AppState) => state.cv);

  const isValidApplyCv = applyType === 0 && fileUpload;

  const handleUploadFile = (e: any) => {
    const fileType = e.target.files[0].type.split('/')[1];
    console.log(fileType);
    if (fileType !== 'pdf') {
      toast.error('Please upload file .pdf!');
      return;
    }
    setFileUpload(e.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log('submit');

    if (applyType == 0) {
      if (!fileUpload) {
        toast.error('Please upload file CV!');
        return;
      }
      setIsLoading(true);

      const res = await uploadSingleFile(fileUpload);

      const formData = {
        resume_file: res,
        resume_online: 0,
      };
      await dispatch(applyJob(props.job.id, formData));
    } else {
      setIsLoading(true);

      const formData = {
        resume_online: 1,
      };
      await dispatch(applyJob(props.job.id, formData));
    }

    setIsLoading(false);
    props.close();
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.close();
        setFileUpload(null);
        setApplyType(null);
        setOpenUpload(false);
      }}
    >
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
          <Avatar sx={{ width: 55, height: 55 }} src={currentUser?.avatar} />
          <Typography variant='h5'>{currentUser?.fullname}</Typography>
          <Typography variant='body2' align='center'>
            <Typography sx={{ fontWeight: 500 }} component='span'>
              Email:
            </Typography>{' '}
            {currentUser?.email}
          </Typography>
        </Stack>

        <FormControl sx={{ width: '100%' }}>
          <RadioGroup
            onChange={(e, value) => {
              console.log(value);
              setApplyType(value);
            }}
          >
            <ApplyOption>
              <Tooltip placement='top' title='Apply with your CV file'>
                <FormControlLabel
                  value='0'
                  control={
                    <Radio
                      checked={openUpload}
                      onChange={() => setOpenUpload(true)}
                    />
                  }
                  label='Upload CV'
                />
              </Tooltip>
              <Collapse in={openUpload}>
                <Upload>
                  <FileUploadIcon sx={{ fontSize: '40px', color: '#C0C0C0' }} />
                  {fileUpload ? (
                    <Typography>{fileUpload.name}</Typography>
                  ) : (
                    <>
                      <Typography>
                        <Typography
                          color='primary'
                          component='span'
                          fontWeight={500}
                        >
                          Chose file
                        </Typography>{' '}
                        or drag it here
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'rgb(99, 115, 129)' }}
                      >
                        Allowed .pdf
                      </Typography>
                    </>
                  )}
                  <LabelStyle htmlFor='upload'></LabelStyle>
                  <input
                    type='file'
                    id='upload'
                    accept='application/pdf'
                    style={{ display: 'none' }}
                    onChange={handleUploadFile}
                  />
                </Upload>
              </Collapse>
            </ApplyOption>
            <Tooltip
              placement='top'
              title={
                cv
                  ? 'Apply job with your online profile'
                  : 'Please update your profile to use this option!'
              }
            >
              <ApplyOption>
                <FormControlLabel
                  value='1'
                  control={
                    <Radio
                      disabled={!cv}
                      onChange={() => setOpenUpload(false)}
                    />
                  }
                  label='Online Profile'
                />
              </ApplyOption>
            </Tooltip>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={() => {
            props.close();
            setApplyType(null);
            setFileUpload(null);
            setOpenUpload(false);
          }}
        >
          Back
        </Button>
        <LoadingButton
          variant='contained'
          // disabled={!Boolean(fileUpload)}
          disabled={!applyType}
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
