import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getHospitals } from "../../store/slices";
import "./HospitalComponent.css";
import { BasicHospitalResultCard } from "../components/common/BasicHospitalResultCard";

export const HospitalesComponent = () => {
  const dispatch = useDispatch();
  const position = [20.4043, -103.314];
  const { isLoading, hospitales = [] } = useSelector(
    (state) => state.hospitales
  );
  const [results, setResults] = useState([]);
  useEffect(() => {
    dispatch(getHospitals());
  }, []);
  useEffect(() => {
    if (hospitales.length > 0 && !isLoading) {
      setResults(hospitales);
    }
  }, [hospitales, isLoading]);

  return (
    <Card className="content-card" >
      <Card.Body >
        <Row>
          <Col xs={10}>
            <MapContainer
              center={position}
              zoom={13}
              style={{ width: "100%", height: "calc(85vh - 4rem)" }}
            >
              <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {results.length > 0 && (
                <>
                  {results.map((result, index) => (
                    <Marker position={[result.lat, result.long]}>
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  ))}
                </>
              )}
            </MapContainer>
          </Col>
          <Col xs={2}>
            <h2 className="title">Hospitales Disponibles</h2>
            <div className="custom-listgroup overflow-auto">
              {results.length > 0 && (
                <Row className="mt-5">
                  <Col xs={12} className="text-center">
                    <div className="result-container">
                      {results.map((result, index) => (
                        <BasicHospitalResultCard
                          key={result.id}
                          index={index}
                          objeto={result}
                          active={result.active}
                        />
                      ))}
                    </div>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
