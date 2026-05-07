import React from "react";
import { Link } from "react-router-dom";
import CountUp from "./CountUp";
import Features from "./Features";

import matching from "../assets/matching.png";
import workflow from "../assets/workflow.jpg";
import waste from "../assets/waste.jpg";

import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const HeroSection = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  return (
    <div className="h-175 relative pt-16 md:pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1569398696579-17fd5f9e85e8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          opacity: 0.7,
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      {/* HERO SECTION */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start lg:items-start gap-12 lg:gap-16 pt-11 md:pt-20 pb-20 md:pb-28">
          {/* LEFT HERO COLUMN */}
          <div className="w-full md:w-2/3 lg:w-2/3 text-white flex flex-col max-md:items-center">
            <h1 className="text-5xl sm:text-5xl lg:text-7xl font-bold leading-tight max-md:pl-3">
              Connecting{" "}
              <span className="bg-[#ccff33] bg-clip-text text-transparent">
                Restaurants
              </span>{" "}
              with{" "}
              <span className="bg-[#02c39a] bg-clip-text text-transparent">
                Communities
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-lg text-white/90 max-w-xl max-md:text-center">
              Connect restaurants and food providers with NGOs and volunteers to
              redistribute surplus meals to those who need them.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="bg-white/90 text-green-700 px-5 py-3 flex items-center rounded-lg shadow font-semibold max-md:font-medium hover:text-white hover:bg-green-700 transition all duration-700"
              >
                Get Started
              </Link>
              <a
                href="#testimonials"
                className="border-2 border-white/30 text-white px-5 py-3 rounded-lg font-semibold max-md:font-medium flex items-center "
              >
                Testimonials
              </a>
            </div>
            {/* Mobile Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 md:hidden">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  <CountUp
                    from={0}
                    to={673}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-white/80 text-md">Meals Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#78C841]">
                  <CountUp
                    from={0}
                    to={162}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-white/80 text-md">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#8db5f6]">
                  <CountUp
                    from={0}
                    to={58}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </div>
                <div className="text-white/80 text-md">NGOs</div>
              </div>
            </div>
          </div>
          {/* RIGHT METRICS CARD (Desktop/Tablet) */}
          <div className="hidden md:flex justify-end w-full md:w-1/2">
            <div
              className="w-full max-w-md relative rounded-xl p-8 shadow-2xl"
              style={{
                backgroundColor: "rgba(240, 248, 255, 0.1)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <div className="grid gap-6">
                <div>
                  <div className="text-4xl lg:text-7xl font-extrabold text-orange-500">
                    <CountUp
                      from={0}
                      to={673}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    +
                  </div>
                  <div className="text-xl lg:text-3xl font-bold text-black/75">
                    Meals Shared
                  </div>
                </div>
                <div>
                  <div className="text-4xl lg:text-7xl font-extrabold text-[#78C841]">
                    <CountUp
                      from={0}
                      to={162}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    +
                  </div>
                  <div className="text-xl lg:text-3xl font-bold text-black/75">
                    Restaurants
                  </div>
                </div>
                <div>
                  <div className="text-4xl lg:text-7xl font-extrabold text-[#DCE4B8]">
                    <CountUp
                      from={0}
                      to={58}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    +
                  </div>
                  <div className="text-xl lg:text-3xl font-bold text-black/75">
                    NGO Partners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* FEATURES */}
      <main className="relative z-10">
        <div id="features" className="text-center pt-23 mx-5 md:pt-28">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#f9570c]">
            What We Offer
          </h1>
          <p className="max-w-full leading-relaxed pt-2 text-md sm:text-xl text-[#3e3737] mt-2">
            Powerful tools designed to simplify food redistribution. Connect,
            manage, and make a real impact with ease.
          </p>
        </div>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 max-md:pt-7 flex justify-center">
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <Features
              title="Real-time Matching"
              body="Restaurants post surplus food, and nearby NGOs get instant notifications through our live map."
              img={matching}
              name="real matching app"
            />
            <Features
              title="Simple Workflow"
              body="Share surplus food in seconds — just add the required details and your post goes live instantly."
              img={workflow}
              name="Simple Workflow"
            />
            <Features
              title="Track & Report"
              body="Track collections, measure impact and get reports to help reduce waste and feed people."
              img={waste}
              name="Track & Report"
            />
          </div>
        </section>
        {/* PRICING */}
        {(!user || user?.role === "restaurant") && <Pricing />}

        {/* TESTIMONIALS */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default HeroSection;
