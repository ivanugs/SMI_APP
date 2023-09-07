import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./AsistenciaComponent.css";
import { Spinner } from "../../../ui/components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { sendRegister } from "../../../store/slices";

export const AsistenciaComponent = () => {
  const { isLoading, register = {} } = useSelector((state) => state.hospitales);
  const [results, setResults] = useState({});
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(sendRegister());
    } catch (error) {
      // Manejar errores si es necesario
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (register && !isLoading){
      
      setResults(register);
    }
  }, [register, isLoading]); 

  return (
    <Row className="justify-content-center align-items-center text-center">
      <Col xs={6}>
        <Card className="attendance-card">
          <Card.Header>Registro de usuario</Card.Header>
          <Card.Body>
            <h2>Ingresa tu tarjeta al lector</h2>
            {isLoading && <Spinner />}
            {!isLoading && Object.keys(results).length !== 0 && (
              <>
                <p>Bienvenido {results.paciente}</p>
                <p>Hora de registro {results.hora}</p>
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
