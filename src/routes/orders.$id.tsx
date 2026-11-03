import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getOrder, setOrderStatus } from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import { AuthWall } from "@/components/login-panel";
import { Frame, statusText, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/orders/$id")({ component: OrderPage });

function OrderPage() {
  const { id } = Route.useParams();
  const { t, lang } = useApp();
  const [data, setData] = useState<Awaited<ReturnType<typeof getOrder>> | null>(null);
  const [error, setError] = useState("");
  const load = () => getOrder({ data: { id: Number(id) } }).then(setData).catch((e) => setError(e instanceof Error ? e.message : t.failed));
  useEffect(() => { void load(); }, [id]);
  const order = data?.order;
  const steps = ["placed", "accepted", "preparing", "ontheway", "done"];
  return (
    <Frame>
      <TitleBar title={order ? `#${order.id}` : t.orders} back="/orders" />
      <AuthWall>
        <div className="space-y-4 px-5 py-5">
          {error ? <p className="text-sm">{error}</p> : null}
          {order ? (
            <>
              <p className="text-xl font-extrabold">{order.businessName}</p>
              <p className="text-sm text-muted">{t.trackHint}</p>
              <ol className="flex flex-wrap gap-2">
                {steps.map((step) => (
                  <li key={step} className={step === order.status ? "rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-ink" : "rounded-full bg-chip px-3 py-1 text-xs font-semibold"}>{statusText(t, step)}</li>
                ))}
              </ol>
              {order.status === "rejected" || order.status === "cancelled" ? <p className="text-sm font-bold">{statusText(t, order.status)}</p> : null}
              <p className="text-sm">{order.address}, {order.city}</p>
              {order.scheduledFor ? <p className="text-sm">{t.when}: {order.scheduledFor}</p> : null}
              <p className="text-sm">{t.method}: {order.paymentMethod} · {order.paymentStatus}</p>
              <ul className="space-y-2">
                {data.items.map((item) => (
                  <li key={item.title} className="flex justify-between text-sm">
                    <span>{item.title} · {item.tier} × {item.qty}</span>
                    <span className="tabular-nums">{money(item.unitPrice * item.qty, lang)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-extrabold tabular-nums">{t.total} {money(order.total, lang)}</p>
              <div className="flex flex-wrap gap-2">
                {data.role === "customer" && order.status === "placed" ? (
                  <button type="button" className="h-11 rounded-full bg-ink px-4 text-sm font-bold text-card" onClick={() => void setOrderStatus({ data: { id: order.id, status: "cancelled" } }).then(setData)}>{t.cancel}</button>
                ) : null}
                {data.role !== "customer" ? (
                  ["accepted", "preparing", "ontheway", "done", "rejected"].map((status) => (
                    <button key={status} type="button" className="h-10 rounded-full bg-chip px-3 text-xs font-bold" onClick={() => void setOrderStatus({ data: { id: order.id, status } }).then(setData)}>{statusText(t, status)}</button>
                  ))
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </AuthWall>
    </Frame>
  );
}
