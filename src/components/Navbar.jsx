import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuIcon, X as XIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import upload from "../assets/upload_area.png";
import Menu from "./Menu";

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const isRestaurant = user?.role === "restaurant";
  const isNgo = user?.role === "ngo";
  const isExpired = user?.status === "expired";

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 pr-5 sm:px-6 md:px-8 lg:px-16 py-2 max-md:py-4 text-white ${isHome ? "bg-blue-950/65" : "bg-blue-950/90"} backdrop-blur-md transition-all duration-600`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center outline-none focus:outline-none"
          onClick={() => {
            scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-10 sm:h-12 lg:h-14 w-auto object-contain cursor-pointer"
          />
          <p className="text-4xl max-lg:text-3xl">
            Res
            <span
              className="text-[#ccff33]"
              style={{ fontFamily: '"Sekuya", system-ui', fontWeight: 700 }}
            >
              Q
            </span>
            Food
          </p>
        </Link>

        {/* Navigation */}
        <div className="flex items-center justify-around">
          <div
            className={`max-lg:absolute max-lg:top-0
                        max-lg:-left-10 max-lg:font-medium max-lg:text-lg z-50 flex flex-col lg:flex-row items-center max-lg:justify-center gap-6 lg:px-6 py-3 max-lg:px-3 max-lg:h-screen lg:rounded-full backdrop-blur-3xl bg-black/85 lg:bg-white/10 lg:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
                          isOpen ? "max-lg:w-full" : "max-lg:w-0"
                        }`}
          >
            <XIcon
              className="lg:hidden absolute top-6 right-6 w-8 h-8 cursor-pointer"
              onClick={() => setisOpen(false)}
            />

            <Link
              to="/"
              onClick={() => {
                scrollTo(0, 0);
                setisOpen(false);
              }}
              className="hover:text-[#ccff33] transition-all duration-400"
            >
              Home
            </Link>

            <a
              href={isHome ? "#features" : undefined}
              onClick={() => setisOpen(false)}
              className={`${!isHome ? "text-gray-400 cursor-not-allowed" : "hover:text-[#ccff33]"} transition-all duration-500`}
            >
              Features
            </a>

            {/* PRICING (HIDE FOR NGO) */}
            {(!user || isRestaurant) && (
              <a
                href={isHome ? "#pricing" : undefined}
                onClick={() => setisOpen(false)}
                className={`${!isHome ? "text-gray-400 cursor-not-allowed" : "hover:text-[#ccff33]"} transition-all duration-500`}
              >
                Pricing
              </a>
            )}

            <a
              href={isHome ? "#testimonials" : undefined}
              onClick={() => setisOpen(false)}
              className={`${!isHome ? "text-gray-400 cursor-not-allowed" : "hover:text-[#ccff33]"} transition-all duration-500`}
            >
              Testimonials
            </a>

            <a
              href={isHome ? "#faq" : undefined}
              onClick={() => setisOpen(false)}
              className={`${!isHome ? "text-gray-400 cursor-not-allowed" : "hover:text-[#ccff33]"} transition-all duration-500`}
            >
              FAQ
            </a>

            {/* RESTAURANT */}
            {isRestaurant && (
              <Link
                to="/restaurant/dashboard/create-food"
                onClick={() => {
                  scrollTo(0, 0);
                  setisOpen(false);
                }}
                className="hover:text-[#ccff33] transition-all duration-400"
              >
                Dashboard
              </Link>
            )}

            {/* NGO */}
            {isNgo && (
              <>
                <Link
                  to="/ngo/dashboard"
                  onClick={() => {
                    scrollTo(0, 0);
                    setisOpen(false);
                  }}
                  className="hover:text-[#ccff33] transition-all duration-400"
                >
                  Dashboard
                </Link>

                <Link
                  to="/mapview"
                  onClick={() => {
                    scrollTo(0, 0);
                    setisOpen(false);
                  }}
                  className="hover:text-[#ccff33] transition-all duration-400"
                >
                  Map View
                </Link>
              </>
            )}

            {/* EXPIRED PLAN INDICATOR */}
            {isRestaurant && isExpired && (
              <span className="text-red-600 text-sm">Plan expired</span>
            )}

            {/* AUTH BUTTONS */}
            {!user && (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setisOpen(false);
                    scrollTo(0, 0);
                  }}
                  className="px-4 py-2 rounded-full font-medium hover:bg-green-dull transition text-[#ccff33] cursor-pointer hover:scale-110"
                >
                  Sign In
                </button>

                <button
                  className="group px-8 py-2.5 bg-[#9ecd11e6] rounded-3xl text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-[#1c2006d0]"
                  onClick={() => {
                    navigate("/signup");
                    setisOpen(false);
                    scrollTo(0, 0);
                  }}
                >
                  <p className="relative h-6 overflow-hidden flex items-center justify-center">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                      Get Started
                    </span>
                    <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
                      Get Started
                    </span>
                  </p>
                </button>
              </>
            )}
          </div>

          {/* PROFILE */}
          {user && (
            <div className="relative ml-5 max-md:ml-28">
              <img
                src={user.image == null ? upload : user.image}
                alt="image"
                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                onClick={() => setMenuOpen((prev) => !prev)}
              />

              {menuOpen && (
                <div
                  className="absolute right-0 top-12 z-50"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <Menu />
                </div>
              )}
            </div>
          )}
        </div>

        <MenuIcon
          className="lg:hidden w-8 h-8 cursor-pointer ml-8"
          onClick={() => setisOpen(true)}
        />
      </div>
    </>
  );
};

export default Navbar;
