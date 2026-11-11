import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as signOut } from "./client-1vAx-gM_.mjs";
import { $ as useCurrentUserState, E as inputClass, N as markNotificationsRead, Q as useCurrentUser, S as getMe, Y as updateProfile, Z as useApp, d as TitleBar, i as Frame, r as Field, y as btnClass } from "./shell-H-mekxI1.mjs";
import { a as hasGateSessionMarker } from "./server-BuIQ5W81.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-CbD8U4_a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
function MePage() {
	const { t, lang, setLang, theme, setTheme } = useApp();
	const { user } = useCurrentUserState();
	const [me, setMe] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Addis Ababa");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!user) return;
		getMe({ data: { intent: "customer" } }).then((row) => {
			setMe(row);
			setName(row.profile.displayName);
			setPhone(row.profile.phone);
			setCity(row.profile.city);
			if (row.profile.language === "am" || row.profile.language === "en") setLang(row.profile.language);
		});
	}, [user, setLang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.profile,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 py-5",
		children: [
			me?.profile.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-sheet bg-lilac p-3 text-sm",
				children: t.firstAdmin
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.securityNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					updateProfile({ data: {
						displayName: name,
						phone,
						city,
						language: lang
					} }).then((row) => {
						setMe(row);
						setNote(t.savedOk);
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.name,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: name,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.phone,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.city,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: city,
							onChange: (e) => setCity(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnClass,
						children: t.save
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: note
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-muted",
				children: t.language
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: lang === "en" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold",
					onClick: () => setLang("en"),
					children: t.english
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: lang === "am" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold",
					onClick: () => setLang("am"),
					children: t.amharic
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-muted",
				children: t.appearance
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: theme === "light" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold",
					onClick: () => setTheme("light"),
					children: t.light
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: theme === "dark" ? "h-11 rounded-full bg-ink text-sm font-bold text-card" : "h-11 rounded-full bg-chip text-sm font-bold",
					onClick: () => setTheme("dark"),
					children: t.dark
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						className: "rounded-sheet bg-card px-4 py-3 font-bold",
						children: t.orders
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/saved",
						className: "rounded-sheet bg-card px-4 py-3 font-bold",
						children: t.saved
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/inbox",
						className: "rounded-sheet bg-card px-4 py-3 font-bold",
						children: t.messages
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "rounded-sheet bg-mint px-4 py-3 font-bold",
						children: me?.business ? t.myShop : t.openShop
					}),
					me?.profile.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "rounded-sheet bg-lilac px-4 py-3 font-bold",
						children: t.adminDesk
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold",
					children: t.notifications
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-semibold text-primary",
					onClick: () => void markNotificationsRead().then(() => setMe((m) => m ? {
						...m,
						unread: 0,
						notifications: m.notifications.map((n) => ({
							...n,
							read: true
						}))
					} : m)),
					children: t.markRead
				})]
			}), !me?.notifications.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.noneYet
			}) : me.notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "border-b border-line py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: n.title
					}),
					" — ",
					n.body
				]
			}, n.id))] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
		]
	}) })] });
}
//#endregion
export { MePage as component };
