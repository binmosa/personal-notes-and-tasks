import Link from "next/link";
import { CheckSquare } from "lucide-react";

// Custom SVG components for social media icons since they are missing in lucide-react
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

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
