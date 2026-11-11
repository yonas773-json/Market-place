import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as money, Z as useApp, d as TitleBar, i as Frame, z as quoteOrder } from "./shell-H-mekxI1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-8nWnnthA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { t, lang, lines, setQty, remove } = useApp();
	const [quote, setQuote] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!lines.length) {
			setQuote(null);
			return;
		}
		let live = true;
		quoteOrder({ data: { items: lines } }).then((q) => {
			if (live) {
				setQuote(q);
				setError("");
			}
		}).catch((e) => {
			if (live) setError(e instanceof Error ? e.message : t.failed);
		});
		return () => {
			live = false;
		};
	}, [lines, t.failed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.cart,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 px-5 py-5",
		children: [
			!lines.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.emptyCart
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: error
			}) : null,
			quote?.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex gap-3 rounded-sheet bg-card p-3",
				children: [line.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: line.image,
					alt: "",
					className: "size-16 rounded-2xl object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-bold",
							children: line.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								line.tier,
								" · ",
								line.businessName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-bold tabular-nums",
							children: money(line.lineTotal, lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-8 place-items-center rounded-full bg-chip",
									onClick: () => setQty(line.serviceId, line.tier, Math.max(1, line.qty - 1)),
									children: "−"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold",
									children: line.qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-8 place-items-center rounded-full bg-chip",
									onClick: () => setQty(line.serviceId, line.tier, Math.min(20, line.qty + 1)),
									children: "+"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ml-auto text-xs font-semibold text-muted",
									onClick: () => remove(line.serviceId, line.tier),
									children: t.remove
								})
							]
						})
					]
				})]
			}, `${line.serviceId}-${line.tier}`)),
			quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold",
					children: t.total
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-extrabold tabular-nums",
					children: money(quote.subtotal, lang)
				})]
			}) : null,
			lines.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/checkout",
				className: "flex h-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-ink",
				children: t.checkout
			}) : null
		]
	})] });
}
//#endregion
export { CartPage as component };
