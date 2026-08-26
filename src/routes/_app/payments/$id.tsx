import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SuccessState } from "@/components/SuccessState";
import { Button, Card, Chip, Header, LinkButton, statusTone } from "@/components/kit";
import { formatDate, money, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/payments/$id")({
  component: BillDetailScreen,
});

function BillDetailScreen() {
  const { id } = Route.useParams();
  const { bills, providers, paymentMethods, payBill } = useApp();
  const bill = bills.find((b) => b.id === id);
  const [mode, setMode] = useState<"detail" | "pay" | "done">("detail");
  const [partial, setPartial] = useState(false);
  const [method, setMethod] = useState(paymentMethods[0]?.id ?? "");

  if (!bill) return <p className="p-6">Bill not found.</p>;
  const provider = providerById(bill.providerId, providers);
  const amount = partial ? Math.max(20, Math.round(bill.amount / 2)) : bill.amount;

  if (mode === "done") {
    return (
      <SuccessState title="Payment successful" body={`Receipt for ${money(amount)} is ready. We can email a copy anytime.`}>
        <LinkButton to="/payments" full>
          Back to billing
        </LinkButton>
        <LinkButton to="/payments/history" variant="outline" full>
          Email Receipt
        </LinkButton>
      </SuccessState>
    );
  }

  if (mode === "pay") {
    return (
      <div className="min-h-dvh bg-canvas">
        <Header title="Make Payment" />
        <div className="space-y-4 px-5">
          <Card>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-display text-3xl font-semibold">{money(amount)}</p>
          </Card>
          <div className="space-y-2">
            {paymentMethods.map((m) => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)} className="w-full text-left">
                <Card className={cn(method === m.id && "border-mauve")}>
                  {m.brand} ···· {m.last4}
                </Card>
              </button>
            ))}
            <Card className="text-sm text-mauve">Add New Card</Card>
          </div>
          <Button
            full
            onClick={() => {
              payBill(id, amount);
              setMode("done");
            }}
          >
            Pay {money(amount)}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Bill detail" />
      <div className="space-y-4 px-5">
        <Card>
          <p className="font-display font-semibold">{provider?.name}</p>
          <p className="text-sm text-muted-foreground">{bill.service}</p>
          <p className="mt-2 text-sm">Due {formatDate(bill.date)}</p>
          <Chip tone={statusTone(bill.status)} className="mt-3">
            {bill.status}
          </Chip>
        </Card>
        <Card>
          {bill.items.map((item) => (
            <div key={item.label} className="flex justify-between py-2 text-sm">
              <span>{item.label}</span>
              <span>{money(item.amount)}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-border pt-3 font-semibold">
            <span>You owe</span>
            <span>{money(bill.amount)}</span>
          </div>
        </Card>
        {bill.status !== "Paid" && (
          <div className="space-y-3">
            <Button
              full
              onClick={() => {
                setPartial(false);
                setMode("pay");
              }}
            >
              Pay Full Amount
            </Button>
            <Button
              variant="outline"
              full
              onClick={() => {
                setPartial(true);
                setMode("pay");
              }}
            >
              Pay Partial
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
