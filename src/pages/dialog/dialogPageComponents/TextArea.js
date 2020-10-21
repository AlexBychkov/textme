import React, {Component} from 'react'
import classes from './TextArea.module.css'
import {TextField, IconButton} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

class TextArea extends Component {
	state = {
		// for Future Maybe. IDK
		// blankObj : null
	}
	messageVariable = null;

	createMessageObjectClickHandler = () => {
		let obj = {};
		obj.id = this.props.messagesData.length;
		obj.time = new Date().toLocaleTimeString()
		obj.messageValue = this.messageVariable;
		obj.areYou = true;
		obj.user = {}
		return obj
	}

	render() {
		return (
			<div className = {classes.TextArea}>
				<TextField
					onChange = {(e) => {
						this.messageVariable = e.target.value;
					}} 
					className = {classes.TextField}
					multiline 
					fullWidth
					rowsMax = '3' 
					rows = '2' 
					size = 'medium' 
					placeholder = 'Введите сообщение'
				/>
				<IconButton 
					onClick = {(e) => this.props.sendMessage(this.createMessageObjectClickHandler(), e)}
				>
					<SendIcon/>
				</IconButton>	
				
			</div>
		)
	}
	
}
export default TextArea