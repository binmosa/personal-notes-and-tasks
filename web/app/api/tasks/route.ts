import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/store";

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string };
  const title = body.title?.trim();

  if (!title) {
    return NextResponse.json({ message: "عنوان المهمة مطلوب" }, { status: 400 });
  }

  const db = await readDb();
  db.tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  await writeDb(db);

  return NextResponse.json({ success: true });
}
