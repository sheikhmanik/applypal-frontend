import Image from "next/image";
import Link from "next/link";

export default function Step3() {
  return (
    <>
    <div className="bg-white px-6 py-10 rounded-2xl shadow-lg w-full md:w-3/4 lg:w-2/3 mx-auto">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <Image
          alt="Process completed"
          src="/images/step-completed.png"
          width={500}
          height={500}
          className="w-10 h-10 sm:w-13 sm:h-13 object-contain"
        />

        <h2 className="text-2xl md:text-3xl font-semibold text-[#08498E]">
          Thank you for submitting your details!
        </h2>

        <p className="text-gray-700 md:text-lg leading-relaxed max-w-xl">
          You will receive an e-mail once your details have been approved.
        </p>

        <p className="text-gray-500 text-sm md:text-base max-w-xl">
          Please add <span className="font-medium">signup@theapplygroup.com</span> to your contacts to avoid notification e-mails going to your junk/spam folder.
        </p>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <Link href="/ambassador" className="px-4 py-2 bg-[#08498E] text-white rounded-full">
        Ambassador Page →
      </Link>
    </div>
    </>
  );
}