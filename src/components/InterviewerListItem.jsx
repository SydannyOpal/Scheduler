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

// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.
// setInterviewer:function - is run when the <InterviewerListItem> is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.