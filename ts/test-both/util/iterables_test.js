var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var sinon = __toESM(require("sinon"));
var import_iterables = require("../../util/iterables");
describe("iterable utilities", () => {
  describe("isIterable", () => {
    it("returns false for non-iterables", () => {
      import_chai.assert.isFalse((0, import_iterables.isIterable)(void 0));
      import_chai.assert.isFalse((0, import_iterables.isIterable)(null));
      import_chai.assert.isFalse((0, import_iterables.isIterable)(123));
      import_chai.assert.isFalse((0, import_iterables.isIterable)({ foo: "bar" }));
      import_chai.assert.isFalse((0, import_iterables.isIterable)({
        length: 2,
        "0": "fake",
        "1": "array"
      }));
    });
    it("returns true for iterables", () => {
      import_chai.assert.isTrue((0, import_iterables.isIterable)("strings are iterable"));
      import_chai.assert.isTrue((0, import_iterables.isIterable)(["arrays too"]));
      import_chai.assert.isTrue((0, import_iterables.isIterable)(new Set("and sets")));
      import_chai.assert.isTrue((0, import_iterables.isIterable)(/* @__PURE__ */ new Map([["and", "maps"]])));
      import_chai.assert.isTrue((0, import_iterables.isIterable)({
        [Symbol.iterator]() {
          return {
            next() {
              return {
                value: "endless iterable",
                done: false
              };
            }
          };
        }
      }));
      import_chai.assert.isTrue((0, import_iterables.isIterable)(function* generators() {
        yield 123;
      }()));
    });
  });
  describe("repeat", () => {
    it("repeats the same value forever", () => {
      const result = (0, import_iterables.repeat)("foo");
      const truncated = [...(0, import_iterables.take)(result, 10)];
      import_chai.assert.deepEqual(truncated, Array(10).fill("foo"));
    });
  });
  describe("size", () => {
    it("returns the length of a string", () => {
      import_chai.assert.strictEqual((0, import_iterables.size)(""), 0);
      import_chai.assert.strictEqual((0, import_iterables.size)("hello world"), 11);
    });
    it("returns the length of an array", () => {
      import_chai.assert.strictEqual((0, import_iterables.size)([]), 0);
      import_chai.assert.strictEqual((0, import_iterables.size)(["hello", "world"]), 2);
    });
    it("returns the size of a set", () => {
      import_chai.assert.strictEqual((0, import_iterables.size)(/* @__PURE__ */ new Set()), 0);
      import_chai.assert.strictEqual((0, import_iterables.size)(/* @__PURE__ */ new Set([1, 2, 3])), 3);
    });
    it("returns the length (not byte length) of typed arrays", () => {
      import_chai.assert.strictEqual((0, import_iterables.size)(new Uint8Array(3)), 3);
      import_chai.assert.strictEqual((0, import_iterables.size)(new Uint32Array(3)), 3);
    });
    it("returns the size of arbitrary iterables", () => {
      function* someNumbers() {
        yield 3;
        yield 6;
        yield 9;
      }
      import_chai.assert.strictEqual((0, import_iterables.size)(someNumbers()), 3);
    });
  });
  describe("concat", () => {
    it("returns an empty iterable when passed nothing", () => {
      import_chai.assert.deepEqual([...(0, import_iterables.concat)()], []);
    });
    it("returns an empty iterable when passed empty iterables", () => {
      import_chai.assert.deepEqual([...(0, import_iterables.concat)([])], []);
      import_chai.assert.deepEqual([...(0, import_iterables.concat)(/* @__PURE__ */ new Set())], []);
      import_chai.assert.deepEqual([...(0, import_iterables.concat)(/* @__PURE__ */ new Set(), [], /* @__PURE__ */ new Map())], []);
    });
    it("concatenates multiple iterables", () => {
      const everyNumber = {
        *[Symbol.iterator]() {
          for (let i = 4; true; i += 1) {
            yield i;
          }
        }
      };
      const result = (0, import_iterables.concat)([1, 2], /* @__PURE__ */ new Set([3]), [], everyNumber);
      const iterator = result[Symbol.iterator]();
      import_chai.assert.deepEqual(iterator.next(), { value: 1, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 2, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 3, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 4, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 5, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 6, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 7, done: false });
    });
    it("doesn't start the iterable until the last minute", () => {
      const oneTwoThree = {
        [Symbol.iterator]: sinon.fake(() => {
          let n = 0;
          return {
            next() {
              if (n > 3) {
                return { done: true };
              }
              n += 1;
              return { value: n, done: false };
            }
          };
        })
      };
      const result = (0, import_iterables.concat)([1, 2], oneTwoThree);
      const iterator = result[Symbol.iterator]();
      sinon.assert.notCalled(oneTwoThree[Symbol.iterator]);
      iterator.next();
      sinon.assert.notCalled(oneTwoThree[Symbol.iterator]);
      iterator.next();
      sinon.assert.notCalled(oneTwoThree[Symbol.iterator]);
      iterator.next();
      sinon.assert.calledOnce(oneTwoThree[Symbol.iterator]);
      iterator.next();
      sinon.assert.calledOnce(oneTwoThree[Symbol.iterator]);
    });
  });
  describe("every", () => {
    const isOdd = /* @__PURE__ */ __name((n) => Boolean(n % 2), "isOdd");
    it("returns true for empty iterables and never checks the predicate", () => {
      const fn = sinon.fake();
      import_chai.assert.isTrue((0, import_iterables.every)([], fn));
      import_chai.assert.isTrue((0, import_iterables.every)(/* @__PURE__ */ new Set(), fn));
      import_chai.assert.isTrue((0, import_iterables.every)(/* @__PURE__ */ new Map(), fn));
      sinon.assert.notCalled(fn);
    });
    it("returns false if any values make the predicate return false", () => {
      import_chai.assert.isFalse((0, import_iterables.every)([2], isOdd));
      import_chai.assert.isFalse((0, import_iterables.every)([1, 2, 3], isOdd));
    });
    it("returns true if all values make the predicate return true", () => {
      import_chai.assert.isTrue((0, import_iterables.every)([1], isOdd));
      import_chai.assert.isTrue((0, import_iterables.every)([1, 3, 5], isOdd));
    });
  });
  describe("filter", () => {
    it("returns an empty iterable when passed an empty iterable", () => {
      const fn = sinon.fake();
      import_chai.assert.deepEqual([...(0, import_iterables.filter)([], fn)], []);
      import_chai.assert.deepEqual([...(0, import_iterables.filter)(/* @__PURE__ */ new Set(), fn)], []);
      import_chai.assert.deepEqual([...(0, import_iterables.filter)(/* @__PURE__ */ new Map(), fn)], []);
      sinon.assert.notCalled(fn);
    });
    it("returns a new iterator with some values removed", () => {
      const isOdd = sinon.fake((n) => Boolean(n % 2));
      const result = (0, import_iterables.filter)([1, 2, 3, 4], isOdd);
      sinon.assert.notCalled(isOdd);
      import_chai.assert.deepEqual([...result], [1, 3]);
      import_chai.assert.notInstanceOf(result, Array);
      sinon.assert.callCount(isOdd, 4);
    });
    it("can filter an infinite iterable", () => {
      const everyNumber = {
        *[Symbol.iterator]() {
          for (let i = 0; true; i += 1) {
            yield i;
          }
        }
      };
      const isOdd = /* @__PURE__ */ __name((n) => Boolean(n % 2), "isOdd");
      const result = (0, import_iterables.filter)(everyNumber, isOdd);
      const iterator = result[Symbol.iterator]();
      import_chai.assert.deepEqual(iterator.next(), { value: 1, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 3, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 5, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 7, done: false });
    });
    it("respects TypeScript type assertion signatures", () => {
      function isString(value) {
        return typeof value === "string";
      }
      const input = [1, "two", 3, "four"];
      const result = (0, import_iterables.filter)(input, isString);
      import_chai.assert.deepEqual([...result], ["two", "four"]);
    });
  });
  describe("find", () => {
    const isOdd = /* @__PURE__ */ __name((n) => Boolean(n % 2), "isOdd");
    it("returns undefined if the value is not found", () => {
      import_chai.assert.isUndefined((0, import_iterables.find)([], isOdd));
      import_chai.assert.isUndefined((0, import_iterables.find)([2, 4], isOdd));
    });
    it("returns the first matching value", () => {
      import_chai.assert.strictEqual((0, import_iterables.find)([0, 1, 2, 3], isOdd), 1);
    });
    it("only iterates until a value is found", () => {
      function* numbers() {
        yield 2;
        yield 3;
        throw new Error("this should never happen");
      }
      (0, import_iterables.find)(numbers(), isOdd);
    });
  });
  describe("groupBy", () => {
    it("returns an empty object if passed an empty iterable", () => {
      const fn = sinon.fake();
      import_chai.assert.deepEqual((0, import_iterables.groupBy)([], fn), {});
      import_chai.assert.deepEqual((0, import_iterables.groupBy)(/* @__PURE__ */ new Set(), fn), {});
      sinon.assert.notCalled(fn);
    });
    it("returns a map of groups", () => {
      import_chai.assert.deepEqual((0, import_iterables.groupBy)(["apple", "aardvark", "orange", "orange", "zebra"], (str) => str[0]), {
        a: ["apple", "aardvark"],
        o: ["orange", "orange"],
        z: ["zebra"]
      });
    });
  });
  describe("isEmpty", () => {
    it("returns true for empty iterables", () => {
      import_chai.assert.isTrue((0, import_iterables.isEmpty)(""));
      import_chai.assert.isTrue((0, import_iterables.isEmpty)([]));
      import_chai.assert.isTrue((0, import_iterables.isEmpty)(/* @__PURE__ */ new Set()));
    });
    it("returns false for non-empty iterables", () => {
      import_chai.assert.isFalse((0, import_iterables.isEmpty)(" "));
      import_chai.assert.isFalse((0, import_iterables.isEmpty)([1, 2]));
      import_chai.assert.isFalse((0, import_iterables.isEmpty)(/* @__PURE__ */ new Set([3, 4])));
    });
    it('does not "look past" the first element', () => {
      function* numbers() {
        yield 1;
        throw new Error("this should never happen");
      }
      import_chai.assert.isFalse((0, import_iterables.isEmpty)(numbers()));
    });
  });
  describe("join", () => {
    it("returns the empty string for empty iterables", () => {
      import_chai.assert.isEmpty((0, import_iterables.join)([], "x"));
      import_chai.assert.isEmpty((0, import_iterables.join)(/* @__PURE__ */ new Set(), "x"));
    });
    it("returns the stringified value if it's the only value", () => {
      import_chai.assert.strictEqual((0, import_iterables.join)(/* @__PURE__ */ new Set(["foo"]), "x"), "foo");
      import_chai.assert.strictEqual((0, import_iterables.join)(/* @__PURE__ */ new Set([123]), "x"), "123");
      import_chai.assert.strictEqual((0, import_iterables.join)([{ toString: () => "foo" }], "x"), "foo");
    });
    it("returns each value stringified, joined by separator", () => {
      import_chai.assert.strictEqual((0, import_iterables.join)(/* @__PURE__ */ new Set(["foo", "bar", "baz"]), " "), "foo bar baz");
      import_chai.assert.strictEqual((0, import_iterables.join)(/* @__PURE__ */ new Set([1, 2, 3]), "--"), "1--2--3");
    });
    it("handles undefined and null like Array.prototype.join", () => {
      import_chai.assert.strictEqual((0, import_iterables.join)(/* @__PURE__ */ new Set([void 0, null]), ","), ",");
    });
  });
  describe("map", () => {
    it("returns an empty iterable when passed an empty iterable", () => {
      const fn = sinon.fake();
      import_chai.assert.deepEqual([...(0, import_iterables.map)([], fn)], []);
      import_chai.assert.deepEqual([...(0, import_iterables.map)(/* @__PURE__ */ new Set(), fn)], []);
      import_chai.assert.deepEqual([...(0, import_iterables.map)(/* @__PURE__ */ new Map(), fn)], []);
      sinon.assert.notCalled(fn);
    });
    it("returns a new iterator with values mapped", () => {
      const fn = sinon.fake((n) => n * n);
      const result = (0, import_iterables.map)([1, 2, 3], fn);
      sinon.assert.notCalled(fn);
      import_chai.assert.deepEqual([...result], [1, 4, 9]);
      import_chai.assert.notInstanceOf(result, Array);
      sinon.assert.calledThrice(fn);
    });
    it(`iterating doesn't "spend" the iterable`, () => {
      const result = (0, import_iterables.map)([1, 2, 3], (n) => n * n);
      import_chai.assert.deepEqual([...result], [1, 4, 9]);
      import_chai.assert.deepEqual([...result], [1, 4, 9]);
      import_chai.assert.deepEqual([...result], [1, 4, 9]);
    });
    it("can map over an infinite iterable", () => {
      const everyNumber = {
        *[Symbol.iterator]() {
          for (let i = 0; true; i += 1) {
            yield i;
          }
        }
      };
      const fn = sinon.fake((n) => n * n);
      const result = (0, import_iterables.map)(everyNumber, fn);
      const iterator = result[Symbol.iterator]();
      import_chai.assert.deepEqual(iterator.next(), { value: 0, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 1, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 4, done: false });
      import_chai.assert.deepEqual(iterator.next(), { value: 9, done: false });
    });
  });
  describe("reduce", () => {
    it("returns the accumulator when passed an empty iterable", () => {
      const fn = sinon.fake();
      import_chai.assert.strictEqual((0, import_iterables.reduce)([], fn, 123), 123);
      sinon.assert.notCalled(fn);
    });
    it("iterates over the iterable, ultimately returning a result", () => {
      import_chai.assert.strictEqual((0, import_iterables.reduce)(/* @__PURE__ */ new Set([1, 2, 3, 4]), (result, n) => result + n, 89), 99);
    });
  });
  describe("take", () => {
    it("returns the first n elements from an iterable", () => {
      const everyNumber = {
        *[Symbol.iterator]() {
          for (let i = 0; true; i += 1) {
            yield i;
          }
        }
      };
      import_chai.assert.deepEqual([...(0, import_iterables.take)(everyNumber, 0)], []);
      import_chai.assert.deepEqual([...(0, import_iterables.take)(everyNumber, 1)], [0]);
      import_chai.assert.deepEqual([...(0, import_iterables.take)(everyNumber, 7)], [0, 1, 2, 3, 4, 5, 6]);
    });
    it("stops after the iterable has been exhausted", () => {
      const set = /* @__PURE__ */ new Set([1, 2, 3]);
      import_chai.assert.deepEqual([...(0, import_iterables.take)(set, 3)], [1, 2, 3]);
      import_chai.assert.deepEqual([...(0, import_iterables.take)(set, 4)], [1, 2, 3]);
      import_chai.assert.deepEqual([...(0, import_iterables.take)(set, 1e4)], [1, 2, 3]);
    });
  });
  describe("zipObject", () => {
    it("zips up an object", () => {
      import_chai.assert.deepEqual((0, import_iterables.zipObject)(["foo", "bar"], [1, 2]), { foo: 1, bar: 2 });
    });
    it('stops if the keys "run out" first', () => {
      import_chai.assert.deepEqual((0, import_iterables.zipObject)(["foo", "bar"], [1, 2, 3, 4, 5, 6]), {
        foo: 1,
        bar: 2
      });
    });
    it('stops if the values "run out" first', () => {
      import_chai.assert.deepEqual((0, import_iterables.zipObject)(["foo", "bar", "baz"], [1]), {
        foo: 1
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXRlcmFibGVzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHtcbiAgY29uY2F0LFxuICBldmVyeSxcbiAgZmlsdGVyLFxuICBmaW5kLFxuICBncm91cEJ5LFxuICBpc0VtcHR5LFxuICBpc0l0ZXJhYmxlLFxuICBqb2luLFxuICBtYXAsXG4gIHJlZHVjZSxcbiAgcmVwZWF0LFxuICBzaXplLFxuICB0YWtlLFxuICB6aXBPYmplY3QsXG59IGZyb20gJy4uLy4uL3V0aWwvaXRlcmFibGVzJztcblxuZGVzY3JpYmUoJ2l0ZXJhYmxlIHV0aWxpdGllcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2lzSXRlcmFibGUnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1pdGVyYWJsZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0l0ZXJhYmxlKHVuZGVmaW5lZCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNJdGVyYWJsZShudWxsKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0l0ZXJhYmxlKDEyMykpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNJdGVyYWJsZSh7IGZvbzogJ2JhcicgfSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGlzSXRlcmFibGUoe1xuICAgICAgICAgIGxlbmd0aDogMixcbiAgICAgICAgICAnMCc6ICdmYWtlJyxcbiAgICAgICAgICAnMSc6ICdhcnJheScsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgaXRlcmFibGVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0l0ZXJhYmxlKCdzdHJpbmdzIGFyZSBpdGVyYWJsZScpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNJdGVyYWJsZShbJ2FycmF5cyB0b28nXSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0l0ZXJhYmxlKG5ldyBTZXQoJ2FuZCBzZXRzJykpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNJdGVyYWJsZShuZXcgTWFwKFtbJ2FuZCcsICdtYXBzJ11dKSkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgaXNJdGVyYWJsZSh7XG4gICAgICAgICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBuZXh0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZTogJ2VuZGxlc3MgaXRlcmFibGUnLFxuICAgICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBpc0l0ZXJhYmxlKFxuICAgICAgICAgIChmdW5jdGlvbiogZ2VuZXJhdG9ycygpIHtcbiAgICAgICAgICAgIHlpZWxkIDEyMztcbiAgICAgICAgICB9KSgpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXBlYXQnLCAoKSA9PiB7XG4gICAgaXQoJ3JlcGVhdHMgdGhlIHNhbWUgdmFsdWUgZm9yZXZlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlcGVhdCgnZm9vJyk7XG5cbiAgICAgIGNvbnN0IHRydW5jYXRlZCA9IFsuLi50YWtlKHJlc3VsdCwgMTApXTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwodHJ1bmNhdGVkLCBBcnJheSgxMCkuZmlsbCgnZm9vJykpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2l6ZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB0aGUgbGVuZ3RoIG9mIGEgc3RyaW5nJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpemUoJycpLCAwKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzaXplKCdoZWxsbyB3b3JsZCcpLCAxMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgbGVuZ3RoIG9mIGFuIGFycmF5JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpemUoW10pLCAwKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzaXplKFsnaGVsbG8nLCAnd29ybGQnXSksIDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIHNpemUgb2YgYSBzZXQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2l6ZShuZXcgU2V0KCkpLCAwKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzaXplKG5ldyBTZXQoWzEsIDIsIDNdKSksIDMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdGhlIGxlbmd0aCAobm90IGJ5dGUgbGVuZ3RoKSBvZiB0eXBlZCBhcnJheXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2l6ZShuZXcgVWludDhBcnJheSgzKSksIDMpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpemUobmV3IFVpbnQzMkFycmF5KDMpKSwgMyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgc2l6ZSBvZiBhcmJpdHJhcnkgaXRlcmFibGVzJywgKCkgPT4ge1xuICAgICAgZnVuY3Rpb24qIHNvbWVOdW1iZXJzKCkge1xuICAgICAgICB5aWVsZCAzO1xuICAgICAgICB5aWVsZCA2O1xuICAgICAgICB5aWVsZCA5O1xuICAgICAgfVxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNpemUoc29tZU51bWJlcnMoKSksIDMpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29uY2F0JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGl0ZXJhYmxlIHdoZW4gcGFzc2VkIG5vdGhpbmcnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5jb25jYXQoKV0sIFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IGl0ZXJhYmxlIHdoZW4gcGFzc2VkIGVtcHR5IGl0ZXJhYmxlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLmNvbmNhdChbXSldLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5jb25jYXQobmV3IFNldCgpKV0sIFtdKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLmNvbmNhdChuZXcgU2V0KCksIFtdLCBuZXcgTWFwKCkpXSwgW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbmNhdGVuYXRlcyBtdWx0aXBsZSBpdGVyYWJsZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBldmVyeU51bWJlciA9IHtcbiAgICAgICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSA0OyB0cnVlOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHlpZWxkIGk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gY29uY2F0KFsxLCAyXSwgbmV3IFNldChbM10pLCBbXSwgZXZlcnlOdW1iZXIpO1xuICAgICAgY29uc3QgaXRlcmF0b3IgPSByZXN1bHRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogMSwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogMiwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogMywgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogNCwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogNSwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogNiwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogNywgZG9uZTogZmFsc2UgfSk7XG4gICAgfSk7XG5cbiAgICBpdChcImRvZXNuJ3Qgc3RhcnQgdGhlIGl0ZXJhYmxlIHVudGlsIHRoZSBsYXN0IG1pbnV0ZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBvbmVUd29UaHJlZSA9IHtcbiAgICAgICAgW1N5bWJvbC5pdGVyYXRvcl06IHNpbm9uLmZha2UoKCkgPT4ge1xuICAgICAgICAgIGxldCBuID0gMDtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICAgICAgaWYgKG4gPiAzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG4gKz0gMTtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG4sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gY29uY2F0KFsxLCAyXSwgb25lVHdvVGhyZWUpO1xuICAgICAgY29uc3QgaXRlcmF0b3IgPSByZXN1bHRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKG9uZVR3b1RocmVlW1N5bWJvbC5pdGVyYXRvcl0pO1xuXG4gICAgICBpdGVyYXRvci5uZXh0KCk7XG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKG9uZVR3b1RocmVlW1N5bWJvbC5pdGVyYXRvcl0pO1xuICAgICAgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChvbmVUd29UaHJlZVtTeW1ib2wuaXRlcmF0b3JdKTtcblxuICAgICAgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2Uob25lVHdvVGhyZWVbU3ltYm9sLml0ZXJhdG9yXSk7XG5cbiAgICAgIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKG9uZVR3b1RocmVlW1N5bWJvbC5pdGVyYXRvcl0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZXZlcnknLCAoKSA9PiB7XG4gICAgY29uc3QgaXNPZGQgPSAobjogbnVtYmVyKTogYm9vbGVhbiA9PiBCb29sZWFuKG4gJSAyKTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGVtcHR5IGl0ZXJhYmxlcyBhbmQgbmV2ZXIgY2hlY2tzIHRoZSBwcmVkaWNhdGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmbiA9IHNpbm9uLmZha2UoKTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShldmVyeShbXSwgZm4pKTtcbiAgICAgIGFzc2VydC5pc1RydWUoZXZlcnkobmV3IFNldCgpLCBmbikpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShldmVyeShuZXcgTWFwKCksIGZuKSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZm4pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgYW55IHZhbHVlcyBtYWtlIHRoZSBwcmVkaWNhdGUgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoZXZlcnkoWzJdLCBpc09kZCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoZXZlcnkoWzEsIDIsIDNdLCBpc09kZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiBhbGwgdmFsdWVzIG1ha2UgdGhlIHByZWRpY2F0ZSByZXR1cm4gdHJ1ZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoZXZlcnkoWzFdLCBpc09kZCkpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShldmVyeShbMSwgMywgNV0sIGlzT2RkKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdmaWx0ZXInLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgaXRlcmFibGUgd2hlbiBwYXNzZWQgYW4gZW1wdHkgaXRlcmFibGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmbiA9IHNpbm9uLmZha2UoKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChbLi4uZmlsdGVyKFtdLCBmbildLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5maWx0ZXIobmV3IFNldCgpLCBmbildLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5maWx0ZXIobmV3IE1hcCgpLCBmbildLCBbXSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZm4pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBuZXcgaXRlcmF0b3Igd2l0aCBzb21lIHZhbHVlcyByZW1vdmVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgaXNPZGQgPSBzaW5vbi5mYWtlKChuOiBudW1iZXIpID0+IEJvb2xlYW4obiAlIDIpKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbHRlcihbMSwgMiwgMywgNF0sIGlzT2RkKTtcblxuICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChpc09kZCk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLnJlc3VsdF0sIFsxLCAzXSk7XG4gICAgICBhc3NlcnQubm90SW5zdGFuY2VPZihyZXN1bHQsIEFycmF5KTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxDb3VudChpc09kZCwgNCk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuIGZpbHRlciBhbiBpbmZpbml0ZSBpdGVyYWJsZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGV2ZXJ5TnVtYmVyID0ge1xuICAgICAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IHRydWU7IGkgKz0gMSkge1xuICAgICAgICAgICAgeWllbGQgaTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc09kZCA9IChuOiBudW1iZXIpID0+IEJvb2xlYW4obiAlIDIpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmlsdGVyKGV2ZXJ5TnVtYmVyLCBpc09kZCk7XG4gICAgICBjb25zdCBpdGVyYXRvciA9IHJlc3VsdFtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaXRlcmF0b3IubmV4dCgpLCB7IHZhbHVlOiAxLCBkb25lOiBmYWxzZSB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaXRlcmF0b3IubmV4dCgpLCB7IHZhbHVlOiAzLCBkb25lOiBmYWxzZSB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaXRlcmF0b3IubmV4dCgpLCB7IHZhbHVlOiA1LCBkb25lOiBmYWxzZSB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoaXRlcmF0b3IubmV4dCgpLCB7IHZhbHVlOiA3LCBkb25lOiBmYWxzZSB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXNwZWN0cyBUeXBlU2NyaXB0IHR5cGUgYXNzZXJ0aW9uIHNpZ25hdHVyZXMnLCAoKSA9PiB7XG4gICAgICAvLyBUaGlzIHRlc3RzIFR5cGVTY3JpcHQsIG5vdCB0aGUgYWN0dWFsIHJ1bnRpbWUgYmVoYXZpb3IuXG4gICAgICBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dDogQXJyYXk8dW5rbm93bj4gPSBbMSwgJ3R3bycsIDMsICdmb3VyJ107XG4gICAgICBjb25zdCByZXN1bHQ6IEl0ZXJhYmxlPHN0cmluZz4gPSBmaWx0ZXIoaW5wdXQsIGlzU3RyaW5nKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChbLi4ucmVzdWx0XSwgWyd0d28nLCAnZm91ciddKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2ZpbmQnLCAoKSA9PiB7XG4gICAgY29uc3QgaXNPZGQgPSAobjogbnVtYmVyKSA9PiBCb29sZWFuKG4gJSAyKTtcblxuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgdmFsdWUgaXMgbm90IGZvdW5kJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGZpbmQoW10sIGlzT2RkKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoZmluZChbMiwgNF0sIGlzT2RkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgZmlyc3QgbWF0Y2hpbmcgdmFsdWUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZmluZChbMCwgMSwgMiwgM10sIGlzT2RkKSwgMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnb25seSBpdGVyYXRlcyB1bnRpbCBhIHZhbHVlIGlzIGZvdW5kJywgKCkgPT4ge1xuICAgICAgZnVuY3Rpb24qIG51bWJlcnMoKSB7XG4gICAgICAgIHlpZWxkIDI7XG4gICAgICAgIHlpZWxkIDM7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuJyk7XG4gICAgICB9XG5cbiAgICAgIGZpbmQobnVtYmVycygpLCBpc09kZCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdncm91cEJ5JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IG9iamVjdCBpZiBwYXNzZWQgYW4gZW1wdHkgaXRlcmFibGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmbiA9IHNpbm9uLmZha2UoKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChncm91cEJ5KFtdLCBmbiksIHt9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoZ3JvdXBCeShuZXcgU2V0KCksIGZuKSwge30pO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZuKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGEgbWFwIG9mIGdyb3VwcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGdyb3VwQnkoXG4gICAgICAgICAgWydhcHBsZScsICdhYXJkdmFyaycsICdvcmFuZ2UnLCAnb3JhbmdlJywgJ3plYnJhJ10sXG4gICAgICAgICAgc3RyID0+IHN0clswXVxuICAgICAgICApLFxuICAgICAgICB7XG4gICAgICAgICAgYTogWydhcHBsZScsICdhYXJkdmFyayddLFxuICAgICAgICAgIG86IFsnb3JhbmdlJywgJ29yYW5nZSddLFxuICAgICAgICAgIHo6IFsnemVicmEnXSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzRW1wdHknLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgZW1wdHkgaXRlcmFibGVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc0VtcHR5KCcnKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzRW1wdHkoW10pKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNFbXB0eShuZXcgU2V0KCkpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tZW1wdHkgaXRlcmFibGVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNFbXB0eSgnICcpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzRW1wdHkoWzEsIDJdKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0VtcHR5KG5ldyBTZXQoWzMsIDRdKSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXMgbm90IFwibG9vayBwYXN0XCIgdGhlIGZpcnN0IGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICBmdW5jdGlvbiogbnVtYmVycygpIHtcbiAgICAgICAgeWllbGQgMTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIHNob3VsZCBuZXZlciBoYXBwZW4nKTtcbiAgICAgIH1cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzRW1wdHkobnVtYmVycygpKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdqb2luJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBlbXB0eSBzdHJpbmcgZm9yIGVtcHR5IGl0ZXJhYmxlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0VtcHR5KGpvaW4oW10sICd4JykpO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkoam9pbihuZXcgU2V0KCksICd4JykpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2YWx1ZSBpZiBpdCdzIHRoZSBvbmx5IHZhbHVlXCIsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqb2luKG5ldyBTZXQoWydmb28nXSksICd4JyksICdmb28nKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChqb2luKG5ldyBTZXQoWzEyM10pLCAneCcpLCAnMTIzJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoam9pbihbeyB0b1N0cmluZzogKCkgPT4gJ2ZvbycgfV0sICd4JyksICdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGVhY2ggdmFsdWUgc3RyaW5naWZpZWQsIGpvaW5lZCBieSBzZXBhcmF0b3InLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGpvaW4obmV3IFNldChbJ2ZvbycsICdiYXInLCAnYmF6J10pLCAnICcpLFxuICAgICAgICAnZm9vIGJhciBiYXonXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpvaW4obmV3IFNldChbMSwgMiwgM10pLCAnLS0nKSwgJzEtLTItLTMnKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIHVuZGVmaW5lZCBhbmQgbnVsbCBsaWtlIEFycmF5LnByb3RvdHlwZS5qb2luJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGpvaW4obmV3IFNldChbdW5kZWZpbmVkLCBudWxsXSksICcsJyksICcsJyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdtYXAnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgaXRlcmFibGUgd2hlbiBwYXNzZWQgYW4gZW1wdHkgaXRlcmFibGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmbiA9IHNpbm9uLmZha2UoKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChbLi4ubWFwKFtdLCBmbildLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5tYXAobmV3IFNldCgpLCBmbildLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5tYXAobmV3IE1hcCgpLCBmbildLCBbXSk7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZm4pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgYSBuZXcgaXRlcmF0b3Igd2l0aCB2YWx1ZXMgbWFwcGVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgZm4gPSBzaW5vbi5mYWtlKChuOiBudW1iZXIpID0+IG4gKiBuKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG1hcChbMSwgMiwgM10sIGZuKTtcblxuICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChmbik7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLnJlc3VsdF0sIFsxLCA0LCA5XSk7XG4gICAgICBhc3NlcnQubm90SW5zdGFuY2VPZihyZXN1bHQsIEFycmF5KTtcblxuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFRocmljZShmbik7XG4gICAgfSk7XG5cbiAgICBpdCgnaXRlcmF0aW5nIGRvZXNuXFwndCBcInNwZW5kXCIgdGhlIGl0ZXJhYmxlJywgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gbWFwKFsxLCAyLCAzXSwgbiA9PiBuICogbik7XG5cbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLnJlc3VsdF0sIFsxLCA0LCA5XSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi5yZXN1bHRdLCBbMSwgNCwgOV0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChbLi4ucmVzdWx0XSwgWzEsIDQsIDldKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW4gbWFwIG92ZXIgYW4gaW5maW5pdGUgaXRlcmFibGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBldmVyeU51bWJlciA9IHtcbiAgICAgICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0cnVlOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHlpZWxkIGk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgZm4gPSBzaW5vbi5mYWtlKChuOiBudW1iZXIpID0+IG4gKiBuKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG1hcChldmVyeU51bWJlciwgZm4pO1xuICAgICAgY29uc3QgaXRlcmF0b3IgPSByZXN1bHRbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogMCwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogMSwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogNCwgZG9uZTogZmFsc2UgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZXJhdG9yLm5leHQoKSwgeyB2YWx1ZTogOSwgZG9uZTogZmFsc2UgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZWR1Y2UnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdGhlIGFjY3VtdWxhdG9yIHdoZW4gcGFzc2VkIGFuIGVtcHR5IGl0ZXJhYmxlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZm4gPSBzaW5vbi5mYWtlKCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZWR1Y2UoW10sIGZuLCAxMjMpLCAxMjMpO1xuXG4gICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZuKTtcbiAgICB9KTtcblxuICAgIGl0KCdpdGVyYXRlcyBvdmVyIHRoZSBpdGVyYWJsZSwgdWx0aW1hdGVseSByZXR1cm5pbmcgYSByZXN1bHQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHJlZHVjZShuZXcgU2V0KFsxLCAyLCAzLCA0XSksIChyZXN1bHQsIG4pID0+IHJlc3VsdCArIG4sIDg5KSxcbiAgICAgICAgOTlcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd0YWtlJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBmaXJzdCBuIGVsZW1lbnRzIGZyb20gYW4gaXRlcmFibGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBldmVyeU51bWJlciA9IHtcbiAgICAgICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyB0cnVlOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHlpZWxkIGk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChbLi4udGFrZShldmVyeU51bWJlciwgMCldLCBbXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi50YWtlKGV2ZXJ5TnVtYmVyLCAxKV0sIFswXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi50YWtlKGV2ZXJ5TnVtYmVyLCA3KV0sIFswLCAxLCAyLCAzLCA0LCA1LCA2XSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RvcHMgYWZ0ZXIgdGhlIGl0ZXJhYmxlIGhhcyBiZWVuIGV4aGF1c3RlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHNldCA9IG5ldyBTZXQoWzEsIDIsIDNdKTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChbLi4udGFrZShzZXQsIDMpXSwgWzEsIDIsIDNdKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoWy4uLnRha2Uoc2V0LCA0KV0sIFsxLCAyLCAzXSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFsuLi50YWtlKHNldCwgMTAwMDApXSwgWzEsIDIsIDNdKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3ppcE9iamVjdCcsICgpID0+IHtcbiAgICBpdCgnemlwcyB1cCBhbiBvYmplY3QnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHppcE9iamVjdChbJ2ZvbycsICdiYXInXSwgWzEsIDJdKSwgeyBmb286IDEsIGJhcjogMiB9KTtcbiAgICB9KTtcblxuICAgIGl0KCdzdG9wcyBpZiB0aGUga2V5cyBcInJ1biBvdXRcIiBmaXJzdCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoemlwT2JqZWN0KFsnZm9vJywgJ2JhciddLCBbMSwgMiwgMywgNCwgNSwgNl0pLCB7XG4gICAgICAgIGZvbzogMSxcbiAgICAgICAgYmFyOiAyLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc3RvcHMgaWYgdGhlIHZhbHVlcyBcInJ1biBvdXRcIiBmaXJzdCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoemlwT2JqZWN0KFsnZm9vJywgJ2JhcicsICdiYXonXSwgWzFdKSwge1xuICAgICAgICBmb286IDEsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsWUFBdUI7QUFFdkIsdUJBZU87QUFFUCxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLFdBQVMsY0FBYyxNQUFNO0FBQzNCLE9BQUcsbUNBQW1DLE1BQU07QUFDMUMseUJBQU8sUUFBUSxpQ0FBVyxNQUFTLENBQUM7QUFDcEMseUJBQU8sUUFBUSxpQ0FBVyxJQUFJLENBQUM7QUFDL0IseUJBQU8sUUFBUSxpQ0FBVyxHQUFHLENBQUM7QUFDOUIseUJBQU8sUUFBUSxpQ0FBVyxFQUFFLEtBQUssTUFBTSxDQUFDLENBQUM7QUFDekMseUJBQU8sUUFDTCxpQ0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFBLE1BQ1AsQ0FBQyxDQUNIO0FBQUEsSUFDRixDQUFDO0FBRUQsT0FBRyw4QkFBOEIsTUFBTTtBQUNyQyx5QkFBTyxPQUFPLGlDQUFXLHNCQUFzQixDQUFDO0FBQ2hELHlCQUFPLE9BQU8saUNBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4Qyx5QkFBTyxPQUFPLGlDQUFXLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQztBQUM3Qyx5QkFBTyxPQUFPLGlDQUFXLG9CQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELHlCQUFPLE9BQ0wsaUNBQVc7QUFBQSxTQUNSLE9BQU8sWUFBWTtBQUNsQixpQkFBTztBQUFBLFlBQ0wsT0FBTztBQUNMLHFCQUFPO0FBQUEsZ0JBQ0wsT0FBTztBQUFBLGdCQUNQLE1BQU07QUFBQSxjQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDLENBQ0g7QUFDQSx5QkFBTyxPQUNMLGlD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
