import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (studentName, interviewerId) => {
    const interview = {
      student: studentName,
      interviewer: interviewerId,
    };

    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  const cancelAppointment = () => transition(CONFIRM);
  const editAppointment = () => transition(EDIT);

  const confirmAppointmentDelete = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onCancel={cancelAppointment}
          onEdit={editAppointment}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          studentName={interview.student}
          interviewerId={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={confirmAppointmentDelete} />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onCancel={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onCancel={back} />
      )}

      {mode === SAVING && <Status status="Saving" />}
      {mode === DELETING && <Status status="Deleting" />}
    </article>
  );
}
