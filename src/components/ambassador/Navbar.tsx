"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  TextInitial,
  MessageSquareText,
  User,
  MenuIcon,
  X,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const [profileClicked, setProfileClicked] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function handleLogOut() {
    document.cookie = "token=; path=/; max-age=0"; // delete cookie
    localStorage.removeItem("token");
    router.push("/");
  }

  const [userName, setUserName] = useState("");
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

      if (!token) return;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ambassador/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserName(res?.data?.user?.fullName);
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="border-b border-gray-200 py-4 px-5 sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            alt="Logo"
            width={300}
            height={300}
            src="/images/logo.png"
            className="w-32 md:w-36"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-center gap-5 md:gap-8">
          <Link
            href="/ambassador/profile"
            className="flex flex-col items-center justify-center text-[#A4A4A4] hover:text-[#08498E]"
          >
            <Home size={20} />
            <p className="font-semibold text-sm">Profile</p>
          </Link>
          <Link
            href="/ambassador/blogs"
            className="flex flex-col items-center justify-center text-[#A4A4A4] hover:text-[#08498E]"
          >
            <TextInitial size={20} />
            <p className="font-semibold text-sm">Blogs</p>
          </Link>
          <Link
            href="/ambassador/inbox"
            className="flex flex-col items-center justify-center text-[#A4A4A4] hover:text-[#08498E]"
          >
            <MessageSquareText size={20} />
            <p className="font-semibold text-sm">Messages</p>
          </Link>
        </div>

        {/* Desktop Profile Dropdown */}
        <div className="relative hidden md:flex items-center justify-center gap-3">
          <div
            onClick={() => setProfileClicked(!profileClicked)}
            className="flex items-center text-[#4B5563] hover:text-[#08498E] gap-1 cursor-pointer select-none"
          >
            <User size={20} />
            <p className="font-semibold text-sm">{userName}</p>
            <div className="text-xs">▼</div>
          </div>
          {profileClicked && (
            <div className="absolute top-9 right-0 bg-white shadow-lg rounded-lg w-40 border border-gray-100 z-50 animate-fadeIn">
              <Link
                onClick={() => setProfileClicked(false)}
                href="/ambassador/profile-setup"
                className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
              >
                Edit Profile
              </Link>
              <button
                onClick={() => setProfileClicked(false)}
                className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 px-4 py-2"
              >
                Create Post
              </button>
              <button
                onClick={handleLogOut}
                className="block w-full text-left text-sm text-red-500 hover:bg-gray-100 px-4 py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSideBarOpen(true)}
          className="md:hidden text-gray-700"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSideBarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <div
            onClick={() => setIsSideBarOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          ></div>

          {/* Sidebar Panel */}
          <div className="relative bg-white w-64 h-full shadow-lg p-6 animate-slideIn flex flex-col justify-between">
            {/* Close Button */}
            <button
              onClick={() => setIsSideBarOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <X size={22} />
            </button>

            {/* Links */}
            <div className="mt-10 space-y-6">
              <Link
                href="/ambassador/profile"
                onClick={() => setIsSideBarOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-[#08498E]"
              >
                <Home size={20} /> <span>Profile</span>
              </Link>

              <Link
                href="/ambassador/blogs"
                onClick={() => setIsSideBarOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-[#08498E]"
              >
                <TextInitial size={20} /> <span>Blogs</span>
              </Link>

              <Link
                href="/ambassador/inbox"
                onClick={() => setIsSideBarOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-[#08498E]"
              >
                <MessageSquareText size={20} /> <span>Messages</span>
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 my-3"></div>

              {/* Profile Actions */}
              <Link
                href="/ambassador/profile-setup"
                onClick={() => setIsSideBarOpen(false)}
                className="flex items-center gap-3 text-gray-700 hover:text-[#08498E]"
              >
                ✏️ <span>Edit Profile</span>
              </Link>

              <button
                onClick={() => {
                  setIsSideBarOpen(false);
                  router.push("/ambassador/create-post") // or open modal
                }}
                className="flex items-center gap-3 text-gray-700 hover:text-[#08498E]"
              >
                📝 <span>Create Post</span>
              </button>
            </div>

            {/* Bottom User Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <User size={20} />
                <p className="font-semibold text-sm text-gray-700">{userName}</p>
              </div>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
