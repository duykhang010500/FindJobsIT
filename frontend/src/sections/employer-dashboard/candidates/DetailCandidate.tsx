import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Stack, Avatar, Typography, Box, Button } from '@mui/material';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { getDetailCandidate } from '../../../store/candidates/action';
import { AppState } from '../../../store/reducer';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

type Props = {};

const DetailCandidate = (props: Props) => {
  let { id } = useParams();

  const [tab, setTab] = useState('1');

  const dispatch = useDispatch();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    dispatch(getDetailCandidate(Number(id)));
  }, [id, dispatch]);

  const { isLoading, candidate } = useSelector(
    (state: AppState) => state.candidates
  );

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack direction='row' spacing={4} alignItems={'center'}>
          <Avatar sx={{ width: 120, height: 120 }} />

          <Stack>
            <Typography variant='h3' color='primary' gutterBottom>
              {candidate?.fullname}
            </Typography>
            <Typography variant='h5' gutterBottom>
              {candidate?.resume?.resume_title}
            </Typography>
            <Typography variant='h5' gutterBottom>
              Experience: {candidate?.resume?.yearofexperience} year
            </Typography>
            <Typography variant='h5'>
              Current company: {candidate?.resume?.current_company || 'none'}
            </Typography>
          </Stack>
          <Button variant='contained' sx={{ height: '40px', float: 'right' }}>
            Save
          </Button>
        </Stack>
      </Box>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
          <TabList
            onChange={(e, value: string) => setTab(value)}
            aria-label='lab API tabs example'
          >
            <Tab label='General' value='1' />
            <Tab label='Experience' value='2' />
            <Tab label='Education' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <Viewer
            fileUrl={candidate?.resume?.resume_file}
            plugins={[defaultLayoutPluginInstance]}
          />
        </TabPanel>
        <TabPanel value='2'>Experience</TabPanel>
        <TabPanel value='3'>Education</TabPanel>
      </TabContext>
    </>
  );
};

export default DetailCandidate;
