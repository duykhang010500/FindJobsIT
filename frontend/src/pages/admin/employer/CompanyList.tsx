import dayjs from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Card,
  Table,
  Avatar,
  Switch,
  Tooltip,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DetailDialog from '../../../sections/admin-dasboard/job-management/DetailDialog';
import DetailCompanyDialog from './DetailCompanyDialog';
import { adminUpdateCompanyStatus } from '../../../store/companies/action';

type Props = {
  companies: any;
};

const CompanyList = ({ companies }: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);

  const handleClose = () => {
    setOpenDetail(false);
  };

  const isActive = pathname.includes('active');
  const isRejected = pathname.includes('rejected');
  const isRequested = pathname.includes('requested');

  const handleChangeStatus = (compID: number) => {
    if (isRequested) {
      dispatch(adminUpdateCompanyStatus(compID, 1));
    }
    if (isActive) {
      dispatch(adminUpdateCompanyStatus(compID, 3));
    }
    if (isRejected) {
      dispatch(adminUpdateCompanyStatus(compID, 1));
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Company name</TableCell>
              <TableCell align='left'>contact Email</TableCell>
              <TableCell align='left'>contact name</TableCell>
              <TableCell align='left'>Status </TableCell>
              <TableCell align='center'>actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies?.map((company: any) => (
              <TableRow key={company?.id}>
                <TableCell>
                  <Avatar variant='rounded' src={company?.logo} />
                </TableCell>

                <TableCell>
                  {dayjs(company?.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell align='left'>{company?.employer?.email}</TableCell>
                <TableCell align='left'>
                  {company?.employer?.fullname}
                </TableCell>
                <TableCell align='left'>
                  <Switch
                    defaultChecked={company?.status === 1}
                    onChange={() => handleChangeStatus(company.id)}
                  />
                </TableCell>
                <TableCell align='center'>
                  <Tooltip placement='top' title='View detail'>
                    <IconButton
                      onClick={() => {
                        setSelectedCompany(company);
                        setOpenDetail(true);
                      }}
                    >
                      <VisibilityIcon sx={{ color: '#69b1ff' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={companies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        />
        <DetailCompanyDialog
          onOpen={openDetail}
          onClose={handleClose}
          company={selectedCompany}
        />
      </TableContainer>
    </Card>
  );
};

export default CompanyList;
