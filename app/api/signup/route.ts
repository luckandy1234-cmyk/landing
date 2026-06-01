import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, building, role, contact, memo } = body;

    if (!name || !company || !role || !contact) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // TODO 2단계: Supabase DB 저장
    // const { error } = await supabase.from("applicants").insert({ name, company, building, role, contact, memo });

    // TODO 2단계: Resend 이메일 발송
    // await resend.emails.send({ ... });

    console.log("[신규 신청]", { name, company, building, role, contact, memo });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
