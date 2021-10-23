import convertSecondsToHMS from "./convertSecondsToHMS";
import getDisplayString from "./getDisplayString";

/**
 * Get race time display string
 * @param  {Number} seconds
 * @return {Object} pace display string in the following format:
 * '3h 59m 27s'
 */
function getPaceDisplayString(seconds) {
  const { hours, mins, seconds: secs } = convertSecondsToHMS(seconds);

  const displayString = getDisplayString({ hours, mins, seconds: secs });

  return displayString;
}

export default getPaceDisplayString;
