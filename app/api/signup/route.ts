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
    const name     = sanitize(body.name);
    const company  = sanitize(body.company);
    const building = sanitize(body.building);
    const role     = sanitize(body.role);
    const contact  = sanitize(body.contact);
    const memo     = sanitize(body.memo);

    if (!name || !company || !role || !contact) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const data = encodeURIComponent(JSON.stringify({ name, company, building, role, contact, memo }));
    await fetch(`${SHEET_WEBHOOK_URL}?data=${data}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
