import { Map } from "leaflet";
import L from "leaflet";
import deletePoint from "./delete-point";

// Gets points from the server
export default async function getPoints(map: Map) {
  const pointList = document.querySelector("#error-message-container");
  try {
    const readRes = await fetch("http://localhost:3000/points/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedRes = await readRes.json();
    addPointsToView(map, parsedRes.data);
    pointList.innerHTML = "";
  } catch (error: unknown) {
    pointList.innerHTML = "Noktaları getirme esnasında hata oluştu. Sunucu bağlantısını kontrol ediniz.";
  }
}

// Adds points to view
async function addPointsToView(
  map: Map,
  data: {
    id: string;
    attributes: { lat: number; lng: number; datetime: string; id: string };
  }[]
) {
  // Clear points list for the up-to-date data
  const pointList = document.querySelector("#points-list");
  pointList.innerHTML = "";

  // Add points to the view
  data.forEach(
    (point: {
      id: string;
      attributes: { lat: number; lng: number; datetime: string };
    }) => {
      const { id, attributes } = point;
      const { lat, lng, datetime } = attributes;

      const liString = createPointListItem({ id, lat, lng, datetime });
      pointList.insertAdjacentHTML("beforeend", liString);

      const pointListItem = document.getElementById(`${id}`);

      const markButton = pointListItem.querySelector(".mark");
      markButton.addEventListener("click", () => {
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<p>Enlem: ${lat}<br/>Boylam: ${lng}</p>`).openPopup();
        map.setView([lat, lng], 15);
      });

      const deleteButton = pointListItem.querySelector(".delete");
      deletePoint(map, deleteButton, id);
    }
  );
}

// Creates a list item for a point
function createPointListItem(point: {
  id: string;
  lat: number;
  lng: number;
  datetime: string;
}) {
  const { id, lat, lng, datetime } = point;
  return `
  <li
    id="${id}" 
    class="points-list-item">
    Enlem: ${lat}
    <br/>
    Boylam: ${lng}
    <br/>
    Tarih: ${new Date(datetime).getDate() + "." + (new Date(datetime).getMonth() + 1) + "." + new Date(datetime).getFullYear() + " " + new Date(datetime).getHours() + ":" + new Date(datetime).getMinutes()}
    <br/>
    <button class="mark">İşaretle</button>
    <button class="delete">Sil</button>
  </li>
  `;
}
