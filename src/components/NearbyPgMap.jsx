import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "../utils/fixLeafletIcon";
import "./NearbyPgMap.css";

const FixMapSize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
};

const NearbyPgMap = ({ pgs, userLocation, radius, mapCenter }) => {
  if (!userLocation) return null;
  const center = mapCenter || userLocation;
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={13}
      >
        <FixMapSize />

        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[center.latitude, center.longitude]}>
          <Popup>You are here</Popup>
        </Marker>

        <Circle
          center={[center.latitude, center.longitude]}
          radius={radius * 1000}
          pathOptions={{ color: "blue", fillOpacity: 0.15 }}
        />

        {pgs.map((pg) => {
          const lat = Number(pg?.location?.coordinates?.latitude);
          const lng = Number(pg?.location?.coordinates?.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;
          return (
            <Marker key={pg._id} position={[lat, lng]}>
              <Popup>
                <strong>{pg.pgname}</strong>
                <br />
                {pg.distance?.toFixed(2)} km away
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default NearbyPgMap;
