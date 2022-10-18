import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TablePagination,
} from '@mui/material';

type Props = {};

const ServicesList = (props: Props) => {
  return (
    <Card sx={{ mt: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service name</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Day(s)</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
              <TableCell>1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={10}
        rowsPerPage={5}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Card>
  );
};

export default ServicesList;
