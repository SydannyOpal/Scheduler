export function getAppointmentsForDay({days, appointments}, dayName) {
  const day = days.find(day => day.name === dayName);

  if (!day) return [];

  const appointmentsForDay = day.appointments.map(id => appointments[`${id}`]);
  return appointmentsForDay ;
}