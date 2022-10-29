import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { useParams } from 'react-router-dom';
import { getDetailCandidate } from '../../../store/candidates/action';
import { AppState } from '../../../store/reducer';

type Props = {};

const DetailCandidate = (props: Props) => {
  let { id } = useParams();

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
    <div>
      <Viewer
        fileUrl={candidate?.resume?.resume_file}
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  );
};

export default DetailCandidate;
