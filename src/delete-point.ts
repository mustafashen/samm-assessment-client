import { Map } from "leaflet";
import getPoints from "./get-points";

export default function deletePoint(map: Map, target: Element, id: string) {
  target.addEventListener("click", () => {
    fetch(`http://localhost:3000/points/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          getPoints(map);
        }
      });
  });
}
