import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "밀팅 — 한 끼에 만남의 가치를 더하다",
  description: "직장인 점심 매칭 서비스",
  openGraph: {
    title: "밀팅 Mealting",
    description: "광화문 직장인 점심 매칭 서비스",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
