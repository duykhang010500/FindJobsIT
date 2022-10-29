import { useSelector } from 'react-redux';

import {
  Box,
  Stack,
  Table,
  Button,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
import { AppState } from '../../store/reducer';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

type ServicesListProps = {};

const ServicesList = (props: ServicesListProps) => {
  const { isLoading, list } = useSelector((state: AppState) => state.services);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <TableContainer sx={{ mt: 5 }}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: 'rgb(244, 246, 248)',
              color: 'rgb(99,115,129)',
              borderRadius: 8,
              '& .MuiTableHead-root': {
                borderRadius: '10px !important',
              },
            }}
          >
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Unit price (VND)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant='h4' gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#555' }}>
                    {item.note}
                  </Typography>
                </TableCell>
                <TableCell>
                  <QuantityControl />
                </TableCell>
                <TableCell>{item.discount} %</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Stack direction='row'>
                    <Button variant='contained' color='info'>
                      Add
                    </Button>

                    {/* <Tooltip title='Delete' placement='right'>
                      <IconButton>
                        <DeleteIcon sx={{ color: '#f5222d' }} />
                      </IconButton>
                    </Tooltip> */}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '10px 50px',
          backgroundColor: '#e6f7ff',
          borderRadius: 1,
        }}
      >
        <Typography variant='h4' sx={{ color: '#555' }}>
          Total:
        </Typography>
        <Typography variant='h4' sx={{ color: '#ff4d4f', ml: 10 }}>
          9999999
        </Typography>
        <Button
          variant='contained'
          startIcon={<ShoppingBasketIcon />}
          sx={{ ml: 17 }}
        >
          Order
        </Button>
      </Box>
    </>
  );
};

type QuantityControlProps = {
  onIncrease?: (id: number) => void;
  onDecrease?: (id: number) => void;
  total?: number;
};

const QuantityControl = ({
  onIncrease,
  onDecrease,
  total,
}: QuantityControlProps) => {
  return (
    <Box
      sx={{
        padding: '2px 1px',
        border: '1px solid silver',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        width: '100px',
      }}
    >
      <IconButton size='small'>
        <RemoveIcon />
      </IconButton>
      <Typography>8</Typography>
      <IconButton size='small'>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default ServicesList;
