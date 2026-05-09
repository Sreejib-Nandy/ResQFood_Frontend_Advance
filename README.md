![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
# 🌱 ResQFood Frontend — Real-Time Food Redistribution Platform

>**ResQFood Frontend** is a modern, real-time web application that connects **restaurants** with **NGOs** to redistribute surplus food efficiently before it expires.

It provides **live tracking, OTP-based secure collection, CSR analytics, and real-time communication**, ensuring both **impact and accountability**.

> **“Transforming surplus food into social impact.”**

---

## 📌 Table of Contents

1. Introduction  
2. Core Features  
3. Key Innovations  
4. Technology Stack  
5. User Roles  
6. Complete Workflow  
7. Real-Time System  
8. OTP-Based Verification  
9. CSR & Analytics  
10. Social Impact  
11. Food Waste & Garbage Management  
12. Feasibility & Scalability  
13. Comparison with Existing Solutions  
14. Future Scope  
15. Conclusion
16. Installation & Setup  
17. Environment Variables
18. Folder Structure
19. How to Fork & Contribute  
20. License  
21. Author
22. Support  

---

## 1️⃣ Introduction

Food waste and hunger exist side by side.

ResQFood Frontend enables:
- Restaurants to donate surplus food
- NGOs to discover and collect it in real time
- Secure verification using OTP
- Impact tracking through analytics & CSR reports

---

## 2️⃣ Core Features

### Authentication & Access Control
- Secure login/signup with email and Google
- Role-based routing (Restaurant / NGO)
- Protected routes with access validation

---

### Restaurant Dashboard
- Create & manage food posts
- Accept / Reject NGO claims
- OTP-based food handover system
- CSR Impact dashboard
- Analytics & PDF report generation
- Payment Gateway for accessing the analytics feature - Subscription Plan

---

### NGO Dashboard
- Claim for food on real map
- View accepted & collected food
- Real-time claim updates
- OTP display for verification
- Route navigation to restaurant

---

### 🗺️ Smart Map System
- Google Maps integration
- Nearby food discovery
- Distance & ETA tracking
- Route visualization

---

### 🔐 OTP-Based Security Layer
- 4-digit OTP generated on claim acceptance
- Sent via email + socket
- Verified at collection time
- Prevents fraud & misuse

---

### 📊 CSR & Analytics
- Food distribution insights
- Efficiency trends
- Impact cards
- Professional CSR report (PDF export)

---

### ⚡ Real-Time Features
- Live updates via Socket.io
- Instant claim notifications
- Auto sync across dashboards
- No page refresh required

---

## 3️⃣ 🚀 Key Innovations

- ⚡ Real-time synchronization using WebSockets
- 🔐 OTP-based secure food collection
- 📧 Email notifications (claim + collection)
- ⏱️ Expiry-aware system (backend-driven)
- 📊 CSR analytics with visual insights
- 🧠 Clean role-based architecture

---

## 4️⃣ 🛠️ Technology Stack

### 🌐 Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS

### 📊 UI & Visualization
- Recharts (Analytics)
- PrimeReact (OTP Input)

### 🔄 Real-Time
- Socket.io Client

### 🌍 APIs & Services
- Axios
- Google Maps API
- LocationIQ API

---

## 5️⃣ 👥 User Roles

### 🍴 Restaurant
- Post surplus food
- Accept NGO claims
- Verify OTP on collection
- Track impact & analytics via CSR dashboard

---

### 🤝 NGO
- Discover nearby food on real map
- Claim food in real time
- Navigate to location
- Show OTP for collection

---

## 6️⃣ 🔄 Complete Workflow

1. Restaurant posts food
2. NGOs see food instantly on map
3. NGO sends claim request
4. Restaurant accepts claim
5. OTP is generated & shared
6. NGO travels to restaurant
7. OTP is verified
8. Food marked as collected
9. CSR data updated automatically

---

## 7️⃣ ⚡ Real-Time System

- Instant claim updates
- Live availability changes
- Socket-based synchronization
- No refresh UX

---

## 8️⃣ 🔐 OTP-Based Verification

- Generated on claim acceptance
- Stored securely in DB
- Sent via:
  - Email
  - Socket event
- Verified at restaurant before collection

---

## 9️⃣ 📊 CSR & Analytics

- Daily performance metrics
- Food distribution tracking
- Impact cards (total posts, collections)
- Visual charts (line, bar, pie)
- Exportable CSR report (PDF)

---

## 1️⃣0️⃣ Social Impact

### 🥗 Hunger Reduction
- Faster access to food for NGOs
- Reduced dependency on delayed donations

### 🧹 Garbage Management
- Less organic waste in landfills
- Improved waste segregation
- Lower methane emissions

### 🌍 Sustainability
- Responsible food usage
- Environment-friendly system

---

## 1️⃣1️⃣ How ResQFood Reduces Food & Garbage Waste

- Prevents food from being discarded
- Encourages timely redistribution
- Stops expired food from entering supply
- Reduces overall garbage volume
- Promotes sustainable practices

---

## 1️⃣2️⃣ Feasibility & Scalability

### Why ResQFood is practical:
- No special hardware needed
- Cloud-based scalable infrastructure
- Can be adopted city-wise or nationally

---

## 1️⃣3️⃣ Comparison with Existing Surplus Food Apps

|         Feature         | ResQFood | Traditional Apps |
|-------------------------|----------|------------------|
| Real-time updates       |    ✅    |        ❌       |
| Auto expiry             |    ✅    |        ❌       |
| WebSocket alerts        |    ✅    |        ❌       |
| NGO-focused flow        |    ✅    |        ❌       |
| Garbage reduction logic |    ✅    |        ❌       |

---

## 1️⃣4️⃣ Future Scope

- 📱 Mobile application
- 🧠 AI demand prediction
- 🏛️ Government & municipality integration
- 🏆 Reward system for donors

---

## 1️⃣5️⃣ Conclusion

ResQFood demonstrates how **technology, automation, and social responsibility** can work together to solve a real-world problem.

It is not just a hackathon prototype —  
it is a **scalable, impactful, and sustainable solution** for food waste and social welfare.

## 📚 Documentation

🔗 Backend Repository - https://github.com/Sreejib-Nandy/ResQFood_Backend_Advance

---

## 1️⃣6️⃣ 📦 Installation & Setup

### 🔹 Clone Repository

```bash
git clone https://github.com/your-username/resqfood-frontend.git
cd resqfood-frontend
```

### 🔹 Install Dependencies

```bash
npm install
```

###  🔹 Run Development Server

```bash
npm run dev
```

###  🔹 Build for Production

```bash
npm run build
```

---

## 1️⃣7️⃣ 🔐 Environment Variables

```env
REACT_APP_API_URL = http://localhost:5173

VITE_API_URL = http://localhost:5000

VITE_SOCKET_URL = http://localhost:5000

VITE_GOOGLE_CLIENT_ID = 

VITE_LOCATIONIQ_KEY = 

VITE_RAZORPAY_KEY_ID = 

VITE_GOOGLE_MAPS_API =
```

---

## 1️⃣8️⃣ 📁 Folder Structure

```bash
resqfood-frontend/
│
├── public/
│
├── src/
│ ├── api/ 
│ │ ├── axios.js 
│ │ └── food.js 
│ |
│ ├── assets/ 
│ |
│ ├── components/
│ │ ├── Banner.jsx
│ │ ├── ClaimCard.jsx 
│ │ ├── CookieConsent.jsx
│ │ ├── CountUp.jsx
│ │ ├── CreateFood.jsx
│ │ ├── DeleteModal.jsx
│ │ ├── EditFood.jsx
│ │ ├── FAQ.jsx
│ │ ├── Features.jsx
│ │ ├── FoodCard.jsx
│ │ ├── Footer.jsx
│ │ ├── HeroSection.jsx
│ │ ├── ImpactCard.jsx
│ │ ├── MapFoodModal.jsx
│ │ ├── Menu.jsx
│ │ ├── Navbar.jsx
│ │ ├── NgoDashboardCard.jsx 
│ │ ├── Pricing.jsx
│ │ ├── ProgressBar.jsx
│ │ ├── RestaurantDashboardNavbar.jsx
│ │ ├── Sidebar.jsx
│ │ ├── Spinner.jsx
│ │ └── Testimonials.jsx
│ |
│ ├── context/ 
│ │ └── AuthContext.jsx 
│ |
│ ├── lib/ 
│ │ └── utils.js
│ |
│ ├── pages/ 
│ │ ├── AnalyticsPage.jsx
│ │ ├── ClaimsPage.jsx 
│ │ ├── CompleteProfile.jsx
│ │ ├── CreateFoodPage.jsx
│ │ ├── CSRReport.jsx 
│ │ ├── Home.jsx
│ │ ├── ImpactPage.jsx
│ │ ├── LogIn.jsx
│ │ ├── MapView.jsx 
│ │ ├── NgoDashboard.jsx
│ │ ├── NgoRoutePage.jsx
│ │ ├── NotFound.jsx 
│ │ ├── RestaurantDashboard.jsx
│ │ ├── SignUp.jsx
│ │ └── UpdateProfile.jsx
│ |
│ ├── route/ 
│ │ ├── AuthRoute.jsx
│ │ ├── ProfileRoute.jsx
│ │ ├── ProtectedRoute.jsx
│ │ └── PublicRoute.jsx
│ |
│ ├── socket/ 
│ │ └── socket.js
│ |
│ ├── App.jsx 
│ ├── main.jsx 
│ └── index.css 
│
├── .env 
├── .gitignore
├── .nvmrc
├── README.md
├── components.json
├── eslint.config.js
├── index.html 
├── jsconfig.json
├── package-lock.json
├── package.json 
├── postcss.config.js
├── tailwind.config.js 
├── vercel.json 
└── vite.config.js 
```

---

## 1️⃣9️⃣ 🍴 How to Fork & Contribute

- Fork this repository
- Clone your fork
  ```bash
  git clone https://github.com/your-username/resqfood-frontend.git
  ```
- Create a new branch
  ```bash
  git checkout -b feature/your-feature
  ```
- Make your changes
- Commit
  ```bash
  git commit -m "Add: your feature"
  ```
- Push
  ```bash
  git push origin feature/your-feature
  ```
- Open a Pull Request

---

## 2️⃣0️⃣ 📄 License

This project is licensed under the **MIT License**.

---

## 2️⃣1️⃣ 👨‍💻 Author

Sreejib Nandy
>Built with ❤️ for sustainability and social impact

---

## 2️⃣2️⃣ ⭐ Support

If you believe in reducing food waste 
- Give it a ⭐ on GitHub
- Share with others
- Contribute to the project
- Contribute to the project
>>>>>>> 08c50fba1269d8d81c542ad0c8805f9d3f6c8258
