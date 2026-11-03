import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { quoteOrder } from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import { Frame, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { t, lang, lines, setQty, remove } = useApp();
  const [quote, setQuote] = useState<Awaited<ReturnType<typeof quoteOrder>> | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!lines.length) { setQuote(null); return; }
    let live = true;
    quoteOrder({ data: { items: lines } })
      .then((q) => { if (live) { setQuote(q); setError(""); } })
      .catch((e) => { if (live) setError(e instanceof Error ? e.message : t.failed); });
    return () => { live = false; };
  }, [lines, t.failed]);

  return (
    <Frame>
      <TitleBar title={t.cart} back="/" />
      <div className="space-y-3 px-5 py-5">
        {!lines.length ? <p className="text-sm text-muted">{t.emptyCart}</p> : null}
        {error ? <p className="text-sm">{error}</p> : null}
        {quote?.lines.map((line) => (
          <article key={`${line.serviceId}-${line.tier}`} className="flex gap-3 rounded-sheet bg-card p-3">
            {line.image ? <img src={line.image} alt="" className="size-16 rounded-2xl object-cover" /> : null}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{line.title}</p>
              <p className="text-xs text-muted">{line.tier} · {line.businessName}</p>
              <p className="mt-1 text-sm font-bold tabular-nums">{money(line.lineTotal, lang)}</p>
              <div className="mt-2 flex items-center gap-2">
                <button type="button" className="grid size-8 place-items-center rounded-full bg-chip" onClick={() => setQty(line.serviceId, line.tier, Math.max(1, line.qty - 1))}>−</button>
                <span className="text-sm font-bold">{line.qty}</span>
                <button type="button" className="grid size-8 place-items-center rounded-full bg-chip" onClick={() => setQty(line.serviceId, line.tier, Math.min(20, line.qty + 1))}>+</button>
                <button type="button" className="ml-auto text-xs font-semibold text-muted" onClick={() => remove(line.serviceId, line.tier)}>{t.remove}</button>
              </div>
            </div>
          </article>
        ))}
        {quote ? (
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold">{t.total}</span>
            <span className="text-lg font-extrabold tabular-nums">{money(quote.subtotal, lang)}</span>
          </div>
        ) : null}
        {lines.length ? <Link to="/checkout" className="flex h-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-ink">{t.checkout}</Link> : null}
      </div>
    </Frame>
  );
}
