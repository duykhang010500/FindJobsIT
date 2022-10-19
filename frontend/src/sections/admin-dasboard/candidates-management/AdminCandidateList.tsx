import dayjs from 'dayjs';

import { useSelector } from 'react-redux';

import { Stack, Avatar, Typography, IconButton } from '@mui/material';

import {
  Card,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { AppState } from '../../../store/reducer';
import StatusBadge from '../../../components/StatusBadge';

type Props = {};

const AdminCandidateList = (props: Props) => {
  const { list } = useSelector((state: AppState) => state.candidates);

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Date created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.slice(0, 5).map((member: any) => {
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <Avatar />
                      <Stack>
                        <Typography variant='body2'>
                          {member.fullname}
                          {member.expected_position &&
                            `/${member.expected_position} `}
                        </Typography>
                        <Typography variant='body2'>{member.email}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {dayjs(member.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <StatusBadge sx={{ margin: 'auto' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default AdminCandidateList;
