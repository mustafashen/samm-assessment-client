import "./style/index.css";
import crosshair from "./asset/crosshair.svg";
import L from "leaflet";
import getPoints from "./get-points";
import createPoint from "./create-point";

const map = L.map("map").setView([40.8, 29.43], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Crosshair Marker
const crosshairIcon = L.icon({
  iconUrl: crosshair,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const crosshairMarker = L.marker(map.getCenter(), {
  icon: crosshairIcon,
}).addTo(map);

map.on("move", () => {
  crosshairMarker.setLatLng(map.getCenter());
});

// Get points
getPoints(map);

// Save point
const saveBtn = document.querySelector("#save-point-button");
saveBtn.addEventListener("click", () => createPoint(map));