import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Star,
  UserRound,
} from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, label, line, money, type Copy, type Lang } from "@/lib/i18n";
import type { Category, ServiceCard, ShopCard } from "@/lib/marketplace.server";
import { getMe } from "@/lib/marketplace.functions";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type Tier = "classic" | "premium" | "platinum";
export type CartLine = { serviceId: number; tier: Tier; qty: number };

type Prefs = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  t: Copy;
  lines: CartLine[];
  add: (line: CartLine) => void;
  setQty: (serviceId: number, tier: Tier, qty: number) => void;
  remove: (serviceId: number, tier: Tier) => void;
  clear: () => void;
  count: number;
  compare: number[];
  toggleCompare: (id: number) => void;
  flash: string;
  ping: (text: string) => void;
};

const Ctx = createContext<Prefs | null>(null);
export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("missing app");
  return v;
}

function validLine(x: unknown): x is CartLine {
  if (!x || typeof x !== "object") return false;
  const r = x as CartLine;
  return Number.isInteger(r.serviceId) && (r.tier === "classic" || r.tier === "premium" || r.tier === "platinum") && Number.isInteger(r.qty);
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const [flash, setFlash] = useState("");
  const { user } = useCurrentUserState();

  useEffect(() => {
    try {
      if (localStorage.getItem("jc-theme") === "dark") setTheme("dark");
      if (localStorage.getItem("jc-lang") === "am") setLang("am");
      const cart = JSON.parse(localStorage.getItem("jc-cart") || "[]") as unknown;
      if (Array.isArray(cart)) setLines(cart.filter(validLine));
      const cmp = JSON.parse(localStorage.getItem("jc-compare") || "[]") as unknown;
      if (Array.isArray(cmp)) setCompare(cmp.map(Number).filter((id) => Number.isInteger(id) && id > 0).slice(0, 3));
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("jc-theme", theme);
    localStorage.setItem("jc-lang", lang);
    localStorage.setItem("jc-cart", JSON.stringify(lines));
    localStorage.setItem("jc-compare", JSON.stringify(compare));
  }, [theme, lang, lines, compare, ready]);

  useEffect(() => {
    if (!user?.id || user.isDevFallback) return;
    const intent = localStorage.getItem("jc-intent") === "business" ? "business" : "customer";
    void getMe({ data: { intent } })
      .then(() => localStorage.removeItem("jc-intent"))
      .catch(() => undefined);
  }, [user?.id, user?.isDevFallback]);

  const value = useMemo<Prefs>(() => {
    const add = (item: CartLine) => {
      setLines((cur) => {
        const i = cur.findIndex((l) => l.serviceId === item.serviceId && l.tier === item.tier);
        if (i === -1) return [...cur, item];
        const next = cur.slice();
        next[i] = { ...next[i], qty: Math.min(20, next[i].qty + item.qty) };
        return next;
      });
    };
    return {
      lang,
      setLang,
      theme,
      setTheme,
      t: copy[lang],
      lines,
      add,
      setQty: (serviceId, tier, qty) => setLines((cur) => cur.map((l) => (l.serviceId === serviceId && l.tier === tier ? { ...l, qty } : l))),
      remove: (serviceId, tier) => setLines((cur) => cur.filter((l) => !(l.serviceId === serviceId && l.tier === tier))),
      clear: () => setLines([]),
      count: lines.reduce((s, l) => s + l.qty, 0),
      compare,
      toggleCompare: (id) =>
        setCompare((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= 3 ? cur : [...cur, id])),
      flash,
      ping: (text) => {
        setFlash(text);
        window.setTimeout(() => setFlash(""), 1600);
      },
    };
  }, [lang, theme, lines, compare, flash]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const tintBg: Record<string, string> = {
  mint: "bg-mint",
  blush: "bg-blush",
  peach: "bg-peach",
  lilac: "bg-lilac",
  sky: "bg-sky",
  butter: "bg-butter",
};

const chipOn = "inline-flex h-10 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-semibold text-card";
const chipOff = "inline-flex h-10 shrink-0 items-center rounded-full bg-chip px-4 text-sm font-semibold text-ink";

export function Chips({ categories, active, city }: { categories: Category[]; active: string; city: string }) {
  const { lang, t } = useApp();
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      <Link to="/" search={{ city }} className={active === "all" ? chipOn : chipOff}>{t.all}</Link>
      {categories.map((c) => (
        <Link key={c.slug} to="/c/$slug" params={{ slug: c.slug }} search={{ q: "", city, max: 0, stars: 0, sort: "popular" }} className={active === c.slug ? chipOn : chipOff}>
          {lang === "am" && c.nameAm ? c.nameAm : c.name}
        </Link>
      ))}
    </div>
  );
}

export function CartButton() {
  const { count } = useApp();
  return (
    <Link to="/cart" aria-label="Cart" className="relative grid size-11 place-items-center rounded-full bg-card text-ink shadow-sm">
      <ShoppingCart className="size-5" />
      {count > 0 ? <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary text-xs font-bold text-primary-ink">{count}</span> : null}
    </Link>
  );
}

export function TitleBar({ title, back }: { title: string; back: string }) {
  return (
    <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-5 pt-5">
      <a href={back} aria-label="Back" className="grid size-11 place-items-center rounded-full bg-chip text-ink">
        <ChevronLeft className="size-5" />
      </a>
      <h1 className="text-center text-base font-bold">{title}</h1>
      <CartButton />
    </div>
  );
}

export function Stars({ tenths, count }: { tenths: number; count: number }) {
  const { t } = useApp();
  if (!count) return <span className="text-xs font-semibold text-muted">{t.newLabel}</span>;
  const full = Math.round(tenths / 10);
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={i < full ? "size-3.5 fill-primary text-primary" : "size-3.5 text-line"} />
      ))}
      <span className="text-muted">{(tenths / 10).toFixed(1)}</span>
    </span>
  );
}

