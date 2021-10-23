import { units, multipliers } from "../utils/statics";
import convertSecondsToHMS from "./convertSecondsToHMS";

/**
 * Calculate race time given race distance and race pace
 * @param  {Object} distance in the following format:
 * { value: 10, unit: 'km' }
 * @param  {Object} pace in the following format:
 * { seconds: 531, unit: 'miles' }
 * @return {Object} race time in the following format:
 * { min: 59, seconds: 59 }
 */

function calculateRaceTime({ distance, pace }) {
  const { value: distanceValue, unit: distanceUnit } = distance;
  const { seconds: paceSeconds, unit: paceUnit } = pace;

  const distanceInMiles =
    distanceUnit === units.MILES
      ? distanceValue
      : distanceValue * multipliers.KM_TO_MILES_MULTIPLIER;

  const secondsToRunOneMile =
    paceUnit === units.MILES
      ? paceSeconds
      : paceSeconds * multipliers.KM_TO_MILES_MULTIPLIER;

  const raceTimeSeconds = secondsToRunOneMile * distanceInMiles;

  const raceTime = convertSecondsToHMS(raceTimeSeconds);
  return raceTime;
}

export default calculateRaceTime;
