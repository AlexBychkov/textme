import React, { useState } from 'react';

import { Avatar, Box, Menu, MenuItem, Typography } from '@material-ui/core';
import ProfileModal from './../profiles/ProfilesModal';

export default function MenuUser(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const styleLink = {
    textDecoration: 'none',
    color: "gray"
  }
  const handleLogout = () => {
    
  }

  return (
    <div>
      <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>H</Avatar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ProfileModal profile><Typography style={styleLink}>Profile</Typography></ProfileModal>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box style={styleLink} onClick={handleLogout}>Log Out</Box>
        </MenuItem>
      </Menu>
    </div>
  );
}