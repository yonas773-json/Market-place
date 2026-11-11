import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as useApp, d as TitleBar, i as Frame, o as ListingRow } from "./shell-H-mekxI1.mjs";
import { o as Route$6 } from "./router-DaDerkP-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BZx0mEkm.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q } = Route$6.useSearch();
	const data = Route$6.useLoaderData();
	const { t } = useApp();
	const rows = data.spotlight ? [data.spotlight, ...data.services] : data.services;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: q || t.results,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3 px-5 py-5",
		children: !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: t.emptyList
		}) : rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingRow, { item: s }, s.id))
	})] });
}
//#endregion
export { SearchPage as component };
