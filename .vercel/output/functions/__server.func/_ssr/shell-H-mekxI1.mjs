import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { t as authMiddleware } from "./middleware-C4TbYZKd.mjs";
import { a as ShoppingCart, d as MapPin, f as House, g as CalendarDays, h as ChevronLeft, i as Sprout, l as MessagesSquare, m as ChevronRight, o as ShieldCheck, p as Clock, r as Star, t as UserRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-H-mekxI1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var copy = {
	en: {
		welcome: "Welcome",
		signIn: "Sign in",
		headlineA: "Smart home,",
		headlineB: "smooth services",
		search: "Search",
		bookNow: "Book Now",
		nearby: "Nearby shops",
		trending: "Trending",
		cart: "Cart",
		emptyCart: "Your cart is empty.",
		checkout: "Checkout",
		placeOrder: "Place order",
		payNote: "This records your choice. Telebirr and CBE are not charged live yet — the shop confirms payment.",
		orders: "Orders",
		noOrders: "No orders yet.",
		messages: "Messages",
		noMessages: "No conversations yet.",
		saved: "Saved",
		noSaved: "Nothing saved yet.",
		profile: "Profile",
		language: "Language",
		appearance: "Appearance",
		light: "Light",
		dark: "Dark",
		myShop: "My shop",
		adminDesk: "Platform admin",
		openShop: "Open a shop",
		verified: "Verified",
		home: "Home",
		bookings: "Bookings",
		chat: "Chat",
		you: "You",
		compare: "Compare",
		all: "All",
		description: "Description",
		reviews: "Reviews",
		classic: "Classic",
		premium: "Premium",
		platinum: "Platinum",
		total: "Total",
		telebirr: "Telebirr",
		cbe: "CBE Birr",
		cash: "Cash",
		addCart: "Add to cart",
		favorite: "Save",
		call: "Call",
		message: "Message",
		filter: "Filters",
		popular: "Popular",
		priceLow: "Price",
		newest: "New",
		save: "Save",
		send: "Send",
		back: "Back",
		newLabel: "New",
		from: "From",
		related: "More like this",
		report: "Report a problem",
		reportSent: "Report sent.",
		added: "Added to cart",
		remove: "Remove",
		qty: "Qty",
		hours: "Hours",
		stock: "In stock",
		listings: "Listings",
		addListing: "Add listing",
		sales: "Sales",
		revenue: "Revenue",
		customers: "Customers",
		pending: "Pending",
		commission: "Commission",
		products: "Listings",
		businesses: "Shops",
		gmv: "Order volume",
		notifications: "Notifications",
		noneYet: "Nothing here yet.",
		markRead: "Mark read",
		createShop: "Create shop",
		shopName: "Shop name",
		email: "Email",
		password: "Password",
		name: "Your name",
		createAccount: "Create account",
		haveAccount: "I already have an account",
		needAccount: "New here?",
		roleShop: "I want to shop",
		roleSell: "I want to sell",
		searchServices: "Services, shops, food",
		emptyList: "Nothing matches.",
		orderPlaced: "Order placed",
		backHome: "Back home",
		loadError: "Could not load this.",
		account: "Account",
		city: "City",
		anywhere: "Anywhere",
		address: "Address",
		visitDate: "Visit date",
		note: "Note",
		payWith: "Pay with",
		phone: "Phone",
		area: "Area",
		about: "About",
		howTitle: "How it works",
		how1: "Shops list products and services in birr.",
		how2: "You compare, book, and message the owner.",
		how3: "The shop accepts the order and you track it.",
		firstAdmin: "You are the first member, so this account can run the platform.",
		shopLive: "Your shop is live. Add a listing so people can find it.",
		securityNote: "Passwords are hashed. Orders and chats stay on your account.",
		planNote: "Plans are requests only. Nothing is charged in this preview.",
		commissionNote: "Commission is stored on each order.",
		payConfirm: "Payment stays unpaid until the shop confirms it.",
		needSignIn: "Sign in to place the order. Your cart stays on this phone.",
		trackHint: "The shop updates each step.",
		cancel: "Cancel order",
		accept: "Accept",
		reject: "Reject",
		preparing: "Preparing",
		onTheWay: "On the way",
		done: "Done",
		writeReview: "Write a review",
		noReviews: "No reviews yet.",
		reviewThanks: "Thanks for the review.",
		typeMessage: "Write a message",
		startChat: "Message the shop",
		compareTitle: "Compare",
		noCompare: "Pick up to three listings to compare.",
		favShops: "Saved shops",
		favItems: "Saved listings",
		overview: "Overview",
		yourListings: "Your listings",
		noListings: "No listings yet.",
		recentOrders: "Recent orders",
		publish: "Show",
		unpublish: "Hide",
		kindService: "Service",
		kindProduct: "Product",
		update: "Update",
		status: "Status",
		people: "People",
		reports: "Reports",
		settings: "Settings",
		activity: "Activity",
		approve: "Verify",
		suspend: "Suspend",
		restore: "Restore",
		makeAdmin: "Make admin",
		removeAdmin: "Remove admin",
		addCategory: "Add category",
		free: "Free",
		growth: "Growth",
		featured: "Featured",
		requestSent: "Request saved. Nothing is charged.",
		submit: "Submit",
		signOut: "Sign out",
		passwordHint: "At least 8 characters.",
		authFail: "Check the email and password.",
		processing: "Placing order…",
		failed: "Something went wrong.",
		items: "Items",
		method: "Method",
		when: "When",
		sample: "Sample",
		openReports: "Open reports",
		users: "People",
		categoryName: "Category name",
		slug: "Slug",
		body: "What happened?",
		closeReport: "Close",
		preset: "Preset photo",
		upload: "Upload",
		price: "Price",
		was: "Was",
		badge: "Badge",
		blurb: "Short line",
		details: "Details",
		title: "Title",
		hoursPh: "8:00–18:00",
		continueGoogle: "Continue with Google",
		continueX: "Continue with X",
		english: "English",
		amharic: "አማርኛ",
		shops: "Shops",
		seeAll: "See all",
		results: "Results",
		maxPrice: "Max price",
		stars: "Rating",
		anyStars: "Any",
		reset: "Reset",
		support: "24/7 Support",
		servicePerson: "Service man",
		contact: "Shop",
		placed: "Placed",
		accepted: "Accepted",
		rejected: "Rejected",
		cancelled: "Cancelled",
		ontheway: "On the way",
		savedOk: "Saved",
		viewCart: "View cart",
		book: "Book",
		platform: "JsonCONNECT",
		roleHint: "You can open a shop later. The first account also gets platform tools.",
		emptyChart: "No orders this week.",
		week: "7 days",
		image: "Photo",
		stockCount: "Stock",
		optional: "Optional",
		create: "Create",
		manage: "Manage",
		tint: "Color",
		featuredFee: "Featured price (ETB)",
		bps: "Commission basis points",
		saveSettings: "Save settings",
		customer: "Customer",
		seller: "Seller",
		admin: "Admin",
		owned: "Member shop",
		catalog: "Catalog"
	},
	am: {
		welcome: "እንኳን ደህና መጡ",
		signIn: "ይግቡ",
		headlineA: "ብልህ ቤት፣",
		headlineB: "ለስላሳ አገልግሎት",
		search: "ፈልግ",
		bookNow: "አሁን ይዘዙ",
		nearby: "በአቅራቢያ ያሉ ሱቆች",
		trending: "ተወዳጅ",
		cart: "ጋሪ",
		emptyCart: "ጋሪዎ ባዶ ነው።",
		checkout: "ክፍያ",
		placeOrder: "ትዕዛዝ ላክ",
		payNote: "ምርጫዎ ይመዘገባል። ቴሌብር እና ሲቢኢ እስካሁን በቀጥታ አይቆረጡም — ሱቁ ያረጋግጣል።",
		orders: "ትዕዛዞች",
		noOrders: "እስካሁን ትዕዛዝ የለም።",
		messages: "መልዕክቶች",
		noMessages: "እስካሁን ውይይት የለም።",
		saved: "የተቀመጡ",
		noSaved: "እስካሁን የተቀመጠ የለም።",
		profile: "መገለጫ",
		language: "ቋንቋ",
		appearance: "መልክ",
		light: "ብርሃን",
		dark: "ጨለማ",
		myShop: "ሱቄ",
		adminDesk: "የመድረክ አስተዳዳሪ",
		openShop: "ሱቅ ይክፈቱ",
		verified: "የተረጋገጠ",
		home: "መነሻ",
		bookings: "ትዕዛዞች",
		chat: "ውይይት",
		you: "እርስዎ",
		compare: "አወዳድር",
		all: "ሁሉም",
		description: "መግለጫ",
		reviews: "አስተያየቶች",
		classic: "ክላሲክ",
		premium: "ፕሪሚየም",
		platinum: "ፕላቲነም",
		total: "ድምር",
		telebirr: "ቴሌብር",
		cbe: "ሲቢኢ ብር",
		cash: "ጥሬ ገንዘብ",
		addCart: "ወደ ጋሪ",
		favorite: "አስቀምጥ",
		call: "ይደውሉ",
		message: "መልዕክት",
		filter: "ማጣሪያ",
		popular: "ተወዳጅ",
		priceLow: "ዋጋ",
		newest: "አዲስ",
		save: "አስቀምጥ",
		send: "ላክ",
		back: "ተመለስ",
		newLabel: "አዲስ",
		from: "ከ",
		related: "ተመሳሳይ",
		report: "ችግር ሪፖርት ያድርጉ",
		reportSent: "ሪፖርቱ ተልኳል።",
		added: "ወደ ጋሪ ገብቷል",
		remove: "አስወግድ",
		qty: "ብዛት",
		hours: "ሰዓት",
		stock: "ክምችት",
		listings: "ዝርዝሮች",
		addListing: "ዝርዝር ጨምር",
		sales: "ሽያጭ",
		revenue: "ገቢ",
		customers: "ደንበኞች",
		pending: "በመጠባበቅ ላይ",
		commission: "ኮሚሽን",
		products: "ዝርዝሮች",
		businesses: "ሱቆች",
		gmv: "የትዕዛዝ መጠን",
		notifications: "ማሳወቂያዎች",
		noneYet: "እስካሁን የለም።",
		markRead: "እንደተነበበ",
		createShop: "ሱቅ ፍጠር",
		shopName: "የሱቅ ስም",
		email: "ኢሜይል",
		password: "የይለፍ ቃል",
		name: "ስም",
		createAccount: "መለያ ፍጠር",
		haveAccount: "መለያ አለኝ",
		needAccount: "አዲስ ነዎት?",
		roleShop: "መግዛት እፈልጋለሁ",
		roleSell: "መሸጥ እፈልጋለሁ",
		searchServices: "አገልግሎት፣ ሱቅ፣ ምግብ",
		emptyList: "የሚዛመድ የለም።",
		orderPlaced: "ትዕዛዙ ተልኳል",
		backHome: "ወደ መነሻ",
		loadError: "መጫን አልተሳካም።",
		account: "መለያ",
		city: "ከተማ",
		anywhere: "ሁሉም ከተሞች",
		address: "አድራሻ",
		visitDate: "የጉብኝት ቀን",
		note: "ማስታወሻ",
		payWith: "የክፍያ መንገድ",
		phone: "ስልክ",
		area: "አካባቢ",
		about: "ስለ",
		howTitle: "እንዴት ይሰራል",
		how1: "ሱቆች እቃና አገልግሎት በብር ያስቀምጣሉ።",
		how2: "ያወዳድራሉ፣ ይዘዛሉ፣ ከባለቤቱ ጋር ይነጋገራሉ።",
		how3: "ሱቁ ትዕዛዙን ይቀበላል፣ እርስዎም ይከታተላሉ።",
		firstAdmin: "የመጀመሪያ አባል ስለሆኑ ይህ መለያ መድረኩን ያስተዳድራል።",
		shopLive: "ሱቅዎ ቀርቷል። ዝርዝር ይጨምሩ።",
		securityNote: "የይለፍ ቃላት ይመሰጠራሉ። ትዕዛዝና ውይይት በመለያዎ ይቆያሉ።",
		planNote: "እቅዶች ጥያቄ ብቻ ናቸው። ቀጥታ ክፍያ የለም።",
		commissionNote: "ኮሚሽን በእያንዳንዱ ትዕዛዝ ይመዘገባል።",
		payConfirm: "ሱቁ እስካረጋገጠ ድረስ ክፍያው ያልተከፈለ ነው።",
		needSignIn: "ትዕዛዝ ለመላክ ይግቡ። ጋሪው በዚህ ስልክ ይቆያል።",
		trackHint: "ሱቁ እያንዳንዱን ደረጃ ያዘምናል።",
		cancel: "ትዕዛዝ ሰርዝ",
		accept: "ተቀበል",
		reject: "ውድቅ አድርግ",
		preparing: "በዝግጅት ላይ",
		onTheWay: "በመንገድ ላይ",
		done: "ተጠናቋል",
		writeReview: "አስተያየት ይጻፉ",
		noReviews: "እስካሁን አስተያየት የለም።",
		reviewThanks: "እናመሰግናለን።",
		typeMessage: "መልዕክት ይጻፉ",
		startChat: "ለሱቁ ይጻፉ",
		compareTitle: "ማወዳደር",
		noCompare: "እስከ ሦስት ዝርዝር ይምረጡ።",
		favShops: "የተቀመጡ ሱቆች",
		favItems: "የተቀመጡ ዝርዝሮች",
		overview: "አጠቃላይ",
		yourListings: "የእርስዎ ዝርዝሮች",
		noListings: "እስካሁን ዝርዝር የለም።",
		recentOrders: "የቅርብ ትዕዛዞች",
		publish: "አሳይ",
		unpublish: "ደብቅ",
		kindService: "አገልግሎት",
		kindProduct: "እቃ",
		update: "አዘምን",
		status: "ሁኔታ",
		people: "ሰዎች",
		reports: "ሪፖርቶች",
		settings: "ቅንብሮች",
		activity: "እንቅስቃሴ",
		approve: "አረጋግጥ",
		suspend: "አግድ",
		restore: "መልስ",
		makeAdmin: "አስተዳዳሪ አድርግ",
		removeAdmin: "አስተዳዳሪነት አንሳ",
		addCategory: "ምድብ ጨምር",
		free: "ነፃ",
		growth: "እድገት",
		featured: "የተለየ",
		requestSent: "ጥያቄው ተቀምጧል። ክፍያ የለም።",
		submit: "ላክ",
		signOut: "ውጣ",
		passwordHint: "ቢያንስ 8 ቁምፊ።",
		authFail: "ኢሜይልና የይለፍ ቃል ያረጋግጡ።",
		processing: "በመላክ ላይ…",
		failed: "አልተሳካም።",
		items: "እቃዎች",
		method: "መንገድ",
		when: "መቼ",
		sample: "ናሙና",
		openReports: "ክፍት ሪፖርቶች",
		users: "ሰዎች",
		categoryName: "የምድብ ስም",
		slug: "ስያሜ",
		body: "ምን ተፈጠረ?",
		closeReport: "ዝጋ",
		preset: "የተዘጋጀ ፎቶ",
		upload: "ስቀል",
		price: "ዋጋ",
		was: "የቀድሞ",
		badge: "ባጅ",
		blurb: "አጭር መስመር",
		details: "ዝርዝር",
		title: "ርዕስ",
		hoursPh: "8:00–18:00",
		continueGoogle: "በጉግል ይቀጥሉ",
		continueX: "በ𝕏 ይቀጥሉ",
		english: "English",
		amharic: "አማርኛ",
		shops: "ሱቆች",
		seeAll: "ሁሉንም",
		results: "ውጤቶች",
		maxPrice: "ከፍተኛ ዋጋ",
		stars: "ደረጃ",
		anyStars: "ሁሉም",
		reset: "አጽዳ",
		support: "24/7 ድጋፍ",
		servicePerson: "የአገልግሎት ሠራተኛ",
		contact: "ሱቅ",
		placed: "ተልኳል",
		accepted: "ተቀባይነት አግኝቷል",
		rejected: "ተውድቋል",
		cancelled: "ተሰርዟል",
		ontheway: "በመንገድ ላይ",
		savedOk: "ተቀምጧል",
		viewCart: "ጋሪውን ይመልከቱ",
		book: "ይዘዙ",
		platform: "JsonCONNECT",
		roleHint: "ቆይተው ሱቅ መክፈት ይችላሉ። የመጀመሪያው መለያ የመድረክ መሣሪያም ያገኛል።",
		emptyChart: "በዚህ ሳምንት ትዕዛዝ የለም።",
		week: "7 ቀናት",
		image: "ፎቶ",
		stockCount: "ክምችት",
		optional: "አማራጭ",
		create: "ፍጠር",
		manage: "አስተዳድር",
		tint: "ቀለም",
		featuredFee: "የተለየ ዝርዝር ዋጋ (ብር)",
		bps: "የኮሚሽን ነጥብ",
		saveSettings: "ቅንብር አስቀምጥ",
		customer: "ደንበኛ",
		seller: "ሻጭ",
		admin: "አስተዳዳሪ",
		owned: "የአባል ሱቅ",
		catalog: "ካታሎግ"
	}
};
function money(amount, lang) {
	const num = new Intl.NumberFormat("en-US").format(Math.round(amount));
	return lang === "am" ? `ብር ${num}` : `ETB ${num}`;
}
function label(lang, item) {
	return lang === "am" && item.titleAm ? item.titleAm : item.title;
}
function line(lang, item) {
	return lang === "am" && item.blurbAm ? item.blurbAm : item.blurb;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var listHome = createServerFn({ method: "GET" }).validator((data) => ({ city: String(data?.city ?? "").slice(0, 40) })).handler(createSsrRpc("4a47575e3cc74b0922feaafba3647be81c0d3095e72d6057209004fb30122a28"));
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
})).handler(createSsrRpc("aaa6ef392d8609a10c69ba88d3938c07db53a86db53464957856a2a4e3d97814"));
var searchListings = createServerFn({ method: "GET" }).validator((data) => ({ q: String(data?.q ?? "").slice(0, 60) })).handler(createSsrRpc("36133ab618695e390af528c581dec9950ee12b9de240d2bfd6bfd6a82c7732fe"));
var getService = createServerFn({ method: "GET" }).validator((data) => {
	const id = Number(data?.id);
	if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid listing");
	return { id };
}).handler(createSsrRpc("4733fe552c043bc4d85b0d2aa900353bb580b7525c616c1a1b56b66d266f0035"));
var getCards = createServerFn({ method: "GET" }).validator((data) => ({ ids: (Array.isArray(data?.ids) ? data.ids : []).map(Number).filter((id) => Number.isInteger(id) && id > 0).slice(0, 3) })).handler(createSsrRpc("1e35befe4103f46db1fe1ec5d426463ecb51c6ff8d25193533c7b4662481e37a"));
var quoteOrder = createServerFn({ method: "POST" }).validator((data) => ({ items: items(data?.items) })).handler(createSsrRpc("c731617e21980817af8963cee9bd653965998d1f6b7d5a547de7ed403b7fbe5e"));
var getMe = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ intent: data?.intent === "business" ? "business" : "customer" })).handler(createSsrRpc("3ce1264d7709396053639e7a25b69753336c6ffd9b267460fe518504239b00b5"));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("76326526f60dadafe126e87102241791c79dfc0134b3a5bbbbe448b7ec5998cb"));
var placeOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	items: items(data.items),
	address: String(data.address ?? ""),
	city: String(data.city ?? ""),
	scheduledFor: String(data.scheduledFor ?? ""),
	note: String(data.note ?? ""),
	paymentMethod: data.paymentMethod === "cbe" || data.paymentMethod === "cash" ? data.paymentMethod : "telebirr"
})).handler(createSsrRpc("7267293c51aaef5f57a57108aeaa4b7dc46c3266efb9a447eace7f1ba497c233"));
var myOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("60abb4ab3ab08a113dd191e7f4ad1c1e81181cc6d7eacdb63d88a1c815be4e41"));
var getOrder = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => ({ id: Number(data.id) })).handler(createSsrRpc("b4bfbb7d3539323a0b3b9eafcc27eecd9667e33ccd6f4d68def287b49579c1d8"));
var setOrderStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	id: Number(data.id),
	status: String(data.status)
})).handler(createSsrRpc("411f90603fa5ea9b9f200e55f46d134fac0bbc3f4ead2dc69f559963398d589a"));
var toggleFavorite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ serviceId: Number(data.serviceId) })).handler(createSsrRpc("f3e0aafff82cd57ae1f7fc172038867ad9fee5e92dbd133ad473ccedf80d0bbe"));
createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ businessId: Number(data.businessId) })).handler(createSsrRpc("7919199b13b7d8cfa325a1abcf2be47397d7fd2306462993ef536124b4de01ae"));
var myFavorites = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("c851fa72cccd222bcf906172f80265b98e8c9f7242e59f2824e0fab3b720f3c8"));
var openThread = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ businessId: Number(data.businessId) })).handler(createSsrRpc("ad18e22b156e0039b1ef4237f0e9aadc5372b9d4c07d56877814034b4104483f"));
var listThreads = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fce7f6ae6c4a6ff3f9b8ec9c0125d92329206b9c270ad5138cd7dc6e0ecb3951"));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((data) => ({ threadId: Number(data.threadId) })).handler(createSsrRpc("32fdc5c13fd4edfe98bc161b84c4ae43592c74f235ad614c5b2f6114ebcacbfb"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	threadId: Number(data.threadId),
	body: String(data.body ?? "")
})).handler(createSsrRpc("a4f1c8371f5fd235a8131ed10fe5bf35a8555ca975cde7c54099d2ea59411f95"));
var markNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("8c37bfb0cf1f15101686f320e33b017e70733c323fb661dc2a0ebdedb6bcbaa6"));
var createBusiness = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("d60286891d8b32993843a2f030df22dc9e2a6c8ef18ddc6997f37f7548c02349"));
var studioHome = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9fe0e585fee1d490dd2ddec40a50db57cf234d27b7d542d019940533bf359da3"));
var upsertService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	...data,
	id: Number(data.id) || 0,
	price: Math.round(Number(data.price) || 0),
	compareAt: Math.round(Number(data.compareAt) || 0),
	pricePremium: Math.round(Number(data.pricePremium) || 0),
	pricePlatinum: Math.round(Number(data.pricePlatinum) || 0),
	stock: Math.round(Number(data.stock) || 0),
	kind: data.kind === "product" ? "product" : "service"
})).handler(createSsrRpc("8dea946806a8fcf5cdad6052b14114357c71481431709a0cd767ce6477943f3f"));
var setServiceActive = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	id: Number(data.id),
	active: Boolean(data.active)
})).handler(createSsrRpc("ed5a226dd60bd7bb438fa6d9f28cf8614b80fa82f2e7f43c60a232bbaaa21671"));
var requestPlan = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ plan: data.plan === "growth" || data.plan === "featured" ? data.plan : "free" })).handler(createSsrRpc("7d9602a2c81e593a33a5f782f0268acc4bae3c291a05f9de575cbf76e2c84127"));
var addReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	serviceId: Number(data.serviceId),
	stars: Number(data.stars),
	body: String(data.body ?? "")
})).handler(createSsrRpc("c339428442caa418ab903e3d13a57fa6d372b3c642bad0222aa5f46be37fed6b"));
var reportIssue = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	businessId: Number(data.businessId) || 0,
	serviceId: Number(data.serviceId) || 0,
	body: String(data.body ?? "")
})).handler(createSsrRpc("74f5cce5e40d3c340e24d947ac01a99d844518e5fd616539e0fa4cb9dfd171c6"));
var adminOverview = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("059ec78fbb5c34de12dc7b935831000b8677c081415b9d39222b1057cd2c9369"));
var adminSetBusiness = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	id: Number(data.id),
	verified: Boolean(data.verified),
	suspended: Boolean(data.suspended)
})).handler(createSsrRpc("1d8cbfd8c30f386358de9fa447c438d6e5c3532743b7c1596077b7907312c9db"));
var adminSetUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("2a560180facf5b2700bce5ca22e649aa4dff7a949b9f8f259a7f940d67827e1d"));
var adminAddCategory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(createSsrRpc("8c781bb9791891058c3af972f0a33d09491f8df49ba99ea6caaca28a59a96e5d"));
var adminSaveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({
	commissionBps: Number(data.commissionBps),
	featuredPriceEtb: Number(data.featuredPriceEtb)
})).handler(createSsrRpc("1ce9968c64759a67fcc9c62d081a328c57df62debce10e64a7a7258f84c67619"));
var adminCloseReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => ({ id: Number(data.id) })).handler(createSsrRpc("0db4e1473bc1f02d677a1f4d69ae4b05978db4ebf8e7bc0e6482ae780b06d8e4"));
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var Ctx = (0, import_react.createContext)(null);
function useApp() {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("missing app");
	return v;
}
function validLine(x) {
	if (!x || typeof x !== "object") return false;
	const r = x;
	return Number.isInteger(r.serviceId) && (r.tier === "classic" || r.tier === "premium" || r.tier === "platinum") && Number.isInteger(r.qty);
}
function Providers({ children }) {
	const [lang, setLang] = (0, import_react.useState)("en");
	const [theme, setTheme] = (0, import_react.useState)("light");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [lines, setLines] = (0, import_react.useState)([]);
	const [compare, setCompare] = (0, import_react.useState)([]);
	const [flash, setFlash] = (0, import_react.useState)("");
	const { user } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		try {
			if (localStorage.getItem("jc-theme") === "dark") setTheme("dark");
			if (localStorage.getItem("jc-lang") === "am") setLang("am");
			const cart = JSON.parse(localStorage.getItem("jc-cart") || "[]");
			if (Array.isArray(cart)) setLines(cart.filter(validLine));
			const cmp = JSON.parse(localStorage.getItem("jc-compare") || "[]");
			if (Array.isArray(cmp)) setCompare(cmp.map(Number).filter((id) => Number.isInteger(id) && id > 0).slice(0, 3));
		} catch {}
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("jc-theme", theme);
		localStorage.setItem("jc-lang", lang);
		localStorage.setItem("jc-cart", JSON.stringify(lines));
		localStorage.setItem("jc-compare", JSON.stringify(compare));
	}, [
		theme,
		lang,
		lines,
		compare,
		ready
	]);
	(0, import_react.useEffect)(() => {
		if (!user?.id || user.isDevFallback) return;
		getMe({ data: { intent: localStorage.getItem("jc-intent") === "business" ? "business" : "customer" } }).then(() => localStorage.removeItem("jc-intent")).catch(() => void 0);
	}, [user?.id, user?.isDevFallback]);
	const value = (0, import_react.useMemo)(() => {
		const add = (item) => {
			setLines((cur) => {
				const i = cur.findIndex((l) => l.serviceId === item.serviceId && l.tier === item.tier);
				if (i === -1) return [...cur, item];
				const next = cur.slice();
				next[i] = {
					...next[i],
					qty: Math.min(20, next[i].qty + item.qty)
				};
				return next;
			});
		};
		return {
			lang,
			setLang,
			theme,
			setTheme,
			t: copy[lang],
			lines,
			add,
			setQty: (serviceId, tier, qty) => setLines((cur) => cur.map((l) => l.serviceId === serviceId && l.tier === tier ? {
				...l,
				qty
			} : l)),
			remove: (serviceId, tier) => setLines((cur) => cur.filter((l) => !(l.serviceId === serviceId && l.tier === tier))),
			clear: () => setLines([]),
			count: lines.reduce((s, l) => s + l.qty, 0),
			compare,
			toggleCompare: (id) => setCompare((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= 3 ? cur : [...cur, id]),
			flash,
			ping: (text) => {
				setFlash(text);
				window.setTimeout(() => setFlash(""), 1600);
			}
		};
	}, [
		lang,
		theme,
		lines,
		compare,
		flash
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
var tintBg = {
	mint: "bg-mint",
	blush: "bg-blush",
	peach: "bg-peach",
	lilac: "bg-lilac",
	sky: "bg-sky",
	butter: "bg-butter"
};
var chipOn = "inline-flex h-10 shrink-0 items-center rounded-full bg-ink px-4 text-sm font-semibold text-card";
var chipOff = "inline-flex h-10 shrink-0 items-center rounded-full bg-chip px-4 text-sm font-semibold text-ink";
function Chips({ categories, active, city }) {
	const { lang, t } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			search: { city },
			className: active === "all" ? chipOn : chipOff,
			children: t.all
		}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/c/$slug",
			params: { slug: c.slug },
			search: {
				q: "",
				city,
				max: 0,
				stars: 0,
				sort: "popular"
			},
			className: active === c.slug ? chipOn : chipOff,
			children: lang === "am" && c.nameAm ? c.nameAm : c.name
		}, c.slug))]
	});
}
function CartButton() {
	const { count } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/cart",
		"aria-label": "Cart",
		className: "relative grid size-11 place-items-center rounded-full bg-card text-ink shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5" }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary text-xs font-bold text-primary-ink",
			children: count
		}) : null]
	});
}
function TitleBar({ title, back }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-5 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: back,
				"aria-label": "Back",
				className: "grid size-11 place-items-center rounded-full bg-chip text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-base font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartButton, {})
		]
	});
}
function Stars({ tenths, count }) {
	const { t } = useApp();
	if (!count) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs font-semibold text-muted",
		children: t.newLabel
	});
	const full = Math.round(tenths / 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-semibold text-ink",
		children: [Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: i < full ? "size-3.5 fill-primary text-primary" : "size-3.5 text-line" }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: (tenths / 10).toFixed(1)
		})]
	});
}
function HeroCard({ item }) {
	const { lang, t } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/s/$id",
		params: { id: String(item.id) },
		className: `relative block min-h-80 overflow-hidden rounded-sheet p-4 ${tintBg[item.tint] || "bg-mint"}`,
		children: [
			item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.image,
				alt: "",
				className: "pointer-events-none absolute bottom-0 right-0 h-72 w-44 object-cover object-top"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center gap-2",
				children: [item.support ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
						" ",
						item.support
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto rounded-full bg-card px-3 py-1 text-sm font-bold text-ink",
					children: item.badge
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "relative mt-6 flex items-center gap-1.5 text-sm font-medium text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-4" }),
					" ",
					item.perk || line(lang, item)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "relative mt-1 max-w-40 text-3xl font-extrabold leading-none tracking-tight text-ink",
				children: label(lang, item)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-4" }),
					" ",
					t.bookNow
				]
			})
		]
	});
}
function SpotlightCard({ item }) {
	const { lang, t } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/s/$id",
		params: { id: String(item.id) },
		className: `block overflow-hidden rounded-sheet p-4 ${tintBg[item.tint] || "bg-mint"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-base font-bold text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-full bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-4" })
						}), label(lang, item)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-40 text-sm text-ink",
						children: line(lang, item)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-card",
						children: t.bookNow
					})
				]
			}), item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.image,
				alt: "",
				className: "h-36 w-28 shrink-0 rounded-2xl object-cover object-top"
			}) : null]
		})
	});
}
function ListingRow({ item }) {
	const { lang } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/s/$id",
		params: { id: String(item.id) },
		className: `flex items-center gap-3 rounded-sheet p-3 ${tintBg[item.tint] || "bg-chip"}`,
		children: [
			item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: item.image,
				alt: "",
				className: "size-16 shrink-0 rounded-2xl object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-16 shrink-0 rounded-2xl bg-card" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate font-bold text-ink",
					children: label(lang, item)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block text-sm text-ink/80",
					children: line(lang, item)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-9 shrink-0 place-items-center rounded-full bg-card text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
			})
		]
	});
}
function ShopPill({ shop }) {
	const { t } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/c/$slug",
		params: { slug: "all" },
		search: {
			q: shop.name,
			city: "",
			max: 0,
			stars: 0,
			sort: "popular"
		},
		className: "flex w-40 shrink-0 flex-col gap-2 rounded-sheet bg-card p-3 shadow-sm",
		children: [
			shop.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: shop.logo,
				alt: "",
				className: "h-20 w-full rounded-2xl object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-20 rounded-2xl bg-chip" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate text-sm font-bold",
				children: shop.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
					" ",
					shop.area || shop.city,
					shop.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
						className: "size-3 text-primary",
						"aria-label": t.verified
					}) : null
				]
			})
		]
	});
}
function TabBar() {
	const { t } = useApp();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const tabs = [
		{
			to: "/",
			icon: House,
			label: t.home,
			on: path === "/"
		},
		{
			to: "/orders",
			icon: CalendarDays,
			label: t.bookings,
			on: path.startsWith("/orders")
		},
		{
			to: "/inbox",
			icon: MessagesSquare,
			label: t.chat,
			on: path.startsWith("/inbox")
		},
		{
			to: "/me",
			icon: UserRound,
			label: t.you,
			on: path.startsWith("/me")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "mx-4 mb-4 flex items-center justify-between rounded-full border border-line bg-card px-2 py-2 shadow-lg",
		children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: tab.to,
			"aria-label": tab.label,
			className: tab.on ? "grid size-12 place-items-center rounded-full bg-primary text-primary-ink" : "grid size-12 place-items-center text-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tab.icon, { className: "size-5" })
		}, tab.to))
	});
}
function Frame({ children, dock }) {
	const { t, compare, flash } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-canvas text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid min-h-dvh w-full max-w-6xl md:grid-cols-[28rem_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-dvh min-w-0 flex-col md:border-r md:border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children
					}),
					flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-5 mb-2 rounded-full bg-ink px-4 py-2 text-center text-sm font-semibold text-card",
						children: flash
					}) : null,
					compare.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/compare",
						className: "mx-4 mb-2 flex items-center justify-between rounded-full bg-ink px-4 py-3 text-sm font-semibold text-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t.compare,
							" (",
							compare.length,
							")"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky bottom-0 z-20",
						children: dock ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden px-8 py-10 md:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold tracking-wide text-primary",
						children: t.platform
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 max-w-sm text-4xl font-extrabold leading-none tracking-tight",
						children: [
							t.headlineA,
							" ",
							t.headlineB
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-muted",
						children: t.how1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 space-y-4",
						children: [
							t.how1,
							t.how2,
							t.how3
						].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-ink",
								children: i + 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pt-1 text-sm",
								children: step
							})]
						}, step))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-10 text-sm text-muted",
						children: t.payNote
					})
				]
			})]
		})
	});
}
function statusText(t, status) {
	return {
		placed: t.placed,
		accepted: t.accepted,
		rejected: t.rejected,
		preparing: t.preparing,
		ontheway: t.ontheway,
		done: t.done,
		cancelled: t.cancelled
	}[status] ?? status;
}
function Field({ label: name, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold text-muted",
			children: name
		}), children]
	});
}
var inputClass = "h-12 w-full rounded-full bg-chip px-4 text-sm text-ink outline-none ring-primary focus:ring-2";
var btnClass = "h-12 w-full rounded-full bg-primary text-sm font-bold text-primary-ink disabled:opacity-60";
var ghostClass = "h-12 w-full rounded-full bg-ink text-sm font-bold text-card";
//#endregion
export { useCurrentUserState as $, listHome as A, reportIssue as B, getOrder as C, label as D, inputClass as E, myFavorites as F, setServiceActive as G, searchListings as H, myOrders as I, toggleFavorite as J, statusText as K, openThread as L, listThreads as M, markNotificationsRead as N, line as O, money as P, useCurrentUser as Q, placeOrder as R, getMe as S, ghostClass as T, sendMessage as U, requestPlan as V, setOrderStatus as W, upsertService as X, updateProfile as Y, useApp as Z, adminSetBusiness as _, HeroCard as a, createBusiness as b, ShopPill as c, TitleBar as d, addReview as f, adminSaveSettings as g, adminOverview as h, Frame as i, listMessages as j, listCategory as k, SpotlightCard as l, adminCloseReport as m, Chips as n, ListingRow as o, adminAddCategory as p, studioHome as q, Field as r, Providers as s, CartButton as t, Stars as u, adminSetUser as v, getService as w, getCards as x, btnClass as y, quoteOrder as z };
