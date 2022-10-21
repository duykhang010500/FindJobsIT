import React from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {};

const JobFilter = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', my: 3 }}>
      <Stack direction='row' spacing={2}>
        <TextField label='Job title' fullWidth />
        <Button
          variant='contained'
          startIcon={<SearchIcon />}
          sx={{ backgroundColor: '#faad14' }}
        >
          Search
        </Button>
      </Stack>
    </Box>
  );
};

export default JobFilter;
