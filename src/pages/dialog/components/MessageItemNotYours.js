import React from 'react'
import classes from './MessageItem.module.css'

const MessageItemNotYours = props => {
	return (
		<div className = {classes.NotYourMessage}>
			<div className = {classes.NotYourMessageLeftBlock}>
				<span>{props.name}  {props.time}</span>
				<p>
					{props.value}
				</p>
			</div>							
			
			<div>
				<img className = {classes.Avatar} src={props.avatar} alt = 'avatar'/>
			</div>
			
		</div>
	)
}
export default MessageItemNotYours;

