import { NavBar } from "../components/NavBar";
import Container from "react-bootstrap/Container";
import "./AppLayout.css";

export const AppLayout = ({ children }) => {
  return (
    <>
      <div className="content-color">
        <NavBar></NavBar>
          <Container fluid className="parent-container" >{children}</Container>
      </div>
    </>
  );
};
