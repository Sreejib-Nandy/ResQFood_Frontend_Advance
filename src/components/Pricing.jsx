import React from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { user, loadUser } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Step 1: Check Razorpay loaded
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      // Step 2: Create order (axios FIX)
      const res = await api.post(
        "/payment/order",
        {},
        { withCredentials: true }
      );

      const order = res.data;

      // Step 3: Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ResQFood",
        description: "Monthly Subscription",
        image: "https://www.shutterstock.com/image-vector/illustration-icon-food-sharing-donation-600nw-2229819277.jpg",
        order_id: order.id,
        config: {
          display: {
            blocks: {
              banks: {
                name: "Want to proceed with",
                instruments: [
                  {
                    method: "netbanking", // Forces Netbanking
                  },
                  {
                    method: "wallet", // Optional: allow wallets too
                  },
                  {
                    method: "paylater",
                  }
                ],
              },
            },
            sequence: ["block.banks"],
            preferences: {
              show_default_blocks: false, // This hides the Card and UPI sections
            },
          },
        },

        handler: async function (response) {
          console.log("Payment response:", response);

          toast.loading("Processing payment...", { id: "payment" });

          // Poll user update (better than fixed timeout)
          let attempts = 0;

          const interval = setInterval(async () => {
            await loadUser();
            attempts++;

            // stop after 5 tries
            if (attempts >= 5) {
              clearInterval(interval);
              toast.dismiss("payment");
              toast.success("Payment successful");
            }
          }, 1500);
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.contactInfo || "",
        },

        notes: {
          userId: user?._id?.toString() || "",
        },

        theme: {
          color: "#AEEA00",
        },

        modal: {
          ondismiss: function () {
            console.log("Payment closed");
          },
        },
      };

      // Step 4: Open Razorpay
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        toast.error("Payment failed. Try again.");
      });

      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong");
    }
  };

  const pricingData = [
    {
      name: "Trial",
      pricing: 0,
      features: [
        "Real-time Pickup Coordination",
        "Verified NGO Network",
        "CSR Impact Reports",
        "Smart Expiry Management",
        "Pickup History & Tracking",
        "Automated Notifications",
      ],
    },
    {
      name: "Pro plan",
      pricing: 299,
      mostPopular: true,
      features: [
        "Real-time Pickup Coordination",
        "Verified NGO Network",
        "CSR Impact Reports",
        "Smart Expiry Management",
        "Pickup History & Tracking",
        "Automated Notifications",
      ],
    },
  ];
  return (
    <div
      id="pricing"
      className="flex flex-col items-center pt-26 max-md:pt-25 px-4"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#f9570c] text-center mb-3">
        Start Making a Difference Today
      </h1>
      <p className="text-md sm:text-xl text-[#3e3737] my-2 text-center">
        Subscribe to streamline food sharing and boost your social impact.
        Everything you need to manage surplus food efficiently.
      </p>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-full w-3xl items-center mt-3 max-md:m-2">
        {pricingData.map((plan, index) => (
          <div
            key={index}
            className={
              plan.mostPopular
                ? "bg-linear-to-r from-[#ccff33] to-[#eff5ea] rounded-3xl p-2 shadow-2xl  transition-shadow"
                : ""
            }
          >
            {plan.mostPopular && (
              <p className="text-center text-[#3c4e05] text-md py-1.5">
                Popular
              </p>
            )}
            <div
              key={index}
              className={`rounded-3xl p-6 bg-white ${!plan.mostPopular ? "border border-neutral-200 shadow-2xl transition-shadow" : ""}`}
            >
              <h3 className="text-neutral-700 text-lg mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-[28px] text-neutral-900">
                  {`₹${plan.pricing}`}
                </span>
                <span className="text-neutral-600 text-xs">
                  {plan.mostPopular ? "/ month" : "/ 3 month"}
                </span>
              </div>
              <ul className="space-y-4 mb-5">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-neutral-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-circle-check-icon lucide-circle-check"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.mostPopular ? (
                user ? <button className="w-full cursor-pointer py-3 rounded-full bg-linear-to-r from-[#afe706] to-[#ffff24]/50 text-[#000000] text-sm hover:bg-linear-to-r hover:from-[#89df09] hover:to-[#ffff24] transition-all duration-500" onClick={handlePayment}>
                  Upgrade now
                </button> : <button className="w-full cursor-pointer py-3 rounded-full bg-linear-to-r from-[#afe706] to-[#ffff24]/50 text-[#000000] text-sm hover:bg-linear-to-r hover:from-[#89df09] hover:to-[#ffff24] transition-all duration-500" onClick={() => navigate("/login")}>
                  Get started
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
