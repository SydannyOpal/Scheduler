// scheduled appointments render
export function getAppointmentsForDay({days, appointments}, dayName) {
  const day = days.find(day => day.name === dayName);

  if (!day) return [];

  const appointmentsForDay = day.appointments.map(id => appointments[`${id}`]);
  return appointmentsForDay;
}
// interviewers available
export function getInterviewersForDay({days, interviewers}, dayName) {
  const day = days.find(day => day.name === dayName);

  if (!day) return [];

  const interviewersForDay = day.interviewers.map(id => interviewers[`${id}`]);
  return interviewersForDay;
}
// render interview form
export function getInterview({interviewers}, interview) {
  if (!interview) return null;
  
  const {interviewer: interviewerId} = interview;
  const interviewer =  interviewers[`${interviewerId}`];
  
  return {...interview, interviewer}
}

