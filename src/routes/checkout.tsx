import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { placeOrder, quoteOrder } from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import { AuthWall } from "@/components/login-panel";
import { btnClass, Field, Frame, inputClass, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const { t, lang, lines, clear } = useApp();
  const [quote, setQuote] = useState<Awaited<ReturnType<typeof quoteOrder>> | null>(null);
  const [method, setMethod] = useState<"telebirr" | "cbe" | "cash">("telebirr");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ids, setIds] = useState<number[]>([]);
  const needsDate = quote?.lines.some((l) => l.kind === "service");

  useEffect(() => {
    if (!lines.length) return;
    void quoteOrder({ data: { items: lines } }).then(setQuote).catch((e) => setError(e instanceof Error ? e.message : t.failed));
  }, [lines, t.failed]);

  return (
    <Frame>
      <TitleBar title={t.checkout} back="/cart" />
      <AuthWall>
        <form
          className="space-y-3 px-5 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            void placeOrder({ data: { items: lines, address, city, scheduledFor: when, note, paymentMethod: method } })
              .then((res) => { setIds(res.orderIds); clear(); })
              .catch((err) => setError(err instanceof Error ? err.message : t.failed))
              .finally(() => setBusy(false));
          }}
        >
          {ids.length ? (
            <div className="rounded-sheet bg-mint p-4">
              <p className="text-lg font-extrabold">{t.orderPlaced}</p>
              <p className="mt-1 text-sm">{ids.map((id) => `#${id}`).join(", ")}</p>
              <p className="mt-2 text-sm text-muted">{t.payConfirm}</p>
              <Link to="/orders" className="mt-3 inline-flex font-bold text-primary">{t.orders}</Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted">{t.payNote}</p>
              {quote ? <p className="text-lg font-extrabold tabular-nums">{t.total} {money(quote.subtotal, lang)}</p> : null}
              <Field label={t.address}><input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} required /></Field>
              <Field label={t.city}><input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} required /></Field>
              {needsDate ? <Field label={t.visitDate}><input type="date" className={inputClass} value={when} onChange={(e) => setWhen(e.target.value)} required /></Field> : null}
              <Field label={t.note}><input className={inputClass} value={note} onChange={(e) => setNote(e.target.value)} /></Field>
              <p className="text-xs font-semibold text-muted">{t.payWith}</p>
              <div className="grid grid-cols-3 gap-2">
                {(["telebirr", "cbe", "cash"] as const).map((key) => (
                  <button type="button" key={key} onClick={() => setMethod(key)} className={method === key ? "h-11 rounded-full bg-ink text-xs font-bold text-card" : "h-11 rounded-full bg-chip text-xs font-bold"}>
                    {key === "telebirr" ? t.telebirr : key === "cbe" ? t.cbe : t.cash}
                  </button>
                ))}
              </div>
              {error ? <p className="text-sm">{error}</p> : null}
              <button className={btnClass} disabled={busy || !lines.length}>{busy ? t.processing : t.placeOrder}</button>
            </>
          )}
        </form>
      </AuthWall>
    </Frame>
  );
}
