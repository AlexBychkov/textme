import React from 'react';
import classes from './MessageItem.module.css';
import ProfileModal from '../../../components/profiles/ProfilesModal';

const MessageItemNotYours = (props) => {
  return (
    <div className={classes.NotYourMessage}>
      <div className={classes.NotYourMessageLeftBlock}>
        <span>
          <ProfileModal>{props.name}</ProfileModal> {props.time}
        </span>
        <p>{props.value}</p>
      </div>

      <div>
        <img className={classes.Avatar} src={props.avatar} alt="avatar" />
      </div>
    </div>
  );
};
export default MessageItemNotYours;
