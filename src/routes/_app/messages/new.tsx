import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Header, Select, Textarea } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/messages/new")({
  component: NewMessageScreen,
});

function NewMessageScreen() {
  const { providers, startConversation } = useApp();
  const navigate = useNavigate();
  const [providerId, setProviderId] = useState(providers[0]?.id ?? "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="min-h-dvh bg-canvas">
      <Header title="New Message" />
      <div className="px-5">
        <Field label="Recipient">
          <Select value={providerId} onChange={(e) => setProviderId(e.target.value)}>
            {providers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.specialty}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Subject (optional)">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl bg-white px-3.5 py-3.5 text-sm outline-none"
          />
        </Field>
        <Field label="Message">
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="How can we help?" />
        </Field>
        <Button
          full
          onClick={() => {
            if (!body.trim()) return;
            const id = startConversation(providerId, subject ? `${subject}\n\n${body}` : body);
            navigate({ to: "/messages/$id", params: { id } });
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
