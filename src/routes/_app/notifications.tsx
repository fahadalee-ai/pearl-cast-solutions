import { Link, createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarDays, CreditCard, FileText, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Card, Empty, Header } from "@/components/kit";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  component: NotificationsScreen,
});

const FILTERS = ["All", "Appointments", "Messages", "Payments", "Forms"] as const;

const ICONS = {
  Appointments: CalendarDays,
  Messages: MessageCircle,
  Payments: CreditCard,
  Forms: FileText,
};

function NotificationsScreen() {
  const { notifications, markNotificationRead, dismissNotification, markAllRead } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const list = notifications.filter((n) => filter === "All" || n.category === filter);
  const today = list.filter((n) => n.when === "Today");
  const earlier = list.filter((n) => n.when === "Earlier");

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header
        title="Notifications"
        right={
          <button type="button" className="text-sm text-mauve" onClick={markAllRead}>
            Mark all
          </button>
        }
      />
      <div className="px-5">
        <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-xs font-medium",
                filter === f ? "bg-brand-gradient text-white" : "bg-white shadow-card",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <Empty title="You're all caught up" body="New appointment, message, and billing alerts will land here." />
        ) : (
          <>
            {today.length > 0 && <Group title="Today" items={today} onOpen={markNotificationRead} onDismiss={dismissNotification} />}
            {earlier.length > 0 && <Group title="Earlier" items={earlier} onOpen={markNotificationRead} onDismiss={dismissNotification} />}
          </>
        )}
      </div>
    </div>
  );
}

function Group({
  title,
  items,
  onOpen,
  onDismiss,
}: {
  title: string;
  items: { id: string; category: keyof typeof ICONS; title: string; preview: string; time: string; href: string; read: boolean }[];
  onOpen: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="mb-5">
      <h2 className="mb-2 font-display text-lg font-semibold">{title}</h2>
      <div className="space-y-2">
        {items.map((n) => {
          const Icon = ICONS[n.category] ?? Bell;
          return (
            <Link key={n.id} to={n.href as "/"} onClick={() => onOpen(n.id)} className="block">
              <Card className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-mauve">
                  <Icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm", n.read ? "font-medium" : "font-semibold")}>{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  <button
                    type="button"
                    className="text-[11px] text-muted-foreground"
                    onClick={(e) => {
                      e.preventDefault();
                      onDismiss(n.id);
                    }}
                  >
                    Dismiss
                  </button>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
