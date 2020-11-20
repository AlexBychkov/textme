import React, { useEffect, useState } from 'react';

import MessageItemYours from './components/MessageItemYours';
import MessageItemNotYours from './components/MessageItemNotYours';
import InputTextArea from './components/InputTextArea';

import { connect } from 'react-redux';
import { database } from '../../firebase';
import { Container, CircularProgress } from '@material-ui/core';

import classes from './Dialog.module.css';

const Dialog = (props) => {
  const [dialogHeight] = useState(window.innerHeight);
  const [messages, setMessages] = useState('');
  const [personInfo, setPersonInfo] = useState('');
  const [loaded, setLoaded] = useState(false);
  // myRef = React.createRef();

  const dbUsers = database.ref().child('users');
  const dbMessages = database.ref().child('messages/first');
  
  useEffect(() => {
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
    // crutch here)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessageHandler = (messageValue) => {
    const objToPush = {};
    objToPush.message = messageValue;
    objToPush.timestamp = new Date().getTime();
    objToPush.type = 'text';
    objToPush.user = props.user.uid;
    dbMessages.push(objToPush);
  };

  //still workin on that
  // setScroll = () => {
  //   if (this.myRef) this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
  // };
  return (
    <Container style={{ height: dialogHeight - 68 }} className={classes.Container}>
      <div className={classes.Dialog}>
        <div className={classes.DialogField}>
          <h3>Welcome</h3>
          {!loaded && <CircularProgress className={classes.Progress} />}
          {loaded &&
            Object.keys(messages).map((messageItemKey,index) => {
              const ItemProps = {};
              const name = personInfo[messages[messageItemKey].user].name;
              const avatar = personInfo[messages[messageItemKey].user].avatar;

              ItemProps.key = messageItemKey;
              ItemProps.value = messages[messageItemKey].message;
              ItemProps.name = name ? name : 'NoName';
              ItemProps.time = new Date(
                messages[messageItemKey].timestamp
              ).toLocaleTimeString();
              ItemProps.avatar = avatar
                ? avatar
                : 'https://124ural.ru/wp-content/uploads/2017/04/no-avatar.png'; // default avatar
              if (props.user.uid === messages[messageItemKey].user)
                return <MessageItemYours {...ItemProps} />;
              else return <MessageItemNotYours {...ItemProps} />;
            })}
        </div>

        <InputTextArea sendMessage={sendMessageHandler} />
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
