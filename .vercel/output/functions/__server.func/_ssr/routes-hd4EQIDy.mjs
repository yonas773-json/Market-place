import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin, s as Search } from "../_libs/lucide-react.mjs";
import { $ as useCurrentUserState, Z as useApp, a as HeroCard, c as ShopPill, i as Frame, n as Chips, o as ListingRow, t as CartButton } from "./shell-H-mekxI1.mjs";
import { s as Route$16 } from "./router-DaDerkP-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-hd4EQIDy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const data = Route$16.useLoaderData();
	const { city } = Route$16.useSearch();
	const navigate = useNavigate();
	const { t } = useApp();
	const { user, isPending } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const name = isPending ? "" : user?.displayName || t.signIn;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: user ? "/me" : "/login",
					className: "flex min-w-0 items-center gap-2 rounded-full bg-card py-1 pl-1 pr-4 shadow-sm",
					children: [user?.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: user.profileImageUrl,
						alt: "",
						className: "size-10 rounded-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink",
						children: (name || "J").charAt(0).toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: t.welcome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-bold",
							children: isPending ? "…" : name
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": t.city,
						onClick: () => setOpen((v) => !v),
						className: "grid size-11 place-items-center rounded-full bg-card text-ink shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartButton, {})]
				})]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-full bg-chip px-3 py-2 text-sm font-semibold",
					onClick: () => {
						setOpen(false);
						navigate({
							to: "/",
							search: { city: "" }
						});
					},
					children: t.anywhere
				}), data.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-full bg-chip px-3 py-2 text-sm font-semibold",
					onClick: () => {
						setOpen(false);
						navigate({
							to: "/",
							search: { city: c }
						});
					},
					children: c
				}, c))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold tracking-wide text-primary",
				children: t.platform
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-1 text-5xl font-extrabold leading-none tracking-tight",
				children: [
					t.headlineA,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					t.headlineB
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				action: "/search",
				className: "flex h-12 items-center gap-2 rounded-full bg-chip px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "q",
					placeholder: t.search,
					className: "w-full bg-transparent text-sm outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
				categories: data.categories,
				active: "all",
				city
			}),
			data.hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCard, { item: data.hero }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-extrabold",
					children: t.trending
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/c/$slug",
					params: { slug: "cleaning" },
					search: {
						q: "",
						city,
						max: 0,
						stars: 0,
						sort: "popular"
					},
					className: "text-sm font-semibold text-primary",
					children: t.seeAll
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.trending.filter((s) => !s.homeHero).slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingRow, { item: s }, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-extrabold",
				children: t.nearby
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5",
				children: data.nearby.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopPill, { shop: s }, s.id))
			})] })
		]
	}) });
}
//#endregion
export { Home as component };
