import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { convertSecondsToHMS } from "../../functions";

function getIsInputValid(inputValue, minInputValue, maxInputValue) {
  return !!inputValue && inputValue >= minInputValue && inputValue <= maxInputValue
}

function PaceSlider({
  paceSeconds,
  setPaceSeconds,
  minSliderValue,
  maxSliderValue,
}) {
  const { mins: minMinuteInput } = convertSecondsToHMS(minSliderValue)
  const { mins: maxMinuteInput } = convertSecondsToHMS(maxSliderValue)
  const minSecondsInput = 0
  const maxSecondsInput = 59
  const { mins, seconds } = convertSecondsToHMS(paceSeconds)

  const [inputMins, setInputMins] = useState(mins)
  const [inputSeconds, setInputSeconds] = useState(seconds)

  const isMinsValid = getIsInputValid(inputMins, minMinuteInput, maxMinuteInput)
  const isSecondsValid = getIsInputValid(inputSeconds, minSecondsInput, maxSecondsInput)

  useEffect(() => {
    setInputMins(mins)
  }, [mins])

  useEffect(() => {
    setInputSeconds(seconds)
  }, [seconds])

  return (
    <>
      <Row
        className="mb-4"
        style={{ display: "flex" }}
      >
        <Col xs={6} sm={3} md={2} className="pr-0">
          Mins
          <Form.Control
            type="number"
            value={inputMins}
            onChange={(e) => {
              const newInputMins = parseInt(e.target.value, 10)
              setInputMins(newInputMins)

              const isValueValid = getIsInputValid(newInputMins, minMinuteInput, maxMinuteInput)
              if (isValueValid) {
                const paceSecondsNumber = newInputMins * 60 + seconds
                setPaceSeconds(paceSecondsNumber)
              }
            }}
            onBlur={() => {
              if (!isMinsValid) {
                setInputMins(mins)
              }
            }}
            min={minMinuteInput}
            max={maxMinuteInput}
          />
        </Col>
        <Col xs={6} sm={3} md={2}>
          Seconds
          <Form.Control type="number"
            value={inputSeconds}
            onChange={(e) => {
              const newInputSeconds = parseInt(e.target.value, 10)
              setInputSeconds(newInputSeconds)

              const isValueValid = getIsInputValid(newInputSeconds, minSecondsInput, maxSecondsInput)
              if (isValueValid) {
                const paceSecondsNumber = mins * 60 + newInputSeconds
                setPaceSeconds(paceSecondsNumber)
              }
            }}
            onBlur={() => {
              if (!isSecondsValid) {
                setInputSeconds(seconds)
              }
            }}
            min={minSecondsInput}
            max={maxSecondsInput}
          />
        </Col>
      </Row>
    </>
  )

}

export default PaceSlider

