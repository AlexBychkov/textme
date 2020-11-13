import React, {Component} from 'react'
import classes from './InputTextArea.module.css'
import {TextField, IconButton} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

class TextArea extends Component {
	state = {
		inputValue: ''
	}
	

	createMessageObjectClickHandler = () => {
		let obj = {};
		obj.id = this.props.messagesData.length;
		obj.time = new Date().toLocaleTimeString()
		obj.messageValue = this.state.inputValue;
		obj.areYou = true;
		obj.user = {}
		this.setState({
			inputValue : ''
		})
		return obj
	}

	sendMessageOnClickHandler = (e) => {
		if (this.state.inputValue !== '') this.props.sendMessage(this.createMessageObjectClickHandler(),e)
	}
	

	sendMessageOnKeyUpHandler = (e) => {		
		if ((this.state.inputValue === `\n`) || (this.state.inputValue === '')) {
			this.setState({inputValue : ''});
			return
		}
		if (e.keyCode === 13)		
			this.props.sendMessage(this.createMessageObjectClickHandler(),e)
	}


	render() {
		return (
			<div className = {classes.TextArea}>
				<TextField
					onChange = {(e) => {this.setState({inputValue: e.target.value})}} 
					onKeyUp = {this.sendMessageOnKeyUpHandler}
					value = {this.state.inputValue}
					className = {classes.TextField}
					multiline 
					fullWidth
					rowsMax = '3' 
					rows = '2' 
					size = 'medium' 
					placeholder = 'TextHere'
				/>
				<IconButton onClick = {this.sendMessageOnClickHandler}>
					<SendIcon/>
				</IconButton>	
				
			</div>
		)
	}
	
}
export default TextArea