import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { AuthInput, AuthShell, PasswordField, SocialAuth } from "@/components/AuthShell";
import { Button, Field } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  component: LoginScreen,
});

function LoginScreen() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("elena@pearlcast.com");
  const [password, setPassword] = useState("Pearl123");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError("Check your email and password, then try again.");
      return;
    }
    navigate({ to: "/home" });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to stay connected with your care team." showBack={false}>
      <form onSubmit={submit}>
        <Field label="Email or phone">
          <AuthInput
            icon={<Mail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            autoComplete="username"
          />
        </Field>
        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          error={error}
        />
        <div className="mb-5 flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-mauve">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" full>
          Log In
        </Button>
      </form>
      <SocialAuth
        onContinue={() => {
          login("elena@pearlcast.com", "Pearl123");
          navigate({ to: "/home" });
        }}
      />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-medium text-mauve">
          Sign Up
        </Link>
      </p>
    </AuthShell>
  );
}
