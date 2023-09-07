import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

export function Routing({pstart, pend, dstart, dend }) {
    const map = useMap();
  
    useEffect(() => {
      if (!map) return;
  
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(pstart, pend), L.latLng(dstart, dend)],
        routeWhileDragging: true
      }).addTo(map);
  
      return () => map.removeControl(routingControl);
    }, [map]);
  
    return null;
  }