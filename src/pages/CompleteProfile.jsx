import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const CompleteProfile = () => {
  const [form, setForm] = useState({
    role: "",
    address: "",
    contactInfo: "",
    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);
  const { loadUser, completeProfile } = useAuth();

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

  // Track any changes in the fields
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((p) => ({
      ...p,
      [name]: value,

      // If user edits address manually → reset coords
      ...(name === "address" && {
        latitude: null,
        longitude: null,
      }),
    }));
  }

  // Validate Errors
  function validate() {
    const err = {};
    if (!form.role) err.role = "Please select a role";

    if (!/^\d{10}$/.test(form.contactInfo)) {
      err.contactInfo = "Phone number must be exactly 10 digits";
    }

    if (!form.address.trim()) err.address = "Address is required";

    return err;
  }

  // Final Call on form Submission
  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) {
      return;
    }

    let finalData = { ...form };

    if (form.address && (form.latitude === null || form.longitude === null)) {
      try {
        const coords = await fetchLatLngFromAddress();

        if (coords) {
          finalData = {
            ...finalData,
            ...coords,
          };
        }
      } catch (err) {
        console.log("Forward geocoding failed : ", err);
      }
    }

    try {
      const res = await completeProfile(finalData);
      if (res.success) {
        await loadUser();
        scrollTo(0, 0);
      }
    } catch (err) {
      toast.error("Profile completion failed. Please try again.");
      console.error(err);
    }
  }

  // Progress Value Calculation
  const requiredFields = ["role", "address", "contactInfo"];

  const filledFields = requiredFields.filter((field) => {
    const val = form[field];
    return typeof val === "string" && val.trim() !== "";
  }).length;

  const progress = Math.round((filledFields / requiredFields.length) * 100);

  // Auto Fetch the longitude and latitude and Reverse Geocoding
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse Geocoding
          const res = await axios.get(
            `https://us1.locationiq.com/v1/reverse.php`,
            {
              params: {
                key: import.meta.env.VITE_LOCATIONIQ_KEY,
                lat: latitude,
                lon: longitude,
                format: "json",
              },
            },
          );

          const fetchedAddress = res.data.display_name;

          setForm((prev) => ({
            ...prev,
            address: fetchedAddress,
            latitude: latitude,
            longitude: longitude,
          }));
        } catch (err) {
          console.error(err);
          alert("Failed to fetch address");
        }

        setLoadingLocation(false);
      },
      (error) => {
        console.error(error);
        alert("Permission denied or failed");
        setLoadingLocation(false);
      },
    );
  };

  return (
    <section className="min-h-screen max-md:h-full relative bg-white flex flex-col lg:flex-row justify-center max-lg:items-center px-4 py-20 max-md:py-5 gap-6">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mb-10 size-200 bg-green-500/40 rounded-full blur-[200px]"></div>

      <div className="text-center md:text-left max-md:mt-8 mt-2 flex flex-col items-start justify-start max-md:items-center max-md:flex">
        <h1 className="font-medium text-3xl md:text-5xl/15 bg-linear-to-r max-md:mx-auto from-black to-green-300 bg-clip-text text-transparent max-w-117.5">
          Almost There! <br />
          Complete Your Profile
        </h1>
        <p className="text-md/6 text-black max-w-86.25 my-4 mx-auto md:mx-0">
          Add the required details to activate your account and start using all
          features.
        </p>
        <ProgressBar value={progress} />
      </div>

      <div className="w-full max-w-lg max-md:mx-auto bg-[#00A63E]/0 backdrop-blur-sm border border-black/50 rounded-xl p-6 h-fit">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black text-md max-md:text-sm mb-2">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full bg-[#00A63E]/15 border border-black/40 rounded-lg px-4 py-3 text-black/80 placeholder:text-black/40 placeholder:text-sm focus:outline-none focus:border-green-600 transition text-md max-md:text-sm"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="restaurant">Restaurant</option>
              <option value="ngo">NGO</option>
            </select>
            {errors.role && (
              <div className="text-sm text-red-500 mt-1">{errors.role}</div>
            )}
          </div>

          <div>
            <label className="block text-black text-md max-md:text-sm mb-2">
              Address
            </label>
            <div className="relative">
              <textarea
                rows="4"
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full bg-[#00A63E]/15 border border-black/40 rounded-lg px-4 py-3 text-black/80 placeholder:text-black/50 placeholder:text-md focus:outline-none focus:border-green-600 transition text-md max-md:text-sm resize-none"
              />

              {/* Button inside input */}
              <button
                type="button"
                onClick={handleGetLocation}
                className="absolute right-2 bottom-4 bg-black/10 text-black/80 text-xs px-2 py-1 rounded-md hover: transition cursor-pointer"
                disabled={loadingLocation}
              >
                {loadingLocation ? "Auto Fetching..." : "Use my location"}
              </button>
            </div>
            {errors.address && (
              <div className="text-sm text-red-500 mt-1">{errors.address}</div>
            )}
          </div>

          <div>
            <label className="block text-black text-md max-md:text-sm mb-2">
              Contact
            </label>
            <input
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              placeholder="+91 98765 XXXXX"
              required
              className="w-full bg-[#00A63E]/15 border border-black/40 rounded-lg px-4 py-3 text-black/80 placeholder:text-black/50 placeholder:text-md focus:outline-none focus:border-green-600 transition text-md max-md:text-sm"
            ></input>
            {errors.contactInfo && (
              <div className="text-sm text-red-500 mt-1">{errors.contactInfo}</div>
            )}
          </div>

          <div className="flex items-center justify-between max-md:flex-col">
            <p className="text-sm max-md:text-xs text-black/60 max-w-3xs">
              By submitting, you agree to our{" "}
              <span className="text-black">Terms</span> and{" "}
              <span className="text-black">Privacy Policy</span>.
            </p>
            <button
              type="submit"
              className="bg-linear-to-r from-[#afe706] to-[#ffff24]/50 hover:from-[#ffff24]/50 hover:to-[#afe706] text-black text-sm px-8 md:px-16 py-3 rounded-full transition duration-300 cursor-pointer max-md:mt-3 max-md:w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CompleteProfile;
