import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { updateFood } from "../api/food";
import toast from "react-hot-toast";

const EditFood = ({ open, onClose, food, onUpdated }) => {
    const [form, setForm] = useState({
        food_name: "",
        quantity: "",
        unit: "",
        description: "",
        expiry_time: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const utcToInputValue = (iso) => {
        if (!iso) return "";

        const date = new Date(iso);
        const local = new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
        );

        return local.toISOString().slice(0, 16);
    };

    // Prefill like CreateFood
    useEffect(() => {
        if (!food) return;

        setForm({
            food_name: food.food_name || "",
            quantity: food.quantity || "",
            unit: food.unit || "", // 
            description: food.description || "",
            expiry_time: food.expiry_time
                ? utcToInputValue(food.expiry_time)
                : "",
        });

        setPreview(food.food_image?.[0]?.url || null);
        setImage(null);
    }, [food]);

    // cleanup
    useEffect(() => {
        return () => {
            if (preview && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    if (!open || !food) return null;

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (preview && preview.startsWith("blob:")) {
            URL.revokeObjectURL(preview);
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    function validateFood() {
        const err = {};

        // Food Name
        if (!form.food_name?.trim()) {
            err.food_name = "Food name is required";
        } else if (form.food_name.length < 3) {
            err.food_name = "Food name must be at least 3 characters";
        }

        // Quantity
        const qty = Number(form.quantity);
        if (!form.quantity) {
            err.quantity = "Quantity is required";
        } else if (isNaN(qty) || qty <= 0) {
            err.quantity = "Quantity must be a positive number";
        }

        // Expiry Time
        if (!form.expiry_time) {
            err.expiry_time = "Expiry time is required";
        } else {
            const expiry = new Date(form.expiry_time);

            if (isNaN(expiry.getTime())) {
                err.expiry_time = "Invalid date";
            } else if (expiry <= new Date()) {
                err.expiry_time = "Expiry must be in the future";
            }
        }

        return err;
    }

    const submit = async (e) => {
        e.preventDefault();
        const v = validateFood();
        setErrors(v);
        if (Object.keys(v).length) return;
        if (loading) return;

        try {
            setLoading(true);

            const fd = new FormData();
            fd.append("food_name", form.food_name);
            fd.append("quantity", Number(form.quantity));
            fd.append("unit", form.unit);
            fd.append("description", form.description);

            if (form.expiry_time) {
                const expiryISO = new Date(form.expiry_time).toISOString();
                fd.append("expiry_time", expiryISO);
            }

            // only send image if changed
            if (image) {
                fd.append("food_image", image);
            }

            await updateFood(food._id, fd);

            toast.success("Food post updated successfully");
            onUpdated?.();
            onClose();
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <form
                onSubmit={submit}
                className="bg-white w-full max-w-lg rounded-xl px-6 py-5 space-y-2 max-md:w-[92vw] my-3"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Edit Food Post</h2>
                    <X className="cursor-pointer" onClick={onClose} />
                </div>

                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="h-60 w-full object-cover rounded-lg"
                    />
                )}

                <div>
                    <label className="block text-black text-sm max-md:text-xs mb-1">
                        Food Image<span className="text-red-600">*</span>
                    </label>
                    <input
                        key={preview}
                        type="file"
                        name="food_image"
                        accept="image/*"
                        onChange={handleImage}
                        className="w-full text-sm max-md:text-xs p-3.5 border-2 rounded-lg border-[#9fc235] border-dashed"
                    />
                    {errors.food_image && (
                        <div className="text-xs text-red-500 mt-1">
                            {errors.food_image}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-5">
                    <div>
                        <label className="block text-black text-sm max-md:text-xs mb-1">
                            Food Name<span className="text-red-600">*</span>
                        </label>
                        <input
                            placeholder="Enter food name"
                            value={form.food_name}
                            onChange={(e) =>
                                setForm({ ...form, food_name: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded text-sm max-md:text-xs"
                        />
                        {errors.food_name && (
                            <div className="text-xs text-red-500 mt-1">
                                {errors.food_name}
                            </div>
                        )}
                    </div>


                    <div>
                        <label className="block text-black text-sm max-md:text-xs mb-1">
                            <span className="hidden md:inline">
                                Food Quantity<span className="text-red-600">*</span>
                            </span>

                            <span className="md:hidden">
                                Quantity<span className="text-red-600">*</span>
                            </span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={100}
                            value={form.quantity}
                            onChange={(e) =>
                                setForm({ ...form, quantity: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded text-sm max-md:text-xs"
                        />
                        {errors.quantity && (
                            <div className="text-xs text-red-500 mt-1">
                                {errors.quantity}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-black text-sm max-md:text-xs mb-1">
                            Unit<span className="text-red-600">*</span>
                        </label>
                        <select
                            value={form.unit}
                            onChange={(e) =>
                                setForm({ ...form, unit: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded text-sm max-md:text-xs"
                        >
                            <option value="plates">Plates</option>
                            <option value="packets">Packets</option>
                            <option value="boxes">Boxes</option>
                            <option value="kg">Kg</option>
                            <option value="litres">Litres</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-black text-sm max-md:text-xs mb-1">
                        Description
                    </label>
                    <input
                        placeholder="Enter short description..."
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded text-sm max-md:text-xs"
                    />
                </div>

                <div>
                    <label className="block text-black text-sm max-md:text-xs mb-1">
                        Expiry Time<span className="text-red-600">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        value={form.expiry_time}
                        onChange={(e) =>
                            setForm({ ...form, expiry_time: e.target.value })
                        }
                        className="w-full border px-3 py-2 rounded text-sm max-md:text-xs"
                    />
                    {errors.expiry_time && (
                        <div className="text-xs text-red-500 mt-1">
                            {errors.expiry_time}
                        </div>
                    )}
                </div>

                <button
                    disabled={loading}
                    className="bg-linear-to-r from-[#afe706] to-[#ffff24]/50 hover:from-[#ffff24]/50 hover:to-[#afe706] text-black text-sm px-8 md:px-16 py-3 rounded-lg transition duration-300 cursor-pointer max-md:mt-2 w-full disabled:opacity-60"
                >
                    {loading ? "Updating..." : "Update Food"}
                </button>
            </form>
        </div>
    );
};

export default EditFood;