import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SuccessState } from "@/components/SuccessState";
import { Avatar, Button, Card, Field, Header, Input, LinkButton, Textarea } from "@/components/kit";
import { TIME_SLOTS, formatTime, todayIso } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/appointments/book")({
  component: BookAppointmentScreen,
});

function BookAppointmentScreen() {
  const { providers, addAppointment } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [providerId, setProviderId] = useState(providers[0]?.id ?? "");
  const [date, setDate] = useState(todayIso());
  const [time, setTime] = useState("10:00");
  const [reason, setReason] = useState("");
  const [bookedId, setBookedId] = useState<string | null>(null);
  const provider = providers.find((p) => p.id === providerId);

  if (bookedId) {
    return (
      <SuccessState title="Appointment Booked" body={`You're confirmed with ${provider?.name} on ${date} at ${formatTime(time)}.`}>
        <Button full onClick={() => navigate({ to: "/appointments/$id", params: { id: bookedId } })}>
          View Details
        </Button>
        <LinkButton to="/home" variant="outline" full>
          Back to Home
        </LinkButton>
      </SuccessState>
    );
  }

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Book Appointment" subtitle={`Step ${step} of 4`} />
      <div className="px-5">
        {step === 1 && (
          <div className="space-y-3">
            {providers.map((p) => (
              <button key={p.id} type="button" onClick={() => setProviderId(p.id)} className="w-full text-left">
                <Card className={cn(providerId === p.id && "border-mauve")}>
                  <div className="flex items-center gap-3">
                    <Avatar initials={p.initials} />
                    <div className="flex-1">
                      <p className="font-display font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.specialty}</p>
                    </div>
                    <span className="text-sm font-medium text-mauve">{p.rating.toFixed(1)}</span>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <>
            <Field label="Date">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm",
                    time === slot ? "bg-brand-gradient text-white" : "bg-white text-foreground shadow-card",
                  )}
                >
                  {formatTime(slot)}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <Field label="Reason for visit">
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="What would you like to discuss?" />
            </Field>
            <Card>
              <p className="text-sm font-medium">Insurance on file</p>
              <p className="mt-1 text-sm text-muted-foreground">Blue Shield of California · XBU18420991</p>
            </Card>
          </>
        )}
        {step === 4 && (
          <Card>
            <p className="font-display text-lg font-semibold">{provider?.name}</p>
            <p className="text-sm text-muted-foreground">{provider?.specialty}</p>
            <p className="mt-3 text-sm">{date} · {formatTime(time)}</p>
            <p className="mt-1 text-sm">In-Person · Pearl Cast Clinic</p>
            {reason && <p className="mt-3 text-sm text-muted-foreground">{reason}</p>}
          </Card>
        )}
        <div className="mt-6 flex gap-3">
          {step > 1 && (
            <Button variant="outline" full onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          <Button
            full
            onClick={() => {
              if (step < 4) {
                setStep((s) => s + 1);
                return;
              }
              const next = addAppointment({
                providerId,
                date,
                time,
                type: "In-Person",
                reason: reason || "General visit",
                location: "Pearl Cast Clinic",
              });
              setBookedId(next.id);
            }}
          >
            {step === 4 ? "Confirm Booking" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
