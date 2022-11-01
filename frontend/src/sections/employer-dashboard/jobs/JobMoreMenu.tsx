import React, { useState } from 'react';
import { Popover, IconButton, MenuItem, Box, Divider } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  onViewApplications: () => void;
};

const JobMoreMenu = ({ onEdit, onDelete, onViewApplications }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Popover
        id='more-menu'
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 1 }}>
          <MenuItem onClick={onEdit}>
            <SaveAsOutlinedIcon sx={{ mr: 2 }} /> Edit
          </MenuItem>
          {/* <MenuItem onClick={onViewApplications}>
            <PeopleAltOutlinedIcon sx={{ mr: 2 }} /> Applications
          </MenuItem> */}
          <Divider sx={{ border: '1px dashed rgba(145, 158, 171, 0.24)' }} />
          <MenuItem onClick={onDelete} sx={{ color: '#ff4d4f' }}>
            <DeleteOutlineIcon sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default JobMoreMenu;
