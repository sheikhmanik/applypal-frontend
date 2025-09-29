import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex items-center justify-center text-[#7987A1] text-sm sm:text-lg gap-1 p-4 flex-wrap border-[1px] border-y border-x-0 border-[#D4DBED]">
            <p className="flex items-center justify-center">Powered by</p>
            <div className="flex items-center justify-center">
                <Image src="/images/logo.png" alt="Logo" className="w-28 sm:w-40 object-contain" />
            </div>
            <p className="flex items-center justify-center">Copyright {new Date().getFullYear()}</p>
        </footer>

    )
}