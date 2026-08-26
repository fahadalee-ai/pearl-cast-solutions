import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import logoWhite from "@/img/logo-white.png";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Pearl Cast Solutions" }],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const { hydrated } = useApp();

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      navigate({ to: "/onboarding" });
    }, 2200);
    return () => window.clearTimeout(t);
  }, [hydrated, navigate]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[#07060b]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(232,164,90,0.16),transparent_42%),radial-gradient(circle_at_80%_85%,rgba(124,82,134,0.35),transparent_45%),radial-gradient(circle_at_15%_90%,rgba(54,44,73,0.7),transparent_40%)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-[22%] h-56 w-56 -translate-x-1/2 bg-[#f0b56a]/20 blur-3xl"
        style={{ animation: "splash-glow 3.2s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-44 w-44 -translate-x-1/2 border border-white/10"
        style={{ animation: "splash-ring 2.4s ease-out infinite" }}
      />

      <div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-8"
        style={{ animation: "logo-enter 800ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        <img
          src={logoWhite}
          alt="Pearl Cast Solutions"
          className="w-[78%] max-w-[300px] object-contain drop-shadow-[0_0_36px_rgba(255,255,255,0.18)]"
        />
      </div>

      <div className="relative z-10 mb-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-3">
        <div className="h-[2px] w-28 overflow-hidden bg-white/10">
          <div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ animation: "splash-bar 1.4s ease-in-out infinite" }}
          />
        </div>
        <p className="font-display text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
          Loading care
        </p>
      </div>
    </div>
  );
}
