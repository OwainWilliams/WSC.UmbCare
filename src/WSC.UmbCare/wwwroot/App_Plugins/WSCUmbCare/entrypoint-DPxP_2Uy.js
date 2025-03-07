var U = Object.defineProperty;
var S = (s, n, r) => n in s ? U(s, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[n] = r;
var g = (s, n, r) => S(s, typeof n != "symbol" ? n + "" : n, r);
import { UMB_AUTH_CONTEXT as T } from "@umbraco-cms/backoffice/auth";
import "./breathing-countdown-BK6c2s_0.js";
var A = /\{[^{}]+\}/g, y = ({ allowReserved: s, name: n, value: r }) => {
  if (r == null) return "";
  if (typeof r == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${n}=${s ? r : encodeURIComponent(r)}`;
}, q = (s) => {
  switch (s) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, E = (s) => {
  switch (s) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, z = (s) => {
  switch (s) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, v = ({ allowReserved: s, explode: n, name: r, style: l, value: a }) => {
  if (!n) {
    let t = (s ? a : a.map((i) => encodeURIComponent(i))).join(E(l));
    switch (l) {
      case "label":
        return `.${t}`;
      case "matrix":
        return `;${r}=${t}`;
      case "simple":
        return t;
      default:
        return `${r}=${t}`;
    }
  }
  let o = q(l), e = a.map((t) => l === "label" || l === "simple" ? s ? t : encodeURIComponent(t) : y({ allowReserved: s, name: r, value: t })).join(o);
  return l === "label" || l === "matrix" ? o + e : e;
}, $ = ({ allowReserved: s, explode: n, name: r, style: l, value: a }) => {
  if (a instanceof Date) return `${r}=${a.toISOString()}`;
  if (l !== "deepObject" && !n) {
    let t = [];
    Object.entries(a).forEach(([d, f]) => {
      t = [...t, d, s ? f : encodeURIComponent(f)];
    });
    let i = t.join(",");
    switch (l) {
      case "form":
        return `${r}=${i}`;
      case "label":
        return `.${i}`;
      case "matrix":
        return `;${r}=${i}`;
      default:
        return i;
    }
  }
  let o = z(l), e = Object.entries(a).map(([t, i]) => y({ allowReserved: s, name: l === "deepObject" ? `${r}[${t}]` : t, value: i })).join(o);
  return l === "label" || l === "matrix" ? o + e : e;
}, W = ({ path: s, url: n }) => {
  let r = n, l = n.match(A);
  if (l) for (let a of l) {
    let o = !1, e = a.substring(1, a.length - 1), t = "simple";
    e.endsWith("*") && (o = !0, e = e.substring(0, e.length - 1)), e.startsWith(".") ? (e = e.substring(1), t = "label") : e.startsWith(";") && (e = e.substring(1), t = "matrix");
    let i = s[e];
    if (i == null) continue;
    if (Array.isArray(i)) {
      r = r.replace(a, v({ explode: o, name: e, style: t, value: i }));
      continue;
    }
    if (typeof i == "object") {
      r = r.replace(a, $({ explode: o, name: e, style: t, value: i }));
      continue;
    }
    if (t === "matrix") {
      r = r.replace(a, `;${y({ name: e, value: i })}`);
      continue;
    }
    let d = encodeURIComponent(t === "label" ? `.${i}` : i);
    r = r.replace(a, d);
  }
  return r;
}, O = ({ allowReserved: s, array: n, object: r } = {}) => (l) => {
  let a = [];
  if (l && typeof l == "object") for (let o in l) {
    let e = l[o];
    if (e != null) {
      if (Array.isArray(e)) {
        a = [...a, v({ allowReserved: s, explode: !0, name: o, style: "form", value: e, ...n })];
        continue;
      }
      if (typeof e == "object") {
        a = [...a, $({ allowReserved: s, explode: !0, name: o, style: "deepObject", value: e, ...r })];
        continue;
      }
      a = [...a, y({ allowReserved: s, name: o, value: e })];
    }
  }
  return a.join("&");
}, I = (s) => {
  if (!s) return;
  let n = s.split(";")[0].trim();
  if (n.startsWith("application/json") || n.endsWith("+json")) return "json";
  if (n === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((r) => n.startsWith(r))) return "blob";
  if (n.startsWith("text/")) return "text";
}, D = ({ baseUrl: s, path: n, query: r, querySerializer: l, url: a }) => {
  let o = a.startsWith("/") ? a : `/${a}`, e = s + o;
  n && (e = W({ path: n, url: e }));
  let t = r ? l(r) : "";
  return t.startsWith("?") && (t = t.substring(1)), t && (e += `?${t}`), e;
}, j = (s, n) => {
  var l;
  let r = { ...s, ...n };
  return (l = r.baseUrl) != null && l.endsWith("/") && (r.baseUrl = r.baseUrl.substring(0, r.baseUrl.length - 1)), r.headers = C(s.headers, n.headers), r;
}, C = (...s) => {
  let n = new Headers();
  for (let r of s) {
    if (!r || typeof r != "object") continue;
    let l = r instanceof Headers ? r.entries() : Object.entries(r);
    for (let [a, o] of l) if (o === null) n.delete(a);
    else if (Array.isArray(o)) for (let e of o) n.append(a, e);
    else o !== void 0 && n.set(a, typeof o == "object" ? JSON.stringify(o) : o);
  }
  return n;
}, w = class {
  constructor() {
    g(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(s) {
    return this._fns.indexOf(s) !== -1;
  }
  eject(s) {
    let n = this._fns.indexOf(s);
    n !== -1 && (this._fns = [...this._fns.slice(0, n), ...this._fns.slice(n + 1)]);
  }
  use(s) {
    this._fns = [...this._fns, s];
  }
}, N = () => ({ error: new w(), request: new w(), response: new w() }), H = { bodySerializer: (s) => JSON.stringify(s) }, P = O({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), J = { "Content-Type": "application/json" }, R = (s = {}) => ({ ...H, baseUrl: "", fetch: globalThis.fetch, headers: J, parseAs: "auto", querySerializer: P, ...s }), k = (s = {}) => {
  let n = j(R(), s), r = () => ({ ...n }), l = (e) => (n = j(n, e), r()), a = N(), o = async (e) => {
    let t = { ...n, ...e, headers: C(n.headers, e.headers) };
    t.body && t.bodySerializer && (t.body = t.bodySerializer(t.body)), t.body || t.headers.delete("Content-Type");
    let i = D({ baseUrl: t.baseUrl ?? "", path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : O(t.querySerializer), url: t.url }), d = { redirect: "follow", ...t }, f = new Request(i, d);
    for (let c of a.request._fns) f = await c(f, t);
    let _ = t.fetch, u = await _(f);
    for (let c of a.response._fns) u = await c(u, f, t);
    let h = { request: f, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return { data: {}, ...h };
      if (t.parseAs === "stream") return { data: u.body, ...h };
      let c = (t.parseAs === "auto" ? I(u.headers.get("Content-Type")) : t.parseAs) ?? "json", b = await u[c]();
      return c === "json" && t.responseTransformer && (b = await t.responseTransformer(b)), { data: b, ...h };
    }
    let m = await u.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let p = m;
    for (let c of a.error._fns) p = await c(m, u, f, t);
    if (p = p || {}, t.throwOnError) throw p;
    return { error: p, ...h };
  };
  return { connect: (e) => o({ ...e, method: "CONNECT" }), delete: (e) => o({ ...e, method: "DELETE" }), get: (e) => o({ ...e, method: "GET" }), getConfig: r, head: (e) => o({ ...e, method: "HEAD" }), interceptors: a, options: (e) => o({ ...e, method: "OPTIONS" }), patch: (e) => o({ ...e, method: "PATCH" }), post: (e) => o({ ...e, method: "POST" }), put: (e) => o({ ...e, method: "PUT" }), request: o, setConfig: l, trace: (e) => o({ ...e, method: "TRACE" }) };
};
const x = k(R()), M = (s, n) => {
  console.log("Hello from my extension 🎉"), s.consumeContext(T, async (r) => {
    const l = r.getOpenApiConfiguration();
    x.setConfig({
      baseUrl: l.base,
      credentials: l.credentials
    }), x.interceptors.request.use(async (a, o) => {
      const e = await l.token();
      return a.headers.set("Authorization", `Bearer ${e}`), a;
    });
  });
}, X = (s, n) => {
  console.log("Goodbye from my extension 👋");
};
export {
  M as onInit,
  X as onUnload
};
//# sourceMappingURL=entrypoint-DPxP_2Uy.js.map
