import { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { MiniSpinner } from "../../ui/components/MiniSpinner";
import "./NavBar.css";
import logo from "../../assets/logo.png";
export const NavBar = () => {
  const [expanded, setExpanded] = useState(false); // State para controlar si el menú está expandido o no
  const { startLogout, user } = useAuthStore();
  const { isCommonLoading } = useSelector((state) => state.common);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      bg="light"
      className="px-4 main-nav"
      expand="lg"
      expanded={expanded}
    >
      <Container fluid>
        <Navbar.Brand href="/">
        <img
              src={logo}
              className="img-fluid mx-auto imagen-fondo"
              alt=""
              style={{ width: '61px', height: 'auto' }}
            />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            {" "}
            {/* Ajustamos la clase a 'mx-auto' para centrar los elementos */}
            {/* Organizations */}
            <NavDropdown id="" title="Servicios" menuVariant="white">
              <NavDropdown.Item href="/servicios/">Lista</NavDropdown.Item>
              <NavDropdown.Item href="/servicios/buscar">
                Buscar
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown id="" title="Hospitales" menuVariant="white">
              <NavDropdown.Item href="/hospitales/cercano">
                Hospital Cercano
              </NavDropdown.Item>
              <NavDropdown.Item href="/hospitales/">Lista</NavDropdown.Item>
              <NavDropdown.Item href="/hospitales/buscar">
                Buscar
              </NavDropdown.Item>
            </NavDropdown>
            {/* Users */}
            <NavDropdown id="" title="Admin" menuVariant="white">
              <NavDropdown.Item href="/usuarios/">
                Usuarios
              </NavDropdown.Item>
              <NavDropdown.Item href="/usuarios/create">
                Crear Usuario
              </NavDropdown.Item>
              <NavDropdown.Item href="/pacientes/">Pacientes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <i className="fa-solid fa-user"></i>
            <NavDropdown
              id=""
              title={user.name}
              menuVariant="white"
              align="end"
              className="profile-menu"
            >
              <NavDropdown.Item>Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={startLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {isCommonLoading && <MiniSpinner />}
      </Container>
    </Navbar>
  );
};
