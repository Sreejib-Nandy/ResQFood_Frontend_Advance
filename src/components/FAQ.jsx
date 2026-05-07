import React from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(-1);

  const faqs = [
    {
      question: "What is ResQFood and how does it work?",
      answer:
        "ResQFood connects restaurants with nearby NGOs to redistribute surplus food efficiently. Restaurants post available food, NGOs claim it, and pickups are coordinated seamlessly.",
    },
    {
      question: "Who can use ResQFood?",
      answer:
        "Restaurants and food businesses can list surplus food, while registered NGOs can claim and collect it.",
    },
    {
      question: "Is there any cost for NGOs?",
      answer:
        "No, ResQFood is completely free for NGOs to ensure maximum social impact and accessibility.",
    },
    {
      question: "Why do restaurants need a subscription?",
      answer:
        "The subscription unlocks features like CSR impact reports, analytics, and priority matching with NGOs.",
    },
    {
      question: "What happens if food is not collected in time?",
      answer:
        "Listings automatically expire after a set time, and notifications are sent to avoid confusion or misuse.",
    },
    {
      question: "Can restaurants access reports or analytics?",
      answer:
        "Yes, restaurants can view detailed insights including pickup history and CSR contribution reports and download it.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <div
        id="faq"
        className="bg-[#FAFAFA] flex items-center justify-center py-28 px-4 max-md:py-23"
      >
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <p className="text-sm font-medium tracking-wider text-slate-900 mb-2">
              FAQ'S
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#f9570c] text-center">
              Everything you need to know
            </h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-md max-md:text-sm text-zinc-800 pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0">
                      {openIndex === index ? (
                        <div className="size-7 rounded-full bg-black/4 flex items-center justify-center cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m8.348 8.348 6.874 6.874m.001-6.874-6.875 6.874"
                              stroke="#000"
                              strokeOpacity=".4"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="size-7 rounded-full bg-black/4 flex items-center justify-center cursor-pointer">
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.472 8.332h9.722M8.333 3.473v9.722"
                              stroke="#000"
                              strokeOpacity=".4"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </span>
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} transition-all duration-300`}
                >
                  <div className="px-5 py-4">
                    <p className="text-md max-md:text-sm font-light text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
