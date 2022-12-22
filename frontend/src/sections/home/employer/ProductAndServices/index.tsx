import { Box, Typography } from '@mui/material';
import ListOfServices from './ListOfServices';

type Props = {};

const ProductAndServices = (props: Props) => {
  return (
    <div data-aos='zoom-in-up'>
      <Box sx={{ mt: 10 }}>
        <Typography
          variant='h2'
          textTransform='uppercase'
          align='center'
          gutterBottom
          color='primary'
        >
          What's services we provided?
        </Typography>

        <Typography variant='body1' align='center' sx={{ color: '#8c8c8c' }}>
          We provide a variety of services which help employers connect with
          more talents, so they can hire faster
        </Typography>
        <ListOfServices />
      </Box>
    </div>
  );
};

export default ProductAndServices;
