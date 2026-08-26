import { Outlet, createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { TAB_ROUTES, TabBar } from "@/components/TabBar";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { hydrated, user } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login" });
  }, [hydrated, user, navigate]);

  if (!hydrated || !user) {
    return <div className="min-h-dvh bg-canvas" />;
  }

  const showTabs = TAB_ROUTES.some((route) => pathname === route);

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      {showTabs && <TabBar />}
    </div>
  );
}
