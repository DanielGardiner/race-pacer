import calculateRaceTime from "./calculateRaceTime";
import getDisplayString from "./getDisplayString";

/**
 * Get race time display string
 * @param  {Object} distance in the following format:
 * { value: 10, unit: 'km' }
 * @param  {Object} pace in the following format:
 * { seconds: 531, unit: 'miles' }
 * @return {Object} race time display string in the following format:
 * '3h 59m 27s'
 */
function getRaceTimeDisplayString({ distance, pace, hasLeadingZero = false }) {
  const { hours, mins, seconds } = calculateRaceTime({
    distance,
    pace,
  });

  const displayString = getDisplayString({
    hours,
    mins,
    seconds,
    hasLeadingZero,
  });

  return displayString;
}

export default getRaceTimeDisplayString;
