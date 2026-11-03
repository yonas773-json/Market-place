import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import {
  adminAddCategory,
  adminCloseReport,
  adminOverview,
  adminSaveSettings,
  adminSetBusiness,
  adminSetUser,
} from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import { AuthWall } from "@/components/login-panel";
import { btnClass, Field, Frame, inputClass, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { t, lang } = useApp();
  const [data, setData] = useState<Awaited<ReturnType<typeof adminOverview>> | null>(null);
  const [error, setError] = useState("");
  const [cat, setCat] = useState({ slug: "", name: "", nameAm: "", tint: "mint" });
  const [bps, setBps] = useState(800);
  const [fee, setFee] = useState(1499);
  const load = () => adminOverview().then((d) => { setData(d); setBps(d.settings.commissionBps); setFee(d.settings.featuredPriceEtb); }).catch((e) => setError(e instanceof Error ? e.message : t.failed));
  useEffect(() => { void load(); }, []);

  return (
    <Frame>
      <TitleBar title={t.adminDesk} back="/me" />
      <AuthWall>
        <div className="space-y-4 px-5 py-5">
          {error ? <p className="text-sm">{error}</p> : null}
          {!data ? <div className="h-24 animate-pulse rounded-sheet bg-chip" /> : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <Stat label={t.users} value={String(data.users)} />
                <Stat label={t.businesses} value={String(data.businesses)} />
                <Stat label={t.products} value={String(data.products)} />
                <Stat label={t.orders} value={String(data.orders)} />
                <Stat label={t.gmv} value={money(data.revenue, lang)} />
                <Stat label={t.commission} value={money(data.commission, lang)} />
                <Stat label={t.pending} value={String(data.pending)} />
                <Stat label={t.openReports} value={String(data.openReports)} />
              </div>
              <div className="h-36 rounded-sheet bg-card p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.chart}><XAxis dataKey="day" tick={{ fontSize: 10 }} /><Bar dataKey="total" fill="var(--color-primary)" radius={8} /></BarChart>
                </ResponsiveContainer>
              </div>
              <section className="space-y-2">
                <h2 className="font-extrabold">{t.businesses}</h2>
                {data.businessesList.map((b) => (
                  <div key={b.id} className="rounded-sheet bg-card p-3 text-sm">
                    <p className="font-bold">{b.name}</p>
                    <p className="text-muted">{b.city} · {b.plan}{b.owned ? ` · ${t.owned}` : ` · ${t.sample}`}</p>
                    <div className="mt-2 flex gap-2">
                      <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetBusiness({ data: { id: b.id, verified: !b.verified, suspended: b.suspended } }).then(load)}>{b.verified ? t.verified : t.approve}</button>
                      <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetBusiness({ data: { id: b.id, verified: b.verified, suspended: !b.suspended } }).then(load)}>{b.suspended ? t.restore : t.suspend}</button>
                    </div>
                  </div>
                ))}
              </section>
              <section className="space-y-2">
                <h2 className="font-extrabold">{t.people}</h2>
                {data.people.map((p) => (
                  <div key={p.id} className="rounded-sheet bg-card p-3 text-sm">
                    <p className="font-bold">{p.name}</p>
                    <p className="text-muted">{p.email}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetUser({ data: { target: p.id, suspended: !p.suspended } }).then(load)}>{p.suspended ? t.restore : t.suspend}</button>
                      <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetUser({ data: { target: p.id, isAdmin: !p.isAdmin } }).then(load)}>{p.isAdmin ? t.removeAdmin : t.makeAdmin}</button>
                    </div>
                  </div>
                ))}
              </section>
              <section className="space-y-2">
                <h2 className="font-extrabold">{t.reports}</h2>
                {data.reports.map((r) => (
                  <div key={r.id} className="rounded-sheet bg-card p-3 text-sm">
                    <p>{r.body}</p>
                    <p className="text-xs text-muted">{r.status}</p>
                    {r.status === "open" ? <button type="button" className="mt-2 text-xs font-bold text-primary" onClick={() => void adminCloseReport({ data: { id: r.id } }).then(load)}>{t.closeReport}</button> : null}
                  </div>
                ))}
              </section>
              <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); void adminAddCategory({ data: cat }).then(() => { setCat({ slug: "", name: "", nameAm: "", tint: "mint" }); void load(); }); }}>
                <h2 className="font-extrabold">{t.addCategory}</h2>
                <Field label={t.categoryName}><input className={inputClass} value={cat.name} onChange={(e) => setCat({ ...cat, name: e.target.value })} required /></Field>
                <Field label={t.slug}><input className={inputClass} value={cat.slug} onChange={(e) => setCat({ ...cat, slug: e.target.value })} /></Field>
                <Field label={t.amharic}><input className={inputClass} value={cat.nameAm} onChange={(e) => setCat({ ...cat, nameAm: e.target.value })} /></Field>
                <button className={btnClass}>{t.addCategory}</button>
              </form>
              <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); void adminSaveSettings({ data: { commissionBps: bps, featuredPriceEtb: fee } }).then(load); }}>
                <h2 className="font-extrabold">{t.settings}</h2>
                <p className="text-xs text-muted">{t.commissionNote}</p>
                <Field label={t.bps}><input className={inputClass} value={bps} onChange={(e) => setBps(Number(e.target.value))} /></Field>
                <Field label={t.featuredFee}><input className={inputClass} value={fee} onChange={(e) => setFee(Number(e.target.value))} /></Field>
                <button className={btnClass}>{t.saveSettings}</button>
              </form>
              <section>
                <h2 className="font-extrabold">{t.activity}</h2>
                {data.activity.map((a, i) => <p key={i} className="border-b border-line py-2 text-sm"><span className="font-bold">{a.action}</span> {a.detail}</p>)}
              </section>
            </>
          )}
        </div>
      </AuthWall>
    </Frame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-sheet bg-card p-3"><p className="text-xs text-muted">{label}</p><p className="text-base font-extrabold tabular-nums">{value}</p></div>;
}
