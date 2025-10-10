"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Step1 from "./setup-form/Step1";
import Step2 from "./setup-form/Step2";
import Step3 from "./setup-form/Step3";
import axios from "axios";

export type FormDataType = {
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
  writtenContent: "yes" | "no" | "unanswered";
  writtenDetails: string;
  profileImage: string | null;
  
  dob: Date | null;
  gender: string;
  languages: string[];
  currentlyLivingCountry: string;
  phoneNumber: string;
  leaveAPYear: number | null;
  previousSchoolName: string;
  currentlyUniversityStudent: "yes" | "no" | "unanswered";
  currentUniversityName: string;
  services: string[];
  whyStudyingCourse: string;
  skilsExperience: string;
  hobbiesInterests: string;
  caringCauses: string;
  accomplishmentsProudOf: string;
  answerQ1: string;
  answerQ2: string;
  answerQ3: string;
  answerQ4: string;
  question1?: string;
  question2?: string;
  question3?: string;
  isRegisteredAmbassador: "yes" | "no" | "unanswered"
};

export type ErrorsType = Partial<Record<keyof FormDataType, string>>;

export default function EditProfile() {
  
  const [formData, setFormData] = useState<FormDataType>({
    
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
      following: [],
    },
    calendlyLink: "",
    writtenContent: "unanswered",
    writtenDetails: "",
    profileImage: null,

    dob: null,
    gender: "",
    languages: [],
    currentlyLivingCountry: "",
    phoneNumber: "",
    leaveAPYear: null,
    previousSchoolName: "",
    currentlyUniversityStudent: "unanswered",
    currentUniversityName: "",
    services: [],
    whyStudyingCourse: "",
    skilsExperience: "",
    hobbiesInterests: "",
    caringCauses: "",
    accomplishmentsProudOf: "",
    answerQ1: "",
    answerQ2: "",
    answerQ3: "",
    answerQ4: "",
    question1: "",
    question2: "",
    question3: "",
    isRegisteredAmbassador: "unanswered"
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

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

      const data = res.data;
      console.log("Profile data: ", data);

      setFormData({
        fullName: data?.user?.fullName || "",
        email: data?.user?.email || "",
        subject: data?.subject || "",
        university: data?.university || "",
        countryOriginal: data?.countryOriginal || "",
        countryCurrent: data?.countryCurrent || "",
        social: {
          facebook: data?.socialLinks?.facebook || "",
          instagram: data?.socialLinks?.instagram || "",
          tiktok: data?.socialLinks?.tiktok || "",
          x: data?.socialLinks?.x || "",
          linkedin: data?.socialLinks?.linkedin || "",
          youtube: data?.socialLinks?.youtube || "",
          following: data?.following || [],
        },
        calendlyLink: data?.calendlyLink || "",
        writtenContent: data?.writtenContent || "unanswered",
        writtenDetails: data?.writtenDetails || "",
        profileImage: data?.profileImage || null,
  
        dob: data?.dob || null,
        gender: data?.gender || "",
        languages: data?.languages || [],
        currentlyLivingCountry: data?.currentlyLivingCountry || "",
        phoneNumber: data?.phoneNumber || "",
        leaveAPYear: data?.leaveAPYear || null,
        previousSchoolName: data?.previousSchoolName || "",
        currentlyUniversityStudent: data?.currentlyUniversityStudent || "unanswered",
        currentUniversityName: data?.currentUniversityName || "",
        services: data?.services || [],
        whyStudyingCourse: data?.whyStudyingCourse || "",
        skilsExperience: data?.skilsExperience || "",
        hobbiesInterests: data?.hobbiesInterests || "",
        caringCauses: data?.caringCauses || "",
        accomplishmentsProudOf: data?.accomplishmentsProudOf || "",
        answerQ1: data?.answerQ1 || "",
        answerQ2: data?.answerQ2 || "",
        answerQ3: data?.answerQ3 || "",
        answerQ4: data?.answerQ4 || "",
        question1: data?.question1 || "",
        question2: data?.question2 || "",
        question3: data?.question3 || "",
        isRegisteredAmbassador: data?.isRegisteredAmbassador || "unanswered",
      });
    } catch (error: any) {
      console.log(error)
    } finally {
      setDataFetched(true);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  const [errors, setErrors] = useState<ErrorsType>({});

  const handleFieldChange = <K extends keyof FormDataType>(name: K, value: FormDataType[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSocialChange = (platform: keyof FormDataType["social"], value: string) => {
    setFormData((prev) => ({ ...prev, social: { ...prev.social, [platform]: value } }));
    setErrors((prev) => ({ ...prev, social: undefined }));
  };

  const handleToggleFollowing = (name: string) => {
    setFormData((prev) => {
      const following = prev.social.following.includes(name)
        ? prev.social.following.filter((f) => f !== name)
        : [...prev.social.following, name];
      return { ...prev, social: { ...prev.social, following } };
    });
    setErrors((prev) => ({ ...prev, social: undefined }));
  };

  const handleProfileImageChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, profileImage: null }));
      setErrors((prev) => ({ ...prev, profileImage: undefined }));
      return;
    }
  
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, profileImage: "Invalid file type. Use jpg/jpeg/png/gif." }));
      return;
    }
  
    if (file.size > 1024 * 1024) {
      setErrors((prev) => ({ ...prev, profileImage: "File too large — max 1 MB." }));
      return;
    }
  
    // Converting image file to Base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({ ...prev, profileImage: base64String }));
      setErrors((prev) => ({ ...prev, profileImage: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const validateStep = (step: number) => {
    const newErrors: ErrorsType = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      // simple email pattern check
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Enter a valid email";

      if (!formData.subject.trim()) newErrors.subject = "Subject is required";
      if (!formData.university.trim()) newErrors.university = "University is required";
      if (!formData.countryOriginal) newErrors.countryOriginal = "Please select your country";
      if (!formData.countryCurrent) newErrors.countryCurrent = "Please select current country";

      const hasSocialFilled = (Object.keys(formData.social) as Array<keyof typeof formData.social>)
      .some((key) => {
        if (key === "following") return false; // skip array field
        return Boolean(formData.social[key]);
      });
      if (!hasSocialFilled) newErrors.social = "Please fill at least one social media handle";

      if (!formData.calendlyLink.trim()) newErrors.calendlyLink = "Please provide your Calendly link";

      if (formData.writtenContent === "unanswered") newErrors.writtenContent = "Please select Yes or No";
      if (formData.writtenContent === "yes" && !formData.writtenDetails.trim()) newErrors.writtenDetails = "Please provide details";
      if (!formData.profileImage) newErrors.profileImage = "Please upload profile photo";
    }

    if (step === 2) {
      if (!formData.dob) newErrors.dob = "Please select your date of birth";
      if (!formData.gender) newErrors.gender = "Please select your gender";
      if (formData.languages.length === 0) newErrors.languages = "Please choose at least one language";
      if (!formData.currentlyLivingCountry) newErrors.currentlyLivingCountry = "Please select the country you currently live in";
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Please enter your phone number";
      else if (!/^[0-9+]{6,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Enter a valid phone number";
      if (!formData.leaveAPYear) newErrors.leaveAPYear = "Please enter the year you left AP";
      if (!formData.previousSchoolName.trim()) newErrors.previousSchoolName = "Please enter your previous school name";
      if (formData.currentlyUniversityStudent === "unanswered") newErrors.currentlyUniversityStudent = "Please select Yes or No";
      if (formData.currentlyUniversityStudent === "yes" && !formData.currentUniversityName.trim()) newErrors.currentUniversityName = "Please enter your current university name";
      if (formData.services.length < 3) newErrors.services = "Please select at least three services";
      if (!formData.whyStudyingCourse.trim()) {
        newErrors.whyStudyingCourse = "Please explain why you are studying your course";
      } else if (formData.whyStudyingCourse.trim().length < 50) {
        newErrors.whyStudyingCourse = "Your answer must be at least 50 characters long";
      }
      if (!formData.skilsExperience.trim()) {
        newErrors.skilsExperience = "Please describe your skills and experience";
      } else if (formData.skilsExperience.trim().length < 50) {
        newErrors.skilsExperience = "Your answer must be at least 50 characters long";
      }
      if (!formData.hobbiesInterests.trim()) newErrors.hobbiesInterests = "Please share your hobbies and interests"
      if (!formData.caringCauses.trim()) {
        newErrors.caringCauses = "Please share the causes you care about";
      } else if (formData.caringCauses.trim().length < 50) {
        newErrors.caringCauses = "Your answer must be at least 50 characters long";
      }
      if (!formData.accomplishmentsProudOf.trim()) {
        newErrors.accomplishmentsProudOf = "Please list your accomplishments you are proud of";
      } else if (formData.accomplishmentsProudOf.trim().length < 50) {
        newErrors.accomplishmentsProudOf = "Your answer must be at least 50 characters long";
      }
      if (!formData.answerQ1.trim()) newErrors.answerQ1 = "Please answer question 1";
      if (!formData.answerQ2.trim()) newErrors.answerQ2 = "Please answer question 2";
      if (!formData.answerQ3.trim()) newErrors.answerQ3 = "Please answer question 3";
      if (!formData.answerQ4.trim()) newErrors.answerQ4 = "Please answer question 4";
      if (!formData.question1 || !formData.question1.trim()) newErrors.question1 = "Please enter question 1";
      if (formData.isRegisteredAmbassador === "unanswered") newErrors.isRegisteredAmbassador = "Please select Yes or No";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((p) => p + 1);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => setCurrentStep((p) => Math.max(1, p - 1));

  async function sendSubmitForm() {

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
  
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/ambassador/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(1)) {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  
    if (!validateStep(2)) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
  
    setSubmitting(true);
  
    try {
      const success = await sendSubmitForm();
      if (success) {
        setCurrentStep(3);
      } else {
        setCurrentStep(2);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!dataFetched) {
    return <p className="p-5">Loading...</p>
  } else {
    return (
      <div className="container mx-auto w-full py-10 space-y-10 px-5">
  
        <div className="flex flex-col gap-2">
          <p className="flex w-full text-xl font-medium text-[#494848]">Update Profile</p>
          <p className="bg-[#FFF3CD] text-[#856404] flex items-center justify-center p-2 rounded-md">
            Please add some basic information about you here
          </p>
        </div>

        <div className="flex flex-col w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-between w-full px-4">
            <p
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold
              ${currentStep >= 1 ? "bg-[#08498E] text-white" : "bg-[#E0E0E0] text-[#08498E]"}`}
            >
              1
            </p>
            <div className={`h-2 flex-1 -mx-1 -z-10 ${currentStep >= 2 ? "bg-[#08498E]" : "bg-[#E0E0E0]"}`}></div>
            <p
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold
              ${currentStep >= 2 ? "bg-[#08498E] text-white" : "bg-[#E0E0E0] text-[#08498E]"}`}
            >
              2
            </p>
            <div className={`h-2 flex-1 -mx-1 -z-10 ${currentStep >= 3 ? "bg-[#08498E]" : "bg-[#E0E0E0]"}`}></div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold
              ${currentStep >= 3 ? "bg-[#08498E] text-white" : "bg-[#E0E0E0] text-[#08498E]"}`}
            >
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium w-full">
            <p className={`${currentStep >= 1 ? "text-[#08498E]" : "text-[#9E9E9E]"} pl-1`}>Basic Info</p>
            <p className={`${currentStep >= 2 ? "text-[#08498E]" : "text-[#9E9E9E]"} pl-2`}>Additional Info</p>
            <p className={`${currentStep >= 3 ? "text-[#08498E]" : "text-[#9E9E9E]"}`}>Completed</p>
          </div>
        </div>

        {currentStep === 1 && (
          <Step1
            formData={formData}
            errors={errors}
            onChange={(name, value) => handleFieldChange(name as keyof FormDataType, value)}
            onSocialChange={(platform, value) => handleSocialChange(platform, value)}
            onToggleFollowing={handleToggleFollowing}
            onProfileImageChange={handleProfileImageChange}
          />
        )}

        {currentStep === 2 && (
          <Step2
            formData={formData}
            errors={errors}
            onChange={(name, value) => handleFieldChange(name as keyof FormDataType, value)}
          />
        )}

        {currentStep === 3 && (
          <Step3/>
        )}

        <div className="w-full flex justify-between mx-auto">
          <div>
            {currentStep === 2 && (
              <button onClick={handleBack} className="px-4 py-2 rounded-full border border-[#08498E] text-[#08498E]">
                ← Previous
              </button>
            )}
          </div>

          <div>
            {currentStep < 2 && (
              <button onClick={handleNext} className="px-4 py-2 bg-[#08498E] text-white rounded-full">
                Save & Continue →
              </button>
            )}

            {currentStep === 2 && (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#08498E] text-white rounded-full"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit →"}
              </button>
            )}

          </div>
        </div>

      </div>
    )
  }
}
