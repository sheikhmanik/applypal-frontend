import api from "./api";

// Ambassador
interface AmbassadorSignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AmbassadorLoginData {
  email: string;
  password: string;
}

// University
interface UniversitySignupData {
  fullName: string;
  email: string;
  university: string;
  password: string;
  confirmPassword?: string;
}

interface UniversityLoginData {
  email: string;
  password: string;
}

export const ambassadorApi = {
  signup: (data: AmbassadorSignupData) => api.post("/ambassador/signup", data),
  login: (data: AmbassadorLoginData) => api.post("/ambassador/login", data),
  getProfile: () => api.get("/ambassador/profile"),
};

export const universityApi = {
  signup: (data: UniversitySignupData) => api.post("/university/signup", data),
  login: (data: UniversityLoginData) => api.post("/university/login", data),
  getProfile: () => api.get("/university/profile"),
};