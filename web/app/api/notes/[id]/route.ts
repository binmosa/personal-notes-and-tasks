import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/store";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = await readDb();
  const nextNotes = db.notes.filter((note) => note.id !== id);

  if (nextNotes.length === db.notes.length) {
    return NextResponse.json({ message: "الملاحظة غير موجودة" }, { status: 404 });
  }

  db.notes = nextNotes;
  await writeDb(db);
  return NextResponse.json({ success: true });
}
