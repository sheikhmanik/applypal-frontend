"use client";

import { useState } from "react";
import { getNames } from "country-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FormDataType, ErrorsType } from "../AmbassadorInfo";
import { Check, Info } from "lucide-react";
import ISO6391 from "iso-639-1"; // Import the ISO 639-1 library (For Languages)
import Image from "next/image";
const allLanguages = ISO6391.getAllNames(); // Array of language names
const countries = getNames();

type Props = {
  formData: FormDataType,
  errors: ErrorsType;
  onChange: <K extends keyof FormDataType>(name: K, value: FormDataType[K]) => void;
}

export default function Step2({ formData, errors, onChange }: Props) {
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const [selectedLangs, setSelectedLangs] = useState<string[]>(formData.languages || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleLanguageSubmit = () => {
    onChange("languages", selectedLangs);
    setIsDropdownOpen(false);
  };

  return (
    <div className="container mx-auto w-full py-t0 space-y-10 px-5 text-[#656565]">
      
      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center gap-2 border-b pb-4 border-[#D9D9D9]">
          <Info size={16} />
          <p>Additional information</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <div className="flex flex-col w-full gap-1">
              <p className="text-sm pl-1">Date of birth *</p>
              <button
                className="flex-1 sm:flex-none min-w-[110px] px-3 py-2 border border-[#C7D1F2] rounded-md p-2"
                onClick={() => setIsDatePickerOpen((prev) => !prev)}
              >
                {formData.dob
                  ? format(formData.dob, "yyyy-MM-dd")
                  : "Choose Date of Birth"}
              </button>
            </div>
            {isDatePickerOpen && (
              <div className="absolute pt-2 flex items-center justify-center w-full z-10">
                <DatePicker
                  selected={formData.dob}
                  onChange={(date) => {
                    if (date) onChange("dob", date);
                    setIsDatePickerOpen(false);
                  }}
                  inline
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                />
              </div>
            )}
            {errors.dob && <p className="text-red-500 text-xs p-1">{errors.dob}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm pl-1">Gender *</p>
            <div className="relative w-full">
              <select
                name="gender"
                className="appearance-none w-full border border-[#C7D1F2] rounded-lg p-2 pr-10"
                value={formData.gender || ""}
                onChange={(e) => onChange("gender", e.target.value)}
              >
                <option value="" disabled>Select</option>
                {["Male", "Female", "Other"].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">▼</div>
            </div>
            {errors.gender && <p className="text-red-500 text-xs pl-1">{errors.gender}</p>}
          </div>
          <div className="relative">
            <div className="flex flex-col w-full gap-1">
              <p className="text-sm pl-1">Spoken languages *</p>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border border-[#C7D1F2] rounded-lg p-2 text-left flex justify-between items-center"
              >
                {
                  selectedLangs.length === 0
                  ? "Choose Languages"
                  : selectedLangs.length <= 2
                  ? selectedLangs.join(", ")
                  : `${selectedLangs.slice(0, 2).join(", ")}, and ${selectedLangs.length - 2} more`
                }
                <span>▼</span>
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute p-2 w-full border border-[#C7D1F2] rounded-lg bg-white shadow-md max-h-72 overflow-y-auto z-10">                
                {allLanguages.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLangs.includes(lang)}
                      onChange={() => handleCheckboxChange(lang)}
                      className="cursor-pointer"
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
                <div className="p-2 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 sticky bottom-0">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleLanguageSubmit}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            {errors.languages && <p className="text-red-500 text-xs pl-1">{errors.languages}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm pl-1">Currently Living in *</p>
            <div className="relative w-full">
              <select
                name="countryCurrentLiving"
                className="appearance-none w-full border border-[#C7D1F2] rounded-lg p-2 pr-10 outline-0"
                value={formData.currentlyLivingCountry || ""}
                onChange={(e) => onChange("currentlyLivingCountry", e.target.value)}
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
            {errors.currentlyLivingCountry && <p className="text-red-500 text-xs pl-1">{errors.currentlyLivingCountry}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm pl-1">Your Cell/Mobile number *</p>
            <input
              name="phonenumber"
              placeholder="Type here"
              className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              value={formData.phoneNumber || ""}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              maxLength={15}
              pattern="[0-9+]*"
              title="Please enter a valid phone number"
              type="tel"
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs pl-1">{errors.phoneNumber}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image width={100} height={100} alt="" src="/images/educational-icon.png" className="w-4" />
          <p className="">Your Education Details</p>
        </div>
        <div className="flex items-end justify-center gap-3 w-full md:flex-row flex-col">
          <div className="flex flex-col gap-1 w-full md:w-2/5">
            <label htmlFor="leaveAPYear" className="text-sm pl-1">What year did you leave AP?</label>
            <div className="relative w-full">
              <select
                id="leaveAPYear"
                name="leaveAPYear"
                value={formData.leaveAPYear || ""}
                onChange={(e) => onChange("leaveAPYear", Number(e.target.value))}
                className="appearance-none border border-[#C7D1F2] rounded-md p-2 outline-0 w-full"
                required
              >
                <option value="" disabled>Select year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i; // last 100 years
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">▼</div>
            </div>
            {errors.leaveAPYear && <p className="text-red-500 text-xs pl-1">{errors.leaveAPYear}</p>}
          </div>
          <div className="flex flex-col gap-1 w-full md:w-3/5">
            <p className="text-sm pl-1">Please enter the name of the school where you studied before starting at AP</p>
            <input
              name="previousSchoolName"
              placeholder="Your secondary/highschool name"
              className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              value={formData.previousSchoolName || ""}
              onChange={(e) => onChange("previousSchoolName", e.target.value)}
              maxLength={15}
              pattern="[0-9+]*"
              title="Please enter a valid phone number"
              type="tel"
              required
            />
            {errors.previousSchoolName && <p className="text-red-500 text-xs pl-1">{errors.previousSchoolName}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3 text-[#787878]">
          <p className="text-sm font-medium">Are you currently a university student?</p>
          <div className="flex flex-col">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currentlyUniversityStudent"
                  value={value}
                  checked={formData.currentlyUniversityStudent === value}
                  onChange={(e) => onChange("currentlyUniversityStudent", e.target.value === "yes" ? "yes" : "no")}
                  className="accent-[#7061F0] w-4 h-4"
                />
                <span className="text-[#787878]">{value === "yes" ? "Yes" : "No"}</span>
              </label>
            ))}
          </div>
          {errors.currentlyUniversityStudent && <p className="text-red-500 text-xs pl-1">{errors.currentlyUniversityStudent}</p>}
          {formData.currentlyUniversityStudent === "yes" && (
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <p className="text-sm">University Name *</p>
              <input
                name="currentUniversityName"
                placeholder="Type here"
                value={formData.currentUniversityName}
                onChange={(e) => onChange("currentUniversityName", e.target.value)}
                className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              />
            </div>
          )}
          {errors.currentUniversityName && <p className="text-red-500 text-xs pl-1">{errors.currentUniversityName}</p>}
        </div>
          
      </div>

      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image width={100} height={100} alt="" src="/images/flag.png" className="w-3" />
          <p className="">How can you help potential applicants?</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <p className="text-[#787878]">Choose at least three from these options:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4">
            {[
              "University Choices",
              "Networking",
              "Internships",
              "UCAS Applications",
              "Medical MMI",
              "GAMSAT",
              "Making Friends",
              "Mentoring",
              "STEP",
              "IMAT",
              "Mentor",
              "Student Life",
              "Career Choices",
              "Employability",
              "Interviews",
              "UCAT",
              "UMAT",
              "Accommodation",
              "Oxbridge",
              "HPAT",
              "Coaching"
            ].map((name) => (
              <label key={name} className="flex items-start gap-2 w-40 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.services.includes(name)}
                  onChange={(e) => {
                    const updatedServices = e.target.checked
                      ? [...formData.services, name]
                      : formData.services.filter((service) => service !== name);
                    onChange("services", updatedServices);
                  }}
                  className="accent-[#7061F0] mt-[5px]"
                />
                <p className="text-[#787878]">{name}</p>
              </label>
            ))}
          </div>
          {errors.services && <p className="text-red-500 text-xs pl-1">{errors.services}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <p className="">Why am I studying (course)?</p>
          <textarea
            name="whyStudyingCourse"
            value={formData.whyStudyingCourse || ""}
            onChange={(e) => onChange("whyStudyingCourse", e.target.value)}
            className="border rounded-lg p-2 text-sm outline-none text-black min-h-20 max-h-40"
            rows={3}
            placeholder="Please write a little about you, your goals, future ambitions, etc"
          />
          <p className="text-xs flex justify-end">0/50 Characters</p>
          {errors.whyStudyingCourse && <p className="text-red-500 text-xs">{errors.whyStudyingCourse}</p>}
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="">My skills and experience</p>
          <textarea
            name="skilsExperience"
            value={formData.skilsExperience || ""}
            onChange={(e) => onChange("skilsExperience", e.target.value)}
            className="border rounded-lg p-2 text-sm outline-none text-black min-h-20 max-h-40"
            rows={3}
            placeholder="Eg"
          />
          <p className="text-xs flex justify-end">0/50 Characters</p>
          {errors.skilsExperience && <p className="text-red-500 text-xs">{errors.skilsExperience}</p>}
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="">Your hobbies and interests</p>
          <textarea
            name="hobbiesInterests"
            value={formData.hobbiesInterests || ""}
            onChange={(e) => onChange("hobbiesInterests", e.target.value)}
            className="border rounded-lg p-2 text-sm outline-none text-black min-h-20 max-h-40"
            rows={3}
            placeholder="eg. Sports, Music, Travel, Reading etc"
          />
          {errors.hobbiesInterests && <p className="text-red-500 text-xs">{errors.hobbiesInterests}</p>}
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="">Causes you care about</p>
          <textarea
            name="caringCauses"
            value={formData.caringCauses || ""}
            onChange={(e) => onChange("caringCauses", e.target.value)}
            className="border rounded-lg p-2 text-sm outline-none text-black min-h-20 max-h-40"
            rows={3}
            placeholder="eg. World Poverty, Mental health, Housing Crisis etc"
          />
          <p className="text-xs flex justify-end">0/50 Characters</p>
          {errors.caringCauses && <p className="text-red-500 text-xs">{errors.caringCauses}</p>}
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="">Accomplishments I am proud of</p>
          <textarea
            name="accomplishmentsProudOf"
            value={formData.accomplishmentsProudOf || ""}
            onChange={(e) => onChange("accomplishmentsProudOf", e.target.value)}
            className="border rounded-lg p-2 text-sm outline-none text-black min-h-20 max-h-40"
            rows={3}
            placeholder="eg. Academic or sporting achievements, charity work, etc"
          />
          <p className="text-xs flex justify-end">0/50 Characters</p>
          {errors.accomplishmentsProudOf && <p className="text-red-500 text-xs">{errors.accomplishmentsProudOf}</p>}
        </div>

        <p>Please can you provide answers for the following typical questions that potential students are likely to ask you:</p>

        <div className="flex flex-col gap-4">
          {[
            { key: "answerQ1", label: "Q1: How far is the accommodation? *", placeholder: "Answer 1" },
            { key: "answerQ2", label: "Q2: Are you enjoying your course? *", placeholder: "Answer 2" },
            { key: "answerQ3", label: "Q3: What is your monthly cost of living? *", placeholder: "Answer 3" },
            { key: "answerQ4", label: "Q4: What clubs or societies are there? *", placeholder: "Answer 4" },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="flex flex-col gap-2">
              <p>{label}</p>
              <input
                name={key}
                placeholder={placeholder}
                value={(formData as any)[key] || ""}
                onChange={(e) => onChange(key as keyof typeof formData, e.target.value)}
                className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              />
              {errors[key as keyof typeof formData] && (
                <p className="text-red-500 text-xs">{errors[key as keyof typeof formData]}</p>
              )}
            </div>
          ))}
        </div>

        <p>Questions I would have asked before I joined</p>
        
        <div className="flex flex-col gap-4">
          {[
            { key: "question1", placeholder: "eg. How far is the accommodation from the campus, what social activities are  there etc. Please add at least one question, and add up to three." },
            { key: "question2", placeholder: "Question 2 (optional)" },
            { key: "question3", placeholder: "Question 3 (optional)" },
          ].map(({ key, placeholder }) => (
            <div key={key} className="flex flex-col gap-2">
              <input
                name={key}
                placeholder={placeholder}
                value={(formData as any)[key] || ""}
                onChange={(e) => onChange(key as keyof typeof formData, e.target.value)}
                className="border border-[#C7D1F2] rounded-md p-2 outline-0"
              />
              {errors[key as keyof typeof formData] && (
                <p className="text-red-500 text-xs">{errors[key as keyof typeof formData]}</p>
              )}
            </div>
          ))}
        </div>

      </div>

      <div className="space-y-5 bg-gray-50 p-5 py-7 shadow-lg">
        <div className="flex items-center gap-2 border-b pb-4 border-[#D9D9D9]">
          <Image width={100} height={100} alt="" src="/images/advisory.png" className="w-4" />
          <p className=""> Advisory Experience</p>
        </div>
        <div className="space-y-3 text-[#787878]">
          <p className="">Are you registered as an Ambassador for your existing university? *</p>
          <div className="flex flex-col">
            {["yes", "no"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isRegisteredAmbassador"
                  value={value}
                  checked={formData.isRegisteredAmbassador === value}
                  onChange={(e) => onChange("isRegisteredAmbassador", e.target.value === "yes" ? "yes" : "no")}
                  className="accent-[#7061F0] w-4 h-4"
                />
                <span className="text-[#787878]">{value === "yes" ? "Yes" : "No"}</span>
              </label>
            ))}
          </div>
          {errors.isRegisteredAmbassador && <p className="text-red-500 text-xs pl-1">{errors.isRegisteredAmbassador}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-[#6C757D] text-sm border border-x-0 border-t-0 border-b border-[#E7E7E7] pb-5">
        {[
          "I accept the Terms of Service",
          "I agree to the mentor Codes of Conduct.",
          "I consent that my personal data will be used in accordance to the Privacy Notice.",
          "I give permission for this photograph, or other data that I may submit, will be used on my profile and for other promotional purposes for the (College name), including their website homepage.",
        ].map((text, idx) => (
          <div key={idx} className="flex items-start gap-2 pl-1 pb-1">
            <Check size={18} className="flex-shrink-0 mt-1" />
            <p className="leading-snug">{text}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
