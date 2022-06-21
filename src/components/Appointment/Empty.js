import React from "react";
import "components/Appointment/styles.scss"

export default function Empty({onAdd}) {

  return(
    <main className="appointment__add">
      <img 
        onClick={onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  )
}