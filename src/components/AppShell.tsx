import type { ReactNode } from "react";
import { useApp } from "@/lib/store";

export function AppShell({ children }: { children: ReactNode }) {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-canvas">
      <main className="flex-1">{children}</main>
      <div className="pointer-events-none fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex justify-center px-4">
        <div className="flex w-full max-w-[448px] flex-col gap-2">
          {toasts.map((toast) => (
            <button
              key={toast.id}
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="pointer-events-auto bg-plum px-4 py-3 text-left text-white shadow-soft"
            >
              <p className="text-sm font-medium">{toast.title}</p>
              {toast.body && <p className="mt-0.5 text-xs text-white/75">{toast.body}</p>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
