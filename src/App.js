import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToolBar from './components/toolbar.js'
import Messages from './components/messages.js'
import Compose from './components/compose.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allMessages: [],
      allSelected: false,
      someSelected: true,
      readCount: 4,
      showCompose: false
    }
    console.log("this.state:", this.state)
  }

  async componentDidMount(){
    const response = await fetch('http://localhost:8082/api/messages')
    const JSON = await response.json()
    console.log("Messages API call:", JSON)
    this.setState({allMessages: JSON})
  }
  async newMessage(item){
    let items = {
      subject: "",
      body: ""
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
    this.setState({allMessages: [...this.state.allMessages, message]})
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
    //update state to reflect that a message was starred
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

  read = (e) => {
    let allMessages = this.state.allMessages
    let readMessages = allMessages.filter(message => message.selected)
    readMessages.map(readMessage => readMessage.read = true)
    let read = allMessages.filter(message => message.read === false)
    this.setState({allMessages: allMessages, readCount: read.length})
  }
  unread = () => {
    let allMessages = this.state.allMessages
    let readMessages = allMessages.filter(message => message.selected)
    readMessages.map(message => message.read = false)

    let read = allMessages.filter(message => message.read === false)
    this.setState({allMessages: allMessages, readCount: read.length})
  }
  delete = () => {
    let allMessages = this.state.allMessages
    let notSelectedMessages = allMessages.filter(message => !message.selected)
    allMessages = [...notSelectedMessages]
    let read = allMessages.filter(message => message.read === false)
    this.setState({allMessages: allMessages, readCount: read.length, someSelected: false, allSelected: false})
  }
  addLabel = (e) => {
    let allMessages = this.state.allMessages
    let selectedMessages = allMessages.filter(selectedMessage => selectedMessage.selected)
    selectedMessages.map(selectedMessage => {
      if(!selectedMessage.labels.includes(e.target.value)){
        selectedMessage.labels.push(e.target.value)
      }
    })
    this.setState({allMessages: allMessages})
  }
  removeLabel = (e) => {
    let allMessages = this.state.allMessages
    let selectedMessages = allMessages.filter(selectedMessage => selectedMessage.selected)
    selectedMessages.map(selectedMessage => {
      let labels = selectedMessage.labels
      labels.map((label, index) => {
        labels.splice(index, 1)
      })
    })
    this.setState({allMessages: allMessages})
  }
  toggleCompose = () => {
    this.state.showCompose ? this.setState({showCompose: false}) : this.setState({showCompose: true})
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
            showCompose={this.state.showCompose}/> : ""}
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
