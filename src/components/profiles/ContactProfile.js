import React from 'react';
// import { Redirect, useHistory, withRouter } from 'react-router-dom';
import history from './../../services/history'
import { connect } from 'react-redux';
import { db } from '../../services/firebase';

import { Grid, Avatar, Typography, Button } from '@material-ui/core';
import { Smartphone, CloseOutlined } from '@material-ui/icons';

import { useStyles } from './profileStyles';


const ContactProfile = (props) => {
  const contactStatus = props.userData.status ? props.userData.status : 'no status';
  const phone = props.userData.phone;
  const contactName = props.userData.name ? props.userData.name : 'noName';
  const about = props.userData.about ? props.userData.about : ' ';
  const avatar = props.userData.avatar && props.userData.avatar;
  const contactId = props.userData.id;
  const privateChatId = props.user.privateChats[contactId]


  const classes = useStyles();
  // let {history} = props
  
  const createPrivateChat = () => {
    // for safety =_=
    if (contactId === undefined) return

    const updates = {};
    const key = db.ref().child('chats').push().key;

    // privateChats and chats because dialog list map chats
    updates[`/users/${props.user.uid}/privateChats/${contactId}`] =  key ;
    updates[`/users/${props.user.uid}/chats/${key}`] = true;
    updates[`/users/${contactId}/privateChats/${props.user.uid}`] =  key ;
    updates[`/users/${contactId}/chats/${key}`] = true;


    updates[`/chats/${key}`] = {
      title: `${contactName}-${props.user.name} chat`,
      created: props.user.uid,
      message: `write here something`,
      type: 'text',
      user: props.user.uid,
    };

    updates[`/members/${key}`] = {
      [props.user.uid]: true,
      [contactId]: true,
    };

    db.ref().update(updates).then(history.push(`/dialog/${key}`));
    
  };


  const textMeOption = () => {
    // Object.keys(undefined) protection

    if (!props.user.privateChats) {
      createPrivateChat();
      return;
    }

    if (Object.keys(props.user.privateChats).includes(contactId)) {
      history.push(`/dialog/${privateChatId}`); 
    } else {
      createPrivateChat();
    }

  };
  const addFriend = () => {
    // history.push(`/dialog/testurl`)
    // add friend
    const updates = {}
    updates[`/users/${props.user.uid}/contacts/${contactId}`] = true
    db.ref().update(updates)
  }
 
 

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
        <Avatar classes={{ root: classes.profileAvatar }} src={avatar && avatar}>
          {contactName && contactName.charAt(0)}
        </Avatar>
        <Typography variant="h5">{contactName}</Typography>
        <Typography variant="caption" className={classes.profileSecondaryText}>
          {contactStatus}
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
          <Smartphone fontSize="small" /> {phone}
        </Typography>
        <Typography
          variant="caption"
          className={`${classes.profileSecondaryText} ${classes.profilePaddings}`}
        >
          About
        </Typography>
        <Typography className={classes.profilePaddings}>{about}</Typography>
        <Grid>
          <Button variant="contained" color="secondary" className={classes.profileButton} onClick = {addFriend}>
            follow
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={textMeOption}
            className={classes.profileButton}
          >
            textme
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

export default connect(mapStateToProps)(ContactProfile);
// export default connect(mapStateToProps)(withRouter(ContactProfile));
// export default withRouter(connect(mapStateToProps)(ContactProfile))
// export default withRouter(ContactProfile)
