import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // 방금 만든 컴포넌트 임포트

export const metadata: Metadata = {
  title: "쌀더팜 | 게이머들의 농장",
  description: "게이밍 정보를 공유하는 깨끗한 커뮤니티",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Navbar /> {/* 상단에 배치 */}
        {children}
      </body>
    </html>
  );
}
