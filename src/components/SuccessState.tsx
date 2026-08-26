import type { ReactNode } from "react";
import { Check } from "lucide-react";

export function SuccessState({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center bg-brand-gradient shadow-soft">
        <Check size={36} className="text-white" strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 font-display text-[28px] font-semibold">{title}</h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>
      <div className="mt-8 w-full max-w-sm space-y-3">{children}</div>
    </div>
  );
}