export function HeroCard({ item }: { item: ServiceCard }) {
  const { lang, t } = useApp();
  return (
    <Link to="/s/$id" params={{ id: String(item.id) }} className={`relative block min-h-80 overflow-hidden rounded-sheet p-4 ${tintBg[item.tint] || "bg-mint"}`}>
      {item.image ? <img src={item.image} alt="" className="pointer-events-none absolute bottom-0 right-0 h-72 w-44 object-cover object-top" /> : null}
      <div className="relative flex items-center gap-2">
        {item.support ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink">
            <Clock className="size-3.5" /> {item.support}
          </span>
        ) : <span />}
        {item.badge ? <span className="ml-auto rounded-full bg-card px-3 py-1 text-sm font-bold text-ink">{item.badge}</span> : null}
      </div>
      <p className="relative mt-6 flex items-center gap-1.5 text-sm font-medium text-ink">
        <Sprout className="size-4" /> {item.perk || line(lang, item)}
      </p>
      <h2 className="relative mt-1 max-w-40 text-3xl font-extrabold leading-none tracking-tight text-ink">{label(lang, item)}</h2>
      <span className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-card">
        <ShoppingCart className="size-4" /> {t.bookNow}
      </span>
    </Link>
  );
}

export function SpotlightCard({ item }: { item: ServiceCard }) {
  const { lang, t } = useApp();
  return (
    <Link to="/s/$id" params={{ id: String(item.id) }} className={`block overflow-hidden rounded-sheet p-4 ${tintBg[item.tint] || "bg-mint"}`}>
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-base font-bold text-ink">
            <span className="grid size-8 place-items-center rounded-full bg-card"><Sprout className="size-4" /></span>
            {label(lang, item)}
          </p>
          <p className="mt-3 max-w-40 text-sm text-ink">{line(lang, item)}</p>
          <span className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-card">{t.bookNow}</span>
        </div>
        {item.image ? <img src={item.image} alt="" className="h-36 w-28 shrink-0 rounded-2xl object-cover object-top" /> : null}
      </div>
    </Link>
  );
}

export function ListingRow({ item }: { item: ServiceCard }) {
  const { lang } = useApp();
  return (
    <Link to="/s/$id" params={{ id: String(item.id) }} className={`flex items-center gap-3 rounded-sheet p-3 ${tintBg[item.tint] || "bg-chip"}`}>
      {item.image ? <img src={item.image} alt="" className="size-16 shrink-0 rounded-2xl object-cover" /> : <span className="size-16 shrink-0 rounded-2xl bg-card" />}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-ink">{label(lang, item)}</span>
        <span className="mt-0.5 block text-sm text-ink/80">{line(lang, item)}</span>
      </span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-card text-ink"><ChevronRight className="size-4" /></span>
    </Link>
  );
}

