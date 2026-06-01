export default function HowItWorks() {
  const steps = [
    { number: "01", title: "신청", desc: "이름, 직장, 직군, 연락처 입력. 첫 회차는 무료 체험이에요." },
    { number: "02", title: "매칭", desc: "같은 역세권 6인 이하 소그룹으로 묶어드립니다. 이동시간 0분." },
    { number: "03", title: "식사", desc: "화제 카드 5장이 준비돼 있어요. 만나면 보증금 즉시 환급." },
  ];

  return (
    <section id="how-it-works" className="py-28 px-6 md:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-600 text-xs font-semibold uppercase tracking-widest mb-5">작동 방식</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-16">딱 세 단계예요</h2>

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
