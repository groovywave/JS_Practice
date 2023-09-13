export function withinThreeDays(day) {
  const today = new Date();
  const msInThreeDays = 30 * 24 * 60 * 60 * 1000;
  const diff = today.getTime() - day.getTime();
  return diff < msInThreeDays;
}

