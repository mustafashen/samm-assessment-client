import { Map } from "leaflet";
import getPoints from "./get-points";

// Save center coordinates
export default async function createPoint(map: Map) {
  const centerCoordinates = map.getCenter();
  const now = new Date().toISOString();

  const newPoint = {
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
    datetime: now,
  };
  const pointList = document.querySelector("#error-message-container");
  try {
    const createRes = await fetch("http://localhost:3000/points/create", {
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
    });
    const parsedRes = await createRes.json();

    if (parsedRes.data) {
      // Refresh points list
      getPoints(map);
    }
    pointList.innerHTML = "";
  } catch (error) {
    pointList.innerHTML =
      "Nokta yaratma esnasında hata oluştu. Sunucu bağlantısını kontrol ediniz.";
  }
}
