import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import {
  adminAddCategory,
  adminCloseReport,
  adminCreateAccount,
  adminOverview,
  adminRemoveListing,
  adminResetPassword,
  adminSaveBusiness,
  adminSaveListing,
  adminSaveSettings,
  adminSetBusiness,
  adminSetPayment,
  adminSetUser,
  setOrderStatus,
} from "@/lib/marketplace.functions";
import { money } from "@/lib/i18n";
import { AuthWall } from "@/components/login-panel";
import { btnClass, Field, Frame, inputClass, statusText, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type Desk = Awaited<ReturnType<typeof adminOverview>>;
type Tab = "desk" | "accounts" | "shops" | "listings" | "orders" | "more";

const PHOTOS = ["/media/quick.jpg", "/media/supplies.jpg", "/media/bath.jpg", "/media/floor.jpg", "/media/sofa.jpg", "/media/kitchen.jpg", "/media/food.jpg", "/media/fashion.jpg"];
const ORDER_STEPS = ["placed", "accepted", "preparing", "ontheway", "done", "rejected", "cancelled"] as const;

const blankShop = {
  id: 0,
  name: "",
  categorySlug: "cleaning",
  city: "Addis Ababa",
  area: "",
  phone: "",
  hours: "8:00–18:00",
  about: "",
  plan: "free",
  verified: false,
  ownerUserId: "",
};

const blankListing = {
  id: 0,
  businessId: 0,
  title: "",
  blurb: "",
  description: "",
  price: 500,
  compareAt: 0,
  kind: "service" as "service" | "product",
  categorySlug: "cleaning",
  stock: 0,
  active: true,
  featured: false,
  image: PHOTOS[0],
};

export function AdminPage() {
  const { t, lang } = useApp();
  const [data, setData] = useState<Desk | null>(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<Tab>("accounts");
  const [cat, setCat] = useState({ slug: "", name: "", nameAm: "", tint: "mint" });
  const [bps, setBps] = useState(800);
  const [fee, setFee] = useState(1499);
  const [account, setAccount] = useState({ name: "", email: "", password: "", role: "customer" });
  const [shop, setShop] = useState(blankShop);
  const [listing, setListing] = useState(blankListing);
  const [query, setQuery] = useState("");
  const [resetFor, setResetFor] = useState("");
  const [nextPassword, setNextPassword] = useState("");

  const load = () =>
    adminOverview()
      .then((d) => {
        setData(d);
        setBps(d.settings.commissionBps);
        setFee(d.settings.featuredPriceEtb);
        setError("");
      })
      .catch((e) => setError(e instanceof Error ? e.message : t.failed));

  useEffect(() => {
    void load();
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: "accounts", label: t.people },
    { id: "shops", label: t.businesses },
    { id: "listings", label: t.listings },
    { id: "orders", label: t.orders },
    { id: "desk", label: t.overview },
    { id: "more", label: t.settings },
  ];
  const q = query.trim().toLowerCase();
  const people = data?.people.filter((p) => !q || `${p.name} ${p.email}`.toLowerCase().includes(q)) ?? [];
  const shops = data?.businessesList.filter((b) => !q || `${b.name} ${b.city} ${b.area}`.toLowerCase().includes(q)) ?? [];
  const listings = data?.listings.filter((s) => !q || s.title.toLowerCase().includes(q)) ?? [];
  const orders = data?.orderRows.filter((o) => !q || `${o.customerName} ${o.businessName} ${o.summary} ${o.id}`.toLowerCase().includes(q)) ?? [];

  return (
    <Frame>
      <TitleBar title={t.adminDesk} back="/me" />
      <AuthWall>
        <div className="space-y-4 px-5 py-5">
          {error ? <p className="text-sm font-medium">{error}</p> : null}
          {note ? <p className="rounded-sheet bg-mint px-3 py-2 text-sm font-semibold">{note}</p> : null}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { setTab(item.id); setNote(""); }}
                className={tab === item.id ? "h-10 shrink-0 rounded-full bg-ink px-3 text-xs font-bold text-card" : "h-10 shrink-0 rounded-full bg-chip px-3 text-xs font-bold"}
              >
                {item.label}
              </button>
            ))}
          </div>
          <input className={inputClass} value={query} placeholder={t.search} onChange={(e) => setQuery(e.target.value)} />
          {!data ? <div className="h-24 animate-pulse rounded-sheet bg-chip" /> : (
            <>
              {tab === "accounts" ? (
                <section className="space-y-3">
                  <h2 className="font-extrabold">{t.createAccount}</h2>
                  <form
                    className="space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setError("");
                      void adminCreateAccount({ data: account })
                        .then(() => {
                          setAccount({ name: "", email: "", password: "", role: "customer" });
                          setNote(t.accountReady);
                          void load();
                        })
                        .catch((err) => setError(err instanceof Error ? err.message : t.failed));
                    }}
                  >
                    <Field label={t.name}><input className={inputClass} value={account.name} onChange={(e) => setAccount({ ...account, name: e.target.value })} required /></Field>
                    <Field label={t.email}><input type="email" className={inputClass} value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} required /></Field>
                    <Field label={t.password}><input type="text" className={inputClass} value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} required minLength={8} /></Field>
                    <p className="text-xs text-muted">{t.passwordHint}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(["customer", "seller", "admin"] as const).map((role) => (
                        <button key={role} type="button" className={account.role === role ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold"} onClick={() => setAccount({ ...account, role })}>
                          {role === "customer" ? t.customer : role === "seller" ? t.seller : t.admin}
                        </button>
                      ))}
                    </div>
                    <button className={btnClass}>{t.createAccount}</button>
                  </form>
                  <h2 className="font-extrabold">{t.people}</h2>
                  {people.map((p) => (
                    <div key={p.id} className="rounded-sheet bg-card p-3 text-sm">
                      <p className="font-bold">{p.name}</p>
                      <p className="text-muted">{p.email}</p>
                      <p className="text-xs text-muted">{p.isAdmin ? t.admin : p.isBusiness ? t.seller : t.customer}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetUser({ data: { target: p.id, suspended: !p.suspended } }).then(load)}>{p.suspended ? t.restore : t.suspend}</button>
                        <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetUser({ data: { target: p.id, isAdmin: !p.isAdmin } }).then(load)}>{p.isAdmin ? t.removeAdmin : t.makeAdmin}</button>
                        <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => { setResetFor(p.id); setNextPassword(""); }}>{t.resetPassword}</button>
                      </div>
                      {resetFor === p.id ? (
                        <form className="mt-2 flex gap-2" onSubmit={(e) => {
                          e.preventDefault();
                          void adminResetPassword({ data: { target: p.id, password: nextPassword } })
                            .then(() => { setResetFor(""); setNote(t.passwordSet); })
                            .catch((err) => setError(err instanceof Error ? err.message : t.failed));
                        }}>
                          <input className={inputClass} value={nextPassword} onChange={(e) => setNextPassword(e.target.value)} minLength={8} required />
                          <button className="shrink-0 rounded-full bg-ink px-3 text-xs font-bold text-card">{t.save}</button>
                        </form>
                      ) : null}
                    </div>
                  ))}
                </section>
              ) : null}

              {tab === "shops" ? (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-extrabold">{shop.id ? t.update : t.newRecord}</h2>
                    {shop.id ? <button type="button" className="text-xs font-bold text-primary" onClick={() => setShop(blankShop)}>{t.newRecord}</button> : null}
                  </div>
                  <form
                    className="space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void adminSaveBusiness({ data: shop })
                        .then(() => { setShop(blankShop); setNote(t.savedOk); void load(); })
                        .catch((err) => setError(err instanceof Error ? err.message : t.failed));
                    }}
                  >
                    <Field label={t.shopName}><input className={inputClass} value={shop.name} onChange={(e) => setShop({ ...shop, name: e.target.value })} required /></Field>
                    <Field label={t.catalog}>
                      <select className={inputClass} value={shop.categorySlug} onChange={(e) => setShop({ ...shop, categorySlug: e.target.value })}>
                        {data.categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                      </select>
                    </Field>
                    <Field label={t.city}><input className={inputClass} value={shop.city} onChange={(e) => setShop({ ...shop, city: e.target.value })} /></Field>
                    <Field label={t.area}><input className={inputClass} value={shop.area} onChange={(e) => setShop({ ...shop, area: e.target.value })} /></Field>
                    <Field label={t.phone}><input className={inputClass} value={shop.phone} onChange={(e) => setShop({ ...shop, phone: e.target.value })} /></Field>
                    <Field label={t.hours}><input className={inputClass} value={shop.hours} onChange={(e) => setShop({ ...shop, hours: e.target.value })} /></Field>
                    <Field label={t.about}><input className={inputClass} value={shop.about} onChange={(e) => setShop({ ...shop, about: e.target.value })} /></Field>
                    <Field label={t.people}>
                      <select className={inputClass} value={shop.ownerUserId} onChange={(e) => setShop({ ...shop, ownerUserId: e.target.value })}>
                        <option value="">{t.noOwner}</option>
                        {data.people.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.email}</option>)}
                      </select>
                    </Field>
                    <div className="grid grid-cols-3 gap-2">
                      {(["free", "growth", "featured"] as const).map((plan) => (
                        <button key={plan} type="button" className={shop.plan === plan ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold"} onClick={() => setShop({ ...shop, plan })}>
                          {plan === "free" ? t.free : plan === "growth" ? t.growth : t.featured}
                        </button>
                      ))}
                    </div>
                    <button type="button" className={shop.verified ? "h-10 w-full rounded-full bg-primary text-xs font-bold text-primary-ink" : "h-10 w-full rounded-full bg-chip text-xs font-bold"} onClick={() => setShop({ ...shop, verified: !shop.verified })}>
                      {shop.verified ? t.verified : t.approve}
                    </button>
                    <button className={btnClass}>{t.save}</button>
                  </form>
                  {shops.map((b) => (
                    <div key={b.id} className="rounded-sheet bg-card p-3 text-sm">
                      <button type="button" className="text-left" onClick={() => setShop({
                        id: b.id, name: b.name, categorySlug: b.categorySlug, city: b.city, area: b.area, phone: b.phone, hours: b.hours, about: b.about, plan: b.plan, verified: b.verified, ownerUserId: b.ownerUserId,
                      })}>
                        <p className="font-bold">{b.name}</p>
                        <p className="text-muted">{b.city} · {b.plan}{b.owned ? ` · ${t.owned}` : ` · ${t.sample}`}</p>
                      </button>
                      <div className="mt-2 flex gap-2">
                        <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetBusiness({ data: { id: b.id, verified: !b.verified, suspended: b.suspended } }).then(load)}>{b.verified ? t.verified : t.approve}</button>
                        <button type="button" className="rounded-full bg-chip px-3 py-1 text-xs font-bold" onClick={() => void adminSetBusiness({ data: { id: b.id, verified: b.verified, suspended: !b.suspended } }).then(load)}>{b.suspended ? t.restore : t.suspend}</button>
                      </div>
                    </div>
                  ))}
                </section>
              ) : null}

              {tab === "listings" ? (
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-extrabold">{listing.id ? t.update : t.addListing}</h2>
                    {listing.id ? <button type="button" className="text-xs font-bold text-primary" onClick={() => setListing(blankListing)}>{t.newRecord}</button> : null}
                  </div>
                  <form
                    className="space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void adminSaveListing({ data: listing })
                        .then(() => { setListing(blankListing); setNote(t.savedOk); void load(); })
                        .catch((err) => setError(err instanceof Error ? err.message : t.failed));
                    }}
                  >
                    <Field label={t.pickShop}>
                      <select className={inputClass} value={listing.businessId || ""} onChange={(e) => setListing({ ...listing, businessId: Number(e.target.value) })} required>
                        <option value="">{t.pickShop}</option>
                        {data.businessesList.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                    </Field>
                    <Field label={t.title}><input className={inputClass} value={listing.title} onChange={(e) => setListing({ ...listing, title: e.target.value })} required /></Field>
                    <Field label={t.blurb}><input className={inputClass} value={listing.blurb} onChange={(e) => setListing({ ...listing, blurb: e.target.value })} /></Field>
                    <Field label={t.details}><input className={inputClass} value={listing.description} onChange={(e) => setListing({ ...listing, description: e.target.value })} /></Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label={t.price}><input inputMode="numeric" className={inputClass} value={listing.price} onChange={(e) => setListing({ ...listing, price: Number(e.target.value) })} /></Field>
                      <Field label={t.was}><input inputMode="numeric" className={inputClass} value={listing.compareAt} onChange={(e) => setListing({ ...listing, compareAt: Number(e.target.value) })} /></Field>
                    </div>
                    <Field label={t.catalog}>
                      <select className={inputClass} value={listing.categorySlug} onChange={(e) => setListing({ ...listing, categorySlug: e.target.value })}>
                        {data.categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                      </select>
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" className={listing.kind === "service" ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold"} onClick={() => setListing({ ...listing, kind: "service" })}>{t.kindService}</button>
                      <button type="button" className={listing.kind === "product" ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold"} onClick={() => setListing({ ...listing, kind: "product" })}>{t.kindProduct}</button>
                    </div>
                    {listing.kind === "product" ? <Field label={t.stockCount}><input inputMode="numeric" className={inputClass} value={listing.stock} onChange={(e) => setListing({ ...listing, stock: Number(e.target.value) })} /></Field> : null}
                    <div className="flex gap-2 overflow-x-auto">
                      {PHOTOS.map((src) => (
                        <button type="button" key={src} onClick={() => setListing({ ...listing, image: src })} className={listing.image === src ? "rounded-2xl ring-2 ring-primary" : "rounded-2xl"}>
                          <img src={src} alt="" className="size-14 rounded-2xl object-cover" />
                        </button>
                      ))}
                    </div>
                    <button type="button" className={listing.featured ? "h-10 w-full rounded-full bg-primary text-xs font-bold text-primary-ink" : "h-10 w-full rounded-full bg-chip text-xs font-bold"} onClick={() => setListing({ ...listing, featured: !listing.featured })}>
                      {t.featured}
                    </button>
                    <button type="button" className={listing.active ? "h-10 w-full rounded-full bg-primary text-xs font-bold text-primary-ink" : "h-10 w-full rounded-full bg-chip text-xs font-bold"} onClick={() => setListing({ ...listing, active: !listing.active })}>
                      {listing.active ? t.published : t.hidden}
                    </button>
                    <button className={btnClass}>{t.save}</button>
                  </form>
                  {listings.map((s) => (
                    <div key={s.id} className="flex items-center gap-2 rounded-sheet bg-card p-3 text-sm">
                      <button
                        type="button"
                        className="min-w-0 flex-1 text-left"
                        onClick={() => setListing({
                          id: s.id, businessId: s.businessId, title: s.title, blurb: s.blurb, description: s.description,
                          price: s.price, compareAt: s.compareAt, kind: s.kind, categorySlug: s.categorySlug, stock: s.stock,
                          active: s.active, featured: s.featured, image: s.image,
                        })}
                      >
                        <span className="font-bold">{s.title}</span>
                        <span className="mt-1 block text-muted">{money(s.price, lang)} · {s.active ? t.published : t.hidden}</span>
                      </button>
                      <button type="button" className="text-xs font-bold text-primary" onClick={() => void adminRemoveListing({ data: { id: s.id } }).then(() => { setNote(t.savedOk); void load(); }).catch((err) => setError(err instanceof Error ? err.message : t.failed))}>{t.remove}</button>
                    </div>
                  ))}
                </section>
              ) : null}

              {tab === "orders" ? (
                <section className="space-y-2">
                  {!orders.length ? <p className="text-sm text-muted">{t.noOrders}</p> : orders.map((o) => (
                    <div key={o.id} className="rounded-sheet bg-card p-3 text-sm">
                      <p className="font-bold">#{o.id} · {o.businessName}</p>
                      <p className="text-muted">{o.customerName} · {o.summary || t.items}</p>
                      <p className="mt-1 font-semibold tabular-nums">{money(o.total, lang)} · {o.paymentStatus === "paid" ? t.paid : t.unpaid}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <select className={inputClass} value={o.status} onChange={(e) => void setOrderStatus({ data: { id: o.id, status: e.target.value } }).then(() => load()).catch((err) => setError(err instanceof Error ? err.message : t.failed))}>
                          {ORDER_STEPS.map((step) => <option key={step} value={step}>{statusText(t, step)}</option>)}
                        </select>
                        <button type="button" className="h-11 rounded-full bg-chip text-xs font-bold" onClick={() => void adminSetPayment({ data: { id: o.id, paid: o.paymentStatus !== "paid" } }).then(load)}>
                          {o.paymentStatus === "paid" ? t.unpaid : t.markPaid}
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              ) : null}

              {tab === "desk" ? (
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
                </>
              ) : null}

              {tab === "more" ? (
                <>
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
                  <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); void adminAddCategory({ data: cat }).then(() => { setCat({ slug: "", name: "", nameAm: "", tint: "mint" }); setNote(t.savedOk); void load(); }); }}>
                    <h2 className="font-extrabold">{t.addCategory}</h2>
                    <Field label={t.categoryName}><input className={inputClass} value={cat.name} onChange={(e) => setCat({ ...cat, name: e.target.value })} required /></Field>
                    <Field label={t.slug}><input className={inputClass} value={cat.slug} onChange={(e) => setCat({ ...cat, slug: e.target.value })} /></Field>
                    <Field label={t.amharic}><input className={inputClass} value={cat.nameAm} onChange={(e) => setCat({ ...cat, nameAm: e.target.value })} /></Field>
                    <button className={btnClass}>{t.addCategory}</button>
                  </form>
                  <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); void adminSaveSettings({ data: { commissionBps: bps, featuredPriceEtb: fee } }).then(() => { setNote(t.savedOk); void load(); }); }}>
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
              ) : null}
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
