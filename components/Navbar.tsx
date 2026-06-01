"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <span className="font-bold text-gray-900 text-lg tracking-tight">밀팅 <span className="font-bold tracking-wider">MEaLTing</span></span>
      <a
        href="#signup"
        onClick={(e) => { e.preventDefault(); document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" }); }}
        className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
      >
        점심 신청하기
      </a>
    </nav>
  );
}
