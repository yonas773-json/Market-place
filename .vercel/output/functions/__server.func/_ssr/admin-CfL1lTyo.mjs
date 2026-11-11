import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as inputClass, P as money, Z as useApp, _ as adminSetBusiness, d as TitleBar, g as adminSaveSettings, h as adminOverview, i as Frame, m as adminCloseReport, p as adminAddCategory, r as Field, v as adminSetUser, y as btnClass } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
import { i as ResponsiveContainer, n as XAxis, r as Bar, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CfL1lTyo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const { t, lang } = useApp();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)({
		slug: "",
		name: "",
		nameAm: "",
		tint: "mint"
	});
	const [bps, setBps] = (0, import_react.useState)(800);
	const [fee, setFee] = (0, import_react.useState)(1499);
	const load = () => adminOverview().then((d) => {
		setData(d);
		setBps(d.settings.commissionBps);
		setFee(d.settings.featuredPriceEtb);
	}).catch((e) => setError(e instanceof Error ? e.message : t.failed));
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.adminDesk,
		back: "/me"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-5 py-5",
		children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: error
		}) : null, !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-sheet bg-chip" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.users,
						value: String(data.users)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.businesses,
						value: String(data.businesses)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.products,
						value: String(data.products)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.orders,
						value: String(data.orders)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.gmv,
						value: money(data.revenue, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.commission,
						value: money(data.commission, lang)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.pending,
						value: String(data.pending)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: t.openReports,
						value: String(data.openReports)
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold",
					children: t.businesses
				}), data.businessesList.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sheet bg-card p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: b.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: [
								b.city,
								" · ",
								b.plan,
								b.owned ? ` · ${t.owned}` : ` · ${t.sample}`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-chip px-3 py-1 text-xs font-bold",
								onClick: () => void adminSetBusiness({ data: {
									id: b.id,
									verified: !b.verified,
									suspended: b.suspended
								} }).then(load),
								children: b.verified ? t.verified : t.approve
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-chip px-3 py-1 text-xs font-bold",
								onClick: () => void adminSetBusiness({ data: {
									id: b.id,
									verified: b.verified,
									suspended: !b.suspended
								} }).then(load),
								children: b.suspended ? t.restore : t.suspend
							})]
						})
					]
				}, b.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold",
					children: t.people
				}), data.people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sheet bg-card p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: p.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-chip px-3 py-1 text-xs font-bold",
								onClick: () => void adminSetUser({ data: {
									target: p.id,
									suspended: !p.suspended
								} }).then(load),
								children: p.suspended ? t.restore : t.suspend
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full bg-chip px-3 py-1 text-xs font-bold",
								onClick: () => void adminSetUser({ data: {
									target: p.id,
									isAdmin: !p.isAdmin
								} }).then(load),
								children: p.isAdmin ? t.removeAdmin : t.makeAdmin
							})]
						})
					]
				}, p.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-extrabold",
					children: t.reports
				}), data.reports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-sheet bg-card p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: r.body }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: r.status
						}),
						r.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-xs font-bold text-primary",
							onClick: () => void adminCloseReport({ data: { id: r.id } }).then(load),
							children: t.closeReport
						}) : null
					]
				}, r.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-2",
				onSubmit: (e) => {
					e.preventDefault();
					adminAddCategory({ data: cat }).then(() => {
						setCat({
							slug: "",
							name: "",
							nameAm: "",
							tint: "mint"
						});
						load();
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-extrabold",
						children: t.addCategory
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.categoryName,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: cat.name,
							onChange: (e) => setCat({
								...cat,
								name: e.target.value
							}),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.slug,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: cat.slug,
							onChange: (e) => setCat({
								...cat,
								slug: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.amharic,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: cat.nameAm,
							onChange: (e) => setCat({
								...cat,
								nameAm: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnClass,
						children: t.addCategory
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-2",
				onSubmit: (e) => {
					e.preventDefault();
					adminSaveSettings({ data: {
						commissionBps: bps,
						featuredPriceEtb: fee
					} }).then(load);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-extrabold",
						children: t.settings
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: t.commissionNote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.bps,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: bps,
							onChange: (e) => setBps(Number(e.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t.featuredFee,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inputClass,
							value: fee,
							onChange: (e) => setFee(Number(e.target.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: btnClass,
						children: t.saveSettings
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-extrabold",
				children: t.activity
			}), data.activity.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "border-b border-line py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: a.action
					}),
					" ",
					a.detail
				]
			}, i))] })
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
			className: "text-base font-extrabold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { AdminPage as component };
