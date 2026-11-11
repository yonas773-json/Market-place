import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as sendMessage, Z as useApp, d as TitleBar, i as Frame, j as listMessages } from "./shell-H-mekxI1.mjs";
import { t as AuthWall } from "./login-panel-BrGvnUai.mjs";
import { i as Route$3 } from "./router-DaDerkP-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox._id-CAjpZcvC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ThreadPage() {
	const { id } = Route$3.useParams();
	const { t } = useApp();
	const [data, setData] = (0, import_react.useState)(null);
	const [body, setBody] = (0, import_react.useState)("");
	const load = () => listMessages({ data: { threadId: Number(id) } }).then(setData).catch(() => void 0);
	(0, import_react.useEffect)(() => {
		load();
		const timer = window.setInterval(() => void load(), 4e3);
		return () => window.clearInterval(timer);
	}, [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleBar, {
		title: data?.name || t.chat,
		back: "/inbox"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWall, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 px-5 py-5",
		children: [data?.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: m.mine ? "ml-10 rounded-3xl bg-primary px-4 py-2 text-sm text-primary-ink" : "mr-10 rounded-3xl bg-card px-4 py-2 text-sm",
			children: m.body
		}, m.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				const text = body;
				setBody("");
				sendMessage({ data: {
					threadId: Number(id),
					body: text
				} }).then(setData);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: body,
				onChange: (e) => setBody(e.target.value),
				placeholder: t.typeMessage,
				className: "h-12 flex-1 rounded-full bg-chip px-4 text-sm outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "h-12 rounded-full bg-ink px-4 text-sm font-bold text-card",
				children: t.send
			})]
		})]
	}) })] });
}
//#endregion
export { ThreadPage as component };
