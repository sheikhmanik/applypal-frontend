import api from "./api";

export const ambassadorApi = {
  signup: (data: any) => api.post("/ambassador/signup", data),
  login: (data: any) => api.post("/ambassador/login", data),
  getProfile: () => api.get("/ambassador/profile"),
};

export const universityApi = {
  signup: (data: any) => api.post("/university/signup", data),
  login: (data: any) => api.post("/university/login", data),
  getProfile: () => api.get("/university/profile"),
};