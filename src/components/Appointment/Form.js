import React, { useState } from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form ({
  student: defaultStudent,
  interviewer: defaultInterviewer,
  interviewers,
  onSave,
  onCancel
}) {

  const [student, setStudent] = useState(defaultStudent || "");
  const [interviewer, setInterviewer] = useState(defaultInterviewer || null);

  const reset = () => {
    setInterviewer(null);
    setStudent("");
  }

  const cancel = () => {
    reset(); 
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          value={interviewer}
          onChange={setInterviewer}
          interviewers={interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}