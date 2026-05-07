import {
  GoogleMap,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import MapFoodModal from "../components/MapFoodModal";
import { getNearbyFoods, getMyClaims } from "../api/food";
import api from "../api/axios";
import Spinner from "../components/Spinner";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const MapView = () => {
  const mapRef = useRef(null);
  const hasFittedRef = useRef(false);

  const [center, setCenter] = useState(null);
  const [radius, setRadius] = useState(5);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [claimedFoodIds, setClaimedFoodIds] = useState([]);

  const safeRadius = radius || 5;

  // Marker icon
  const getMarkerIcon = () => "/icons/green.png";

  // INIT LOCATION
  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/user/me");
        const [lng, lat] = res.data.location.coordinates;
        setCenter({ lat, lng });
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, []);

  // LOAD CLAIMED IDS (for disabling button)
  useEffect(() => {
    const loadClaims = async () => {
      try {
        const res = await getMyClaims();
        setClaimedFoodIds(res.claimedFoodIds || []);
      } catch {
        setClaimedFoodIds([]);
      }
    };
    loadClaims();
  }, []);

  // FETCH FOODS
  const fetchFoods = async () => {
    try {
      const r = radius || 5;
      const data = await getNearbyFoods(r);
      if (!data.success) return;

      hasFittedRef.current = false;

      setFoods(data.foods);
      setNoResults(data.foods.length === 0);
    } catch (err) {
      console.error(err);
    }
  };

  // AUTO FETCH
  useEffect(() => {
    if (!center) return;
    fetchFoods();
  }, [center]);

  // ZOOM
  const getZoomFromRadius = (km) => {
    if (km <= 2) return 15;
    if (km <= 5) return 14;
    if (km <= 10) return 13;
    if (km <= 20) return 12;
    return 11;
  };

  // MARKER CLICK
  const handleMarkerClick = (food) => {
    setSelectedFood(food);

    if (mapRef.current) {
      mapRef.current.panTo({
        lat: food.location.coordinates[1],
        lng: food.location.coordinates[0],
      });
      mapRef.current.setZoom(Math.max(14, getZoomFromRadius(safeRadius)));
    }
  };

  // SOCKETS (CLEAN)
  useEffect(() => {
    const addOrUpdate = (food) => {
      if (food.status !== "available") return;

      setFoods((prev) => {
        const exists = prev.find((f) => f._id === food._id);
        return exists
          ? prev.map((f) => (f._id === food._id ? food : f))
          : [food, ...prev];
      });
    };

    const onDeleted = ({ foodId }) => {
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    };

    const onExpired = ({ ids }) => {
      if (!ids?.length) return;
      setFoods((prev) => prev.filter((f) => !ids.includes(f._id)));
    };

    const onUnavailable = ({ foodId }) => {
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    };

    socket.on("new_food_post", addOrUpdate);
    socket.on("food_updated", addOrUpdate);
    socket.on("food_deleted", onDeleted);
    socket.on("food_expired", onExpired);
    socket.on("food_unavailable", onUnavailable);

    return () => {
      socket.off("new_food_post", addOrUpdate);
      socket.off("food_updated", addOrUpdate);
      socket.off("food_deleted", onDeleted);
      socket.off("food_expired", onExpired);
      socket.off("food_unavailable", onUnavailable);
    };
  }, []);

  // FILTER ONLY AVAILABLE
  const visibleFoods = foods.filter(
    (food) => food.status === "available"
  );

  // GROUP BY LOCATION
  const groupedFoods = Object.values(
    visibleFoods.reduce((acc, food) => {
      const key = `${food.location.coordinates[0]}-${food.location.coordinates[1]}`;

      if (!acc[key]) {
        acc[key] = {
          location: food.location,
          foods: [],
        };
      }

      acc[key].foods.push(food);
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!mapRef.current || !visibleFoods.length) return;

    // prevent repeated zoom reset
    if (hasFittedRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();

    visibleFoods.forEach((food) => {
      const [lng, lat] = food.location.coordinates;
      bounds.extend({ lat, lng });
    });

    if (visibleFoods.length === 1) {
      const [lng, lat] = visibleFoods[0].location.coordinates;

      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(15);
    } else {
      setTimeout(() => {
        mapRef.current.fitBounds(bounds);
      }, 200);
    }

    hasFittedRef.current = true;

  }, [visibleFoods]);

  if (!center) return <Spinner />;

  return (
    <>
      {/* CONTROLS */}
      <div className="absolute z-10 top-20 right-5 bg-white p-4 rounded-lg shadow-lg flex gap-3">
        <label className="text-sm flex items-center">Radius (km)</label>

        <input
          type="number"
          min={1}
          value={radius}
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") e.preventDefault();
          }}
          onChange={(e) => {
            const val = e.target.value;

            if (val === "") {
              setRadius("");
              return;
            }

            const num = Number(val);
            if (isNaN(num)) return;

            setRadius(Math.max(1, num));
          }}
          className="border px-2 py-1 rounded w-20"
        />

        <button
          onClick={fetchFoods}
          className="bg-[#b9de4a] text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </div>

      {/* MAP */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={getZoomFromRadius(safeRadius)}
        onLoad={(map) => (mapRef.current = map)}
      >
        {/* NGO LOCATION */}
        <Marker position={center} />

        {/* RADIUS */}
        <Circle
          center={center}
          radius={safeRadius * 1000}
          options={{
            fillColor: "#60a5fa",
            fillOpacity: 0.15,
            strokeOpacity: 0,
          }}
        />

        {/* FOOD MARKERS */}
        {groupedFoods.map((group, idx) => {
          const lat = group.location.coordinates[1];
          const lng = group.location.coordinates[0];

          return (
            <Marker
              key={idx}
              position={{ lat, lng }}
              label={
                group.foods.length > 1
                  ? {
                    text: String(group.foods.length),
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }
                  : null
              }
              icon={{
                url: getMarkerIcon(),
                scaledSize: new window.google.maps.Size(40, 40),
                labelOrigin: new window.google.maps.Point(20, 15),
              }}
              onClick={() => {
                if (group.foods.length === 1) {
                  handleMarkerClick(group.foods[0]);
                } else {
                  setSelectedFood(group.foods);
                }
              }}
            />
          );
        })}
      </GoogleMap>

      {/* NO RESULTS */}
      {noResults && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded shadow">
          No food within{" "}
          <span className="text-red-600">{safeRadius} km</span>
        </div>
      )}

      {/* MODAL */}
      {selectedFood && (
        <MapFoodModal
          foods={
            Array.isArray(selectedFood)
              ? selectedFood
              : [selectedFood]
          }
          claimedFoodIds={claimedFoodIds}
          onClaimSuccess={(foodId) => {
            setClaimedFoodIds((prev) => [...prev, foodId]);
          }}
          onClose={() => setSelectedFood(null)}
          refresh={fetchFoods}
        />
      )}
    </>
  );
};

export default MapView;