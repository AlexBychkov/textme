import React, {useState} from 'react';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';


export default function GlobalMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  //style for link
  const active = {
    fontWeight: "bold",
    color: "black",
    textDecoration: 'underline',
  }
  const styleLink = {
    textDecoration: 'none',
    color: "gray"
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       Menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <NavLink to='/' activeStyle={active} style={styleLink}>Profile</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <NavLink to='/contact' activeStyle={active} style={styleLink}>Contact</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <NavLink to='/setings' activeStyle={active} style={styleLink}>Setings</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}