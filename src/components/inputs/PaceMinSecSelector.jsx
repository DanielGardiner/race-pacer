import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { convertSecondsToHMS } from "../../functions";

function getIsMinsValid(mins, minMins, maxMins) {
  return !!mins && mins >= minMins && mins <= maxMins
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


  const isMinsValid = getIsMinsValid(inputMins, minMinuteInput, maxMinuteInput)

  useEffect(() => {
    if (isMinsValid) {
      const paceSecondsNumber = inputMins * 60 + seconds
      setPaceSeconds(paceSecondsNumber)
    }
  }, [inputMins, isMinsValid, setPaceSeconds, seconds])


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
              const value = e.target.value || 0
              const valueInt = parseInt(value, 10)
              setInputMins(valueInt)
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
            value={seconds}
            onChange={(e) => {
              const paceSecondsNumber = mins * 60 + parseInt(e.target.value, 10)
              setPaceSeconds(paceSecondsNumber)
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