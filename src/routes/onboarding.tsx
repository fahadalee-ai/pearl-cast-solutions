import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Button } from "@/components/kit";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import careImg from "@/img/onboard-care.jpg";
import clinicImg from "@/img/auth-clinic.jpg";
import healthImg from "@/img/onboard-health.jpg";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingScreen,
});

const SLIDES = [
  {
    title: "Your Care, Always Connected",
    body: "Manage appointments, records, and messages in one place — wherever you are.",
    image: careImg,
    kicker: "01  Connected care",
  },
  {
    title: "See Your Provider In Clinic",
    body: "Book in-person visits and arrive prepared with your records in hand.",
    image: clinicImg,
    kicker: "02  Clinic visits",
  },
  {
    title: "Stay On Top of Your Health",
    body: "Track meds, forms, bills, and reminders without the scramble.",
    image: healthImg,
    kicker: "03  Daily health",
  },
];

function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { markOnboarded, user } = useApp();
  const startX = useRef<number | null>(null);
  const last = index === SLIDES.length - 1;
  const slide = SLIDES[index];

  const finish = () => {
    markOnboarded();
    navigate({ to: user ? "/home" : "/signup" });
  };

  const go = (next: number) => setIndex(Math.max(0, Math.min(SLIDES.length - 1, next)));

  return (
    <div
      className="relative min-h-dvh overflow-hidden bg-plum text-white"
      onTouchStart={(e) => {
        startX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (startX.current == null) return;
        const delta = e.changedTouches[0].clientX - startX.current;
        if (delta < -48) go(index + 1);
        if (delta > 48) go(index - 1);
        startX.current = null;
      }}
    >
      {SLIDES.map((item, i) => (
        <img
          key={item.title}
          src={item.image}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07060b] via-[#07060b]/55 to-[#362C49]/25" />

      <div className="relative z-10 flex min-h-dvh flex-col px-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">Pearl Cast</p>
          <button type="button" onClick={finish} className="py-2 text-sm font-medium text-white">
            Skip
          </button>
        </div>

        <div className="mt-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">{slide.kicker}</p>
          <h1 className="mt-3 max-w-[17rem] font-display text-[32px] font-semibold leading-[1.15]">
            {slide.title}
          </h1>
          <p className="mt-3 max-w-[20rem] text-[15px] leading-relaxed text-white/78">{slide.body}</p>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn("h-0.5 transition-all", i === index ? "w-8 bg-white" : "w-4 bg-white/35")}
                />
              ))}
            </div>
            <Button
              className="min-w-[132px] bg-white text-plum shadow-none"
              onClick={() => (last ? finish() : setIndex((i) => i + 1))}
            >
              {last ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
