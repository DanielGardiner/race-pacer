import { useEffect, useState } from "react";
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
  return (
    <>
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