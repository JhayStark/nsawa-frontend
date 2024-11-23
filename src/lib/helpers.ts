export function formatDateToString(date: string) {
  const dateToFormat = new Date(date);
  return dateToFormat.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function checkActiveFuneral(date: string) {
  const dateToCheck = new Date(date);
  const todaysDate = new Date();
  dateToCheck.setHours(0, 0, 0, 0);
  todaysDate.setHours(0, 0, 0, 0);

  return dateToCheck > todaysDate;
}
