import "./styles/bootstrap-custom-colors.scss";
import Button from "react-bootstrap/Button";
import LayoutMain from "./components/layouts/LayoutMain";
import { units } from "./utils/statics";
import { calculateRaceTime } from "./functions";

function App() {
  const distance = {
    value: 10,
    unit: units.KM,
  };

  const pace = {
    seconds: 531,
    unit: units.MILES,
  };

  const raceTime = calculateRaceTime({ distance, pace });

  return (
    <LayoutMain>
      <h1 className="text-white pt-5 text-center">Race Pacer!</h1>
    </LayoutMain>
  );
}

export default App;
