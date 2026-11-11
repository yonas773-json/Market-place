import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-C4TbYZKd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace.functions-BcQASyaT.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function items(input) {
	if (!Array.isArray(input) || input.length < 1 || input.length > 30) throw new Error("Your cart is empty.");
	return input.map((row) => {
		const r = row;
		const serviceId = Number(r.serviceId);
		const qty = Number(r.qty);
		const tier = r.tier;
		if (!Number.isInteger(serviceId) || serviceId <= 0) throw new Error("Bad item");
		if (!Number.isInteger(qty) || qty < 1 || qty > 20) throw new Error("Bad quantity");
		if (tier !== "classic" && tier !== "premium" && tier !== "platinum") throw new Error("Bad option");
		return {
			serviceId,
			tier,
			qty
		};
	});
}
async function api() {
	return import("./marketplace.server-B6Licx-W.mjs");
}
var listHome_createServerFn_handler = createServerRpc({
	id: "4a47575e3cc74b0922feaafba3647be81c0d3095e72d6057209004fb30122a28",
	name: "listHome",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => listHome.__executeServer(opts));
var listHome = createServerFn({ method: "GET" }).validator((data) => ({ city: String(data?.city ?? "").slice(0, 40) })).handler(listHome_createServerFn_handler, async ({ data }) => (await api()).listHome(data.city));
var listCategory_createServerFn_handler = createServerRpc({
	id: "aaa6ef392d8609a10c69ba88d3938c07db53a86db53464957856a2a4e3d97814",
	name: "listCategory",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => listCategory.__executeServer(opts));
var listCategory = createServerFn({ method: "GET" }).validator((data) => ({
	slug: String(data.slug ?? "all").slice(0, 40),
	q: String(data.q ?? "").slice(0, 60),
	city: String(data.city ?? "").slice(0, 40),
	max: Math.max(0, Math.min(1e6, Number(data.max) || 0)),
	stars: [
		0,
		3,
		4,
		5
	].includes(Number(data.stars)) ? Number(data.stars) : 0,
	sort: data.sort === "price" || data.sort === "new" ? data.sort : "popular"
})).handler(listCategory_createServerFn_handler, async ({ data }) => (await api()).listCategory(data));
var searchListings_createServerFn_handler = createServerRpc({
	id: "36133ab618695e390af528c581dec9950ee12b9de240d2bfd6bfd6a82c7732fe",
	name: "searchListings",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => searchListings.__executeServer(opts));
var searchListings = createServerFn({ method: "GET" }).validator((data) => ({ q: String(data?.q ?? "").slice(0, 60) })).handler(searchListings_createServerFn_handler, async ({ data }) => (await api()).searchListings(data.q));
var getService_createServerFn_handler = createServerRpc({
	id: "4733fe552c043bc4d85b0d2aa900353bb580b7525c616c1a1b56b66d266f0035",
	name: "getService",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => getService.__executeServer(opts));
var getService = createServerFn({ method: "GET" }).validator((data) => {
	const id = Number(data?.id);
	if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid listing");
	return { id };
}).handler(getService_createServerFn_handler, async ({ data }) => (await api()).getService(data.id));
var getCards_createServerFn_handler = createServerRpc({
	id: "1e35befe4103f46db1fe1ec5d426463ecb51c6ff8d25193533c7b4662481e37a",
	name: "getCards",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => getCards.__executeServer(opts));
var getCards = createServerFn({ method: "GET" }).validator((data) => ({ ids: (Array.isArray(data?.ids) ? data.ids : []).map(Number).filter((id) => Number.isInteger(id) && id > 0).slice(0, 3) })).handler(getCards_createServerFn_handler, async ({ data }) => (await api()).getCards(data.ids));
var quoteOrder_createServerFn_handler = createServerRpc({
	id: "c731617e21980817af8963cee9bd653965998d1f6b7d5a547de7ed403b7fbe5e",
	name: "quoteOrder",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => quoteOrder.__executeServer(opts));
var quoteOrder = createServerFn({ method: "POST" }).validator((data) => ({ items: items(data?.items) })).handler(quoteOrder_createServerFn_handler, async ({ data }) => (await api()).quote(data.items));
var getMe_createServerFn_handler = createServerRpc({
	id: "3ce1264d7709396053639e7a25b69753336c6ffd9b267460fe518504239b00b5",
	name: "getMe",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => getMe.__executeServer(opts));
var getMe = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ intent: data?.intent === "business" ? "business" : "customer" })).handler(getMe_createServerFn_handler, async ({ data, context }) => (await api()).getMe(context.userId, data.intent));
var updateProfile_createServerFn_handler = createServerRpc({
	id: "76326526f60dadafe126e87102241791c79dfc0134b3a5bbbbe448b7ec5998cb",
	name: "updateProfile",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateProfile_createServerFn_handler, async ({ data, context }) => (await api()).updateProfile(context.userId, data));
var placeOrder_createServerFn_handler = createServerRpc({
	id: "7267293c51aaef5f57a57108aeaa4b7dc46c3266efb9a447eace7f1ba497c233",
	name: "placeOrder",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	items: items(data.items),
	address: String(data.address ?? ""),
	city: String(data.city ?? ""),
	scheduledFor: String(data.scheduledFor ?? ""),
	note: String(data.note ?? ""),
	paymentMethod: data.paymentMethod === "cbe" || data.paymentMethod === "cash" ? data.paymentMethod : "telebirr"
})).handler(placeOrder_createServerFn_handler, async ({ data, context }) => (await api()).placeOrder(context.userId, data));
var myOrders_createServerFn_handler = createServerRpc({
	id: "60abb4ab3ab08a113dd191e7f4ad1c1e81181cc6d7eacdb63d88a1c815be4e41",
	name: "myOrders",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => myOrders.__executeServer(opts));
var myOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myOrders_createServerFn_handler, async ({ context }) => (await api()).myOrders(context.userId));
var getOrder_createServerFn_handler = createServerRpc({
	id: "b4bfbb7d3539323a0b3b9eafcc27eecd9667e33ccd6f4d68def287b49579c1d8",
	name: "getOrder",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => getOrder.__executeServer(opts));
var getOrder = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => ({ id: Number(data.id) })).handler(getOrder_createServerFn_handler, async ({ data, context }) => (await api()).getOrder(context.userId, data.id));
var setOrderStatus_createServerFn_handler = createServerRpc({
	id: "411f90603fa5ea9b9f200e55f46d134fac0bbc3f4ead2dc69f559963398d589a",
	name: "setOrderStatus",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => setOrderStatus.__executeServer(opts));
var setOrderStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	id: Number(data.id),
	status: String(data.status)
})).handler(setOrderStatus_createServerFn_handler, async ({ data, context }) => (await api()).setOrderStatus(context.userId, data.id, data.status));
var toggleFavorite_createServerFn_handler = createServerRpc({
	id: "f3e0aafff82cd57ae1f7fc172038867ad9fee5e92dbd133ad473ccedf80d0bbe",
	name: "toggleFavorite",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => toggleFavorite.__executeServer(opts));
var toggleFavorite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ serviceId: Number(data.serviceId) })).handler(toggleFavorite_createServerFn_handler, async ({ data, context }) => (await api()).toggleFavorite(context.userId, data.serviceId));
var toggleFavoriteBusiness_createServerFn_handler = createServerRpc({
	id: "7919199b13b7d8cfa325a1abcf2be47397d7fd2306462993ef536124b4de01ae",
	name: "toggleFavoriteBusiness",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => toggleFavoriteBusiness.__executeServer(opts));
var toggleFavoriteBusiness = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ businessId: Number(data.businessId) })).handler(toggleFavoriteBusiness_createServerFn_handler, async ({ data, context }) => (await api()).toggleFavoriteBusiness(context.userId, data.businessId));
var myFavorites_createServerFn_handler = createServerRpc({
	id: "c851fa72cccd222bcf906172f80265b98e8c9f7242e59f2824e0fab3b720f3c8",
	name: "myFavorites",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => myFavorites.__executeServer(opts));
var myFavorites = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myFavorites_createServerFn_handler, async ({ context }) => (await api()).myFavorites(context.userId));
var openThread_createServerFn_handler = createServerRpc({
	id: "ad18e22b156e0039b1ef4237f0e9aadc5372b9d4c07d56877814034b4104483f",
	name: "openThread",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => openThread.__executeServer(opts));
var openThread = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ businessId: Number(data.businessId) })).handler(openThread_createServerFn_handler, async ({ data, context }) => (await api()).openThread(context.userId, data.businessId));
var listThreads_createServerFn_handler = createServerRpc({
	id: "fce7f6ae6c4a6ff3f9b8ec9c0125d92329206b9c270ad5138cd7dc6e0ecb3951",
	name: "listThreads",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => listThreads.__executeServer(opts));
var listThreads = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listThreads_createServerFn_handler, async ({ context }) => (await api()).listThreads(context.userId));
var listMessages_createServerFn_handler = createServerRpc({
	id: "32fdc5c13fd4edfe98bc161b84c4ae43592c74f235ad614c5b2f6114ebcacbfb",
	name: "listMessages",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => listMessages.__executeServer(opts));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => ({ threadId: Number(data.threadId) })).handler(listMessages_createServerFn_handler, async ({ data, context }) => (await api()).listMessages(context.userId, data.threadId));
