import { useRef, useEffect, useState } from "react";
import "./styles/bootstrap-custom-colors.scss";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import LayoutMain from "./components/layouts/LayoutMain";
import { units, multipliers, distances } from "./utils/statics";
import { getRaceTimeDisplayString } from "./functions";
import PaceSlider from "./components/PaceSlider";
import PaceUnitSelector from "./components/PaceUnitSelector";
import RaceTimeResults from "./components/RaceTimeResults";

const DEFAULT_PACE_SECONDS = 600;
const MIN_PACE_SECONDS = 200;
const MAX_PACE_SECONDS = 1000;

function App() {
  const [paceSeconds, setPaceSeconds] = useState(DEFAULT_PACE_SECONDS);
  const [paceUnit, setPaceUnit] = useState(units.MILES);
  const [minSliderValue, setMinSliderValue] = useState(MIN_PACE_SECONDS);
  const [maxSliderValue, setMaxSliderValue] = useState(MAX_PACE_SECONDS);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }
    const newPaceSeconds =
      paceUnit === units.MILES
        ? paceSeconds / multipliers.KM_TO_MILES_MULTIPLIER
        : paceSeconds * multipliers.KM_TO_MILES_MULTIPLIER;

    const minSliderValue =
      paceUnit === units.MILES
        ? MIN_PACE_SECONDS
        : MIN_PACE_SECONDS * multipliers.KM_TO_MILES_MULTIPLIER;
    const maxSliderValue =
      paceUnit === units.MILES
        ? MAX_PACE_SECONDS
        : MAX_PACE_SECONDS * multipliers.KM_TO_MILES_MULTIPLIER;

    setPaceSeconds(newPaceSeconds);
    setMinSliderValue(minSliderValue);
    setMaxSliderValue(maxSliderValue);
  }, [paceUnit]);

  return (
    <LayoutMain>

  
      <Card>
        <Card.Header style={{ fontSize: "1.3rem", fontWeight: 400 }}>
          Options:
        </Card.Header>
        <Card.Body className="mt-2 mb-4">
          <ListGroup variant="flush">
            <ListGroup.Item className="pb-4">
              <Card.Title className="mb-4">1. Select your unit</Card.Title>
              <PaceUnitSelector paceUnit={paceUnit} setPaceUnit={setPaceUnit} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Title className="mb-4 mt-3">
                2. Select your pace per {paceUnit}
              </Card.Title>
              <PaceSlider
                paceSeconds={paceSeconds}
                paceUnit={paceUnit}
                setPaceSeconds={setPaceSeconds}
                minSliderValue={minSliderValue}
                maxSliderValue={maxSliderValue}
              />
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Header style={{ fontSize: "1.3rem", fontWeight: 400 }}>
          Race Time:
        </Card.Header>
        <Card.Body className="pt-1">
          <RaceTimeResults paceSeconds={paceSeconds} paceUnit={paceUnit} />
        </Card.Body>
      </Card>
    </LayoutMain>
  );
}

export default App;
