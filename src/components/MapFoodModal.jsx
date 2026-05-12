import { claimFood } from "../api/food";
import { X, Phone, MapPin } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Hotel } from "lucide-react";

const MapFoodModal = ({ foods = [], onClose, refresh, onClaimSuccess, claimedFoodIds = [] }) => {

  const handleClaim = async (food) => {
    try {
      await claimFood(food._id);
      toast.success(`"${food.food_name}" claim waits for confirmation`);
      onClaimSuccess?.(food._id);
      refresh();
      onClose();
    } catch {
      toast.error("Claim failed");
    }
  };

  const formatToIST = (iso) => {
    if (!iso) return "Not specified";

    const date = new Date(iso);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="
        bg-white
        w-full max-w-md
        rounded-xl
        shadow-xl
        flex flex-col
        max-h-[85vh]
      ">

        {/* HEADER */}
        <div className="flex items-center justify-between p-3.5 border-b mt-4.5">
          <h2 className="text-lg font-semibold text-gray-800">
            Food Details ({foods.length})
          </h2>
          <X
            className="cursor-pointer text-gray-600 hover:text-gray-900"
            onClick={onClose}
          />
        </div>

        {/* BODY */}
        <div className="overflow-y-auto p-4 space-y-4">

          {foods.map((food) => {
            const name = food.food_name || "Unnamed Food";
            const restaurant = food.restaurantId || {};

            return (
              <div
                key={food._id}
                className="border rounded-lg p-3 shadow-sm"
              >

                {/* IMAGE */}
                <div className="w-full h-40 overflow-hidden rounded-md">
                  <img
                    src={
                      food.food_image?.[0]?.url ||
                      "https://via.placeholder.com/400x300?text=Food+Image"
                    }
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="mt-2.5 space-y-1">

                  {/* FOOD NAME */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {name}
                  </h3>

                  {/* RESTAURANT INFO */}
                  <div className="text-sm text-gray-600 space-y-1">

                    {/* Name */}
                    <p className="flex items-center gap-1">
                      <span className="font-medium"><Hotel size={14} /></span>
                      <span className="truncate">
                        {restaurant.name || "Unknown Restaurant"}
                      </span>
                    </p>

                    {/* Contact */}
                    {restaurant.contactInfo && (
                      <p className="flex items-center gap-1">
                        <Phone size={14} />
                        <span>{restaurant.contactInfo}</span>
                      </p>
                    )}

                    {/* Address (optional, trimmed) */}
                    {restaurant.address && (
                      <p className="flex items-start gap-1 text-gray-500">
                        <MapPin size={14} className="mt-0.5" />
                        <span className="line-clamp-2">
                          {restaurant.address}
                        </span>
                      </p>
                    )}

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm max-md:text-xs">
                    <b>Description:</b>{" "}
                    {food.description || "No description"}
                  </p>

                  {/* DETAILS */}
                  <p className="text-sm max-md:text-xs">
                    <b>Quantity:</b>{" "}
                    {food.quantity
                      ? `${food.quantity} ${food.unit || ""}`
                      : "Not specified"}
                  </p>

                  <p className="text-sm max-md:text-xs">
                    <b>Expiry:</b> {formatToIST(food.expiry_time)}
                  </p>

                  <p className="text-sm max-md:text-xs">
                    <b>Status:</b>{" "}
                    <span className="text-green-600 capitalize">
                      {food.status}
                    </span>
                  </p>
                </div>

                {/* ACTION */}
                <button
                  disabled={
                    claimedFoodIds.includes(food._id)
                  }
                  onClick={() => handleClaim(food)}
                  className="
                    mt-3 w-full h-10 rounded-lg text-black
                    bg-linear-to-r from-[#afe706] to-[#ffff24]/50
                    hover:from-[#89df09] hover:to-[#ffff24]
                    transition-all duration-300
                    disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                  "
                >
                  Claim
                </button>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default MapFoodModal;
