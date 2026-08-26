import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BottomSheet, Button, Card, Header } from "@/components/kit";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/profile/settings")({
  component: SettingsScreen,
});

function SettingsScreen() {
  const { prefs, togglePref, logout, pushToast } = useApp();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const rows: { key: keyof typeof prefs; label: string }[] = [
    { key: "push", label: "Push Notifications" },
    { key: "email", label: "Email Notifications" },
    { key: "sms", label: "SMS Reminders" },
    { key: "biometric", label: "Biometric Login" },
    { key: "darkMode", label: "Dark Mode" },
  ];

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Account Settings" />
      <div className="px-5">
        <Card className="mb-4 divide-y divide-border p-0">
          {rows.map((row) => (
            <div key={row.key} className="flex items-center justify-between px-4 py-4">
              <span className="text-sm font-medium">{row.label}</span>
              <button
                type="button"
                onClick={() => togglePref(row.key)}
                className={cn(
                  "h-7 w-12 rounded-full transition-colors",
                  prefs[row.key] ? "bg-mauve" : "bg-border",
                )}
              >
                <span
                  className={cn(
                    "block h-5 w-5 rounded-full bg-white transition-transform",
                    prefs[row.key] ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
            </div>
          ))}
        </Card>
        <Button variant="outline" full className="mb-3" onClick={() => pushToast("Password reset email sent")}>
          Change Password
        </Button>
        <Button variant="danger" full onClick={() => setConfirmDelete(true)}>
          Delete Account
        </Button>
      </div>
      <BottomSheet open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete account?">
        <p className="mb-4 text-sm text-muted-foreground">
          This permanently removes your profile from this demo device.
        </p>
        <Button
          variant="danger"
          full
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
        >
          Delete Account
        </Button>
      </BottomSheet>
    </div>
  );
}
