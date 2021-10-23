import { useState } from "react";
import "./styles/bootstrap-custom-colors.scss";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import LayoutMain from "./components/layouts/LayoutMain";
import { units, multipliers, distances } from "./utils/statics";
import { getPaceDisplayString, getRaceTimeDisplayString } from "./functions";

function App() {
  const [paceSeconds, setPaceSeconds] = useState(600);
  const [paceUnit, setPaceUnit] = useState(units.KM);

  const minSliderValue =
    paceUnit === units.MILES ? 210 : 210 * multipliers.KM_TO_MILES_MULTIPLIER;
  const maxSliderValue =
    paceUnit === units.MILES ? 900 : 900 * multipliers.KM_TO_MILES_MULTIPLIER;

  return (
    <LayoutMain>
      <h1 className="text-white text-center" style={{ paddingTop: "6.5rem" }}>
        Race Pacer!
      </h1>

      <Form>
        <Form.Group>
          {/* <Form.Label className="text-white">Unit</Form.Label> */}

          <Form.Label className="text-white mt-5">Pace</Form.Label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button
                className="m-0"
                onClick={() => {
                  const newPaceSeconds = paceSeconds - 5;
                  setPaceSeconds(
                    newPaceSeconds < minSliderValue
                      ? minSliderValue
                      : newPaceSeconds
                  );
                }}
              >
                &larr;
              </Button>
            </div>
            <div style={{ width: "80%" }}>
              <RangeSlider
                min={minSliderValue}
                max={maxSliderValue}
                tooltipLabel={() => {
                  const paceDisplayString = getPaceDisplayString(paceSeconds);
                  return paceDisplayString;
                }}
                tooltip="on"
                value={paceSeconds}
                onChange={(e) => {
                  const newPaceSeconds = parseInt(e.target.value, 10);
                  setPaceSeconds(newPaceSeconds);
                }}
              />
            </div>
            <div>
              <Button
                className="m-0"
                onClick={() => {
                  const newPaceSeconds = paceSeconds + 5;
                  setPaceSeconds(
                    newPaceSeconds > maxSliderValue
                      ? maxSliderValue
                      : newPaceSeconds
                  );
                }}
              >
                &rarr;
              </Button>
            </div>
          </div>
        </Form.Group>
      </Form>

      <Card className="mt-5">
        <Card.Header style={{ fontSize: "1.3rem", fontWeight: 400 }}>
          Race Time:
        </Card.Header>
        <Card.Body className="pt-1">
          {distances.map(
            ({ title, value: distanceValue, unit: distanceUnit }) => {
              const raceTimeDisplayString = getRaceTimeDisplayString({
                distance: {
                  value: distanceValue,
                  unit: distanceUnit,
                },
                pace: {
                  seconds: paceSeconds,
                  unit: paceUnit,
                },
                hasLeadingZero: true,
              });

              return (
                <Row className="text-black mt-2" key={title}>
                  <Col className="pl-3" xs={6} md={3}>
                    {title}
                  </Col>
                  <Col className="p-0" xs={6} md={4}>
                    {raceTimeDisplayString}
                  </Col>
                </Row>
              );
            }
          )}
        </Card.Body>
      </Card>
    </LayoutMain>
  );
}

export default App;
