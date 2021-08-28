export function createDateAsUTC(date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
  );
}

export function convertDateToUTC(date) {
  date = new Date(date);
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  ).toLocaleDateString('de-DE');
}
