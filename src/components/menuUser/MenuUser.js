import React, { useState } from 'react'
import { Avatar, Box, Menu, MenuItem } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { connect } from 'react-redux'
import { USER_LOGOUT } from '../../redux/type'

function MenuUser(props) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //style for link
  const active = {
    fontWeight: 'bold',
    color: 'black',
    textDecoration: 'underline',
  }
  const styleLink = {
    textDecoration: 'none',
    display: 'block',
    color: 'gray',
  }

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('try logout')
        props.onLogout()
      })
      .catch((error) => {
        console.log(error, 'signOut error')
      })
  }

  return (
    <div>
      <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        H
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/profile" activeStyle={active} style={styleLink}>
            Profile {props.user.phoneNumber}
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Box style={styleLink}>Log Out</Box>
        </MenuItem>
      </Menu>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch({ type: USER_LOGOUT }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuUser)
