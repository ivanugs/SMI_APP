import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../../store/slices";

export const PacienteComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, pacientes = [] } = useSelector(
    (state) => state.pacientes
  );
  const [results, setResults] = useState([]);
  useEffect(() => {
    dispatch(getPatients());
  }, []);
  useEffect(() => {
    if (pacientes.length > 0 && !isLoading) {
      setResults(pacientes);
    }
  }, [pacientes, isLoading]);

  return (
    <Card className="content-card" >
      <Card.Body >
        <Row>
          <Col xs={10}>
            
          </Col>
          <Col xs={2}>
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
