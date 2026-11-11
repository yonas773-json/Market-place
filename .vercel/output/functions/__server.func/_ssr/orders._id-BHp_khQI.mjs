import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as getOrder, K as statusText, P as money, W as setOrderStatus, Z as useApp, d as TitleBar, i as Frame } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
import { r as Route$2 } from "./router-DaDerkP-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-BHp_khQI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrderPage() {
	const { id } = Route$2.useParams();
	const { t, lang } = useApp();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const load = () => getOrder({ data: { id: Number(id) } }).then(setData).catch((e) => setError(e instanceof Error ? e.message : t.failed));
	(0, import_react.useEffect)(() => {
		load();
	}, [id]);
	const order = data?.order;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: order ? `#${order.id}` : t.orders,
		back: "/orders"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 py-5",
		children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: error
		}) : null, order ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xl font-extrabold",
				children: order.businessName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.trackHint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-wrap gap-2",
				children: [
					"placed",
					"accepted",
					"preparing",
					"ontheway",
					"done"
				].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: step === order.status ? "rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-ink" : "rounded-full bg-chip px-3 py-1 text-xs font-semibold",
					children: statusText(t, step)
				}, step))
			}),
			order.status === "rejected" || order.status === "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold",
				children: statusText(t, order.status)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					order.address,
					", ",
					order.city
				]
			}),
			order.scheduledFor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					t.when,
					": ",
					order.scheduledFor
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					t.method,
					": ",
					order.paymentMethod,
					" · ",
					order.paymentStatus
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						item.title,
						" · ",
						item.tier,
						" × ",
						item.qty
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: money(item.unitPrice * item.qty, lang)
					})]
				}, item.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg font-extrabold tabular-nums",
				children: [
					t.total,
					" ",
					money(order.total, lang)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [data.role === "customer" && order.status === "placed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full bg-ink px-4 text-sm font-bold text-card",
					onClick: () => void setOrderStatus({ data: {
						id: order.id,
						status: "cancelled"
					} }).then(setData),
					children: t.cancel
				}) : null, data.role !== "customer" ? [
					"accepted",
					"preparing",
					"ontheway",
					"done",
					"rejected"
				].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-10 rounded-full bg-chip px-3 text-xs font-bold",
					onClick: () => void setOrderStatus({ data: {
						id: order.id,
						status
					} }).then(setData),
					children: statusText(t, status)
				}, status)) : null]
			})
		] }) : null]
	}) })] });
}
//#endregion
export { OrderPage as component };
