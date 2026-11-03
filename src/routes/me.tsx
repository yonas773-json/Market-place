import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMe, markNotificationsRead, updateProfile } from "@/lib/marketplace.functions";
import { AuthWall } from "@/components/login-panel";
import { btnClass, Field, Frame, inputClass, TitleBar, useApp } from "@/components/shell";

export const Route = createFileRoute("/me")({ component: MePage });

function MePage() {
  const { t, lang, setLang, theme, setTheme } = useApp();
  const { user } = useCurrentUserState();
  const [me, setMe] = useState<Awaited<ReturnType<typeof getMe>> | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Addis Ababa");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!user) return;
    void getMe({ data: { intent: "customer" } }).then((row) => {
      setMe(row);
      setName(row.profile.displayName);
      setPhone(row.profile.phone);
      setCity(row.profile.city);
      if (row.profile.language === "am" || row.profile.language === "en") setLang(row.profile.language);
    });
  }, [user, setLang]);

  return (
    <Frame>
      <TitleBar title={t.profile} back="/" />
      <AuthWall>
        <div className="space-y-4 px-5 py-5">
          {me?.profile.isAdmin ? <p className="rounded-sheet bg-lilac p-3 text-sm">{t.firstAdmin}</p> : null}
          <p className="text-sm text-muted">{t.securityNote}</p>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); void updateProfile({ data: { displayName: name, phone, city, language: lang } }).then((row) => { setMe(row); setNote(t.savedOk); }); }}>
            <Field label={t.name}><input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label={t.phone}><input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
            <Field label={t.city}><input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} /></Field>
            <button className={btnClass}>{t.save}</button>
            {note ? <p className="text-sm">{note}</p> : null}
          </form>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted">{t.language}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={lang === "en" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold"} onClick={() => setLang("en")}>{t.english}</button>
              <button type="button" className={lang === "am" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold"} onClick={() => setLang("am")}>{t.amharic}</button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted">{t.appearance}</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={theme === "light" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold"} onClick={() => setTheme("light")}>{t.light}</button>
              <button type="button" className={theme === "dark" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold"} onClick={() => setTheme("dark")}>{t.dark}</button>
            </div>
          </div>
          <div className="grid gap-2">
            <Link to="/orders" className="rounded-sheet bg-card px-4 py-3 font-bold">{t.orders}</Link>
            <Link to="/saved" className="rounded-sheet bg-card px-4 py-3 font-bold">{t.saved}</Link>
            <Link to="/inbox" className="rounded-sheet bg-card px-4 py-3 font-bold">{t.messages}</Link>
            <Link to="/studio" className="rounded-sheet bg-mint px-4 py-3 font-bold">{me?.business ? t.myShop : t.openShop}</Link>
            {me?.profile.isAdmin ? <Link to="/admin" className="rounded-sheet bg-lilac px-4 py-3 font-bold">{t.adminDesk}</Link> : null}
          </div>
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-extrabold">{t.notifications}</h2>
              <button type="button" className="text-xs font-semibold text-primary" onClick={() => void markNotificationsRead().then(() => setMe((m) => m ? { ...m, unread: 0, notifications: m.notifications.map((n) => ({ ...n, read: true })) } : m))}>{t.markRead}</button>
            </div>
            {!me?.notifications.length ? <p className="text-sm text-muted">{t.noneYet}</p> : me.notifications.map((n) => (
              <p key={n.id} className="border-b border-line py-2 text-sm"><span className="font-bold">{n.title}</span> — {n.body}</p>
            ))}
          </section>
          <UserButton />
        </div>
      </AuthWall>
    </Frame>
  );
}
