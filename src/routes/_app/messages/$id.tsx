import { createFileRoute } from "@tanstack/react-router";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/kit";
import { providerById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/messages/$id")({
  component: ThreadScreen,
});

function ThreadScreen() {
  const { id } = Route.useParams();
  const { conversations, providers, sendMessage } = useApp();
  const [text, setText] = useState("");
  const conversation = conversations.find((c) => c.id === id);
  const provider = conversation ? providerById(conversation.providerId, providers) : undefined;

  if (!conversation) return <p className="p-6">Conversation not found.</p>;

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <Header title={provider?.name ?? "Message"} subtitle={conversation.department} />
      <p className="px-5 text-center text-xs text-muted-foreground">
        Provider typically replies within 24 hrs
      </p>
      <div className="flex-1 space-y-3 px-5 py-4">
        {conversation.messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[80%] rounded-[20px] px-4 py-3 text-sm",
              m.from === "patient" ? "ml-auto bg-mauve text-white" : "bg-white text-foreground shadow-card",
            )}
          >
            {m.text}
            <p className={cn("mt-1 text-[11px]", m.from === "patient" ? "text-white/70" : "text-muted-foreground")}>
              {m.time}
            </p>
          </div>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-border bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          sendMessage(id, text.trim());
          setText("");
        }}
      >
        <button type="button" className="text-plum" aria-label="Attach">
          <Paperclip size={20} />
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message"
          className="flex-1 rounded-full bg-canvas px-4 py-3 text-sm outline-none"
        />
        <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white" aria-label="Send">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
