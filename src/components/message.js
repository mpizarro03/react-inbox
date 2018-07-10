import React from 'react';
import Label from './label.js';

const Message = (props) => {
  // console.log("props:", props)
  console.log("read:", props.read)
  console.log("starred:", props.starred)
  // console.log("selected:", props.selected)
  // console.log("labels:", props.labels)
  return (
    <div className={`row message ${props.read ? "read" : "unread"}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={`${props.selected ? "defaultChecked" : ""}`} />
          </div>
          <div className="col-xs-2">
            <i className={`star fa ${props.starred ? "fa-star" : "fa-star-o"}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {props.labels.map(label =>
        <Label
        label={props.labels}/>)}
        <a href="#">{props.subject}</a>
      </div>
    </div>
    /*<div className="list-group-item">
      <div className="row">
        <div>{props.subject}</div>
        <div>{props.read}</div>
        <div>{props.starred}</div>
        <div>{props.selected}</div>
        <div>{props.labels}</div>
      </div>
    </div>*/
  );
}
export default Message;
