import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Popover, IconButton, MenuItem, Box, Divider } from '@mui/material';

import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import UploadIcon from '@mui/icons-material/Upload';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { number } from 'yup';

type Props = {
  status?: number;
  onEdit: () => void;
  onDelete?: () => void;
  onPost?: () => void;
  onClose?: () => void;
  onRepost?: () => void;
  onViewApplications?: () => void;
};

const JobMoreMenu = ({
  status,
  onEdit,
  onDelete,
  onPost,
  onClose,
  onRepost,
  onViewApplications,
}: Props) => {
  const { pathname } = useLocation();

  const isDraftPage = pathname.includes('draft');

  const isActivePage = pathname.includes('active');

  const isClosedPage = pathname.includes('closed');

  const isPendingPage = pathname.includes('pending');

  const isRejectedPage = pathname.includes('rejected');

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
            <BorderColorIcon sx={{ mr: 2, color: '#597ef7' }} /> Edit
          </MenuItem>
          {isActivePage && (
            <>
              {status !== 2 && (
                <>
                  <MenuItem onClick={onViewApplications}>
                    <PeopleIcon sx={{ mr: 2, color: '#ffc53d' }} /> Applications
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem onClick={onClose}>
                    <BlockIcon sx={{ mr: 2, color: '#ff4d4f' }} /> Close
                  </MenuItem>
                </>
              )}
            </>
          )}
          {isClosedPage && (
            <>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={onRepost}>
                <ReplayIcon sx={{ mr: 2, color: '#52c41a' }} />
                Repost
              </MenuItem>
            </>
          )}

          {isDraftPage && (
            <>
              <MenuItem onClick={onPost}>
                <Divider sx={{ my: 1 }} />
                <UploadIcon sx={{ mr: 2, color: '#52c41a' }} />
                Post
              </MenuItem>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={onDelete}>
                <DeleteIcon sx={{ mr: 2, color: '#ff4d4f' }} /> Delete
              </MenuItem>
            </>
          )}

          {isPendingPage && (
            <>
              <Divider sx={{ my: 1 }} />
              <MenuItem onClick={onDelete}>
                <DeleteIcon sx={{ mr: 2, color: '#ff4d4f' }} /> Delete
              </MenuItem>
            </>
          )}

          {isRejectedPage && (
            <>
              {/* <Divider sx={{ my: 1 }} />
              <MenuItem onClick={onDelete}>
                <DeleteIcon sx={{ mr: 2, color: '#ff4d4f' }} /> Delete
              </MenuItem> */}
            </>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default JobMoreMenu;
