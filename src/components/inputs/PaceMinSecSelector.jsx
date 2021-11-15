import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { convertSecondsToHMS } from "../../functions";

function validateInput(inputValue, minInputValue, maxInputValue) {
  if (!!inputValue && inputValue >= minInputValue && inputValue <= maxInputValue) return true
  throw new Error('Validation error')
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

  const [isMinsErrored, setIsMinsErrored] = useState(false)
  const [isSecondsErrored, setIsSecondsErrored] = useState(false)

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
              try {
                const newInputMins = parseInt(e.target.value, 10)
                setInputMins(newInputMins)

                validateInput(newInputMins, minMinuteInput, maxMinuteInput)

                setIsMinsErrored(false)
                const paceSecondsNumber = newInputMins * 60 + seconds
                setPaceSeconds(paceSecondsNumber)
              } catch (e) {
                setIsMinsErrored(true)
              }
            }}
            onBlur={() => {
              try {
                setIsMinsErrored(false)
                validateInput(inputMins, minMinuteInput, maxMinuteInput)
              } catch (e) {
                setInputMins(mins)
              }
            }}
            style={{ borderColor: isMinsErrored && 'red', color: isMinsErrored && 'red' }}
            min={minMinuteInput}
            max={maxMinuteInput}
          />
        </Col>
        <Col xs={6} sm={3} md={2}>
          Seconds
          <Form.Control type="number"
            value={inputSeconds}
            onChange={(e) => {
              try {
                const newInputSeconds = parseInt(e.target.value, 10)
                setInputSeconds(newInputSeconds)

                validateInput(newInputSeconds, minSecondsInput, maxSecondsInput)

                setIsSecondsErrored(false)
                const paceSecondsNumber = mins * 60 + newInputSeconds
                setPaceSeconds(paceSecondsNumber)

              } catch (e) {
                setIsSecondsErrored(true)
              }
            }}
            onBlur={() => {
              try {
                setIsSecondsErrored(false)
                validateInput(inputSeconds, minSecondsInput, maxSecondsInput)
              } catch (e) {
                setInputSeconds(seconds)
              }
            }}
            style={{ borderColor: isSecondsErrored && 'red', color: isSecondsErrored && 'red' }}
            min={minSecondsInput}
            max={maxSecondsInput}
          />
        </Col>
      </Row>
    </>
  )

}

export default PaceSlider

