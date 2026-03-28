"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            쌀더팜
          </span>
        </Link>

        {/* 메뉴 영역 */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            커뮤니티
          </Link>

          {/* 글쓰기 버튼 */}
          <Link
            href="/posts/create"
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              pathname === "/posts/create"
                ? "bg-green-600 text-white shadow-md"
                : "bg-green-50 text-green-600 hover:bg-green-100"
            }`}
          >
            글쓰기
          </Link>
        </div>
      </div>
    </nav>
  );
}
