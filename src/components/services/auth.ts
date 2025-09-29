import api from "./api";

export const ambassadorApi = {
  signup: (data) => api.post("/ambassador/signup", data),
  login: (data) => api.post("/ambassador/login", data),
  getProfile: () => api.get("/ambassador/profile"),
};

export const universityApi = {
  signup: (data) => api.post("/university/signup", data),
  login: (data) => api.post("/university/login", data),
  getProfile: () => api.get("/university/profile"),
};