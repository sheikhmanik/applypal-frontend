export default function AmbassadorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex justify-center items-center py-8 px-2">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/40 p-6 md:p-10 mx-2">
        {/* Welcome Section */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-2 drop-shadow-md">
            Welcome, Ambassador!
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-medium">
            Your profile is set up and you're ready to guide and support students.
          </p>
        </div>
        {/* Your Role */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-purple-700 mb-2">
            Your Role
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            As an ambassador, you are a trusted resource for students. Respond to their queries, share your experience, and help make their journey easier and more rewarding. Your leadership and insights are what set you apart!
          </p>
        </div>
        {/* Actions / Services */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
            Quick Actions
          </h2>
          <ul className="space-y-2 md:space-y-3 pl-4 text-gray-700">
            <li className="text-base md:text-lg">
              <span className="font-medium text-indigo-600">Answer student questions</span>
            </li>
            <li className="text-base md:text-lg">
              <span className="font-medium text-indigo-600">Share tips and university resources</span>
            </li>
            <li className="text-base md:text-lg">
              <span className="font-medium text-indigo-600">Host or join events and group chats</span>
            </li>
            <li className="text-base md:text-lg">
              <span className="font-medium text-indigo-600">Update your profile and experience</span>
            </li>
          </ul>
        </div>
        {/* Encouragement */}
        <div className="text-center text-base md:text-lg text-purple-900 font-semibold mt-6">
          You’re making a difference, and students appreciate your help!
        </div>
      </div>
    </div>
  );
}
