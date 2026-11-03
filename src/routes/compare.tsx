import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getCards } from "@/lib/marketplace.functions";
import { label, money } from "@/lib/i18n";
import { Frame, Stars, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/compare")({ component: ComparePage });

function ComparePage() {
  const { t, lang, compare, toggleCompare } = useApp();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getCards>>>([]);
  useEffect(() => { void getCards({ data: { ids: compare } }).then(setRows); }, [compare]);
  return (
    <Frame>
      <TitleBar title={t.compareTitle} back="/" />
      <div className="space-y-3 px-5 py-5">
        {!rows.length ? <p className="text-sm text-muted">{t.noCompare}</p> : null}
        {rows.map((s) => (
          <article key={s.id} className="rounded-sheet bg-card p-4">
            <Link to="/s/$id" params={{ id: String(s.id) }} className="font-extrabold">{label(lang, s)}</Link>
            <p className="text-sm text-muted">{s.businessName} · {s.city}</p>
            <p className="mt-2 text-lg font-extrabold tabular-nums">{money(s.price, lang)}</p>
            <Stars tenths={s.ratingTenths} count={s.reviewCount} />
            <button type="button" className="mt-3 text-sm font-semibold text-primary" onClick={() => toggleCompare(s.id)}>{t.remove}</button>
          </article>
        ))}
      </div>
    </Frame>
  );
}
