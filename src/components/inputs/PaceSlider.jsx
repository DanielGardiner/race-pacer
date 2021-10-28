import RangeSlider from "react-bootstrap-range-slider";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { getPaceDisplayString, convertSecondsToHMS } from "../../functions";



function PaceSlider({
  paceSeconds,
  setPaceSeconds,
  minSliderValue,
  maxSliderValue,
}) {
  const { mins: minMinuteInput } = convertSecondsToHMS(minSliderValue)
  const { mins: maxMinuteInput } = convertSecondsToHMS(maxSliderValue)
  const { mins, seconds } = convertSecondsToHMS(paceSeconds)

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
            value={mins}
            onChange={(e) => {
              const paceSecondsNumber = parseInt(e.target.value, 10) * 60 + seconds
              setPaceSeconds(paceSecondsNumber)
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
    </>
  )

}

export default PaceSlider