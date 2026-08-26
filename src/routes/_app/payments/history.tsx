import { Link, createFileRoute } from "@tanstack/react-router";
import { Card, Chip, Header, statusTone } from "@/components/kit";
import { formatDate, money, providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/payments/history")({
  component: PaymentHistoryScreen,
});

function PaymentHistoryScreen() {
  const { bills, providers, paymentMethods } = useApp();

  return (
    <div className="min-h-dvh bg-canvas">
      <Header title="Payment History" />
      <div className="space-y-3 px-5">
        {bills.map((bill) => {
          const provider = providerById(bill.providerId, providers);
          return (
            <Link key={bill.id} to="/payments/$id" params={{ id: bill.id }} className="block">
              <Card>
                <div className="flex items-center justify-between">
                  <p className="font-display font-semibold">{provider?.name}</p>
                  <p className="font-semibold">{money(bill.amount)}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(bill.date)} · {paymentMethods[0]?.brand} ···· {paymentMethods[0]?.last4}
                </p>
                <Chip tone={statusTone(bill.status)} className="mt-2">
                  {bill.status}
                </Chip>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
