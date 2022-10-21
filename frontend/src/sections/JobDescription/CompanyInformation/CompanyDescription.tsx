import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

type Props = {};

const CompanyDescription = (props: Props) => {
  const { job } = useSelector((state: AppState) => state.jobs);
  return <Typography variant='body2'>{job?.company?.content}</Typography>;
};

export default CompanyDescription;
