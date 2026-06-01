export default function Problem() {
  const moments = [
    {
      solo: "또 혼자 편의점 도시락",
      together: "옆 빌딩 디자이너와 밥 먹다가\n사이드 프로젝트 얘기가 나왔다",
    },
    {
      solo: "회사 사람들이랑만 밥 먹는 날들",
      together: "전혀 다른 업계 사람의 한마디가\n3개월째 고민하던 문제를 풀었다",
    },
    {
      solo: "점심 1시간, 그냥 지나가는 시간",
      together: "그냥 먹은 점심 한 끼가\n2년째 이어지는 인연이 됐다",
    },
  ];

  return (
    <section id="why" className="py-28 px-6 md:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-600 text-xs font-semibold uppercase tracking-widest mb-5">왜 지금인가</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          우연한 점심 한 끼가<br />
          만드는 것들
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-xl">
          아무 일도 일어나지 않는 점심이 있고,<br />
          생각지도 못한 무언가가 시작되는 점심이 있어요.
        </p>

        <div className="space-y-4">
          {moments.map((m, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden">
              {/* 혼자 */}
              <div className="bg-white px-8 py-7 flex items-center gap-4">
                <span className="text-2xl opacity-30">😶</span>
                <p className="text-gray-300 text-sm">{m.solo}</p>
              </div>
              {/* 함께 */}
              <div className="bg-orange-50 px-8 py-7 flex items-start gap-4">
                <span className="text-2xl mt-0.5">✨</span>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{m.together}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-400 text-sm">
          이런 일이 생기려면, 일단 <span className="text-gray-700 font-medium">그 자리</span>가 있어야 해요.
        </p>
      </div>
    </section>
  );
}
