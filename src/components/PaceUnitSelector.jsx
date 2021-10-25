import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { units } from "../utils/statics";

function PaceUnitSelector({ paceUnit, setPaceUnit }) {
  const unitOptions = [
    { title: "Miles", value: units.MILES },
    { title: "Km", value: units.KM },
  ];

  return (
    <ButtonGroup className="mb-2">
      {unitOptions.map(({ title, value }) => (
        <ToggleButton
          key={value}
          type="radio"
          variant="outline-primary"
          value={value}
          checked={value === paceUnit}
          onClick={(e) => setPaceUnit(value)}
          style={{ minWidth: 70 }}
        >
          {title}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )
}

export default PaceUnitSelector