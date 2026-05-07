import React, { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import CreateFood from "../components/CreateFood";
import FoodCard from "../components/FoodCard";
import { getFoodPosts, deleteFood } from "../api/food";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import EditFood from "../components/EditFood";

const CreateFoodPage = () => {
    const { user } = useAuth();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [editFood, setEditFood] = useState(null);

    const userId = user?._id;

    const fetchFoods = useCallback(async () => {
        if (!userId) return;

        try {
            setLoading(true);
            const res = await getFoodPosts(userId);
            setFoods(res.data.data || []);
        } catch {
            setFoods([]);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // initial load
    useEffect(() => {
        fetchFoods();
    }, [fetchFoods]);

    // delete
    const handleDelete = async (id) => {
        try {
            await deleteFood(id);
            toast.success("Food post deleted successfully");

            // instant UI update
            setFoods((prev) => prev.filter((f) => f._id !== id));
        } catch {
            toast.error("Delete failed");
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="pt-18 pb-10 md:pl-20 ml-40 max-md:ml-0">
        
            <div className="flex justify-between items-center w-full mb-5">
                {foods.length !== 0 && (
                    <h1 className="text-2xl font-semibold">Your Food Posts</h1>
                )}

                <button
                    onClick={() => setShowCreate(true)}
                    className="px-6 flex items-center gap-1 text-sm py-3 rounded-full bg-[#ccff33] cursor-pointer hover:scale-105"
                >
                    <Plus size={18} /> Create
                </button>
            </div>

            {foods.length === 0 ? (
                <div className="h-[65vh] flex items-center justify-center max-md:text-2xl text-4xl text-[#211d1d] font-semibold">
                    No food posts created yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {foods.map((food) => (
                        <FoodCard
                            key={food._id}
                            food={food}
                            onDelete={handleDelete}
                            onEdit={(food) => setEditFood(food)}
                        />
                    ))}
                </div>
            )}

            {/* CREATE */}
            <CreateFood
                open={showCreate}
                onClose={() => setShowCreate(false)}
                onCreated={fetchFoods}
            />

            {/* EDIT */}
            <EditFood
                open={!!editFood}
                food={editFood}
                onClose={() => setEditFood(null)}
                onUpdated={fetchFoods}
            />
        </div>
    );
};

export default CreateFoodPage;