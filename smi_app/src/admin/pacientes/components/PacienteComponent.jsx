import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getPatients, assignPatientCard, unassignPatientCard } from "../../../store/slices";
import Swal from "sweetalert2";

export const PacienteComponent = () => {
  const dispatch = useDispatch();
  const { isLoading, pacientes = [] } = useSelector((state) => state.pacientes);
  const [results, setResults] = useState([]);
  useEffect(() => {
    dispatch(getPatients());
  }, []);
  useEffect(() => {
    if (pacientes.length > 0 && !isLoading) {
      setResults(pacientes);
    }
  }, [pacientes, isLoading]);

  const handleAssignCard = async (uuid) => {
    try {
      Swal.fire({
        title: "Acerca tu Tarjeta",
        html: '<div class="spinner"></div><div style="margin-top: 10px;">Se vinculará con tu vuenta...</div>',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      await dispatch(assignPatientCard(uuid));
      Swal.fire({
        icon: "success",
        title: "La credencial ha sido asignada!",
        text: "Ahora puede ser registrado en las unidades médicas",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo asignar la credencial",
      });
    }
  };

  const handleUnassignCard = async (uuid) => {
    try {
      await dispatch(unassignPatientCard(uuid));
      Swal.fire({
        icon: "success",
        title: "La credencial se ha desasignado!",
        text: "Ahora puede ser registrado en las unidades médicas",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo asignar la credencial",
      });
    }
  };

  return (
    <Card className="content-card">
      <Card.Body>
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
                  <th>Tiene Tarjeta</th>
                  <th>Acciones</th>
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
                        <td>{result.nss ? "SÍ" : "NO"}</td>
                        <td>{result.a_imss ? "SÍ" : "NO"}</td>
                        <td>{result.a_issste ? "SÍ" : "NO"}</td>
                        <td>{result.a_militar ? "SÍ" : "NO"}</td>
                        <td>{result.tiene_tarjeta ? "SÍ" : "NO"}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              handleAssignCard(result.uuid);
                            }}
                            title="Registrar Tarjeta "
                            disabled={result.tiene_tarjeta}
                          >
                            <i className="fab fa-telegram text-white"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleUnassignCard(result.uuid);
                            }}
                            title="Desasignar Tarjeta "
                            disabled={!result.tiene_tarjeta}
                          >
                            <i className="fab fa-times text-white"></i>
                          </button>
                        </td>
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
