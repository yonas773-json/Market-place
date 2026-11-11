import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as useApp, d as TitleBar, i as Frame, l as SpotlightCard, n as Chips, o as ListingRow } from "./shell-H-mekxI1.mjs";
import { a as Route$4 } from "./router-DaDerkP-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._slug-CeZwQYXS.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const data = Route$4.useLoaderData();
	const search = Route$4.useSearch();
	const { slug } = Route$4.useParams();
	const navigate = useNavigate();
	const { lang, t } = useApp();
	const name = data.category ? lang === "am" && data.category.nameAm ? data.category.nameAm : data.category.name : t.results;
	const set = (patch) => {
		navigate({
			to: "/c/$slug",
			params: { slug },
			search: {
				...search,
				...patch
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: name,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 pb-8 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chips, {
				categories: data.categories,
				active: slug,
				city: search.city
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					"popular",
					"price",
					"new"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => set({ sort: key }),
					className: search.sort === key ? "rounded-full bg-ink px-3 py-1.5 text-xs font-bold text-card" : "rounded-full bg-chip px-3 py-1.5 text-xs font-bold",
					children: key === "popular" ? t.popular : key === "price" ? t.priceLow : t.newest
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid grid-cols-2 gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					const fd = new FormData(e.currentTarget);
					set({
						city: String(fd.get("city") || ""),
						max: Number(fd.get("max") || 0),
						stars: Number(fd.get("stars") || 0)
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "city",
						defaultValue: search.city,
						className: "h-11 rounded-full bg-chip px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: t.anywhere
						}), data.cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						name: "stars",
						defaultValue: String(search.stars),
						className: "h-11 rounded-full bg-chip px-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "0",
								children: t.anyStars
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "3",
								children: "3+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "4",
								children: "4+"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "5",
								children: "5"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						name: "max",
						inputMode: "numeric",
						placeholder: t.maxPrice,
						defaultValue: search.max || "",
						className: "h-11 rounded-full bg-chip px-3 text-sm outline-none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "h-11 rounded-full bg-ink text-sm font-bold text-card",
						children: t.filter
					})
				]
			}),
			data.spotlight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, { item: data.spotlight }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingRow, { item: s }, s.id))
			}),
			!data.spotlight && data.services.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.emptyList
			}) : null
		]
	})] });
}
//#endregion
export { CategoryPage as component };
