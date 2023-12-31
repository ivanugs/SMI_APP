import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getHospitalRecommendations, setLat, setLng } from "../../store/slices";
import "./HospitalComponent.css";
import { BasicHospitalResultCard } from "../components/common/BasicHospitalResultCard";
import { Routing } from "../components/common/Routing";
import Swal from "sweetalert2";

export const HospitalesCercanosComponent = () => {
  const dispatch = useDispatch();
  const pos = [20.67206140965494, -103.41533098991576];
  /* const pos = [20.66016607382395, -103.34883247033798];
  const pos = [20.474516950982423, -103.44849722986962];
  const pos = [20.62421405016041, -103.32147766227901];
  const pos = [20.801886044793548, -103.47958915395098]; */
  const { isLoading, hospitales = [] } = useSelector(
    (state) => state.hospitales
  );
  const [results, setResults] = useState([]);
  const { latitude, longitude } = useSelector((state) => state.common);

  const retrieveRecommendation = async () => {
    try {
      Swal.fire({
        title: "Obteniendo recomendaciones",
        html: '<div class="spinner"></div><div style="margin-top: 10px;">Por favor, espere...</div>',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      await dispatch(getHospitalRecommendations(pos[0], pos[1]));
    } catch {
    } finally {
      Swal.close();
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setLat(position.coords.latitude));
          dispatch(setLng(position.coords.longitude));
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    // dispatch(getHospitalRecommendations(latitude, longitude));
    retrieveRecommendation();
  }, []);
  useEffect(() => {
    if (hospitales.length > 0 && !isLoading) {
      setResults(hospitales);
    }
  }, [hospitales, isLoading]);
  return (
    <>
      <Row>
        <Col xs={10}>
          <MapContainer
            center={pos}
            zoom={13}
            style={{ width: "100%", height: "calc(98vh - 4rem)" }}
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
            {/* {latitude && longitude && (
                <>
                  <Marker position={[latitude, longitude]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </>
              )} */}
            {pos && (
              <>
                <Marker position={pos}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            )}
            {results.length > 0 && (
              <Routing
                pstart={pos[0]}
                pend={pos[1]}
                dstart={results[0]['lat']}
                dend={results[1]['long']}
              ></Routing>
            )}
          </MapContainer>
        </Col>
        <Col xs={2}>
          <h2 className="title"><b>Hospitales Recomendados</b></h2>
          <div className="custom-listgroup overflow-hidden">
            {results.length > 0 && (
              <Row className="mt-3">
                <Col xs={12} className="text-center">
                  <div className="result-container overflow-hidden">
                    {results.map((result, index) => (
                      <BasicHospitalResultCard
                        key={result.Indice}
                        index={index}
                        objeto={result}
                        active={true}
                      />
                    ))}
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
