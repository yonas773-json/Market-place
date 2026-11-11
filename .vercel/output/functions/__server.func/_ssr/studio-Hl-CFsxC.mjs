import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as inputClass, G as setServiceActive, K as statusText, P as money, V as requestPlan, X as upsertService, Z as useApp, b as createBusiness, d as TitleBar, i as Frame, q as studioHome, r as Field, y as btnClass } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
import { i as ResponsiveContainer, n as XAxis, r as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-Hl-CFsxC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	"/media/quick.jpg",
	"/media/supplies.jpg",
	"/media/bath.jpg",
	"/media/floor.jpg",
	"/media/sofa.jpg",
	"/media/kitchen.jpg",
	"/media/marcus.jpg",
	"/media/food.jpg",
	"/media/fashion.jpg"
];
function StudioPage() {
	const { t, lang } = useApp();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("overview");
	const load = () => studioHome().then(setData).catch((e) => setError(e instanceof Error ? e.message : t.failed));
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.myShop,
		back: "/me"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 py-5",
		children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: error
		}) : null, !data?.business ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenShop, { onDone: setData }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					data.business.verified ? t.verified : t.pending,
					" · ",
					data.business.city
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: [
					"overview",
					"listings",
					"orders"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(key),
					className: tab === key ? "h-10 rounded-full bg-ink px-3 text-xs font-bold text-card" : "h-10 rounded-full bg-chip px-3 text-xs font-bold",
					children: key === "overview" ? t.overview : key === "listings" ? t.listings : t.orders
				}, key))
			}),
			tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t.sales,
							value: money(data.stats.sales, lang)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t.orders,
							value: String(data.stats.orders)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t.products,
							value: String(data.stats.products)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t.customers,
							value: String(data.stats.customers)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-36 rounded-sheet bg-card p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: data.chart,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tick: { fontSize: 10 }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "total",
								fill: "var(--color-primary)",
								radius: 8
							})]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: t.planNote
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						"free",
						"growth",
						"featured"
					].map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: data.business?.plan === plan ? "h-11 rounded-full bg-primary text-xs font-bold text-primary-ink" : "h-11 rounded-full bg-chip text-xs font-bold",
						onClick: () => void requestPlan({ data: { plan } }).then(() => load()),
						children: plan === "free" ? t.free : plan === "growth" ? t.growth : t.featured
					}, plan))
				})
			] }) : null,
			tab === "listings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingEditor, {
				services: data.services,
				category: data.business.categorySlug,
				onDone: () => void load()
			}) : null,
			tab === "orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: !data.orders.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t.noOrders
				}) : data.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `/orders/${o.id}`,
					className: "block rounded-sheet bg-card p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: o.businessName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block text-muted",
						children: [
							o.summary,
							" · ",
							statusText(t, o.status),
							" · ",
							money(o.total, lang)
						]
					})]
				}, o.id))
			}) : null
		] })]
	}) })] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sheet bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg font-extrabold tabular-nums",
			children: value
		})]
	});
}
function OpenShop({ onDone }) {
	const { t } = useApp();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		categorySlug: "cleaning",
		city: "Addis Ababa",
		area: "",
		phone: "",
		hours: "8:00–18:00",
		about: ""
	});
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3",
		onSubmit: (e) => {
			e.preventDefault();
			createBusiness({ data: form }).then(onDone).catch((err) => setError(err instanceof Error ? err.message : t.failed));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t.shopLive
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.shopName,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: form.name,
					onChange: (e) => setForm({
						...form,
						name: e.target.value
					}),
					required: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.catalog,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: inputClass,
					value: form.categorySlug,
					onChange: (e) => setForm({
						...form,
						categorySlug: e.target.value
					}),
					children: [
						"cleaning",
						"it",
						"plumbing",
						"food",
						"fashion",
						"electronics",
						"beauty",
						"grocery",
						"home",
						"auto",
						"hardware",
						"learning",
						"pros",
						"wellness"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.city,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: form.city,
					onChange: (e) => setForm({
						...form,
						city: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.area,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: form.area,
					onChange: (e) => setForm({
						...form,
						area: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.phone,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: form.phone,
					onChange: (e) => setForm({
						...form,
						phone: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.hours,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: form.hours,
					onChange: (e) => setForm({
						...form,
						hours: e.target.value
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t.about,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: inputClass,
					value: form.about,
					onChange: (e) => setForm({
						...form,
						about: e.target.value
					})
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: btnClass,
				children: t.createShop
			})
		]
	});
}
function ListingEditor({ services, category, onDone }) {
	const { t } = useApp();
	const blank = {
		id: 0,
		title: "",
		blurb: "",
		description: "",
		price: 500,
		compareAt: 0,
		pricePremium: 0,
		pricePlatinum: 0,
		badge: "",
		kind: "service",
		stock: 0,
		image: PRESETS[0],
		tint: "mint",
		categorySlug: category
	};
	const [form, setForm] = (0, import_react.useState)(blank);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-2",
			onSubmit: (e) => {
				e.preventDefault();
				upsertService({ data: form }).then(() => {
					setForm({
						...blank,
						categorySlug: category
					});
					onDone();
				}).catch((err) => setError(err instanceof Error ? err.message : t.failed));
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.title,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.blurb,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: form.blurb,
						onChange: (e) => setForm({
							...form,
							blurb: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.details,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.price,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							className: inputClass,
							value: form.price,
							onChange: (e) => setForm({
								...form,
								price: Number(e.target.value)
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.was,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							className: inputClass,
							value: form.compareAt,
							onChange: (e) => setForm({
								...form,
								compareAt: Number(e.target.value)
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: form.kind === "service" ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold",
						onClick: () => setForm({
							...form,
							kind: "service"
						}),
						children: t.kindService
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: form.kind === "product" ? "h-10 rounded-full bg-ink text-xs font-bold text-card" : "h-10 rounded-full bg-chip text-xs font-bold",
						onClick: () => setForm({
							...form,
							kind: "product"
						}),
						children: t.kindProduct
					})]
				}),
				form.kind === "product" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t.stockCount,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "numeric",
						className: inputClass,
						value: form.stock,
						onChange: (e) => setForm({
							...form,
							stock: Number(e.target.value)
						})
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: PRESETS.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setForm({
							...form,
							image: src
						}),
						className: form.image === src ? "rounded-2xl ring-2 ring-primary" : "rounded-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "size-14 rounded-2xl object-cover"
						})
					}, src))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					onChange: (e) => {
						const file = e.target.files?.[0];
						if (!file) return;
						shrink(file).then((image) => setForm((f) => ({
							...f,
							image
						}))).catch(() => setError(t.failed));
					}
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: btnClass,
					children: form.id ? t.update : t.addListing
				})
			]
		}), services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between rounded-sheet bg-card p-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-left font-bold",
				onClick: () => setForm({
					id: s.id,
					title: s.title,
					blurb: s.blurb,
					description: s.description,
					price: s.price,
					compareAt: s.compareAt ?? 0,
					pricePremium: s.pricePremium ?? 0,
					pricePlatinum: s.pricePlatinum ?? 0,
					badge: s.badge,
					kind: s.kind,
					stock: s.stock ?? 0,
					image: s.image || PRESETS[0],
					tint: s.tint,
					categorySlug: s.categorySlug
				}),
				children: s.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-xs font-semibold text-primary",
				onClick: () => void setServiceActive({ data: {
					id: s.id,
					active: false
				} }).then(onDone),
				children: t.unpublish
			})]
		}, s.id))]
	});
}
async function shrink(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("canvas");
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL("image/jpeg", .72);
}
//#endregion
export { StudioPage as component };
