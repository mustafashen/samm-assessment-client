import { Map } from "leaflet";
import getPoints from "./get-points";

export default async function deletePoint(
  map: Map,
  target: Element,
  id: string
) {
  target.addEventListener("click", async () => {
    const errorMessageContainer = document.querySelector(
      "#error-message-container"
    );
    try {
      const deleteRes = await fetch(`http://localhost:3000/points/${id}`, {
        method: "DELETE",
      });
      const parsedRes = await deleteRes.json();
      console.log(parsedRes)
      if (parsedRes.data) {
        getPoints(map);
        errorMessageContainer.innerHTML = "";
      } else if (parsedRes.errors) {
        throw new Error("Nokta silme esnasında beklenmeyen bir hata oluştu. Hata: " + parsedRes.errors[0].detail);
      } else {
        throw new Error("Nokta silme esnasında beklenmeyen bir hata oluştu.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        errorMessageContainer.innerHTML = error.message;
      } else {
        errorMessageContainer.innerHTML = "Nokta silme esnasinda beklenmeyen bir hata oluştu.";
      }
    }
  });
}
