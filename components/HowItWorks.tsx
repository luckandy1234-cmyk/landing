import React from "react";

export default function HowItWorks() {
  const steps = [
    { number: "01", title: "신청", desc: <>이름, 직장, 직군, 연락처 등 입력 <span className="line-through text-gray-300">후 노쇼 보증금 입금</span> (파일럿 회차 무료신청)</> },
    { number: "02", title: "매칭", desc: "같은 역세권 6인 이하 소그룹으로 묶어드립니다. 이동시간 0분." },
    { number: "03", title: "식사", desc: <>만나실 식당과 화제 카드를 제안드려요 <span className="line-through text-gray-300">만나면 보증금 즉시 환급.</span></> },
  ];

  return (
    <section id="how-it-works" className="py-28 px-6 md:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-600 text-xs font-semibold uppercase tracking-widest mb-5">어떻게 하면 되나요</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-16">딱 세 단계에요</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.number}>
              <div className="text-orange-200 text-5xl font-black mb-5 leading-none">{s.number}</div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-gray-100 rounded-2xl p-7">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-medium mb-5">화제 카드 미리보기</p>
          <div className="flex flex-wrap gap-2.5">
            {[
              "이 동네 인생 맛집 하나만?",
              "지금 회사 말고 해보고 싶었던 일?",
              "직장인 되고 가장 의외였던 점?",
              "주말에 이 근처 오면 뭐 해요?",
              "최근에 진짜 잘 샀다 싶은 거?",
            ].map((c) => (
              <span key={c} className="border border-gray-200 text-gray-500 text-xs px-4 py-2 rounded-full hover:border-orange-300 hover:text-orange-700 transition-colors cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
