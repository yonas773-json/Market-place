import { createFileRoute } from "@tanstack/react-router";
import { searchListings } from "@/lib/marketplace.functions";
import { Frame, ListingRow, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({ q: typeof search.q === "string" ? search.q.slice(0, 60) : "" }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => searchListings({ data: { q: deps.q } }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const data = Route.useLoaderData();
  const { t } = useApp();
  const rows = data.spotlight ? [data.spotlight, ...data.services] : data.services;
  return (
    <Frame>
      <TitleBar title={q || t.results} back="/" />
      <div className="space-y-3 px-5 py-5">
        {!rows.length ? <p className="text-sm text-muted">{t.emptyList}</p> : rows.map((s) => <ListingRow key={s.id} item={s} />)}
      </div>
    </Frame>
  );
}
