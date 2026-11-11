import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as myOrders, K as statusText, P as money, Z as useApp, d as TitleBar, i as Frame } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DOQT_EaB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const { t, lang } = useApp();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		myOrders().then(setRows).catch((e) => setError(e instanceof Error ? e.message : t.failed));
	}, [t.failed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.orders,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 px-5 py-5",
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: error
			}) : null,
			!rows.length && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.noOrders
			}) : null,
			rows.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/orders/$id",
				params: { id: String(o.id) },
				className: "block rounded-sheet bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: o.businessName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: o.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex justify-between text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: statusText(t, o.status) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: money(o.total, lang)
						})]
					})
				]
			}, o.id))
		]
	}) })] });
}
//#endregion
export { OrdersPage as component };
