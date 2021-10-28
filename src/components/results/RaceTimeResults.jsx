import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { distances } from "../../utils/statics";
import { getRaceTimeDisplayString } from "../../functions";

function RaceTimeResults({ paceSeconds, paceUnit }) {
  return (
    <>
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
    </>
  )
}

export default RaceTimeResults