import { i as getSql } from "./db-CspFwRZW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace.server-B6Licx-W.js
var FROM = `
select
  s.id, s.business_id, s.category_slug, s.kind, s.title, s.title_am, s.blurb, s.blurb_am,
  s.description, s.description_am, s.image, s.hero_image, s.price, s.compare_at,
  s.price_premium, s.price_platinum, s.badge, s.perk, s.support, s.tint,
  s.home_hero, s.spotlight, s.featured, s.stock, s.rating_tenths, s.review_count,
  b.name as business_name, b.city, b.area, b.verified, b.phone, b.hours, b.about, b.logo,
  c.name as category_name, c.name_am as category_name_am
from services s
join businesses b on b.id = s.business_id
join categories c on c.slug = s.category_slug
`;
function n(v) {
	const x = typeof v === "number" ? v : Number(v);
	return Number.isFinite(x) ? x : 0;
}
function ni(v) {
	if (v === null || v === void 0 || v === "") return null;
	return n(v);
}
function mapService(r) {
	return {
		id: n(r.id),
		businessId: n(r.business_id),
		categorySlug: r.category_slug,
		categoryName: r.category_name,
		categoryNameAm: r.category_name_am,
		kind: r.kind === "product" ? "product" : "service",
		title: r.title,
		titleAm: r.title_am,
		blurb: r.blurb,
		blurbAm: r.blurb_am,
		description: r.description,
		descriptionAm: r.description_am,
		image: r.image,
		heroImage: r.hero_image || r.image,
		price: n(r.price),
		compareAt: ni(r.compare_at),
		pricePremium: ni(r.price_premium),
		pricePlatinum: ni(r.price_platinum),
		badge: r.badge,
		perk: r.perk,
		support: r.support,
		tint: r.tint,
		homeHero: Boolean(r.home_hero),
		spotlight: Boolean(r.spotlight),
		featured: Boolean(r.featured),
		stock: ni(r.stock),
		ratingTenths: n(r.rating_tenths),
		reviewCount: n(r.review_count),
		businessName: r.business_name,
		city: r.city,
		area: r.area,
		verified: Boolean(r.verified),
		phone: r.phone,
		hours: r.hours,
		about: r.about,
		logo: r.logo
	};
}
function clip(v, max) {
	return String(v ?? "").trim().slice(0, max);
}
function like(q) {
	return `%${q.replace(/[%_\\]/g, "").slice(0, 60)}%`;
}
async function db() {
	return getSql();
}
async function log(actor, action, detail) {
	await (await db())`insert into activity (actor_id, action, detail) values (${actor}, ${action}, ${detail})`;
}
async function listCategories() {
	return (await (await db())`
    select slug, name, name_am, tint from categories order by sort, name
  `).map((r) => ({
		slug: r.slug,
		name: r.name,
		nameAm: r.name_am,
		tint: r.tint
	}));
}
async function listHome(city) {
	const sql = await db();
	const categories = await listCategories();
	const cities = await sql`
    select distinct city from businesses where suspended = false order by city
  `;
	const heroRows = await sql.query(`${FROM} where s.active = true and b.suspended = false and s.home_hero = true order by s.id limit 1`);
	const params = [];
	let citySql = "";
	if (city) {
		params.push(city);
		citySql = ` and b.city = $1`;
	}
	const trending = (await sql.query(`${FROM} where s.active = true and b.suspended = false${citySql} order by s.featured desc, s.rating_tenths desc, s.id limit 8`, params)).map(mapService);
	const nearby = await sql.query(`select b.id, b.name, b.slug, b.city, b.area, b.verified, b.logo, b.rating_tenths, b.hours, b.phone, b.plan, b.suspended, c.name as category_name
     from businesses b join categories c on c.slug = b.category_slug
     where b.suspended = false${city ? " and b.city = $1" : ""}
     order by b.verified desc, b.rating_tenths desc, b.id limit 8`, city ? [city] : []);
	return {
		categories,
		cities: cities.map((c) => c.city),
		hero: heroRows[0] ? mapService(heroRows[0]) : null,
		trending,
		nearby: nearby.map((b) => ({
			id: n(b.id),
			name: b.name,
			slug: b.slug,
			city: b.city,
			area: b.area,
			categoryName: b.category_name,
			verified: Boolean(b.verified),
			logo: b.logo,
			ratingTenths: n(b.rating_tenths),
			hours: b.hours,
			phone: b.phone,
			plan: b.plan,
			suspended: Boolean(b.suspended)
		}))
	};
}
async function listCategory(opts) {
	const sql = await db();
	const categories = await listCategories();
	const category = categories.find((c) => c.slug === opts.slug) ?? null;
	const params = [];
	const where = ["s.active = true", "b.suspended = false"];
	if (opts.slug && opts.slug !== "all") {
		params.push(opts.slug);
		where.push(`s.category_slug = $${params.length}`);
	}
	if (opts.q) {
		params.push(like(opts.q));
		where.push(`(s.title ilike $${params.length} or s.blurb ilike $${params.length} or b.name ilike $${params.length})`);
	}
	if (opts.city) {
		params.push(opts.city);
		where.push(`b.city = $${params.length}`);
	}
	if (opts.max > 0) {
		params.push(opts.max);
		where.push(`s.price <= $${params.length}`);
	}
	if (opts.stars > 0) {
		params.push(opts.stars * 10);
		where.push(`s.rating_tenths >= $${params.length}`);
	}
	const order = opts.sort === "price" ? "s.price asc, s.id" : opts.sort === "new" ? "s.created_at desc, s.id desc" : "s.spotlight desc, s.rating_tenths desc, s.id";
	const rows = await sql.query(`${FROM} where ${where.join(" and ")} order by ${order} limit 40`, params);
	const cities = await sql`select distinct city from businesses where suspended = false order by city`;
	const cards = rows.map(mapService);
	return {
		categories,
		category,
		cities: cities.map((c) => c.city),
		spotlight: cards.find((c) => c.spotlight) ?? null,
		services: cards.filter((c) => !c.spotlight)
	};
}
async function searchListings(q) {
	return listCategory({
		slug: "all",
		q,
		city: "",
		max: 0,
		stars: 0,
		sort: "popular"
	});
}
async function getService(id) {
	const sql = await db();
	const rows = await sql.query(`${FROM} where s.id = $1 and s.active = true and b.suspended = false`, [id]);
	const service = rows[0] ? mapService(rows[0]) : null;
	if (!service) return null;
	const staffRows = await sql`
    select name, title, photo, phone from staff where service_id = ${id} order by id limit 1
  `;
	const reviewRows = await sql`
    select id, author, stars, body from reviews where service_id = ${id} order by id desc limit 12
  `;
	const related = (await sql.query(`${FROM} where s.active = true and b.suspended = false and s.category_slug = $1 and s.id <> $2 order by s.rating_tenths desc limit 4`, [service.categorySlug, id])).map(mapService);
	return {
		service,
		staff: staffRows[0] ? {
			name: staffRows[0].name,
			title: staffRows[0].title,
			photo: staffRows[0].photo,
			phone: staffRows[0].phone
		} : null,
		reviews: reviewRows.map((r) => ({
			id: n(r.id),
			author: r.author,
			stars: n(r.stars),
			body: r.body
		})),
		related
	};
}
async function getCards(ids) {
	const clean = ids.filter((id) => Number.isInteger(id) && id > 0).slice(0, 3);
	if (!clean.length) return [];
	const sql = await db();
	const marks = clean.map((_, i) => `$${i + 1}`).join(",");
	return (await sql.query(`${FROM} where s.active = true and b.suspended = false and s.id in (${marks})`, clean)).map(mapService);
}
var LIVE = `${FROM} where s.active = true and b.suspended = false and s.id = $1`;
async function quote(items) {
	const sql = await db();
	const lines = [];
	for (const item of items) {
		const rows = await sql.query(LIVE, [item.serviceId]);
		const s = rows[0] ? mapService(rows[0]) : null;
		if (!s) throw new Error("That listing is no longer available.");
		const unit = unitPrice(s, item.tier);
		if (unit === null) throw new Error("That option is not offered.");
		if (s.stock !== null && item.qty > s.stock) throw new Error(`${s.title} only has ${s.stock} left.`);
		lines.push({
			serviceId: s.id,
			businessId: s.businessId,
			businessName: s.businessName,
			title: s.title,
			kind: s.kind,
			tier: item.tier,
			qty: item.qty,
			unitPrice: unit,
			lineTotal: unit * item.qty,
			image: s.image
		});
	}
	return {
		lines,
		subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0)
	};
}
function unitPrice(s, tier) {
	if (tier === "premium") return s.pricePremium;
	if (tier === "platinum") return s.pricePlatinum;
	return s.price;
}
async function settings() {
	const rows = await (await db())`
    select commission_bps, featured_price_etb from platform_settings where id = 1
  `;
	return {
		commissionBps: n(rows[0]?.commission_bps ?? 800),
		featuredPriceEtb: n(rows[0]?.featured_price_etb ?? 1499)
	};
}
async function profileRow(userId) {
	return (await (await db())`select user_id, display_name, phone, city, language, is_business, is_admin, suspended from profiles where user_id = ${userId}`)[0] ?? null;
}
async function getMe(userId, intent) {
	const sql = await db();
	let row = await profileRow(userId);
	if (!row) {
		const u = await sql`select name from "user" where id = ${userId}`;
		const isAdmin = n((await sql`select count(*)::int as n from profiles where is_admin = true`)[0]?.n) === 0;
		await sql`
      insert into profiles (user_id, display_name, is_admin, is_business)
      values (${userId}, ${u[0]?.name || "Member"}, ${isAdmin}, ${intent === "business"})
    `;
		row = await profileRow(userId);
	}
	if (!row) throw new Error("Could not open your profile.");
	const business = await myBusiness(userId);
	const notes = await sql`
    select id, title, body, read from notifications where user_id = ${userId} order by id desc limit 12
  `;
	const unread = await sql`select count(*)::int as n from notifications where user_id = ${userId} and read = false`;
	return {
		profile: {
			displayName: row.display_name,
			phone: row.phone,
			city: row.city,
			language: row.language,
			isBusiness: Boolean(row.is_business),
			isAdmin: Boolean(row.is_admin),
			suspended: Boolean(row.suspended)
		},
		business,
		notifications: notes.map((x) => ({
			id: n(x.id),
			title: x.title,
			body: x.body,
			read: Boolean(x.read)
		})),
		unread: n(unread[0]?.n)
	};
}
async function myBusiness(userId) {
	const b = (await (await db())`
    select id, name, slug, category_slug, city, area, phone, hours, about, logo, verified, suspended, plan
    from businesses where owner_user_id = ${userId} order by id limit 1
  `)[0];
	if (!b) return null;
	return {
		id: n(b.id),
		name: b.name,
		slug: b.slug,
		categorySlug: b.category_slug,
		city: b.city,
		area: b.area,
		phone: b.phone,
		hours: b.hours,
		about: b.about,
		logo: b.logo,
		verified: Boolean(b.verified),
		suspended: Boolean(b.suspended),
		plan: b.plan
	};
}
async function updateProfile(userId, input) {
	const sql = await db();
	await getMe(userId, "customer");
	const language = input.language === "am" ? "am" : "en";
	await sql`
    update profiles set
      display_name = ${clip(input.displayName, 80) || "Member"},
      phone = ${clip(input.phone, 30)},
      city = ${clip(input.city, 40) || "Addis Ababa"},
      language = ${language}
    where user_id = ${userId}
  `;
	return getMe(userId, "customer");
}
async function placeOrder(userId, input) {
	const me = await getMe(userId, "customer");
	if (me.profile.suspended) throw new Error("This account is suspended.");
	const priced = await quote(input.items);
	if (priced.lines.some((l) => l.kind === "service") && !/^\d{4}-\d{2}-\d{2}$/.test(input.scheduledFor)) throw new Error("Pick a visit date.");
	const address = clip(input.address, 180);
	const city = clip(input.city, 40);
	if (address.length < 3 || !city) throw new Error("Add an address and city.");
	const cfg = await settings();
	const sql = await db();
	const groups = /* @__PURE__ */ new Map();
	for (const line of priced.lines) {
		const list = groups.get(line.businessId) ?? [];
		list.push(line);
		groups.set(line.businessId, list);
	}
	const orderIds = [];
	for (const [businessId, lines] of groups) {
		const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
		const commission = Math.round(subtotal * cfg.commissionBps / 1e4);
		const when = input.scheduledFor && /^\d{4}-\d{2}-\d{2}$/.test(input.scheduledFor) ? input.scheduledFor : null;
		const orderId = n((await sql`
      insert into orders (customer_id, customer_name, business_id, status, payment_method, payment_status, address, city, scheduled_for, note, subtotal, commission_etb)
      values (
        ${userId}, ${me.profile.displayName}, ${businessId}, 'placed', ${input.paymentMethod}, 'unpaid',
        ${address}, ${city}, ${when}, ${clip(input.note, 400)}, ${subtotal}, ${commission}
      )
      returning id
    `)[0]?.id);
		orderIds.push(orderId);
		for (const line of lines) {
			await sql`
        insert into order_items (order_id, service_id, title, tier, qty, unit_price)
        values (${orderId}, ${line.serviceId}, ${line.title}, ${line.tier}, ${line.qty}, ${line.unitPrice})
      `;
			if (line.kind === "product") {
				if (!(await sql`
          update services set stock = stock - ${line.qty}
          where id = ${line.serviceId} and stock >= ${line.qty}
          returning id
        `).length) throw new Error(`${line.title} just sold out.`);
			}
		}
		const owner = await sql`
      select owner_user_id, name from businesses where id = ${businessId}
    `;
		const title = `New order #${orderId}`;
		const body = `${me.profile.displayName} · ETB ${subtotal}`;
		if (owner[0]?.owner_user_id) await notify(owner[0].owner_user_id, title, body);
		else {
			const admins = await sql`select user_id from profiles where is_admin = true`;
			for (const a of admins) await notify(a.user_id, title, `${owner[0]?.name ?? "Shop"} · ${body}`);
		}
		await notify(userId, "Order placed", `#${orderId} is with the shop. Payment stays unpaid until they confirm.`);
	}
	await log(userId, "order", orderIds.join(","));
	return { orderIds };
}
async function notify(userId, title, body) {
	await (await db())`insert into notifications (user_id, title, body) values (${userId}, ${title}, ${body})`;
}
async function myOrders(userId) {
	return (await (await db())`
    select o.id, o.status, o.subtotal, o.created_at, o.payment_method, o.city, b.name as business_name,
      (select string_agg(i.title, ', ') from order_items i where i.order_id = o.id) as summary
    from orders o join businesses b on b.id = o.business_id
    where o.customer_id = ${userId}
    order by o.id desc limit 40
  `).map((r) => ({
		id: n(r.id),
		status: r.status,
		total: n(r.subtotal),
		createdAt: stamp(r.created_at),
		paymentMethod: r.payment_method,
		city: r.city,
		businessName: r.business_name,
		summary: r.summary ?? ""
	}));
}
function stamp(v) {
	if (v instanceof Date) return v.toISOString();
	return String(v ?? "");
}
async function getOrder(userId, id) {
	const sql = await db();
	const me = await profileRow(userId);
	const o = (await sql`
    select o.id, o.customer_id, o.customer_name, o.business_id, o.status, o.payment_method, o.payment_status,
      o.address, o.city, o.scheduled_for, o.note, o.subtotal, o.commission_etb, o.sample, o.created_at,
      b.name as business_name, b.owner_user_id
    from orders o join businesses b on b.id = o.business_id
    where o.id = ${id}
  `)[0];
	if (!o) return null;
	const isCustomer = o.customer_id === userId;
	const isOwner = o.owner_user_id === userId;
	const isAdmin = Boolean(me?.is_admin);
	if (!isCustomer && !isOwner && !isAdmin) throw new Error("You cannot open that order.");
	const items = await sql`
    select title, tier, qty, unit_price from order_items where order_id = ${id} order by id
  `;
	return {
		role: isAdmin && !isCustomer && !isOwner ? "admin" : isOwner ? "owner" : "customer",
		order: {
			id: n(o.id),
			status: o.status,
			paymentMethod: o.payment_method,
			paymentStatus: o.payment_status,
			address: o.address,
			city: o.city,
			scheduledFor: o.scheduled_for ? String(o.scheduled_for).slice(0, 10) : "",
			note: o.note,
			total: n(o.subtotal),
			commission: n(o.commission_etb),
			sample: Boolean(o.sample),
			createdAt: stamp(o.created_at),
			businessName: o.business_name,
			businessId: n(o.business_id),
			customerName: o.customer_name
		},
		items: items.map((i) => ({
			title: i.title,
			tier: i.tier,
			qty: n(i.qty),
			unitPrice: n(i.unit_price)
		}))
	};
}
async function setOrderStatus(userId, id, status) {
	if (![
		"accepted",
		"rejected",
		"preparing",
		"ontheway",
		"done",
		"cancelled"
	].includes(status)) throw new Error("Unknown status.");
	const current = await getOrder(userId, id);
	if (!current) throw new Error("Order not found.");
	if (status === "cancelled" && current.role === "customer" && current.order.status !== "placed") throw new Error("You can cancel only before the shop accepts.");
	if (status !== "cancelled" && current.role === "customer") throw new Error("The shop updates this step.");
	const sql = await db();
	await sql`update orders set status = ${status} where id = ${id}`;
	const cid = (await sql`select customer_id from orders where id = ${id}`)[0]?.customer_id;
	if (cid) await notify(cid, `Order #${id}`, `Status is now ${status}.`);
	await log(userId, "status", `#${id} ${status}`);
	return getOrder(userId, id);
}
async function toggleFavorite(userId, serviceId) {
	const sql = await db();
	if ((await sql`select 1 as x from favorites where user_id = ${userId} and service_id = ${serviceId}`).length) {
		await sql`delete from favorites where user_id = ${userId} and service_id = ${serviceId}`;
		return { on: false };
	}
	await sql`insert into favorites (user_id, service_id) values (${userId}, ${serviceId})`;
	return { on: true };
}
async function toggleFavoriteBusiness(userId, businessId) {
	const sql = await db();
	if ((await sql`select 1 as x from favorite_businesses where user_id = ${userId} and business_id = ${businessId}`).length) {
		await sql`delete from favorite_businesses where user_id = ${userId} and business_id = ${businessId}`;
		return { on: false };
	}
	await sql`insert into favorite_businesses (user_id, business_id) values (${userId}, ${businessId})`;
	return { on: true };
}
async function myFavorites(userId) {
	const sql = await db();
	const services = (await sql.query(`${FROM} where s.active = true and b.suspended = false and s.id in (select service_id from favorites where user_id = $1)`, [userId])).map(mapService);
	const shops = await sql`
    select b.id, b.name, b.city, b.area, b.logo, b.verified
    from favorite_businesses f join businesses b on b.id = f.business_id
    where f.user_id = ${userId}
  `;
	const favIds = await sql`select service_id from favorites where user_id = ${userId}`;
	return {
		services,
		shops: shops.map((s) => ({
			id: n(s.id),
			name: s.name,
			city: s.city,
			area: s.area,
			logo: s.logo,
			verified: Boolean(s.verified)
		})),
		serviceIds: favIds.map((f) => n(f.service_id))
	};
}
async function openThread(userId, businessId) {
	const sql = await db();
	const b = await sql`
    select owner_user_id, name from businesses where id = ${businessId} and suspended = false
  `;
	if (!b[0]) throw new Error("Shop not found.");
	if (b[0].owner_user_id === userId) throw new Error("That is your own shop.");
	await sql`
    insert into threads (business_id, customer_id) values (${businessId}, ${userId})
    on conflict (business_id, customer_id) do nothing
  `;
	return {
		id: n((await sql`
    select id from threads where business_id = ${businessId} and customer_id = ${userId}
  `)[0]?.id),
		name: b[0].name
	};
}
async function listThreads(userId) {
	return (await (await db())`
    select t.id, b.name,
      (select m.body from messages m where m.thread_id = t.id order by m.id desc limit 1) as last_body
    from threads t
    join businesses b on b.id = t.business_id
    where t.customer_id = ${userId} or b.owner_user_id = ${userId}
    order by t.id desc
  `).map((r) => ({
		id: n(r.id),
		name: r.name,
		lastBody: r.last_body ?? ""
	}));
}
async function threadRole(userId, threadId) {
	const t = (await (await db())`
    select t.customer_id, b.owner_user_id, b.name
    from threads t join businesses b on b.id = t.business_id
    where t.id = ${threadId}
  `)[0];
	if (!t) return null;
	const me = await profileRow(userId);
	if (t.customer_id !== userId && t.owner_user_id !== userId && !me?.is_admin) return null;
	return t;
}
async function listMessages(userId, threadId) {
	const t = await threadRole(userId, threadId);
	if (!t) throw new Error("Conversation not found.");
	const rows = await (await db())`
    select id, sender_id, body, created_at from messages where thread_id = ${threadId} order by id
  `;
	return {
		name: t.name,
		messages: rows.map((m) => ({
			id: n(m.id),
			mine: m.sender_id === userId,
			body: m.body,
			createdAt: stamp(m.created_at)
		}))
	};
}
async function sendMessage(userId, threadId, body) {
	const t = await threadRole(userId, threadId);
	if (!t) throw new Error("Conversation not found.");
	const text = clip(body, 2e3);
	if (!text) throw new Error("Write a message.");
	await (await db())`insert into messages (thread_id, sender_id, body) values (${threadId}, ${userId}, ${text})`;
	const other = t.customer_id === userId ? t.owner_user_id : t.customer_id;
	if (other) await notify(other, t.name, text.slice(0, 120));
	return listMessages(userId, threadId);
}
async function markNotificationsRead(userId) {
	await (await db())`update notifications set read = true where user_id = ${userId}`;
	return { ok: true };
}
function slugify(s) {
	return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "shop";
}
async function createBusiness(userId, input) {
	const me = await getMe(userId, "business");
	if (me.profile.suspended) throw new Error("This account is suspended.");
	if (me.business) throw new Error("You already have a shop.");
	const name = clip(input.name, 80);
	if (name.length < 2) throw new Error("Name the shop.");
	const sql = await db();
	if (!(await sql`select slug from categories where slug = ${input.categorySlug}`).length) throw new Error("Pick a category.");
	let slug = slugify(name);
	if ((await sql`select id from businesses where slug = ${slug}`).length) slug = `${slug}-${Date.now().toString(36)}`;
	await sql`
    insert into businesses (owner_user_id, name, slug, category_slug, city, area, phone, hours, about, verified)
    values (
      ${userId}, ${name}, ${slug}, ${input.categorySlug}, ${clip(input.city, 40) || "Addis Ababa"},
      ${clip(input.area, 40)}, ${clip(input.phone, 30)}, ${clip(input.hours, 40)}, ${clip(input.about, 400)}, false
    )
  `;
	await sql`update profiles set is_business = true where user_id = ${userId}`;
	await log(userId, "shop", name);
	return studioHome(userId);
}
function cleanImage(s) {
	if (!s) return "";
	if (s.startsWith("/media/") && s.length < 200 && !s.includes("..")) return s;
	if ((s.startsWith("data:image/jpeg") || s.startsWith("data:image/png") || s.startsWith("data:image/webp")) && s.length < 6e5) return s;
	throw new Error("Use a preset photo or a smaller upload.");
}
async function studioHome(userId) {
	const business = await myBusiness(userId);
	if (!business) return {
		business: null,
		services: [],
		orders: [],
		chart: [],
		stats: emptyStats()
	};
	const sql = await db();
	const services = (await sql.query(`${FROM} where s.business_id = $1 order by s.id desc`, [business.id])).map(mapService);
	const orders = await ordersForBusiness(business.id);
	const chart = await chartFor(`o.business_id = $1`, [business.id]);
	const customers = await sql`
    select count(distinct customer_id)::int as n from orders where business_id = ${business.id} and customer_id is not null
  `;
	return {
		business,
		services,
		orders,
		chart,
		stats: {
			sales: orders.filter((o) => o.status !== "rejected" && o.status !== "cancelled").reduce((s, o) => s + o.total, 0),
			orders: orders.length,
			products: services.filter((s) => s).length,
			customers: n(customers[0]?.n)
		}
	};
}
function emptyStats() {
	return {
		sales: 0,
		orders: 0,
		products: 0,
		customers: 0
	};
}
async function ordersForBusiness(businessId) {
	return (await (await db())`
    select o.id, o.status, o.subtotal, o.created_at, o.payment_method, o.city, o.customer_name,
      (select string_agg(i.title, ', ') from order_items i where i.order_id = o.id) as summary
    from orders o where o.business_id = ${businessId} order by o.id desc limit 30
  `).map((r) => ({
		id: n(r.id),
		status: r.status,
		total: n(r.subtotal),
		createdAt: stamp(r.created_at),
		paymentMethod: r.payment_method,
		city: r.city,
		businessName: r.customer_name,
		summary: r.summary ?? ""
	}));
}
async function chartFor(where, params) {
	const rows = await (await db()).query(`select to_char(o.created_at, 'YYYY-MM-DD') as day, coalesce(sum(o.subtotal),0)::int as total
     from orders o where ${where} and o.created_at > now() - interval '8 days'
     and o.status not in ('rejected','cancelled')
     group by 1 order by 1`, params);
	const map = new Map(rows.map((r) => [String(r.day).slice(0, 10), n(r.total)]));
	const out = [];
	for (let i = 6; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setUTCDate(d.getUTCDate() - i);
		const key = d.toISOString().slice(0, 10);
		out.push({
			day: key.slice(5),
			total: map.get(key) ?? 0
		});
	}
	return out;
}
async function upsertService(userId, input) {
	const business = await myBusiness(userId);
	if (!business) throw new Error("Open a shop first.");
	const title = clip(input.title, 80);
	if (title.length < 2) throw new Error("Add a title.");
	if (!Number.isInteger(input.price) || input.price < 1 || input.price > 5e6) throw new Error("Set a price in birr.");
	const image = cleanImage(input.image);
	const sql = await db();
	const categorySlug = (await sql`select slug from categories where slug = ${input.categorySlug}`).length ? input.categorySlug : business.categorySlug;
	const tint = [
		"mint",
		"blush",
		"peach",
		"lilac",
		"sky",
		"butter"
	].includes(input.tint) ? input.tint : "mint";
	const kind = input.kind === "product" ? "product" : "service";
	const stock = kind === "product" ? Math.max(0, Math.min(1e5, input.stock || 0)) : null;
	const premium = input.pricePremium > 0 ? input.pricePremium : null;
	const platinum = input.pricePlatinum > 0 ? input.pricePlatinum : null;
	const compare = input.compareAt > input.price ? input.compareAt : null;
	if (input.id) {
		if (!(await sql`
      update services set
        title = ${title},
        blurb = ${clip(input.blurb, 140)},
        description = ${clip(input.description, 800)},
        price = ${input.price},
        compare_at = ${compare},
        price_premium = ${premium},
        price_platinum = ${platinum},
        badge = ${clip(input.badge, 40)},
        kind = ${kind},
        stock = ${stock},
        image = ${image},
        hero_image = ${image},
        tint = ${tint},
        category_slug = ${categorySlug}
      where id = ${input.id} and business_id = ${business.id}
      returning id
    `).length) throw new Error("Listing not found.");
	} else await sql`
      insert into services (
        business_id, category_slug, kind, title, blurb, description, image, hero_image, price, compare_at,
        price_premium, price_platinum, badge, tint, stock, active
      ) values (
        ${business.id}, ${categorySlug}, ${kind}, ${title}, ${clip(input.blurb, 140)}, ${clip(input.description, 800)},
        ${image}, ${image}, ${input.price}, ${compare}, ${premium}, ${platinum}, ${clip(input.badge, 40)}, ${tint}, ${stock}, true
      )
    `;
	return studioHome(userId);
}
async function setServiceActive(userId, id, active) {
	const business = await myBusiness(userId);
	if (!business) throw new Error("Open a shop first.");
	await (await db())`update services set active = ${active} where id = ${id} and business_id = ${business.id}`;
	return studioHome(userId);
}
async function requestPlan(userId, plan) {
	const business = await myBusiness(userId);
	if (!business) throw new Error("Open a shop first.");
	const sql = await db();
	await sql`update businesses set plan = ${plan} where id = ${business.id}`;
	await sql`insert into plan_requests (business_id, plan) values (${business.id}, ${plan})`;
	await log(userId, "plan", plan);
	return { ok: true };
}
async function addReview(userId, serviceId, stars, body) {
	if (stars < 1 || stars > 5) throw new Error("Pick 1 to 5 stars.");
	const text = clip(body, 400);
	if (text.length < 2) throw new Error("Write a short review.");
	const me = await getMe(userId, "customer");
	const sql = await db();
	await sql`
    insert into reviews (service_id, user_id, author, stars, body)
    values (${serviceId}, ${userId}, ${me.profile.displayName}, ${stars}, ${text})
    on conflict (user_id, service_id) where user_id is not null do update set stars = excluded.stars, body = excluded.body
  `;
	await sql`
    update services s set
      review_count = (select count(*)::int from reviews r where r.service_id = s.id),
      rating_tenths = coalesce((select round(avg(stars) * 10)::int from reviews r where r.service_id = s.id), 0)
    where s.id = ${serviceId}
  `;
	return getService(serviceId);
}
async function reportIssue(userId, businessId, serviceId, body) {
	const text = clip(body, 400);
	if (text.length < 4) throw new Error("Tell us what happened.");
	await (await db())`
    insert into reports (reporter_id, business_id, service_id, body)
    values (${userId}, ${businessId || null}, ${serviceId || null}, ${text})
  `;
	await log(userId, "report", text.slice(0, 80));
	return { ok: true };
}
async function adminOverview(userId) {
	if (!(await profileRow(userId))?.is_admin) throw new Error("Admin only.");
	const sql = await db();
	const users = await sql`select count(*)::int as n from profiles`;
	const businesses = await sql`select count(*)::int as n from businesses`;
	const products = await sql`select count(*)::int as n from services where active = true`;
	const orders = await sql`
    select count(*)::int as n, coalesce(sum(subtotal),0)::int as revenue, coalesce(sum(commission_etb),0)::int as commission
    from orders where status not in ('rejected','cancelled')
  `;
	const pending = await sql`select count(*)::int as n from businesses where verified = false and suspended = false`;
	const openReports = await sql`select count(*)::int as n from reports where status = 'open'`;
	const chart = await chartFor("true", []);
	const businessRows = await sql`
    select id, name, city, verified, suspended, plan, owner_user_id from businesses order by verified, id desc limit 40
  `;
	const people = await sql`
    select p.user_id, p.display_name, p.is_admin, p.is_business, p.suspended, u.email
    from profiles p join "user" u on u.id = p.user_id
    order by p.created_at desc limit 40
  `;
	const reportRows = await sql`
    select id, body, status, business_id from reports order by id desc limit 20
  `;
	const cats = await listCategories();
	const cfg = await settings();
	const activityRows = await sql`
    select action, detail, created_at from activity order by id desc limit 8
  `;
	return {
		users: n(users[0]?.n),
		businesses: n(businesses[0]?.n),
		products: n(products[0]?.n),
		orders: n(orders[0]?.n),
		revenue: n(orders[0]?.revenue),
		commission: n(orders[0]?.commission),
		pending: n(pending[0]?.n),
		openReports: n(openReports[0]?.n),
		chart,
		businessesList: businessRows.map((b) => ({
			id: n(b.id),
			name: b.name,
			city: b.city,
			verified: Boolean(b.verified),
			suspended: Boolean(b.suspended),
			plan: b.plan,
			owned: Boolean(b.owner_user_id)
		})),
		people: people.map((p) => ({
			id: p.user_id,
			name: p.display_name,
			email: p.email,
			isAdmin: Boolean(p.is_admin),
			isBusiness: Boolean(p.is_business),
			suspended: Boolean(p.suspended)
		})),
		reports: reportRows.map((r) => ({
			id: n(r.id),
			body: r.body,
			status: r.status,
			businessId: r.business_id ? n(r.business_id) : 0
		})),
		categories: cats,
		settings: cfg,
		activity: activityRows.map((a) => ({
			action: a.action,
			detail: a.detail,
			createdAt: stamp(a.created_at)
		}))
	};
}
async function adminSetBusiness(userId, id, verified, suspended) {
	if (!(await profileRow(userId))?.is_admin) throw new Error("Admin only.");
	await (await db())`update businesses set verified = ${verified}, suspended = ${suspended} where id = ${id}`;
	await log(userId, "business", `#${id} verified=${verified} suspended=${suspended}`);
	return { ok: true };
}
async function adminSetUser(userId, target, patch) {
	if (!(await profileRow(userId))?.is_admin) throw new Error("Admin only.");
	if (target === userId && patch.suspended) throw new Error("You cannot suspend yourself.");
	const sql = await db();
	if (patch.isAdmin === false && target === userId) {
		if (n((await sql`select count(*)::int as n from profiles where is_admin = true`)[0]?.n) <= 1) throw new Error("Keep at least one admin.");
	}
	if (typeof patch.suspended === "boolean") await sql`update profiles set suspended = ${patch.suspended} where user_id = ${target}`;
	if (typeof patch.isAdmin === "boolean") await sql`update profiles set is_admin = ${patch.isAdmin} where user_id = ${target}`;
	await log(userId, "user", target);
	return { ok: true };
}
async function adminAddCategory(userId, input) {
	if (!(await profileRow(userId))?.is_admin) throw new Error("Admin only.");
	const slug = slugify(input.slug || input.name);
	const name = clip(input.name, 40);
	if (!name) throw new Error("Name the category.");
	const tint = [
		"mint",
		"blush",
		"peach",
		"lilac",
		"sky",
		"butter"
	].includes(input.tint) ? input.tint : "mint";
	await (await db())`
    insert into categories (slug, name, name_am, tint, sort)
    values (${slug}, ${name}, ${clip(input.nameAm, 40)}, ${tint}, 50)
    on conflict (slug) do update set name = excluded.name, name_am = excluded.name_am, tint = excluded.tint
  `;
	return { ok: true };
}
async function adminSaveSettings(userId, commissionBps, featuredPriceEtb) {
	if (!(await profileRow(userId))?.is_admin) throw new Error("Admin only.");
	const bps = Math.max(0, Math.min(3e3, Math.round(commissionBps)));
	const fee = Math.max(0, Math.min(1e5, Math.round(featuredPriceEtb)));
	await (await db())`
    insert into platform_settings (id, commission_bps, featured_price_etb) values (1, ${bps}, ${fee})
    on conflict (id) do update set commission_bps = excluded.commission_bps, featured_price_etb = excluded.featured_price_etb
  `;
	await log(userId, "settings", `${bps} bps`);
	return { ok: true };
}
async function adminCloseReport(userId, id) {
	if (!(await profileRow(userId))?.is_admin) throw new Error("Admin only.");
	await (await db())`update reports set status = 'closed' where id = ${id}`;
	return { ok: true };
}
//#endregion
export { addReview, adminAddCategory, adminCloseReport, adminOverview, adminSaveSettings, adminSetBusiness, adminSetUser, createBusiness, getCards, getMe, getOrder, getService, listCategories, listCategory, listHome, listMessages, listThreads, markNotificationsRead, myFavorites, myOrders, openThread, placeOrder, quote, reportIssue, requestPlan, searchListings, sendMessage, setOrderStatus, setServiceActive, studioHome, toggleFavorite, toggleFavoriteBusiness, updateProfile, upsertService };
