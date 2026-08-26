import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuccessState } from "@/components/SuccessState";
import { Button, Card, Chip, Field, Header, LinkButton, Select, Textarea } from "@/components/kit";
import { providerById, seedPharmacies } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/medications/$id")({
  component: MedicationDetailScreen,
});

function MedicationDetailScreen() {
  const { id } = Route.useParams();
  const { medications, providers, requestRefill } = useApp();
  const med = medications.find((m) => m.id === id);
  const [mode, setMode] = useState<"detail" | "refill" | "done">("detail");
  const [pharmacy, setPharmacy] = useState(seedPharmacies[0].id);
  const [notes, setNotes] = useState("");

  if (!med) return <p className="p-6">Medication not found.</p>;
  const provider = providerById(med.providerId, providers);

  if (mode === "done") {
    return (
      <SuccessState title="Refill requested" body="Your pharmacy typically has this ready in 1–2 business days.">
        <LinkButton to="/medications" full>
          Back to medications
        </LinkButton>
      </SuccessState>
    );
  }

  if (mode === "refill") {
    return (
      <div className="min-h-dvh bg-canvas">
        <Header title="Request Refill" />
        <div className="px-5">
          <Field label="Pharmacy">
            <Select value={pharmacy} onChange={(e) => setPharmacy(e.target.value)}>
              {seedPharmacies.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.address}
                </option>
              ))}
            </Select>
          </Field>
          <Card className="mb-4">
            <p className="text-sm font-medium">{med.name} {med.dosage}</p>
            <p className="text-sm text-muted-foreground">Quantity: 30-day supply</p>
          </Card>
          <Field label="Notes for pharmacy">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <Button
            full
            onClick={() => {
              requestRefill(med.id);
              setMode("done");
            }}
          >
            Submit Refill Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title={med.name} />
      <div className="space-y-4 px-5">
        <Card>
          <p className="font-display text-xl font-semibold">{med.name}</p>
          <p className="text-sm text-muted-foreground">
            {med.dosage} · {med.frequency}
          </p>
          <p className="mt-2 text-sm">Prescribed by {provider?.name}</p>
          <div className="mt-3">
            <Chip tone={med.refills > 0 ? "success" : "warning"}>{med.refills} refills remaining</Chip>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-medium">Instructions</p>
          <p className="mt-1 text-sm text-muted-foreground">{med.instructions}</p>
        </Card>
        <details className="rounded-[20px] border border-border bg-white p-4 shadow-card">
          <summary className="cursor-pointer text-sm font-medium">Warnings & side effects</summary>
          <p className="mt-2 text-sm text-muted-foreground">{med.warnings}</p>
          <p className="mt-2 text-sm text-muted-foreground">{med.sideEffects}</p>
        </details>
        {med.active && (
          <Button full onClick={() => setMode("refill")}>
            Request Refill
          </Button>
        )}
      </div>
    </div>
  );
}
