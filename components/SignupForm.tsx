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

const DAY_KO = ["일", "월", "화", "수", "목", "금", "토"];

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getAvailableWeekdays(): { value: string; label: string }[] {
  const result: { value: string; label: string }[] = [];
  const today = new Date();
  const dow = today.getDay(); // 0=일, 6=토
  const daysUntilNextMonday = dow === 0 ? 1 : 8 - dow;
  const start = new Date(today);
  start.setDate(today.getDate() + daysUntilNextMonday);

  for (let i = 0, added = 0; added < 15; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const day = d.getDay();
    if (day >= 1 && day <= 5) {
      result.push({
        value: toLocalDateString(d),
        label: `${d.getMonth() + 1}/${d.getDate()} (${DAY_KO[day]})`,
      });
      added++;
    }
  }
  return result;
}

const AVAILABLE_DATES = getAvailableWeekdays();

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
                  <input type="text" name="birthYear" value={form.birthYear} onChange={handleChange} required placeholder="예) 1995" maxLength={4} className={inputClass} />
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
                  <span className="text-gray-300 ml-1.5">
                    최대 3일 선택 ({form.applyDates.length}/3)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_DATES.map(({ value, label }) => {
                    const selected = form.applyDates.includes(value);
                    const disabled = !selected && form.applyDates.length >= 3;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => toggleDate(value)}
                        disabled={disabled}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition ${
                          selected
                            ? "bg-orange-600 border-orange-600 text-white"
                            : disabled
                            ? "border-gray-100 text-gray-300 cursor-not-allowed"
                            : "border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
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
