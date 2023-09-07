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
          <Col xs={12}>
            <h1>Lista de Pacientes</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>CURP</th>
                  <th>NSS</th>
                  <th>IMSS</th>
                  <th>ISSSTE</th>
                  <th>Militar</th>
                </tr>
              </thead>
              <tbody>
              {results.length > 0 && (
                  <>
                  {results.map((result, index) => (
                        <tr>
                          <td>{result.id}</td>
                          <td>{result.nombres}</td>
                          <td>{result.curp}</td>
                          <td>{result.nss}</td>
                          <td>{result.a_imss}</td>
                          <td>{result.a_issste}</td>
                          <td>{result.a_militar}</td>
                        </tr>
                      ))}
                  </>
              )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
