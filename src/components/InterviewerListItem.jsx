import classNames from "classnames";
import React from "react";
import "components/InterviewerListItem.scss";

export default function InterviewListItem(props) {
  const interviewListItemClass = classNames('interviewers__item',{
    'interviewers__item--selected': props.selected
  })

  return(
    <li 
      className={interviewListItemClass} 
      onClick={props.setInterviewer}>
      
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
     {props.selected ? props.name : undefined}
    </li>
  )
}
