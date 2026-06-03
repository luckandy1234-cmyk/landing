"use client";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 bg-white">
      <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-xs font-medium px-4 py-1.5 rounded-full mb-10 border border-orange-100">
        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
        광화문 파일럿
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6 max-w-3xl">
        오늘 점심,<br />
        <span className="text-orange-600">한 번쯤</span> 달라질 수 있어요
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
        같은 동네에서 일하는 처음 보는 직장인과<br />
        어색하지 않은 점심 한 시간을 매칭해드려요.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <a
          href="#signup"
          onClick={(e) => { e.preventDefault(); document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" }); }}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors"
        >
          무료로 신청하기 →
        </a>
        <a
          href="#why"
          onClick={(e) => { e.preventDefault(); document.getElementById("why")?.scrollIntoView({ behavior: "smooth" }); }}
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors px-4 py-3.5"
        >
          어떤 서비스인가요?
        </a>
      </div>

      {/* 하단 소형 뱃지 */}
      <div className="mt-20 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="text-orange-500">✓</span> 소규모 그룹 매칭</span>
        <span className="flex items-center gap-1.5"><span className="text-orange-500">✓</span> 내 회사 피하기</span>
        <span className="flex items-center gap-1.5"><span className="text-orange-500">✓</span> <span className="line-through">노쇼 방지 보증금</span> 파일럿 회차 무료신청</span>
      </div>
    </section>
  );
}
