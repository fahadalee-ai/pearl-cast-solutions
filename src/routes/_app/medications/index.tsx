import { Link, createFileRoute } from "@tanstack/react-router";
import { Card, Chip, Header } from "@/components/kit";
import { providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/medications/")({
  component: MedicationsScreen,
});

function MedicationsScreen() {
  const { medications, providers } = useApp();
  const active = medications.filter((m) => m.active);
  const past = medications.filter((m) => !m.active);

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Medications" />
      <div className="px-5">
        <h2 className="mb-3 font-display text-lg font-semibold">Active</h2>
        <div className="space-y-3">
          {active.map((med) => (
            <Link key={med.id} to="/medications/$id" params={{ id: med.id }} className="block">
              <MedCard name={med.name} dosage={med.dosage} frequency={med.frequency} refills={med.refills} />
            </Link>
          ))}
        </div>
        <h2 className="mb-3 mt-7 font-display text-lg font-semibold">Past</h2>
        <div className="space-y-3">
          {past.map((med) => (
            <Link key={med.id} to="/medications/$id" params={{ id: med.id }} className="block">
              <MedCard name={med.name} dosage={med.dosage} frequency={med.frequency} refills={med.refills} />
            </Link>
          ))}
        </div>
        <p className="mt-4 hidden text-xs text-muted-foreground">
          Prescribed by {providerById(active[0]?.providerId ?? "", providers)?.name}
        </p>
      </div>
    </div>
  );
}

function MedCard({
  name,
  dosage,
  frequency,
  refills,
}: {
  name: string;
  dosage: string;
  frequency: string;
  refills: number;
}) {
  return (
    <Card className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-lg">💊</span>
      <div className="flex-1">
        <p className="font-display font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">
          {dosage} · {frequency}
        </p>
      </div>
      <Chip tone={refills > 0 ? "success" : "warning"}>{refills} refills</Chip>
    </Card>
  );
}
