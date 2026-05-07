import React, { useState } from "react";
// import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, googleAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Google Signup
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);

      await googleAuth(codeResponse.code);
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <div className="h-screen bg-gray-50 pt-20 max-md:pt-10">
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl shadow-[#515739] p-5 max-md:p-0 m-3.5 max-md:mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 max-md:hidden">
            <img
              className="rounded-2xl shadow-md shadow-[#515739]"
              src="https://plus.unsplash.com/premium_vector-1749580864664-c65ba12fc38e?q=80&w=745&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="leftSideImage"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full text-center border border-gray-300/40 rounded-2xl px-6 bg-white shadow-md shadow-[#515739] p-4"
          >
            <h2 className="text-2xl text-gray-900 font-medium mt-2">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-500/90 mt-2">
              Welcome back! Please sign in to continue
            </p>

            <button
              type="button"
              className="w-full mt-5 bg-gray-500/2 border border-gray-300/60 flex items-center justify-center h-12 rounded-full cursor-pointer hover:border-gray-300/95 gap-2 text-gray-500/80"
              onClick={() => googleLogin()}
            >
              <img
                className="h-4 w-4"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
                alt="googleFavicon"
              />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 w-full my-3">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-gray-500/90">
                or sign in with email
              </p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="Email id"
                className="bg-transparent text-black/90 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative flex items-center mt-4 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="bg-transparent text-black/90 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-3 cursor-pointer text-gray-500 py-0.5"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <div className="w-full flex items-center justify-between mt-5 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="checkbox" />
                <label className="text-sm" htmlFor="checkbox">
                  Remember me
                </label>
              </div>
              <Link className="text-sm underline" to="/signup">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-5 w-full h-11 rounded-full text-black bg-linear-to-r from-[#afe706] to-[#ffff24]/50 hover:bg-linear-to-r hover:from-[#89df09] hover:to-[#ffff24] transition-all duration-500 cursor-pointer"
              onClick={() => scrollTo(0, 0)}
            >
              Log in
            </button>
            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account?{" "}
              <Link className="text-[#f9570c] hover:underline" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
