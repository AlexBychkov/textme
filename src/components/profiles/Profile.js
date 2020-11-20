import React from 'react';
import { connect } from 'react-redux';

import { db } from '../../services/firebase';

import { Grid, Avatar, Typography, Button, TextField } from '@material-ui/core';
import SmartphoneIcon from '@material-ui/icons/Smartphone';

import { useStyles } from './profileStyles';

const Profile = (props) => {
  const classes = useStyles();
  const { user } = props;
  const [name, updateName] = React.useState(user.name);
  const [about, updateAbout] = React.useState(user.about ?? '');
  const onUpdateUser = () => {
    const update = {};
    update['/users/' + user.uid + '/name'] = name;
    update['/users/' + user.uid + '/about'] = about;
    db.ref().update(update);
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
        <Avatar classes={{ root: classes.profileAvatar }}>{user.name.charAt(0)}</Avatar>
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
          <Button
            variant="contained"
            color="primary"
            classes={{ root: classes.profileContactButton }}
            onClick={onUpdateUser}
          >
            Save
          </Button>
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
