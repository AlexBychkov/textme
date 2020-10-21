import React, {Component} from 'react'
import { Container } from '@material-ui/core';
import classes from './Dialog.module.css'
import MessageItemYours from './components/MessageItemYours'
import MessageItemNotYours from './components/MessageItemNotYours'
import InputTextArea from './components/InputTextArea'


export default class Dialog extends Component {

	state = {
		// Temporal data.....
		messagesData : [
			{
				id : 0, 
				time: new Date().toLocaleTimeString(), 
				user: {}, 
				messageValue : 'hello buddy',
				areYou: true	
			},
			{
				id : 1, 
				time: new Date().toLocaleTimeString(), 
				user: {}, 
				messageValue : 'hi'	,
				areYou: false	
			},
			{
				id : 2, 
				time: new Date().toLocaleTimeString(), 
				user: {}, 
				messageValue : 'How it\'s going',
				areYou: true	
			},
			{
				id : 3, 
				time: new Date().toLocaleTimeString(), 
				user: {}, 
				messageValue : 'As always, perfect!!As always, perfect!!As always, perfect!!As always, perfect!!As always, perfect!!As always, perfect!!As always, perfect!!As always, perfect!!As always, perfect!!',
				areYou: false	
			},
			{
				id : 4, 
				time: new Date().toLocaleTimeString(), 
				user: {}, 
				messageValue : 'Are you joking? loremadsasdfasdfAre you joking? loremadsasdfasdfAre you joking? loremadsasdfasdfAre you joking? loremadsasdfasdfAre you joking? loremadsasdfasdfAre you joking? loremadsasdfasdf',
				areYou: true	
			},

		]

	}


	
	sendMessageHandler = (objToPush) => {
		console.log(objToPush);
		const copy = [...this.state.messagesData];
		copy.push(objToPush);
		this.setState({
			messagesData: copy
		})	
			
		// Do we have better option to access element in React????
		// still workin  on it
		let x = document.getElementById('dialogFieldId')
		x.scrollTop = x.scrollHeight;
	}

	

	render() {
		return (
			<Container className = {classes.Container}> 
				<div className = {classes.Dialog}> 
					<div 
						id = 'dialogFieldId'
						className = {classes.DialogField}
					> 						
						{this.state.messagesData.map((value, index) => {
							if (value.areYou) {
								return (
									<MessageItemYours 
										key = {index}
										value = {value.messageValue} 
										time = {value.time}
										name = 'wolf'
										avatar = "https://i.pinimg.com/originals/c5/d6/6a/c5d66aa224f958d90a1c66f031fec857.jpg"
									/>
							)} else {
								return (
									<MessageItemNotYours
										key = {index}
										value = {value.messageValue}
										time = {value.time}
										name = 'tiger'
										avatar = 'https://www.nepalitimes.com/wp-content/uploads/2018/08/page-8-9a-1.jpg'
									/>
								)
							}	
						})}							
					</div>

					<InputTextArea 
						sendMessage = {this.sendMessageHandler}
						messagesData = {this.state.messagesData}
					/>
				</div>
			</Container>
		)
	}
}