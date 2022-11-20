import {
  Link,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  Breadcrumbs,
  TableContainer,
} from '@mui/material';

type Props = {};

const EmployerCandidatesByJob = (props: Props) => {
  return (
    <div>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Typography>Job name</Typography>
        <Typography>Candidate</Typography>
      </Breadcrumbs>

      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Applied at</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ACtions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployerCandidatesByJob;
