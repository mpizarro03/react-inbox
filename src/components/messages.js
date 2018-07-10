import React from 'react';
import Message from './message.js';

const Messages = (props) => {
  return (
    <div className="container">
      {props.messages.map(message=>
        <Message
        key={message.id}
        subject={message.subject}
        read={message.read}
        starred={message.starred}
        selected={message.selected}
        labels={message.labels}/>)}
    </div>
  )
}
export default Messages;
