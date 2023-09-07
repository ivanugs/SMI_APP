import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/slices";

export const ListUserContent = () => {
  const dispatch = useDispatch();
  const { isLoading, users = [] } = useSelector(
    (state) => state.users
  );
  const [results, setResults] = useState([]);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    if (users.length > 0 && !isLoading) {
      setResults(users);
    }
  }, [users, isLoading]);

  return (
    <Card className="content-card" >
      <Card.Body >
        <Row>
          <Col xs={12}>
            <h1>Lista de Usuarios</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>UUID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Usuario</th>
                </tr>
              </thead>
              <tbody>
              {results.length > 0 && (
                  <>
                  {results.map((result, index) => (
                        <tr>
                          <td>{result.uuid}</td>
                          <td>{result.first_name}</td>
                          <td>{result.email}</td>
                          <td>{result.username}</td>
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
