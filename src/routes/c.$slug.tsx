import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { listCategory } from "@/lib/marketplace.functions";
import { Chips, Frame, ListingRow, SpotlightCard, TitleBar, useApp } from "@/components/shell";

type CatSearch = { q: string; city: string; max: number; stars: number; sort: "popular" | "price" | "new" };

export const Route = createFileRoute("/c/$slug")({
  validateSearch: (search: Record<string, unknown>): CatSearch => ({
    q: typeof search.q === "string" ? search.q.slice(0, 60) : "",
    city: typeof search.city === "string" ? search.city.slice(0, 40) : "",
    max: Math.max(0, Math.min(1_000_000, Number(search.max) || 0)),
    stars: [0, 3, 4, 5].includes(Number(search.stars)) ? (Number(search.stars) as 0 | 3 | 4 | 5) : 0,
    sort: search.sort === "price" || search.sort === "new" ? search.sort : "popular",
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) => listCategory({ data: { slug: params.slug, ...deps } }),
  component: CategoryPage,
});

function CategoryPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const { lang, t } = useApp();
  const name = data.category ? (lang === "am" && data.category.nameAm ? data.category.nameAm : data.category.name) : t.results;
  const set = (patch: Partial<CatSearch>) => {
    void navigate({ to: "/c/$slug", params: { slug }, search: { ...search, ...patch } });
  };

  return (
    <Frame>
      <TitleBar title={name} back="/" />
      <div className="space-y-4 px-5 pb-8 pt-4">
        <Chips categories={data.categories} active={slug} city={search.city} />
        <div className="flex flex-wrap gap-2">
          {(["popular", "price", "new"] as const).map((key) => (
            <button key={key} type="button" onClick={() => set({ sort: key })} className={search.sort === key ? "rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-card" : "rounded-full bg-chip px-3 py-1.5 text-xs font-bold"}>
              {key === "popular" ? t.popular : key === "price" ? t.priceLow : t.newest}
            </button>
          ))}
        </div>
        <form className="grid grid-cols-2 gap-2" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); set({ city: String(fd.get("city") || ""), max: Number(fd.get("max") || 0), stars: Number(fd.get("stars") || 0) }); }}>
          <select name="city" defaultValue={search.city} className="h-11 rounded-full bg-chip px-3 text-sm">
            <option value="">{t.anywhere}</option>
            {data.cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select name="stars" defaultValue={String(search.stars)} className="h-11 rounded-full bg-chip px-3 text-sm">
            <option value="0">{t.anyStars}</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5</option>
          </select>
          <input name="max" inputMode="numeric" placeholder={t.maxPrice} defaultValue={search.max || ""} className="h-11 rounded-full bg-chip px-3 text-sm outline-none" />
          <button className="h-11 rounded-full bg-ink text-sm font-bold text-card">{t.filter}</button>
        </form>
        {data.spotlight ? <SpotlightCard item={data.spotlight} /> : null}
        <div className="space-y-3">
          {data.services.map((s) => <ListingRow key={s.id} item={s} />)}
        </div>
        {!data.spotlight && data.services.length === 0 ? <p className="text-sm text-muted">{t.emptyList}</p> : null}
      </div>
    </Frame>
  );
}
