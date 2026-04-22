import Link from "next/link";
import { CheckSquare, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1 rounded-md">
                <CheckSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">مهامي</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              تطبيق متكامل لإدارة مهامك اليومية وملاحظاتك الشخصية بكل سهولة واحترافية. ابدأ بتنظيم حياتك اليوم.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">التطبيق</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link></li>
              <li><Link href="/tasks" className="text-sm text-muted-foreground hover:text-primary transition-colors">المهام</Link></li>
              <li><Link href="/notes" className="text-sm text-muted-foreground hover:text-primary transition-colors">الملاحظات</Link></li>
              <li><Link href="/calendar" className="text-sm text-muted-foreground hover:text-primary transition-colors">التقويم</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">المساعدة</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">الدعم الفني</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">شروط الخدمة</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">تواصل معنا</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} تطبيق مهامي. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground italic">صنع بكل حب لتنظيم وقتك</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
