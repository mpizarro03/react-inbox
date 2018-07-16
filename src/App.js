import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToolBar from './components/toolbar.js'
import Messages from './components/messages.js'
import Compose from './components/compose.js'

const API = "http://localhost:8082/api/messages"
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allMessages: [],
      allSelected: false,
      someSelected: true,
      readCount: 4,
      showCompose: false,
      messageSubject: "",
      messageBody: ""
    }
  }

  async componentDidMount(){
    const response = await fetch(API)
    const JSON = await response.json()
    this.setState({allMessages: JSON})
  }
  async update(idArr, command, prop, value){
    let items = {
      messageIds: idArr,
      command: command,
      [prop]: value
    }
    const response = await fetch ('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(items),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const message = await response.json()
    console.log("message:", message)
    this.setState({allMessages: message})
  }
  star = (id) => {
    let value
    let allMessages = this.state.allMessages
    for(let i = 0; i < allMessages.length; i++) {
      if(allMessages[i].id === id) {
        if(allMessages[i].starred === true) {
          value = false
        }
        else {
          value = true
        }
      }
    }
    this.update([id], "star", "starred", value)
  }

  select = (id) => {
    this.setState({allSelected: false})
    let allMessages = this.state.allMessages

    for(let i = 0; i < allMessages.length; i++){
      if(allMessages[i].id === id) {
        if(allMessages[i].selected === true) {
          allMessages[i].selected = false
        }
        else {
          allMessages[i].selected = true
        }
      }
    }
    this.setState({allMessages: allMessages})

    let selected = allMessages.filter(message => message.selected === true)

    if(selected.length === 0){
      this.setState({allSelected: false, comeSelected: false})
    }
    else if(selected.length >= 1){
      this.setState({someSelected: true})
    }
    if(selected.length === allMessages.length){
      this.setState({allSelected: true})
    }
  }

  selectAll = (e) => {
    let allMessages = this.state.allMessages

    if(this.state.allSelected === false){
      allMessages.map(message => message.selected = true)
      this.setState({allSelected: true, someSelected: true})
    }
    else {
      allMessages.map(message => message.selected = false)
      this.setState({allSelected: false, someSelected: false})
    }
  }

  read = () => {
    let allMessages = this.state.allMessages
    let value
    let readMessages = allMessages.filter(message => message.selected)
    let readMessagesId = readMessages.map(message => message.id)
    readMessages.map(readMessage => value = true)
    this.update(readMessagesId, "read", "read", value)
  }

  unread = () => {
    let allMessages = this.state.allMessages
    let value
    let readMessages = allMessages.filter(message => message.selected)
    let unreadMessagesId = readMessages.map(message => message.id)
    readMessages.map(message => value = false)
    this.update(unreadMessagesId, "read", "read", value)
  }

  delete = (id) => {
    let allMessages = this.state.allMessages
    let deleteIds = allMessages.filter(message => message.selected).map(message => message.id)
    this.update(deleteIds, "delete", "selected", false)
  }

  addLabel = (e) => {
    let value = e.target.value
    let selectedMessagesId = this.state.allMessages
      .filter(selectedMessage => selectedMessage.selected)
      .map(selectedMessage => selectedMessage.id)

    this.update(selectedMessagesId, 'addLabel', "label", value)
  }

  removeLabel = (e) => {
    let value = e.target.value
    let selectedMessagesId = this.state.allMessages
      .filter(selectedMessage => selectedMessage.selected)
      .map(selectedMessage => selectedMessage.id)

    this.update(selectedMessagesId, 'removeLabel', "label", value)
  }

  toggleCompose = () => {
    this.state.showCompose ? this.setState({showCompose: false}) : this.setState({showCompose: true})
  }
  sendMessage = async (e) => {
      e.preventDefault()
      let items = {
        subject: this.state.messageSubject,
        body: this.state.messageBody
      }
      const response = await fetch ('http://localhost:8082/api/messages', {
        method: 'POST',
        body: JSON.stringify(items),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      const message = await response.json()
      this.setState({allMessages: [message,...this.state.allMessages]})
      this.toggleCompose()
  }
  
  createMessage = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <ToolBar
          selectAll={this.selectAll}
          allSelected={this.state.allSelected}
          someSelected={this.state.someSelected}
          read={this.read}
          unread={this.unread}
          readCount={this.state.readCount}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          delete={this.delete}
          toggleCompose={this.toggleCompose}/>

          {this.state.showCompose ? <Compose
            showCompose={this.state.showCompose}
            createMessage={this.createMessage}
            sendMessage={this.sendMessage}/> : ""}
        <Messages
          read={this.isRead}
          messages={this.state.allMessages}
          star={this.star}
          select={this.select}/>
      </div>
    );
  }
}

export default App;
