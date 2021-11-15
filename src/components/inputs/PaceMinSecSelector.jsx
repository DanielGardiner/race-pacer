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
              // const value = e.target.value || 0
              const value = e.target.value 
              const newInputMins = parseInt(value, 10)
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
            // onChange={(e) => {
            //   const value = e.target.value || 0
            //   const valueInt = parseInt(value, 10)
            //   console.log('%c valueInt ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', valueInt, '\n\n');
            //   setInputSeconds(valueInt)
            // }}
            // onBlur={() => {
            //   if (!isSecondsValid) {
            //     setInputSeconds(seconds)
            //   }
            // }}
            min={minSecondsInput}
            max={maxSecondsInput}
          />
        </Col>
      </Row>
    </>
  )

}

export default PaceSlider