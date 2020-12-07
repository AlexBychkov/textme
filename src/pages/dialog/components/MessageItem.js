import React from 'react';
import classes from './MessageItem.module.css';
import ProfileModal from '../../../components/profiles/ProfilesModal';

const MessageItem = (props) => {
	if (props.yours) { 
		return (
			<div className={classes.LeftMessage}>
			  <div>
				<img className={classes.Avatar} src={props.avatar} alt="avatar" />
			  </div>
		
			  <div className = {classes.MessageBlock}>
				<span className = {classes.LeftHeader}>
				  <ProfileModal profile>{props.name}</ProfileModal> {props.time}
				</span>
				<p className={classes.LeftContent}>{props.value}</p>
			  </div>
			</div>
		  );
	}
	else return (
			<div className={classes.RightMessage}>
			  <div className={classes.MessageBlock}>
				<span className = {classes.RightHeader}>
				  <ProfileModal>{props.name}</ProfileModal> {props.time}
				</span>
				<p className = {classes.RightContent}>{props.value}</p>
			  </div>
		
			  <div>
				<img className={classes.Avatar} src={props.avatar} alt="avatar" />
			  </div>
			</div>
		  );
	

  
};
export default MessageItem;
