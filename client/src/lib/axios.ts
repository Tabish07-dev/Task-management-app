import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Log API base URL in development (helps debug deployment issues)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api");
}

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("No response from API. Check NEXT_PUBLIC_API_URL env var.");
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
