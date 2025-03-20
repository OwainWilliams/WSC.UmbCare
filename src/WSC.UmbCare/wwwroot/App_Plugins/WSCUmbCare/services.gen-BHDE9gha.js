var U = Object.defineProperty;
var q = (s, t, a) => t in s ? U(s, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : s[t] = a;
var g = (s, t, a) => q(s, typeof t != "symbol" ? t + "" : t, a);
var T = /\{[^{}]+\}/g, b = ({ allowReserved: s, name: t, value: a }) => {
  if (a == null) return "";
  if (typeof a == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${t}=${s ? a : encodeURIComponent(a)}`;
}, A = (s) => {
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
}, _ = (s) => {
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
}, W = (s) => {
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
}, x = ({ allowReserved: s, explode: t, name: a, style: i, value: l }) => {
  if (!t) {
    let r = (s ? l : l.map((o) => encodeURIComponent(o))).join(_(i));
    switch (i) {
      case "label":
        return `.${r}`;
      case "matrix":
        return `;${a}=${r}`;
      case "simple":
        return r;
      default:
        return `${a}=${r}`;
    }
  }
  let n = A(i), e = l.map((r) => i === "label" || i === "simple" ? s ? r : encodeURIComponent(r) : b({ allowReserved: s, name: a, value: r })).join(n);
  return i === "label" || i === "matrix" ? n + e : e;
}, $ = ({ allowReserved: s, explode: t, name: a, style: i, value: l }) => {
  if (l instanceof Date) return `${a}=${l.toISOString()}`;
  if (i !== "deepObject" && !t) {
    let r = [];
    Object.entries(l).forEach(([d, c]) => {
      r = [...r, d, s ? c : encodeURIComponent(c)];
    });
    let o = r.join(",");
    switch (i) {
      case "form":
        return `${a}=${o}`;
      case "label":
        return `.${o}`;
      case "matrix":
        return `;${a}=${o}`;
      default:
        return o;
    }
  }
  let n = W(i), e = Object.entries(l).map(([r, o]) => b({ allowReserved: s, name: i === "deepObject" ? `${a}[${r}]` : r, value: o })).join(n);
  return i === "label" || i === "matrix" ? n + e : e;
}, E = ({ path: s, url: t }) => {
  let a = t, i = t.match(T);
  if (i) for (let l of i) {
    let n = !1, e = l.substring(1, l.length - 1), r = "simple";
    e.endsWith("*") && (n = !0, e = e.substring(0, e.length - 1)), e.startsWith(".") ? (e = e.substring(1), r = "label") : e.startsWith(";") && (e = e.substring(1), r = "matrix");
    let o = s[e];
    if (o == null) continue;
    if (Array.isArray(o)) {
      a = a.replace(l, x({ explode: n, name: e, style: r, value: o }));
      continue;
    }
    if (typeof o == "object") {
      a = a.replace(l, $({ explode: n, name: e, style: r, value: o }));
      continue;
    }
    if (r === "matrix") {
      a = a.replace(l, `;${b({ name: e, value: o })}`);
      continue;
    }
    let d = encodeURIComponent(r === "label" ? `.${o}` : o);
    a = a.replace(l, d);
  }
  return a;
}, S = ({ allowReserved: s, array: t, object: a } = {}) => (i) => {
  let l = [];
  if (i && typeof i == "object") for (let n in i) {
    let e = i[n];
    if (e != null) {
      if (Array.isArray(e)) {
        l = [...l, x({ allowReserved: s, explode: !0, name: n, style: "form", value: e, ...t })];
        continue;
      }
      if (typeof e == "object") {
        l = [...l, $({ allowReserved: s, explode: !0, name: n, style: "deepObject", value: e, ...a })];
        continue;
      }
      l = [...l, b({ allowReserved: s, name: n, value: e })];
    }
  }
  return l.join("&");
}, z = (s) => {
  if (!s) return;
  let t = s.split(";")[0].trim();
  if (t.startsWith("application/json") || t.endsWith("+json")) return "json";
  if (t === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((a) => t.startsWith(a))) return "blob";
  if (t.startsWith("text/")) return "text";
}, D = ({ baseUrl: s, path: t, query: a, querySerializer: i, url: l }) => {
  let n = l.startsWith("/") ? l : `/${l}`, e = s + n;
  t && (e = E({ path: t, url: e }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (e += `?${r}`), e;
}, j = (s, t) => {
  var i;
  let a = { ...s, ...t };
  return (i = a.baseUrl) != null && i.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = O(s.headers, t.headers), a;
}, O = (...s) => {
  let t = new Headers();
  for (let a of s) {
    if (!a || typeof a != "object") continue;
    let i = a instanceof Headers ? a.entries() : Object.entries(a);
    for (let [l, n] of i) if (n === null) t.delete(l);
    else if (Array.isArray(n)) for (let e of n) t.append(l, e);
    else n !== void 0 && t.set(l, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return t;
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
    let t = this._fns.indexOf(s);
    t !== -1 && (this._fns = [...this._fns.slice(0, t), ...this._fns.slice(t + 1)]);
  }
  use(s) {
    this._fns = [...this._fns, s];
  }
}, I = () => ({ error: new w(), request: new w(), response: new w() }), N = { bodySerializer: (s) => JSON.stringify(s) }, P = S({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), H = { "Content-Type": "application/json" }, C = (s = {}) => ({ ...N, baseUrl: "", fetch: globalThis.fetch, headers: H, parseAs: "auto", querySerializer: P, ...s }), J = (s = {}) => {
  let t = j(C(), s), a = () => ({ ...t }), i = (e) => (t = j(t, e), a()), l = I(), n = async (e) => {
    let r = { ...t, ...e, headers: O(t.headers, e.headers) };
    r.body && r.bodySerializer && (r.body = r.bodySerializer(r.body)), r.body || r.headers.delete("Content-Type");
    let o = D({ baseUrl: r.baseUrl ?? "", path: r.path, query: r.query, querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : S(r.querySerializer), url: r.url }), d = { redirect: "follow", ...r }, c = new Request(o, d);
    for (let f of l.request._fns) c = await f(c, r);
    let R = r.fetch, u = await R(c);
    for (let f of l.response._fns) u = await f(u, c, r);
    let h = { request: c, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return { data: {}, ...h };
      if (r.parseAs === "stream") return { data: u.body, ...h };
      let f = (r.parseAs === "auto" ? z(u.headers.get("Content-Type")) : r.parseAs) ?? "json", y = await u[f]();
      return f === "json" && r.responseTransformer && (y = await r.responseTransformer(y)), { data: y, ...h };
    }
    let m = await u.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let p = m;
    for (let f of l.error._fns) p = await f(m, u, c, r);
    if (p = p || {}, r.throwOnError) throw p;
    return { error: p, ...h };
  };
  return { connect: (e) => n({ ...e, method: "CONNECT" }), delete: (e) => n({ ...e, method: "DELETE" }), get: (e) => n({ ...e, method: "GET" }), getConfig: a, head: (e) => n({ ...e, method: "HEAD" }), interceptors: l, options: (e) => n({ ...e, method: "OPTIONS" }), patch: (e) => n({ ...e, method: "PATCH" }), post: (e) => n({ ...e, method: "POST" }), put: (e) => n({ ...e, method: "PUT" }), request: n, setConfig: i, trace: (e) => n({ ...e, method: "TRACE" }) };
};
const v = J(C());
class k {
  static lastLogin(t) {
    return ((t == null ? void 0 : t.client) ?? v).get({
      ...t,
      url: "/umbraco/wscumbcare/api/v1/last-login"
    });
  }
  static ping(t) {
    return ((t == null ? void 0 : t.client) ?? v).get({
      ...t,
      url: "/umbraco/wscumbcare/api/v1/ping"
    });
  }
}
export {
  k as W,
  v as c
};
//# sourceMappingURL=services.gen-BHDE9gha.js.map