export function ShopPill({ shop }: { shop: ShopCard }) {
  const { t } = useApp();
  return (
    <Link to="/c/$slug" params={{ slug: "all" }} search={{ q: shop.name, city: "", max: 0, stars: 0, sort: "popular" }} className="flex w-40 shrink-0 flex-col gap-2 rounded-sheet bg-card p-3 shadow-sm">
      {shop.logo ? <img src={shop.logo} alt="" className="h-20 w-full rounded-2xl object-cover" /> : <span className="h-20 rounded-2xl bg-chip" />}
      <span className="truncate text-sm font-bold">{shop.name}</span>
      <span className="flex items-center gap-1 text-xs text-muted">
        <MapPin className="size-3" /> {shop.area || shop.city}
        {shop.verified ? <ShieldCheck className="size-3 text-primary" aria-label={t.verified} /> : null}
      </span>
    </Link>
  );
}

function TabBar() {
  const { t } = useApp();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/", icon: Home, label: t.home, on: path === "/" },
    { to: "/orders", icon: CalendarDays, label: t.bookings, on: path.startsWith("/orders") },
    { to: "/inbox", icon: MessagesSquare, label: t.chat, on: path.startsWith("/inbox") },
    { to: "/me", icon: UserRound, label: t.you, on: path.startsWith("/me") },
  ] as const;
  return (
    <nav className="mx-4 mb-4 flex items-center justify-between rounded-full border border-line bg-card px-2 py-2 shadow-lg">
      {tabs.map((tab) => (
        <Link key={tab.to} to={tab.to} aria-label={tab.label} className={tab.on ? "grid size-12 place-items-center rounded-full bg-primary text-primary-ink" : "grid size-12 place-items-center text-muted"}>
          <tab.icon className="size-5" />
        </Link>
      ))}
    </nav>
  );
}

export function Frame({ children, dock }: { children: ReactNode; dock?: ReactNode }) {
  const { t, compare, flash } = useApp();
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto grid min-h-dvh w-full max-w-6xl md:grid-cols-[28rem_minmax(0,1fr)]">
        <div className="flex min-h-dvh min-w-0 flex-col md:border-r md:border-line">
          <div className="flex-1">{children}</div>
          {flash ? <p className="mx-5 mb-2 rounded-full bg-ink px-4 py-2 text-center text-sm font-semibold text-card">{flash}</p> : null}
          {compare.length > 0 ? (
            <Link to="/compare" className="mx-4 mb-2 flex items-center justify-between rounded-full bg-ink px-4 py-3 text-sm font-semibold text-card">
              <span>{t.compare} ({compare.length})</span>
              <ChevronRight className="size-4" />
            </Link>
          ) : null}
          <div className="sticky bottom-0 z-20">{dock ?? <TabBar />}</div>
        </div>
        <aside className="hidden px-8 py-10 md:block">
          <p className="text-sm font-bold tracking-wide text-primary">{t.platform}</p>
          <h2 className="mt-3 max-w-sm text-4xl font-extrabold leading-none tracking-tight">{t.headlineA} {t.headlineB}</h2>
          <p className="mt-4 max-w-sm text-muted">{t.how1}</p>
          <ol className="mt-8 space-y-4">
            {[t.how1, t.how2, t.how3].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink">{i + 1}</span>
                <span className="pt-1 text-sm">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted">{t.payNote}</p>
        </aside>
      </div>
    </div>
  );
}

export function statusText(t: Copy, status: string) {
  const map: Record<string, string> = {
    placed: t.placed,
    accepted: t.accepted,
    rejected: t.rejected,
    preparing: t.preparing,
    ontheway: t.ontheway,
    done: t.done,
    cancelled: t.cancelled,
  };
  return map[status] ?? status;
}

export function Field({ label: name, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted">{name}</span>
      {children}
    </label>
  );
}

export const inputClass = "h-12 w-full rounded-full bg-chip px-4 text-sm text-ink outline-none ring-primary focus:ring-2";
export const btnClass = "h-12 w-full rounded-full bg-primary text-sm font-bold text-primary-ink disabled:opacity-60";
export const ghostClass = "h-12 w-full rounded-full bg-ink text-sm font-bold text-card";

export function moneyOf(amount: number) {
  return money(amount, useApp().lang);
}
