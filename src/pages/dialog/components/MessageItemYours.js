import React from 'react'
import classes from './MessageItem.module.css'

const MessageItemYours = props => {
	return (
		<div className = {classes.YourMessage}>
			<div>
				<img src={props.avatar} alt = 'avatar'/>
			</div>
			
			<div className = {classes.YourMessageRightBlock}>
				<span style = {{fontWeight: 100, fontSize: '0.7em'}}>{props.name}  {props.time}</span>
				<p>
					{props.value}	
				</p>
			</div>
			
		</div>
	)
}
export default MessageItemYours;