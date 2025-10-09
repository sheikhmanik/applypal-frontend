"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  
  const [loading, setLoading] = useState(true);

  async function fetchProfileData() {
    try {

      // 🔑 Extract token from cookies
      const cookieString = document.cookie; // e.g. "token=abc123; theme=dark"
      const token = cookieString
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]
      ;

      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ambassador/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Profile data:", res.data);
    } catch (error) {
      console.error(error, "Can't fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="p-4">
      <button className="px-4 py-2">
        {loading ? "Loading..." : "Profile data on the console.."}
      </button>
    </div>
  );
}
