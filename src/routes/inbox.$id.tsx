import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listMessages, sendMessage } from "@/lib/marketplace.functions";
import { AuthWall } from "@/components/login-panel";
import { Frame, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/inbox/$id")({ component: ThreadPage });

function ThreadPage() {
  const { id } = Route.useParams();
  const { t } = useApp();
  const [data, setData] = useState<Awaited<ReturnType<typeof listMessages>> | null>(null);
  const [body, setBody] = useState("");
  const load = () => listMessages({ data: { threadId: Number(id) } }).then(setData).catch(() => undefined);
  useEffect(() => {
    void load();
    const timer = window.setInterval(() => void load(), 4000);
    return () => window.clearInterval(timer);
  }, [id]);
  return (
    <Frame>
      <TitleBar title={data?.name || t.chat} back="/inbox" />
      <AuthWall>
        <div className="flex flex-col gap-3 px-5 py-5">
          {data?.messages.map((m) => (
            <p key={m.id} className={m.mine ? "ml-10 rounded-3xl bg-primary px-4 py-2 text-sm text-primary-ink" : "mr-10 rounded-3xl bg-card px-4 py-2 text-sm"}>{m.body}</p>
          ))}
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const text = body; setBody(""); void sendMessage({ data: { threadId: Number(id), body: text } }).then(setData); }}>
            <input value={body} onChange={(e) => setBody(e.target.value)} placeholder={t.typeMessage} className="h-12 flex-1 rounded-full bg-chip px-4 text-sm outline-none" />
            <button className="h-12 rounded-full bg-ink px-4 text-sm font-bold text-card">{t.send}</button>
          </form>
        </div>
      </AuthWall>
    </Frame>
  );
}
