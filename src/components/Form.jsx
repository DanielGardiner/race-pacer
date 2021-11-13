import { useState } from "react";
import { motion } from 'framer-motion'
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { units, multipliers } from "../utils/statics";
import { useUpdateEffect } from "../hooks";

import PaceMinSecSelector from "./inputs/PaceMinSecSelector";
import PaceSlider from "./inputs/PaceSlider";
import PaceUnitSelector from "./inputs/PaceUnitSelector";
import RaceTimeResults from "./results/RaceTimeResults";

const DEFAULT_PACE_SECONDS = 600;
const MIN_PACE_SECONDS = 200;
const MAX_PACE_SECONDS = 1000;

function Form() {
  const [paceSeconds, setPaceSeconds] = useState(DEFAULT_PACE_SECONDS);
  const [paceUnit, setPaceUnit] = useState(units.MILES);
  const [minSliderValue, setMinSliderValue] = useState(MIN_PACE_SECONDS);
  const [maxSliderValue, setMaxSliderValue] = useState(MAX_PACE_SECONDS);

  useUpdateEffect(() => {


    setPaceSeconds((currentValue) => {
      const newPaceSeconds =
        paceUnit === units.MILES
          ? currentValue / multipliers.KM_TO_MILES_MULTIPLIER
          : currentValue * multipliers.KM_TO_MILES_MULTIPLIER;
      return newPaceSeconds
    });

    const newMinSliderValue =
      paceUnit === units.MILES
        ? MIN_PACE_SECONDS
        : MIN_PACE_SECONDS * multipliers.KM_TO_MILES_MULTIPLIER;

    const newMaxSliderValue =
      paceUnit === units.MILES
        ? MAX_PACE_SECONDS
        : MAX_PACE_SECONDS * multipliers.KM_TO_MILES_MULTIPLIER;

    setMinSliderValue(newMinSliderValue)

    setMaxSliderValue(newMaxSliderValue);

  }, [paceUnit])

  const formVariants = {
    initial: {
      opacity: 0,
      y: 150,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.2,
      }
    },
  }


  return (
    <motion.div
      variants={formVariants}
      initial='initial'
      animate='animate'
    >
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
              <PaceMinSecSelector
                paceSeconds={paceSeconds}
                setPaceSeconds={setPaceSeconds}
                minSliderValue={minSliderValue}
                maxSliderValue={maxSliderValue}
              />
              <PaceSlider
                paceSeconds={paceSeconds}
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
    </motion.div>
  )
}

export default Form;
