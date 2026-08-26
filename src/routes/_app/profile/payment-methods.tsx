import { createFileRoute } from "@tanstack/react-router";
import { Card, Header } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/profile/payment-methods")({
  component: PaymentMethodsScreen,
});

function PaymentMethodsScreen() {
  const { paymentMethods } = useApp();

  return (
    <div className="min-h-dvh bg-canvas">
      <Header title="Payment Methods" />
      <div className="space-y-3 px-5">
        {paymentMethods.map((m) => (
          <Card key={m.id} className="flex items-center justify-between">
            <div>
              <p className="font-display font-semibold">{m.brand} ···· {m.last4}</p>
              <p className="text-xs text-muted-foreground">Expires {m.exp}</p>
            </div>
            <span className="text-sm text-mauve">Default</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
