import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listHome } from "@/lib/marketplace.functions";
import { CartButton, Chips, Frame, HeroCard, ListingRow, ShopPill, useApp } from "@/components/shell";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    city: typeof search.city === "string" ? search.city.slice(0, 40) : "",
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => listHome({ data: { city: deps.city } }),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  const { city } = Route.useSearch();
  const navigate = useNavigate();
  const { t } = useApp();
  const { user, isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const name = isPending ? "" : user?.displayName || t.signIn;

  return (
    <Frame>
      <div className="space-y-5 px-5 pb-6 pt-5">
        <div className="flex items-center justify-between gap-3">
          <Link to={user ? "/me" : "/login"} className="flex min-w-0 items-center gap-2 rounded-full bg-card py-1 pl-1 pr-4 shadow-sm">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="" className="size-10 rounded-full object-cover" />
            ) : (
              <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink">
                {(name || "J").charAt(0).toUpperCase()}
              </span>
            )}
            <span className="min-w-0 leading-tight">
              <span className="block text-xs text-muted">{t.welcome}</span>
              <span className="block truncate text-sm font-bold">{isPending ? "…" : name}</span>
            </span>
          </Link>
          <div className="flex gap-2">
            <button type="button" aria-label={t.city} onClick={() => setOpen((v) => !v)} className="grid size-11 place-items-center rounded-full bg-card text-ink shadow-sm">
              <MapPin className="size-5" />
            </button>
            <CartButton />
          </div>
        </div>
        {open ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="rounded-full bg-chip px-3 py-2 text-sm font-semibold" onClick={() => { setOpen(false); void navigate({ to: "/", search: { city: "" } }); }}>{t.anywhere}</button>
            {data.cities.map((c) => (
              <button key={c} type="button" className="rounded-full bg-chip px-3 py-2 text-sm font-semibold" onClick={() => { setOpen(false); void navigate({ to: "/", search: { city: c } }); }}>{c}</button>
            ))}
          </div>
        ) : null}
        <div>
          <p className="text-xs font-bold tracking-wide text-primary">{t.platform}</p>
          <h1 className="mt-1 text-5xl font-extrabold leading-none tracking-tight">{t.headlineA}<br />{t.headlineB}</h1>
        </div>
        <form action="/search" className="flex h-12 items-center gap-2 rounded-full bg-chip px-4">
          <Search className="size-5 text-muted" />
          <input name="q" placeholder={t.search} className="w-full bg-transparent text-sm outline-none" />
        </form>
        <Chips categories={data.categories} active="all" city={city} />
        {data.hero ? <HeroCard item={data.hero} /> : null}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">{t.trending}</h2>
            <Link to="/c/$slug" params={{ slug: "cleaning" }} search={{ q: "", city, max: 0, stars: 0, sort: "popular" }} className="text-sm font-semibold text-primary">{t.seeAll}</Link>
          </div>
          <div className="space-y-3">
            {data.trending.filter((s) => !s.homeHero).slice(0, 4).map((s) => <ListingRow key={s.id} item={s} />)}
          </div>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-extrabold">{t.nearby}</h2>
          <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
            {data.nearby.map((s) => <ShopPill key={s.id} shop={s} />)}
          </div>
        </section>
      </div>
    </Frame>
  );
}
