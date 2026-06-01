export default function Features() {
  const items = [
    { icon: "📍", title: "거리 기반 매칭", desc: "같은 역세권이라 이동시간 0분. 근처 사람이라는 안전감." },
    { icon: "🔒", title: "노쇼 방지", desc: "소액 보증금으로 진짜 올 사람만 거릅니다. 만나면 즉시 환급." },
    { icon: "🃏", title: "화제 카드", desc: "첫 침묵이 가장 어렵습니다. 카드 5장이 그 3초를 해결해요." },
    { icon: "👥", title: "소규모 그룹", desc: "1:1은 부담스럽습니다. 6인 이하 소그룹으로 부담을 분산해요." },
  ];

  return (
    <section className="py-28 px-6 md:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-600 text-xs font-semibold uppercase tracking-widest mb-5">차별점</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">밀팅이 다른 이유</h2>
        <p className="text-gray-400 mb-16">기존 앱의 우려되실 것들을 차단했습니다.</p>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item) => (
            <div key={item.title} className="bg-white border border-gray-100 rounded-2xl px-7 py-7 flex gap-5">
              <span className="text-2xl mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
