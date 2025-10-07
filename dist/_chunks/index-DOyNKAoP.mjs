import { useRef, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { FileXls } from "@strapi/icons";
import { Flex, Button, Modal, Field } from "@strapi/design-system";
import { useLocation } from "react-router-dom";
import { useFetchClient } from "@strapi/strapi/admin";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "strapi-xlsx-impexp-plugin";
const Initializer = ({ setPlugin }) => {
  const ref2 = useRef(setPlugin);
  useEffect(() => {
    ref2.current(PLUGIN_ID);
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsx(FileXls, {});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var type = TypeError;
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace$1 = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat$1 = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
  return O.__proto__;
} : null);
function addNumericSeparator(num, str) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
    return str;
  }
  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof num === "number") {
    var int = num < 0 ? -$floor(-num) : $floor(num);
    if (int !== num) {
      var intStr = String(int);
      var dec = $slice.call(str, intStr.length + 1);
      return $replace$1.call(intStr, sepRegex, "$&_") + "." + $replace$1.call($replace$1.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace$1.call(str, sepRegex, "$&_");
}
var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
var quotes = {
  __proto__: null,
  "double": '"',
  single: "'"
};
var quoteREs = {
  __proto__: null,
  "double": /(["\\])/g,
  single: /(['\\])/g
};
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$3(opts, "quoteStyle") && !has$3(quotes, opts.quoteStyle)) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (has$3(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }
  var numericSeparator = opts.numericSeparator;
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    var str = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str) : str;
  }
  if (typeof obj === "bigint") {
    var bigIntStr = String(obj) + "n";
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$3(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$3(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function" && !isRegExp$1(obj)) {
    var name = nameOf(obj);
    var keys = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
  }
  if (isSymbol(obj)) {
    var symString = hasShammedSymbols ? $replace$1.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj)) {
    var s = "<" + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
    }
    s += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s += "...";
    }
    s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
    return s;
  }
  if (isArray$3(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
      return "{ [" + String(obj) + "] " + $join.call($concat$1.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
    }
    if (parts.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap(obj)) {
    var mapParts = [];
    if (mapForEach) {
      mapForEach.call(obj, function(value, key) {
        mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
      });
    }
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet(obj)) {
    var setParts = [];
    if (setForEach) {
      setForEach.call(obj, function(value) {
        setParts.push(inspect2(value, obj));
      });
    }
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt(obj)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj)));
  }
  if (isBoolean(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (typeof window !== "undefined" && obj === window) {
    return "{ [object Window] }";
  }
  if (typeof globalThis !== "undefined" && obj === globalThis || typeof commonjsGlobal !== "undefined" && obj === commonjsGlobal) {
    return "{ [object globalThis] }";
  }
  if (!isDate(obj) && !isRegExp$1(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr$1(obj), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat$1.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s, defaultStyle, opts) {
  var style = opts.quoteStyle || defaultStyle;
  var quoteChar = quotes[style];
  return quoteChar + s + quoteChar;
}
function quote(s) {
  return $replace$1.call(String(s), /"/g, "&quot;");
}
function canTrustToString(obj) {
  return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
}
function isArray$3(obj) {
  return toStr$1(obj) === "[object Array]" && canTrustToString(obj);
}
function isDate(obj) {
  return toStr$1(obj) === "[object Date]" && canTrustToString(obj);
}
function isRegExp$1(obj) {
  return toStr$1(obj) === "[object RegExp]" && canTrustToString(obj);
}
function isError(obj) {
  return toStr$1(obj) === "[object Error]" && canTrustToString(obj);
}
function isString(obj) {
  return toStr$1(obj) === "[object String]" && canTrustToString(obj);
}
function isNumber(obj) {
  return toStr$1(obj) === "[object Number]" && canTrustToString(obj);
}
function isBoolean(obj) {
  return toStr$1(obj) === "[object Boolean]" && canTrustToString(obj);
}
function isSymbol(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
function isBigInt(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
var hasOwn$1 = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$3(obj, key) {
  return hasOwn$1.call(obj, key);
}
function toStr$1(obj) {
  return objectToString.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m) {
    return m[1];
  }
  return null;
}
function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }
  return -1;
}
function isMap(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }
    return x instanceof Map;
  } catch (e) {
  }
  return false;
}
function isWeakMap(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e) {
  }
  return false;
}
function isSet(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }
    return x instanceof Set;
  } catch (e) {
  }
  return false;
}
function isWeakSet(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e) {
  }
  return false;
}
function isElement(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
}
function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
  }
  var quoteRE = quoteREs[opts.quoteStyle || "single"];
  quoteRE.lastIndex = 0;
  var s = $replace$1.call($replace$1.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, "single", opts);
}
function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type2) {
  return type2 + " { ? }";
}
function collectionOf(type2, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
  return type2 + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), " ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$3(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i = 0; i < obj.length; i++) {
      xs[i] = has$3(obj, i) ? inspect2(obj[i], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k = 0; k < syms.length; k++) {
      symMap["$" + syms[k]] = syms[k];
    }
  }
  for (var key in obj) {
    if (!has$3(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var inspect$3 = objectInspect;
var $TypeError$5 = type;
var listGetNode = function(list, key, isDelete) {
  var prev = list;
  var curr;
  for (; (curr = prev.next) != null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      if (!isDelete) {
        curr.next = /** @type {NonNullable<typeof list.next>} */
        list.next;
        list.next = curr;
      }
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  if (!objects) {
    return void 0;
  }
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
    {
      // eslint-disable-line no-param-reassign, no-extra-parens
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  if (!objects) {
    return false;
  }
  return !!listGetNode(objects, key);
};
var listDelete = function(objects, key) {
  if (objects) {
    return listGetNode(objects, key, true);
  }
};
var sideChannelList = function getSideChannelList() {
  var $o;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$5("Side channel does not contain " + inspect$3(key));
      }
    },
    "delete": function(key) {
      var root = $o && $o.next;
      var deletedNode = listDelete($o, key);
      if (deletedNode && root && root === deletedNode) {
        $o = void 0;
      }
      return !!deletedNode;
    },
    get: function(key) {
      return listGet($o, key);
    },
    has: function(key) {
      return listHas($o, key);
    },
    set: function(key, value) {
      if (!$o) {
        $o = {
          next: void 0
        };
      }
      listSet(
        /** @type {NonNullable<typeof $o>} */
        $o,
        key,
        value
      );
    }
  };
  return channel;
};
var esObjectAtoms = Object;
var esErrors = Error;
var _eval = EvalError;
var range = RangeError;
var ref = ReferenceError;
var syntax = SyntaxError;
var uri = URIError;
var abs$1 = Math.abs;
var floor$1 = Math.floor;
var max$2 = Math.max;
var min$1 = Math.min;
var pow$1 = Math.pow;
var round$1 = Math.round;
var _isNaN = Number.isNaN || function isNaN2(a) {
  return a !== a;
};
var $isNaN = _isNaN;
var sign$1 = function sign(number) {
  if ($isNaN(number) || number === 0) {
    return number;
  }
  return number < 0 ? -1 : 1;
};
var gOPD = Object.getOwnPropertyDescriptor;
var $gOPD$1 = gOPD;
if ($gOPD$1) {
  try {
    $gOPD$1([], "length");
  } catch (e) {
    $gOPD$1 = null;
  }
}
var gopd = $gOPD$1;
var $defineProperty$1 = Object.defineProperty || false;
if ($defineProperty$1) {
  try {
    $defineProperty$1({}, "a", { value: 1 });
  } catch (e) {
    $defineProperty$1 = false;
  }
}
var esDefineProperty = $defineProperty$1;
var shams;
var hasRequiredShams;
function requireShams() {
  if (hasRequiredShams) return shams;
  hasRequiredShams = 1;
  shams = function hasSymbols2() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
      return false;
    }
    if (typeof Symbol.iterator === "symbol") {
      return true;
    }
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") {
      return false;
    }
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
      return false;
    }
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
      return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) {
      return false;
    }
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
      return false;
    }
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
      return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
      return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
      return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(obj, sym)
      );
      if (descriptor.value !== symVal || descriptor.enumerable !== true) {
        return false;
      }
    }
    return true;
  };
  return shams;
}
var hasSymbols$1;
var hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols$1;
  hasRequiredHasSymbols = 1;
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = requireShams();
  hasSymbols$1 = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") {
      return false;
    }
    if (typeof Symbol !== "function") {
      return false;
    }
    if (typeof origSymbol("foo") !== "symbol") {
      return false;
    }
    if (typeof Symbol("bar") !== "symbol") {
      return false;
    }
    return hasSymbolSham();
  };
  return hasSymbols$1;
}
var Reflect_getPrototypeOf;
var hasRequiredReflect_getPrototypeOf;
function requireReflect_getPrototypeOf() {
  if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
  hasRequiredReflect_getPrototypeOf = 1;
  Reflect_getPrototypeOf = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  return Reflect_getPrototypeOf;
}
var Object_getPrototypeOf;
var hasRequiredObject_getPrototypeOf;
function requireObject_getPrototypeOf() {
  if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
  hasRequiredObject_getPrototypeOf = 1;
  var $Object2 = esObjectAtoms;
  Object_getPrototypeOf = $Object2.getPrototypeOf || null;
  return Object_getPrototypeOf;
}
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var toStr = Object.prototype.toString;
var max$1 = Math.max;
var funcType = "[object Function]";
var concatty = function concatty2(a, b) {
  var arr = [];
  for (var i = 0; i < a.length; i += 1) {
    arr[i] = a[i];
  }
  for (var j = 0; j < b.length; j += 1) {
    arr[j + a.length] = b[j];
  }
  return arr;
};
var slicy = function slicy2(arrLike, offset) {
  var arr = [];
  for (var i = offset, j = 0; i < arrLike.length; i += 1, j += 1) {
    arr[j] = arrLike[i];
  }
  return arr;
};
var joiny = function(arr, joiner) {
  var str = "";
  for (var i = 0; i < arr.length; i += 1) {
    str += arr[i];
    if (i + 1 < arr.length) {
      str += joiner;
    }
  }
  return str;
};
var implementation$1 = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr.apply(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slicy(arguments, 1);
  var bound;
  var binder = function() {
    if (this instanceof bound) {
      var result = target.apply(
        this,
        concatty(args, arguments)
      );
      if (Object(result) === result) {
        return result;
      }
      return this;
    }
    return target.apply(
      that,
      concatty(args, arguments)
    );
  };
  var boundLength = max$1(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = "$" + i;
  }
  bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation = implementation$1;
var functionBind = Function.prototype.bind || implementation;
var functionCall = Function.prototype.call;
var functionApply;
var hasRequiredFunctionApply;
function requireFunctionApply() {
  if (hasRequiredFunctionApply) return functionApply;
  hasRequiredFunctionApply = 1;
  functionApply = Function.prototype.apply;
  return functionApply;
}
var reflectApply = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
var bind$2 = functionBind;
var $apply$1 = requireFunctionApply();
var $call$2 = functionCall;
var $reflectApply = reflectApply;
var actualApply = $reflectApply || bind$2.call($call$2, $apply$1);
var bind$1 = functionBind;
var $TypeError$4 = type;
var $call$1 = functionCall;
var $actualApply = actualApply;
var callBindApplyHelpers = function callBindBasic(args) {
  if (args.length < 1 || typeof args[0] !== "function") {
    throw new $TypeError$4("a function is required");
  }
  return $actualApply(bind$1, $call$1, args);
};
var get;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get;
  hasRequiredGet = 1;
  var callBind = callBindApplyHelpers;
  var gOPD2 = gopd;
  var hasProtoAccessor;
  try {
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
      throw e;
    }
  }
  var desc = !!hasProtoAccessor && gOPD2 && gOPD2(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  );
  var $Object2 = Object;
  var $getPrototypeOf = $Object2.getPrototypeOf;
  get = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
    /** @type {import('./get')} */
    function getDunder(value) {
      return $getPrototypeOf(value == null ? value : $Object2(value));
    }
  ) : false;
  return get;
}
var getProto$1;
var hasRequiredGetProto;
function requireGetProto() {
  if (hasRequiredGetProto) return getProto$1;
  hasRequiredGetProto = 1;
  var reflectGetProto = requireReflect_getPrototypeOf();
  var originalGetProto = requireObject_getPrototypeOf();
  var getDunderProto = requireGet();
  getProto$1 = reflectGetProto ? function getProto2(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto2(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new TypeError("getProto: not an object");
    }
    return originalGetProto(O);
  } : getDunderProto ? function getProto2(O) {
    return getDunderProto(O);
  } : null;
  return getProto$1;
}
var hasown;
var hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  var bind3 = functionBind;
  hasown = bind3.call(call, $hasOwn);
  return hasown;
}
var undefined$1;
var $Object = esObjectAtoms;
var $Error = esErrors;
var $EvalError = _eval;
var $RangeError = range;
var $ReferenceError = ref;
var $SyntaxError = syntax;
var $TypeError$3 = type;
var $URIError = uri;
var abs = abs$1;
var floor = floor$1;
var max = max$2;
var min = min$1;
var pow = pow$1;
var round = round$1;
var sign2 = sign$1;
var $Function = Function;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD = gopd;
var $defineProperty = esDefineProperty;
var throwTypeError = function() {
  throw new $TypeError$3();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols = requireHasSymbols()();
var getProto = requireGetProto();
var $ObjectGPO = requireObject_getPrototypeOf();
var $ReflectGPO = requireReflect_getPrototypeOf();
var $apply = requireFunctionApply();
var $call = functionCall;
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": $Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": $EvalError,
  "%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": $Object,
  "%Object.getOwnPropertyDescriptor%": $gOPD,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": $RangeError,
  "%ReferenceError%": $ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$3,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": $URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
  "%Function.prototype.call%": $call,
  "%Function.prototype.apply%": $apply,
  "%Object.defineProperty%": $defineProperty,
  "%Object.getPrototypeOf%": $ObjectGPO,
  "%Math.abs%": abs,
  "%Math.floor%": floor,
  "%Math.max%": max,
  "%Math.min%": min,
  "%Math.pow%": pow,
  "%Math.round%": round,
  "%Math.sign%": sign2,
  "%Reflect.getPrototypeOf%": $ReflectGPO
};
if (getProto) {
  try {
    null.error;
  } catch (e) {
    var errorProto = getProto(getProto(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto) {
      value = getProto(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind2 = functionBind;
var hasOwn = requireHasown();
var $concat = bind2.call($call, Array.prototype.concat);
var $spliceApply = bind2.call($apply, Array.prototype.splice);
var $replace = bind2.call($call, String.prototype.replace);
var $strSlice = bind2.call($call, String.prototype.slice);
var $exec = bind2.call($call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace(string, rePropName, function(match, number, quote2, subString) {
    result[result.length] = quote2 ? $replace(subString, reEscapeChar, "$1") : number || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$3("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$3("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$3('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$3("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var GetIntrinsic$2 = getIntrinsic;
var callBindBasic2 = callBindApplyHelpers;
var $indexOf = callBindBasic2([GetIntrinsic$2("%String.prototype.indexOf%")]);
var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = (
    /** @type {(this: unknown, ...args: unknown[]) => unknown} */
    GetIntrinsic$2(name, !!allowMissing)
  );
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBindBasic2(
      /** @type {const} */
      [intrinsic]
    );
  }
  return intrinsic;
};
var GetIntrinsic$1 = getIntrinsic;
var callBound$1 = callBound$2;
var inspect$2 = objectInspect;
var $TypeError$2 = type;
var $Map = GetIntrinsic$1("%Map%", true);
var $mapGet = callBound$1("Map.prototype.get", true);
var $mapSet = callBound$1("Map.prototype.set", true);
var $mapHas = callBound$1("Map.prototype.has", true);
var $mapDelete = callBound$1("Map.prototype.delete", true);
var $mapSize = callBound$1("Map.prototype.size", true);
var sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */
function getSideChannelMap() {
  var $m;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError$2("Side channel does not contain " + inspect$2(key));
      }
    },
    "delete": function(key) {
      if ($m) {
        var result = $mapDelete($m, key);
        if ($mapSize($m) === 0) {
          $m = void 0;
        }
        return result;
      }
      return false;
    },
    get: function(key) {
      if ($m) {
        return $mapGet($m, key);
      }
    },
    has: function(key) {
      if ($m) {
        return $mapHas($m, key);
      }
      return false;
    },
    set: function(key, value) {
      if (!$m) {
        $m = new $Map();
      }
      $mapSet($m, key, value);
    }
  };
  return channel;
};
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$2;
var inspect$1 = objectInspect;
var getSideChannelMap$1 = sideChannelMap;
var $TypeError$1 = type;
var $WeakMap = GetIntrinsic2("%WeakMap%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
var sideChannelWeakmap = $WeakMap ? (
  /** @type {Exclude<import('.'), false>} */
  function getSideChannelWeakMap() {
    var $wm;
    var $m;
    var channel = {
      assert: function(key) {
        if (!channel.has(key)) {
          throw new $TypeError$1("Side channel does not contain " + inspect$1(key));
        }
      },
      "delete": function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapDelete($wm, key);
          }
        } else if (getSideChannelMap$1) {
          if ($m) {
            return $m["delete"](key);
          }
        }
        return false;
      },
      get: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapGet($wm, key);
          }
        }
        return $m && $m.get(key);
      },
      has: function(key) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if ($wm) {
            return $weakMapHas($wm, key);
          }
        }
        return !!$m && $m.has(key);
      },
      set: function(key, value) {
        if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
          if (!$wm) {
            $wm = new $WeakMap();
          }
          $weakMapSet($wm, key, value);
        } else if (getSideChannelMap$1) {
          if (!$m) {
            $m = getSideChannelMap$1();
          }
          $m.set(key, value);
        }
      }
    };
    return channel;
  }
) : getSideChannelMap$1;
var $TypeError = type;
var inspect = objectInspect;
var getSideChannelList2 = sideChannelList;
var getSideChannelMap2 = sideChannelMap;
var getSideChannelWeakMap2 = sideChannelWeakmap;
var makeChannel = getSideChannelWeakMap2 || getSideChannelMap2 || getSideChannelList2;
var sideChannel = function getSideChannel() {
  var $channelData;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    "delete": function(key) {
      return !!$channelData && $channelData["delete"](key);
    },
    get: function(key) {
      return $channelData && $channelData.get(key);
    },
    has: function(key) {
      return !!$channelData && $channelData.has(key);
    },
    set: function(key, value) {
      if (!$channelData) {
        $channelData = makeChannel();
      }
      $channelData.set(key, value);
    }
  };
  return channel;
};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var formats$3 = {
  "default": Format.RFC3986,
  formatters: {
    RFC1738: function(value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
var formats$2 = formats$3;
var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;
var hexTable = function() {
  var array = [];
  for (var i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
}();
var compactQueue = function compactQueue2(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];
    if (isArray$2(obj)) {
      var compacted = [];
      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== "undefined") {
          compacted.push(obj[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source, options) {
  var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== "undefined") {
      obj[i] = source[i];
    }
  }
  return obj;
};
var merge = function merge2(target, source, options) {
  if (!source) {
    return target;
  }
  if (typeof source !== "object") {
    if (isArray$2(target)) {
      target.push(source);
    } else if (target && typeof target === "object") {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }
    return target;
  }
  if (!target || typeof target !== "object") {
    return [target].concat(source);
  }
  var mergeTarget = target;
  if (isArray$2(target) && !isArray$2(source)) {
    mergeTarget = arrayToObject(target, options);
  }
  if (isArray$2(target) && isArray$2(source)) {
    source.forEach(function(item, i) {
      if (has$2.call(target, i)) {
        var targetItem = target[i];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i] = merge2(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }
  return Object.keys(source).reduce(function(acc, key) {
    var value = source[key];
    if (has$2.call(acc, key)) {
      acc[key] = merge2(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function(acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};
var decode = function(str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};
var encode = function encode2(str, defaultEncoder, charset, kind, format) {
  if (str.length === 0) {
    return str;
  }
  var string = str;
  if (typeof str === "symbol") {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  var out = "";
  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats$2.RFC1738 && (c === 40 || c === 41)) {
      out += string.charAt(i);
      continue;
    }
    if (c < 128) {
      out = out + hexTable[c];
      continue;
    }
    if (c < 2048) {
      out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
      continue;
    }
    i += 1;
    c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
    out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
  }
  return out;
};
var compact = function compact2(value) {
  var queue = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);
    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }
  compactQueue(queue);
  return value;
};
var isRegExp = function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};
var isBuffer = function isBuffer2(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine2(a, b) {
  return [].concat(a, b);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$2(val)) {
    var mapped = [];
    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
};
var utils$2 = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer,
  isRegExp,
  maybeMap,
  merge
};
var getSideChannel2 = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + "[]";
  },
  comma: "comma",
  indices: function indices(prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$1 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$1 = {
  addQueryPrefix: false,
  allowDots: false,
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encoder: utils$1.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var sentinel = {};
var stringify$1 = function stringify(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate2, format, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj = object;
  var tmpSc = sideChannel2;
  var step = 0;
  var findFlag = false;
  while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
    var pos = tmpSc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        findFlag = true;
      }
    }
    if (typeof tmpSc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate2(obj);
  } else if (generateArrayPrefix === "comma" && isArray$1(obj)) {
    obj = utils$1.maybeMap(obj, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, "key", format) : prefix;
    }
    obj = "";
  }
  if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, "key", format);
      return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$1.encoder, charset, "value", format))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj))];
  }
  var values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$1(obj)) {
    if (encodeValuesOnly && encoder) {
      obj = utils$1.maybeMap(obj, encoder);
    }
    objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray$1(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }
  var adjustedPrefix = commaRoundTrip && isArray$1(obj) && obj.length === 1 ? prefix + "[]" : prefix;
  for (var j = 0; j < objKeys.length; ++j) {
    var key = objKeys[j];
    var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
    if (skipNulls && value === null) {
      continue;
    }
    var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
    sideChannel2.set(object, step);
    var valueSideChannel = getSideChannel2();
    valueSideChannel.set(sentinel, sideChannel2);
    pushToArray(values, stringify(
      value,
      keyPrefix,
      generateArrayPrefix,
      commaRoundTrip,
      strictNullHandling,
      skipNulls,
      generateArrayPrefix === "comma" && encodeValuesOnly && isArray$1(obj) ? null : encoder,
      filter,
      sort,
      allowDots,
      serializeDate2,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
  if (!opts) {
    return defaults$1;
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$1.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  var formatter = formats$1.formatters[format];
  var filter = defaults$1.filter;
  if (typeof opts.filter === "function" || isArray$1(opts.filter)) {
    filter = opts.filter;
  }
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
    allowDots: typeof opts.allowDots === "undefined" ? defaults$1.allowDots : !!opts.allowDots,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$1.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$1.encode,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$1.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$1.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$1.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};
var stringify_1 = function(object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray$1(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }
  var keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  var arrayFormat;
  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && "indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = "indices";
  }
  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  }
  var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
  if (!objKeys) {
    objKeys = Object.keys(obj);
  }
  if (options.sort) {
    objKeys.sort(options.sort);
  }
  var sideChannel2 = getSideChannel2();
  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    pushToArray(keys, stringify$1(
      obj[key],
      key,
      generateArrayPrefix,
      commaRoundTrip,
      options.strictNullHandling,
      options.skipNulls,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel2
    ));
  }
  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils = utils$2;
var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;
var defaults = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};
var interpretNumericEntities = function(str) {
  return str.replace(/&#(\d+);/g, function($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};
var parseArrayValue = function(val, options) {
  if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1;
  var i;
  var charset = options.charset;
  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf("utf8=") === 0) {
        if (parts[i] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts[i] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i;
        i = parts.length;
      }
    }
  }
  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }
    var part = parts[i];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key, val;
    if (pos === -1) {
      key = options.decoder(part, defaults.decoder, charset, "key");
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
      val = utils.maybeMap(
        parseArrayValue(part.slice(pos + 1), options),
        function(encodedVal) {
          return options.decoder(encodedVal, defaults.decoder, charset, "value");
        }
      );
    }
    if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(val);
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray(val) ? [val] : val;
    }
    if (has.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
  return obj;
};
var parseObject = function(chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);
  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];
    if (root === "[]" && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
      var index2 = parseInt(cleanRoot, 10);
      if (!options.parseArrays && cleanRoot === "") {
        obj = { 0: leaf };
      } else if (!isNaN(index2) && root !== cleanRoot && String(index2) === cleanRoot && index2 >= 0 && (options.parseArrays && index2 <= options.arrayLimit)) {
        obj = [];
        obj[index2] = leaf;
      } else if (cleanRoot !== "__proto__") {
        obj[cleanRoot] = leaf;
      }
    }
    leaf = obj;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options.depth > 0 && brackets2.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key;
  var keys = [];
  if (parent) {
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(parent);
  }
  var i = 0;
  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(segment[1]);
  }
  if (segment) {
    keys.push("[" + key.slice(segment.index) + "]");
  }
  return parseObject(keys, val, options, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults;
  }
  if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
    delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
};
var parse$1 = function(str, opts) {
  var options = normalizeParseOptions(opts);
  if (str === "" || str === null || typeof str === "undefined") {
    return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  }
  var tempObj = typeof str === "string" ? parseValues(str, options) : str;
  var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  var keys = Object.keys(tempObj);
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
    obj = utils.merge(obj, newObj, options);
  }
  if (options.allowSparse === true) {
    return obj;
  }
  return utils.compact(obj);
};
var stringify2 = stringify_1;
var parse = parse$1;
var formats = formats$3;
var lib = {
  formats,
  parse,
  stringify: stringify2
};
const qs = /* @__PURE__ */ getDefaultExportFromCjs(lib);
const ExportButton = () => {
  const { get: get2 } = useFetchClient();
  const location2 = useLocation();
  const [allowedExportCollections, setAllowedExportCollections] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await get2("/strapi-xlsx-impexp-plugin/config");
        let config;
        if (Array.isArray(response.data)) {
          config = response.data[0];
        } else {
          config = response.data;
        }
        if (config?.selectedExportCollections) {
          setAllowedExportCollections(config.selectedExportCollections);
        } else {
          setAllowedExportCollections([]);
        }
      } catch (error) {
        console.error("Error fetching saved config:", error);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [get2]);
  const segments = location2.pathname.split("/");
  const contentTypeUid = segments.at(-1) || "";
  if (loadingConfig) return null;
  if (!allowedExportCollections.includes(contentTypeUid)) return null;
  const handleExport = async () => {
    const messageLines = [];
    const parsedQuery = qs.parse(location2.search, {
      ignoreQueryPrefix: true
    });
    if (parsedQuery.filters) {
      const filters = { ...parsedQuery.filters };
      if (Object.keys(filters).length > 0) {
        messageLines.push(`Filters: ${JSON.stringify(filters)}`);
      }
    }
    if (parsedQuery._q) {
      messageLines.push(`Search Keyword: ${parsedQuery._q}`);
    }
    if (!parsedQuery.filters && !parsedQuery._q) {
      messageLines.push("There are not filters or search provided (exporting ALL data)");
    }
    const confirmMessage = `Export will be performed with the following conditions:

${messageLines.join(
      "\n"
    )}

Proceed?`;
    if (!window.confirm(confirmMessage)) {
      return;
    }
    setIsExporting(true);
    const parts = location2.pathname.split("::");
    const collectionFull = parts[1] || "";
    const [collectionName] = collectionFull.split(".");
    try {
      let query = `collection=${collectionName}`;
      if (parsedQuery.filters) {
        const filtersQuery = qs.stringify(
          { filters: parsedQuery.filters },
          { encode: false }
        );
        if (filtersQuery) {
          query += `&${filtersQuery}`;
        }
      }
      if (parsedQuery._q) {
        query += `&_q=${encodeURIComponent(parsedQuery._q)}`;
      }
      const response = await get2(`/strapi-xlsx-impexp-plugin/export?${query}`);
      const { filename, base64, mime } = response.data;
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: mime });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      console.log("File downloaded successfully");
    } catch (error) {
      console.error("Error during export:", error);
      alert("Export failed: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };
  return /* @__PURE__ */ jsx(Flex, { direction: "row", gap: 2, children: /* @__PURE__ */ jsx(Button, { onClick: handleExport, disabled: isExporting, children: isExporting ? "Exporting..." : "Export" }) });
};
const ImportButton = () => {
  const { get: get2 } = useFetchClient();
  const [allowedImportCollections, setAllowedImportCollections] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const showModal = (title, message, success = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsSuccess(success);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
    setModalTitle("");
    setIsSuccess(false);
    if (isSuccess) {
      window.location.reload();
    }
  };
  const formatMessage = (message) => {
    return message.split("\n").map((line, index2) => /* @__PURE__ */ jsx("div", { style: { marginBottom: index2 > 0 ? "8px" : "0" }, children: line }, index2));
  };
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await get2("/strapi-xlsx-impexp-plugin/config");
        let config;
        if (Array.isArray(response.data)) {
          config = response.data[0];
        } else {
          config = response.data;
        }
        if (config?.selectedExportCollections) {
          setAllowedImportCollections(config.selectedExportCollections);
        } else {
          setAllowedImportCollections([]);
        }
      } catch (error) {
        console.error("Error fetching saved config:", error);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, [get2]);
  const segments = location.pathname.split("/");
  const contentTypeUid = segments.at(-1) || "";
  const fileInputRef = useRef(null);
  const handleImport = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".xlsx")) {
      showModal("Error", "Please select an Excel file (.xlsx)", false);
      return;
    }
    await uploadFile(file, contentTypeUid);
  };
  const uploadFile = async (file, contentTypeUid2) => {
    setIsImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("contentTypeUid", contentTypeUid2);
      const response = await fetch("/strapi-xlsx-impexp-plugin/import", {
        method: "POST",
        body: formData
      });
      const result = await response.json();
      if (result.success) {
        const successMessage = [
          "Import completed successfully!",
          "",
          `📊 Entity: ${contentTypeUid2}`,
          `📊 Total processed: ${result.totalProcessed}`,
          `✅ Created: ${result.created}`,
          `🔄 Updated: ${result.updated}`,
          `🗑️ Deleted: ${result.deleted}`,
          ...result.errors.length > 0 ? [
            "",
            "⚠️ Note: Some warnings occurred during import:",
            ...result.errors.map(
              (error) => `   • Row ${error.row}, Column "${error.column}": ${error.message}`
            )
          ] : []
        ].join("\n");
        showModal("Success", successMessage, true);
      } else {
        const errorMessage = [
          "Import failed!",
          "",
          `📊 Entity: ${contentTypeUid2}`,
          "❌ Errors encountered:",
          ...result.errors.map(
            (error, index2) => `${index2 + 1}. Row ${error.row}, Column "${error.column}": ${error.message}`
          ),
          "",
          `Total processed: ${result.totalProcessed}`
        ].join("\n");
        showModal("Error", errorMessage, false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showModal(
        "Error",
        `Error uploading file for entity: ${contentTypeUid2}

If the problem persists, check your connection and file format.`,
        false
      );
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  if (loadingConfig) {
    return /* @__PURE__ */ jsx(Flex, { direction: "row", gap: 2, children: /* @__PURE__ */ jsx(Button, { disabled: true, children: "Loading..." }) });
  }
  if (!allowedImportCollections.includes(contentTypeUid)) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Flex, { direction: "row", gap: 2, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        ref: fileInputRef,
        onChange: handleFileChange,
        accept: ".xlsx",
        style: { display: "none" },
        disabled: isImporting
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        onClick: handleImport,
        disabled: isImporting,
        variant: isImporting ? "secondary" : "default",
        children: isImporting ? "Importing..." : "Import"
      }
    ),
    isModalOpen && /* @__PURE__ */ jsx(Modal.Root, { open: isModalOpen, onOpenChange: closeModal, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
      /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: modalTitle }) }),
      /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Field.Root, { children: /* @__PURE__ */ jsx(Field.Label, { children: /* @__PURE__ */ jsx("div", { style: {
        whiteSpace: "pre-wrap",
        lineHeight: "1.5",
        fontFamily: "monospace",
        fontSize: "14px"
      }, children: formatMessage(modalMessage) }) }) }) }),
      /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: isSuccess ? "default" : "tertiary", children: isSuccess ? "Great!" : "Close" }) }) })
    ] }) })
  ] });
};
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID
      },
      Component: async () => {
        const { App } = await import("./App-B3xd9DY1.mjs");
        return App;
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "importButton",
      Component: ImportButton
    });
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "exportButton",
      Component: ExportButton
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-7AAB2fVK.mjs"), "./translations/ru.json": () => import("./ru-V0ahbdFn.mjs") }), `./translations/${locale}.json`, 3);
          const prefixedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [`${PLUGIN_ID}.${key}`, value])
          );
          return {
            data: prefixedData,
            locale
          };
        } catch {
          return {
            data: {},
            locale
          };
        }
      })
    );
  }
};
export {
  PLUGIN_ID as P,
  index as i
};
