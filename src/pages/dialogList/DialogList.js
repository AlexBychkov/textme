import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';

import { Grid, Typography, List, CircularProgress, ListItem } from '@material-ui/core';

import { useStyles } from './dialogListStyles';

const DialogList = (props) => {
  const [chatList, setChatList] = useState();
  const [loaded, setLoaded] = useState(false);
  const { history } = props;
  const classes = useStyles();

  const getData = useCallback(() => {
    const chatObjToUpdate = {};
    const db = database.ref();

    db.child(`users/${props.user.uid}/chats/`).once('value', (UserChatSnap) => {
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
    });
  }, [props.user.uid]);

  useEffect(getData, [getData]);

  return (
    <Grid
      container
      item
      direction="column"
      spacing={2}
      className={classes.container}
      xs={10}
      md={8}
    >
      <h3>TextThem!</h3>
      <List>
        {loaded &&
          chatList !== null &&
          Object.keys(chatList).map((item, index) => {
            const { title, chatId } = chatList[item];
            return (
              <ListItem
                key={chatId}
                className={classes.itemContainer}
                onClick={() => history.push(`/dialog/${chatId}`)}
              >
                {/* creator == ID, need name... yeah sry TEMPORAL */}
                {/* <Typography>Created {creator}</Typography> */}
                <Typography>{title}</Typography>
              </ListItem>
            );
          })}
        {!loaded && <CircularProgress />}
      </List>
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
