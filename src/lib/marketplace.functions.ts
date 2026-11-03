import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { ItemIn, Tier } from "@/lib/marketplace.server";

function items(input: unknown): ItemIn[] {
  if (!Array.isArray(input) || input.length < 1 || input.length > 30) throw new Error("Your cart is empty.");
  return input.map((row) => {
    const r = row as { serviceId?: unknown; tier?: unknown; qty?: unknown };
    const serviceId = Number(r.serviceId);
    const qty = Number(r.qty);
    const tier = r.tier;
    if (!Number.isInteger(serviceId) || serviceId <= 0) throw new Error("Bad item");
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) throw new Error("Bad quantity");
    if (tier !== "classic" && tier !== "premium" && tier !== "platinum") throw new Error("Bad option");
    return { serviceId, tier: tier as Tier, qty };
  });
}

async function api() {
  return import("./marketplace.server");
}

export const listHome = createServerFn({ method: "GET" })
  .validator((data: { city?: string } | undefined) => ({ city: String(data?.city ?? "").slice(0, 40) }))
  .handler(async ({ data }) => (await api()).listHome(data.city));

export const listCategory = createServerFn({ method: "GET" })
  .validator((data: { slug: string; q?: string; city?: string; max?: number; stars?: number; sort?: string }) => ({
    slug: String(data.slug ?? "all").slice(0, 40),
    q: String(data.q ?? "").slice(0, 60),
    city: String(data.city ?? "").slice(0, 40),
    max: Math.max(0, Math.min(1_000_000, Number(data.max) || 0)),
    stars: [0, 3, 4, 5].includes(Number(data.stars)) ? Number(data.stars) : 0,
    sort: (data.sort === "price" || data.sort === "new" ? data.sort : "popular") as "popular" | "price" | "new",
  }))
  .handler(async ({ data }) => (await api()).listCategory(data));

export const searchListings = createServerFn({ method: "GET" })
  .validator((data: { q?: string }) => ({ q: String(data?.q ?? "").slice(0, 60) }))
  .handler(async ({ data }) => (await api()).searchListings(data.q));

export const getService = createServerFn({ method: "GET" })
  .validator((data: { id: number }) => {
    const id = Number(data?.id);
    if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid listing");
    return { id };
  })
  .handler(async ({ data }) => (await api()).getService(data.id));

export const getCards = createServerFn({ method: "GET" })
  .validator((data: { ids: number[] }) => ({
    ids: (Array.isArray(data?.ids) ? data.ids : []).map(Number).filter((id) => Number.isInteger(id) && id > 0).slice(0, 3),
  }))
  .handler(async ({ data }) => (await api()).getCards(data.ids));

export const quoteOrder = createServerFn({ method: "POST" })
  .validator((data: { items: unknown }) => ({ items: items(data?.items) }))
  .handler(async ({ data }) => (await api()).quote(data.items));

export const getMe = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { intent?: string } | undefined): { intent: "customer" | "business" } => ({
    intent: data?.intent === "business" ? "business" : "customer",
  }))
  .handler(async ({ data, context }) => (await api()).getMe(context.userId, data.intent));

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { displayName: string; phone: string; city: string; language: string }) => data)
  .handler(async ({ data, context }) => (await api()).updateProfile(context.userId, data));

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    items: unknown;
    address: string;
    city: string;
    scheduledFor: string;
    note: string;
    paymentMethod: string;
  }) => ({
    items: items(data.items),
    address: String(data.address ?? ""),
    city: String(data.city ?? ""),
    scheduledFor: String(data.scheduledFor ?? ""),
    note: String(data.note ?? ""),
    paymentMethod: (data.paymentMethod === "cbe" || data.paymentMethod === "cash" ? data.paymentMethod : "telebirr") as "telebirr" | "cbe" | "cash",
  }))
  .handler(async ({ data, context }) => (await api()).placeOrder(context.userId, data));

export const myOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => (await api()).myOrders(context.userId));

export const getOrder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ data, context }) => (await api()).getOrder(context.userId, data.id));

export const setOrderStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number; status: string }) => ({ id: Number(data.id), status: String(data.status) }))
  .handler(async ({ data, context }) => (await api()).setOrderStatus(context.userId, data.id, data.status));

export const toggleFavorite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { serviceId: number }) => ({ serviceId: Number(data.serviceId) }))
  .handler(async ({ data, context }) => (await api()).toggleFavorite(context.userId, data.serviceId));

export const toggleFavoriteBusiness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { businessId: number }) => ({ businessId: Number(data.businessId) }))
  .handler(async ({ data, context }) => (await api()).toggleFavoriteBusiness(context.userId, data.businessId));

