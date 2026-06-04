"use client";

import { useState } from "react";

type FormData = {
  name: string;
  company: string;
  building: string;
  role: string;
  contact: string;
  gender: string;
  birthYear: string;
  applyDates: string[];
  companion1: string;
  memo: string;
};

type Status = "idle" | "loading" | "success" | "error";

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getStartDate(): string {
  const today = new Date();
  const dow = today.getDay();
  const daysUntil = dow === 0 ? 1 : 8 - dow;
  const start = new Date(today);
  start.setDate(today.getDate() + daysUntil);
  return toLocalDateString(start);
}

function Calendar({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const startStr = getStartDate();
  const startDate = new Date(startStr);

  const [viewYear, setViewYear] = useState(startDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(startDate.getMonth());

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const startDow = firstDayOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const canGoPrev = (() => {
    const prevY = viewMonth === 0 ? viewYear - 1 : viewYear;
    const prevM = viewMonth === 0 ? 11 : viewMonth - 1;
    const lastOfPrev = toLocalDateString(new Date(prevY, prevM + 1, 0));
    return lastOfPrev >= startStr;
  })();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 select-none">
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition text-lg leading-none"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-700">
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition text-lg leading-none"
        >
          ›
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-medium py-1 ${
              i === 0 ? "text-red-300" : i === 6 ? "text-blue-300" : "text-gray-400"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;

          const date = new Date(viewYear, viewMonth, day);
          const dow = date.getDay();
          const dateStr = toLocalDateString(date);
          const isWeekend = dow === 0 || dow === 6;
          const isPast = dateStr < startStr;
          const isDisabled = isWeekend || isPast;
          const isSelected = selected.includes(dateStr);
          const isMaxed = selected.length >= 3 && !isSelected;

          return (
            <div key={idx} className="flex items-center justify-center">
              <button
                type="button"
                disabled={isDisabled || isMaxed}
                onClick={() => onToggle(dateStr)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition flex items-center justify-center
                  ${isSelected ? "bg-orange-600 text-white shadow-sm" : ""}
                  ${!isSelected && !isDisabled && !isMaxed ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600" : ""}
                  ${isDisabled ? "text-gray-200 cursor-not-allowed" : ""}
                  ${isMaxed && !isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
                `}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SignupForm() {
  const [form, setForm] = useState<FormData>({
    name: "", company: "", building: "", role: "", contact: "",
    gender: "", birthYear: "", applyDates: [],
    companion1: "", memo: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleDate = (value: string) => {
    setForm((prev) => {
      if (prev.applyDates.includes(value)) {
        return { ...prev, applyDates: prev.applyDates.filter((d) => d !== value) };
      }
      if (prev.applyDates.length >= 3) return prev;
      return { ...prev, applyDates: [...prev.applyDates, value] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.applyDates.length === 0) {
      setStatus("error");
      setErrorMsg("희망 날짜를 1개 이상 선택해주세요.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "신청 중 오류가 발생했습니다.");
      }
      setStatus("success");
      setForm({ name: "", company: "", building: "", role: "", contact: "", gender: "", birthYear: "", applyDates: [], companion1: "", memo: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "오류가 발생했습니다.");
    }
  };

  const roles = ["개발·IT", "디자인", "마케팅·브랜드", "영업·BD", "기획·PM", "경영·전략", "재무·회계", "HR", "법무", "기타"];
  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition";

  return (
    <section id="signup" className="py-28 px-6 md:px-16 bg-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* 왼쪽 */}
        <div className="md:sticky md:top-28">
          <p className="text-orange-600 text-xs font-semibold uppercase tracking-widest mb-5">사전 신청</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            좋은 점심<br />한 번 먹어볼까요?
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            광화문역 도보 10분 내 직장인 대상으로<br />첫 회차를 모집합니다. 첫 회차는 무료 체험이에요.
          </p>
          <div className="space-y-3 text-sm text-gray-400">
            {[
              "광화문역 도보 10분 이내",
              "6인 이하 소그룹, 같은 회사 사람과는 매칭 X",
              "대화 주제 제안, 어색함 없이 1시간",
              "매칭 완료 후 식사 단톡방 생성",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2.5">
                <span className="text-orange-500 text-xs">✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 */}
        <div>
          {status === "success" ? (
            <div className="border border-orange-100 bg-orange-50 rounded-2xl p-12 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">신청 완료!</h3>
              <p className="text-gray-500 text-sm">입력하신 연락처로 매칭 안내를 드릴게요.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* 이름 + 직군 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">이름 <span className="text-orange-500">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="홍길동" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">직군 <span className="text-orange-500">*</span></label>
                  <select name="role" value={form.role} onChange={handleChange} required className={inputClass}>
                    <option value="">선택</option>
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              {/* 성별 + 연생 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">성별 <span className="text-orange-500">*</span></label>
                  <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
                    <option value="">선택</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">연생 <span className="text-orange-500">*</span></label>
                  <select name="birthYear" value={form.birthYear} onChange={handleChange} required className={inputClass}>
                    <option value="">선택</option>
                    {Array.from({ length: 31 }, (_, i) => 2010 - i).map((y) => (
                      <option key={y} value={String(y)}>{y}년</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 회사명 */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">회사명 <span className="text-orange-500">*</span></label>
                <input type="text" name="company" value={form.company} onChange={handleChange} required placeholder="(주)밀팅" className={inputClass} />
              </div>

              {/* 근무 빌딩 */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">근무 빌딩</label>
                <input type="text" name="building" value={form.building} onChange={handleChange} placeholder="D타워, 그랑서울 등" className={inputClass} />
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">연락처 <span className="text-orange-500">*</span></label>
                <input type="text" name="contact" value={form.contact} onChange={handleChange} required placeholder="kakao_id 또는 010-0000-0000" className={inputClass} />
              </div>

              {/* 희망 날짜 */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-2">
                  희망 날짜 <span className="text-orange-500">*</span>
                  <span className="text-gray-300 ml-1.5">주중만 선택 가능, 최대 3일 ({form.applyDates.length}/3)</span>
                </label>
                <Calendar selected={form.applyDates} onToggle={toggleDate} />
                {form.applyDates.length > 0 && (
                  <p className="text-xs text-orange-500 mt-2">
                    선택됨: {form.applyDates.map(d => {
                      const [, m, day] = d.split("-");
                      return `${parseInt(m)}/${parseInt(day)}`;
                    }).join(", ")}
                  </p>
                )}
              </div>

              {/* 동반 신청 */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">동반 신청 <span className="text-gray-300">(본인 포함 최대 2인, 선택)</span></label>
                <input type="text" name="companion1" value={form.companion1} onChange={handleChange} placeholder="동반자 — 이름" className={inputClass} />
              </div>

              {/* 메모 */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">대화 나누고 싶은 주제가 있나요? <span className="text-gray-300">(편하게 말씀 해주세요)</span></label>
                <textarea name="memo" value={form.memo} onChange={handleChange} rows={3} placeholder="예시) 이직, 커리어, 재테크, 문화생활, 연애 등" className={`${inputClass} resize-none`} />
              </div>

              {status === "error" && (
                <p className="text-red-500 text-xs">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
              >
                {status === "loading" ? "신청 중..." : "무료로 점심 신청하기 →"}
              </button>
              <p className="text-center text-xs text-gray-300">이후 회차부터 노쇼 방지 보증금 적용. 만나면 즉시 환급.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
