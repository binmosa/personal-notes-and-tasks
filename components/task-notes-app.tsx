"use client";

import { FormEvent, useMemo, useState } from "react";
import type { NoteItem, TaskItem } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, 
  ClipboardList, 
  FileText, 
  Clock,
  Sparkles,
  Loader2
} from "lucide-react";

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
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  const completionPercentage = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((completedCount / tasks.length) * 100);
  }, [tasks.length, completedCount]);

  const pendingTasks = tasks.length - completedCount;

  async function refreshData() {
    const response = await fetch("/api/data", { cache: "no-store" });
    const data = (await response.json()) as { tasks: TaskItem[]; notes: NoteItem[] };
    setTasks(data.tasks ?? []);
    setNotes(data.notes ?? []);
  }

  async function generateWithAI() {
    const prompt = noteTitle || noteContent;
    if (!prompt.trim()) {
      alert("يرجى كتابة عنوان أو فكرة للملاحظة أولاً.");
      return;
    }

    setAiLoading(true);
    try {
      const response = await fetch("/api/ai/generate-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.content) {
        setNoteContent(data.content);
      } else if (data.error) {
        alert(`خطأ: ${data.error}`);
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("فشل الاتصال بالذكاء الاصطناعي.");
    } finally {
      setAiLoading(false);
    }
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
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-8">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">لوحة التحكم الخاصة بي</h1>
        <p className="text-muted-foreground">
          نظرة عامة على إنتاجيتك اليوم. تتبع مهامك وملاحظاتك في مكان واحد.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-sm ring-1 ring-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">إجمالي المهام</p>
              <ClipboardList className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{tasks.length}</div>
              <span className="text-xs text-muted-foreground">مهمة</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-500/10 to-green-600/5 shadow-sm ring-1 ring-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">المهام المكتملة</p>
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{completedCount}</div>
              <span className="text-xs text-muted-foreground">تم إنجازها</span>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-green-200 dark:bg-green-900/40">
              <div 
                className="h-1.5 rounded-full bg-green-500 transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-500/10 to-amber-600/5 shadow-sm ring-1 ring-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">مهام منتظرة</p>
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <span className="text-xs text-muted-foreground">قيد العمل</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-purple-500/10 to-purple-600/5 shadow-sm ring-1 ring-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">الملاحظات</p>
              <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{notes.length}</div>
              <span className="text-xs text-muted-foreground">ملاحظة محفوظة</span>
            </div>
          </CardContent>
        </Card>
      </div>

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
              <form onSubmit={createNote} className="space-y-4">
                <Input
                  value={noteTitle}
                  onChange={(event) => setNoteTitle(event.target.value)}
                  placeholder="عنوان الملاحظة"
                  className="text-lg font-medium"
                />
                
                <div className="relative">
                  <div className="absolute left-2 top-2 z-10">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 hover:bg-purple-100 bg-purple-50/50 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50 border border-purple-100 dark:border-purple-800 rounded-full"
                      onClick={generateWithAI}
                      disabled={aiLoading}
                    >
                      {aiLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      اكتب بالذكاء الاصطناعي
                    </Button>
                  </div>
                  <Textarea
                    value={noteContent}
                    onChange={(event) => setNoteContent(event.target.value)}
                    placeholder="محتوى الملاحظة أو فكرة ليقوم الذكاء الاصطناعي بتطويرها..."
                    rows={8}
                    className="pt-12 resize-none"
                  />
                </div>
                
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
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
