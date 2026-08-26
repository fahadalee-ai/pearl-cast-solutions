import { Link, createFileRoute } from "@tanstack/react-router";
import { Card, Chip, Header, LinkButton, statusTone } from "@/components/kit";
import { formatDate, money, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/payments/")({
  component: PaymentsScreen,
});

function PaymentsScreen() {
  const { bills, providers } = useApp();
  const openBills = bills.filter((b) => b.status !== "Paid");
  const due = openBills.reduce((sum, b) => sum + b.amount, 0);
  const dueBill = openBills[0];

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header
        title="Payments"
        right={
          <Link to="/payments/history" className="text-sm text-mauve">
            History
          </Link>
        }
      />
      <div className="px-5">
        <Card className="mb-5 bg-brand-gradient text-white">
          <p className="text-xs uppercase tracking-[0.16em] text-white/70">Total balance due</p>
          <p className="mt-2 font-display text-4xl font-semibold">{money(due)}</p>
          <div className="mt-4">
            <LinkButton
              to={dueBill ? "/payments/$id" : "/payments/history"}
              params={dueBill ? { id: dueBill.id } : undefined}
              variant="light"
              className="bg-white text-plum"
            >
              Pay Now
            </LinkButton>
          </div>
        </Card>
        <div className="space-y-3">
          {bills.map((bill) => {
            const provider = providerById(bill.providerId, providers);
            return (
              <Link key={bill.id} to="/payments/$id" params={{ id: bill.id }} className="block">
                <Card className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold">{provider?.name}</p>
                    <p className="text-sm text-muted-foreground">{bill.service}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatDate(bill.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{money(bill.amount)}</p>
                    <Chip tone={statusTone(bill.status)} className="mt-1">
                      {bill.status}
                    </Chip>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
