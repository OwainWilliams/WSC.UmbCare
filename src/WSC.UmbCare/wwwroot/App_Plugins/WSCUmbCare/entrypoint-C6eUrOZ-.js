import { UMB_AUTH_CONTEXT as L } from "@umbraco-cms/backoffice/auth";
import "./breathing-countdown-DgocN1ko.js";
const V = {
  bodySerializer: (r) => JSON.stringify(
    r,
    (t, e) => typeof e == "bigint" ? e.toString() : e
  )
}, J = ({
  onSseError: r,
  onSseEvent: t,
  responseTransformer: e,
  responseValidator: s,
  sseDefaultRetryDelay: i,
  sseMaxRetryAttempts: l,
  sseMaxRetryDelay: o,
  sseSleepFn: a,
  url: c,
  ...f
}) => {
  let n;
  const h = a ?? ((S) => new Promise((u) => setTimeout(u, S)));
  return { stream: async function* () {
    let S = i ?? 3e3, u = 0;
    const b = f.signal ?? new AbortController().signal;
    for (; !b.aborted; ) {
      u++;
      const A = f.headers instanceof Headers ? f.headers : new Headers(f.headers);
      n !== void 0 && A.set("Last-Event-ID", n);
      try {
        const y = await fetch(c, { ...f, headers: A, signal: b });
        if (!y.ok)
          throw new Error(
            `SSE failed: ${y.status} ${y.statusText}`
          );
        if (!y.body) throw new Error("No body in SSE response");
        const g = y.body.pipeThrough(new TextDecoderStream()).getReader();
        let m = "";
        const d = () => {
          try {
            g.cancel();
          } catch {
          }
        };
        b.addEventListener("abort", d);
        try {
          for (; ; ) {
            const { done: w, value: B } = await g.read();
            if (w) break;
            m += B;
            const C = m.split(`

`);
            m = C.pop() ?? "";
            for (const R of C) {
              const v = R.split(`
`), T = [];
              let E;
              for (const p of v)
                if (p.startsWith("data:"))
                  T.push(p.replace(/^data:\s*/, ""));
                else if (p.startsWith("event:"))
                  E = p.replace(/^event:\s*/, "");
                else if (p.startsWith("id:"))
                  n = p.replace(/^id:\s*/, "");
                else if (p.startsWith("retry:")) {
                  const I = Number.parseInt(
                    p.replace(/^retry:\s*/, ""),
                    10
                  );
                  Number.isNaN(I) || (S = I);
                }
              let x, k = !1;
              if (T.length) {
                const p = T.join(`
`);
                try {
                  x = JSON.parse(p), k = !0;
                } catch {
                  x = p;
                }
              }
              k && (s && await s(x), e && (x = await e(x))), t == null || t({
                data: x,
                event: E,
                id: n,
                retry: S
              }), T.length && (yield x);
            }
          }
        } finally {
          b.removeEventListener("abort", d), g.releaseLock();
        }
        break;
      } catch (y) {
        if (r == null || r(y), l !== void 0 && u >= l)
          break;
        const g = Math.min(
          S * 2 ** (u - 1),
          o ?? 3e4
        );
        await h(g);
      }
    }
  }() };
}, F = async (r, t) => {
  const e = typeof t == "function" ? await t(r) : t;
  if (e)
    return r.scheme === "bearer" ? `Bearer ${e}` : r.scheme === "basic" ? `Basic ${btoa(e)}` : e;
}, M = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, G = (r) => {
  switch (r) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, Q = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, N = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: s,
  value: i
}) => {
  if (!t) {
    const a = (r ? i : i.map((c) => encodeURIComponent(c))).join(G(s));
    switch (s) {
      case "label":
        return `.${a}`;
      case "matrix":
        return `;${e}=${a}`;
      case "simple":
        return a;
      default:
        return `${e}=${a}`;
    }
  }
  const l = M(s), o = i.map((a) => s === "label" || s === "simple" ? r ? a : encodeURIComponent(a) : z({
    allowReserved: r,
    name: e,
    value: a
  })).join(l);
  return s === "label" || s === "matrix" ? l + o : o;
}, z = ({
  allowReserved: r,
  name: t,
  value: e
}) => {
  if (e == null)
    return "";
  if (typeof e == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these."
    );
  return `${t}=${r ? e : encodeURIComponent(e)}`;
}, P = ({
  allowReserved: r,
  explode: t,
  name: e,
  style: s,
  value: i,
  valueOnly: l
}) => {
  if (i instanceof Date)
    return l ? i.toISOString() : `${e}=${i.toISOString()}`;
  if (s !== "deepObject" && !t) {
    let c = [];
    Object.entries(i).forEach(([n, h]) => {
      c = [
        ...c,
        n,
        r ? h : encodeURIComponent(h)
      ];
    });
    const f = c.join(",");
    switch (s) {
      case "form":
        return `${e}=${f}`;
      case "label":
        return `.${f}`;
      case "matrix":
        return `;${e}=${f}`;
      default:
        return f;
    }
  }
  const o = Q(s), a = Object.entries(i).map(
    ([c, f]) => z({
      allowReserved: r,
      name: s === "deepObject" ? `${e}[${c}]` : c,
      value: f
    })
  ).join(o);
  return s === "label" || s === "matrix" ? o + a : a;
}, X = /\{[^{}]+\}/g, K = ({ path: r, url: t }) => {
  let e = t;
  const s = t.match(X);
  if (s)
    for (const i of s) {
      let l = !1, o = i.substring(1, i.length - 1), a = "simple";
      o.endsWith("*") && (l = !0, o = o.substring(0, o.length - 1)), o.startsWith(".") ? (o = o.substring(1), a = "label") : o.startsWith(";") && (o = o.substring(1), a = "matrix");
      const c = r[o];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        e = e.replace(
          i,
          N({ explode: l, name: o, style: a, value: c })
        );
        continue;
      }
      if (typeof c == "object") {
        e = e.replace(
          i,
          P({
            explode: l,
            name: o,
            style: a,
            value: c,
            valueOnly: !0
          })
        );
        continue;
      }
      if (a === "matrix") {
        e = e.replace(
          i,
          `;${z({
            name: o,
            value: c
          })}`
        );
        continue;
      }
      const f = encodeURIComponent(
        a === "label" ? `.${c}` : c
      );
      e = e.replace(i, f);
    }
  return e;
}, Y = ({
  baseUrl: r,
  path: t,
  query: e,
  querySerializer: s,
  url: i
}) => {
  const l = i.startsWith("/") ? i : `/${i}`;
  let o = (r ?? "") + l;
  t && (o = K({ path: t, url: o }));
  let a = e ? s(e) : "";
  return a.startsWith("?") && (a = a.substring(1)), a && (o += `?${a}`), o;
}, D = ({
  allowReserved: r,
  array: t,
  object: e
} = {}) => (i) => {
  const l = [];
  if (i && typeof i == "object")
    for (const o in i) {
      const a = i[o];
      if (a != null)
        if (Array.isArray(a)) {
          const c = N({
            allowReserved: r,
            explode: !0,
            name: o,
            style: "form",
            value: a,
            ...t
          });
          c && l.push(c);
        } else if (typeof a == "object") {
          const c = P({
            allowReserved: r,
            explode: !0,
            name: o,
            style: "deepObject",
            value: a,
            ...e
          });
          c && l.push(c);
        } else {
          const c = z({
            allowReserved: r,
            name: o,
            value: a
          });
          c && l.push(c);
        }
    }
  return l.join("&");
}, Z = (r) => {
  var e;
  if (!r)
    return "stream";
  const t = (e = r.split(";")[0]) == null ? void 0 : e.trim();
  if (t) {
    if (t.startsWith("application/json") || t.endsWith("+json"))
      return "json";
    if (t === "multipart/form-data")
      return "formData";
    if (["application/", "audio/", "image/", "video/"].some(
      (s) => t.startsWith(s)
    ))
      return "blob";
    if (t.startsWith("text/"))
      return "text";
  }
}, ee = (r, t) => {
  var e, s;
  return t ? !!(r.headers.has(t) || (e = r.query) != null && e[t] || (s = r.headers.get("Cookie")) != null && s.includes(`${t}=`)) : !1;
}, te = async ({
  security: r,
  ...t
}) => {
  for (const e of r) {
    if (ee(t, e.name))
      continue;
    const s = await F(e, t.auth);
    if (!s)
      continue;
    const i = e.name ?? "Authorization";
    switch (e.in) {
      case "query":
        t.query || (t.query = {}), t.query[i] = s;
        break;
      case "cookie":
        t.headers.append("Cookie", `${i}=${s}`);
        break;
      case "header":
      default:
        t.headers.set(i, s);
        break;
    }
  }
}, _ = (r) => Y({
  baseUrl: r.baseUrl,
  path: r.path,
  query: r.query,
  querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : D(r.querySerializer),
  url: r.url
}), q = (r, t) => {
  var s;
  const e = { ...r, ...t };
  return (s = e.baseUrl) != null && s.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = H(r.headers, t.headers), e;
}, H = (...r) => {
  const t = new Headers();
  for (const e of r) {
    if (!e || typeof e != "object")
      continue;
    const s = e instanceof Headers ? e.entries() : Object.entries(e);
    for (const [i, l] of s)
      if (l === null)
        t.delete(i);
      else if (Array.isArray(l))
        for (const o of l)
          t.append(i, o);
      else l !== void 0 && t.set(
        i,
        typeof l == "object" ? JSON.stringify(l) : l
      );
  }
  return t;
};
class $ {
  constructor() {
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  getInterceptorIndex(t) {
    return typeof t == "number" ? this._fns[t] ? t : -1 : this._fns.indexOf(t);
  }
  exists(t) {
    const e = this.getInterceptorIndex(t);
    return !!this._fns[e];
  }
  eject(t) {
    const e = this.getInterceptorIndex(t);
    this._fns[e] && (this._fns[e] = null);
  }
  update(t, e) {
    const s = this.getInterceptorIndex(t);
    return this._fns[s] ? (this._fns[s] = e, t) : !1;
  }
  use(t) {
    return this._fns = [...this._fns, t], this._fns.length - 1;
  }
}
const re = () => ({
  error: new $(),
  request: new $(),
  response: new $()
}), se = D({
  allowReserved: !1,
  array: {
    explode: !0,
    style: "form"
  },
  object: {
    explode: !0,
    style: "deepObject"
  }
}), ne = {
  "Content-Type": "application/json"
}, W = (r = {}) => ({
  ...V,
  headers: ne,
  parseAs: "auto",
  querySerializer: se,
  ...r
}), ae = (r = {}) => {
  let t = q(W(), r);
  const e = () => ({ ...t }), s = (f) => (t = q(t, f), e()), i = re(), l = async (f) => {
    const n = {
      ...t,
      ...f,
      fetch: f.fetch ?? t.fetch ?? globalThis.fetch,
      headers: H(t.headers, f.headers),
      serializedBody: void 0
    };
    n.security && await te({
      ...n,
      security: n.security
    }), n.requestValidator && await n.requestValidator(n), n.body && n.bodySerializer && (n.serializedBody = n.bodySerializer(n.body)), (n.serializedBody === void 0 || n.serializedBody === "") && n.headers.delete("Content-Type");
    const h = _(n);
    return { opts: n, url: h };
  }, o = async (f) => {
    const { opts: n, url: h } = await l(f), O = {
      redirect: "follow",
      ...n,
      body: n.serializedBody
    };
    let j = new Request(h, O);
    for (const d of i.request._fns)
      d && (j = await d(j, n));
    const S = n.fetch;
    let u = await S(j);
    for (const d of i.response._fns)
      d && (u = await d(u, j, n));
    const b = {
      request: j,
      response: u
    };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0")
        return n.responseStyle === "data" ? {} : {
          data: {},
          ...b
        };
      const d = (n.parseAs === "auto" ? Z(u.headers.get("Content-Type")) : n.parseAs) ?? "json";
      let w;
      switch (d) {
        case "arrayBuffer":
        case "blob":
        case "formData":
        case "json":
        case "text":
          w = await u[d]();
          break;
        case "stream":
          return n.responseStyle === "data" ? u.body : {
            data: u.body,
            ...b
          };
      }
      return d === "json" && (n.responseValidator && await n.responseValidator(w), n.responseTransformer && (w = await n.responseTransformer(w))), n.responseStyle === "data" ? w : {
        data: w,
        ...b
      };
    }
    const A = await u.text();
    let y;
    try {
      y = JSON.parse(A);
    } catch {
    }
    const g = y ?? A;
    let m = g;
    for (const d of i.error._fns)
      d && (m = await d(g, u, j, n));
    if (m = m || {}, n.throwOnError)
      throw m;
    return n.responseStyle === "data" ? void 0 : {
      error: m,
      ...b
    };
  }, a = (f) => (n) => o({ ...n, method: f }), c = (f) => async (n) => {
    const { opts: h, url: O } = await l(n);
    return J({
      ...h,
      body: h.body,
      headers: h.headers,
      method: f,
      url: O
    });
  };
  return {
    buildUrl: _,
    connect: a("CONNECT"),
    delete: a("DELETE"),
    get: a("GET"),
    getConfig: e,
    head: a("HEAD"),
    interceptors: i,
    options: a("OPTIONS"),
    patch: a("PATCH"),
    post: a("POST"),
    put: a("PUT"),
    request: o,
    setConfig: s,
    sse: {
      connect: c("CONNECT"),
      delete: c("DELETE"),
      get: c("GET"),
      head: c("HEAD"),
      options: c("OPTIONS"),
      patch: c("PATCH"),
      post: c("POST"),
      put: c("PUT"),
      trace: c("TRACE")
    },
    trace: a("TRACE")
  };
}, U = ae(W({
  baseUrl: "https://localhost:44301"
})), ce = (r, t) => {
  r.consumeContext(L, async (e) => {
    const s = e == null ? void 0 : e.getOpenApiConfiguration();
    U.setConfig({
      baseUrl: s == null ? void 0 : s.base,
      credentials: s == null ? void 0 : s.credentials
    }), U.interceptors.request.use(async (i, l) => {
      const o = await (s == null ? void 0 : s.token());
      return i.headers.set("Authorization", `Bearer ${o}`), i;
    });
  });
}, le = (r, t) => {
};
export {
  ce as onInit,
  le as onUnload
};
//# sourceMappingURL=entrypoint-C6eUrOZ-.js.map
