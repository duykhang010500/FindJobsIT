import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};

const JobFilter = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', my: 3 }}>
      <div>
        <TextField label='Job title' sx={{ mb: 2 }} />
      </div>
      <div>
        <Button
          variant='contained'
          startIcon={<SearchIcon />}
          sx={{ backgroundColor: '#faad14' }}
        >
          Search
        </Button>
      </div>
    </Box>
  );
};

export default JobFilter;
