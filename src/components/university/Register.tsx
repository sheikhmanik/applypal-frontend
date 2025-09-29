"use client";

import { useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {

  const role = "university";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    university: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.university.trim())
      newErrors.university = "University is required.";
  
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;
    
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must contain uppercase, lowercase, number, and special character.";
      }
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }
    }
  
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSubmitted(true); // mark that user tried submitting
  
    if (validate()) {
      const payload = { ...formData, role };
      console.log("Submitting:", payload);
  
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/ambassador/signup`,
          payload
        );
      
        // Success: store token & user info
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      
        alert("Registration successful!");
        setSending(false);
        window.location.href = "/";
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const data = error.response?.data;
      
          // Check for user already exists
          if (data?.error === "User already exists" || data?.message?.includes("already exists")) {
            alert("A user with this email already exists. Please login instead.");
            setSending(false);
            return;
          } else {
            // Other errors
            alert(data?.message || "Something went wrong. Please try again.");
            setSending(false);
          }
      
          console.error("Axios error:", data || error.message);
          setSending(false);
        } else {
          console.error("Unexpected error:", error);
          alert("Something went wrong. Please try again.");
          setSending(false);
        }
      }
    }
  };

  const passwordRules = [
    { regex: /[A-Z]/, label: "At least one uppercase letter" },
    { regex: /[a-z]/, label: "At least one lowercase letter" },
    { regex: /\d/, label: "At least one number" },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, label: "At least one special character" },
    { test: (pw: string) => pw.length >= 8, label: "At least 8 characters" },
  ];
  
  type PasswordRule = {
    label: string;
    regex?: RegExp;
    test?: (pw: string) => boolean;
  };
  const checkPasswordRule = (pw: string, rule: PasswordRule) => {
    if (rule.regex) return rule.regex.test(pw);
    if (rule.test) return rule.test(pw);
    return false;
  };

  const isPasswordValid = (password: string) => {
    return passwordRules.every((rule) => checkPasswordRule(password, rule));
  };

  return (
    <div className="flex flex-col md:flex-row">

      {sending && (
        <p>Submiting...</p>
      )}

      {/* Register info */}
      <div className="w-full md:w-1/2 xl:w-2/5 h-full flex flex-col items-center md:items-end justify-center md:justify-end p-3 sm:p-8">
        <div className="flex flex-row items-start justify-between w-full max-w-md m-3 px-2 gap-5">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="ApplyPal Logo"
              className="w-28 sm:w-32 object-contain"
              width={300} height={300}
            />
          </Link>
          <p className="text-sm sm:text-base text-gray-700">
            Already have an account?{" "}
            <a href="/auth/login/university" className="font-semibold text-[#C80914] hover:underline">
              Login
            </a>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-5 w-full md:max-w-md h-full flex flex-col"
        >
          <p className="text-lg font-semibold mb-4">
            Partner with us now in just a few steps
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full name *"
              value={formData.fullName}
              onChange={handleChange}
              className="px-3 py-4 outline outline-gray-200 rounded-lg shadow-md w-full"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="px-3 py-4 outline outline-gray-200 rounded-lg shadow-md w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              name="university"
              placeholder="University *"
              value={formData.university}
              onChange={handleChange}
              className="px-3 py-4 outline outline-gray-200 rounded-lg shadow-md w-full"
            />
            {errors.university && (
              <p className="text-red-500 text-sm">{errors.university}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={formData.password}
              onChange={handleChange}
              className="px-3 py-4 outline outline-gray-200 rounded-lg shadow-md w-full"
            />
            {submitted && !isPasswordValid(formData.password) && (
              <div className="flex flex-col gap-1 mt-1">
                {passwordRules.map((rule, idx) => (
                  <p
                    key={idx}
                    className={`text-sm ${
                      checkPasswordRule(formData.password, rule)
                        ? "text-green-600"
                        : "text-gray-400"
                    } flex items-center gap-1`}
                  >
                    {checkPasswordRule(formData.password, rule) && (
                      <Check className="w-4 h-4" />
                    )}
                    {rule.label}
                  </p>
                ))}
              </div>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="px-3 py-4 outline outline-gray-200 rounded-lg shadow-md w-full"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}

            <div className="flex flex-col items-center justify-between space-y-2 sm:gap-0 pt-5 w-full">
              <div className="flex items-start w-full">
                <div className="flex items-center justify-center gap-2 pl-1 pb-1">
                  <Check/>
                  <p className="text-[#6C757D]">
                    I accept the{" "}
                    <a className="font-bold text-[#6C757D]">Terms of Service</a>
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#C80914] text-white px-6 py-2 rounded-3xl font-bold text-lg md:w-auto"
              >
                Sign Up
              </button>
            </div>
            <p className="text-[#6C757D] pt-3 text-center sm:text-start">
              By registering here you agree to our{" "}
              <a className="font-bold text-[#6C757D]">Cookies Policy</a> and{" "}
              <a className="font-bold text-[#6C757D]">Privacy Policy</a>.
            </p>
          </div>
        </form>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 xl:w-3/5 relative max-h-[800px]">
        <Image
          src="/images/applypal_banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
          width={300} height={300}
        />
        <div className="bg-[#D9D9D940] absolute inset-0"></div>
      </div>
      
    </div>
  )
}
