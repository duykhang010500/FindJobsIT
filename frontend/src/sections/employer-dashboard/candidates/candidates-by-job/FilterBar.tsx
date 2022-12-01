import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Box, TextField, Stack, MenuItem, Button } from '@mui/material';

import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

type Props = {
  onChangeSearch: (e: any) => void;
  searchValue: string;
  onChangeDateStart: (e: any) => void;
  dateStart: any;
  onChangeDateEnd: (e: any) => void;
  dateEnd: any;
  onChangeStatus: (e: any) => void;
  statusValue: string;
  onReset: () => void;
};

const FilterBar = ({
  onChangeSearch,
  searchValue,
  onChangeDateStart,
  dateStart,
  onChangeDateEnd,
  dateEnd,
  onChangeStatus,
  statusValue,
  onReset,
}: Props) => {
  const [dateStartErr, setDateStartErr] = useState<boolean>(false);
  const [dateEndErr, setDateEndErr] = useState<boolean>(false);

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction='row' spacing={2}>
        <TextField
          label='Name'
          fullWidth
          onChange={onChangeSearch}
          value={searchValue}
        />
        <DesktopDatePicker
          label='Date start'
          inputFormat='DD/MM/YYYY'
          value={dateStart}
          onChange={(e: any) => {
            const isAfter = dayjs(e).isAfter(dayjs(dateEnd), 'day');
            if (isAfter) {
              setDateStartErr(true);
              onChangeDateStart(e);
            } else {
              setDateStartErr(false);
              setDateEndErr(false);
              onChangeDateStart(e);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={dateStartErr}
              helperText={dateStartErr && 'Date start must be after date end'}
            />
          )}
        />
        <DesktopDatePicker
          label='Date end'
          inputFormat='DD/MM/YYYY'
          value={dateEnd}
          onChange={(e: any) => {
            if (dayjs(e).isBefore(dayjs(dateStart), 'day')) {
              setDateEndErr(true);
              onChangeDateEnd(e);
            } else {
              setDateEndErr(false);
              setDateStartErr(false);
              onChangeDateEnd(e);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={dateEndErr}
              helperText={dateEndErr && 'Date end must be after date start'}
            />
          )}
        />
        <TextField
          fullWidth
          select
          label='Status'
          defaultValue={'All'}
          value={statusValue}
          onChange={onChangeStatus}
        >
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='New'>New</MenuItem>
          <MenuItem value='Short listed'>Short listed</MenuItem>
          <MenuItem value='Interview'>Interview</MenuItem>
          <MenuItem value='Offered'>Offered</MenuItem>
          <MenuItem value='Hire'>Hire</MenuItem>
        </TextField>
      </Stack>
      <Button
        variant='outlined'
        startIcon={<RestartAltOutlinedIcon />}
        onClick={onReset}
        sx={{ mt: 3 }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default FilterBar;
