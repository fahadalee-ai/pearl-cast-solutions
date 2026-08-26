import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Screen({
  children,
  className,
  padded = true,
  canvas,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  canvas?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-h-dvh text-foreground",
        canvas ? "bg-canvas" : "bg-background",
        padded && "px-5 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Header({
  title,
  subtitle,
  back = true,
  right,
  fallbackTo = "/home",
  transparent,
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  fallbackTo?: string;
  transparent?: boolean;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <header
      className={cn(
        "sticky top-0 z-30 px-5 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3",
        transparent ? "bg-transparent" : "bg-canvas/95 backdrop-blur-md",
      )}
    >
      <div className="flex items-center gap-3">
        {back && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: fallbackTo as "/" }))}
            className="flex h-11 w-11 items-center justify-center border border-border bg-card text-foreground"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="font-display truncate text-[20px] font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

export function Button({
  children,
  variant = "primary",
  full,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger" | "ghost" | "light";
  full?: boolean;
}) {
  const styles = {
    primary: "bg-brand-gradient text-white shadow-soft",
    outline: "border-[1.5px] border-mauve bg-transparent text-mauve",
    light: "border border-white/40 bg-white/10 text-white",
    danger: "bg-transparent text-danger",
    ghost: "bg-transparent text-mauve",
  }[variant];
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 font-display text-[15px] font-medium tracking-wide transition-opacity disabled:opacity-50",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  params,
  children,
  variant = "primary",
  full,
  className,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: "primary" | "outline" | "danger" | "light";
  full?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-brand-gradient text-white shadow-soft",
    outline: "border-[1.5px] border-mauve bg-transparent text-mauve",
    light: "border border-white/40 bg-white/10 text-white",
    danger: "bg-transparent text-danger",
  }[variant];
  return (
    <Link
      to={to as "/"}
      params={params}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-center font-display text-[15px] font-medium tracking-wide",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-border bg-card p-4 shadow-card",
        onClick && "cursor-pointer transition-transform active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-6 flex items-end justify-between first:mt-0">
      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">{children}</h2>
      {action}
    </div>
  );
}

const chipTone: Record<string, string> = {
  primary: "bg-accent text-mauve",
  success: "bg-[#E7F6EE] text-success",
  warning: "bg-[#FBF3DC] text-[#9A7418]",
  danger: "bg-[#FBECEA] text-danger",
  muted: "bg-muted text-muted-foreground",
};

export function Chip({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof chipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[11px] font-medium tracking-wide",
        chipTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): keyof typeof chipTone {
  if (["Completed", "Paid", "Confirmed", "Active", "Submitted", "On track"].includes(status)) return "success";
  if (["Pending", "Due", "In Progress", "Not Started", "Needs attention"].includes(status)) return "warning";
  if (["Overdue", "Cancelled"].includes(status)) return "danger";
  return "primary";
}

export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[13px] font-medium text-foreground">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-danger">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full border border-transparent bg-canvas px-3.5 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-mauve";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "min-h-28", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClass, props.className)} />;
}

export function Avatar({
  initials,
  size = 44,
  className,
}: {
  initials: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      className={cn(
        "flex shrink-0 items-center justify-center bg-brand-gradient font-display font-semibold text-white",
        className,
      )}
    >
      {initials}
    </div>
  );
}

export function Row({
  icon,
  label,
  value,
  to,
  params,
  onClick,
  danger,
}: {
  icon?: ReactNode;
  label: string;
  value?: ReactNode;
  to?: string;
  params?: Record<string, string>;
  onClick?: () => void;
  danger?: boolean;
}) {
  const inner = (
    <>
      {icon && <span className={cn(danger ? "text-danger" : "text-plum")}>{icon}</span>}
      <span className={cn("flex-1 text-sm font-medium", danger ? "text-danger" : "text-foreground")}>{label}</span>
      {value && <span className="text-xs text-muted-foreground">{value}</span>}
      <ChevronRight size={16} className="text-dim" />
    </>
  );
  const cls =
    "flex w-full items-center gap-3 border-b border-border bg-card px-4 py-4 text-left last:border-b-0";
  return to ? (
    <Link to={to as "/"} params={params} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-soft"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <button type="button" aria-label="Close" onClick={onClose} className="p-1 text-muted-foreground">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Empty({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-10 text-center">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 bg-canvas p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "py-2 text-sm font-medium transition-colors",
            value === option ? "bg-white text-plum shadow-card" : "text-muted-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 overflow-hidden bg-canvas">
      <div className="h-full bg-brand-gradient" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
