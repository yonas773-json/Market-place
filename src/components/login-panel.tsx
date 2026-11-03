import { useState, type FormEvent, type ReactNode } from "react";
import { authClient, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { btnClass, Field, ghostClass, inputClass, useApp } from "@/components/shell";

export function LoginPanel({ callback = "/" }: { callback?: string }) {
  const { t } = useApp();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [intent, setIntent] = useState<"customer" | "business">("customer");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (password.length < 8) throw new Error(t.passwordHint);
      if (mode === "up") {
        localStorage.setItem("jc-intent", intent);
        const res = await authClient.signUp.email({ email, password, name: name || "Member", callbackURL: callback });
        if (res.error) throw new Error(res.error.message || t.authFail);
      } else {
        const res = await authClient.signIn.email({ email, password, callbackURL: callback });
        if (res.error) throw new Error(res.error.message || t.authFail);
      }
      window.location.href = callback;
    } catch (err) {
      setError(err instanceof Error ? err.message : t.authFail);
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-extrabold tracking-tight">{mode === "up" ? t.createAccount : t.signIn}</h1>
      <p className="text-sm text-muted">{t.roleHint}</p>
      {GROK_PROVIDERS.map((p) => (
        <button key={p.providerId} type="button" className={ghostClass} onClick={() => void signIn(p.providerId, { callbackURL: callback })}>
          {p.providerId.includes("google") ? t.continueGoogle : t.continueX}
        </button>
      ))}
      <form onSubmit={onSubmit} className="space-y-3 pt-2">
        {mode === "up" ? (
          <>
            <Field label={t.name}><input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required /></Field>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={intent === "customer" ? chipSel : chipIdle} onClick={() => setIntent("customer")}>{t.roleShop}</button>
              <button type="button" className={intent === "business" ? chipSel : chipIdle} onClick={() => setIntent("business")}>{t.roleSell}</button>
            </div>
          </>
        ) : null}
        <Field label={t.email}><input type="email" autoComplete="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
        <Field label={t.password}><input type="password" autoComplete={mode === "up" ? "new-password" : "current-password"} className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
        {error ? <p className="text-sm font-medium text-ink">{error}</p> : null}
        <button className={btnClass} disabled={busy}>{busy ? t.processing : mode === "up" ? t.createAccount : t.signIn}</button>
      </form>
      <button type="button" className="text-sm font-semibold text-primary" onClick={() => setMode(mode === "up" ? "in" : "up")}>
        {mode === "up" ? t.haveAccount : t.needAccount}
      </button>
    </div>
  );
}

const chipSel = "h-11 rounded-full bg-ink text-xs font-bold text-card";
const chipIdle = "h-11 rounded-full bg-chip text-xs font-bold text-ink";

export function AuthWall({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending || !user) {
    return (
      <div className="px-5 py-8">
        {isPending ? <div className="h-28 animate-pulse rounded-sheet bg-chip" /> : <LoginPanel />}
      </div>
    );
  }
  return <>{children}</>;
}
