import { units } from "../utils/statics";
import convertSecondsToMinSecs from "./convertSecondsToMinSecs";

/**
 * Add two numbers together
 * @param  {Object} distance The first number
 * @param  {Object} pace
 * @return {Object}      The total of the two numbers
 */

function calculateRaceTime({ distance, pace }) {
  const KM_TO_MILES_MULTIPLIER = 0.621371;

  const { value: distanceValue, unit: distanceUnit } = distance;
  const { seconds: paceSeconds, unit: paceUnit } = pace;

  const distanceInMiles =
    distanceUnit === units.MILES
      ? distanceValue
      : distanceValue * KM_TO_MILES_MULTIPLIER;

  const secondsToRunOneMile =
    paceUnit === units.MILES
      ? paceSeconds
      : paceSeconds * KM_TO_MILES_MULTIPLIER;

  const raceTimeSeconds = secondsToRunOneMile * distanceInMiles;

  const raceTime = convertSecondsToMinSecs(raceTimeSeconds);
  return raceTime;
}

export default calculateRaceTime;
