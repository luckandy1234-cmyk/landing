import { NextRequest, NextResponse } from "next/server";

const SHEET_WEBHOOK_URL = process.env.SHEET_WEBHOOK_URL!;

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

    const data = encodeURIComponent(JSON.stringify({ name, company, building: building || "", role, contact, memo: memo || "" }));
    await fetch(`${SHEET_WEBHOOK_URL}?data=${data}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
