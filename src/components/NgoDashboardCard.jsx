import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { collectFood } from "../api/food";

const ClaimedCard = ({ claim = {}, refresh }) => {
  const navigate = useNavigate();

  const food = claim.foodPostId || {};
  const restaurant = claim.restaurantId || {};
  const status = claim.status || "pending";

  // STATUS COLORS
  const statusColor = {
    pending: "text-yellow-600",
    accepted: "text-green-600",
    collected: "text-gray-500",
    rejected: "text-red-600",
  };

  const color = statusColor[status] || "text-gray-500";

  // FORMAT DATE
  const formatToIST = (iso) => {
    if (!iso) return "Not specified";

    const date = new Date(iso);

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

  // MARK COLLECTED
  const handleCollect = async () => {
    try {
      await collectFood(claim._id);
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to collect");
    }
  };

  // VIEW ROUTE
  const handleRoute = () => {
    navigate(`/ngo/route/${claim._id}`);
  };

  return (
    <div className="
      bg-white rounded-xl shadow-xl shadow-[#515739]
      flex flex-col overflow-hidden w-full max-w-sm mx-auto
    ">
      {/* IMAGE */}
      <div className="w-full h-48 sm:h-52 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            food.food_image?.[0]?.url ||
            "https://via.placeholder.com/400x300?text=Food+Image"
          }
          alt={food.food_name || "Food image"}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col py-3.5 space-y-1.5 px-3">

        {/* FOOD NAME */}
        <h3 className="text-gray-900 text-xl font-semibold">
          {food.food_name || "Unnamed Food"}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm max-md:text-xs">
          {food.description || "No description"}
        </p>

        {/* FOOD DETAILS */}
        <div className="space-y-1.5 text-sm max-md:text-xs">
          <p>
            <b>Quantity:</b>{" "}
            {food.quantity} {food.unit || ""}
          </p>

          <p>
            <b>Expiry:</b>{" "}
            {formatToIST(food.expiry_time)}
          </p>
        </div>

        {/* RESTAURANT DETAILS */}
        <div className="border-t pt-2 text-sm space-y-1">
          <p className="text-black text-sm max-md:text-xs">
            <b>Restaurant:</b> {restaurant.name || "Unknown"}
          </p>

          {restaurant.address && (
            <p className="text-gray-500 text-xs">
                <b className="text-black font-semibold text-sm">Address:</b>{" "}
              {restaurant.address}
            </p>
          )}
        </div>

        {/* STATUS */}
        <p className="text-sm max-md:text-xs">
          <b>Status:</b>{" "}
          <span className={`ml-1 font-medium capitalize ${color}`}>
            {status}
          </span>
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-3">

          {/* VIEW ROUTE */}
          <button
            onClick={handleRoute}
            disabled={status !== "accepted"}
            className="
              flex-1
              bg-blue-600
              disabled:bg-gray-300
              text-white
              py-2
              rounded-lg
              text-sm max-md:text-xs
              transition cursor-pointer
              hover:bg-blue-400
            "
          >
            View Route
          </button>

          {/* MARK COLLECTED */}
          <button
            onClick={handleCollect}
            disabled={status !== "accepted"}
            className="
              flex-1
              bg-green-600
              disabled:bg-gray-300
              text-white
              py-2
              rounded-lg
              text-sm max-md:text-xs
              transition cursor-pointer
              hover:bg-green-400
            "
          >
            Mark Collected
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimedCard;