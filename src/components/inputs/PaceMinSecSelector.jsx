import { useEffect, useState, useRef } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import Button from "react-bootstrap/Button";
import { useOnClickOutside } from "../../hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { convertSecondsToHMS } from "../../functions";



function PaceSlider({
  paceSeconds,
  setPaceSeconds,
  minSliderValue,
  maxSliderValue,
}) {
  const { mins: minMinuteInput } = convertSecondsToHMS(minSliderValue)
  const { mins: maxMinuteInput } = convertSecondsToHMS(maxSliderValue)
  const { mins, seconds } = convertSecondsToHMS(paceSeconds)

  const minRef = useRef();
  const secRef = useRef();

  useOnClickOutside(minRef, () => {
    if (!inputMins || inputMins < minMinuteInput || inputMins > maxMinuteInput) {
      setInputMinds(mins)
    }
  })



  const [inputMins, setInputMinds] = useState(mins)

  useEffect(() => {
    setInputMinds(mins)
  }, [paceSeconds, setInputMinds, mins])


  return (
    <>
      <Row
        className="mb-4"
        style={{ display: "flex" }}
      >
        <Col xs={6} sm={3} md={2} className="pr-0">
          Mins
          <Form.Control
            ref={minRef}
            type="number"
            value={inputMins}
            onChange={(e) => {
              const value = e.target.value
              if (!value || value < minMinuteInput || value > maxMinuteInput) {
                setInputMinds(value)
              } else {
                const paceSecondsNumber = parseInt(value, 10) * 60 + seconds
                setPaceSeconds(paceSecondsNumber)
              }
            }}
            min={minMinuteInput}
            max={maxMinuteInput}
          />
        </Col>
        <Col xs={6} sm={3} md={2}>
          Seconds
          <Form.Control type="number"
            value={seconds}
            onChange={(e) => {
              const paceSecondsNumber = mins * 60 + parseInt(e.target.value, 10)
              setPaceSeconds(paceSecondsNumber)
            }}
            min={0}
            max={59}
          />
        </Col>
      </Row>
    </>
  )

}

export default PaceSlider