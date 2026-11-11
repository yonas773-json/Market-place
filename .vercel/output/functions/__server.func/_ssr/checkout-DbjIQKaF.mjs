import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as inputClass, P as money, R as placeOrder, Z as useApp, d as TitleBar, i as Frame, r as Field, y as btnClass, z as quoteOrder } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DbjIQKaF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { t, lang, lines, clear } = useApp();
	const [quote, setQuote] = (0, import_react.useState)(null);
	const [method, setMethod] = (0, import_react.useState)("telebirr");
	const [address, setAddress] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Addis Ababa");
	const [when, setWhen] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ids, setIds] = (0, import_react.useState)([]);
	const needsDate = quote?.lines.some((l) => l.kind === "service");
	(0, import_react.useEffect)(() => {
		if (!lines.length) return;
		quoteOrder({ data: { items: lines } }).then(setQuote).catch((e) => setError(e instanceof Error ? e.message : t.failed));
	}, [lines, t.failed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.checkout,
		back: "/cart"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: "space-y-3 px-5 py-5",
		onSubmit: (e) => {
			e.preventDefault();
			setBusy(true);
			setError("");
			placeOrder({ data: {
				items: lines,
				address,
				city,
				scheduledFor: when,
				note,
				paymentMethod: method
			} }).then((res) => {
				setIds(res.orderIds);
				clear();
			}).catch((err) => setError(err instanceof Error ? err.message : t.failed)).finally(() => setBusy(false));
		},
		children: ids.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-sheet bg-mint p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-extrabold",
					children: t.orderPlaced
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: ids.map((id) => `#${id}`).join(", ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: t.payConfirm
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders",
					className: "mt-3 inline-flex font-bold text-primary",
					children: t.orders
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.payNote
			}),
			quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg font-extrabold tabular-nums",
				children: [
					t.total,
					" ",
					money(quote.subtotal, lang)
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.address,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: address,
					onChange: (e) => setAddress(e.target.value),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.city,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: city,
					onChange: (e) => setCity(e.target.value),
					required: true
				})
			}),
			needsDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.visitDate,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					className: inputClass,
					value: when,
					onChange: (e) => setWhen(e.target.value),
					required: true
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.note,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: note,
					onChange: (e) => setNote(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-muted",
				children: t.payWith
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					"telebirr",
					"cbe",
					"cash"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMethod(key),
					className: method === key ? "h-11 rounded-full bg-ink text-xs font-bold text-card" : "h-11 rounded-full bg-chip text-xs font-bold",
					children: key === "telebirr" ? t.telebirr : key === "cbe" ? t.cbe : t.cash
				}, key))
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: btnClass,
				disabled: busy || !lines.length,
				children: busy ? t.processing : t.placeOrder
			})
		] })
	}) })] });
}
//#endregion
export { CheckoutPage as component };
