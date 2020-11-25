import React from 'react';
import classes from './MessageItem.module.css';
import ProfileModal from '../../../components/profiles/ProfilesModal';
import ModalMap from '../../../components/map/ModalMap';

const MessageItemMap = (props) => {
   
    let styled;
    if (props.yours) {
        styled = {flexDirection: 'row', left: '5vw'};
    } else {
        styled = {flexDirection: 'row-reverse', left: '15vw'};
    }
  return (
    <div style={styled} className={classes.message}>
      <div>
        <img className={classes.Avatar} src={props.avatar} alt="avatar" />
      </div>

      <div className={classes.messageBlock}>
        <span>
          <ProfileModal profile>{props.name}</ProfileModal> {props.time}
        </span>
        <ModalMap {...props} />
      </div>
    </div>
  );
};
export default MessageItemMap;
