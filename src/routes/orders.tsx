import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { myOrders } from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import { AuthWall } from "@/components/login-panel";
import { Frame, statusText, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const { t, lang } = useApp();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof myOrders>>>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    void myOrders().then(setRows).catch((e) => setError(e instanceof Error ? e.message : t.failed));
  }, [t.failed]);
  return (
    <Frame>
      <TitleBar title={t.orders} back="/" />
      <AuthWall>
        <div className="space-y-3 px-5 py-5">
          {error ? <p className="text-sm">{error}</p> : null}
          {!rows.length && !error ? <p className="text-sm text-muted">{t.noOrders}</p> : null}
          {rows.map((o) => (
            <Link key={o.id} to="/orders/$id" params={{ id: String(o.id) }} className="block rounded-sheet bg-card p-4">
              <p className="font-bold">{o.businessName}</p>
              <p className="text-sm text-muted">{o.summary}</p>
              <p className="mt-2 flex justify-between text-sm font-semibold">
                <span>{statusText(t, o.status)}</span>
                <span className="tabular-nums">{money(o.total, lang)}</span>
              </p>
            </Link>
          ))}
        </div>
      </AuthWall>
    </Frame>
  );
}
