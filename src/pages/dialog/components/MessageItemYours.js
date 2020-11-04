import React from 'react'
import classes from './MessageItem.module.css'
import ProfileModal from '../../../components/profiles/ProfilesModal'

const MessageItemYours = props => {
	return (
		<div className = {classes.YourMessage}>
			<div>
				<img className = {classes.Avatar} src={props.avatar} alt = 'avatar'/>
			</div>
			
			<div className = {classes.YourMessageRightBlock}>
				<span><ProfileModal profile>{props.name}</ProfileModal>  {props.time}</span>
				<p>
					{props.value}	
				</p>
			</div>
			
		</div>
	)
}
export default MessageItemYours;