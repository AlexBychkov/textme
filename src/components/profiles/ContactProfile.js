import React from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Avatar, Typography, Button } from '@material-ui/core';
import { Smartphone, CloseOutlined } from '@material-ui/icons';

import { useStyles } from './profileStyles';

const ContactProfile = (props) => {
  const classes = useStyles();
  const { history } = props;
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
        <CloseOutlined className={classes.closeIcon} onClick={props.handleClose} />
        <Avatar classes={{ root: classes.profileAvatar }}>R</Avatar>
        <Typography variant="h5">Name</Typography>
        <Typography variant="caption" className={classes.profileSecondaryText}>
          Status text
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        xs={12}
        alignItems="center"
        className={classes.profileContentContainer}
      >
        <Typography className={classes.profilePaddings}>
          <Smartphone fontSize="small" /> +7 900 978 11 32
        </Typography>
        <Typography
          variant="caption"
          className={`${classes.profileSecondaryText} ${classes.profilePaddings}`}
        >
          About
        </Typography>
        <Typography className={classes.profilePaddings}>
          about content of contact
        </Typography>
        <Grid>
          <Button variant="contained" color="secondary" className={classes.profileButton}>
            follow
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/dialog')}
            className={classes.profileButton}
          >
            textme
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(ContactProfile);
