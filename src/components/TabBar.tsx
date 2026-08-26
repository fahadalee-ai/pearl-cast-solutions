import { Link, useLocation } from "@tanstack/react-router";
import { CalendarDays, Home, MessageCircle, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export const TAB_ROUTES = TABS.map((t) => t.to);

export function TabBar() {
  const { pathname } = useLocation();

  return (
    <nav className="sticky bottom-0 z-40 border-t border-border bg-white/95 px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur-md">
      <div className="grid grid-cols-4">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 py-1 text-[10px] font-medium"
            >
              <span
                className={cn(
                  "flex h-8 w-12 items-center justify-center",
                  active ? "bg-accent text-mauve" : "text-dim",
                )}
              >
                <Icon size={22} strokeWidth={active ? 2.2 : 1.7} />
              </span>
              <span className={cn(active ? "text-mauve" : "text-dim")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
