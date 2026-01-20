import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nearByPgs } from "../slices/pg-slice";
import NearbyPgMap from "../components/NearbyPgMap";

const NearByPgs = () => {
  const dispatch = useDispatch();
  const { nearby: pgs, loading } = useSelector((state) => state.pg);

  const [userLocation, setUserLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const [mapCenter, setMapCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      () => alert("Please allow location access")
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      dispatch(
        nearByPgs({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radius
        })
      );
    }
  }, [userLocation, radius, dispatch]);

  const handleSearchArea = () => {
    if (!mapCenter) return;
    dispatch(
      nearByPgs({
        latitude: mapCenter.latitude,
        longitude: mapCenter.longitude,
        radius
      })
    );
  };

  return (
    <>
      <h2>Nearby PGs</h2>

      <input
        type="range"
        min="1"
        max="20"
        value={radius}
        onChange={(e) => setRadius(Number(e.target.value))}
      />
      <span> {radius} km </span>

      <button onClick={handleSearchArea}>
        Search this area
      </button>

      { loading && <p> Loading nearby PGs... </p> }

      {userLocation && (
        <NearbyPgMap
          pgs={pgs}
          userLocation={userLocation}
          radius={radius}
          mapCenter={mapCenter}
        />
      )}
    </>
  );
};

export default NearByPgs;
