var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var iterables_exports = {};
__export(iterables_exports, {
  concat: () => concat,
  every: () => every,
  filter: () => filter,
  find: () => find,
  groupBy: () => groupBy,
  isEmpty: () => isEmpty,
  isIterable: () => isIterable,
  join: () => join,
  map: () => map,
  reduce: () => reduce,
  repeat: () => repeat,
  size: () => size,
  take: () => take,
  zipObject: () => zipObject
});
module.exports = __toCommonJS(iterables_exports);
var import_getOwn = require("./getOwn");
function isIterable(value) {
  return typeof value === "object" && value !== null && Symbol.iterator in value || typeof value === "string";
}
function size(iterable) {
  if (typeof iterable === "string" || Array.isArray(iterable)) {
    return iterable.length;
  }
  if (iterable instanceof Set || iterable instanceof Map) {
    return iterable.size;
  }
  const iterator = iterable[Symbol.iterator]();
  let result = -1;
  for (let done = false; !done; result += 1) {
    done = Boolean(iterator.next().done);
  }
  return result;
}
function concat(...iterables) {
  return new ConcatIterable(iterables);
}
class ConcatIterable {
  constructor(iterables) {
    this.iterables = iterables;
  }
  *[Symbol.iterator]() {
    for (const iterable of this.iterables) {
      yield* iterable;
    }
  }
}
function every(iterable, predicate) {
  for (const value of iterable) {
    if (!predicate(value)) {
      return false;
    }
  }
  return true;
}
function filter(iterable, predicate) {
  return new FilterIterable(iterable, predicate);
}
class FilterIterable {
  constructor(iterable, predicate) {
    this.iterable = iterable;
    this.predicate = predicate;
  }
  [Symbol.iterator]() {
    return new FilterIterator(this.iterable[Symbol.iterator](), this.predicate);
  }
}
class FilterIterator {
  constructor(iterator, predicate) {
    this.iterator = iterator;
    this.predicate = predicate;
  }
  next() {
    while (true) {
      const nextIteration = this.iterator.next();
      if (nextIteration.done || this.predicate(nextIteration.value)) {
        return nextIteration;
      }
    }
  }
}
function find(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) {
      return value;
    }
  }
  return void 0;
}
function groupBy(iterable, fn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const value of iterable) {
    const key = fn(value);
    const existingGroup = (0, import_getOwn.getOwn)(result, key);
    if (existingGroup) {
      existingGroup.push(value);
    } else {
      result[key] = [value];
    }
  }
  return result;
}
const isEmpty = /* @__PURE__ */ __name((iterable) => Boolean(iterable[Symbol.iterator]().next().done), "isEmpty");
function join(iterable, separator) {
  let hasProcessedFirst = false;
  let result = "";
  for (const value of iterable) {
    const stringifiedValue = value == null ? "" : String(value);
    if (hasProcessedFirst) {
      result += separator + stringifiedValue;
    } else {
      result = stringifiedValue;
    }
    hasProcessedFirst = true;
  }
  return result;
}
function map(iterable, fn) {
  return new MapIterable(iterable, fn);
}
class MapIterable {
  constructor(iterable, fn) {
    this.iterable = iterable;
    this.fn = fn;
  }
  [Symbol.iterator]() {
    return new MapIterator(this.iterable[Symbol.iterator](), this.fn);
  }
}
class MapIterator {
  constructor(iterator, fn) {
    this.iterator = iterator;
    this.fn = fn;
  }
  next() {
    const nextIteration = this.iterator.next();
    if (nextIteration.done) {
      return nextIteration;
    }
    return {
      done: false,
      value: this.fn(nextIteration.value)
    };
  }
}
function reduce(iterable, fn, accumulator) {
  let result = accumulator;
  for (const value of iterable) {
    result = fn(result, value);
  }
  return result;
}
function repeat(value) {
  return new RepeatIterable(value);
}
class RepeatIterable {
  constructor(value) {
    this.value = value;
  }
  [Symbol.iterator]() {
    return new RepeatIterator(this.value);
  }
}
class RepeatIterator {
  constructor(value) {
    this.iteratorResult = {
      done: false,
      value
    };
  }
  next() {
    return this.iteratorResult;
  }
}
function take(iterable, amount) {
  return new TakeIterable(iterable, amount);
}
class TakeIterable {
  constructor(iterable, amount) {
    this.iterable = iterable;
    this.amount = amount;
  }
  [Symbol.iterator]() {
    return new TakeIterator(this.iterable[Symbol.iterator](), this.amount);
  }
}
class TakeIterator {
  constructor(iterator, amount) {
    this.iterator = iterator;
    this.amount = amount;
  }
  next() {
    const nextIteration = this.iterator.next();
    if (nextIteration.done || this.amount === 0) {
      return { done: true, value: void 0 };
    }
    this.amount -= 1;
    return nextIteration;
  }
}
function zipObject(props, values) {
  const result = {};
  const propsIterator = props[Symbol.iterator]();
  const valuesIterator = values[Symbol.iterator]();
  while (true) {
    const propIteration = propsIterator.next();
    if (propIteration.done) {
      break;
    }
    const valueIteration = valuesIterator.next();
    if (valueIteration.done) {
      break;
    }
    result[propIteration.value] = valueIteration.value;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  concat,
  every,
  filter,
  find,
  groupBy,
  isEmpty,
  isIterable,
  join,
  map,
  reduce,
  repeat,
  size,
  take,
  zipObject
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXRlcmFibGVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cblxuaW1wb3J0IHsgZ2V0T3duIH0gZnJvbSAnLi9nZXRPd24nO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJdGVyYWJsZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEl0ZXJhYmxlPHVua25vd24+IHtcbiAgcmV0dXJuIChcbiAgICAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gdmFsdWUpIHx8XG4gICAgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2l6ZShpdGVyYWJsZTogSXRlcmFibGU8dW5rbm93bj4pOiBudW1iZXIge1xuICAvLyBXZSBjaGVjayBmb3IgY29tbW9uIHR5cGVzIGFzIGFuIG9wdGltaXphdGlvbi5cbiAgaWYgKHR5cGVvZiBpdGVyYWJsZSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShpdGVyYWJsZSkpIHtcbiAgICByZXR1cm4gaXRlcmFibGUubGVuZ3RoO1xuICB9XG4gIGlmIChpdGVyYWJsZSBpbnN0YW5jZW9mIFNldCB8fCBpdGVyYWJsZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgIHJldHVybiBpdGVyYWJsZS5zaXplO1xuICB9XG5cbiAgY29uc3QgaXRlcmF0b3IgPSBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cbiAgbGV0IHJlc3VsdCA9IC0xO1xuICBmb3IgKGxldCBkb25lID0gZmFsc2U7ICFkb25lOyByZXN1bHQgKz0gMSkge1xuICAgIGRvbmUgPSBCb29sZWFuKGl0ZXJhdG9yLm5leHQoKS5kb25lKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0PFQ+KFxuICAuLi5pdGVyYWJsZXM6IFJlYWRvbmx5QXJyYXk8SXRlcmFibGU8VD4+XG4pOiBJdGVyYWJsZTxUPiB7XG4gIHJldHVybiBuZXcgQ29uY2F0SXRlcmFibGUoaXRlcmFibGVzKTtcbn1cblxuY2xhc3MgQ29uY2F0SXRlcmFibGU8VD4gaW1wbGVtZW50cyBJdGVyYWJsZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaXRlcmFibGVzOiBSZWFkb25seUFycmF5PEl0ZXJhYmxlPFQ+Pikge31cblxuICAqW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmF0b3I8VD4ge1xuICAgIGZvciAoY29uc3QgaXRlcmFibGUgb2YgdGhpcy5pdGVyYWJsZXMpIHtcbiAgICAgIHlpZWxkKiBpdGVyYWJsZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZXJ5PFQ+KFxuICBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gIHByZWRpY2F0ZTogKHZhbHVlOiBUKSA9PiBib29sZWFuXG4pOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgIGlmICghcHJlZGljYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcjxULCBTIGV4dGVuZHMgVD4oXG4gIGl0ZXJhYmxlOiBJdGVyYWJsZTxUPixcbiAgcHJlZGljYXRlOiAodmFsdWU6IFQpID0+IHZhbHVlIGlzIFNcbik6IEl0ZXJhYmxlPFM+O1xuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcjxUPihcbiAgaXRlcmFibGU6IEl0ZXJhYmxlPFQ+LFxuICBwcmVkaWNhdGU6ICh2YWx1ZTogVCkgPT4gdW5rbm93blxuKTogSXRlcmFibGU8VD47XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyPFQ+KFxuICBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gIHByZWRpY2F0ZTogKHZhbHVlOiBUKSA9PiB1bmtub3duXG4pOiBJdGVyYWJsZTxUPiB7XG4gIHJldHVybiBuZXcgRmlsdGVySXRlcmFibGUoaXRlcmFibGUsIHByZWRpY2F0ZSk7XG59XG5cbmNsYXNzIEZpbHRlckl0ZXJhYmxlPFQ+IGltcGxlbWVudHMgSXRlcmFibGU8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGl0ZXJhYmxlOiBJdGVyYWJsZTxUPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByZWRpY2F0ZTogKHZhbHVlOiBUKSA9PiB1bmtub3duXG4gICkge31cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxUPiB7XG4gICAgcmV0dXJuIG5ldyBGaWx0ZXJJdGVyYXRvcih0aGlzLml0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSwgdGhpcy5wcmVkaWNhdGUpO1xuICB9XG59XG5cbmNsYXNzIEZpbHRlckl0ZXJhdG9yPFQ+IGltcGxlbWVudHMgSXRlcmF0b3I8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGl0ZXJhdG9yOiBJdGVyYXRvcjxUPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByZWRpY2F0ZTogKHZhbHVlOiBUKSA9PiB1bmtub3duXG4gICkge31cblxuICBuZXh0KCk6IEl0ZXJhdG9yUmVzdWx0PFQ+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IG5leHRJdGVyYXRpb24gPSB0aGlzLml0ZXJhdG9yLm5leHQoKTtcbiAgICAgIGlmIChuZXh0SXRlcmF0aW9uLmRvbmUgfHwgdGhpcy5wcmVkaWNhdGUobmV4dEl0ZXJhdGlvbi52YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG5leHRJdGVyYXRpb247XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kPFQ+KFxuICBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gIHByZWRpY2F0ZTogKHZhbHVlOiBUKSA9PiB1bmtub3duXG4pOiB1bmRlZmluZWQgfCBUIHtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5PFQ+KFxuICBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gIGZuOiAodmFsdWU6IFQpID0+IHN0cmluZ1xuKTogUmVjb3JkPHN0cmluZywgQXJyYXk8VD4+IHtcbiAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxUPj4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG4gICAgY29uc3Qga2V5ID0gZm4odmFsdWUpO1xuICAgIGNvbnN0IGV4aXN0aW5nR3JvdXAgPSBnZXRPd24ocmVzdWx0LCBrZXkpO1xuICAgIGlmIChleGlzdGluZ0dyb3VwKSB7XG4gICAgICBleGlzdGluZ0dyb3VwLnB1c2godmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IFt2YWx1ZV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gKGl0ZXJhYmxlOiBJdGVyYWJsZTx1bmtub3duPik6IGJvb2xlYW4gPT5cbiAgQm9vbGVhbihpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCkubmV4dCgpLmRvbmUpO1xuXG5leHBvcnQgZnVuY3Rpb24gam9pbihpdGVyYWJsZTogSXRlcmFibGU8dW5rbm93bj4sIHNlcGFyYXRvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IGhhc1Byb2Nlc3NlZEZpcnN0ID0gZmFsc2U7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgIGNvbnN0IHN0cmluZ2lmaWVkVmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiBTdHJpbmcodmFsdWUpO1xuICAgIGlmIChoYXNQcm9jZXNzZWRGaXJzdCkge1xuICAgICAgcmVzdWx0ICs9IHNlcGFyYXRvciArIHN0cmluZ2lmaWVkVmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHN0cmluZ2lmaWVkVmFsdWU7XG4gICAgfVxuICAgIGhhc1Byb2Nlc3NlZEZpcnN0ID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwPFQsIFJlc3VsdFQ+KFxuICBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gIGZuOiAodmFsdWU6IFQpID0+IFJlc3VsdFRcbik6IEl0ZXJhYmxlPFJlc3VsdFQ+IHtcbiAgcmV0dXJuIG5ldyBNYXBJdGVyYWJsZShpdGVyYWJsZSwgZm4pO1xufVxuXG5jbGFzcyBNYXBJdGVyYWJsZTxULCBSZXN1bHRUPiBpbXBsZW1lbnRzIEl0ZXJhYmxlPFJlc3VsdFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBpdGVyYWJsZTogSXRlcmFibGU8VD4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBmbjogKHZhbHVlOiBUKSA9PiBSZXN1bHRUXG4gICkge31cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxSZXN1bHRUPiB7XG4gICAgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLml0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSwgdGhpcy5mbik7XG4gIH1cbn1cblxuY2xhc3MgTWFwSXRlcmF0b3I8VCwgUmVzdWx0VD4gaW1wbGVtZW50cyBJdGVyYXRvcjxSZXN1bHRUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXRlcmF0b3I6IEl0ZXJhdG9yPFQ+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm46ICh2YWx1ZTogVCkgPT4gUmVzdWx0VFxuICApIHt9XG5cbiAgbmV4dCgpOiBJdGVyYXRvclJlc3VsdDxSZXN1bHRUPiB7XG4gICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChuZXh0SXRlcmF0aW9uLmRvbmUpIHtcbiAgICAgIHJldHVybiBuZXh0SXRlcmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICB2YWx1ZTogdGhpcy5mbihuZXh0SXRlcmF0aW9uLnZhbHVlKSxcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2U8VCwgVFJlc3VsdD4oXG4gIGl0ZXJhYmxlOiBJdGVyYWJsZTxUPixcbiAgZm46IChyZXN1bHQ6IFRSZXN1bHQsIHZhbHVlOiBUKSA9PiBUUmVzdWx0LFxuICBhY2N1bXVsYXRvcjogVFJlc3VsdFxuKTogVFJlc3VsdCB7XG4gIGxldCByZXN1bHQgPSBhY2N1bXVsYXRvcjtcbiAgZm9yIChjb25zdCB2YWx1ZSBvZiBpdGVyYWJsZSkge1xuICAgIHJlc3VsdCA9IGZuKHJlc3VsdCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBlYXQ8VD4odmFsdWU6IFQpOiBJdGVyYWJsZTxUPiB7XG4gIHJldHVybiBuZXcgUmVwZWF0SXRlcmFibGUodmFsdWUpO1xufVxuXG5jbGFzcyBSZXBlYXRJdGVyYWJsZTxUPiBpbXBsZW1lbnRzIEl0ZXJhYmxlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSB2YWx1ZTogVCkge31cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxUPiB7XG4gICAgcmV0dXJuIG5ldyBSZXBlYXRJdGVyYXRvcih0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBSZXBlYXRJdGVyYXRvcjxUPiBpbXBsZW1lbnRzIEl0ZXJhdG9yPFQ+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBpdGVyYXRvclJlc3VsdDogSXRlcmF0b3JSZXN1bHQ8VD47XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IFJlYWRvbmx5PFQ+KSB7XG4gICAgdGhpcy5pdGVyYXRvclJlc3VsdCA9IHtcbiAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgdmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIG5leHQoKTogSXRlcmF0b3JSZXN1bHQ8VD4ge1xuICAgIHJldHVybiB0aGlzLml0ZXJhdG9yUmVzdWx0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0YWtlPFQ+KGl0ZXJhYmxlOiBJdGVyYWJsZTxUPiwgYW1vdW50OiBudW1iZXIpOiBJdGVyYWJsZTxUPiB7XG4gIHJldHVybiBuZXcgVGFrZUl0ZXJhYmxlKGl0ZXJhYmxlLCBhbW91bnQpO1xufVxuXG5jbGFzcyBUYWtlSXRlcmFibGU8VD4gaW1wbGVtZW50cyBJdGVyYWJsZTxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgaXRlcmFibGU6IEl0ZXJhYmxlPFQ+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYW1vdW50OiBudW1iZXJcbiAgKSB7fVxuXG4gIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhdG9yPFQ+IHtcbiAgICByZXR1cm4gbmV3IFRha2VJdGVyYXRvcih0aGlzLml0ZXJhYmxlW1N5bWJvbC5pdGVyYXRvcl0oKSwgdGhpcy5hbW91bnQpO1xuICB9XG59XG5cbmNsYXNzIFRha2VJdGVyYXRvcjxUPiBpbXBsZW1lbnRzIEl0ZXJhdG9yPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBpdGVyYXRvcjogSXRlcmF0b3I8VD4sIHByaXZhdGUgYW1vdW50OiBudW1iZXIpIHt9XG5cbiAgbmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgbmV4dEl0ZXJhdGlvbiA9IHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChuZXh0SXRlcmF0aW9uLmRvbmUgfHwgdGhpcy5hbW91bnQgPT09IDApIHtcbiAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiB1bmRlZmluZWQgfTtcbiAgICB9XG4gICAgdGhpcy5hbW91bnQgLT0gMTtcbiAgICByZXR1cm4gbmV4dEl0ZXJhdGlvbjtcbiAgfVxufVxuXG4vLyBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIHN1cHBvcnQgbnVtYmVyIGFuZCBzeW1ib2wgcHJvcGVydHkgbmFtZXMuXG5leHBvcnQgZnVuY3Rpb24gemlwT2JqZWN0PFZhbHVlVD4oXG4gIHByb3BzOiBJdGVyYWJsZTxzdHJpbmc+LFxuICB2YWx1ZXM6IEl0ZXJhYmxlPFZhbHVlVD5cbik6IFJlY29yZDxzdHJpbmcsIFZhbHVlVD4ge1xuICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIFZhbHVlVD4gPSB7fTtcblxuICBjb25zdCBwcm9wc0l0ZXJhdG9yID0gcHJvcHNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICBjb25zdCB2YWx1ZXNJdGVyYXRvciA9IHZhbHVlc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBwcm9wSXRlcmF0aW9uID0gcHJvcHNJdGVyYXRvci5uZXh0KCk7XG4gICAgaWYgKHByb3BJdGVyYXRpb24uZG9uZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlSXRlcmF0aW9uID0gdmFsdWVzSXRlcmF0b3IubmV4dCgpO1xuICAgIGlmICh2YWx1ZUl0ZXJhdGlvbi5kb25lKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXN1bHRbcHJvcEl0ZXJhdGlvbi52YWx1ZV0gPSB2YWx1ZUl0ZXJhdGlvbi52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxvQkFBdUI7QUFFaEIsb0JBQW9CLE9BQTRDO0FBQ3JFLFNBQ0csT0FBTyxVQUFVLFlBQVksVUFBVSxRQUFRLE9BQU8sWUFBWSxTQUNuRSxPQUFPLFVBQVU7QUFFckI7QUFMZ0IsQUFPVCxjQUFjLFVBQXFDO0FBRXhELE1BQUksT0FBTyxhQUFhLFlBQVksTUFBTSxRQUFRLFFBQVEsR0FBRztBQUMzRCxXQUFPLFNBQVM7QUFBQSxFQUNsQjtBQUNBLE1BQUksb0JBQW9CLE9BQU8sb0JBQW9CLEtBQUs7QUFDdEQsV0FBTyxTQUFTO0FBQUEsRUFDbEI7QUFFQSxRQUFNLFdBQVcsU0FBUyxPQUFPLFVBQVU7QUFFM0MsTUFBSSxTQUFTO0FBQ2IsV0FBUyxPQUFPLE9BQU8sQ0FBQyxNQUFNLFVBQVUsR0FBRztBQUN6QyxXQUFPLFFBQVEsU0FBUyxLQUFLLEVBQUUsSUFBSTtBQUFBLEVBQ3JDO0FBQ0EsU0FBTztBQUNUO0FBaEJnQixBQWtCVCxtQkFDRixXQUNVO0FBQ2IsU0FBTyxJQUFJLGVBQWUsU0FBUztBQUNyQztBQUpnQixBQU1oQixNQUFNLGVBQXlDO0FBQUEsRUFDN0MsWUFBNkIsV0FBdUM7QUFBdkM7QUFBQSxFQUF3QztBQUFBLElBRW5FLE9BQU8sWUFBeUI7QUFDaEMsZUFBVyxZQUFZLEtBQUssV0FBVztBQUNyQyxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRjtBQVJBLEFBVU8sZUFDTCxVQUNBLFdBQ1M7QUFDVCxhQUFXLFNBQVMsVUFBVTtBQUM1QixRQUFJLENBQUMsVUFBVSxLQUFLLEdBQUc7QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUO0FBVmdCLEFBb0JULGdCQUNMLFVBQ0EsV0FDYTtBQUNiLFNBQU8sSUFBSSxlQUFlLFVBQVUsU0FBUztBQUMvQztBQUxnQixBQU9oQixNQUFNLGVBQXlDO0FBQUEsRUFDN0MsWUFDbUIsVUFDQSxXQUNqQjtBQUZpQjtBQUNBO0FBQUEsRUFDaEI7QUFBQSxHQUVGLE9BQU8sWUFBeUI7QUFDL0IsV0FBTyxJQUFJLGVBQWUsS0FBSyxTQUFTLE9BQU8sVUFBVSxHQUFHLEtBQUssU0FBUztBQUFBLEVBQzVFO0FBQ0Y7QUFUQSxBQVdBLE1BQU0sZUFBeUM7QUFBQSxFQUM3QyxZQUNtQixVQUNBLFdBQ2pCO0FBRmlCO0FBQ0E7QUFBQSxFQUNoQjtBQUFBLEVBRUgsT0FBMEI7QUFFeEIsV0FBTyxNQUFNO0FBQ1gsWUFBTSxnQkFBZ0IsS0FBSyxTQUFTLEtBQUs7QUFDekMsVUFBSSxjQUFjLFFBQVEsS0FBSyxVQUFVLGNBQWMsS0FBSyxHQUFHO0FBQzdELGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQWZBLEFBaUJPLGNBQ0wsVUFDQSxXQUNlO0FBQ2YsYUFBVyxTQUFTLFVBQVU7QUFDNUIsUUFBSSxVQUFVLEtBQUssR0FBRztBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFWZ0IsQUFZVCxpQkFDTCxVQUNBLElBQzBCO0FBQzFCLFFBQU0sU0FBbUMsdUJBQU8sT0FBTyxJQUFJO0FBQzNELGFBQVcsU0FBUyxVQUFVO0FBQzVCLFVBQU0sTUFBTSxHQUFHLEtBQUs7QUFDcEIsVUFBTSxnQkFBZ0IsMEJBQU8sUUFBUSxHQUFHO0FBQ3hDLFFBQUksZUFBZTtBQUNqQixvQkFBYyxLQUFLLEtBQUs7QUFBQSxJQUMxQixPQUFPO0FBQ0wsYUFBTyxPQUFPLENBQUMsS0FBSztBQUFBLElBQ3RCO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQWZnQixBQWlCVCxNQUFNLFVBQVUsd0JBQUMsYUFDdEIsUUFBUSxTQUFTLE9BQU8sVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEdBRDFCO0FBR2hCLGNBQWMsVUFBNkIsV0FBMkI7QUFDM0UsTUFBSSxvQkFBb0I7QUFDeEIsTUFBSSxTQUFTO0FBQ2IsYUFBVyxTQUFTLFVBQVU7QUFDNUIsVUFBTSxtQkFBbUIsU0FBUyxPQUFPLEtBQUssT0FBTyxLQUFLO0FBQzFELFFBQUksbUJBQW1CO0FBQ3JCLGdCQUFVLFlBQVk7QUFBQSxJQUN4QixPQUFPO0FBQ0wsZUFBUztBQUFBLElBQ1g7QUFDQSx3QkFBb0I7QUFBQSxFQUN0QjtBQUNBLFNBQU87QUFDVDtBQWJnQixBQWVULGFBQ0wsVUFDQSxJQUNtQjtBQUNuQixTQUFPLElBQUksWUFBWSxVQUFVLEVBQUU7QUFDckM7QUFMZ0IsQUFPaEIsTUFBTSxZQUFxRDtBQUFBLEVBQ3pELFlBQ21CLFVBQ0EsSUFDakI7QUFGaUI7QUFDQTtBQUFBLEVBQ2hCO0FBQUEsR0FFRixPQUFPLFlBQStCO0FBQ3JDLFdBQU8sSUFBSSxZQUFZLEtBQUssU0FBUyxPQUFPLFVBQVUsR0FBRyxLQUFLLEVBQUU7QUFBQSxFQUNsRTtBQUNGO0FBVEEsQUFXQSxNQUFNLFlBQXFEO0FBQUEsRUFDekQsWUFDbUIsVUFDQSxJQUNqQjtBQUZpQjtBQUNBO0FBQUEsRUFDaEI7QUFBQSxFQUVILE9BQWdDO0FBQzlCLFVBQU0sZ0JBQWdCLEtBQUssU0FBUyxLQUFLO0FBQ3pDLFFBQUksY0FBYyxNQUFNO0FBQ3RCLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sT0FBTyxLQUFLLEdBQUcsY0FBYyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0Y7QUFoQkEsQUFrQk8sZ0JBQ0wsVUFDQSxJQUNBLGFBQ1M7QUFDVCxNQUFJLFNBQVM7QUFDYixhQUFXLFNBQVMsVUFBVTtBQUM1QixhQUFTLEdBQUcsUUFBUSxLQUFLO0FBQUEsRUFDM0I7QUFDQSxTQUFPO0FBQ1Q7QUFWZ0IsQUFZVCxnQkFBbUIsT0FBdUI7QUFDL0MsU0FBTyxJQUFJLGVBQWUsS0FBSztBQUNqQztBQUZnQixBQUloQixNQUFNLGVBQXlDO0FBQUEsRUFDN0MsWUFBNkIsT0FBVTtBQUFWO0FBQUEsRUFBVztBQUFBLEdBRXZDLE9BQU8sWUFBeUI7QUFDL0IsV0FBTyxJQUFJLGVBQWUsS0FBSyxLQUFLO0FBQUEsRUFDdEM7QUFDRjtBQU5BLEFBUUEsTUFBTSxlQUF5QztBQUFBLEVBRzdDLFlBQVksT0FBb0I7QUFDOUIsU0FBSyxpQkFBaUI7QUFBQSxNQUNwQixNQUFNO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUEwQjtBQUN4QixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBQ0Y7QUFiQSxBQWVPLGNBQWlCLFVBQXVCLFFBQTZCO0FBQzFFLFNBQU8sSUFBSSxhQUFhLFVBQVUsTUFBTTtBQUMxQztBQUZnQixBQUloQixNQUFNLGFBQXVDO0FBQUEsRUFDM0MsWUFDbUIsVUFDQSxRQUNqQjtBQUZpQjtBQUNBO0FBQUEsRUFDaEI7QUFBQSxHQUVGLE9BQU8sWUFBeUI7QUFDL0IsV0FBTyxJQUFJLGFBQWEsS0FBSyxTQUFTLE9BQU8sVUFBVSxHQUFHLEtBQUssTUFBTTtBQUFBLEVBQ3ZFO0FBQ0Y7QUFUQSxBQVdBLE1BQU0sYUFBdUM7QUFBQSxFQUMzQyxZQUE2QixVQUErQixRQUFnQjtBQUEvQztBQUErQjtBQUFBLEVBQWlCO0FBQUEsRUFFN0UsT0FBMEI7QUFDeEIsVUFBTSxnQkFBZ0IsS0FBSyxTQUFTLEtBQUs7QUFDekMsUUFBSSxjQUFjLFFBQVEsS0FBSyxXQUFXLEdBQUc7QUFDM0MsYUFBTyxFQUFFLE1BQU0sTUFBTSxPQUFPLE9BQVU7QUFBQSxJQUN4QztBQUNBLFNBQUssVUFBVTtBQUNmLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFYQSxBQWNPLG1CQUNMLE9BQ0EsUUFDd0I7QUFDeEIsUUFBTSxTQUFpQyxDQUFDO0FBRXhDLFFBQU0sZ0JBQWdCLE1BQU0sT0FBTyxVQUFVO0FBQzdDLFFBQU0saUJBQWlCLE9BQU8sT0FBTyxVQUFVO0FBRS9DLFNBQU8sTUFBTTtBQUNYLFVBQU0sZ0JBQWdCLGNBQWMsS0FBSztBQUN6QyxRQUFJLGNBQWMsTUFBTTtBQUN0QjtBQUFBLElBQ0Y7QUFDQSxVQUFNLGlCQUFpQixlQUFlLEtBQUs7QUFDM0MsUUFBSSxlQUFlLE1BQU07QUFDdkI7QUFBQSxJQUNGO0FBRUEsV0FBTyxjQUFjLFNBQVMsZUFBZTtBQUFBLEVBQy9DO0FBRUEsU0FBTztBQUNUO0FBdkJnQiIsCiAgIm5hbWVzIjogW10KfQo=
