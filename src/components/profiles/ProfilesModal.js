import { Modal, Paper } from '@material-ui/core';

import React from 'react';
import Profile from './Profile';
import ContactProfile from './ContactProfile';
import { useStyles } from './profileStyles';

const ProfileModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <strong className={classes.modalPointer} onClick={handleModal}>
        {props.children}
      </strong>
      <Modal open={open} onClose={handleModal} disableAutoFocus>
        <Paper className={classes.modalPaper}>
          {props.profile ? (
            <Profile handleClose={handleModal} />
          ) : (
            <ContactProfile userData={props.user} handleClose={handleModal} />
          )}
        </Paper>
      </Modal>
    </>
  );
};
export default ProfileModal;
