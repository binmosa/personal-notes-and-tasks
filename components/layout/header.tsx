import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckSquare, LayoutDashboard, Settings, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="bg-primary p-1.5 rounded-lg">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">مهامي</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 mr-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              الرئيسية
            </Link>
            <Link href="/tasks" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              المهام
            </Link>
            <Link href="/notes" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              الملاحظات
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button className="hidden sm:flex">إضافة مهمة</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
