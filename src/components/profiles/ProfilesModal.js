import { Modal, Paper } from '@material-ui/core';

import React from 'react';
import Profile from './Profile';
import ContactProfile from './ContactProfile';
import { useStyles } from './profileStyles';


const ProfileModal = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <strong className={classes.modalPointer} onClick={handleOpen}>
        {props.children}
      </strong>
      <Modal open={open} onClose={handleClose} disableAutoFocus>
        <Paper className={classes.modalPaper}>
          {props.profile ? (
            <Profile handleClose={handleClose} />
          ) : (
            <ContactProfile userData = {props.user} contactId = {props.userId}handleClose={handleClose} />
          )}
        </Paper>
      </Modal>
    </>
  );
}
export default ProfileModal