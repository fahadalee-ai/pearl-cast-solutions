import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verify")({
  component: VerifyScreen,
});

function VerifyScreen() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  const setDigit = (index: number, value: string) => {
    const next = [...digits];
    next[index] = value.replace(/\D/g, "").slice(-1);
    setDigits(next);
    if (next[index] && index < 5) refs.current[index + 1]?.focus();
  };

  return (
    <AuthShell
      title="Check your inbox"
      subtitle="Enter the 6-digit code we sent to verify your email."
      showLogo={false}
    >
      <div className="mb-8 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center bg-accent text-3xl">✉️</div>
      </div>
      <div className="mb-6 flex justify-between gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={digit}
            onChange={(e) => setDigit(i, e.target.value)}
            inputMode="numeric"
            className={cn(
              "h-14 w-11 bg-canvas text-center font-display text-xl font-semibold outline-none focus:border focus:border-mauve",
            )}
          />
        ))}
      </div>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        {seconds > 0 ? `Resend code in 00:${String(seconds).padStart(2, "0")}` : (
          <button type="button" className="font-medium text-mauve" onClick={() => setSeconds(30)}>
            Resend code
          </button>
        )}
      </p>
      <Button full onClick={() => navigate({ to: "/home" })}>
        Verify
      </Button>
    </AuthShell>
  );
}
