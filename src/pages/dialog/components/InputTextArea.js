import React, {Component} from 'react'
import classes from './InputTextArea.module.css'
import {TextField, IconButton} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import MenuDialog from '../../../components/menuDialog/MenuDialog';

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

	// Very small bug here below 
	// We don't have clear input after this handler. 
	// And because of that    if (this.state.inputValue !== '') 
	// pass handler when input have some sort of 'Enter key' input  'clear but not clear'
	// i'll fix this soon
	sendMessageOnKeyDownHandler = (e) => {
		if (this.state.inputValue !== '')
			if (e.key === 'Enter') {
				this.props.sendMessage(this.createMessageObjectClickHandler(),e)
			}
	}


	render() {
		return (
			<div className = {classes.TextArea}>
				<TextField
					onChange = {(e) => {
						this.setState({inputValue: e.target.value})
					}} 
					onKeyDown = {this.sendMessageOnKeyDownHandler}
					value = {this.state.inputValue}
					className = {classes.TextField}
					multiline 
					fullWidth
					rowsMax = '3' 
					rows = '2' 
					size = 'medium' 
					placeholder = 'Введите сообщение'
				/>
				<IconButton onClick = {this.sendMessageOnClickHandler}>
					<SendIcon/>
				</IconButton>	
				<IconButton>
					<MenuDialog /* sendMessage={this.sendMessageOnClickHandler} *//>
				</IconButton>	
				
			</div>
		)
	}
	
}
export default TextArea