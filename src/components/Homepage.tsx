export default function Homepage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-5xl">
          Connecting students with their university’s alumni ambassadors.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Students get guidance. Universities manage connections. Ambassadors support the next generation.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <a
            href="/auth/register/university"
            className="bg-white text-red-700 font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition"
          >
            I am a University
          </a>
          <a
            href="/auth/register/ambassador"
            className="bg-black text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-900 transition"
          >
            I am an Ambassador
          </a>
        </div>
        {/* <p className="pt-7 text-sm sm:text-base text-white">
          <span className="opacity-80">Already have an account?</span>{" "}
          <a
            href="/auth/login"
            className="inline-block font-semibold text-yellow-300 hover:text-white transition-colors duration-200 underline underline-offset-4"
          >
            Login →
          </a>
        </p> */}
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 rounded-2xl shadow-lg border text-center">
          <h2 className="text-2xl font-bold mb-3">For Universities</h2>
          <p className="text-gray-600 mb-4">
            Register your institution, showcase programs, and connect with
            ambassadors who represent your brand globally.
          </p>
          <a
            href="/auth/register/university"
            className="text-red-600 font-semibold hover:underline"
          >
            Get Started →
          </a>
        </div>

        <div className="p-6 rounded-2xl shadow-lg border text-center">
          <h2 className="text-2xl font-bold mb-3">For Ambassadors</h2>
          <p className="text-gray-600 mb-4">
            Become the voice of your university, guide new students, and gain
            recognition while helping others succeed.
          </p>
          <a
            href="/auth/register/ambassador"
            className="text-red-600 font-semibold hover:underline"
          >
            Join as Ambassador →
          </a>
        </div>
      </section>
    </main>
  )
}