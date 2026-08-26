import { createFileRoute } from "@tanstack/react-router";
import { Download, Share2 } from "lucide-react";
import { Card, Header } from "@/components/kit";
import { formatDate } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/documents/$id")({
  component: DocumentViewerScreen,
});

function DocumentViewerScreen() {
  const { id } = Route.useParams();
  const { documents, pushToast } = useApp();
  const doc = documents.find((d) => d.id === id);

  if (!doc) return <p className="p-6">Document not found.</p>;

  return (
    <div className="min-h-dvh bg-canvas">
      <Header
        title={doc.name}
        right={
          <div className="flex gap-2">
            <button type="button" className="text-plum" onClick={() => pushToast("Download started")} aria-label="Download">
              <Download size={18} />
            </button>
            <button type="button" className="text-plum" onClick={() => pushToast("Share sheet opened")} aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>
        }
      />
      <div className="px-5">
        <Card className="flex h-80 flex-col items-center justify-center bg-white">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-mauve">{doc.kind}</span>
          <p className="mt-4 text-sm text-muted-foreground">{formatDate(doc.date)} · {doc.size}</p>
          <p className="mt-2 max-w-[14rem] text-center text-sm">{doc.name}</p>
        </Card>
      </div>
    </div>
  );
}
