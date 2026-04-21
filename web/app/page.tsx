import { TaskNotesApp } from "@/components/task-notes-app";
import { readDb } from "@/lib/store";
import type { NoteItem, TaskItem } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const db = await readDb();
  const initialTasks = db.tasks as TaskItem[];
  const initialNotes = db.notes as NoteItem[];

  return <TaskNotesApp initialTasks={initialTasks} initialNotes={initialNotes} />;
}
