import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { myFavorites } from "@/lib/marketplace.functions";
import { AuthWall } from "@/components/login-panel";
import { Frame, ListingRow, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/saved")({ component: SavedPage });

function SavedPage() {
  const { t } = useApp();
  const [data, setData] = useState<Awaited<ReturnType<typeof myFavorites>> | null>(null);
  useEffect(() => { void myFavorites().then(setData).catch(() => undefined); }, []);
  return (
    <Frame>
      <TitleBar title={t.saved} back="/me" />
      <AuthWall>
        <div className="space-y-4 px-5 py-5">
          <section className="space-y-3">
            <h2 className="font-extrabold">{t.favItems}</h2>
            {data?.services.map((s) => <ListingRow key={s.id} item={s} />)}
            {!data?.services.length ? <p className="text-sm text-muted">{t.noSaved}</p> : null}
          </section>
          <section className="space-y-2">
            <h2 className="font-extrabold">{t.favShops}</h2>
            {data?.shops.map((s) => <p key={s.id} className="rounded-sheet bg-card px-4 py-3 font-bold">{s.name}<span className="mt-1 block text-xs font-medium text-muted">{s.area}, {s.city}</span></p>)}
          </section>
        </div>
      </AuthWall>
    </Frame>
  );
}