export const myFavorites = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => (await api()).myFavorites(context.userId));

export const openThread = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { businessId: number }) => ({ businessId: Number(data.businessId) }))
  .handler(async ({ data, context }) => (await api()).openThread(context.userId, data.businessId));

export const listThreads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => (await api()).listThreads(context.userId));

export const listMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((data: { threadId: number }) => ({ threadId: Number(data.threadId) }))
  .handler(async ({ data, context }) => (await api()).listMessages(context.userId, data.threadId));

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { threadId: number; body: string }) => ({ threadId: Number(data.threadId), body: String(data.body ?? "") }))
  .handler(async ({ data, context }) => (await api()).sendMessage(context.userId, data.threadId, data.body));

export const markNotificationsRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => (await api()).markNotificationsRead(context.userId));

export const createBusiness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    name: string;
    categorySlug: string;
    city: string;
    area: string;
    phone: string;
    hours: string;
    about: string;
  }) => data)
  .handler(async ({ data, context }) => (await api()).createBusiness(context.userId, data));

export const studioHome = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => (await api()).studioHome(context.userId));

export const upsertService = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: {
    id: number;
    title: string;
    blurb: string;
    description: string;
    price: number;
    compareAt: number;
    pricePremium: number;
    pricePlatinum: number;
    badge: string;
    kind: "service" | "product";
    stock: number;
    image: string;
    tint: string;
    categorySlug: string;
  }) => ({
    ...data,
    id: Number(data.id) || 0,
    price: Math.round(Number(data.price) || 0),
    compareAt: Math.round(Number(data.compareAt) || 0),
    pricePremium: Math.round(Number(data.pricePremium) || 0),
    pricePlatinum: Math.round(Number(data.pricePlatinum) || 0),
    stock: Math.round(Number(data.stock) || 0),
    kind: data.kind === "product" ? "product" as const : "service" as const,
  }))
  .handler(async ({ data, context }) => (await api()).upsertService(context.userId, data));

export const setServiceActive = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number; active: boolean }) => ({ id: Number(data.id), active: Boolean(data.active) }))
  .handler(async ({ data, context }) => (await api()).setServiceActive(context.userId, data.id, data.active));

export const requestPlan = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { plan: string }): { plan: "free" | "growth" | "featured" } => ({
    plan: data.plan === "growth" || data.plan === "featured" ? data.plan : "free",
  }))
  .handler(async ({ data, context }) => (await api()).requestPlan(context.userId, data.plan));

export const addReview = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { serviceId: number; stars: number; body: string }) => ({
    serviceId: Number(data.serviceId),
    stars: Number(data.stars),
    body: String(data.body ?? ""),
  }))
  .handler(async ({ data, context }) => (await api()).addReview(context.userId, data.serviceId, data.stars, data.body));

export const reportIssue = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { businessId: number; serviceId: number; body: string }) => ({
    businessId: Number(data.businessId) || 0,
    serviceId: Number(data.serviceId) || 0,
    body: String(data.body ?? ""),
  }))
  .handler(async ({ data, context }) => (await api()).reportIssue(context.userId, data.businessId, data.serviceId, data.body));

export const adminOverview = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => (await api()).adminOverview(context.userId));

export const adminSetBusiness = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number; verified: boolean; suspended: boolean }) => ({
    id: Number(data.id),
    verified: Boolean(data.verified),
    suspended: Boolean(data.suspended),
  }))
  .handler(async ({ data, context }) => (await api()).adminSetBusiness(context.userId, data.id, data.verified, data.suspended));

export const adminSetUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { target: string; suspended?: boolean; isAdmin?: boolean }) => data)
  .handler(async ({ data, context }) =>
    (await api()).adminSetUser(context.userId, String(data.target), {
      suspended: data.suspended,
      isAdmin: data.isAdmin,
    }),
  );

export const adminAddCategory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { slug: string; name: string; nameAm: string; tint: string }) => data)
  .handler(async ({ data, context }) => (await api()).adminAddCategory(context.userId, data));

export const adminSaveSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { commissionBps: number; featuredPriceEtb: number }) => ({
    commissionBps: Number(data.commissionBps),
    featuredPriceEtb: Number(data.featuredPriceEtb),
  }))
  .handler(async ({ data, context }) => (await api()).adminSaveSettings(context.userId, data.commissionBps, data.featuredPriceEtb));

export const adminCloseReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ data, context }) => (await api()).adminCloseReport(context.userId, data.id));
