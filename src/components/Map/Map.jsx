import React, { useEffect, useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";

const Map = ({ data }) => {
  const [center, setCenter] = useState([51.505, -0.09]);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const latitudes = data.map((item) => item.latitude);
      const longitudes = data.map((item) => item.longitude);

      const minLat = Math.min(...latitudes);
      const maxLat = Math.max(...latitudes);
      const minLng = Math.min(...longitudes);
      const maxLng = Math.max(...longitudes);

      setCenter([(minLat + maxLat) / 2, (minLng + maxLng) / 2]);
      setBounds([
        [minLat, minLng],
        [maxLat, maxLng],
      ]);
    }
  }, [data]);

  const MapBounds = () => {
    const map = useMap();
    useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds);
      }
    }, [bounds]);
    return null;
  };

  const handleZoom = () => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView(center, map.getZoom());
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
      }}
      ref={mapRef}
      whenCreated={(map) => {
        map.on("zoomend", handleZoom);
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data?.map((item, i) => {
        return <Pin item={item} key={i} />;
      })}
      <MapBounds />
    </MapContainer>
  );
};

export default Map;
