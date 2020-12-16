import React, { useState } from 'react';
import { connect } from 'react-redux';

import { db, storage } from '../../services/firebase';

import { Grid, Avatar, Typography, Button, TextField, Snackbar } from '@material-ui/core';
import { Smartphone, CloseOutlined } from '@material-ui/icons';

import { useStyles } from './profileStyles';

const Profile = (props) => {
  const classes = useStyles();

  const { user } = props;

  const [name, setName] = useState(user.name);
  const [snackbar, setSnackBar] = useState({ open: false, text: '' });
  const [about, setAbout] = useState(user.about ?? '');
  const [status, setStatus] = useState(user.status ?? '');

  const onUpdateUser = () => {
    const update = {};
    update['/users/' + user.uid + '/name'] = name;
    update['/users/' + user.uid + '/about'] = about;
    update['/users/' + user.uid + '/status'] = status;
    db.ref().update(update);
  };

  const onUpload = () => {
    let avatar = storage.ref().child('users/' + user.uid + '/profile.jpg');
    let file = document.querySelector('#avatar').files[0]; // use the Blob or File API
    avatar
      .put(file)
      .then((snapshot) => {
        setSnackBar({ open: true, text: 'Successful upload' });
        const update = {};
        storage
          .ref()
          .child('users/' + user.uid + '/profile.jpg')
          .getDownloadURL()
          .then((url) => {
            update['/users/' + user.uid + '/avatar'] = url;
            db.ref().update(update);
          })
          .catch(function (error) {
            // Handle any errors
          });
      })
      .catch((error) => {
        setSnackBar({ open: true, text: error.message_ });
      });
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.profileMainGrid}
      alignItems="center"
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.profileHeader}
        item
        xs={12}
      >
        <CloseOutlined className={classes.closeIcon} onClick={props.handleClose} />
        <Avatar
          id="photo"
          classes={{ root: classes.profileAvatar }}
          src={user.avatar ?? ''}
        >
          {user.name && user.name.charAt(0)}
        </Avatar>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="caption" className={classes.profileSecondaryText}>
          {user.status ?? ''}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        xs={11}
        justify="center"
        alignItems="center"
        wrap="nowrap"
        className={classes.profileContentContainer}
      >
        <Typography classes={{ root: classes.profilePhone }}>
          <Smartphone fontSize="small" /> {user.phone}
        </Typography>
        <TextField
          className={classes.profileTextFields}
          label="Name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant="standard"
          classes={{ root: classes.profileTextFields }}
        />
        <TextField
          className={classes.profileTextFields}
          multiline
          label="About"
          id="about"
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
          variant="standard"
        />
        <TextField
          className={classes.profileTextFields}
          label="Status"
          id="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          variant="standard"
          classes={{ root: classes.profileTextFields }}
        />
        <Grid item container justify="center">
          <input
            className={classes.profilePaddings}
            accept="image/jpg"
            id="avatar"
            type="file"
            style={{ display: 'none' }}
            onChange={onUpload}
          />
          <label htmlFor="avatar">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              className={classes.profileButton}
            >
              Upload Avatar
            </Button>
          </label>
          <Button
            className={classes.profileButton}
            variant="contained"
            color="primary"
            onClick={onUpdateUser}
          >
            Save
          </Button>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => {
            setSnackBar({ open: false, text: snackbar.text });
          }}
          message={snackbar.text}
        ></Snackbar>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
