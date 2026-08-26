import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, Field, Header, Input } from "@/components/kit";
import { seedInsurance } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/profile/insurance")({
  component: InsuranceScreen,
});

function InsuranceScreen() {
  const { pushToast } = useApp();
  const [provider, setProvider] = useState(seedInsurance.provider);
  const [memberId, setMemberId] = useState(seedInsurance.memberId);
  const [group, setGroup] = useState(seedInsurance.groupNumber);

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Insurance Information" />
      <div className="px-5">
        <Field label="Insurance provider"><Input value={provider} onChange={(e) => setProvider(e.target.value)} /></Field>
        <Field label="Member ID"><Input value={memberId} onChange={(e) => setMemberId(e.target.value)} /></Field>
        <Field label="Group number"><Input value={group} onChange={(e) => setGroup(e.target.value)} /></Field>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <Card className="flex h-28 items-center justify-center text-sm text-muted-foreground">Front photo</Card>
          <Card className="flex h-28 items-center justify-center text-sm text-muted-foreground">Back photo</Card>
        </div>
        <Button full onClick={() => pushToast("Insurance updated")}>
          Update Insurance
        </Button>
      </div>
    </div>
  );
}
