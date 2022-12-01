import { Box, TextField, Stack, Button, InputAdornment } from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

type Props = {
  onSearch: (e: any) => void;
  searchValue: string;
  onReset: () => void;
};

const JobFilter = ({ searchValue, onSearch, onReset }: Props) => {
  return (
    <Stack direction='row' spacing={2} sx={{ my: 3 }} alignItems='center'>
      <TextField
        fullWidth
        label='Job title'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        value={searchValue}
        onChange={onSearch}
      />
      {searchValue && (
        <Button
          variant='text'
          startIcon={<DeleteForeverOutlinedIcon />}
          onClick={onReset}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
};

export default JobFilter;
