import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToolBar from './components/toolbar.js'
import Messages from './components/messages.js'

const messagesData = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allMessages: [...messagesData],
      allSelected: false,
      someSelected: true,
      readCount: 4
    }
  }
star = (id) => {
  let allMessages = this.state.allMessages
  //update state to reflect that a message was starred
  for(let i = 0; i < allMessages.length; i++) {
    if(allMessages[i].id === id) {
      if(allMessages[i].starred === true) {
        allMessages[i].starred = false
      }
      else {
        allMessages[i].starred = true
      }
    }
  }
  this.setState({allMessages: allMessages})
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
        />
        <Messages
          read={this.isRead}
          messages={this.state.allMessages}
          star={this.star}
          select={this.select}
        />
      </div>
    );
  }
}

export default App;
