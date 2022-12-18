import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CSVLink } from 'react-csv';

import {
  Table,
  Stack,
  Button,
  Tooltip,
  Skeleton,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Avatar,
} from '@mui/material';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';

import {
  updateStatus,
  getListCandidatesForEmployer,
  selectCandidate,
  openStatusDialog,
  openMail,
} from '../../../store/candidates/action';

import { AppState } from '../../../store/reducer';

import FilterBar from '../../../sections/employer-dashboard/candidates/candidates-by-job/FilterBar';
import { employerGetOrderedServices } from '../../../store/services/actions';
import TableRowSkeleton from '../../../components/Skeleton/TableRowSkeleton';
import Nodata from '../../../components/Nodata';
import BadgeStatus from '../../../components/Badge';
import { convertAppliedJobStatusToNum } from '../../../utils/convert';
import MailDialog from '../../../sections/employer-dashboard/candidates/MailDialog';
import StatusDialog from '../../../sections/employer-dashboard/candidates/StatusDialog';

type Props = {};

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const EmployerCandidatesList = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState<any>([]);

  const [searchStr, setSearchStr] = useState<string>('');

  const [dateStart, setDateStart] = useState<Dayjs | null>(null);

  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);

  const [status, setStatus] = useState<string>('All');

  const [showFilterBar, setShowFilterBar] = useState<boolean>(true);

  const { activeServices } = useSelector((state: AppState) => state.services);

  const { isLoading, candidates, list } = useSelector(
    (state: AppState) => state.candidates
  );

  const canSendMail = activeServices.findIndex((item: any) => item.id === 14);

  useEffect(() => {
    dispatch(employerGetOrderedServices());
    dispatch(getListCandidatesForEmployer());
  }, [dispatch]);

  useEffect(() => {
    setData(formatData(candidates));
  }, [list]);

  const formatData = (arr: any) => {
    let newArr: any = [];
    arr?.forEach((item: any, index: number) => {
      newArr.push({
        STT: `${index + 1}`,
        Date_Apply: `${dayjs(item.created_at).format('DD/MM/YYYY')}`,
        Job_Title: `${item.job.title}`,
        Full_Name: `${item.member.fullname}`,
        Email: `${item.member.email}`,
        Phone: `${item.member.phone}`,
        Experience: `${
          item.resume.yearofexperience > 0
            ? item.resume.yearofexperience + ' ' + 'year'
            : 'No experience'
        }`,
        Degree: `${item.resume.degree}`,
      });
    });

    return newArr;
  };

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
    list,
    searchStr,
    dateStart,
    dateEnd,
    status
  );

  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button
          variant='contained'
          startIcon={<UploadRoundedIcon />}
          disabled={list.length === 0}
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
              <TableCell align='left'>Candidate</TableCell>
              <TableCell align='center'>Applied on</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>ACtions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRowSkeleton />
            ) : filteredCandidates.length > 0 ? (
              filteredCandidates?.map((candidate: any) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <Avatar src={candidate?.member?.avatar} />
                      <Stack>
                        <Typography variant='h4' sx={{ color: '#000' }}>
                          {candidate?.member?.fullname}
                        </Typography>
                        <Typography variant='body2' textTransform='capitalize'>
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
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component='div'
          count={filteredCandidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        />
      </TableContainer>
      <MailDialog />
      <StatusDialog />
    </>
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

export default EmployerCandidatesList;
