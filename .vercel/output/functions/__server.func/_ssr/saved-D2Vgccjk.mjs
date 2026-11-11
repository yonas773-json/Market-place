import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as myFavorites, Z as useApp, d as TitleBar, i as Frame, o as ListingRow } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-D2Vgccjk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavedPage() {
	const { t } = useApp();
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		myFavorites().then(setData).catch(() => void 0);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.saved,
		back: "/me"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold",
					children: t.favItems
				}),
				data?.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingRow, { item: s }, s.id)),
				!data?.services.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t.noSaved
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-extrabold",
				children: t.favShops
			}), data?.shops.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-sheet bg-card px-4 py-3 font-bold",
				children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 block text-xs font-medium text-muted",
					children: [
						s.area,
						", ",
						s.city
					]
				})]
			}, s.id))]
		})]
	}) })] });
}
//#endregion
export { SavedPage as component };
