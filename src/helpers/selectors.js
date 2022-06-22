export function getAppointmentsForDay({days, appointments}, dayName) {
  const day = days.find(day => day.name === dayName);

  if (!day) return [];

  const appointmentsForDay = day.appointments.map(id => appointments[`${id}`]);
  return appointmentsForDay;
}

export function getInterview({interviewers}, interview) {
  if (!interview) return null;
  
  const {interviewer: interviewerId} = interview;
  const interviewer =  interviewers[`${interviewerId}`];
  
  return {...interview, interviewer}
}

