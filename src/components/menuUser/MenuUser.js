import React, { useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { auth } from '../../services/firebase';
import { logOut } from '../../redux/actions';
import ProfileModal from './../profiles/ProfilesModal';

function MenuUser(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const styleLink = {
    textDecoration: 'none',
    display: 'block',
    color: 'gray',
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        props.onLogout();
      })
      .catch((error) => {
        console.log(error, 'signOut error');
      });
  };

  return (
    <div>
      <Avatar
        aria-controls="simple-menu"
        aria-haspopup="true"
        src={props.user.avatar ?? ''}
        onClick={handleClick}
      >
        {props.user.name && props.user.name.charAt(0)}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ProfileModal profile>
            <Typography style={styleLink}>Profile</Typography>
          </ProfileModal>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Box style={styleLink}>Log Out</Box>
        </MenuItem>
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuUser);
