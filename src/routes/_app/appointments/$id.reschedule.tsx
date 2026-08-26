import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Header, Input } from "@/components/kit";
import { TIME_SLOTS, formatTime } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/appointments/$id/reschedule")({
  component: RescheduleScreen,
});

function RescheduleScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { appointments, updateAppointment, pushToast } = useApp();
  const appt = appointments.find((a) => a.id === id);
  const [date, setDate] = useState(appt?.date ?? "");
  const [time, setTime] = useState(appt?.time ?? "10:00");

  return (
    <div className="min-h-dvh bg-canvas">
      <Header title="Reschedule" />
      <div className="px-5">
        <Field label="New date">
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <div className="mb-6 flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className={cn(
                "rounded-full px-3 py-2 text-sm",
                time === slot ? "bg-brand-gradient text-white" : "bg-white shadow-card",
              )}
            >
              {formatTime(slot)}
            </button>
          ))}
        </div>
        <Button
          full
          onClick={() => {
            updateAppointment(id, { date, time });
            pushToast("New time confirmed");
            navigate({ to: "/appointments/$id", params: { id } });
          }}
        >
          Confirm New Time
        </Button>
      </div>
    </div>
  );
}
