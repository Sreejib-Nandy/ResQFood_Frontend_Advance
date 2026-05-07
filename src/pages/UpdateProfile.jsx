import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { SaveAll, Trash2 } from "lucide-react";
import DeleteModal from "../components/DeleteModal";
import axios from "axios";

const UpdateProfile = () => {
  const { user, loadUser, loading, hardLogout } = useAuth();

  const [form, setForm] = useState({
    address: "",
    contactInfo: "",
    latitude: null,
    longitude: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  // Populate form from user
  useEffect(() => {
    if (user) {
      setForm({
        address: user.address || "",
        contactInfo: user.contactInfo || "",
        latitude: user?.location?.coordinates?.[1] ?? null,
        longitude: user?.location?.coordinates?.[0] ?? null,
      });
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "address" && {
        latitude: null,
        longitude: null,
      }),
    }));
  }

  // Validation
  function validate() {
    const err = {};

    if (!/^\d{10}$/.test(form.contactInfo)) {
      err.contactInfo = "Phone number must be exactly 10 digits";
    }

    if (!form.address.trim()) {
      err.address = "Address is required";
    }

    return err;
  }

  // Forward Geocoding
  const fetchLatLngFromAddress = async () => {
    const res = await axios.get("https://us1.locationiq.com/v1/search.php", {
      params: {
        key: import.meta.env.VITE_LOCATIONIQ_KEY,
        q: form.address,
        format: "json",
      },
    });

    const { lat, lon } = res.data[0];

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    };
  };

  // Reverse Geocoding
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.get(
            "https://us1.locationiq.com/v1/reverse.php",
            {
              params: {
                key: import.meta.env.VITE_LOCATIONIQ_KEY,
                lat: latitude,
                lon: longitude,
                format: "json",
              },
            },
          );

          setForm((prev) => ({
            ...prev,
            address: res.data.display_name,
            latitude,
            longitude,
          }));
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch address");
        }

        setLoadingLocation(false);
      },
      () => {
        toast.error("Location permission denied");
        setLoadingLocation(false);
      },
    );
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    if (!user) {
      toast.error("Session expired. Please login again.");
      return;
    }

    let finalData = { ...form };

    // Forward geocode if needed
    if (form.address && (form.latitude == null || form.longitude == null)) {
      try {
        const coords = await fetchLatLngFromAddress();
        if (coords) finalData = { ...finalData, ...coords };
      } catch (err) {
        console.log("Forward geocoding failed", err);
      }
    }

    setSubmitting(true);

    try {
      const res = await api.put("/user/update", finalData, {
        withCredentials: true,
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Update failed");
        return;
      }

      toast.success("Profile updated successfully");
      navigate("/");
      await loadUser();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete("/user/delete", { withCredentials: true });

      toast.success("Account deactivated successfully");
      setShowDeleteModal(false);
      hardLogout();
      window.location.replace("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="h-screen bg-gray-50 pt-20 max-md:pt-10">
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl shadow-[#515739] p-5 max-md:p-0 m-3.5 max-md:mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LEFT IMAGE */}
          <div className="flex items-center gap-3 max-md:hidden">
            <img
              className="rounded-2xl shadow-md shadow-[#515739]"
              src="https://plus.unsplash.com/premium_vector-1741578696141-b4e6b6f972bb?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="leftSideImage"
            />
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="w-full text-center border border-gray-300/40 rounded-2xl px-6 bg-white shadow-md shadow-[#515739] p-4"
          >
            <h2 className="text-2xl text-gray-900 font-medium mt-2">
              Update your profile
            </h2>
            <p className="text-sm text-gray-500/90 mt-2">
              {`Welcome`} <b className="text-black font-medium">{user?.name}</b> {`,`}<br /> {` keep your details up to date`}
            </p>

            {/* ADDRESS */}
            <div className="mt-4 text-left">
              <label className="text-sm text-gray-600">Address</label>

              <div className="relative mt-1">
                <textarea
                  rows="4"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                />

                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="absolute right-2 bottom-4 text-xs bg-gray-200 px-2 py-1 rounded-md cursor-pointer"
                >
                  {loadingLocation ? "Auto Fetching..." : "Use my location"}
                </button>
              </div>

              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* CONTACT */}
            <div className="mt-1 text-left">
              <label className="text-sm text-gray-600">Contact</label>

              <input
                name="contactInfo"
                value={form.contactInfo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm mt-1"
              />

              {errors.contactInfo && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactInfo}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-5 w-full h-11 rounded-full text-black bg-linear-to-r from-[#afe706] to-[#ffff24]/50 hover:from-[#89df09] hover:to-[#ffff24] flex justify-center items-center gap-3 text-sm cursor-pointer"
            >
              {submitting ? "Saving..." : "Save Changes"}
              <SaveAll size={18} />
            </button>
            {/* DELETE */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full h-11 mt-3 bg-red-500 text-white py-2 rounded-full flex justify-center items-center gap-3 text-sm cursor-pointer"
              >
                Deactivate Account
                <Trash2 size={18} />
              </button>
            </div>

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDelete}
            />
          </form>


        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
