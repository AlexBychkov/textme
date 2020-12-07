import React from 'react';
import classes from './MessageItem.module.css';
import ProfileModal from '../../../components/profiles/ProfilesModal';
import ModalMap from '../../../components/map/ModalMap';

const MessageItemMap = (props) => {
   
    let styled, messageContainer, messageHeader;
    if (props.yours) {
        styled = {flexDirection: 'row'};
        messageHeader = classes.LeftHeader
        messageContainer = classes.LeftMessage
    } else {
        styled = {flexDirection: 'row-reverse'};
        messageHeader = classes.RightHeader
        messageContainer = classes.RightMessage
    }
  return (
    <div style={styled} className={messageContainer}>
      <div>
        <img className={classes.Avatar} src={props.avatar} alt="avatar" />
      </div>

      <div className={classes.MessageBlock}>
        <span className = {messageHeader}>
          <ProfileModal profile>{props.name}</ProfileModal> {props.time}
        </span>
        <ModalMap {...props} />
      </div>
    </div>
  );
};
export default MessageItemMap;
