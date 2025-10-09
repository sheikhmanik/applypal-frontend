import Navbar from "@/components/ambassador/Navbar";

export default function AmbassadorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}