import React, { useEffect, useState } from "react";
import { getClaimedFoods } from "../api/food";
import Spinner from "../components/Spinner";
import NgoDashboardCard from "../components/NgoDashboardCard";
import socket from "../socket/socket";
import toast from "react-hot-toast";

const NgoDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const res = await getClaimedFoods();
      setClaims(res.data.data || []);
    } catch {
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = () => {
      fetchClaims();
    }

    init();
  }, []);

  useEffect(() => {
    const handleAccepted = () => {
      toast.success("Your claim was accepted!");
      fetchClaims();
    };

    const handleUnavailable = () => {
      fetchClaims();
    };

    const handleExpired = () => {
      toast.error("Food expired");
      fetchClaims();
    };

    socket.on("claim_accepted", handleAccepted);
    socket.on("food_unavailable", handleUnavailable);
    socket.on("food_expired", handleExpired);

    return () => {
      socket.off("claim_accepted", handleAccepted);
      socket.off("food_unavailable", handleUnavailable);
      socket.off("food_expired", handleExpired);
    };
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="pt-24 px-6 pb-10 md:px-20">
      {claims.length !== 0 && (
        <h1 className="text-xl font-semibold mb-6">
          Your Accepted & Collected Food
        </h1>
      )}

      {claims.length === 0 ? (
        <div className="h-[70vh] flex items-center justify-center text-3xl font-semibold text-gray-700">
          No accepted food yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {claims.map((claim) => (
            <NgoDashboardCard
              key={claim._id}
              claim={claim}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NgoDashboard;