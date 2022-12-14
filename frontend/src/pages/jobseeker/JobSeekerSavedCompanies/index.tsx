import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Link,
  Table,
  Stack,
  Tooltip,
  Skeleton,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { AppState } from '../../../store/reducer';
import {
  getFollowingCompanies,
  unFollowCompany,
} from '../../../store/companies/action';
import Avatar from '@mui/material/Avatar';
import DeleteDialog from '../../../components/DeleteDialog';
import Nodata from '../../../components/Nodata';

type Props = {};

const JobSeekerSavedCompanies = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);

  const [rowPerPage, setRowPerPage] = useState<number>(5);

  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  const { isLoading, followingCompany } = useSelector(
    (state: AppState) => state.companies
  );

  useEffect(() => {
    dispatch(getFollowingCompanies());
  }, [dispatch]);

  const handleDelete = () => {
    console.log('Unfollow company: ', selectedCompany);
    dispatch(unFollowCompany(selectedCompany.id));
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedCompany(null);
  };

  if (isLoading) {
    return (
      <Card sx={{ p: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Stack spacing={2} mt={2}>
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={60} />
          </Stack>
        </TableContainer>
      </Card>
    );
  }

  if (followingCompany.length === 0) {
    return (
      <Card sx={{ p: 1 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Nodata />
        </TableContainer>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 1 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {followingCompany
              ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((company: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Stack direction='row' alignItems='center' spacing={3}>
                      <Avatar
                        variant='rounded'
                        src={company.company.logo}
                        sx={{
                          width: 80,
                          height: 80,
                          border: '1px solid #d9d9d9',
                          padding: '4px',
                          backgroundColor: '#fff',
                        }}
                      />
                      <Link
                        component={RouterLink}
                        to={`/company/${company.company.id}`}
                        sx={{
                          fontWeight: 600,
                          fontSize: 18,
                          color: '#1890ff',
                        }}
                      >
                        {company.company.name}
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
                    <Tooltip title='Remove' placement='top'>
                      <IconButton
                        onClick={() => {
                          setSelectedCompany(company.company);
                          setOpen(true);
                        }}
                      >
                        <DeleteIcon sx={{ color: '#ff4d4f' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={followingCompany.length}
          rowsPerPage={rowPerPage}
          page={page}
          onPageChange={(_, value: any) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowPerPage(e.target.value)}
        />
      </TableContainer>
      <DeleteDialog
        isOpen={open}
        content={`Are you sure unfollow this company?`}
        onCancel={handleCancel}
        onDoAction={handleDelete}
      />
    </Card>
  );
};

export default JobSeekerSavedCompanies;
