import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Grid, Typography, Link } from '@mui/material';

import Image from '../../../../components/Image';
import JobImg from '../../../../assets/images/JobImg.png';
import Search from '../../../../assets/images/Search.png';
import Setting from '../../../../assets/images/Setting.png';

type Props = {};

const servicesData = [
  {
    title: 'Post Job',
    desc: 'Post your open tech positions, manage applicants, and intelligent Recruitment Solutions.of recruitment solutions',
    img: JobImg,
  },
  {
    title: 'Search Candidates',
    desc: 'Help the Employers actively seek Candidates in thousands of regularly updated quality resume',
    img: Search,
  },
  {
    title: 'PR Your Brand',
    desc: 'Increase your brand in the market',
    img: JobImg,
  },
  {
    title: 'Setting',
    desc: 'Effectively approach several sources of potential candidates with outstanding recruitment enhancement solutions',
    img: Setting,
  },
];

const ListOfServices = (props: Props) => {
  return (
    <Box sx={{ mt: 15 }}>
      <Grid container spacing={3}>
        {servicesData.map((item) => {
          return (
            <Grid key={item.title} item md={3} flex={1}>
              <ServicesCard
                title={item.title}
                img={item.img}
                desc={item.desc}
              />
            </Grid>
          );
        })}
      </Grid>
      <Link component={RouterLink} to='/employer/services'>
        <Typography variant='h5' align='center' sx={{ mt: 3 }}>
          View more
        </Typography>
      </Link>
    </Box>
  );
};

type ServicesCardProps = {
  title?: string;
  desc?: string;
  img?: any;
};

const ServicesCard = ({ title, img, desc }: ServicesCardProps) => {
  return (
    <Card
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible',
        height: '100%',
      }}
    >
      <Image
        src={img}
        alt='imgTest'
        sx={{
          width: 80,
          height: 80,
          top: '-70px',
          position: 'relative',
          zIndex: 9999,
        }}
      />
      <Typography variant='h3' textTransform='uppercase' sx={{ mt: 1 }}>
        {title}
      </Typography>
      <Typography variant='body2' sx={{ mt: 3 }}>
        {desc}
      </Typography>
    </Card>
  );
};

export default ListOfServices;
