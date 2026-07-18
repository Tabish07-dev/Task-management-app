import api from "@/lib/axios";

export const authService = {
  register: (payload: { name: string; email: string; password: string }) => api.post("/auth/register", payload),
  login: (payload: { email: string; password: string }) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};
