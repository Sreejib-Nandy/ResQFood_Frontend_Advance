import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, loadUser, googleAuth } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function validate() {
    const err = {};

    if (!form.name.trim()) err.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Valid email required";

    if (!form.password) err.password = "Password is required";

    if (
      !form.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      )
    ) {
      err.password = "Must include uppercase, lowercase, number & symbol";
    }

    if (form.confirmpassword !== form.password)
      err.confirmpassword = "Passwords do not match";

    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length) return;

    try {
      const res = await signup(form);
      if (res.success) {
        await loadUser();
        navigate("/complete-profile");
        scrollTo(0, 0);
      }
    } catch (err) {
      console.log(err);
      toast.error("Account creation failed. Please try again.");
    }
  }

  // Google Signup
  const googleSignup = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {

      await googleAuth(codeResponse.code);
    },
    onError: () => {
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        {/* CARD */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl shadow-[#515739] p-8 my-15 max-md:mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 border-[#b0e510]">
          {/* LEFT */}
          <div className="flex flex-col gap-5 justify-between">
            <div>
              <div className="flex items-center gap-4">
                <img src={logo} alt="LOGO" className="w-20 h-auto" />
                <div>
                  <h2 className="font-bold text-lg">Create your account</h2>
                  <div className="text-sm text-slate-500 py-1">
                    Join ResQFood as a Restaurant or NGO partner
                  </div>
                </div>
              </div>

              <div className="text-l text-slate-600 pt-3 text-sm">
                After signup, you'll be able to create posts to share surplus
                food or to collect food.
              </div>
            </div>
            {/* Bottom Left Section */}
            <div>
              <p className="text-center md:text-left mb-4 text-sm mx-3">
                Already have an account?{" "}
                <Link to="/login" className="text-[#f9570c] underline">
                  Sign in
                </Link>
              </p>

              <button
                type="button"
                className="w-full flex items-center gap-2 justify-center bg-white border border-gray-300/85 py-2.75 rounded-lg text-gray-500/80 cursor-pointer hover:scale-105"
                onClick={() => googleSignup()}
              >
                <img
                  className="h-4 w-4"
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
                  alt="googleFavicon"
                />
                Continue with Google
              </button>
            </div>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="text-sm text-slate-600">
                Organization Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300/85 rounded-lg"
                placeholder="Your organization name"
              />
              {errors.name && (
                <div className="text-xs text-red-500 mt-1">{errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300/85 rounded-lg"
                placeholder="you@example.com"
              />
              {errors.email && (
                <div className="text-xs text-red-500 mt-1">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm text-slate-600">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300/85 rounded-lg pr-10"
                placeholder="Enter your password"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9.5 cursor-pointer text-gray-500 py-0.5"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>

              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative pt-1">
              <label className="text-sm text-slate-600">Confirm Password</label>

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                value={form.confirmpassword}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300/85 rounded-lg pr-10"
                placeholder="Confirm your password"
              />

              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-10.5 cursor-pointer text-gray-500 py-0.5"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>

              {errors.confirmpassword && (
                <p className="text-xs text-red-500">{errors.confirmpassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-[#afe706] to-[#ffff24]/50 text-black py-3 mt-4 rounded-lg hover:bg-linear-to-r hover:from-[#89df09] hover:to-[#ffff24] transition-all duration-500 cursor-pointer"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
