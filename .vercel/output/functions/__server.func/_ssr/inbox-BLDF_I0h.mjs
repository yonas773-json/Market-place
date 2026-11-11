import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as listThreads, Z as useApp, d as TitleBar, i as Frame } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-BLDF_I0h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InboxPage() {
	const { t } = useApp();
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listThreads().then(setRows).catch(() => setRows([]));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: t.messages,
		back: "/"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 px-5 py-5",
		children: [!rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: t.noMessages
		}) : null, rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/inbox/$id",
			params: { id: String(row.id) },
			className: "block rounded-sheet bg-card p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-bold",
				children: row.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm text-muted",
				children: row.lastBody || t.startChat
			})]
		}, row.id))]
	}) })] });
}
//#endregion
export { InboxPage as component };
