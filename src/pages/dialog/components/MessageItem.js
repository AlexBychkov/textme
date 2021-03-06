import React from 'react';
import classes from './MessageItem.module.css';
import ProfileModal from '../../../components/profiles/ProfilesModal';
import ModalMap from './../../../components/map/ModalMap';
import Content from './Content';

const MessageItem = (props) => {
  let content;
  switch (props.type) {
    case 'text':
      content = (
        <p className={props.yours ? classes.LeftContent : classes.RightContent}>
          <Content text={props.value} />
        </p>
      );
      break;

    case 'location':
      content = <ModalMap {...props} />;
      break;

    case 'audio':
      content = <audio src={props.value} controls />;
      break;

    default:
      break;
  }

  if (props.yours) {
    return (
      <div className={classes.LeftMessage}>
        <div>
          <img className={classes.Avatar} src={props.avatar} alt="avatar" />
        </div>

        <div className={classes.MessageBlock}>
          <span className={classes.LeftHeader}>
            <ProfileModal profile>{props.name}</ProfileModal> {props.time}
          </span>
          {content}
        </div>
      </div>
    );
  } else
    return (
      <div className={classes.RightMessage}>
        <div className={classes.MessageBlock}>
          <span className={classes.RightHeader}>
            <ProfileModal user={props.userData}>{props.name}</ProfileModal> {props.time}
          </span>
          {content}
        </div>

        <div>
          <img className={classes.Avatar} src={props.avatar} alt="avatar" />
        </div>
      </div>
    );
};
export default MessageItem;
