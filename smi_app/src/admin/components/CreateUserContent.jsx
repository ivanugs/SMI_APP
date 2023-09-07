import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AdminStyles.css";

export const CreateUserContent = () => {
  const [activeTab, setActiveTab] = useState("#info");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [paternalLastName, setPaternalLastName] = useState("");
  const [maternalLastName, setMaternalLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = (nombreCompleto) => {
    const normalizedFullName = nombreCompleto.replace(/\s+/g, "");
    const randomDigits = Math.floor(Math.random() * 900) + 100;
    const randomUppercaseLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const generatedPassword =
      normalizedFullName.substring(0, 10) +
      randomDigits +
      randomUppercaseLetter;

    return generatedPassword;
  };

  const handleGeneratePassword = () => {
    const fullName =
      firstName + " " + paternalLastName + " " + maternalLastName;
    const generatedPassword = generatePassword(fullName);
    setPassword(generatedPassword);
  };

  const handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 5000); // Show the password for 5 seconds
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log("Form submitted:", {
      firstName,
      paternalLastName,
      maternalLastName,
      email,
      password,
    });
  };

  return (
    <Row>
      <Col className="proffer-card mb-4">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#info">
              <Nav.Item>
                <Nav.Link href="#info">Información</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body className="detail-card">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Nombres</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Apellido Paterno</Form.Label>
                  <Form.Control
                    type="text"
                    value={paternalLastName}
                    onChange={(e) => setPaternalLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control
                    type="text"
                    value={maternalLastName}
                    onChange={(e) => setMaternalLastName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Correo</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Button
                    variant="secondary"
                    onClick={handleGeneratePassword}
                    className="ml-2"
                  >
                    Generar Contraseña
                  </Button>
                  <Button
                    variant="info"
                    onClick={handleShowPassword}
                    className="ml-2"
                  >
                    Mostrar Contraseña
                  </Button>
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
