import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const {user} = useAuth();
  return (
    <>
      <footer className="bg-[#15151c] w-full mx-auto text-white pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-6">
              <img src={logo} alt="Logo" className="w-25 max-md:w-20 h-auto" />
              <p className="text-md max-md:text-sm text-white/80 leading-relaxed">
                ResQFood brings restaurants and NGOs together to share surplus
                food and reduce waste.
              </p>
            </div>
            <div className="flex gap-5 md:gap-6 order-1 md:order-2 items-center">
              {/* (Facebook) */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="text-white hover:text-[#ccff33] transition all duration-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14,7h4V3H14A5,5,0,0,0,9,8v3H6v4H9v6h4V15h3l1-4H13V8A1,1,0,0,1,14,7Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="text-white hover:text-[#ccff33] transition all duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                className="text-white hover:text-[#ccff33] transition all duration-500"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 grid max-md:grid-cols-3 md:grid-cols-2 gap-30 md:gap-40 lg:gap-40 items-start">
            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#ccff33] w-50">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm w-50">
                <li>
                  <a
                    href="#features"
                    className="hover:text-[#ccff33] transition all duration-700"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Features
                  </a>
                </li>
                {(!user || user?.role === "restaurant") && (<li className="flex items-center gap-2">
                  <a className="hover:text-neutral-400">Pricing</a>
                  <a
                    href="#pricing"
                    className="text-[11px] px-2 py-0.5 rounded-full bg-green-950 border border-green-300 text-green-300"
                  >
                    Subscribe
                  </a>
                </li>)}
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-[#ccff33] transition all duration-700"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-[#ccff33] transition all duration-700"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => scrollTo(0, 0)}
                    className="hover:text-[#ccff33] transition all duration-700"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-3 text-[#ccff33] w-50">
                Contact & Support
              </h3>
              <div className="text-md max-md:text-sm space-y-3 w-50">
                <p>ResQFood@hotmail.com</p>
                <p>+91 98765 43210</p>
                <p>123, Salt Lake, Kol – 700091</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-2 border-t border-neutral-700 flex justify-between items-center">
          <p className="text-center text-md max-md:text-sm text-white/70 mt-4 pb-4">
            © 2025{" "}
            <span className="text-neutral-400">
              Res<span className="text-[#ccff33]">Q</span>Food
            </span>
          </p>
          <p className="text-md max-md:text-sm text-neutral-400">
            All rights reserved.
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-80 bg-green-500 rounded-full blur-[120px] md:blur-[170px] pointer-events-none" />
          <h3 className="text-center font-extrabold leading-[0.9] text-transparent text-[clamp(3rem,19vw,12rem)] [-webkit-text-stroke:clamp(1px,0.3vw,2px)_#0D542B] my-3">
            Res
            <span className="[-webkit-text-stroke:clamp(1px,0.3vw,2px)_#f9570c]">
              Q
            </span>
            Food
          </h3>
        </div>
      </footer>
    </>
  );
};

export default Footer;
