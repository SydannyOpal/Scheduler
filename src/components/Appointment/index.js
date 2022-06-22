import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment({id, time, interview}) {

  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  return(
    <article className="appointment"> 
      <Header time={time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
        )} 
        {mode === CREATE && (
          <Form
          interviewers={[]}
          onSave={() => transition(SHOW)}
          onCancel={() => back()}
          />
        )} 
    </article>
  )
}

