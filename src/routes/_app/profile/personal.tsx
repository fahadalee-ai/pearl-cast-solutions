import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Header, Input } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/profile/personal")({
  component: PersonalScreen,
});

function PersonalScreen() {
  const { user, updateUser, pushToast } = useApp();
  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    dob: user?.dob ?? "",
    address: user?.address ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    emergencyName: user?.emergencyName ?? "",
    emergencyPhone: user?.emergencyPhone ?? "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Personal Information" />
      <div className="px-5">
        <Field label="First name"><Input value={form.firstName} onChange={set("firstName")} /></Field>
        <Field label="Last name"><Input value={form.lastName} onChange={set("lastName")} /></Field>
        <Field label="Date of birth"><Input type="date" value={form.dob} onChange={set("dob")} /></Field>
        <Field label="Address"><Input value={form.address} onChange={set("address")} /></Field>
        <Field label="Phone"><Input value={form.phone} onChange={set("phone")} /></Field>
        <Field label="Email"><Input value={form.email} onChange={set("email")} /></Field>
        <Field label="Emergency contact"><Input value={form.emergencyName} onChange={set("emergencyName")} /></Field>
        <Field label="Emergency phone"><Input value={form.emergencyPhone} onChange={set("emergencyPhone")} /></Field>
        <Button
          full
          onClick={() => {
            updateUser(form);
            pushToast("Changes saved");
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
