import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Avatar, Card, Chip, Header, Screen, Segmented, statusTone } from "@/components/kit";
import { formatDate, formatTime, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/appointments/")({
  component: AppointmentsScreen,
});

function AppointmentsScreen() {
  const { appointments, providers } = useApp();
  const [tab, setTab] = useState("Upcoming");
  const upcoming = appointments.filter((a) => a.status === "Confirmed" || a.status === "Pending");
  const past = appointments.filter((a) => a.status === "Completed" || a.status === "Cancelled");
  const list = tab === "Upcoming" ? upcoming : past;

  return (
    <Screen canvas padded={false} className="pb-6">
      <Header title="Appointments" back={false} />
      <div className="px-5">
        <Segmented value={tab} options={["Upcoming", "Past"]} onChange={setTab} />
        <div className="mt-4 space-y-3">
          {list.map((appt) => {
            const provider = providerById(appt.providerId, providers);
            return (
              <Link key={appt.id} to="/appointments/$id" params={{ id: appt.id }} className="block">
                <Card className="flex items-start gap-3">
                  <Avatar initials={provider?.initials ?? "DR"} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold">{provider?.name}</p>
                    <p className="text-xs text-muted-foreground">{provider?.specialty}</p>
                    <p className="mt-2 text-sm">
                      {formatDate(appt.date)} · {formatTime(appt.time)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Chip tone="primary">{appt.type}</Chip>
                      <Chip tone={statusTone(appt.status)}>{appt.status}</Chip>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <Link
        to="/appointments/book"
        className="fixed bottom-[5.5rem] right-[max(1.25rem,calc(50vw-240px+1.25rem))] flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft"
        aria-label="Book appointment"
      >
        <Plus size={26} />
      </Link>
    </Screen>
  );
}
