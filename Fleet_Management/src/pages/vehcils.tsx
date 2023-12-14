import Content from "../components/general/Content";
import NavBar from "../components/Nav/NavBar";
import NavBox from "../components/general/NavBox";
function vehcils(): JSX.Element {
  return (
    <div className=" text-red">
      <NavBar />
      <NavBox title={"Register"} />
      <Content />
    </div>
  );
}

export default vehcils;
