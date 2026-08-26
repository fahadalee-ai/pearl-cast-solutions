import logo from "@/img/logo.png";
import logoWhite from "@/img/logo-white.png";
import { cn } from "@/lib/utils";

export function LogoMark({
  variant = "color",
  className,
  size = 72,
}: {
  variant?: "color" | "white";
  className?: string;
  size?: number;
}) {
  return (
    <img
      src={variant === "white" ? logoWhite : logo}
      alt="Pearl Cast Solutions"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}

export function Wordmark({
  light,
  compact,
  className,
}: {
  light?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <p
        className={cn(
          "font-display font-semibold leading-none tracking-tight",
          compact ? "text-xl" : "text-[28px]",
          light ? "text-white" : "text-plum",
        )}
      >
        Pearl
      </p>
      <p
        className={cn(
          "mt-1 font-display font-medium tracking-[0.14em] uppercase",
          compact ? "text-[10px]" : "text-xs",
          light ? "text-white/80" : "text-mauve",
        )}
      >
        Cast Solutions
      </p>
    </div>
  );
}
