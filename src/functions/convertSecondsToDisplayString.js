import convertSecondsToHMS from "./convertSecondsToHMS";

function convertSecondsToDisplayString(value) {
  const { hours, mins, seconds } = convertSecondsToHMS(value);
  let displayString = "";

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

export default convertSecondsToDisplayString;
