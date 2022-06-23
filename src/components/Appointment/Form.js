import React, { useState } from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form ({
  studentName: defaultStudentName,
  interviewerId: defaultInterviewerId,
  interviewers,
  onSave,
  onCancel
}) {
  const [studentName, setStudentName] = useState(defaultStudentName || "");
  const [interviewerId, setInterviewerId] = useState(defaultInterviewerId || null);

  const reset = () => {
    setInterviewerId(null);
    setStudentName("");
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
            value={studentName}
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setStudentName(event.target.value)}
          />
        </form>
        <InterviewerList 
          value={interviewerId}
          onChange={setInterviewerId}
          interviewers={interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => onSave(studentName, interviewerId)}>Save</Button>
        </section>
      </section>
    </main>
  )
}