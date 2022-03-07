import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useParams } from "react-router-dom";

// const demoDataFromServer = [
//   { lat: 41.19197, lng: 25.33719 },
//   { lat: 41.26352, lng: 25.1471 },
//   { lat: 41.26365, lng: 25.24215 },
//   { lat: 41.26369, lng: 25.33719 },
//   { lat: 41.26365, lng: 25.43224 },
//   { lat: 41.26352, lng: 25.52728 },
//   { lat: 41.2633, lng: 25.62233 },
//   { lat: 41.263, lng: 25.71737 },
//   { lat: 41.3082, lng: 22.95892 },
//   { lat: 41.31041, lng: 23.054 },
// ];

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

function FCMap() {
  // const initState = {
  //   coords: [
  //     { lat: 41.19197, lng: 25.33719 },
  //     { lat: 41.26352, lng: 25.1471 },
  //     { lat: 41.26365, lng: 25.24215 },
  //     { lat: 41.26369, lng: 25.33719 },
  //     { lat: 41.26365, lng: 25.43224 },
  //     { lat: 41.26352, lng: 25.52728 },
  //     { lat: 41.2633, lng: 25.62233 },
  //     { lat: 41.263, lng: 25.71737 },
  //     { lat: 41.3082, lng: 22.95892 },
  //     { lat: 41.31041, lng: 23.054 },
  //   ],
  //   zoom: 7,
  // }

  const [state, setState] = useState([]);
  const { campId } = useParams();
  // didMount
  useEffect(() => {
    // 連接資料庫
    let getMap = async () => {
      let response = await axios.get(`http://localhost:3002/api/map/${campId}`);
      // 設定狀態
      console.log("getMap");
      console.log(campId);
      setState(response.data);
    };
    getMap();
  }, []);

  return (
    <>
      {state.map((v, i) => {
        return (
          <MapContainer
            center={[v.camp_long, v.camp_lat]}
            zoom={20}
            style={{ height: "505" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[v.camp_lat, v.camp_long]}
              icon={customMarker}
              key={i}
            >
              <Popup>
                {i + 1} is for popup with lat: {[v.camp_lat]} and lon
                {[v.camp_long]}
              </Popup>
            </Marker>
          </MapContainer>
        );
      })}
    </>
  );
}

export default FCMap;
