import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { CSVLink } from 'react-csv';

import {
  Link,
  Table,
  Stack,
  Avatar,
  Button,
  Tooltip,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  Typography,
  Breadcrumbs,
  TableContainer,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  employerGetCandidateByJob,
  employerSendMail,
  openMail,
  openStatusDialog,
  selectCandidate,
  updateStatus,
} from '../../../store/candidates/action';

import { AppState } from '../../../store/reducer';

import Editor from '../../../components/Editor';
import FilterBar from '../../../sections/employer-dashboard/candidates/candidates-by-job/FilterBar';
import Nodata from '../../../components/Nodata';
import MailDialog from '../../../sections/employer-dashboard/candidates/MailDialog';
import StatusDialog from '../../../sections/employer-dashboard/candidates/StatusDialog';
import BadgeStatus from '../../../components/Badge';
import { convertAppliedJobStatusToNum } from '../../../utils/convert';
import TableRowSkeleton from '../../../components/Skeleton/TableRowSkeleton';

type Props = {};

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const EmployerCandidatesByJob = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);

  const [searchStr, setSearchStr] = useState<string>('');

  const [dateStart, setDateStart] = useState<Dayjs | null>(null);

  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);

  const [status, setStatus] = useState<string>('All');

  const [showFilterBar, setShowFilterBar] = useState<boolean>(true);

  const [openDialogMail, setOpenDialogMail] = useState<boolean>(false);

  const [selectedCandidate, setSelectedCandidate] = useState<null | any>(null);

  const { activeServices } = useSelector((state: AppState) => state.services);

  const { isLoading, candidates } = useSelector(
    (state: AppState) => state.candidates
  );

  const { isSendMail } = useSelector((state: AppState) => state.candidates);

  const canSendMail = activeServices.findIndex((item: any) => item.id === 14);

  useEffect(() => {
    dispatch(employerGetCandidateByJob(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {}, []);

  const validate = yup.object({
    title: yup
      .string()
      .max(40, 'Title allow maximum 40 character')
      .required('Title is required'),
    content: yup
      .string()
      .max(500, 'Content allow maximum 200 character')
      .required('Content is required'),
  });

  const defaultValues = {
    title: '',
    content: '',
  };

  const onSubmit = (values: any) => {
    let apply_id = selectedCandidate?.id;
    const formData = {
      ...values,
      apply_id,
      email: selectedCandidate?.member?.email,
    };
    console.log(formData);
    dispatch(employerSendMail(formData));
  };

  useEffect(() => {
    setData(formatData(candidates));
  }, [candidates]);

  const formatData = (arr: any) => {
    let newArr: any = [];
    arr?.forEach((item: any, index: number) => {
      newArr.push({
        STT: `${index + 1}`,
        Date_Apply: `${dayjs(item.created_at).format('DD/MM/YYYY')}`,
        Job_Title: `${item.job.title}`,
        Full_Name: `${item.member.fullname}`,
        Email: `${item.member.email}`,
        Phone: `${item.member.phone || 'None'}`,
        Experience:
          `${
            item?.resume?.yearofexperience > 0
              ? item.resume.yearofexperience + ' ' + 'year'
              : 'No experience'
          }` || 'none',
        Degree: `${item?.resume?.degree || 'None'}`,
      });
    });
    console.log('arr format: ', newArr);

    return newArr;
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(validate),
  });

  const handleUpdateStatus = (id: any, status: any) => {
    dispatch(updateStatus(id, { status }));
  };

  const handleChangeSearchString = (e: any) => {
    setSearchStr(e.target.value);
  };

  const handleChangeDateStart = (e: any) => {
    setDateStart(e ? dayjs(e) : null);
  };

  const handleChangeDateEnd = (e: any) => {
    setDateEnd(e ? dayjs(e) : null);
  };

  const handleChangeStatus = (e: any) => {
    setStatus(e.target.value);
  };

  const handleReset = () => {
    setSearchStr('');
    setDateStart(null);
    setDateEnd(null);
    setStatus('All');
  };

  const filteredCandidates = filterCandidates(
    candidates,
    searchStr,
    dateStart,
    dateEnd,
    status
  );

  return (
    <div>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Typography>
          {(candidates && candidates[0]?.job?.title) || 'Job'}
        </Typography>
        <Typography>Candidates</Typography>
      </Breadcrumbs>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button
          variant='contained'
          startIcon={<UploadRoundedIcon />}
          sx={{ mt: 3 }}
          disabled={data.length < 1}
        >
          <CSVLink
            data={data}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Export
          </CSVLink>
        </Button>
        <Button
          startIcon={<FilterAltIcon />}
          variant='contained'
          color='info'
          onClick={() => setShowFilterBar(!showFilterBar)}
        >
          Filter
        </Button>
      </Stack>

      <Collapse in={showFilterBar}>
        <FilterBar
          onChangeSearch={(e: any) => handleChangeSearchString(e)}
          searchValue={searchStr}
          onChangeDateStart={(e: any) => handleChangeDateStart(e)}
          dateStart={dateStart}
          onChangeDateEnd={(e: any) => handleChangeDateEnd(e)}
          dateEnd={dateEnd}
          onChangeStatus={(e: any) => handleChangeStatus(e)}
          statusValue={status}
          onReset={handleReset}
        />
      </Collapse>

      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell align='center'>Applied at</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>ACtions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRowSkeleton />
            ) : filteredCandidates?.length > 0 ? (
              filteredCandidates?.map((candidate: any) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar src={candidate?.member?.avatar} />
                      <Stack>
                        <Typography variant='h4' sx={{ color: '#000' }}>
                          {candidate?.member?.fullname}
                        </Typography>
                        <Typography variant='body2' textTransform='uppercase'>
                          {candidate?.job?.title}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='subtitle1'>
                      {dayjs(candidate.created_at).format('DD/MM/YYYY')}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    {!candidate?.status || candidate?.status === 'New' ? (
                      <BadgeStatus status={0}>New</BadgeStatus>
                    ) : (
                      <BadgeStatus
                        status={convertAppliedJobStatusToNum(candidate?.status)}
                      >
                        {candidate?.status}
                      </BadgeStatus>
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Tooltip placement='bottom' title='View detail'>
                        <IconButton
                          onClick={() =>
                            navigate(`/employer/hr/candidates/${candidate.id}`)
                          }
                        >
                          <VisibilityTwoToneIcon
                            sx={{ color: '#8c8c8c', fontSize: 19 }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='bottom' title='Edit status'>
                        <IconButton
                          onClick={() => {
                            dispatch(selectCandidate(candidate));
                            dispatch(openStatusDialog());
                          }}
                        >
                          <BorderColorTwoToneIcon
                            sx={{ color: '#40a9ff', fontSize: 19 }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        placement='bottom'
                        title={
                          canSendMail < 0
                            ? 'Please buy this service!'
                            : 'Send mail'
                        }
                      >
                        <div>
                          <IconButton
                            disabled={canSendMail < 0}
                            onClick={() => {
                              dispatch(selectCandidate(candidate));
                              dispatch(openMail());
                            }}
                          >
                            <EmailTwoToneIcon
                              sx={{ color: '#b37feb', fontSize: 19 }}
                            />
                          </IconButton>
                        </div>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component='div'
          count={filteredCandidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        /> */}
      </TableContainer>
      <MailDialog />
      <StatusDialog />
    </div>
  );
};

export const filterCandidates = (
  candidates: any,
  searchStr: string,
  dateStart: any = null,
  dateEnd: any = null,
  status: string = 'All'
) => {
  if (searchStr) {
    candidates = candidates.filter((candidate: any) =>
      candidate.member.fullname
        .toLowerCase()
        .includes(searchStr.toLowerCase().trim())
    );
  }
  if (dateStart) {
    candidates = candidates.filter((candidate: any) =>
      dayjs(candidate.created_at).isSameOrAfter(dayjs(dateStart), 'day')
    );
  }

  if (dateEnd) {
    candidates = candidates.filter((candidate: any) =>
      dayjs(candidate.created_at).isSameOrBefore(dayjs(dateEnd), 'day')
    );
  }

  if (status !== 'All') {
    candidates = candidates.filter(
      (candidates: any) => candidates.status === status
    );
  }

  return candidates;
};

export default EmployerCandidatesByJob;
