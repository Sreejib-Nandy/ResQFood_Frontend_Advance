import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "ResQFood helped us reduce food waste by over 40% in just a few weeks. The pickup coordination is incredibly smooth.",
      name: "GreenLeaf Bistro",
      role: "Restaurant Owner",
      image:
        "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg",
    },
    {
      text: "We used to struggle with last-minute food distribution. Now everything is organized and efficient.",
      name: "HopeServe Foundation",
      role: "NGO Coordinator",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzpYfkUexKLUrXtW-SmBzUiXLewn7mP6ynuw&s",
    },
    {
      text: "The CSR reports are a game changer. We can now clearly show our impact to stakeholders.",
      name: "Urban Spice Kitchen",
      role: "Restaurant Manager",
      image:
        "https://assets.cntraveller.in/photos/68d7cc12f64deab242cb3c3e/master/w_1600%2Cc_limit/Seasonal%2520Monsoon%2520Menu%2520-%2520The%2520Bombay%2520Canteen.jpg",
    },
    {
      text: "Getting notified instantly when food is available has made our operations much faster and more reliable.",
      name: "Helping Hands NGO",
      role: "Field Volunteer",
      image:
        "https://media.istockphoto.com/id/537311780/photo/unity-of-indian-children-asia.jpg?s=612x612&w=0&k=20&c=MaI8mTFkStJHG4ZyKXNbynkdSCObejk73qutdW7vS7k=",
    },
    {
      text: "The platform is simple yet powerful. From posting food to collection, everything just works.",
      name: "FreshBite Café",
      role: "Restaurant Owner",
      image:
        "https://images.pexels.com/photos/35056958/pexels-photo-35056958/free-photo-of-elegant-restaurant-interior-with-botanical-decor.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      text: "ResQFood has made it easier for us to reach more people in need without logistical headaches.",
      name: "CareBridge Initiative",
      role: "NGO Operations Lead",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmdvfGVufDB8fDB8fHww",
    },
  ];

  const rows = [
    { start: 0, end: 3, className: "animate-scroll" },
    { start: 3, end: 6, className: "animate-scroll-reverse" },
  ];

  const renderCard = (testimonial, index) => (
    <div
      key={index}
      className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shrink-0 w-87.5"
    >
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star text-transparent fill-[#f95703]"
              aria-hidden="true"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
          ))}
      </div>
      <p className="text-neutral-700 text-sm mb-6">{testimonial.text}</p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-13 h-13 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-neutral-800 text-sm">
            {testimonial.name}
          </p>
          <p className="text-neutral-600 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
                    @keyframes scroll {
                      0% {
                        transform: translateX(0);
                      }
                      100% {
                        transform: translateX(-50%);
                      }
                    }
                   
                    @keyframes scrollReverse {
                      0% {
                        transform: translateX(-50%);
                      }
                      100% {
                        transform: translateX(0);
                      }
                    }
                   
                    /* Default (desktop) */
                    .animate-scroll {
                      animation: scroll 15s linear infinite;
                    }
                   
                    .animate-scroll-reverse {
                      animation: scrollReverse 15s linear infinite;
                    }
                   
                    @media (max-width: 768px) {
                      .animate-scroll {
                        animation: scroll 10s linear infinite;
                      }
                   
                      .animate-scroll-reverse {
                        animation: scrollReverse 10s linear infinite;
                      }
                    }
                   `}
      </style>

      <section
        id="testimonials"
        className="bg-[#FAFAFA] py-28 px-4 max-md:py-23"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#f9570c] mb-3">
              What people are saying
            </h2>
            <p className="text-md sm:text-xl text-[#3e3737] my-2">
              Behind every saved meal is a story of hope — and we’ve seen
              thousands of them.
            </p>
          </div>

          <div className="space-y-6">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                <div className={`flex gap-6 ${row.className}`}>
                  {[
                    ...testimonials.slice(row.start, row.end),
                    ...testimonials.slice(row.start, row.end),
                  ].map((testimonial, index) => renderCard(testimonial, index))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
