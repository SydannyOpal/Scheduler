import React, { Fragment, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "./Appointment";
import "components/Appointment/styles.scss";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  // const setDays = (days) => setState(prev => ({...prev, days}));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const getDaysFromApi = async () => {
  //   const {data} = await axios.get('/api/days')
  //   return data;
  // };

  // useEffect(() => {
  //   getDaysFromApi()
  //   .then(appointments.setdays)
  //   .catch(console.error)
  // }, []);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  //   axios.get("/api/days", "/api/appointments").then(response => setState(response.data));

  // }, []);

  // Promise.all([
  //   Promise.resolve('http://localhost:8001/api/days,'),
  //   Promise.resolve('http://localhost:8001/api/appointments,'),
  //   Promise.resolve('http://localhost:8001/api/interviewers'),
  // ]).then((all) => {
  //   setState(prev => ({...prev, days: all[0], appointments: all[1], interviewers: all[2] }));  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {dailyAppointments.map((appointment) => (
            <Appointment key={appointment.id} {...appointment} />
          ))}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
