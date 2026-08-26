import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, BottomSheet, Button, Card, Chip, Header, LinkButton, statusTone } from "@/components/kit";
import { formatDate, formatTime, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/appointments/$id")({
  component: AppointmentDetailScreen,
});

function AppointmentDetailScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { appointments, providers, updateAppointment } = useApp();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const appt = appointments.find((a) => a.id === id);
  const provider = appt ? providerById(appt.providerId, providers) : undefined;

  if (!appt || !provider) {
    return (
      <div className="min-h-dvh bg-canvas">
        <Header title="Appointment" fallbackTo="/home" />
        <div className="px-5">
          <p className="mb-6 text-sm text-muted-foreground">This visit is no longer available.</p>
          <LinkButton to="/home" full>
            Back to Home
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Visit details" fallbackTo="/home" />
      <div className="space-y-4 px-5">
        <Card className="flex items-center gap-3">
          <Avatar initials={provider.initials} />
          <div>
            <p className="font-display font-semibold">{provider.name}</p>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          </div>
        </Card>
        <Card>
          <p className="text-sm text-muted-foreground">When</p>
          <p className="mt-1 font-medium">
            {formatDate(appt.date)} · {formatTime(appt.time)}
          </p>
          <div className="mt-3 flex gap-2">
            <Chip tone="primary">{appt.type}</Chip>
            <Chip tone={statusTone(appt.status)}>{appt.status}</Chip>
          </div>
          {appt.location && <p className="mt-3 text-sm">{appt.location}</p>}
          <p className="mt-3 text-sm text-muted-foreground">{appt.reason}</p>
          {appt.notes && <p className="mt-2 text-sm">{appt.notes}</p>}
        </Card>
        {appt.status === "Confirmed" && (
          <>
            <Button variant="outline" full onClick={() => navigate({ to: "/appointments/$id/reschedule", params: { id } })}>
              Reschedule
            </Button>
            <Button variant="danger" full onClick={() => setConfirmCancel(true)}>
              Cancel Appointment
            </Button>
          </>
        )}
        <LinkButton to="/home" variant="outline" full>
          Back to Home
        </LinkButton>
      </div>
      <BottomSheet open={confirmCancel} onClose={() => setConfirmCancel(false)} title="Cancel this visit?">
        <p className="mb-4 text-sm text-muted-foreground">
          We’ll notify {provider.name}. You can book a new time anytime.
        </p>
        <Button
          variant="danger"
          full
          onClick={() => {
            updateAppointment(id, { status: "Cancelled" });
            setConfirmCancel(false);
            navigate({ to: "/appointments" });
          }}
        >
          Yes, cancel
        </Button>
      </BottomSheet>
    </div>
  );
}
