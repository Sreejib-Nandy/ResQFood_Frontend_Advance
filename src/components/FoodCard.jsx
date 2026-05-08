import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const FoodCard = ({ food = {}, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const status = food.status || "available";

  const statusColor = {
    available: "text-green-600",
    claimed: "text-yellow-600",
    collected: "text-gray-500",
    expired: "text-red-600",
  };

  const color = statusColor[status] || "text-gray-500";

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

  // safe values
  const name = food.food_name?.trim() || "Unnamed Food";
  const description = food.description?.trim() || "No description";

  const quantityDisplay =
    food.quantity && Number(food.quantity) > 0
      ? `${food.quantity}${food.unit ? ` ${food.unit}` : ""}`
      : "Not specified";

  const expiryDisplay = formatToIST(food.expiry_time);

  const statusDisplay =
    status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl shadow-[#515739] text-sm max-w-[55vw] max-md:max-w-[85vw] max-md:m-auto">
      <img className="rounded-md max-h-60 w-full object-cover" src={food.food_image?.[0]?.url ||
        "https://via.placeholder.com/400x300?text=Food+Image"} alt={name || "Food image"} />
      <h3 className="text-gray-900 text-2xl font-semibold ml-1 mt-2">{name}</h3>
      <p className="text-gray-500 mt-1.5 ml-1 text-sm">{description}</p>
      <div className="space-y-2.5 pl-1 pt-2">
        <p><b>Quantity :</b> {quantityDisplay}</p>
        <p>
          <b>Expiry :</b>{" "}
          {expiryDisplay}
        </p>
        <p>
           <b>Status :</b>{" "}
           <span className={`font-medium ${color}`}>
             {statusDisplay}
           </span>
         </p>
      </div>
      <div className="flex gap-3 mt-4">
         <button
           disabled={status !== "available"}
           onClick={() => {
             onEdit(food);
             window.scrollTo(0, 0);
           }}
           className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition"
         >
           <Pencil size={16} /> Edit
         </button>
         <button
           disabled={status !== "available"}
           onClick={() => setShowDeleteModal(true)}
           className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white rounded-lg py-2 hover:bg-red-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition"
         >
           <Trash2 size={16} /> Delete
         </button>
       </div>

        {/* Modal */}
       <DeleteModal
         isOpen={showDeleteModal}
         onClose={() => setShowDeleteModal(false)}
         onConfirm={() => onDelete(food._id)}
       />
    </div>
  );
};

export default FoodCard;