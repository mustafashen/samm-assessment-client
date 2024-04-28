import { Map } from "leaflet";
import getPoints from "./get-points";

// Save center coordinates
export default function createPoint(map: Map) {
  const centerCoordinates = map.getCenter();
  const now = new Date().toISOString();

  const newPoint = {
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
    datetime: now,
  };

  fetch("http://localhost:3000/points/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "points",
        attributes: newPoint,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        // Refresh points list
        getPoints(map);
      }
    });
}
