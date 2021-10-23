function getDisplayString({ hours, mins, seconds, hasLeadingZero = false }) {
  let displayString = "";

  if (hasLeadingZero) {
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  }

  if (hours) {
    displayString += `${hours}h `;
  }
  if (mins) {
    displayString += `${mins}m `;
  }
  if (seconds) {
    displayString += `${seconds}s`;
  }
  return displayString.trim();
}

export default getDisplayString;
