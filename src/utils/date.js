export function createDateAsUTC(date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  );
}

export function convertUTCToDate(date) {
  date = new Date(date);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
export function convertUTCToDateString(date) {
  return convertUTCToDate(date).toLocaleDateString('de-DE');
}
export function convertUTCToDateTimeString(date) {
  return `${convertUTCToDateString(date)} - ${convertUTCToDate(date).toLocaleTimeString('de-DE')}`;
}
