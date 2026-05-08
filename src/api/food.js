import api from "./axios";

// -----------------------------
// RESTAURANT
// -----------------------------

// get food posts by restaurant
export const getFoodPosts = (restaurantId) => {
  return api.get(`/food/restaurant/${restaurantId}`);
};

// create food post
export const createFood = (formData) => {
  return api.post("/food/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// UPDATE food post
export const updateFood = (id, formData) => {
  return api.put(`/food/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE food post
export const deleteFood = (id) => {
  return api.delete(`/food/${id}`);
};

// get restaurant pending claims
export const getRestaurantClaims = () => {
  return api.get("/food/claims");
};


// -----------------------------
// NGO
// -----------------------------

// get all available food
export const getAllFood = () => {
  return api.get("/food");
};

// get nearby food
export const getNearbyFoods = async (radius_km = 5) => {
  const res = await api.get(`/food/nearby?radius_km=${radius_km}`);
  return res.data;
};

// get claimed foods (NGO dashboard)
export const getClaimedFoods = () => {
  return api.get("/food/ngo/claimed");
};

export const getMyClaims = async () => {
  const res = await api.get("food/claims/my");
  return res.data;
};

// claim food
export const claimFood = (id) => {
  return api.post(`/food/claim/${id}`);
};


// -----------------------------
// CLAIM ACTIONS (RESTAURANT)
// -----------------------------

export const acceptClaim = (claimId) => {
  return api.post("/food/accept", { claimId });
};

export const rejectClaim = (claimId) => {
  return api.post("/food/reject", { claimId });
};


// -----------------------------
// COLLECTION
// -----------------------------

export const onVerifyOtp = (foodId, otp) => {
  return api.post("/food/verify-otp", { foodId, otp });
};

export const getEachClaimRoute = (claimId) => {
  return api.get(`/food/claims/${claimId}`);
};