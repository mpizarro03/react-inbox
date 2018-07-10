import React from 'react';
import Message from './message.js';

const Messages = (props) => {
  return (
    <div>
      {props.messages.map(message=>
        <Message
        key={message.id}
        id={message.id}
        subject={message.subject}
        read={message.read}
        starred={message.starred}
        star={props.star}
        selected={message.selected}
        select={props.select}
        labels={message.labels}/>)}
    </div>
  )
}
export default Messages;
