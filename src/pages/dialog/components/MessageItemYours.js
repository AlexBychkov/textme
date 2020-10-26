import React from 'react'
import classes from './MessageItem.module.css'

const MessageItemYours = props => {
	return (
		<div className = {classes.YourMessage}>
			<div>
				<img className = {classes.Avatar} src={props.avatar} alt = 'avatar'/>
			</div>
			
			<div className = {classes.YourMessageRightBlock}>
				<span>{props.name}  {props.time}</span>
				<p>
					{props.value}	
				</p>
			</div>
			
		</div>
	)
}
export default MessageItemYours;