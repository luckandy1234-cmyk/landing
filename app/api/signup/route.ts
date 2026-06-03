import { NextRequest, NextResponse } from "next/server";

const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL!;

const MAX_LEN = 200;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_LEN);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name       = sanitize(body.name);
    const company    = sanitize(body.company);
    const building   = sanitize(body.building);
    const role       = sanitize(body.role);
    const contact    = sanitize(body.contact);
    const gender     = sanitize(body.gender);
    const birthYear  = sanitize(body.birthYear);
    const applyDates = Array.isArray(body.applyDates)
      ? body.applyDates.map(sanitize).filter(Boolean).slice(0, 3).join(", ")
      : sanitize(body.applyDates);
    const companion1 = sanitize(body.companion1);
    const memo       = sanitize(body.memo);

    if (!name || !company || !role || !contact || !gender || !birthYear || !applyDates) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const data = encodeURIComponent(JSON.stringify({
      name, company, building, role, contact,
      gender, birthYear, applyDate: applyDates,
      companion1, memo,
    }));
    const webhookRes = await fetch(`${SHEET_WEBHOOK_URL}?data=${data}`, { redirect: "follow" });
    const webhookText = await webhookRes.text();
    let webhookData: { success?: boolean; error?: string };
    try {
      webhookData = JSON.parse(webhookText);
    } catch {
      return NextResponse.json({ error: "webhook 응답 오류: " + webhookText.slice(0, 200) }, { status: 500 });
    }
    if (webhookData.error) {
      return NextResponse.json({ error: webhookData.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
