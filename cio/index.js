const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["assets/mermaid-NOHMQCX5-BwxSupEg.js", "assets/framework-DBLqhDZ4.js"]))) => i.map(i => d[i]);
import {a as Se, r as lt, c as ve, b as ye} from "./framework-DBLqhDZ4.js";
function ge(i, a) {
    const _ = ( (...S) => S[0])
      , h = new Map;
    return function(...S) {
        const v = _(...S)
          , y = h.get(v);
        if (typeof y < "u")
            return y;
        const b = i.apply(this, S);
        return h.set(v, b),
        b
    }
}
const Re = "$$server:";
function Te(i) {
    return i.split("$$cache=")[0]
}
function be() {
    globalThis.__vite_rsc_require__ = i => i.startsWith(Re) ? (i = i.slice(9),
    globalThis.__vite_rsc_server_require__(i)) : globalThis.__vite_rsc_client_require__(i)
}
let Ut = !1;
function Ae(i) {
    if (Ut)
        return;
    Ut = !0;
    const a = ge(_ => i.load(Te(_)));
    globalThis.__vite_rsc_client_require__ = a,
    be()
}
var gt = {
    exports: {}
}
  , F = {};
var xt;
function Ce() {
    if (xt)
        return F;
    xt = 1;
    var i = Se()
      , a = {
        stream: !0
    }
      , _ = Object.prototype.hasOwnProperty;
    function h(t, e) {
        if (t) {
            var r = t[e[0]];
            if (t = r && r[e[2]])
                r = t.name;
            else {
                if (t = r && r["*"],
                !t)
                    throw Error('Could not find the module "' + e[0] + '" in the React Server Consumer Manifest. This is probably a bug in the React Server Components bundler.');
                r = e[2]
            }
            return e.length === 4 ? [t.id, t.chunks, r, 1] : [t.id, t.chunks, r]
        }
        return e
    }
    function S(t, e) {
        var r = ""
          , n = t[e];
        if (n)
            r = n.name;
        else {
            var c = e.lastIndexOf("#");
            if (c !== -1 && (r = e.slice(c + 1),
            n = t[e.slice(0, c)]),
            !n)
                throw Error('Could not find the module "' + e + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.')
        }
        return n.async ? [n.id, n.chunks, r, 1] : [n.id, n.chunks, r]
    }
    var v = new Map;
    function y(t) {
        var e = __vite_rsc_require__(t);
        return typeof e.then != "function" || e.status === "fulfilled" ? null : (e.then(function(r) {
            e.status = "fulfilled",
            e.value = r
        }, function(r) {
            e.status = "rejected",
            e.reason = r
        }),
        e)
    }
    function b() {}
    function x(t) {
        for (var e = t[1], r = [], n = 0; n < e.length; ) {
            var c = e[n++]
              , o = e[n++]
              , l = v.get(c);
            l === void 0 ? (X.set(c, o),
            o = __webpack_chunk_load__(c),
            r.push(o),
            l = v.set.bind(v, c, null),
            o.then(l, b),
            v.set(c, o)) : l !== null && r.push(l)
        }
        return t.length === 4 ? r.length === 0 ? y(t[0]) : Promise.all(r).then(function() {
            return y(t[0])
        }) : 0 < r.length ? Promise.all(r) : null
    }
    function A(t) {
        var e = __vite_rsc_require__(t[0]);
        if (t.length === 4 && typeof e.then == "function")
            if (e.status === "fulfilled")
                e = e.value;
            else
                throw e.reason;
        if (t[2] === "*")
            return e;
        if (t[2] === "")
            return e.__esModule ? e.default : e;
        if (_.call(e, t[2]))
            return e[t[2]]
    }
    var X = new Map
      , q = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , C = Symbol.for("react.transitional.element")
      , W = Symbol.for("react.lazy")
      , ot = Symbol.iterator;
    function Kt(t) {
        return t === null || typeof t != "object" ? null : (t = ot && t[ot] || t["@@iterator"],
        typeof t == "function" ? t : null)
    }
    var it = Symbol.asyncIterator
      , Zt = Array.isArray
      , Ct = Object.getPrototypeOf
      , Qt = Object.prototype
      , ft = new WeakMap;
    function jt(t) {
        return Number.isFinite(t) ? t === 0 && 1 / t === -1 / 0 ? "$-0" : t : t === 1 / 0 ? "$Infinity" : t === -1 / 0 ? "$-Infinity" : "$NaN"
    }
    function kt(t, e, r, n, c) {
        function o(u, s) {
            s = new Blob([new Uint8Array(s.buffer,s.byteOffset,s.byteLength)]);
            var w = N++;
            return m === null && (m = new FormData),
            m.append(e + w, s),
            "$" + u + w.toString(16)
        }
        function l(u) {
            function s(P) {
                P.done ? (P = N++,
                w.append(e + P, new Blob($)),
                w.append(e + O, '"$o' + P.toString(16) + '"'),
                w.append(e + O, "C"),
                E--,
                E === 0 && n(w)) : ($.push(P.value),
                u.read(new Uint8Array(1024)).then(s, c))
            }
            m === null && (m = new FormData);
            var w = m;
            E++;
            var O = N++
              , $ = [];
            return u.read(new Uint8Array(1024)).then(s, c),
            "$r" + O.toString(16)
        }
        function d(u) {
            function s($) {
                if ($.done)
                    w.append(e + O, "C"),
                    E--,
                    E === 0 && n(w);
                else
                    try {
                        var P = JSON.stringify($.value, g);
                        w.append(e + O, P),
                        u.read().then(s, c)
                    } catch (j) {
                        c(j)
                    }
            }
            m === null && (m = new FormData);
            var w = m;
            E++;
            var O = N++;
            return u.read().then(s, c),
            "$R" + O.toString(16)
        }
        function f(u) {
            try {
                var s = u.getReader({
                    mode: "byob"
                })
            } catch {
                return d(u.getReader())
            }
            return l(s)
        }
        function p(u, s) {
            function w(P) {
                if (P.done) {
                    if (P.value === void 0)
                        O.append(e + $, "C");
                    else
                        try {
                            var j = JSON.stringify(P.value, g);
                            O.append(e + $, "C" + j)
                        } catch (J) {
                            c(J);
                            return
                        }
                    E--,
                    E === 0 && n(O)
                } else
                    try {
                        var k = JSON.stringify(P.value, g);
                        O.append(e + $, k),
                        s.next().then(w, c)
                    } catch (J) {
                        c(J)
                    }
            }
            m === null && (m = new FormData);
            var O = m;
            E++;
            var $ = N++;
            return u = u === s,
            s.next().then(w, c),
            "$" + (u ? "x" : "X") + $.toString(16)
        }
        function g(u, s) {
            if (s === null)
                return null;
            if (typeof s == "object") {
                switch (s.$$typeof) {
                case C:
                    if (r !== void 0 && u.indexOf(":") === -1) {
                        var w = U.get(this);
                        if (w !== void 0)
                            return r.set(w + ":" + u, s),
                            "$T"
                    }
                    throw Error("React Element cannot be passed to Server Functions from the Client without a temporary reference set. Pass a TemporaryReferenceSet to the options.");
                case W:
                    w = s._payload;
                    var O = s._init;
                    m === null && (m = new FormData),
                    E++;
                    try {
                        var $ = O(w)
                          , P = N++
                          , j = V($, P);
                        return m.append(e + P, j),
                        "$" + P.toString(16)
                    } catch (M) {
                        if (typeof M == "object" && M !== null && typeof M.then == "function") {
                            E++;
                            var k = N++;
                            return w = function() {
                                try {
                                    var z = V(s, k)
                                      , st = m;
                                    st.append(e + k, z),
                                    E--,
                                    E === 0 && n(st)
                                } catch (yt) {
                                    c(yt)
                                }
                            }
                            ,
                            M.then(w, w),
                            "$" + k.toString(16)
                        }
                        return c(M),
                        null
                    } finally {
                        E--
                    }
                }
                if (w = U.get(s),
                typeof s.then == "function") {
                    if (w !== void 0)
                        if (Q === s)
                            Q = null;
                        else
                            return w;
                    m === null && (m = new FormData),
                    E++;
                    var J = N++;
                    return u = "$@" + J.toString(16),
                    U.set(s, u),
                    s.then(function(M) {
                        try {
                            var z = U.get(M)
                              , st = z !== void 0 ? JSON.stringify(z) : V(M, J);
                            M = m,
                            M.append(e + J, st),
                            E--,
                            E === 0 && n(M)
                        } catch (yt) {
                            c(yt)
                        }
                    }, c),
                    u
                }
                if (w !== void 0)
                    if (Q === s)
                        Q = null;
                    else
                        return w;
                else
                    u.indexOf(":") === -1 && (w = U.get(this),
                    w !== void 0 && (u = w + ":" + u,
                    U.set(s, u),
                    r !== void 0 && r.set(u, s)));
                if (Zt(s))
                    return s;
                if (s instanceof FormData) {
                    m === null && (m = new FormData);
                    var pe = m;
                    u = N++;
                    var Ee = e + u + "_";
                    return s.forEach(function(M, z) {
                        pe.append(Ee + z, M)
                    }),
                    "$K" + u.toString(16)
                }
                if (s instanceof Map)
                    return u = N++,
                    w = V(Array.from(s), u),
                    m === null && (m = new FormData),
                    m.append(e + u, w),
                    "$Q" + u.toString(16);
                if (s instanceof Set)
                    return u = N++,
                    w = V(Array.from(s), u),
                    m === null && (m = new FormData),
                    m.append(e + u, w),
                    "$W" + u.toString(16);
                if (s instanceof ArrayBuffer)
                    return u = new Blob([s]),
                    w = N++,
                    m === null && (m = new FormData),
                    m.append(e + w, u),
                    "$A" + w.toString(16);
                if (s instanceof Int8Array)
                    return o("O", s);
                if (s instanceof Uint8Array)
                    return o("o", s);
                if (s instanceof Uint8ClampedArray)
                    return o("U", s);
                if (s instanceof Int16Array)
                    return o("S", s);
                if (s instanceof Uint16Array)
                    return o("s", s);
                if (s instanceof Int32Array)
                    return o("L", s);
                if (s instanceof Uint32Array)
                    return o("l", s);
                if (s instanceof Float32Array)
                    return o("G", s);
                if (s instanceof Float64Array)
                    return o("g", s);
                if (s instanceof BigInt64Array)
                    return o("M", s);
                if (s instanceof BigUint64Array)
                    return o("m", s);
                if (s instanceof DataView)
                    return o("V", s);
                if (typeof Blob == "function" && s instanceof Blob)
                    return m === null && (m = new FormData),
                    u = N++,
                    m.append(e + u, s),
                    "$B" + u.toString(16);
                if (u = Kt(s))
                    return w = u.call(s),
                    w === s ? (u = N++,
                    w = V(Array.from(w), u),
                    m === null && (m = new FormData),
                    m.append(e + u, w),
                    "$i" + u.toString(16)) : Array.from(w);
                if (typeof ReadableStream == "function" && s instanceof ReadableStream)
                    return f(s);
                if (u = s[it],
                typeof u == "function")
                    return p(s, u.call(s));
                if (u = Ct(s),
                u !== Qt && (u === null || Ct(u) !== null)) {
                    if (r === void 0)
                        throw Error("Only plain objects, and a few built-ins, can be passed to Server Functions. Classes or null prototypes are not supported.");
                    return "$T"
                }
                return s
            }
            if (typeof s == "string")
                return s[s.length - 1] === "Z" && this[u]instanceof Date ? "$D" + s : (u = s[0] === "$" ? "$" + s : s,
                u);
            if (typeof s == "boolean")
                return s;
            if (typeof s == "number")
                return jt(s);
            if (typeof s > "u")
                return "$undefined";
            if (typeof s == "function") {
                if (w = ft.get(s),
                w !== void 0)
                    return u = U.get(s),
                    u !== void 0 || (u = JSON.stringify({
                        id: w.id,
                        bound: w.bound
                    }, g),
                    m === null && (m = new FormData),
                    w = N++,
                    m.set(e + w, u),
                    u = "$h" + w.toString(16),
                    U.set(s, u)),
                    u;
                if (r !== void 0 && u.indexOf(":") === -1 && (w = U.get(this),
                w !== void 0))
                    return r.set(w + ":" + u, s),
                    "$T";
                throw Error("Client Functions cannot be passed directly to Server Functions. Only Functions passed from the Server can be passed back again.")
            }
            if (typeof s == "symbol") {
                if (r !== void 0 && u.indexOf(":") === -1 && (w = U.get(this),
                w !== void 0))
                    return r.set(w + ":" + u, s),
                    "$T";
                throw Error("Symbols cannot be passed to a Server Function without a temporary reference set. Pass a TemporaryReferenceSet to the options.")
            }
            if (typeof s == "bigint")
                return "$n" + s.toString(10);
            throw Error("Type " + typeof s + " is not supported as an argument to a Server Function.")
        }
        function V(u, s) {
            return typeof u == "object" && u !== null && (s = "$" + s.toString(16),
            U.set(u, s),
            r !== void 0 && r.set(s, u)),
            Q = u,
            JSON.stringify(u, g)
        }
        var N = 1
          , E = 0
          , m = null
          , U = new WeakMap
          , Q = t
          , vt = V(t, 0);
        return m === null ? n(vt) : (m.set(e + "0", vt),
        E === 0 && n(m)),
        function() {
            0 < E && (E = 0,
            n(m === null ? vt : m))
        }
    }
    function Y(t, e, r) {
        ft.has(t) || ft.set(t, {
            id: e,
            originalBind: t.bind,
            bound: r
        })
    }
    function te(t, e) {
        function r() {
            var o = Array.prototype.slice.call(arguments);
            return c ? c.status === "fulfilled" ? e(n, c.value.concat(o)) : Promise.resolve(c).then(function(l) {
                return e(n, l.concat(o))
            }) : e(n, o)
        }
        var n = t.id
          , c = t.bound;
        return Y(r, n, c),
        r
    }
    function I(t, e, r, n) {
        this.status = t,
        this.value = e,
        this.reason = r,
        this._response = n
    }
    I.prototype = Object.create(Promise.prototype),
    I.prototype.then = function(t, e) {
        switch (this.status) {
        case "resolved_model":
            K(this);
            break;
        case "resolved_module":
            ct(this)
        }
        switch (this.status) {
        case "fulfilled":
            t(this.value);
            break;
        case "pending":
        case "blocked":
            t && (this.value === null && (this.value = []),
            this.value.push(t)),
            e && (this.reason === null && (this.reason = []),
            this.reason.push(e));
            break;
        default:
            e && e(this.reason)
        }
    }
    ;
    function ee(t) {
        switch (t.status) {
        case "resolved_model":
            K(t);
            break;
        case "resolved_module":
            ct(t)
        }
        switch (t.status) {
        case "fulfilled":
            return t.value;
        case "pending":
        case "blocked":
            throw t;
        default:
            throw t.reason
        }
    }
    function at(t) {
        return new I("pending",null,null,t)
    }
    function B(t, e) {
        for (var r = 0; r < t.length; r++)
            (0,
            t[r])(e)
    }
    function dt(t, e, r) {
        switch (t.status) {
        case "fulfilled":
            B(e, t.value);
            break;
        case "pending":
        case "blocked":
            if (t.value)
                for (var n = 0; n < e.length; n++)
                    t.value.push(e[n]);
            else
                t.value = e;
            if (t.reason) {
                if (r)
                    for (e = 0; e < r.length; e++)
                        t.reason.push(r[e])
            } else
                t.reason = r;
            break;
        case "rejected":
            r && B(r, t.reason)
        }
    }
    function G(t, e) {
        if (t.status !== "pending" && t.status !== "blocked")
            t.reason.error(e);
        else {
            var r = t.reason;
            t.status = "rejected",
            t.reason = e,
            r !== null && B(r, e)
        }
    }
    function It(t, e, r) {
        return new I("resolved_model",(r ? '{"done":true,"value":' : '{"done":false,"value":') + e + "}",null,t)
    }
    function wt(t, e, r) {
        ht(t, (r ? '{"done":true,"value":' : '{"done":false,"value":') + e + "}")
    }
    function ht(t, e) {
        if (t.status !== "pending")
            t.reason.enqueueModel(e);
        else {
            var r = t.value
              , n = t.reason;
            t.status = "resolved_model",
            t.value = e,
            r !== null && (K(t),
            dt(t, r, n))
        }
    }
    function Nt(t, e) {
        if (t.status === "pending" || t.status === "blocked") {
            var r = t.value
              , n = t.reason;
            t.status = "resolved_module",
            t.value = e,
            t.reason = null,
            r !== null && (ct(t),
            dt(t, r, n))
        }
    }
    var T = null;
    function K(t) {
        var e = T;
        T = null;
        var r = t.value;
        t.status = "blocked",
        t.value = null,
        t.reason = null;
        try {
            var n = JSON.parse(r, t._response._fromJSON)
              , c = t.value;
            if (c !== null && (t.value = null,
            t.reason = null,
            B(c, n)),
            T !== null) {
                if (T.errored)
                    throw T.value;
                if (0 < T.deps) {
                    T.value = n,
                    T.chunk = t;
                    return
                }
            }
            t.status = "fulfilled",
            t.value = n,
            t.reason = null
        } catch (o) {
            t.status = "rejected",
            t.reason = o
        } finally {
            T = e
        }
    }
    function ct(t) {
        try {
            var e = A(t.value);
            t.status = "fulfilled",
            t.value = e,
            t.reason = null
        } catch (r) {
            t.status = "rejected",
            t.reason = r
        }
    }
    function mt(t, e) {
        t._closed = !0,
        t._closedReason = e,
        t._chunks.forEach(function(r) {
            r.status === "pending" ? G(r, e) : r.status === "fulfilled" && r.reason !== null && r.reason.error(e)
        })
    }
    function pt(t) {
        return {
            $$typeof: W,
            _payload: t,
            _init: ee
        }
    }
    function Z(t, e) {
        var r = t._chunks
          , n = r.get(e);
        return n || (n = t._closed ? new I("rejected",null,t._closedReason,t) : at(t),
        r.set(e, n)),
        n
    }
    function Pt(t, e, r, n, c, o) {
        function l(p) {
            for (var g = 1; g < o.length; g++) {
                for (; p.$$typeof === W; )
                    if (p = p._payload,
                    p === f.chunk)
                        p = f.value;
                    else if (p.status === "fulfilled")
                        p = p.value;
                    else {
                        o.splice(0, g - 1),
                        p.then(l, d);
                        return
                    }
                var V = o[g];
                if (typeof p == "object" && p !== null && _.call(p, V))
                    p = p[V];
                else
                    throw Error("Invalid reference.")
            }
            if (g = c(n, p, e, r),
            r !== "__proto__" && (e[r] = g),
            r === "" && f.value === null && (f.value = g),
            e[0] === C && typeof f.value == "object" && f.value !== null && f.value.$$typeof === C)
                switch (p = f.value,
                r) {
                case "3":
                    p.props = g
                }
            f.deps--,
            f.deps === 0 && (g = f.chunk,
            g !== null && g.status === "blocked" && (p = g.value,
            g.status = "fulfilled",
            g.value = f.value,
            g.reason = null,
            p !== null && B(p, f.value)))
        }
        function d(p) {
            if (!f.errored) {
                f.errored = !0,
                f.value = p;
                var g = f.chunk;
                g !== null && g.status === "blocked" && G(g, p)
            }
        }
        if (T) {
            var f = T;
            f.deps++
        } else
            f = T = {
                parent: null,
                chunk: null,
                value: null,
                deps: 1,
                errored: !1
            };
        return t.then(l, d),
        null
    }
    function ne(t, e, r, n) {
        if (!t._serverReferenceConfig)
            return te(e, t._callServer);
        var c = S(t._serverReferenceConfig, e.id);
        if (t = x(c))
            e.bound && (t = Promise.all([t, e.bound]));
        else if (e.bound)
            t = Promise.resolve(e.bound);
        else
            return t = A(c),
            Y(t, e.id, e.bound),
            t;
        if (T) {
            var o = T;
            o.deps++
        } else
            o = T = {
                parent: null,
                chunk: null,
                value: null,
                deps: 1,
                errored: !1
            };
        return t.then(function() {
            var l = A(c);
            if (e.bound) {
                var d = e.bound.value.slice(0);
                d.unshift(null),
                l = l.bind.apply(l, d)
            }
            if (Y(l, e.id, e.bound),
            n !== "__proto__" && (r[n] = l),
            n === "" && o.value === null && (o.value = l),
            r[0] === C && typeof o.value == "object" && o.value !== null && o.value.$$typeof === C)
                switch (d = o.value,
                n) {
                case "3":
                    d.props = l
                }
            o.deps--,
            o.deps === 0 && (l = o.chunk,
            l !== null && l.status === "blocked" && (d = l.value,
            l.status = "fulfilled",
            l.value = o.value,
            l.reason = null,
            d !== null && B(d, o.value)))
        }, function(l) {
            if (!o.errored) {
                o.errored = !0,
                o.value = l;
                var d = o.chunk;
                d !== null && d.status === "blocked" && G(d, l)
            }
        }),
        null
    }
    function H(t, e, r, n, c) {
        e = e.split(":");
        var o = parseInt(e[0], 16);
        switch (o = Z(t, o),
        o.status) {
        case "resolved_model":
            K(o);
            break;
        case "resolved_module":
            ct(o)
        }
        switch (o.status) {
        case "fulfilled":
            var l = o.value;
            for (o = 1; o < e.length; o++) {
                for (; l.$$typeof === W; )
                    if (l = l._payload,
                    l.status === "fulfilled")
                        l = l.value;
                    else
                        return Pt(l, r, n, t, c, e.slice(o - 1));
                l = l[e[o]]
            }
            return c(t, l, r, n);
        case "pending":
        case "blocked":
            return Pt(o, r, n, t, c, e);
        default:
            return T ? (T.errored = !0,
            T.value = o.reason) : T = {
                parent: null,
                chunk: null,
                value: o.reason,
                deps: 0,
                errored: !0
            },
            null
        }
    }
    function re(t, e) {
        return new Map(e)
    }
    function oe(t, e) {
        return new Set(e)
    }
    function ie(t, e) {
        return new Blob(e.slice(1),{
            type: e[0]
        })
    }
    function ae(t, e) {
        t = new FormData;
        for (var r = 0; r < e.length; r++)
            t.append(e[r][0], e[r][1]);
        return t
    }
    function ce(t, e) {
        return e[Symbol.iterator]()
    }
    function se(t, e) {
        return e
    }
    function le(t, e, r, n) {
        if (n[0] === "$") {
            if (n === "$")
                return T !== null && r === "0" && (T = {
                    parent: T,
                    chunk: null,
                    value: null,
                    deps: 0,
                    errored: !1
                }),
                C;
            switch (n[1]) {
            case "$":
                return n.slice(1);
            case "L":
                return e = parseInt(n.slice(2), 16),
                t = Z(t, e),
                pt(t);
            case "@":
                return n.length === 2 ? new Promise(function() {}
                ) : (e = parseInt(n.slice(2), 16),
                Z(t, e));
            case "S":
                return Symbol.for(n.slice(2));
            case "h":
                return n = n.slice(2),
                H(t, n, e, r, ne);
            case "T":
                if (e = "$" + n.slice(2),
                t = t._tempRefs,
                t == null)
                    throw Error("Missing a temporary reference set but the RSC response returned a temporary reference. Pass a temporaryReference option with the set that was used with the reply.");
                return t.get(e);
            case "Q":
                return n = n.slice(2),
                H(t, n, e, r, re);
            case "W":
                return n = n.slice(2),
                H(t, n, e, r, oe);
            case "B":
                return n = n.slice(2),
                H(t, n, e, r, ie);
            case "K":
                return n = n.slice(2),
                H(t, n, e, r, ae);
            case "Z":
                return Mt();
            case "i":
                return n = n.slice(2),
                H(t, n, e, r, ce);
            case "I":
                return 1 / 0;
            case "-":
                return n === "$-0" ? -0 : -1 / 0;
            case "N":
                return NaN;
            case "u":
                return;
            case "D":
                return new Date(Date.parse(n.slice(2)));
            case "n":
                return BigInt(n.slice(2));
            default:
                return n = n.slice(1),
                H(t, n, e, r, se)
            }
        }
        return n
    }
    function ue() {
        throw Error('Trying to call a function from "use server" but the callServer option was not implemented in your router runtime.')
    }
    function _e(t, e, r, n, c, o, l) {
        var d = new Map;
        this._bundlerConfig = t,
        this._serverReferenceConfig = e,
        this._moduleLoading = r,
        this._callServer = n !== void 0 ? n : ue,
        this._encodeFormAction = c,
        this._nonce = o,
        this._chunks = d,
        this._stringDecoder = new TextDecoder,
        this._fromJSON = null,
        this._rowLength = this._rowTag = this._rowID = this._rowState = 0,
        this._buffer = [],
        this._closed = !1,
        this._closedReason = null,
        this._tempRefs = l,
        this._fromJSON = me(this)
    }
    function Et(t, e, r) {
        var n = t._chunks
          , c = n.get(e);
        c && c.status !== "pending" ? c.reason.enqueueValue(r) : n.set(e, new I("fulfilled",r,null,t))
    }
    function fe(t, e, r) {
        var n = t._chunks
          , c = n.get(e);
        r = JSON.parse(r, t._fromJSON);
        var o = h(t._bundlerConfig, r);
        if (r = x(o)) {
            if (c) {
                var l = c;
                l.status = "blocked"
            } else
                l = new I("blocked",null,null,t),
                n.set(e, l);
            r.then(function() {
                return Nt(l, o)
            }, function(d) {
                return G(l, d)
            })
        } else
            c ? Nt(c, o) : n.set(e, new I("resolved_module",o,null,t))
    }
    function Vt(t, e, r, n) {
        var c = t._chunks
          , o = c.get(e);
        o ? o.status === "pending" && (t = o.value,
        o.status = "fulfilled",
        o.value = r,
        o.reason = n,
        t !== null && B(t, o.value)) : c.set(e, new I("fulfilled",r,n,t))
    }
    function Ot(t, e, r) {
        var n = null
          , c = !1;
        r = new ReadableStream({
            type: r,
            start: function(l) {
                n = l
            }
        });
        var o = null;
        Vt(t, e, r, {
            enqueueValue: function(l) {
                o === null ? n.enqueue(l) : o.then(function() {
                    n.enqueue(l)
                })
            },
            enqueueModel: function(l) {
                if (o === null) {
                    var d = new I("resolved_model",l,null,t);
                    K(d),
                    d.status === "fulfilled" ? n.enqueue(d.value) : (d.then(function(p) {
                        return n.enqueue(p)
                    }, function(p) {
                        return n.error(p)
                    }),
                    o = d)
                } else {
                    d = o;
                    var f = at(t);
                    f.then(function(p) {
                        return n.enqueue(p)
                    }, function(p) {
                        return n.error(p)
                    }),
                    o = f,
                    d.then(function() {
                        o === f && (o = null),
                        ht(f, l)
                    })
                }
            },
            close: function() {
                if (!c)
                    if (c = !0,
                    o === null)
                        n.close();
                    else {
                        var l = o;
                        o = null,
                        l.then(function() {
                            return n.close()
                        })
                    }
            },
            error: function(l) {
                if (!c)
                    if (c = !0,
                    o === null)
                        n.error(l);
                    else {
                        var d = o;
                        o = null,
                        d.then(function() {
                            return n.error(l)
                        })
                    }
            }
        })
    }
    function de() {
        return this
    }
    function we(t) {
        return t = {
            next: t
        },
        t[it] = de,
        t
    }
    function Dt(t, e, r) {
        var n = []
          , c = !1
          , o = 0
          , l = {};
        l = (l[it] = function() {
            var d = 0;
            return we(function(f) {
                if (f !== void 0)
                    throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
                if (d === n.length) {
                    if (c)
                        return new I("fulfilled",{
                            done: !0,
                            value: void 0
                        },null,t);
                    n[d] = at(t)
                }
                return n[d++]
            })
        }
        ,
        l),
        Vt(t, e, r ? l[it]() : l, {
            enqueueValue: function(d) {
                if (o === n.length)
                    n[o] = new I("fulfilled",{
                        done: !1,
                        value: d
                    },null,t);
                else {
                    var f = n[o]
                      , p = f.value
                      , g = f.reason;
                    f.status = "fulfilled",
                    f.value = {
                        done: !1,
                        value: d
                    },
                    f.reason = null,
                    p !== null && dt(f, p, g)
                }
                o++
            },
            enqueueModel: function(d) {
                o === n.length ? n[o] = It(t, d, !1) : wt(n[o], d, !1),
                o++
            },
            close: function(d) {
                if (!c)
                    for (c = !0,
                    o === n.length ? n[o] = It(t, d, !0) : wt(n[o], d, !0),
                    o++; o < n.length; )
                        wt(n[o++], '"$undefined"', !0)
            },
            error: function(d) {
                if (!c)
                    for (c = !0,
                    o === n.length && (n[o] = at(t)); o < n.length; )
                        G(n[o++], d)
            }
        })
    }
    function Mt() {
        var t = Error("An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.");
        return t.stack = "Error: " + t.message,
        t
    }
    function St(t, e) {
        for (var r = t.length, n = e.length, c = 0; c < r; c++)
            n += t[c].byteLength;
        n = new Uint8Array(n);
        for (var o = c = 0; o < r; o++) {
            var l = t[o];
            n.set(l, c),
            c += l.byteLength
        }
        return n.set(e, c),
        n
    }
    function L(t, e, r, n, c, o) {
        r = r.length === 0 && n.byteOffset % o === 0 ? n : St(r, n),
        c = new c(r.buffer,r.byteOffset,r.byteLength / o),
        Et(t, e, c)
    }
    function he(t, e, r, n, c) {
        switch (r) {
        case 65:
            Et(t, e, St(n, c).buffer);
            return;
        case 79:
            L(t, e, n, c, Int8Array, 1);
            return;
        case 111:
            Et(t, e, n.length === 0 ? c : St(n, c));
            return;
        case 85:
            L(t, e, n, c, Uint8ClampedArray, 1);
            return;
        case 83:
            L(t, e, n, c, Int16Array, 2);
            return;
        case 115:
            L(t, e, n, c, Uint16Array, 2);
            return;
        case 76:
            L(t, e, n, c, Int32Array, 4);
            return;
        case 108:
            L(t, e, n, c, Uint32Array, 4);
            return;
        case 71:
            L(t, e, n, c, Float32Array, 4);
            return;
        case 103:
            L(t, e, n, c, Float64Array, 8);
            return;
        case 77:
            L(t, e, n, c, BigInt64Array, 8);
            return;
        case 109:
            L(t, e, n, c, BigUint64Array, 8);
            return;
        case 86:
            L(t, e, n, c, DataView, 1);
            return
        }
        for (var o = t._stringDecoder, l = "", d = 0; d < n.length; d++)
            l += o.decode(n[d], a);
        switch (n = l += o.decode(c),
        r) {
        case 73:
            fe(t, e, n);
            break;
        case 72:
            switch (e = n[0],
            n = n.slice(1),
            t = JSON.parse(n, t._fromJSON),
            n = q.d,
            e) {
            case "D":
                n.D(t);
                break;
            case "C":
                typeof t == "string" ? n.C(t) : n.C(t[0], t[1]);
                break;
            case "L":
                e = t[0],
                r = t[1],
                t.length === 3 ? n.L(e, r, t[2]) : n.L(e, r);
                break;
            case "m":
                typeof t == "string" ? n.m(t) : n.m(t[0], t[1]);
                break;
            case "X":
                typeof t == "string" ? n.X(t) : n.X(t[0], t[1]);
                break;
            case "S":
                typeof t == "string" ? n.S(t) : n.S(t[0], t[1] === 0 ? void 0 : t[1], t.length === 3 ? t[2] : void 0);
                break;
            case "M":
                typeof t == "string" ? n.M(t) : n.M(t[0], t[1])
            }
            break;
        case 69:
            r = JSON.parse(n),
            n = Mt(),
            n.digest = r.digest,
            r = t._chunks,
            (c = r.get(e)) ? G(c, n) : r.set(e, new I("rejected",null,n,t));
            break;
        case 84:
            r = t._chunks,
            (c = r.get(e)) && c.status !== "pending" ? c.reason.enqueueValue(n) : r.set(e, new I("fulfilled",n,null,t));
            break;
        case 78:
        case 68:
        case 87:
            throw Error("Failed to read a RSC payload created by a development version of React on the server while using a production version on the client. Always use matching versions on the server and the client.");
        case 82:
            Ot(t, e, void 0);
            break;
        case 114:
            Ot(t, e, "bytes");
            break;
        case 88:
            Dt(t, e, !1);
            break;
        case 120:
            Dt(t, e, !0);
            break;
        case 67:
            (t = t._chunks.get(e)) && t.status === "fulfilled" && t.reason.close(n === "" ? '"$undefined"' : n);
            break;
        default:
            r = t._chunks,
            (c = r.get(e)) ? ht(c, n) : r.set(e, new I("resolved_model",n,null,t))
        }
    }
    function me(t) {
        return function(e, r) {
            if (e !== "__proto__") {
                if (typeof r == "string")
                    return le(t, this, e, r);
                if (typeof r == "object" && r !== null) {
                    if (r[0] === C) {
                        if (e = {
                            $$typeof: C,
                            type: r[1],
                            key: r[2],
                            ref: null,
                            props: r[3]
                        },
                        T !== null) {
                            if (r = T,
                            T = r.parent,
                            r.errored)
                                e = new I("rejected",null,r.value,t),
                                e = pt(e);
                            else if (0 < r.deps) {
                                var n = new I("blocked",null,null,t);
                                r.value = e,
                                r.chunk = n,
                                e = pt(n)
                            }
                        }
                    } else
                        e = r;
                    return e
                }
                return r
            }
        }
    }
    function $t(t) {
        return new _e(null,null,null,t && t.callServer ? t.callServer : void 0,void 0,void 0,t && t.temporaryReferences ? t.temporaryReferences : void 0)
    }
    function Lt(t, e) {
        function r(o) {
            var l = o.value;
            if (o.done)
                mt(t, Error("Connection closed."));
            else {
                var d = 0
                  , f = t._rowState;
                o = t._rowID;
                for (var p = t._rowTag, g = t._rowLength, V = t._buffer, N = l.length; d < N; ) {
                    var E = -1;
                    switch (f) {
                    case 0:
                        E = l[d++],
                        E === 58 ? f = 1 : o = o << 4 | (96 < E ? E - 87 : E - 48);
                        continue;
                    case 1:
                        f = l[d],
                        f === 84 || f === 65 || f === 79 || f === 111 || f === 85 || f === 83 || f === 115 || f === 76 || f === 108 || f === 71 || f === 103 || f === 77 || f === 109 || f === 86 ? (p = f,
                        f = 2,
                        d++) : 64 < f && 91 > f || f === 35 || f === 114 || f === 120 ? (p = f,
                        f = 3,
                        d++) : (p = 0,
                        f = 3);
                        continue;
                    case 2:
                        E = l[d++],
                        E === 44 ? f = 4 : g = g << 4 | (96 < E ? E - 87 : E - 48);
                        continue;
                    case 3:
                        E = l.indexOf(10, d);
                        break;
                    case 4:
                        E = d + g,
                        E > l.length && (E = -1)
                    }
                    var m = l.byteOffset + d;
                    if (-1 < E)
                        g = new Uint8Array(l.buffer,m,E - d),
                        he(t, o, p, V, g),
                        d = E,
                        f === 3 && d++,
                        g = o = p = f = 0,
                        V.length = 0;
                    else {
                        l = new Uint8Array(l.buffer,m,l.byteLength - d),
                        V.push(l),
                        g -= l.byteLength;
                        break
                    }
                }
                return t._rowState = f,
                t._rowID = o,
                t._rowTag = p,
                t._rowLength = g,
                c.read().then(r).catch(n)
            }
        }
        function n(o) {
            mt(t, o)
        }
        var c = e.getReader();
        c.read().then(r).catch(n)
    }
    return F.createFromFetch = function(t, e) {
        var r = $t(e);
        return t.then(function(n) {
            Lt(r, n.body)
        }, function(n) {
            mt(r, n)
        }),
        Z(r, 0)
    }
    ,
    F.createFromReadableStream = function(t, e) {
        return e = $t(e),
        Lt(e, t),
        Z(e, 0)
    }
    ,
    F.createServerReference = function(t, e) {
        function r() {
            var n = Array.prototype.slice.call(arguments);
            return e(t, n)
        }
        return Y(r, t, null),
        r
    }
    ,
    F.createTemporaryReferenceSet = function() {
        return new Map
    }
    ,
    F.encodeReply = function(t, e) {
        return new Promise(function(r, n) {
            var c = kt(t, "", e && e.temporaryReferences ? e.temporaryReferences : void 0, r, n);
            if (e && e.signal) {
                var o = e.signal;
                if (o.aborted)
                    c(o.reason);
                else {
                    var l = function() {
                        c(o.reason),
                        o.removeEventListener("abort", l)
                    };
                    o.addEventListener("abort", l)
                }
            }
        }
        )
    }
    ,
    F.registerServerReference = function(t, e) {
        return Y(t, e, null),
        t
    }
    ,
    F
}
var Xt;
function Ie() {
    return Xt || (Xt = 1,
    gt.exports = Ce()),
    gt.exports
}
var _t = Ie();
function Ne(i, a={}) {
    return _t.createFromReadableStream(i, {
        callServer: Gt,
        findSourceMapURL: zt,
        ...a
    })
}
function Wt(i, a={}) {
    return _t.createFromFetch(i, {
        callServer: Gt,
        findSourceMapURL: zt,
        ...a
    })
}
const Pe = _t.encodeReply;
function Gt(...i) {
    return globalThis.__viteRscCallServer(...i)
}
function Ve(i) {
    globalThis.__viteRscCallServer = i
}
const Oe = _t.createTemporaryReferenceSet;
function zt(i, a) {
    const _ = new URL("/__vite_rsc_findSourceMapURL",import.meta.url);
    return _.searchParams.set("filename", i),
    _.searchParams.set("environmentName", a),
    _.toString()
}
const De = "modulepreload"
  , Me = function(i) {
    return "/" + i
}
  , qt = {}
  , R = function(a, _, h) {
    let S = Promise.resolve();
    if (_ && _.length > 0) {
        let x = function(A) {
            return Promise.all(A.map(X => Promise.resolve(X).then(q => ({
                status: "fulfilled",
                value: q
            }), q => ({
                status: "rejected",
                reason: q
            }))))
        };
        document.getElementsByTagName("link");
        const y = document.querySelector("meta[property=csp-nonce]")
          , b = y?.nonce || y?.getAttribute("nonce");
        S = x(_.map(A => {
            if (A = Me(A),
            A in qt)
                return;
            qt[A] = !0;
            const X = A.endsWith(".css")
              , q = X ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${A}"]${q}`))
                return;
            const C = document.createElement("link");
            if (C.rel = X ? "stylesheet" : De,
            X || (C.as = "script"),
            C.crossOrigin = "",
            C.href = A,
            b && C.setAttribute("nonce", b),
            document.head.appendChild(C),
            X)
                return new Promise( (W, ot) => {
                    C.addEventListener("load", W),
                    C.addEventListener("error", () => ot(new Error(`Unable to preload CSS for ${A}`)))
                }
                )
        }
        ))
    }
    function v(y) {
        const b = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (b.payload = y,
        window.dispatchEvent(b),
        !b.defaultPrevented)
            throw y
    }
    return S.then(y => {
        for (const b of y || [])
            b.status === "rejected" && v(b.reason);
        return a().catch(v)
    }
    )
}
  , $e = {
    "95f6bfda334b": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_95f6bfda334b,
    "05e358f6455c": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_05e358f6455c,
    f29e6e234fea: async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_f29e6e234fea,
    "0deffcb8ffd7": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_0deffcb8ffd7,
    c2747888630f: async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_c2747888630f,
    "782fd804d300": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_782fd804d300,
    "65c11b515bcb": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_65c11b515bcb,
    "833cfac5420e": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_833cfac5420e,
    "94522475caf7": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_94522475caf7,
    "708bb530c2ab": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_708bb530c2ab,
    c94fd27aca2a: async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_c94fd27aca2a,
    "442a08b7d073": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_442a08b7d073,
    "7da277ef34bb": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_7da277ef34bb,
    "4a59ee5f380b": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_4a59ee5f380b,
    "286292afcc03": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_286292afcc03,
    "555749a842b9": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_555749a842b9,
    "6a2be40e2e87": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_6a2be40e2e87,
    "369c35ed1057": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_369c35ed1057,
    "8cec2856ffea": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_8cec2856ffea,
    "8978a3aa1e15": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_8978a3aa1e15,
    "0c4a6a3a3464": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_0c4a6a3a3464,
    "87bee7a9007f": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_87bee7a9007f,
    b64eea264797: async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_b64eea264797,
    defd9c8adddd: async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_defd9c8adddd,
    "9a54a8e3e388": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_9a54a8e3e388,
    "1eb2a5fc8274": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_1eb2a5fc8274,
    "6092e5a06ba8": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_6092e5a06ba8,
    "84ce8d70db87": async () => (await R( () => import("./mermaid-NOHMQCX5-BwxSupEg.js").then(a => a.w), __vite__mapDeps([0, 1]))).export_84ce8d70db87
};
Le();
function Le() {
    Ae({
        load: async i => {
            {
                const a = $e[i];
                if (!a)
                    throw new Error(`client reference not found '${i}'`);
                return a()
            }
        }
    })
}
let Rt = null;
function Qe() {
    return Rt === null && typeof lt.createContext == "function" && (Rt = lt.createContext(0)),
    Rt
}
const D = typeof window > "u";
const Ue = 50
  , xe = 3e4;
function ut(i) {
    const [a] = i.split("#")
      , _ = a.indexOf("?")
      , h = _ === -1 ? a : a.slice(0, _)
      , S = _ === -1 ? "" : a.slice(_);
    return (h.length > 1 && h.endsWith("/") ? h.slice(0, -1) : h) + ".rsc" + S
}
function Yt() {
    if (D)
        return new Map;
    const i = window;
    return i.__VINEXT_RSC_PREFETCH_CACHE__ || (i.__VINEXT_RSC_PREFETCH_CACHE__ = new Map),
    i.__VINEXT_RSC_PREFETCH_CACHE__
}
function bt() {
    if (D)
        return new Set;
    const i = window;
    return i.__VINEXT_RSC_PREFETCHED_URLS__ || (i.__VINEXT_RSC_PREFETCHED_URLS__ = new Set),
    i.__VINEXT_RSC_PREFETCHED_URLS__
}
function Xe(i, a) {
    const _ = Yt();
    if (_.size >= Ue) {
        const h = _.keys().next().value;
        h !== void 0 && _.delete(h)
    }
    _.set(i, {
        response: a,
        timestamp: Date.now()
    })
}
const rt = new Set;
function et() {
    for (const i of rt)
        i()
}
let At = D ? "" : window.location.search
  , Ft = new URLSearchParams(At);
function qe() {
    const i = window.location.search;
    return i !== At && (At = i,
    Ft = new URLSearchParams(i)),
    Ft
}
let Tt = D ? "/" : window.location.pathname;
function Fe() {
    const i = window.location.pathname;
    return i !== Tt && (Tt = i),
    Tt
}
function tt(i) {
    JSON.stringify(i)
}
function je() {
    return D ? "/" : lt.useSyncExternalStore(i => (rt.add(i),
    () => {
        rt.delete(i)
    }
    ), Fe, () => "/")
}
function ke() {
    return D ? new URLSearchParams : lt.useSyncExternalStore(i => (rt.add(i),
    () => {
        rt.delete(i)
    }
    ), qe, () => new URLSearchParams)
}
function Be(i) {
    return i.startsWith("http://") || i.startsWith("https://") || i.startsWith("//")
}
function He(i) {
    if (typeof window > "u")
        return !1;
    if (i.startsWith("#"))
        return !0;
    try {
        const a = new URL(window.location.href)
          , _ = new URL(i,window.location.href);
        return a.pathname === _.pathname && a.search === _.search && _.hash !== ""
    } catch {
        return !1
    }
}
function Bt(i) {
    if (!i || i === "#") {
        window.scrollTo(0, 0);
        return
    }
    const a = i.slice(1)
      , _ = document.getElementById(a);
    _ && _.scrollIntoView({
        behavior: "auto"
    })
}
const Je = D ? null : window.history.replaceState.bind(window.history);
function We() {
    const i = window.history.state ?? {};
    Je.call(window.history, {
        ...i,
        __vinext_scrollX: window.scrollX,
        __vinext_scrollY: window.scrollY
    }, "")
}
function Ge(i) {
    if (i && typeof i == "object" && "__vinext_scrollY"in i) {
        const {__vinext_scrollX: a, __vinext_scrollY: _} = i;
        Promise.resolve().then( () => {
            const h = window.__VINEXT_RSC_PENDING__ ?? null;
            h ? h.then( () => {
                requestAnimationFrame( () => {
                    window.scrollTo(a, _)
                }
                )
            }
            ) : requestAnimationFrame( () => {
                window.scrollTo(a, _)
            }
            )
        }
        )
    }
}
async function Ht(i, a, _) {
    if (Be(i)) {
        a === "replace" ? window.location.replace(i) : window.location.assign(i);
        return
    }
    const h = i;
    if (a === "push" && We(),
    He(h)) {
        const y = h.includes("#") ? h.slice(h.indexOf("#")) : "";
        a === "replace" ? window.history.replaceState(null, "", h) : window.history.pushState(null, "", h),
        et(),
        _ && Bt(y);
        return
    }
    const S = h.indexOf("#")
      , v = S !== -1 ? h.slice(S) : "";
    a === "replace" ? window.history.replaceState(null, "", h) : window.history.pushState(null, "", h),
    et(),
    typeof window.__VINEXT_RSC_NAVIGATE__ == "function" && await window.__VINEXT_RSC_NAVIGATE__(h),
    _ && (v ? Bt(v) : window.scrollTo(0, 0))
}
function tn() {
    return {
        push(a, _) {
            D || Ht(a, "push", _?.scroll !== !1)
        },
        replace(a, _) {
            D || Ht(a, "replace", _?.scroll !== !1)
        },
        back() {
            D || window.history.back()
        },
        forward() {
            D || window.history.forward()
        },
        refresh() {
            D || typeof window.__VINEXT_RSC_NAVIGATE__ == "function" && window.__VINEXT_RSC_NAVIGATE__(window.location.href)
        },
        prefetch(a) {
            if (D)
                return;
            const _ = a
              , h = ut(_)
              , S = bt();
            S.has(h) || (S.add(h),
            fetch(h, {
                headers: {
                    Accept: "text/x-component"
                },
                priority: "low"
            }).then(v => {
                v.ok ? Xe(h, v) : S.delete(h)
            }
            ).catch( () => {
                S.delete(h)
            }
            ))
        }
    }
}
var Jt;
(function(i) {
    i.push = "push",
    i.replace = "replace"
}
)(Jt || (Jt = {}));
if (!D) {
    window.addEventListener("popstate", _ => {
        et(),
        Ge(_.state)
    }
    );
    const i = window.history.pushState.bind(window.history)
      , a = window.history.replaceState.bind(window.history);
    window.history.pushState = function(h, S, v) {
        i(h, S, v),
        et()
    }
    ,
    window.history.replaceState = function(h, S, v) {
        a(h, S, v),
        et()
    }
}
let nt;
function ze(i) {
    const a = new TextEncoder;
    return new ReadableStream({
        start(_) {
            for (const h of i)
                _.enqueue(a.encode(h));
            _.close()
        }
    })
}
function Ye() {
    const i = new TextEncoder;
    return new ReadableStream({
        start(a) {
            const _ = self.__VINEXT_RSC_CHUNKS__ || [];
            for (const y of _)
                a.enqueue(i.encode(y));
            if (self.__VINEXT_RSC_DONE__) {
                a.close();
                return
            }
            let h = !1;
            function S() {
                h || (h = !0,
                a.close())
            }
            const v = self.__VINEXT_RSC_CHUNKS__ = self.__VINEXT_RSC_CHUNKS__ || [];
            v.push = function(y) {
                return Array.prototype.push.call(this, y),
                h || (a.enqueue(i.encode(y)),
                self.__VINEXT_RSC_DONE__ && S()),
                this.length
            }
            ,
            typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", S) : S())
        }
    })
}
Ve(async (i, a) => {
    const _ = Oe()
      , h = await Pe(a, {
        temporaryReferences: _
    })
      , S = await fetch(ut(window.location.pathname + window.location.search), {
        method: "POST",
        headers: {
            "x-rsc-action": i
        },
        body: h
    })
      , v = S.headers.get("x-action-redirect");
    if (v) {
        try {
            if (new URL(v,window.location.origin).origin !== window.location.origin) {
                window.location.href = v;
                return
            }
        } catch {}
        (S.headers.get("x-action-redirect-type") || "replace") === "push" ? window.history.pushState(null, "", v) : window.history.replaceState(null, "", v),
        typeof window.__VINEXT_RSC_NAVIGATE__ == "function" && window.__VINEXT_RSC_NAVIGATE__(v);
        return
    }
    const y = await Wt(Promise.resolve(S), {
        temporaryReferences: _
    });
    if (y && typeof y == "object" && "root"in y) {
        if (nt.render(y.root),
        y.returnValue) {
            if (!y.returnValue.ok)
                throw y.returnValue.data;
            return y.returnValue.data
        }
        return
    }
    return nt.render(y),
    y
}
);
async function Ke() {
    let i;
    if (self.__VINEXT_RSC_CHUNKS__ || self.__VINEXT_RSC_DONE__ || self.__VINEXT_RSC__)
        if (self.__VINEXT_RSC__) {
            const _ = self.__VINEXT_RSC__;
            delete self.__VINEXT_RSC__,
            _.params && tt(_.params),
            i = ze(_.rsc)
        } else
            self.__VINEXT_RSC_PARAMS__ && tt(self.__VINEXT_RSC_PARAMS__),
            i = Ye();
    else {
        const _ = await fetch(ut(window.location.pathname + window.location.search))
          , h = _.headers.get("X-Vinext-Params");
        if (h)
            try {
                tt(JSON.parse(h))
            } catch {}
        i = _.body
    }
    const a = await Ne(i);
    nt = ve.hydrateRoot(document, a, void 0),
    window.__VINEXT_RSC_ROOT__ = nt,
    window.__VINEXT_RSC_NAVIGATE__ = async function(h) {
        try {
            const S = new URL(h,window.location.origin)
              , v = ut(S.pathname + S.search);
            let y;
            const b = Yt()
              , x = b.get(v);
            x && Date.now() - x.timestamp < xe ? (y = x.response,
            b.delete(v),
            bt().delete(v)) : x && (b.delete(v),
            bt().delete(v)),
            y || (y = await fetch(v, {
                headers: {
                    Accept: "text/x-component"
                }
            }));
            const A = y.headers.get("X-Vinext-Params");
            if (A)
                try {
                    tt(JSON.parse(A))
                } catch {}
            else
                tt({});
            const X = await Wt(Promise.resolve(y));
            ye.flushSync(function() {
                nt.render(X)
            })
        } catch (S) {
            console.error("[vinext] RSC navigation error:", S),
            window.location.href = h
        }
    }
    ,
    window.addEventListener("popstate", () => {
        const _ = window.__VINEXT_RSC_NAVIGATE__(window.location.href);
        window.__VINEXT_RSC_PENDING__ = _,
        _.finally( () => {
            window.__VINEXT_RSC_PENDING__ === _ && (window.__VINEXT_RSC_PENDING__ = null)
        }
        )
    }
    )
}
Ke();
export {R as _, bt as a, ke as b, tn as c, Qe as g, Xe as s, ut as t, je as u};
