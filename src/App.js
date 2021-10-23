import { useState } from "react";
import "./styles/bootstrap-custom-colors.scss";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LayoutMain from "./components/layouts/LayoutMain";
import { units, multipliers, distances } from "./utils/statics";
import {
  calculateRaceTime,
  convertSecondsToHMS,
  convertSecondsToDisplayString,
} from "./functions";

function App() {
  const [paceSeconds, setPaceSeconds] = useState(600);
  const [paceUnit, setPaceUnit] = useState(units.MILES);

  // const distance = {
  //   value: 3.1,
  //   unit: units.MILES,
  // };

  // const pace = {
  //   seconds: 600,
  //   unit: units.MILES,
  // };

  const distance = {
    value: 5,
    unit: units.KM,
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
              const paceDisplayString = convertSecondsToDisplayString(
                paceSeconds
              );
              return paceDisplayString;

              // if (!!paceMins && !!remainingPaceSeconds) {
              //   return `${paceMins}m ${remainingPaceSeconds}s per ${paceUnit}`;
              // }
              // if (!!paceMins) {
              //   return `${paceMins}m per ${paceUnit}`;
              // }
              // if (!!remainingPaceSeconds) {
              //   return `${remainingPaceSeconds}s per ${paceUnit}`;
              // }
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
      <Container>
        {distances.map(
          ({ title, value: distanceValue, unit: distanceUnit }) => {
            const { hours, mins, seconds } = calculateRaceTime({
              distance: {
                value: distanceValue,
                unit: distanceUnit,
              },
              pace: {
                seconds: paceSeconds,
                unit: paceUnit,
              },
            });

            return (
              <Row className="text-white mt-1 mb-1">
                <Col className="p-0">{title}</Col>
                <Col>
                  {hours}h {mins}m {seconds}s
                </Col>
              </Row>
            );
          }
        )}
      </Container>
    </LayoutMain>
  );
}

export default App;
