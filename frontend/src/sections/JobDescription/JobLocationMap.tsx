import React, { useState } from 'react';
import { Card, styled, Typography, Stack } from '@mui/material';
import Map from 'react-map-gl';

import JobSharing from './JobSharing';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { useParams } from 'react-router-dom';
import JobCard from '../../components/JobCard';
type Props = {};

const CardStyle = styled(Card)({
  position: 'sticky',
  top: '86px',
  padding: '1.4rem',
});

const JobLocationMap = (props: Props) => {
  // eslint-disable-next-line
  // const [viewPort, setViewPort] = useState({
  //   latitude: 21.0244246,
  //   longitude: 105.7938072,
  //   zoom: 14,
  // });
  const { id } = useParams();
  const { jobs } = useSelector((state: AppState) => state.jobs);

  const newJobsExcludeID = jobs?.items?.filter(
    (item: any) => item.id !== Number(id)
  );

  console.log(newJobsExcludeID);

  return (
    <CardStyle>
      <Typography gutterBottom variant='h3' align='center'>
        New Jobs
      </Typography>
      <Stack spacing={2}>
        {newJobsExcludeID?.slice(0, 5)?.map((item: any) => {
          return <JobCard job={item} />;
        })}
      </Stack>

      {/* <Map
        mapboxAccessToken='pk.eyJ1Ijoic2R2YWJvMDAwMSIsImEiOiJjbDhmczBrcW0waDV1M3VxeHM1MzFsNmpzIn0.np1GMb79Wjfq5iCdvaMfNw'
        {...viewPort}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        style={{ width: '100%', height: '100%', marginTop: '30px' }}
        attributionControl={false}
      /> */}

      <JobSharing />
    </CardStyle>
  );
};

export default React.memo(JobLocationMap);
