import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
// what are the available spots? updates according to booking stays same when edited
const updateSpots = (appointments) => {
 const selectedDay = state.days.find(day => day.name === state.day)
 const appointmentSlots = selectedDay.appointments.map(appointmentId => appointments[appointmentId].interview)
 const spotsRemaining = appointmentSlots.filter(appointment => appointment === null).length
 selectedDay.spots = spotsRemaining;
}
// add a new appointment
  const bookInterview = (appointmentId, interview) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };

    return axios
      .put(`/api/appointments/${appointmentId}`, { interview })
      .then(() => {
        updateSpots(appointments);
        setState({ ...state, appointments, days: [...state.days] });
      });
  };
// removes appoitment from schedule
  const cancelInterview = (appointmentId) => {
    const appointment = state.appointments[appointmentId];
    appointment.interview = null;

    const appointments = {
      ...state.appointments,
    };

    return axios
      .delete(`/api/appointments/${appointmentId}`)
      .then(() => {
        updateSpots(appointments);
        setState({ ...state, appointments, days: [...state.days] });
      });
  };

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
