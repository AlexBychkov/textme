import React from 'react'
import classes from './MessageItem.module.css'

const MessageItemNotYours = props => {
	return (
		<div className = {classes.NotYourMessage}>
			<div className = {classes.NotYourMessageLeftBlock}>
				<span style = {{fontWeight: 100, fontSize: '0.7em'}}>{props.name}  {props.time}</span>
				<p>
					{props.value}
				</p>
			</div>							
			
			<div>
				<img src={props.avatar} alt = 'avatar'/>
			</div>
			
		</div>
	)
}
export default MessageItemNotYours;

