import FleetInfo from "./pages/FleetInfo";
import { Routes, Route } from "react-router-dom";
import Vehcils from "./pages/vehcils";
import Vehcil from "./pages/vehcil";
function App(): JSX.Element {
  return (
    <>
      {/* <FleetInfo /> */}
      {/* <Vehcils /> */}
      <Routes>
        <Route path="/AddVehcil" element={<Vehcils />} />
        <Route path="/Fleet" element={<FleetInfo />} />
        <Route path="/vehcil/:vehcilId" element={<Vehcil />} />
      </Routes>
      {/* <Button type="">My first button</Button> */}
    </>
  );
}

export default App;
