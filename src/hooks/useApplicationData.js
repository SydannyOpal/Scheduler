import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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

  const updateSpots = (apptId, shouldAddSpots) => {
    // const daysWithAppointment = state.days.filter(day => day.appointments.includes(apptId));
    const day = state.days.find((day) => day.appointments.includes(apptId));
    day.spots += shouldAddSpots ? 1 : -1;

    // for (let day of daysWithAppointment){
    //   day.spots += shouldAddSpots ? 1 : -1;
    // }
  };

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
      .then((response) => {
        updateSpots(appointmentId, false);
        setState({ ...state, appointments, days: [...state.days] });
      });
  };

  const cancelInterview = (appointmentId) => {
    const appointment = state.appointments[appointmentId];
    appointment.interview = null;

    const appointments = {
      ...state.appointments,
    };

    return axios
      .delete(`/api/appointments/${appointmentId}`)
      .then((response) => {
        updateSpots(appointmentId, true);
        setState({ ...state, appointments, days: [...state.days] });
      });
  };

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}