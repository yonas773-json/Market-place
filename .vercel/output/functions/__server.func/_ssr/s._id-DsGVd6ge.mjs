import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Phone, o as ShieldCheck, u as MessageCircle } from "../_libs/lucide-react.mjs";
import { $ as useCurrentUserState, B as reportIssue, D as label, J as toggleFavorite, L as openThread, O as line, P as money, Z as useApp, d as TitleBar, f as addReview, i as Frame, o as ListingRow, u as Stars } from "./shell-H-mekxI1.mjs";
import { n as Route$1 } from "./router-DaDerkP-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s._id-DsGVd6ge.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ServicePage() {
	const { service, staff, reviews, related } = Route$1.useLoaderData();
	const { lang, t, add, toggleCompare, compare, ping } = useApp();
	const { user } = useCurrentUserState();
	const navigate = useNavigate();
	const tiers = [
		service.price ? {
			id: "classic",
			price: service.price,
			name: t.classic
		} : null,
		service.pricePremium ? {
			id: "premium",
			price: service.pricePremium,
			name: t.premium
		} : null,
		service.pricePlatinum ? {
			id: "platinum",
			price: service.pricePlatinum,
			name: t.platinum
		} : null
	].filter((x) => Boolean(x));
	const [tier, setTier] = (0, import_react.useState)(tiers[0]?.id ?? "classic");
	const [report, setReport] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [stars, setStars] = (0, import_react.useState)(5);
	const [review, setReview] = (0, import_react.useState)("");
	const price = tiers.find((x) => x.id === tier)?.price ?? service.price;
	const title = label(lang, service);
	const desc = lang === "am" && service.descriptionAm ? service.descriptionAm : service.description;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, {
		dock: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-4 mb-4 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-full border border-line bg-card px-4 py-3 text-sm font-extrabold tabular-nums",
				children: money(price, lang)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-12 flex-1 rounded-full bg-primary text-sm font-bold text-primary-ink",
				onClick: () => {
					add({
						serviceId: service.id,
						tier,
						qty: 1
					});
					ping(t.added);
					navigate({ to: "/checkout" });
				},
				children: t.bookNow
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
			title: lang === "am" && service.categoryNameAm ? service.categoryNameAm : service.categoryName,
			back: `/c/${service.categorySlug}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 px-5 pb-8 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `overflow-hidden rounded-sheet ${service.heroImage ? "" : "bg-blush"}`,
					children: service.heroImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: service.heroImage,
						alt: title,
						className: "h-80 w-full object-cover object-top"
					}) : null
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-extrabold tracking-tight",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: line(lang, service)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
								tenths: service.ratingTenths,
								count: service.reviewCount
							})
						})
					] }), service.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-16 shrink-0 rotate-6 place-items-center rounded-2xl bg-mint px-2 text-center text-xs font-extrabold leading-tight text-ink",
						children: service.badge
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-3xl font-extrabold tabular-nums",
					children: [
						money(price, lang),
						" ",
						tier === "classic" && service.compareAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold text-muted line-through",
							children: money(service.compareAt, lang)
						}) : null
					]
				}),
				tiers.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: tiers.map((option, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTier(option.id),
						className: tier === option.id ? "rounded-2xl bg-ink px-2 py-3 text-card" : i === 1 ? "rounded-2xl bg-lilac px-2 py-3" : "rounded-2xl bg-sky px-2 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs font-semibold",
							children: option.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm font-extrabold tabular-nums",
							children: money(option.price, lang)
						})]
					}, option.id))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-sheet bg-chip p-3",
					children: [
						staff?.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: staff.photo,
							alt: "",
							className: "size-12 rounded-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-12 place-items-center rounded-full bg-card text-sm font-bold",
							children: service.businessName.charAt(0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-bold",
								children: staff?.name ?? service.businessName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [staff ? staff.title : t.contact, service.verified ? ` · ${t.verified}` : ""]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${staff?.phone || service.phone}`,
							"aria-label": t.call,
							className: "grid size-11 place-items-center rounded-full bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": t.message,
							className: "grid size-11 place-items-center rounded-full bg-card",
							onClick: () => {
								if (!user) {
									navigate({ to: "/login" });
									return;
								}
								openThread({ data: { businessId: service.businessId } }).then((th) => navigate({
									to: "/inbox/$id",
									params: { id: String(th.id) }
								}));
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-extrabold",
						children: t.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 flex items-center gap-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }),
							" ",
							service.businessName,
							" · ",
							service.area,
							", ",
							service.city
						]
					}),
					service.hours ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							t.hours,
							": ",
							service.hours
						]
					}) : null,
					service.stock !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							t.stock,
							": ",
							service.stock
						]
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 flex-1 rounded-full bg-chip text-sm font-bold",
							onClick: () => {
								add({
									serviceId: service.id,
									tier,
									qty: 1
								});
								ping(t.added);
							},
							children: t.addCart
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 flex-1 rounded-full bg-chip text-sm font-bold",
							onClick: () => {
								if (!user) {
									navigate({ to: "/login" });
									return;
								}
								toggleFavorite({ data: { serviceId: service.id } }).then(() => ping(t.savedOk));
							},
							children: t.favorite
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 flex-1 rounded-full bg-chip text-sm font-bold",
							onClick: () => toggleCompare(service.id),
							children: compare.includes(service.id) ? t.remove : t.compare
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-extrabold",
							children: t.reviews
						}),
						reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t.noReviews
						}) : reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-sheet bg-card p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold",
								children: [
									r.author,
									" · ",
									r.stars,
									"/5"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: r.body
							})]
						}, r.id)),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-2",
							onSubmit: (e) => {
								e.preventDefault();
								addReview({ data: {
									serviceId: service.id,
									stars,
									body: review
								} }).then(() => {
									setNote(t.reviewThanks);
									setReview("");
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: stars,
									onChange: (e) => setStars(Number(e.target.value)),
									className: "h-11 w-full rounded-full bg-chip px-3 text-sm",
									children: [
										5,
										4,
										3,
										2,
										1
									].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: n,
										children: [n, "/5"]
									}, n))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: review,
									onChange: (e) => setReview(e.target.value),
									placeholder: t.writeReview,
									className: "h-20 w-full rounded-3xl bg-chip px-4 py-3 text-sm outline-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "h-11 rounded-full bg-ink px-4 text-sm font-bold text-card",
									children: t.writeReview
								}),
								note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: note
								}) : null
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (!user) {
							navigate({ to: "/login" });
							return;
						}
						reportIssue({ data: {
							businessId: service.businessId,
							serviceId: service.id,
							body: report
						} }).then(() => {
							setReport("");
							setNote(t.reportSent);
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: report,
						onChange: (e) => setReport(e.target.value),
						placeholder: t.report,
						className: "h-16 w-full rounded-3xl bg-chip px-4 py-3 text-sm outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-sm font-semibold text-primary",
						children: t.report
					})]
				}),
				related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-extrabold",
						children: t.related
					}), related.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingRow, { item: s }, s.id))]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/c/$slug",
					params: { slug: service.categorySlug },
					search: {
						q: "",
						city: "",
						max: 0,
						stars: 0,
						sort: "popular"
					},
					className: "block text-sm font-semibold text-primary",
					children: t.seeAll
				})
			]
		})]
	});
}
//#endregion
export { ServicePage as component };
