import dayjs from 'dayjs';

import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { IconButton } from '@mui/material';

import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { AppState } from '../../../../store/reducer';
import { IIndustry } from '../../../../store/industries/types';
import StatusBadge from '../../../../components/StatusBadge';
import {
  deleteIndustry,
  selectIndustry,
} from '../../../../store/industries/actions';

type Props = {};

const IndustriesList = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { industries } = useSelector((state: AppState) => state.industries);

  const dispatch = useDispatch();

  const handleEdit = (id: number | any) => {
    dispatch(selectIndustry(id));
  };

  const handleDelete = (id: number | any) => {
    dispatch(deleteIndustry(id));
  };

  return (
    <Card sx={{ p: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {/* <TableCell align='center'>Created at</TableCell>
              <TableCell align='center'>Updated at</TableCell> */}
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {industries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((industry: IIndustry) => (
                <TableRow key={industry.id}>
                  <TableCell>{industry.id}</TableCell>
                  <TableCell>{industry.name}</TableCell>
                  {/* <TableCell align='center'>
                    {dayjs(industry.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>
                    {dayjs(industry.updated_at).format('DD/MM/YYYY')}
                  </TableCell> */}
                  <TableCell align='center'>
                    <IconButton onClick={() => handleEdit(industry.id)}>
                      <BorderColorTwoToneIcon sx={{ color: '#40a9ff' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(industry.id)}>
                      <DeleteTwoToneIcon sx={{ color: '#ff4d4f' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component='div'
        rowsPerPage={rowsPerPage}
        page={page}
        count={industries.length}
        onPageChange={(_, value) => setPage(value)}
        onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
      />
    </Card>
  );
};

export default IndustriesList;