var sendMessage_createServerFn_handler = createServerRpc({
	id: "a4f1c8371f5fd235a8131ed10fe5bf35a8555ca975cde7c54099d2ea59411f95",
	name: "sendMessage",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	threadId: Number(data.threadId),
	body: String(data.body ?? "")
})).handler(sendMessage_createServerFn_handler, async ({ data, context }) => (await api()).sendMessage(context.userId, data.threadId, data.body));
var markNotificationsRead_createServerFn_handler = createServerRpc({
	id: "8c37bfb0cf1f15101686f320e33b017e70733c323fb661dc2a0ebdedb6bcbaa6",
	name: "markNotificationsRead",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => markNotificationsRead.__executeServer(opts));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(markNotificationsRead_createServerFn_handler, async ({ context }) => (await api()).markNotificationsRead(context.userId));
var createBusiness_createServerFn_handler = createServerRpc({
	id: "d60286891d8b32993843a2f030df22dc9e2a6c8ef18ddc6997f37f7548c02349",
	name: "createBusiness",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => createBusiness.__executeServer(opts));
var createBusiness = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createBusiness_createServerFn_handler, async ({ data, context }) => (await api()).createBusiness(context.userId, data));
var studioHome_createServerFn_handler = createServerRpc({
	id: "9fe0e585fee1d490dd2ddec40a50db57cf234d27b7d542d019940533bf359da3",
	name: "studioHome",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => studioHome.__executeServer(opts));
var studioHome = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(studioHome_createServerFn_handler, async ({ context }) => (await api()).studioHome(context.userId));
var upsertService_createServerFn_handler = createServerRpc({
	id: "8dea946806a8fcf5cdad6052b14114357c71481431709a0cd767ce6477943f3f",
	name: "upsertService",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => upsertService.__executeServer(opts));
var upsertService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	...data,
	id: Number(data.id) || 0,
	price: Math.round(Number(data.price) || 0),
	compareAt: Math.round(Number(data.compareAt) || 0),
	pricePremium: Math.round(Number(data.pricePremium) || 0),
	pricePlatinum: Math.round(Number(data.pricePlatinum) || 0),
	stock: Math.round(Number(data.stock) || 0),
	kind: data.kind === "product" ? "product" : "service"
})).handler(upsertService_createServerFn_handler, async ({ data, context }) => (await api()).upsertService(context.userId, data));
var setServiceActive_createServerFn_handler = createServerRpc({
	id: "ed5a226dd60bd7bb438fa6d9f28cf8614b80fa82f2e7f43c60a232bbaaa21671",
	name: "setServiceActive",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => setServiceActive.__executeServer(opts));
var setServiceActive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	id: Number(data.id),
	active: Boolean(data.active)
})).handler(setServiceActive_createServerFn_handler, async ({ data, context }) => (await api()).setServiceActive(context.userId, data.id, data.active));
var requestPlan_createServerFn_handler = createServerRpc({
	id: "7d9602a2c81e593a33a5f782f0268acc4bae3c291a05f9de575cbf76e2c84127",
	name: "requestPlan",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => requestPlan.__executeServer(opts));
var requestPlan = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ plan: data.plan === "growth" || data.plan === "featured" ? data.plan : "free" })).handler(requestPlan_createServerFn_handler, async ({ data, context }) => (await api()).requestPlan(context.userId, data.plan));
var addReview_createServerFn_handler = createServerRpc({
	id: "c339428442caa418ab903e3d13a57fa6d372b3c642bad0222aa5f46be37fed6b",
	name: "addReview",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => addReview.__executeServer(opts));
var addReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	serviceId: Number(data.serviceId),
	stars: Number(data.stars),
	body: String(data.body ?? "")
})).handler(addReview_createServerFn_handler, async ({ data, context }) => (await api()).addReview(context.userId, data.serviceId, data.stars, data.body));
var reportIssue_createServerFn_handler = createServerRpc({
	id: "74f5cce5e40d3c340e24d947ac01a99d844518e5fd616539e0fa4cb9dfd171c6",
	name: "reportIssue",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => reportIssue.__executeServer(opts));
var reportIssue = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	businessId: Number(data.businessId) || 0,
	serviceId: Number(data.serviceId) || 0,
	body: String(data.body ?? "")
})).handler(reportIssue_createServerFn_handler, async ({ data, context }) => (await api()).reportIssue(context.userId, data.businessId, data.serviceId, data.body));
var adminOverview_createServerFn_handler = createServerRpc({
	id: "059ec78fbb5c34de12dc7b935831000b8677c081415b9d39222b1057cd2c9369",
	name: "adminOverview",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => adminOverview.__executeServer(opts));
var adminOverview = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(adminOverview_createServerFn_handler, async ({ context }) => (await api()).adminOverview(context.userId));
var adminSetBusiness_createServerFn_handler = createServerRpc({
	id: "1d8cbfd8c30f386358de9fa447c438d6e5c3532743b7c1596077b7907312c9db",
	name: "adminSetBusiness",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => adminSetBusiness.__executeServer(opts));
var adminSetBusiness = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	id: Number(data.id),
	verified: Boolean(data.verified),
	suspended: Boolean(data.suspended)
})).handler(adminSetBusiness_createServerFn_handler, async ({ data, context }) => (await api()).adminSetBusiness(context.userId, data.id, data.verified, data.suspended));
var adminSetUser_createServerFn_handler = createServerRpc({
	id: "2a560180facf5b2700bce5ca22e649aa4dff7a949b9f8f259a7f940d67827e1d",
	name: "adminSetUser",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => adminSetUser.__executeServer(opts));
var adminSetUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(adminSetUser_createServerFn_handler, async ({ data, context }) => (await api()).adminSetUser(context.userId, String(data.target), {
	suspended: data.suspended,
	isAdmin: data.isAdmin
}));
var adminAddCategory_createServerFn_handler = createServerRpc({
	id: "8c781bb9791891058c3af972f0a33d09491f8df49ba99ea6caaca28a59a96e5d",
	name: "adminAddCategory",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => adminAddCategory.__executeServer(opts));
var adminAddCategory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(adminAddCategory_createServerFn_handler, async ({ data, context }) => (await api()).adminAddCategory(context.userId, data));
var adminSaveSettings_createServerFn_handler = createServerRpc({
	id: "1ce9968c64759a67fcc9c62d081a328c57df62debce10e64a7a7258f84c67619",
	name: "adminSaveSettings",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => adminSaveSettings.__executeServer(opts));
var adminSaveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	commissionBps: Number(data.commissionBps),
	featuredPriceEtb: Number(data.featuredPriceEtb)
})).handler(adminSaveSettings_createServerFn_handler, async ({ data, context }) => (await api()).adminSaveSettings(context.userId, data.commissionBps, data.featuredPriceEtb));
var adminCloseReport_createServerFn_handler = createServerRpc({
	id: "0db4e1473bc1f02d677a1f4d69ae4b05978db4ebf8e7bc0e6482ae780b06d8e4",
	name: "adminCloseReport",
	filename: "src/lib/marketplace.functions.ts"
}, (opts) => adminCloseReport.__executeServer(opts));
var adminCloseReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ id: Number(data.id) })).handler(adminCloseReport_createServerFn_handler, async ({ data, context }) => (await api()).adminCloseReport(context.userId, data.id));
//#endregion
export { addReview_createServerFn_handler, adminAddCategory_createServerFn_handler, adminCloseReport_createServerFn_handler, adminOverview_createServerFn_handler, adminSaveSettings_createServerFn_handler, adminSetBusiness_createServerFn_handler, adminSetUser_createServerFn_handler, createBusiness_createServerFn_handler, getCards_createServerFn_handler, getMe_createServerFn_handler, getOrder_createServerFn_handler, getService_createServerFn_handler, listCategory_createServerFn_handler, listHome_createServerFn_handler, listMessages_createServerFn_handler, listThreads_createServerFn_handler, markNotificationsRead_createServerFn_handler, myFavorites_createServerFn_handler, myOrders_createServerFn_handler, openThread_createServerFn_handler, placeOrder_createServerFn_handler, quoteOrder_createServerFn_handler, reportIssue_createServerFn_handler, requestPlan_createServerFn_handler, searchListings_createServerFn_handler, sendMessage_createServerFn_handler, setOrderStatus_createServerFn_handler, setServiceActive_createServerFn_handler, studioHome_createServerFn_handler, toggleFavoriteBusiness_createServerFn_handler, toggleFavorite_createServerFn_handler, updateProfile_createServerFn_handler, upsertService_createServerFn_handler };
