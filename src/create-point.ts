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
  const errorMessageContainer = document.querySelector(
    "#error-message-container"
  );
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

    console.log(parsedRes)
    if (parsedRes.data) {
      // Refresh points list
      getPoints(map);
      errorMessageContainer.innerHTML = "";
    } else if (parsedRes.errors) {
      throw new Error("Nokta yaratma esnasinda beklenmeyen bir hata oluştu. Hata: " + parsedRes.errors[0].detail);
    } else {
      throw new Error("Nokta yaratma esnasinda beklenmeyen bir hata oluştu.")
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessageContainer.innerHTML = error.message;
    } else {
      errorMessageContainer.innerHTML = "Nokta yaratma esnasinda beklenmeyen bir hata oluştu.";
    }
  }
}
