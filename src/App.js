import { useState } from "react";
import "./styles/bootstrap-custom-colors.scss";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import Button from "react-bootstrap/Button";
import LayoutMain from "./components/layouts/LayoutMain";
import { units, multipliers, distances } from "./utils/statics";
import { calculateRaceTime, convertSecondsToMinSecs } from "./functions";

function App() {
  const [paceSeconds, setPaceSeconds] = useState(600);
  const [paceUnit, setPaceUnit] = useState(units.KM);

  // const distance = {
  //   value: 3.1,
  //   unit: units.MILES,
  // };

  // const pace = {
  //   seconds: 600,
  //   unit: units.MILES,
  // };

  const distance = {
    value: 3.1,
    unit: units.MILES,
  };

  const pace = {
    seconds: paceSeconds,
    unit: units.MILES,
  };

  const { mins, seconds } = calculateRaceTime({ distance, pace });

  return (
    <LayoutMain>
      <h1 className="text-white pt-5 text-center">Race Pacer!</h1>

      <Form>
        <Form.Group>
          {/* <Form.Label className="text-white">Unit</Form.Label> */}

          <Form.Label className="text-white">Pace</Form.Label>
          <RangeSlider
            min={
              paceUnit === units.MILES
                ? 210
                : 210 * multipliers.KM_TO_MILES_MULTIPLIER
            }
            max={
              paceUnit === units.MILES
                ? 900
                : 900 * multipliers.KM_TO_MILES_MULTIPLIER
            }
            tooltipLabel={() => {
              const {
                mins: paceMins,
                seconds: remainingPaceSeconds,
              } = convertSecondsToMinSecs(paceSeconds);

              if (!!paceMins && !!remainingPaceSeconds) {
                return `${paceMins}m ${remainingPaceSeconds}s per ${paceUnit}`;
              }
              if (!!paceMins) {
                return `${paceMins}m per ${paceUnit}`;
              }
              if (!!remainingPaceSeconds) {
                return `${remainingPaceSeconds}s per ${paceUnit}`;
              }
            }}
            tooltip="on"
            value={paceSeconds}
            onChange={(e) => {
              setPaceSeconds(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <h3 className="text-white mt-5">Race Time:</h3>
      <p className="text-white">
        {!!mins && <>{mins} mins</>} {!!seconds && <>{seconds} seconds</>}
        
      </p>
    </LayoutMain>
  );
}

export default App;
