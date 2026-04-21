import { promises as fs } from "fs";
import path from "path";

export type TaskItem = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type NoteItem = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type DBShape = {
  tasks: TaskItem[];
  notes: NoteItem[];
};

const dbPath = path.join(process.cwd(), "data", "db.json");

async function ensureDbFile() {
  try {
    await fs.access(dbPath);
  } catch {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify({ tasks: [], notes: [] }, null, 2), "utf-8");
  }
}

export async function readDb(): Promise<DBShape> {
  await ensureDbFile();
  const raw = await fs.readFile(dbPath, "utf-8");
  const parsed = JSON.parse(raw) as DBShape;
  return {
    tasks: parsed.tasks ?? [],
    notes: parsed.notes ?? [],
  };
}

export async function writeDb(db: DBShape): Promise<void> {
  await ensureDbFile();
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
}
