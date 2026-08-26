import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthInput, AuthShell, PasswordField } from "@/components/AuthShell";
import { Button, Field } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/signup")({
  component: SignUpScreen,
});

function SignUpScreen() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ") || "Patient";
    if (!firstName || !email || !phone || !password) {
      setError("Please complete every field.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms & Privacy Policy.");
      return;
    }
    const result = register({ firstName, lastName, email, phone, password });
    if (!result.ok) {
      setError("An account with that email already exists.");
      return;
    }
    navigate({ to: "/verify" });
  };

  return (
    <AuthShell title="Create account" subtitle="We’ll keep your records private and easy to reach.">
      <form onSubmit={submit}>
        <Field label="Full name">
          <AuthInput value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Elena Vasquez" />
        </Field>
        <Field label="Email">
          <AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
        </Field>
        <Field label="Phone">
          <AuthInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(415) 555-0148" />
        </Field>
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField
          label="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={error}
        />
        <label className="mb-5 flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 accent-mauve"
          />
          <span>
            I agree to the <span className="font-medium text-mauve">Terms</span> &{" "}
            <span className="font-medium text-mauve">Privacy Policy</span>
          </span>
        </label>
        <Button type="submit" full>
          Create Account
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-mauve">
          Log In
        </Link>
      </p>
    </AuthShell>
  );
}
