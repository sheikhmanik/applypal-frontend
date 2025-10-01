"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { getNames } from "country-list";
import { Info } from "lucide-react";

const countries = getNames();

type WrittenContent = "yes" | "no" | "";

type FormType = {
  fullName: string;
  email: string;
  subject: string;
  university: string;
  countryOriginal: string;
  countryCurrent: string;
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    x: string;
    linkedin: string;
    youtube: string;
    following: string[];
  };
  calendlyLink: string;
  writtenContent: WrittenContent;
  writtenDetails: string;
  profileImage: File | null;
};

type ErrorsType = Partial<Record<keyof FormType | "social", string>>;


export default function AmbassadorInfo() {
  
  // ---------- Form State ----------
  const [form, setForm] = useState<FormType>({
    fullName: "",
    email: "",
    subject: "",
    university: "",
    countryOriginal: "",
    countryCurrent: "",
    social: {
      facebook: "",
      instagram: "",
      tiktok: "",
      x: "",
      linkedin: "",
      youtube: "",
      following: [] as string[],
    },
    calendlyLink: "",
    writtenContent: "" as "yes" | "no" | "",
    writtenDetails: "",
    profileImage: null as File | null,
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [currentStep, setCurrentStep] = useState<number>(1);

  // ---------- Handle Input Change ----------
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error on input
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ---------- Handle Checkbox Change ----------
  const handleCheckbox = (name: string) => {
    const following = form.social.following;
    if (following.includes(name)) {
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, following: following.filter((f) => f !== name) },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, following: [...following, name] },
      }));
    }
  };

  // ---------- Handle Profile Image Upload ----------
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) return;

    // Validation
    if (!["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, profileImage: "Invalid file type" }));
      return;
    }
    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({ ...prev, profileImage: "File size should be under 1 MB" }));
      return;
    }

    setForm((prev) => ({ ...prev, profileImage: file }));
    setErrors((prev) => ({ ...prev, profileImage: "" }));
  };

  // ---------- Handle Form Validation ----------
  const validateForm = () => {
    const newErrors: ErrorsType = {};

    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.subject) newErrors.subject = "Subject is required";
    if (!form.university) newErrors.university = "University name is required";
    if (!form.countryOriginal) newErrors.countryOriginal = "Please select your country";
    if (!form.countryCurrent) newErrors.countryCurrent = "Please select current country";
    if (!form.social.facebook && !form.social.instagram && !form.social.tiktok && !form.social.x && !form.social.linkedin && !form.social.youtube)
      newErrors.social = "Please fill at least one social media";
    if (!form.calendlyLink) newErrors.calendlyLink = "Please provide your Calendly link";
    if (!form.writtenContent) newErrors.writtenContent = "Please select Yes or No";
    if (form.writtenContent === "yes" && !form.writtenDetails) newErrors.writtenDetails = "Please provide details";
    if (!form.profileImage) newErrors.profileImage = "Please upload profile photo";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------- Handle Form Submit ----------
  const handleSubmit = (step: number) => {
    if (!validateForm()) return;
    console.log("Form Data:", form);
    setCurrentStep(step);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto w-full py-10 space-y-10 px-5">

      <div className="flex flex-col gap-2">
        <p className="flex w-full">Update Profile</p>
        <p className="bg-[#FFF3CD] text-[#856404] flex items-center justify-center p-2 rounded-md">Please add some basic information about you here</p>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between w-full px-4">
          <p
            className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold
            ${currentStep >= 1 ? "bg-[#08498E] text-white" : "bg-[#E0E0E0] text-[#08498E]"}`}
          >
            1
          </p>
          <div className={`h-2 flex-1 ${currentStep >= 2 ? "bg-[#08498E]" : "bg-[#E0E0E0]"}`}></div>
          <p
            className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold
            ${currentStep >= 2 ? "bg-[#08498E] text-white" : "bg-[#E0E0E0] text-[#08498E]"}`}
          >
            2
          </p>
          <div className={`h-2 flex-1 ${currentStep >= 3 ? "bg-[#08498E]" : "bg-[#E0E0E0]"}`}></div>
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold
            ${currentStep >= 3 ? "bg-[#08498E] text-white" : "bg-[#E0E0E0] text-[#08498E]"}`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm font-medium">
          <p className={`${currentStep >= 1 ? "text-[#08498E]" : "text-[#9E9E9E]"}`}>
            Basic Info
          </p>
          <p className={`${currentStep >= 2 ? "text-[#08498E]" : "text-[#9E9E9E]"}`}>
            Additional Info
          </p>
          <p className={`${currentStep >= 3 ? "text-[#08498E]" : "text-[#9E9E9E]"}`}>
            Completed
          </p>
        </div>
      </div>

      {/* Form Sections */}
      <div className="space-y-5">
        {/* Basic Info */}
        <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
          <div className="flex items-center gap-2 border-b pb-4 border-[#D9D9D9]">
            <Info size={16} />
            <p className="text-[#494848]">Basic Information</p>
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
                  value={String(form[field.name as keyof typeof form] ?? "")}
                  onChange={handleChange}
                  className="border border-[#C7D1F2] rounded-md p-2 outline-0"
                />
                {errors[field.name as keyof FormType] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name as keyof FormType]}
                  </p>
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
                    value={String(form[field.name as keyof typeof form] ?? "")}
                    onChange={handleChange}
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
                {errors[field.name as keyof FormType] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.name as keyof FormType]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
          <div className="flex items-center justify-start gap-2 border-b pb-4 border-[#D9D9D9]">
            <Image alt="" width={100} height={100} src="/images/thumbs-up.png" className="w-5" />
            <p className="text-[#656565]">Social Media</p>
          </div>
          <p className="text-[#787878]">
            We use the power of social media to inform potential students about us. Please add your social media username/id/page here. (At least one is required)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["facebook", "instagram", "tiktok", "x", "linkedin", "youtube"].map((platform) => (
              <div key={platform} className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Image alt={platform} width={16} height={16} src={`/images/${platform === "x" ? "twitter" : platform}.png`} className="w-4" />
                  <p className="text-sm">{platform.charAt(0).toUpperCase() + platform.slice(1)} profile</p>
                </div>
                <input
                  type="text"
                  name={platform}
                  placeholder="@johndoe"
                  value={form.social[platform as keyof typeof form.social] as string}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      social: { ...prev.social, [platform]: e.target.value },
                    }))
                  }
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
                    checked={form.social.following.includes(tool.name)}
                    onChange={() => handleCheckbox(tool.name)}
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
            <Image alt="" width={100} height={100} src="/images/flag.png" className="w-4" />
            <p className="text-[#656565]">Virtual Meetings</p>
          </div>

          <div className="flex flex-col gap-2 text-[#787878]">
            <p className="pl-[2px]">Calendly link *</p>
            <input
              type="text"
              name="calendlyLink"
              placeholder="@johndoe"
              value={form.calendlyLink}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, calendlyLink: e.target.value }));
                if (errors.calendlyLink) setErrors((prev) => ({ ...prev, calendlyLink: "" }));
              }}
              className="border border-[#C7D1F2] rounded-md p-2 outline-0"
            />
            {errors.calendlyLink && <p className="text-red-500 text-sm pl-1">{errors.calendlyLink}</p>}

            <p className="pl-[2px] text-sm">
              {"Please also add your Calendly link here, so that your visitors are able to book an appointment to talk to your Ambassadors. Don't have a Calendly link? Create a free Calendly account here:"}
            </p>
          </div>
        </div>

        {/* Content Creation */}
        <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
          <div className="flex items-center justify-start gap-2 border-b pb-4 border-[#D9D9D9]">
            <Image alt="" width={100} height={100} src="/images/flag.png" className="w-4" />
            <p className="text-[#656565]">Content Creation</p>
          </div>
          <div className="flex flex-col gap-3 text-[#787878]">
            <p className="text-sm font-medium">
              Have you written any content that may be of interest to prospective students?
            </p>

            <div className="flex gap-6">
              {["yes", "no"].map((value) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="writtenContent"
                    value={value}
                    checked={form.writtenContent === value}
                    onChange={(e) => setForm((prev) => ({ ...prev, writtenContent: e.target.value as "yes" | "no" }))}
                    className="accent-[#7061F0] w-4 h-4"
                  />
                  <span className="text-[#787878]">{value === "yes" ? "Yes" : "No"}</span>
                </label>
              ))}
            </div>
            {errors.writtenContent && <p className="text-red-500 text-sm">{errors.writtenContent}</p>}

            {form.writtenContent === "yes" && (
              <div className="flex flex-col gap-2">
                <p className="text-sm">Please provide further details here, links, etc.</p>
                <textarea
                  name="writtenDetails"
                  value={form.writtenDetails}
                  onChange={handleChange}
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
            <Image alt="" width={100} height={100} src="/images/user.png" className="w-4" />
            <p className="text-[#656565]">Upload profile photo</p>
          </div>
          <div className="flex items-center justify-center w-full py-5">
            <div className="w-[250px]">
              <label
                htmlFor="profileImage"
                className="w-full h-[300px] border border-dashed bg-[#F5F8FF] rounded-xl flex justify-center items-center cursor-pointer"
              >
                {form.profileImage ? (
                  <Image
                    src={URL.createObjectURL(form.profileImage)}
                    alt="preview"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                ) : (
                  <p className="text-[#3A3D4D] font-semibold">Click here to upload image</p>
                )}
              </label>
              <input type="file" id="profileImage" className="hidden" onChange={handleImageUpload} />
              {errors.profileImage && <p className="text-red-500 text-sm text-center">{errors.profileImage}</p>}
              <p className="text-[#787878] text-center pt-2 text-sm">
                Please upload image in one of these formats: jpg | jpeg | png | gif. Keep filesize under 1 MB.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full flex justify-end pr-5">
        <button
          onClick={() => handleSubmit(2)}
          className="px-4 py-2 border border-[#08498E] rounded-full text-[#08498E]"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  );
}