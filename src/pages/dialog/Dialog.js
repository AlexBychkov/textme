import React, { useCallback, useEffect, useRef, useState } from 'react';

import InputTextArea from './components/InputTextArea';
import MessageItem from './components/MessageItem';

import { connect } from 'react-redux';
import { db as database } from '../../services/firebase';
import { Container, CircularProgress } from '@material-ui/core';

import classes from './Dialog.module.css';

import noAvatar from '../../no-avatar.png';

const Dialog = (props) => {
  const [defaultAvatar] = useState(noAvatar);
  const { dialogId } = props.match.params;
  const scrollTo = useRef();

  const [messages, setMessages] = useState('');
  const [personInfo, setPersonInfo] = useState('');
  const [loaded, setLoaded] = useState(false);

  const getData = useCallback(() => {
    const dbUsers = database.ref().child('users');
    const dbMessages = database.ref().child(`messages/${dialogId}`);

    dbMessages.on('value', (snap) => {
      setMessages(snap.val());
    });
    dbUsers.once('value', (snap) => {
      setPersonInfo(snap.val());
      setLoaded(true);
    });

    return () => {
      dbMessages.off();
    };
  }, [dialogId]);

  const scrollToBottomHandler = () => {
    scrollTo.current.scrollIntoView({ behaviour: 'smooth' });
  };

  useEffect(getData, []);

  useEffect(scrollToBottomHandler, [messages]);

  return (
    <Container className={classes.Container}>
      <div className={classes.Dialog}>
        <div className={classes.DialogField}>
          <h3>Welcome</h3>
          {!loaded && <CircularProgress className={classes.Progress} />}
          {loaded &&
            messages !== null &&
            Object.keys(messages).map((messageItemKey, index) => {
              const ItemProps = {};
              const name = personInfo[messages[messageItemKey].user].name;
              const avatar = personInfo[messages[messageItemKey].user].avatar;

              ItemProps.userData = personInfo[messages[messageItemKey].user];
              ItemProps.userData.id = messages[messageItemKey].user;

              ItemProps.key = messageItemKey;
              ItemProps.type = messages[messageItemKey].type;
              ItemProps.value = messages[messageItemKey].message;
              ItemProps.name = name ? name : 'NoName';
              ItemProps.yours =
                props.user.uid === messages[messageItemKey].user ? true : false;
              ItemProps.time = new Date(
                messages[messageItemKey].timestamp
              ).toLocaleTimeString();
              ItemProps.avatar = avatar ? avatar : defaultAvatar;

              // eslint-disable-next-line react/jsx-key
              return <MessageItem {...ItemProps} />;
            })}
          <div ref={scrollTo}></div>
        </div>

        <InputTextArea />
      </div>
    </Container>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
