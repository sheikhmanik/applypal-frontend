export default function Loader() {
  return (
    <div className="bg-opacity-70 flex justify-center items-center p-4 z-50" style={{ minHeight: '60px' }}>
      <div className="relative w-14 h-14">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-300 animate-spin shadow-inner"></div>
        {/* Middle Ring */}
        <div className="absolute inset-2 rounded-full border-4 border-purple-400 border-t-transparent animate-spin shadow"></div>
        {/* Inner Ring */}
        <div className="absolute inset-4 rounded-full border-4 border-pink-500 border-b-transparent animate-spin"></div>
      </div>
    </div>
  );
}
