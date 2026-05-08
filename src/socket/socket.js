import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  timeout: 10000,
});

// CONNECT
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

// DISCONNECT
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// CLEAN LISTENERS
export const cleanupSocket = () => {
  socket.off(); // safer than removeAllListeners
};

// SETUP LISTENERS (MAINLY FOR NGO)
export const setupSocketListeners = (callbacks = {}) => {
  connectSocket();
  cleanupSocket();

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  // FOOD EVENTS (NGO MAP)
  socket.on("new_food_post", callbacks.onNewFoodPost);
  socket.on("food_updated", callbacks.onFoodUpdated);
  socket.on("food_deleted", callbacks.onFoodDeleted);
  socket.on("food_unavailable", callbacks.onFoodUnavailable);
  socket.on("food_expired", callbacks.onFoodExpired);

  // CLAIM EVENTS
  socket.on("new_claim", callbacks.onNewClaim);
  socket.on("claim_accepted", callbacks.onClaimAccepted);
  socket.on("claim_rejected", callbacks.onClaimRejected);

  // COLLECTION
  socket.on("food_collected", callbacks.onFoodCollected);

  // LOCATION
  socket.on("ngo_location_update", callbacks.onLocationUpdate);

  // DASHBOARD
  socket.on("stats_updated", callbacks.onStatsUpdated);
  socket.on("restaurant_claims_update", callbacks.onClaimsUpdate);
};

export default socket;