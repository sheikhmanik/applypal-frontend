"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function LoginPage() {
  
  const role = "ambassador";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ambassador/login`,
        { ...formData, role },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save token and user info
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      window.location.href = "/";
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        alert(data?.message || "Login failed. Please check your credentials.");
        console.error("Axios error:", data || error.message);
      } else {
        alert("Unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-16 bg-white shadow-lg">
        <div className="max-w-md w-full mx-auto">
          <a href="/" className="flex justify-center mb-10">
            <Image src="/images/logo.png" alt="ApplyPal Logo" className="w-40" />
          </a>

          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Login to continue to <span className="font-semibold text-red-600">ApplyPal</span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-red-600" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-red-600 font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/" className="text-red-600 font-semibold hover:underline">
              Register now
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Hero image */}
      <div className="hidden md:flex flex-1 relative bg-gray-100">
        <Image
          src="/images/login-hero.jpg"
          alt="Login Banner"
          className="w-full h-full object-cover rounded-l-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 to-red-900/70 flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-md text-center leading-snug">
            Connecting <span className="text-yellow-300">students</span> and{" "}
            <span className="text-yellow-300">ambassadors</span> worldwide
          </h2>
        </div>
      </div>
    </main>
  )
}
