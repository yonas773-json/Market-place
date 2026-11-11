import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { $ as useCurrentUserState, E as inputClass, T as ghostClass, Z as useApp, r as Field, y as btnClass } from "./shell-H-mekxI1.mjs";
import { t as GROK_PROVIDERS } from "./server-BuIQ5W81.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-panel-BrGvnUai.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPanel({ callback = "/" }) {
	const { t } = useApp();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [intent, setIntent] = (0, import_react.useState)("customer");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			if (password.length < 8) throw new Error(t.passwordHint);
			if (mode === "up") {
				localStorage.setItem("jc-intent", intent);
				const res = await authClient.signUp.email({
					email,
					password,
					name: name || "Member",
					callbackURL: callback
				});
				if (res.error) throw new Error(res.error.message || t.authFail);
			} else {
				const res = await authClient.signIn.email({
					email,
					password,
					callbackURL: callback
				});
				if (res.error) throw new Error(res.error.message || t.authFail);
			}
			window.location.href = callback;
		} catch (err) {
			setError(err instanceof Error ? err.message : t.authFail);
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-extrabold tracking-tight",
				children: mode === "up" ? t.createAccount : t.signIn
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.roleHint
			}),
			GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: ghostClass,
				onClick: () => void signIn(p.providerId, { callbackURL: callback }),
				children: p.providerId.includes("google") ? t.continueGoogle : t.continueX
			}, p.providerId)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "space-y-3 pt-2",
				children: [
					mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.name,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: intent === "customer" ? chipSel : chipIdle,
							onClick: () => setIntent("customer"),
							children: t.roleShop
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: intent === "business" ? chipSel : chipIdle,
							onClick: () => setIntent("business"),
							children: t.roleSell
						})]
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							autoComplete: "email",
							className: inputClass,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.password,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							autoComplete: mode === "up" ? "new-password" : "current-password",
							className: inputClass,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							required: true
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnClass,
						disabled: busy,
						children: busy ? t.processing : mode === "up" ? t.createAccount : t.signIn
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-sm font-semibold text-primary",
				onClick: () => setMode(mode === "up" ? "in" : "up"),
				children: mode === "up" ? t.haveAccount : t.needAccount
			})
		]
	});
}
var chipSel = "h-11 rounded-full bg-ink text-xs font-bold text-card";
var chipIdle = "h-11 rounded-full bg-chip text-xs font-bold text-ink";
function AuthWall({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-5 py-8",
		children: isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-sheet bg-chip" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPanel, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { LoginPanel as n, AuthWall as t };
