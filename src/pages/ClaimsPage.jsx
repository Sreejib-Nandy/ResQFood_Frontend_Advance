import { useEffect, useState } from "react";
import {
    getRestaurantClaims,
    acceptClaim,
    rejectClaim,
} from "../api/food";
import toast from "react-hot-toast";
import socket from "../socket/socket";
import ClaimCard from "../components/ClaimCard";
import Spinner from "../components/Spinner";

const ClaimHandlePage = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH CLAIMS
    const fetchClaims = async () => {
        try {
            const res = await getRestaurantClaims();
            setClaims(res.data.data || []);
        } catch {
            toast.error("Failed to load claims");
        } finally {
            setLoading(false);
        }
    };

    // INITIAL LOAD
    useEffect(() => {
        fetchClaims();
    }, []);

    // SOCKET FIX (IMPORTANT)
    useEffect(() => {
        const handleClaimsUpdate = () => {
            console.log("Claims updated via socket");
            fetchClaims(); // always trust backend
        };

        // attach listener
        socket.on("restaurant_claims_update", handleClaimsUpdate);

        // cleanup
        return () => {
            socket.off("restaurant_claims_update", handleClaimsUpdate);
        };
    }, []);

    // ACCEPT CLAIM
    const handleAccept = async (claimId) => {
        try {
            await acceptClaim(claimId);
            toast.success("Claim accepted");

            fetchClaims(); // refresh UI
        } catch {
            toast.error("Accept failed");
        }
    };

    // REJECT CLAIM
    const handleReject = async (claimId) => {
        try {
            await rejectClaim(claimId);
            toast.success("Claim rejected");

            fetchClaims();
        } catch {
            toast.error("Reject failed");
        }
    };

    if (loading)
        return <Spinner />;


    return (
        <div className="pt-18 pb-10 md:pl-20 ml-40 max-md:ml-0">

            <div className="flex justify-between items-center w-full mb-5">
                {claims.length !== 0 && (
                    <h1 className="text-2xl font-semibold">Your Pending Response</h1>
                )}
            </div>
            {claims.length === 0 ? (
                <div className="h-[70vh] flex items-center justify-center max-md:text-2xl text-4xl text-[#211d1d] font-semibold">
                    No claim requests yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {claims.map((claim) => (
                        <ClaimCard
                            key={claim._id}
                            claim={claim}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClaimHandlePage;