import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { createBusiness, requestPlan, setServiceActive, studioHome, upsertService } from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import type { ServiceCard } from "@/lib/marketplace.server";
import { AuthWall } from "@/components/login-panel";
import { btnClass, Field, Frame, inputClass, statusText, TitleBar, useApp } from "@/components/shell";

const PRESETS = ["/media/quick.jpg", "/media/supplies.jpg", "/media/bath.jpg", "/media/floor.jpg", "/media/sofa.jpg", "/media/kitchen.jpg", "/media/marcus.jpg", "/media/food.jpg", "/media/fashion.jpg"];

export const Route = createFileRoute("/studio")({ component: StudioPage });

function StudioPage() {
  const { t, lang } = useApp();
  const [data, setData] = useState<Awaited<ReturnType<typeof studioHome>> | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"overview" | "listings" | "orders">("overview");
  const load = () => studioHome().then(setData).catch((e) => setError(e instanceof Error ? e.message : t.failed));
  useEffect(() => { void load(); }, []);

  return (
    <Frame>
      <TitleBar title={t.myShop} back="/me" />
      <AuthWall>
        <div className="space-y-4 px-5 py-5">
          {error ? <p className="text-sm">{error}</p> : null}
          {!data?.business ? <OpenShop onDone={setData} /> : (
            <>
              <p className="text-sm text-muted">{data.business.verified ? t.verified : t.pending} · {data.business.city}</p>
              <div className="flex gap-2">
                {(["overview", "listings", "orders"] as const).map((key) => (
                  <button key={key} type="button" onClick={() => setTab(key)} className={tab === key ? "h-10 rounded-full bg-ink px-3 text-xs font-bold text-card" : "h-10 rounded-full bg-chip px-3 text-xs font-bold"}>
                    {key === "overview" ? t.overview : key === "listings" ? t.listings : t.orders}
                  </button>
                ))}
              </div>
              {tab === "overview" ? (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <Stat label={t.sales} value={money(data.stats.sales, lang)} />
                    <Stat label={t.orders} value={String(data.stats.orders)} />
                    <Stat label={t.products} value={String(data.stats.products)} />
                    <Stat label={t.customers} value={String(data.stats.customers)} />
                  </div>
                  <div className="h-36 rounded-sheet bg-card p-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.chart}>
                        <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                        <Bar dataKey="total" fill="var(--color-primary)" radius={8} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted">{t.planNote}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(["free", "growth", "featured"] as const).map((plan) => (
                      <button key={plan} type="button" className={data.business?.plan === plan ? "h-11 rounded-full bg-primary text-xs font-bold text-primary-ink" : "h-11 rounded-full bg-chip text-xs font-bold"} onClick={() => void requestPlan({ data: { plan } }).then(() => load())}>
                        {plan === "free" ? t.free : plan === "growth" ? t.growth : t.featured}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
              {tab === "listings" ? <ListingEditor services={data.services} category={data.business.categorySlug} onDone={() => void load()} /> : null}
              {tab === "orders" ? (
                <div className="space-y-2">
                  {!data.orders.length ? <p className="text-sm text-muted">{t.noOrders}</p> : data.orders.map((o) => (
                    <a key={o.id} href={`/orders/${o.id}`} className="block rounded-sheet bg-card p-3 text-sm">
                      <span className="font-bold">{o.businessName}</span>
                      <span className="mt-1 block text-muted">{o.summary} · {statusText(t, o.status)} · {money(o.total, lang)}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </AuthWall>
    </Frame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-sheet bg-card p-3"><p className="text-xs text-muted">{label}</p><p className="text-lg font-extrabold tabular-nums">{value}</p></div>;
}

function OpenShop({ onDone }: { onDone: (d: Awaited<ReturnType<typeof studioHome>>) => void }) {
  const { t } = useApp();
  const [form, setForm] = useState({ name: "", categorySlug: "cleaning", city: "Addis Ababa", area: "", phone: "", hours: "8:00–18:00", about: "" });
  const [error, setError] = useState("");
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); void createBusiness({ data: form }).then(onDone).catch((err) => setError(err instanceof Error ? err.message : t.failed)); }}>
      <p className="text-sm text-muted">{t.shopLive}</p>
      <Field label={t.shopName}><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field>
      <Field label={t.catalog}>
        <select className={inputClass} value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}>
          {["cleaning", "it", "plumbing", "food", "fashion", "electronics", "beauty", "grocery", "home", "auto", "hardware", "learning", "pros", "wellness"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label={t.city}><input className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
      <Field label={t.area}><input className={inputClass} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} /></Field>
      <Field label={t.phone}><input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
      <Field label={t.hours}><input className={inputClass} value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} /></Field>
      <Field label={t.about}><input className={inputClass} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} /></Field>
      {error ? <p className="text-sm">{error}</p> : null}
      <button className={btnClass}>{t.createShop}</button>
    </form>
  );
}

function ListingEditor({ services, category, onDone }: { services: ServiceCard[]; category: string; onDone: () => void }) {
  const { t } = useApp();
  const blank = { id: 0, title: "", blurb: "", description: "", price: 500, compareAt: 0, pricePremium: 0, pricePlatinum: 0, badge: "", kind: "service" as "service" | "product", stock: 0, image: PRESETS[0], tint: "mint", categorySlug: category };
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  return (
    <div className="space-y-3">
      <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); void upsertService({ data: form }).then(() => { setForm({ ...blank, categorySlug: category }); onDone(); }).catch((err) => setError(err instanceof Error ? err.message : t.failed)); }}>
        <Field label={t.title}><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field>
        <Field label={t.blurb}><input className={inputClass} value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} /></Field>
        <Field label={t.details}><input className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label={t.price}><input inputMode="numeric" className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></Field>
          <Field label={t.was}><input inputMode="numeric" className={inputClass} value={form.compareAt} onChange={(e) => setForm({ ...form, compareAt: Number(e.target.value) })} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={form.kind === "service" ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold"} onClick={() => setForm({ ...form, kind: "service" })}>{t.kindService}</button>
          <button type="button" className={form.kind === "product" ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold"} onClick={() => setForm({ ...form, kind: "product" })}>{t.kindProduct}</button>
        </div>
        {form.kind === "product" ? <Field label={t.stockCount}><input inputMode="numeric" className={inputClass} value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></Field> : null}
        <div className="flex gap-2 overflow-x-auto">
          {PRESETS.map((src) => (
            <button type="button" key={src} onClick={() => setForm({ ...form, image: src })} className={form.image === src ? "rounded-2xl ring-2 ring-primary" : "rounded-2xl"}>
              <img src={src} alt="" className="size-14 rounded-2xl object-cover" />
            </button>
          ))}
        </div>
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          void shrink(file).then((image) => setForm((f) => ({ ...f, image }))).catch(() => setError(t.failed));
        }} />
        {error ? <p className="text-sm">{error}</p> : null}
        <button className={btnClass}>{form.id ? t.update : t.addListing}</button>
      </form>
      {services.map((s) => (
        <div key={s.id} className="flex items-center justify-between rounded-sheet bg-card p-3 text-sm">
          <button type="button" className="text-left font-bold" onClick={() => setForm({ id: s.id, title: s.title, blurb: s.blurb, description: s.description, price: s.price, compareAt: s.compareAt ?? 0, pricePremium: s.pricePremium ?? 0, pricePlatinum: s.pricePlatinum ?? 0, badge: s.badge, kind: s.kind, stock: s.stock ?? 0, image: s.image || PRESETS[0], tint: s.tint, categorySlug: s.categorySlug })}>{s.title}</button>
          <button type="button" className="text-xs font-semibold text-primary" onClick={() => void setServiceActive({ data: { id: s.id, active: false } }).then(onDone)}>{t.unpublish}</button>
        </div>
      ))}
    </div>
  );
}

async function shrink(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.72);
}
