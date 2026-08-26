import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Chip, Header, Screen, Segmented, statusTone } from "@/components/kit";
import { formatDate, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/forms/")({
  component: FormsScreen,
});

function FormsScreen() {
  const { forms, providers } = useApp();
  const [tab, setTab] = useState("Pending");
  const pending = forms.filter((f) => f.status !== "Submitted");
  const completed = forms.filter((f) => f.status === "Submitted");
  const list = tab === "Pending" ? pending : completed;

  return (
    <Screen canvas padded={false}>
      <Header title="Patient Forms" />
      <div className="px-5 pb-8">
        <Segmented value={tab} options={["Pending", "Completed"]} onChange={setTab} />
        <div className="mt-4 space-y-3">
          {list.map((form) => {
            const provider = providerById(form.providerId, providers);
            return (
              <Link key={form.id} to="/forms/$id" params={{ id: form.id }} className="block">
                <Card>
                  <p className="font-display font-semibold">{form.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{provider?.name}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Due {formatDate(form.dueDate)}</span>
                    <Chip tone={statusTone(form.status)}>{form.status}</Chip>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
