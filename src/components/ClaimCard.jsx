import { useState } from "react";
import { Check, X } from "lucide-react";
import { InputOtp } from 'primereact/inputotp';

const ClaimCard = ({ claim, onAccept, onReject, onVerifyOTP }) => {
  const food = claim.foodPostId;
  const ngo = claim.ngoId;

  const [otp, setOtp] = useState("");

  const formatToIST = (iso) => {
    if (!iso) return "Not specified";
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const statusColor = {
    pending: "bg-yellow-700 text-yellow-700",
    accepted: "bg-green-700 text-green-700",
    rejected: "bg-red-700 text-red-700",
    expired: "bg-gray-700 text-gray-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-4 relative mb-3">

      {/* IMAGE */}
      <img
        src={
          food?.food_image?.[0]?.url ||
          "https://via.placeholder.com/400x300"
        }
        alt={food?.food_name}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* FOOD DETAILS */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {food?.food_name}
          </h2>
          <span className="px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1 justify-center border border-gray-300">
            <div
              className={`h-1.5 w-1.5 rounded-full ${statusColor[claim.status] || "bg-gray-200"}
              ${claim.status === "pending" ? "animate-pulse" : ""}`}
            />
            {claim.status}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {food?.description || "No description"}
        </p>
      </div>

      {/* FOOD META */}
      <div className="text-sm space-y-1">
        <p><b>Quantity:</b> {food?.quantity} {food?.unit}</p>
        <p><b>Expiry:</b> {formatToIST(food?.expiry_time)}</p>
      </div>

      {/* NGO DETAILS */}
      <div className="border-t pt-2 text-sm space-y-1">
        <p><b>NGO:</b> {ngo?.name}</p>
        <p><b>Contact:</b> {ngo?.contactInfo}</p>
        <p><b>Address:</b> {ngo?.address}</p>
      </div>

      {/* ACTIONS */}

      {/* PENDING */}
      {claim.status === "pending" && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => onAccept(claim._id)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-500 cursor-pointer"
          >
            <Check size={18} /> Accept
          </button>

          <button
            onClick={() => onReject(claim._id)}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-500 cursor-pointer"
          >
            <X size={18} /> Reject
          </button>
        </div>
      )}

      {/* ACCEPTED → OTP INPUT */}
      {claim.status === "accepted" && (
        <div className="mt-3 space-y-3">

          <p className="text-sm text-gray-600">
            Enter OTP from NGO to confirm collection
          </p>

          <div className="flex justify-center">
            <InputOtp
              value={otp}
              onChange={(e) => setOtp(e.value)}
              integerOnly
            />
          </div>

          <button
            onClick={() => onVerifyOTP(food._id, otp)}
            className="w-full bg-[#ccff33]/85 text-black py-2 rounded-lg hover:opacity-90 cursor-pointer"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* COLLECTED */}
      {claim.status === "collected" && (
        <div className="text-center text-green-600 font-medium mt-3">
          Food Collected ✔
        </div>
      )}

      {/* EXPIRED */}
      {claim.status === "expired" && (
        <div className="text-center text-red-500 font-medium mt-3">
          Claim Expired
        </div>
      )}
    </div>
  );
};

export default ClaimCard;