import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getHospitals } from "../../store/slices";

export const HospitalesComponent = () => {
  const dispatch = useDispatch();
  const position = [20.4043, -103.314];
  const { isLoading, hospitales = [] } = useSelector(
    (state) => state.hospitales
  );
  useEffect(() => {
    dispatch(getHospitals());
  }, []); 
  return (
    <>
      <Row>
        <Col xs={2}></Col>
        <Col xs={10}>
          <MapContainer
            center={position}
            zoom={13}
            style={{ width: "100%", height: "calc(98vh - 4rem)" }}
          >
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Col>
      </Row>
    </>
  );
};
