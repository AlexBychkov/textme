import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { db as database } from '../../services/firebase';
import SelectUsers from './../../components/dialogList/SelectUsers';

import {
  Grid,
  Typography,
  List,
  CircularProgress,
  ListItem,
  Fab,
  Modal,
  Paper,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { useStyles } from './dialogListStyles';

const DialogList = (props) => {
  const [open, setOpen] = useState(false);
  const [chatList, setChatList] = useState();
  const [userList, setUserList] = useState();
  const [loaded, setLoaded] = useState(false);

  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const { history } = props;
  const classes = useStyles();

  const getData = useCallback(() => {
    const chatObjToUpdate = {};
    const db = database.ref();

    db.child(`users/${props.user.uid}/chats/`).on('value', (UserChatSnap) => {
      if (UserChatSnap.val()) {
        Object.keys(UserChatSnap.val()).forEach((chatId, index) => {
          db.child(`chats/${chatId}`).once('value', (chatSnap) => {
            chatObjToUpdate[chatId] = chatSnap.val();
            chatObjToUpdate[chatId].chatId = chatId;
            if (index === Object.keys(UserChatSnap.val()).length - 1) {
              setChatList(chatObjToUpdate);
              setLoaded(true);
            }
          });
        });
      } else setLoaded(true);
    });
    return () => {
      db.child(`users/${props.user.uid}/chats`).off();
    };
  }, [props.user.uid]);

  useEffect(getData, [getData]);
  useEffect(() => {
    database
      .ref()
      .child(`users/`)
      .once('value', (snapshot) => setUserList(snapshot.val()));
  }, []);

  return (
    <Grid
      container
      item
      direction="column"
      spacing={2}
      className={classes.container}
      xs={11}
      md={9}
      lg={7}
    >
      <h3>TextThem!</h3>

      <List>
        {loaded &&
          chatList &&
          Object.keys(chatList).map((item) => {
            const { title, chatId, message, type, user } = chatList[item];
            return (
              <ListItem
                key={chatId}
                className={classes.itemContainer}
                onClick={() => history.push(`/dialog/${chatId}`)}
              >
                <Typography variant="h6">{title ? title : 'no title'}</Typography>
                <Grid container direction="row" className={classes.lastMessageContainer}>
                  <Typography className={classes.userName} variant="caption">
                    {userList && userList[user].name}:
                  </Typography>
                  <Typography className={classes.marginHorizontal} variant="caption">
                    {type === 'text' && message}
                    {type === 'audio' && 'Audio'}
                    {type === 'location' && 'Location'}
                  </Typography>
                </Grid>
              </ListItem>
            );
          })}
        {!loaded && <CircularProgress />}
        {loaded && (chatList === undefined || chatList === null) && (
          <Typography>No chats yet</Typography>
        )}
      </List>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fabButton}
        onClick={toggleModal}
      >
        <AddIcon />
      </Fab>

      <Modal open={open} onClose={toggleModal}>
        <Paper className={classes.paper}>
          {userList && <SelectUsers handleClose={toggleModal} users={userList} />}
        </Paper>
      </Modal>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogList);
