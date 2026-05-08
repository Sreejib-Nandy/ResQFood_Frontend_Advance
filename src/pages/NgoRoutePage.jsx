import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getEachClaimRoute } from "../api/food";
import Spinner from "../components/Spinner";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const NgoRoutePage = () => {
  const { claimId } = useParams();

  const mapRef = useRef(null);
  const watchIdRef = useRef(null);
  const lastRequestPosRef = useRef(null);
  const hasFittedRef = useRef(false);

  const [ngoLocation, setNgoLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  // Distance helper - Harvesine Formula
  const getDistance = (p1, p2) => {
    if (!p1 || !p2) return 0;
    const R = 6371e3;
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // FETCH DESTINATION
  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const res = await getEachClaimRoute(claimId);
        const claim = res.data.data;

        const [lng, lat] = claim.restaurantId.location.coordinates;
        setDestination({ lat, lng });
      } catch (err) {
        console.error(err);
      }
    };

    fetchClaim();
  }, [claimId]);

  // LIVE LOCATION ONLY (watchPosition)
  useEffect(() => {
    if (!navigator.geolocation) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setNgoLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error("Geo error:", err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // DIRECTIONS (THROTTLED)
  useEffect(() => {
    if (!ngoLocation || !destination || !window.google) return;

    const distanceMoved = getDistance(
      lastRequestPosRef.current,
      ngoLocation
    );

    if (!directions || distanceMoved > 50) {
      const directionsService =
        new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: ngoLocation,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);

            // Distance + ETA
            const leg = result.routes[0].legs[0];
            setRouteInfo({
              distance: leg.distance.text,
              duration: leg.duration.text,
            });

            lastRequestPosRef.current = ngoLocation;
          }
        }
      );
    }
  }, [ngoLocation, destination, directions]);

  // FIT ROUTE ONCE
  useEffect(() => {
    if (!mapRef.current || !directions || hasFittedRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();

    directions.routes[0].overview_path.forEach((p) =>
      bounds.extend(p)
    );

    mapRef.current.fitBounds(bounds);
    hasFittedRef.current = true;
  }, [directions]);

  // FOLLOW USER (ALWAYS NOW)
  useEffect(() => {
    if (mapRef.current && ngoLocation) {
      mapRef.current.panTo(ngoLocation);
    }
  }, [ngoLocation]);

  if (!ngoLocation || !destination) return <Spinner />;

  return (
    <>
      {/* DISTANCE CARD */}
      {routeInfo && (
        <div className="absolute z-10 top-20 left-1/2 -translate-x-1/2 bg-white px-6 py-2 max-md:px-3 max-md:py-1 rounded shadow flex gap-6 max-md:gap-3 text-sm max-md:text-xs font-medium max-md:flex-nowrap max-md:whitespace-nowrap">

          <div>
            <span className="text-gray-500">Distance:</span>{" "}
            {routeInfo.distance}
          </div>

          <div>
            <span className="text-gray-500">ETA:</span>{" "}
            {routeInfo.duration}
          </div>

        </div>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ngoLocation}
        zoom={14}
        onLoad={(map) => (mapRef.current = map)}
      >
        {/* NGO */}
        <Marker
          position={ngoLocation}
          icon={{
            url: "/icons/blue.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />

        {/* Restaurant */}
        <Marker
          position={destination}
          icon={{
            url: "/icons/red.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />

        {/* ROUTE */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#4285F4",
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>
    </>
  );
};

export default NgoRoutePage;