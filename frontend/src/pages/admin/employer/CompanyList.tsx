import dayjs from 'dayjs';

import { useLocation } from 'react-router-dom';

import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Switch,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import DetailDialog from '../../../sections/admin-dasboard/job-management/DetailDialog';
import DetailCompanyDialog from './DetailCompanyDialog';
import { useDispatch } from 'react-redux';
import { adminUpdateCompanyStatus } from '../../../store/companies/action';

type Props = {
  companies: any;
};

const CompanyList = ({ companies }: Props) => {
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
    <TableContainer sx={{ mt: 5 }}>
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
            <TableRow key={company.id}>
              <TableCell>
                <Avatar variant='rounded' />
              </TableCell>

              <TableCell>
                {dayjs(company.created_at).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell align='left'>{company.employer.email}</TableCell>
              <TableCell align='left'>{company.employer.fullname}</TableCell>
              <TableCell align='left'>
                <Switch
                  defaultChecked={company.status === 1}
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
      <DetailCompanyDialog
        onOpen={openDetail}
        onClose={handleClose}
        company={selectedCompany}
      />
    </TableContainer>
  );
};

export default CompanyList;
