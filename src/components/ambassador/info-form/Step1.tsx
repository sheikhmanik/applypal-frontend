"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getNames } from "country-list";
import { Info } from "lucide-react";
import type { FormDataType, ErrorsType } from "../AmbassadorInfo";

const countries = getNames();

type Props = {
  formData: FormDataType;
  errors: ErrorsType;
  onChange: <K extends keyof FormDataType>(name: K, value: FormDataType[K]) => void;
  onSocialChange: (platform: keyof FormDataType["social"], value: string) => void;
  onToggleFollowing: (name: string) => void;
  onProfileImageChange: (file: File | null) => void;
};

export default function Step1({ formData, errors, onChange, onSocialChange, onToggleFollowing, onProfileImageChange }: Props) {
  
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    setPreviewSrc(formData.profileImage);
  }, [formData.profileImage]);

  return (
    <div className="space-y-5">
      {/* Basic Info */}
      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg text-[#656565]">
        <div className="flex items-center gap-2 border-b pb-4 border-[#D9D9D9]">
          <Info size={16} />
          <p className="">Basic Information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "Full Name" },
            { label: "Registered email", name: "email", type: "email", placeholder: "Email" },
            { label: "Subject field you are currently studying", name: "subject", type: "text", placeholder: "Subject Name" },
            { label: "Name of current University / College", name: "university", type: "text", placeholder: "Add name" },
          ].map((field) => (
            <div className="flex flex-col gap-1" key={field.name}>
              <p className="text-sm pl-1">{field.label} *</p>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof FormDataType] as string}
                onChange={(e) => onChange(field.name as keyof FormDataType, e.target.value)}
                className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              />
              {errors[field.name as keyof FormDataType] && (
                <p className="text-red-500 text-sm">{errors[field.name as keyof FormDataType]}</p>
              )}
            </div>
          ))}

          {/* Countries */}
          {[
            { label: "Which country are you from originally?", name: "countryOriginal" },
            { label: "Currently studying in*", name: "countryCurrent" },
          ].map((field) => (
            <div className="flex flex-col gap-1" key={field.name}>
              <p className="text-sm pl-1">{field.label} *</p>
              <div className="relative w-full">
                <select
                  name={field.name}
                  value={formData[field.name as keyof FormDataType] as string}
                  onChange={(e) => onChange(field.name as keyof FormDataType, e.target.value)}
                  className="appearance-none w-full border border-[#C7D1F2] rounded-lg p-2 pr-10 outline-0"
                >
                  <option value="" disabled>
                    Choose Country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">▼</div>
              </div>
              {errors[field.name as keyof FormDataType] && (
                <p className="text-red-500 text-sm">{errors[field.name as keyof FormDataType]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Section */}
      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg text-[#656565]">
        <div className="flex items-center justify-start gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image alt="thumb" width={100} height={100} src="/images/thumbs-up.png" className="w-5" />
          <p>Social Media</p>
        </div>

        <p>
          We use the power of social media to inform potential students about us. Please add your social media username/id/page here. (At least one is required)
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(["facebook", "instagram", "tiktok", "x", "linkedin", "youtube"] as (keyof FormDataType["social"])[]).map((platform) => (
            <div key={platform} className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Image alt={String(platform)} width={16} height={16} src={`/images/${platform === "x" ? "twitter" : platform}.png`} className="w-4" />
                <p className="text-sm">{String(platform).charAt(0).toUpperCase() + String(platform).slice(1)} profile</p>
              </div>
              <input
                type="text"
                name={String(platform)}
                placeholder="@johndoe"
                value={String(formData.social[platform] ?? "")}
                onChange={(e) => onSocialChange(platform, e.target.value)}
                className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              />
            </div>
          ))}
        </div>

        {errors.social && <p className="text-red-500 text-sm">{errors.social}</p>}

        {/* Social media following checkboxes */}
        <div className="flex flex-col">
          <p className="text-[#787878]">Please select the social media on which you follow us, so we can follow you back:</p>
          <div className="flex flex-wrap">
            {[
              { name: "Facebook", icon: "/images/facebook.png" },
              { name: "Instagram", icon: "/images/instagram.png" },
              { name: "TikTok", icon: "/images/tiktok.png" },
              { name: "X", icon: "/images/twitter.png" },
              { name: "LinkedIn", icon: "/images/linkedin-logo.png" },
              { name: "Youtube", icon: "/images/youtube.png" },
            ].map((tool) => (
              <label key={tool.name} className="flex items-center gap-2 w-40 rounded-lg p-2 cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.social.following.includes(tool.name)}
                  onChange={() => onToggleFollowing(tool.name)}
                />
                <div className="flex items-center gap-2">
                  <Image alt={tool.name} width={16} height={16} src={tool.icon} />
                  <p className="text-[#787878]">{tool.name}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Calendly link */}
      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center justify-start gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image alt="flag" width={100} height={100} src="/images/flag.png" className="w-4" />
          <p className="text-[#656565]">Virtual Meetings</p>
        </div>

        <div className="flex flex-col gap-2 text-[#787878]">
          <p className="pl-[2px]">Calendly link *</p>
          <input
            type="text"
            name="calendlyLink"
            placeholder="https://calendly.com/yourname"
            value={formData.calendlyLink}
            onChange={(e) => onChange("calendlyLink", e.target.value)}
            className="border border-[#C7D1F2] rounded-md p-2 outline-0"
          />
          {errors.calendlyLink && <p className="text-red-500 text-sm pl-1">{errors.calendlyLink}</p>}

          <p className="pl-[2px] text-sm">
            {"Please also add your Calendly link here, so that your visitors are able to book an appointment to talk to your Ambassadors. Don't have a Calendly link? Create a free Calendly account."}
          </p>
        </div>
      </div>

      {/* Content Creation */}
      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center justify-start gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image alt="flag" width={100} height={100} src="/images/flag.png" className="w-4" />
          <p className="text-[#656565]">Content Creation</p>
        </div>

        <div className="flex flex-col gap-3 text-[#787878]">
          <p className="text-sm font-medium">Have you written any content that may be of interest to prospective students?</p>

          <div className="flex gap-6">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="writtenContent"
                  value={value}
                  checked={formData.writtenContent === value}
                  onChange={(e) => onChange("writtenContent", e.target.value === "yes" ? "yes" : "no")}
                  className="accent-[#7061F0] w-4 h-4"
                />
                <span className="text-[#787878]">{value === "yes" ? "Yes" : "No"}</span>
              </label>
            ))}
          </div>

          {errors.writtenContent && <p className="text-red-500 text-sm">{errors.writtenContent}</p>}

          {formData.writtenContent === "yes" && (
            <div className="flex flex-col gap-2">
              <p className="text-sm">Please provide further details here, links, etc.</p>
              <textarea
                name="writtenDetails"
                value={formData.writtenDetails}
                onChange={(e) => onChange("writtenDetails", e.target.value)}
                className="border rounded-lg p-2 text-sm outline-none text-black min-h-20 max-h-40 focus:ring-2 focus:ring-[#7061F0]"
                rows={3}
              />
              {errors.writtenDetails && <p className="text-red-500 text-sm">{errors.writtenDetails}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Profile Upload */}
      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center justify-start gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image alt="user" width={100} height={100} src="/images/user.png" className="w-4" />
          <p className="text-[#656565]">Upload profile photo</p>
        </div>

        <div className="flex items-center justify-center w-full py-5">
          <div className="w-[250px]">
            <label
              htmlFor="profileImage"
              className="w-full h-[300px] border border-dashed bg-[#F5F8FF] rounded-xl flex justify-center items-center cursor-pointer"
            >
              {previewSrc ? (
                <Image src={previewSrc} alt="preview" width={150} height={150} className="object-contain" />
              ) : (
                <p className="text-[#3A3D4D] font-semibold">Click here to upload image</p>
              )}
            </label>

            <input
              type="file"
              id="profileImage"
              className="hidden"
              onChange={(e) => onProfileImageChange(e.target.files?.[0] ?? null)}
              accept="image/*"
            />

            {errors.profileImage && <p className="text-red-500 text-sm text-center">{errors.profileImage}</p>}
            <p className="text-[#787878] text-center pt-2 text-sm">
              Please upload image in one of these formats: jpg | jpeg | png | gif. Keep filesize under 1 MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
