"use client";

import Image from "next/image";
import { Calendar, Globe, User, Heart, Sparkles, Code2 } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../ui/Loader";

export default function ProfilePage() {

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>({
    fullName: "",
    email: "",
    subject: "",
    university: "",
    countryOriginal: "",
    countryCurrent: "",
    gender: "",
    dob: "",
    phoneNumber: "",
    languages: [],
    previousSchoolName: "",
    whyStudyingCourse: "",
    skilsExperience: "",
    hobbiesInterests: "",
    accomplishmentsProudOf: "",
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      x: "",
      youtube: "",
    },
    profileImage: "/images/dummy-user.png",
  });

  async function fetchProfileData() {
    try {
      const cookieString = document.cookie;
      const token = cookieString
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) return;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ambassador/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = res.data;

      setProfileData({
        fullName: user.user.fullName || "N/A",
        email: user.user.email || "N/A",
        subject: user.subject || "N/A",
        university: user.user.university || "N/A",
        countryOriginal: user.countryOriginal || "N/A",
        countryCurrent: user.countryCurrent || "N/A",
        gender: user.gender || "N/A",
        dob: user.dob ? new Date(user.dob) : null,
        phoneNumber: user.phoneNumber || "N/A",
        languages: user.languages || [],
        previousSchoolName: user.previousSchoolName || "N/A",
        whyStudyingCourse:
          user.whyStudyingCourse ||
          "I'm passionate about creating technology that simplifies life and helps people learn and grow.",
        skilsExperience:
          user.skilsExperience ||
          "Full Stack Developer (React, Node.js, TypeScript, PostgreSQL) — 2 years experience.",
        hobbiesInterests:
          user.hobbiesInterests || "Martial Arts, Music, Writing, and Open Source.",
        accomplishmentsProudOf:
          user.accomplishmentsProudOf ||
          "Built 3 full-stack projects, taught 20+ martial arts students, and contributed to open source.",
        social: {
          facebook: user.socialLinks?.facebook || "",
          instagram: user.socialLinks?.instagram || "",
          linkedin: user.socialLinks?.linkedin || "",
          x: user.socialLinks?.x || "",
          youtube: user.socialLinks?.youtube || "",
        },
        profileImage: user.profileImage || "/images/dummy-user.png",
      });
    } catch (error: any) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  const socialBases: Record<string, string> = {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
    x: "https://x.com/",
    youtube: "https://youtube.com/@",
  };

  if (loading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        <Loader/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100 flex justify-center items-center py-16 px-6">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
        
        {/* HEADER */}
        <div className="relative h-72 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-end text-center text-white px-6 pb-12">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/symphony.png')] opacity-30"></div>
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl -mb-6">
            <Image
              src={profileData.profileImage}
              alt={profileData.fullName}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative mt-8">
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">{profileData.fullName}</h1>
            <p className="text-lg opacity-90">{profileData.subject} Student</p>
            <p className="text-sm opacity-70 mt-1">{profileData.university}</p>
          </div>
        </div>

        {/* MAIN BODY */}
        <div className="px-8 md:px-14 py-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* PERSONAL INFO */}
            <div className="bg-white/70 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
              <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-indigo-700">
                <User className="w-6 h-6 text-indigo-600" /> Personal Info
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Email:</strong> {profileData.email}</li>
                <li><strong>Gender:</strong> {profileData.gender}</li>
                <li><strong>Date of Birth:</strong> {format(profileData.dob, "dd MMM yyyy")}</li>
                <li><strong>Phone:</strong> {profileData.phoneNumber}</li>
                <li><strong>Languages:</strong> {profileData.languages.join(", ")}</li>
              </ul>
            </div>

            {/* LOCATION */}
            <div className="bg-white/70 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
              <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-indigo-700">
                <Globe className="w-6 h-6 text-indigo-600" /> Location
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Country of Origin:</strong> {profileData.countryOriginal}</li>
                <li><strong>Currently Living:</strong> {profileData.countryCurrent}</li>
                <li><strong>University:</strong> {profileData.university}</li>
                <li><strong>Previous School:</strong> {profileData.previousSchoolName}</li>
              </ul>
            </div>
          </div>

          {/* ABOUT */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-indigo-700">
              <Sparkles className="w-6 h-6 text-indigo-600" /> About Me
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{profileData.whyStudyingCourse}</p>
          </div>

          {/* SKILLS, INTERESTS, ACCOMPLISHMENTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Code2 className="w-6 h-6 text-indigo-600" />, title: "Skills & Experience", text: profileData.skilsExperience },
              { icon: <Heart className="w-6 h-6 text-pink-500" />, title: "Hobbies & Interests", text: profileData.hobbiesInterests },
              { icon: <Calendar className="w-6 h-6 text-purple-600" />, title: "Accomplishments", text: profileData.accomplishmentsProudOf },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/70 p-7 rounded-2xl border border-gray-200 hover:shadow-xl transition">
                <h3 className="flex items-center gap-2 text-xl font-semibold mb-2 text-indigo-700">
                  {item.icon} {item.title}
                </h3>
                <p className="text-gray-700 text-base">{item.text}</p>
              </div>
            ))}
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <h2 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-indigo-700">
              <Heart className="w-6 h-6 text-pink-500" /> Connect with Me
            </h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(profileData.social ?? {})
              .filter(([_, username]) => typeof username === "string" && username.trim().length > 0)
              .map(([name, username]) => {
                const base = socialBases[name.toLowerCase()];
                if (!base) return null; // Skip platforms without a base URL
                const url = `${base}${username}`;
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full border border-indigo-300 text-indigo-700 font-medium hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-md transition-all capitalize"
                  >
                    {name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
