import React, { useState } from "react";
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form({
  studentName: defaultStudentName,
  interviewerId: defaultInterviewerId,
  interviewers,
  onSave,
  onCancel,
}) {
  const [studentName, setStudentName] = useState(defaultStudentName || "");
  const [interviewerId, setInterviewerId] = useState(
    defaultInterviewerId || null
  );
  const [interviewerNameError, setInterviewerNameError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");

  const reset = () => {
    setInterviewerId(null);
    setStudentName("");
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const validate = () => {
    if (!studentName) {
      setStudentNameError("Student name cannot be blank");
      return;
    }
    setStudentNameError("");

    if (!interviewerId) {
      setInterviewerNameError("Please select an interviewer");
      return;
    }

    setInterviewerNameError("");
    onSave(studentName, interviewerId);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            value={studentName}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudentName(event.target.value)}
          />
        </form>

        <section className="appointment__validation">
          {studentNameError}
        </section>

        <InterviewerList
          value={interviewerId}
          onChange={setInterviewerId}
          interviewers={interviewers}
        />

        <section className="appointment__validation">
          {interviewerNameError}
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
