import { useState } from "react";
import "./styles/bootstrap-custom-colors.scss";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import LayoutMain from "./components/layouts/LayoutMain";
import { units, multipliers, distances } from "./utils/statics";
import { getPaceDisplayString, getRaceTimeDisplayString } from "./functions";
import PaceSlider from "./components/PaceSlider";

function App() {
  const [paceSeconds, setPaceSeconds] = useState(600);
  const [paceUnit, setPaceUnit] = useState(units.KM);

  const unitOptions = [
    { title: "Miles", value: units.MILES },
    { title: "Km", value: units.KM },
  ];

  return (
    <LayoutMain>
      <h1 className="text-white text-center" style={{ paddingTop: "6.5rem" }}>
        Race Pacer!
      </h1>

      <Card className="mt-5">
        <Card.Header style={{ fontSize: "1.3rem", fontWeight: 400 }}>
          Options:
        </Card.Header>
        <Card.Body className="mt-2 mb-4">
          <ListGroup variant="flush">
            <ListGroup.Item className="pb-4">
              <Card.Title className="mb-4">Unit</Card.Title>
              <ButtonGroup className="mb-2">
                {unitOptions.map(({ title, value }) => (
                  <ToggleButton
                    key={value}
                    type="radio"
                    variant="outline-primary"
                    value={value}
                    checked={value === paceUnit}
                    onClick={(e) => setPaceUnit(value)}
                  >
                    {title}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Title className="mb-4 mt-3">Pace</Card.Title>
              <PaceSlider
                paceSeconds={paceSeconds}
                paceUnit={paceUnit}
                setPaceSeconds={setPaceSeconds}
              />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

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
