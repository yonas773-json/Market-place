import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listThreads } from "@/lib/marketplace.functions";
import { AuthWall } from "@/components/login-panel";
import { Frame, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/inbox")({ component: InboxPage });

function InboxPage() {
  const { t } = useApp();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listThreads>>>([]);
  useEffect(() => { void listThreads().then(setRows).catch(() => setRows([])); }, []);
  return (
    <Frame>
      <TitleBar title={t.messages} back="/" />
      <AuthWall>
        <div className="space-y-3 px-5 py-5">
          {!rows.length ? <p className="text-sm text-muted">{t.noMessages}</p> : null}
          {rows.map((row) => (
            <Link key={row.id} to="/inbox/$id" params={{ id: String(row.id) }} className="block rounded-sheet bg-card p-4">
              <p className="font-bold">{row.name}</p>
              <p className="truncate text-sm text-muted">{row.lastBody || t.startChat}</p>
            </Link>
          ))}
        </div>
      </AuthWall>
    </Frame>
  );
}
