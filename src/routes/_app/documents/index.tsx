import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Card, Header } from "@/components/kit";
import { formatDate } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/documents/")({
  component: DocumentsScreen,
});

const TABS = ["Lab Results", "Records", "Insurance", "Uploaded by Me"] as const;

function DocumentsScreen() {
  const { documents } = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Lab Results");
  const list = documents.filter((d) => d.type === tab);

  return (
    <div className="min-h-dvh bg-canvas pb-8">
      <Header title="Documents" />
      <div className="px-5">
        <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-xs font-medium",
                tab === t ? "bg-brand-gradient text-white" : "bg-white text-muted-foreground shadow-card",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {list.map((doc) => (
            <Link key={doc.id} to="/documents/$id" params={{ id: doc.id }} className="block">
              <Card className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-xs font-semibold text-mauve">
                  {doc.kind}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(doc.date)} · {doc.size}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/documents/upload"
        className="fixed bottom-6 right-[max(1.25rem,calc(50vw-240px+1.25rem))] flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft"
        aria-label="Upload document"
      >
        <Plus size={26} />
      </Link>
    </div>
  );
}
