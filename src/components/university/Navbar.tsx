"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="container mx-auto grid grid-cols-4 pt-2 overflow-x-auto">
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer flex-shrink-0 border-[#08498E] border-b">
                <Image src="/images/ph_student.png" alt="Student" className="w-6 sm:w-7" />
                <p className="text-xs sm:text-sm text-center">Student</p>
            </div>
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer flex-shrink-0 border-[#D3D4D8] border-b">
                <Image src="/images/graduation_cap.png" alt="Student Life" className="w-6 sm:w-7" />
                <p className="text-xs sm:text-sm text-center">Student Life</p>
            </div>
            <div className="flex flex-col items-center justify-center p-2 cursor-pointer flex-shrink-0 border-[#D3D4D8] border-b">
                <Image src="/images/message.png" alt="Messages" className="w-6 sm:w-7" />
                <p className="text-xs sm:text-sm text-center">Messages</p>
            </div>
            {isLoggedIn ? (
                <div className="flex flex-col items-center justify-center p-2 cursor-pointer flex-shrink-0 border-[#D3D4D8] border-b"
                    onClick={() => setIsLoggedIn(false)}
                >
                    <Image src="/images/settings.png" alt="Settings" className="w-6 sm:w-7" />
                    <p className="text-xs sm:text-sm text-center">Settings</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-2 cursor-pointer flex-shrink-0 border-[#D3D4D8] border-b"
                    onClick={() => setIsLoggedIn(true)}
                >
                    <Image src="/images/sign-up.png" alt="Settings" className="w-6 sm:w-7" />
                    <p className="text-xs sm:text-sm text-center">Sign Up</p>
                </div>
            )}
        </div>
    )
}
