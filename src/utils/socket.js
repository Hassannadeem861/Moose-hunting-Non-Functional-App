import { io } from "socket.io-client";

const SOCKET_URL = "https://realtor-backend-1c8fe7cf4bca.herokuapp.com";
// const SOCKET_URL = "http://192.168.1.10:3000"; // Local IP

let socket = null; // Singleton only one instance will be used in the whole app.


// Call connect only one time in App.js. 
export const connectSocket = (token) => {
  console.log("🔌 Connecting to Socket with token:", token);
  // If already connected, return the existing socket
  if (socket?.connected) {
    console.log("✅ Socket already connected", socket?.connected);
    return socket;
  }

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    auth: { token },           // JWT token send to server for authentication
    reconnection: true,        // It will reconnect automatically if it gets disconnected.
    reconnectionAttempts: 5,   // 5 attempts to reconnect before giving up
    reconnectionDelay: 2000,   // 2 second delay before retrying
  });

  socket.on("connect", () => {
    console.log("✅ Socket Connected! ID:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("❌ Socket Disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.log("🔴 Connection Error:", error.message, error);
  });

  socket.on("reconnect_attempt", (attempt) => {
    console.log("🔄 Socket reconnect attempt", attempt);
  });

  socket.on("reconnect_failed", () => {
    console.log("🔴 Socket reconnect failed");
  });

  return socket;
};

// Get the current socket instance (if needed in other parts of the app)
export const getSocket = () => socket;

// Optional: Call this to manually disconnect the socket (e.g., on logout)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket manually disconnected");
  }
};