import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { Avatar, Card, Header, Input, Screen } from "@/components/kit";
import { providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/messages/")({
  component: MessagesScreen,
});

function MessagesScreen() {
  const { conversations, providers } = useApp();

  return (
    <Screen canvas padded={false}>
      <Header title="Messages" back={false} />
      <div className="px-5 pb-8">
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search conversations" className="pl-10" />
        </div>
        <div className="space-y-3">
          {conversations.map((c) => {
            const provider = providerById(c.providerId, providers);
            const last = c.messages[c.messages.length - 1];
            return (
              <Link key={c.id} to="/messages/$id" params={{ id: c.id }} className="block">
                <Card className="flex items-center gap-3">
                  <Avatar initials={provider?.initials ?? "DR"} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display font-semibold">{provider?.name}</p>
                      <span className="text-[11px] text-muted-foreground">{last?.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.department}</p>
                    <p className="mt-1 truncate text-sm">{last?.text}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-mauve px-1.5 text-[11px] text-white">
                      {c.unread}
                    </span>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
      <Link
        to="/messages/new"
        className="fixed bottom-[5.5rem] right-[max(1.25rem,calc(50vw-240px+1.25rem))] flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-soft"
        aria-label="New message"
      >
        <Plus size={26} />
      </Link>
    </Screen>
  );
}
