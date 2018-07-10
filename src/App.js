import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ToolBar from './components/toolbar.js'
import Messages from './components/messages.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      allMessages: [
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
    }
  }
star = (id) => {
  let allMessages = this.state.allMessages


  //updated state to reflect that that item was starred
  for(let i = 0; i < allMessages.length; i++) {
    if(allMessages[i].id === id) {
      if(allMessages[i].starred === true) {
        allMessages[i].starred = false
      }
      else if(allMessages[i].starred === false){
        allMessages[i].starred = true
      }
    }
  }

  this.forceUpdate()
}
  render() {
    // console.log("this.state.message:", this.state.messages)
    return (
      <div className="container">
        <ToolBar/>
        <Messages
          messages={this.state.allMessages}
          star={this.star}
        />
      </div>
    );
  }
}

export default App;
