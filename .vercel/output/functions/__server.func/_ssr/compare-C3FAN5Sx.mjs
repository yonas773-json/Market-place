import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as label, P as money, Z as useApp, d as TitleBar, i as Frame, u as Stars, x as getCards } from "./shell-H-mekxI1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-C3FAN5Sx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ComparePage() {
	const { t, lang, compare, toggleCompare } = useApp();
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getCards({ data: { ids: compare } }).then(setRows);
	}, [compare]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.compareTitle,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 px-5 py-5",
		children: [!rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: t.noCompare
		}) : null, rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-sheet bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/s/$id",
					params: { id: String(s.id) },
					className: "font-extrabold",
					children: label(lang, s)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						s.businessName,
						" · ",
						s.city
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-lg font-extrabold tabular-nums",
					children: money(s.price, lang)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
					tenths: s.ratingTenths,
					count: s.reviewCount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 text-sm font-semibold text-primary",
					onClick: () => toggleCompare(s.id),
					children: t.remove
				})
			]
		}, s.id))]
	})] });
}
//#endregion
export { ComparePage as component };
