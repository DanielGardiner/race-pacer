function convertSecondsToHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let mins = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - mins * 60; //  get seconds

  return { hours, mins, seconds };
}

export default convertSecondsToHMS;
