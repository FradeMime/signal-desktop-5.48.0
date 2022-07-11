var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_Avatar = require("../../components/Avatar");
describe("<Avatar>", () => {
  describe("_getBadgeSize", () => {
    it("returns undefined for sizes under 24px", () => {
      import_chai.assert.isUndefined((0, import_Avatar._getBadgeSize)(1));
      import_chai.assert.isUndefined((0, import_Avatar._getBadgeSize)(23));
    });
    it("returns 16px for sizes between 24px\u201336px", () => {
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(24), 16);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(30), 16);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(36), 16);
    });
    it("returns 24px for sizes between 37px\u201364px", () => {
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(37), 24);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(50), 24);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(64), 24);
    });
    it("returns 36px for sizes between 65px\u2013112px", () => {
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(65), 36);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(100), 36);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(112), 36);
    });
    it("returns ~40% of the size for sizes above 112px (a fallback)", () => {
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(113), 45);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(200), 80);
      import_chai.assert.strictEqual((0, import_Avatar._getBadgeSize)(999), 400);
    });
  });
  describe("_getBadgePlacement", () => {
    const check = /* @__PURE__ */ __name((testCases) => {
      for (const [input, expected] of testCases.entries()) {
        const actual = (0, import_Avatar._getBadgePlacement)(input);
        import_chai.assert.deepStrictEqual(actual, expected, `Invalid result for size ${input}`);
      }
    }, "check");
    it("returns values as specified by designs", () => {
      const testCases = /* @__PURE__ */ new Map([
        [28, { bottom: -4, right: -2 }],
        [36, { bottom: -3, right: 0 }],
        [40, { bottom: -6, right: -4 }],
        [48, { bottom: -6, right: -4 }],
        [52, { bottom: -6, right: -2 }],
        [56, { bottom: -6, right: 0 }],
        [64, { bottom: -6, right: 0 }],
        [80, { bottom: -8, right: 0 }],
        [88, { bottom: -4, right: 3 }],
        [112, { bottom: -4, right: 3 }]
      ]);
      check(testCases);
    });
    it("returns 0, 0 values for sizes not specified by designs", () => {
      const testCases = /* @__PURE__ */ new Map([
        [16, { bottom: 0, right: 0 }],
        [200, { bottom: 0, right: 0 }]
      ]);
      check(testCases);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyX3Rlc3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IF9nZXRCYWRnZVNpemUsIF9nZXRCYWRnZVBsYWNlbWVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQXZhdGFyJztcblxuZGVzY3JpYmUoJzxBdmF0YXI+JywgKCkgPT4ge1xuICBkZXNjcmliZSgnX2dldEJhZGdlU2l6ZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyB1bmRlZmluZWQgZm9yIHNpemVzIHVuZGVyIDI0cHgnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoX2dldEJhZGdlU2l6ZSgxKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoX2dldEJhZGdlU2l6ZSgyMykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgMTZweCBmb3Igc2l6ZXMgYmV0d2VlbiAyNHB4XHUyMDEzMzZweCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChfZ2V0QmFkZ2VTaXplKDI0KSwgMTYpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoMzApLCAxNik7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoX2dldEJhZGdlU2l6ZSgzNiksIDE2KTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIDI0cHggZm9yIHNpemVzIGJldHdlZW4gMzdweFx1MjAxMzY0cHgnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoX2dldEJhZGdlU2l6ZSgzNyksIDI0KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChfZ2V0QmFkZ2VTaXplKDUwKSwgMjQpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoNjQpLCAyNCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyAzNnB4IGZvciBzaXplcyBiZXR3ZWVuIDY1cHhcdTIwMTMxMTJweCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChfZ2V0QmFkZ2VTaXplKDY1KSwgMzYpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoMTAwKSwgMzYpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoMTEyKSwgMzYpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgfjQwJSBvZiB0aGUgc2l6ZSBmb3Igc2l6ZXMgYWJvdmUgMTEycHggKGEgZmFsbGJhY2spJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoMTEzKSwgNDUpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoMjAwKSwgODApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKF9nZXRCYWRnZVNpemUoOTk5KSwgNDAwKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ19nZXRCYWRnZVBsYWNlbWVudCcsICgpID0+IHtcbiAgICBjb25zdCBjaGVjayA9IChcbiAgICAgIHRlc3RDYXNlczogTWFwPG51bWJlciwgUmV0dXJuVHlwZTx0eXBlb2YgX2dldEJhZGdlUGxhY2VtZW50Pj5cbiAgICApID0+IHtcbiAgICAgIGZvciAoY29uc3QgW2lucHV0LCBleHBlY3RlZF0gb2YgdGVzdENhc2VzLmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBfZ2V0QmFkZ2VQbGFjZW1lbnQoaW5wdXQpO1xuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKFxuICAgICAgICAgIGFjdHVhbCxcbiAgICAgICAgICBleHBlY3RlZCxcbiAgICAgICAgICBgSW52YWxpZCByZXN1bHQgZm9yIHNpemUgJHtpbnB1dH1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGl0KCdyZXR1cm5zIHZhbHVlcyBhcyBzcGVjaWZpZWQgYnkgZGVzaWducycsICgpID0+IHtcbiAgICAgIGNvbnN0IHRlc3RDYXNlcyA9IG5ldyBNYXAoW1xuICAgICAgICBbMjgsIHsgYm90dG9tOiAtNCwgcmlnaHQ6IC0yIH1dLFxuICAgICAgICBbMzYsIHsgYm90dG9tOiAtMywgcmlnaHQ6IDAgfV0sXG4gICAgICAgIFs0MCwgeyBib3R0b206IC02LCByaWdodDogLTQgfV0sXG4gICAgICAgIFs0OCwgeyBib3R0b206IC02LCByaWdodDogLTQgfV0sXG4gICAgICAgIFs1MiwgeyBib3R0b206IC02LCByaWdodDogLTIgfV0sXG4gICAgICAgIFs1NiwgeyBib3R0b206IC02LCByaWdodDogMCB9XSxcbiAgICAgICAgWzY0LCB7IGJvdHRvbTogLTYsIHJpZ2h0OiAwIH1dLFxuICAgICAgICBbODAsIHsgYm90dG9tOiAtOCwgcmlnaHQ6IDAgfV0sXG4gICAgICAgIFs4OCwgeyBib3R0b206IC00LCByaWdodDogMyB9XSxcbiAgICAgICAgWzExMiwgeyBib3R0b206IC00LCByaWdodDogMyB9XSxcbiAgICAgIF0pO1xuICAgICAgY2hlY2sodGVzdENhc2VzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIDAsIDAgdmFsdWVzIGZvciBzaXplcyBub3Qgc3BlY2lmaWVkIGJ5IGRlc2lnbnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0Q2FzZXMgPSBuZXcgTWFwKFtcbiAgICAgICAgWzE2LCB7IGJvdHRvbTogMCwgcmlnaHQ6IDAgfV0sXG4gICAgICAgIFsyMDAsIHsgYm90dG9tOiAwLCByaWdodDogMCB9XSxcbiAgICAgIF0pO1xuICAgICAgY2hlY2sodGVzdENhc2VzKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBRXZCLG9CQUFrRDtBQUVsRCxT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
