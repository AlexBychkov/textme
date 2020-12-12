import React from 'react';
import { connect } from 'react-redux';

import { db, storage } from '../../services/firebase';

import { Grid, Avatar, Typography, Button, TextField, Snackbar } from '@material-ui/core';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

import { useStyles } from './profileStyles';

const Profile = (props) => {
  const classes = useStyles();
  const { user } = props;

  const [name, updateName] = React.useState(user.name);
  const [snackbar, updateSnackbar] = React.useState({ open: false, text: '' });
  const [about, updateAbout] = React.useState(user.about ?? '');

  const onUpdateUser = () => {
    const update = {};
    update['/users/' + user.uid + '/name'] = name;
    update['/users/' + user.uid + '/about'] = about;
    db.ref().update(update);
  };

  const onUpload = () => {
    let avatar = storage.ref().child('users/' + user.uid + '/profile.jpg');
    let file = document.querySelector('#avatar').files[0]; // use the Blob or File API
    avatar
      .put(file)
      .then((snapshot) => {
        updateSnackbar({ open: true, text: 'Successful upload' });
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
        updateSnackbar({ open: true, text: error.message_ });
      });
  };

  return (
    <Grid container direction="column" className={classes.profileMainGrid}>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.profileHeader}
        item
        xs={12}
      >
        <Avatar
          id="photo"
          classes={{ root: classes.profileAvatar }}
          src={user.avatar ?? ''}
        >
          {user.name && user.name.charAt(0)}
        </Avatar>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="caption">{user.about ?? ''}</Typography>
      </Grid>
      <Grid item container direction="column" xs={12} alignItems="center">
        <Grid item container direction="column">
          <Typography classes={{ root: classes.profilePhone }}>
            <SmartphoneIcon fontSize="small" /> {user.phone}
          </Typography>
          <TextField
            label="Name"
            id="name"
            value={name}
            onChange={(e) => {
              updateName(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            label="About"
            id="about"
            value={about}
            onChange={(e) => {
              updateAbout(e.target.value);
            }}
            variant="standard"
          />
          <input
            accept="image/jpg"
            id="avatar"
            type="file"
            style={{ display: 'none' }}
            onChange={onUpload}
          />
          <label htmlFor="avatar">
            <Button variant="contained" color="primary" component="span">
              Upload Avatar
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.profileContactButton }}
            onClick={onUpdateUser}
          >
            Save
          </Button>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => {
              updateSnackbar({ open: false, text: snackbar.text });
            }}
            message={snackbar.text}
          ></Snackbar>
        </Grid>
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
