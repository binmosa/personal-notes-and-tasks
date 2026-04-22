"use client";

import { FormEvent, useMemo, useState } from "react";
import type { NoteItem, TaskItem } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  initialTasks: TaskItem[];
  initialNotes: NoteItem[];
};

export function TaskNotesApp({ initialTasks, initialNotes }: Props) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [notes, setNotes] = useState<NoteItem[]>(initialNotes);
  const [taskTitle, setTaskTitle] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  async function refreshData() {
    const response = await fetch("/api/data", { cache: "no-store" });
    const data = (await response.json()) as { tasks: TaskItem[]; notes: NoteItem[] };
    setTasks(data.tasks ?? []);
    setNotes(data.notes ?? []);
  }

  async function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!taskTitle.trim()) return;
    setLoading(true);
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle }),
    });
    setTaskTitle("");
    await refreshData();
    setLoading(false);
  }

  async function toggleTask(id: string, completed: boolean) {
    setLoading(true);
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    await refreshData();
    setLoading(false);
  }

  async function removeTask(id: string) {
    setLoading(true);
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    await refreshData();
    setLoading(false);
  }

  async function createNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    setLoading(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: noteTitle, content: noteContent }),
    });
    setNoteTitle("");
    setNoteContent("");
    await refreshData();
    setLoading(false);
  }

  async function removeNote(id: string) {
    setLoading(true);
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    await refreshData();
    setLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-8">
      <Card className="mb-6">
        <CardHeader className="gap-2">
          <CardTitle className="text-2xl">تطبيقي مهامي</CardTitle>
          <p className="text-sm text-muted-foreground">
            تطبيق بسيط باستخدام Next.js و shadcn/ui مع تخزين البيانات داخل ملف JSON.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">إجمالي المهام: {tasks.length}</Badge>
          <Badge variant="secondary">المهام المنجزة: {completedCount}</Badge>
          <Badge variant="secondary">الملاحظات: {notes.length}</Badge>
        </CardContent>
      </Card>

      <nav className="mb-4 flex items-center gap-2 rounded-md border bg-card p-2">
        <Button variant={activeTab === "tasks" ? "default" : "ghost"} onClick={() => setActiveTab("tasks")}>
          الرئيسية - المهام
        </Button>
        <Button variant={activeTab === "notes" ? "default" : "ghost"} onClick={() => setActiveTab("notes")}>
          الملاحظات
        </Button>
      </nav>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">المهام</TabsTrigger>
          <TabsTrigger value="notes">الملاحظات</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>إضافة مهمة جديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={createTask} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={taskTitle}
                  onChange={(event) => setTaskTitle(event.target.value)}
                  placeholder="اكتب المهمة هنا..."
                />
                <Button type="submit" disabled={loading}>
                  إضافة
                </Button>
              </form>

              <div className="space-y-2">
                {loading && <p className="text-sm text-muted-foreground">جاري التحديث...</p>}
                {!loading && tasks.length === 0 && (
                  <p className="text-sm text-muted-foreground">لا توجد مهام حالياً.</p>
                )}

                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-3 rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) => toggleTask(task.id, Boolean(checked))}
                      />
                      <p className={task.completed ? "text-muted-foreground line-through" : ""}>
                        {task.title}
                      </p>
                    </div>
                    <Button variant="ghost" onClick={() => removeTask(task.id)} disabled={loading}>
                      حذف
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>إضافة ملاحظة جديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={createNote} className="space-y-3">
                <Input
                  value={noteTitle}
                  onChange={(event) => setNoteTitle(event.target.value)}
                  placeholder="عنوان الملاحظة"
                />
                <Textarea
                  value={noteContent}
                  onChange={(event) => setNoteContent(event.target.value)}
                  placeholder="محتوى الملاحظة"
                  rows={5}
                />
                <Button type="submit" disabled={loading}>
                  حفظ الملاحظة
                </Button>
              </form>

              <div className="space-y-3">
                {loading && <p className="text-sm text-muted-foreground">جاري التحديث...</p>}
                {!loading && notes.length === 0 && (
                  <p className="text-sm text-muted-foreground">لا توجد ملاحظات حالياً.</p>
                )}

                {notes.map((note) => (
                  <div key={note.id} className="rounded-md border p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="font-medium">{note.title}</h3>
                      <Button variant="ghost" onClick={() => removeNote(note.id)} disabled={loading}>
                        حذف
                      </Button>
                    </div>
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
