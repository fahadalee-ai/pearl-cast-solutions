import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { SuccessState } from "@/components/SuccessState";
import { Button, Field, Input, LinkButton } from "@/components/kit";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordScreen,
});

function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("elena@pearlcast.com");

  if (sent) {
    return (
      <SuccessState title="Check your inbox" body={`We sent a reset link to ${email}. It expires in 30 minutes.`}>
        <LinkButton to="/login" full>
          Back to Log In
        </LinkButton>
      </SuccessState>
    );
  }

  return (
    <AuthShell title="Reset password" subtitle="We’ll email a secure link to create a new password.">
      <Field label="Email">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Button full onClick={() => setSent(true)}>
        Send Reset Link
      </Button>
    </AuthShell>
  );
}
