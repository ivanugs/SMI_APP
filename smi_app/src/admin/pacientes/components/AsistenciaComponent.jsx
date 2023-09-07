import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./AsistenciaComponent.css";
import { Spinner } from "../../../ui/components/Spinner";
export const AsistenciaComponent = () => {
  return (
    <Row className="justify-content-center align-items-center text-center">
      <Col xs={6}>
        <Card className="attendance-card">
          <Card.Header>Registro de usuario</Card.Header>
          <Card.Body>
            <h2>Ingresa tu tarjeta al lector</h2>
            <Spinner />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
