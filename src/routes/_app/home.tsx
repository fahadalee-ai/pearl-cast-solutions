import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CalendarPlus,
  ClipboardList,
  CreditCard,
  FileUp,
  MessageCircle,
  Pill,
} from "lucide-react";
import { Avatar, Card, Chip, ProgressBar, SectionTitle, statusTone } from "@/components/kit";
import { formatDate, formatTime, greeting, initials, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/home")({
  component: HomeScreen,
});

const ACTIONS = [
  { to: "/appointments/book", label: "Book Appointment", icon: CalendarPlus },
  { to: "/messages/new", label: "Message Provider", icon: MessageCircle },
  { to: "/medications", label: "View Medications", icon: Pill },
  { to: "/documents/upload", label: "Upload Document", icon: FileUp },
  { to: "/payments", label: "Pay Bill", icon: CreditCard },
  { to: "/forms", label: "Complete Form", icon: ClipboardList },
];

function HomeScreen() {
  const { user, appointments, notifications, providers } = useApp();
  const upcoming = appointments.find((a) => a.status === "Confirmed" || a.status === "Pending");
  const provider = upcoming ? providerById(upcoming.providerId, providers) : undefined;
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-canvas px-5 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting()},</p>
          <h1 className="font-display text-[26px] font-semibold">{user?.firstName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/notifications" className="relative flex h-11 w-11 items-center justify-center bg-white shadow-card">
            <Bell size={20} className="text-plum" />
            {unread > 0 && <span className="absolute right-2.5 top-2.5 h-2 w-2 bg-danger" />}
          </Link>
          <Link to="/profile">
            <Avatar initials={initials(user?.firstName ?? "", user?.lastName ?? "")} />
          </Link>
        </div>
      </header>

      {upcoming && provider && (
        <Link to="/appointments/$id" params={{ id: upcoming.id }} className="block">
          <div className="bg-brand-gradient p-5 text-white shadow-soft">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">Upcoming appointment</p>
            <div className="mt-3 flex items-center gap-3">
              <Avatar initials={provider.initials} className="bg-white/15" />
              <div>
                <p className="font-display text-lg font-semibold">{provider.name}</p>
                <p className="text-sm text-white/75">{provider.specialty}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/85">
              {formatDate(upcoming.date)} · {formatTime(upcoming.time)} · {upcoming.type}
            </p>
            <div className="mt-4 inline-flex bg-white px-4 py-2 text-sm font-medium text-plum">
              View Details
            </div>
          </div>
        </Link>
      )}

      <SectionTitle>Treatment Overview</SectionTitle>
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        <PlanCard name="Hypertension Care" progress={68} status="On track" />
        <PlanCard name="Diabetes Management" progress={42} status="Needs attention" />
      </div>

      <SectionTitle>Quick Actions</SectionTitle>
      <div className="grid grid-cols-3 gap-3">
        {ACTIONS.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-2 bg-white px-2 py-4 text-center shadow-card"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-accent text-mauve">
              <Icon size={20} />
            </span>
            <span className="text-[11px] font-medium leading-tight text-foreground">{label}</span>
          </Link>
        ))}
      </div>

      <SectionTitle
        action={
          <Link to="/notifications" className="text-sm font-medium text-mauve">
            View All
          </Link>
        }
      >
        Notifications
      </SectionTitle>
      <div className="space-y-2">
        {notifications.slice(0, 3).map((n) => (
          <Link key={n.id} to={n.href as "/"} className="block">
            <Card className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.preview}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PlanCard({ name, progress, status }: { name: string; progress: number; status: string }) {
  return (
    <Card className="min-w-[220px]">
      <Chip tone={statusTone(status)}>{status}</Chip>
      <p className="mt-3 font-display text-[15px] font-semibold">{name}</p>
      <div className="mt-3">
        <ProgressBar value={progress} />
      </div>
      <p className="mt-2 text-xs text-mauve">View Plan</p>
    </Card>
  );
}
