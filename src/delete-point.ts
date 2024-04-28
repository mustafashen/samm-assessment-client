import { Map } from "leaflet";
import getPoints from "./get-points";

export default async function deletePoint(
  map: Map,
  target: Element,
  id: string
) {
  target.addEventListener("click", async () => {
    const pointList = document.querySelector("#error-message-container");
    try {
      const deleteRes = await fetch(`http://localhost:3000/points/${id}`, {
        method: "DELETE",
      });
      const parsedRes = await deleteRes.json();

      if (parsedRes.data) {
        getPoints(map);
      }
      pointList.innerHTML = "";
    } catch (error: unknown) {
      pointList.innerHTML =
        "Nokta silme esnasında hata oluştu. Sunucu bağlantısını kontrol ediniz.";
    }
  });
}
