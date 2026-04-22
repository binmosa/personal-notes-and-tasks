import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string; content?: string };
  const title = body.title?.trim();
  const content = body.content?.trim();

  if (!title || !content) {
    return NextResponse.json({ message: "عنوان ومحتوى الملاحظة مطلوبان" }, { status: 400 });
  }

  const db = await readDb();
  db.notes.unshift({
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: new Date().toISOString(),
  });
  await writeDb(db);

  return NextResponse.json({ success: true });
}
