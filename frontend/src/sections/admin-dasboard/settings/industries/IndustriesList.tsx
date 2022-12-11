import dayjs from 'dayjs';

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

import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppState } from '../../../../store/reducer';
import { IIndustry } from '../../../../store/industries/types';
import StatusBadge from '../../../../components/StatusBadge';
import {
  deleteIndustry,
  selectIndustry,
} from '../../../../store/industries/actions';

type Props = {};

const IndustriesList = (props: Props) => {
  const { industries } = useSelector((state: AppState) => state.industries);

  const dispatch = useDispatch();

  const handleEdit = (id: number | any) => {
    dispatch(selectIndustry(id));
  };

  const handleDelete = (id: number | any) => {
    dispatch(deleteIndustry(id));
  };

  return (
    <Card sx={{ mt: 5 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Created at</TableCell>
              <TableCell align='center'>Updated at</TableCell>
              {/* <TableCell align='center'>Status</TableCell> */}
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {industries.map((industry: IIndustry) => (
              <TableRow key={industry.id}>
                <TableCell>{industry.id}</TableCell>
                <TableCell>{industry.name}</TableCell>
                <TableCell align='center'>
                  {dayjs(industry.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='center'>
                  {dayjs(industry.updated_at).format('DD/MM/YYYY')}
                </TableCell>
                {/* <TableCell>
                  <StatusBadge />
                </TableCell> */}
                <TableCell align='center'>
                  <IconButton onClick={() => handleEdit(industry.id)}>
                    <SaveAsIcon sx={{ color: '#096dd9' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(industry.id)}>
                    <DeleteIcon sx={{ color: '#ff4d4f' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component='div'
        rowsPerPage={10}
        page={0}
        count={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Card>
  );
};

export default IndustriesList;
