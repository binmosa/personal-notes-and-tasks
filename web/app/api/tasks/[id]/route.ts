import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as { completed?: boolean };
  const db = await readDb();
  const target = db.tasks.find((task) => task.id === id);

  if (!target) {
    return NextResponse.json({ message: "المهمة غير موجودة" }, { status: 404 });
  }

  if (typeof body.completed === "boolean") {
    target.completed = body.completed;
  }

  await writeDb(db);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = await readDb();
  const nextTasks = db.tasks.filter((task) => task.id !== id);

  if (nextTasks.length === db.tasks.length) {
    return NextResponse.json({ message: "المهمة غير موجودة" }, { status: 404 });
  }

  db.tasks = nextTasks;
  await writeDb(db);
  return NextResponse.json({ success: true });
}
