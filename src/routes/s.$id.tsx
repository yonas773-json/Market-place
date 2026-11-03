import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { addReview, getService, openThread, reportIssue, toggleFavorite } from "@/lib/marketplace.functions";
import { label, line, money } from "@/lib/i18n";
import type { Tier } from "@/lib/marketplace.server";
import { Frame, ListingRow, Stars, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/s/$id")({
  loader: async ({ params }) => {
    const data = await getService({ data: { id: Number(params.id) } });
    if (!data) throw notFound();
    return data;
  },
  component: ServicePage,
});

function ServicePage() {
  const data = Route.useLoaderData();
  const { service, staff, reviews, related } = data;
  const { lang, t, add, toggleCompare, compare, ping } = useApp();
  const { user } = useCurrentUserState();
  const navigate = useNavigate();
  const tiers = [
    service.price ? { id: "classic" as Tier, price: service.price, name: t.classic } : null,
    service.pricePremium ? { id: "premium" as Tier, price: service.pricePremium, name: t.premium } : null,
    service.pricePlatinum ? { id: "platinum" as Tier, price: service.pricePlatinum, name: t.platinum } : null,
  ].filter((x): x is { id: Tier; price: number; name: string } => Boolean(x));
  const [tier, setTier] = useState<Tier>(tiers[0]?.id ?? "classic");
  const [report, setReport] = useState("");
  const [note, setNote] = useState("");
  const [stars, setStars] = useState(5);
  const [review, setReview] = useState("");
  const price = tiers.find((x) => x.id === tier)?.price ?? service.price;
  const title = label(lang, service);
  const desc = lang === "am" && service.descriptionAm ? service.descriptionAm : service.description;

  return (
    <Frame
      dock={
        <div className="mx-4 mb-4 flex items-center gap-3">
          <div className="rounded-full border border-line bg-card px-4 py-3 text-sm font-extrabold tabular-nums">{money(price, lang)}</div>
          <button
            type="button"
            className="h-12 flex-1 rounded-full bg-primary text-sm font-bold text-primary-ink"
            onClick={() => {
              add({ serviceId: service.id, tier, qty: 1 });
              ping(t.added);
              void navigate({ to: "/checkout" });
            }}
          >
            {t.bookNow}
          </button>
        </div>
      }
    >
      <TitleBar title={lang === "am" && service.categoryNameAm ? service.categoryNameAm : service.categoryName} back={`/c/${service.categorySlug}`} />
      <div className="space-y-5 px-5 pb-8 pt-4">
        <div className={`overflow-hidden rounded-sheet ${service.heroImage ? "" : "bg-blush"}`}>
          {service.heroImage ? <img src={service.heroImage} alt={title} className="h-80 w-full object-cover object-top" /> : null}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
            <p className="mt-1 text-sm text-muted">{line(lang, service)}</p>
            <div className="mt-2"><Stars tenths={service.ratingTenths} count={service.reviewCount} /></div>
          </div>
          {service.badge ? (
            <span className="grid size-16 shrink-0 rotate-6 place-items-center rounded-2xl bg-mint px-2 text-center text-xs font-extrabold leading-tight text-ink">{service.badge}</span>
          ) : null}
        </div>
        <p className="text-3xl font-extrabold tabular-nums">
          {money(price, lang)}{" "}
          {tier === "classic" && service.compareAt ? <span className="text-lg font-semibold text-muted line-through">{money(service.compareAt, lang)}</span> : null}
        </p>
        {tiers.length > 1 ? (
          <div className="grid grid-cols-3 gap-2">
            {tiers.map((option, i) => (
              <button key={option.id} type="button" onClick={() => setTier(option.id)} className={tier === option.id ? "rounded-2xl bg-ink px-2 py-3 text-card" : i === 1 ? "rounded-2xl bg-lilac px-2 py-3" : "rounded-2xl bg-sky px-2 py-3"}>
                <span className="block text-xs font-semibold">{option.name}</span>
                <span className="mt-1 block text-sm font-extrabold tabular-nums">{money(option.price, lang)}</span>
              </button>
            ))}
          </div>
        ) : null}
        <div className="flex items-center gap-3 rounded-sheet bg-chip p-3">
          {staff?.photo ? <img src={staff.photo} alt="" className="size-12 rounded-full object-cover" /> : <span className="grid size-12 place-items-center rounded-full bg-card text-sm font-bold">{service.businessName.charAt(0)}</span>}
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{staff?.name ?? service.businessName}</p>
            <p className="text-xs text-muted">{staff ? staff.title : t.contact}{service.verified ? ` · ${t.verified}` : ""}</p>
          </div>
          <a href={`tel:${staff?.phone || service.phone}`} aria-label={t.call} className="grid size-11 place-items-center rounded-full bg-card"><Phone className="size-4" /></a>
          <button
            type="button"
            aria-label={t.message}
            className="grid size-11 place-items-center rounded-full bg-card"
            onClick={() => {
              if (!user) { void navigate({ to: "/login" }); return; }
              void openThread({ data: { businessId: service.businessId } }).then((th) => navigate({ to: "/inbox/$id", params: { id: String(th.id) } }));
            }}
          >
            <MessageCircle className="size-4" />
          </button>
        </div>
        <section>
          <h3 className="text-lg font-extrabold">{t.description}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          <p className="mt-3 flex items-center gap-1 text-sm"><ShieldCheck className="size-4 text-primary" /> {service.businessName} · {service.area}, {service.city}</p>
          {service.hours ? <p className="text-sm text-muted">{t.hours}: {service.hours}</p> : null}
          {service.stock !== null ? <p className="text-sm text-muted">{t.stock}: {service.stock}</p> : null}
        </section>
        <div className="flex gap-2">
          <button type="button" className="h-11 flex-1 rounded-full bg-chip text-sm font-bold" onClick={() => { add({ serviceId: service.id, tier, qty: 1 }); ping(t.added); }}>{t.addCart}</button>
          <button type="button" className="h-11 flex-1 rounded-full bg-chip text-sm font-bold" onClick={() => { if (!user) { void navigate({ to: "/login" }); return; } void toggleFavorite({ data: { serviceId: service.id } }).then(() => ping(t.savedOk)); }}>{t.favorite}</button>
          <button type="button" className="h-11 flex-1 rounded-full bg-chip text-sm font-bold" onClick={() => toggleCompare(service.id)}>{compare.includes(service.id) ? t.remove : t.compare}</button>
        </div>
        <section className="space-y-3">
          <h3 className="text-lg font-extrabold">{t.reviews}</h3>
          {reviews.length === 0 ? <p className="text-sm text-muted">{t.noReviews}</p> : reviews.map((r) => (
            <article key={r.id} className="rounded-sheet bg-card p-3">
              <p className="text-sm font-bold">{r.author} · {r.stars}/5</p>
              <p className="mt-1 text-sm text-muted">{r.body}</p>
            </article>
          ))}
          {user ? (
            <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); void addReview({ data: { serviceId: service.id, stars, body: review } }).then(() => { setNote(t.reviewThanks); setReview(""); }); }}>
              <select value={stars} onChange={(e) => setStars(Number(e.target.value))} className="h-11 w-full rounded-full bg-chip px-3 text-sm">
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}/5</option>)}
              </select>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder={t.writeReview} className="h-20 w-full rounded-3xl bg-chip px-4 py-3 text-sm outline-none" />
              <button className="h-11 rounded-full bg-ink px-4 text-sm font-bold text-card">{t.writeReview}</button>
              {note ? <p className="text-sm">{note}</p> : null}
            </form>
          ) : null}
        </section>
        <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); if (!user) { void navigate({ to: "/login" }); return; } void reportIssue({ data: { businessId: service.businessId, serviceId: service.id, body: report } }).then(() => { setReport(""); setNote(t.reportSent); }); }}>
          <textarea value={report} onChange={(e) => setReport(e.target.value)} placeholder={t.report} className="h-16 w-full rounded-3xl bg-chip px-4 py-3 text-sm outline-none" />
          <button className="text-sm font-semibold text-primary">{t.report}</button>
        </form>
        {related.length ? (
          <section className="space-y-3">
            <h3 className="text-lg font-extrabold">{t.related}</h3>
            {related.map((s) => <ListingRow key={s.id} item={s} />)}
          </section>
        ) : null}
        <Link to="/c/$slug" params={{ slug: service.categorySlug }} search={{ q: "", city: "", max: 0, stars: 0, sort: "popular" }} className="block text-sm font-semibold text-primary">{t.seeAll}</Link>
      </div>
    </Frame>
  );
}
