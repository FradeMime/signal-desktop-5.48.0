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
var import_sinon = __toESM(require("sinon"));
var import_completion = require("../../../quill/emoji/completion");
describe("emojiCompletion", () => {
  let emojiCompletion;
  let mockQuill;
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    mockQuill = {
      getLeaf: import_sinon.default.stub(),
      getSelection: import_sinon.default.stub(),
      keyboard: {
        addBinding: import_sinon.default.stub()
      },
      on: import_sinon.default.stub(),
      setSelection: import_sinon.default.stub(),
      updateContents: import_sinon.default.stub()
    };
    const options = {
      onPickEmoji: import_sinon.default.stub(),
      setEmojiPickerElement: import_sinon.default.stub(),
      skinTone: 0
    };
    emojiCompletion = new import_completion.EmojiCompletion(mockQuill, options);
    emojiCompletion.render = import_sinon.default.stub();
  }, "beforeEach"));
  describe("getCurrentLeafTextPartitions", () => {
    it("returns left and right text", () => {
      mockQuill.getSelection.returns({ index: 0, length: 0 });
      const blot = {
        text: ":smile:"
      };
      mockQuill.getLeaf.returns([blot, 2]);
      const [leftLeafText, rightLeafText] = emojiCompletion.getCurrentLeafTextPartitions();
      import_chai.assert.equal(leftLeafText, ":s");
      import_chai.assert.equal(rightLeafText, "mile:");
    });
  });
  describe("onTextChange", () => {
    let insertEmojiStub;
    beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
      emojiCompletion.results = [{ short_name: "joy" }];
      emojiCompletion.index = 5;
      insertEmojiStub = import_sinon.default.stub(emojiCompletion, "insertEmoji").callThrough();
    }, "beforeEach"));
    afterEach(/* @__PURE__ */ __name(function afterEach2() {
      insertEmojiStub.restore();
    }, "afterEach"));
    describe("given an emoji is not starting (no colon)", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 3,
          length: 0
        });
        const blot = {
          text: "smi"
        };
        mockQuill.getLeaf.returns([blot, 3]);
        emojiCompletion.onTextChange();
      }, "beforeEach"));
      it("does not show results", () => {
        import_chai.assert.equal(emojiCompletion.results.length, 0);
      });
    });
    describe("given a colon in a string (but not an emoji)", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 5,
          length: 0
        });
        const blot = {
          text: "10:30"
        };
        mockQuill.getLeaf.returns([blot, 5]);
        emojiCompletion.onTextChange();
      }, "beforeEach"));
      it("does not show results", () => {
        import_chai.assert.equal(emojiCompletion.results.length, 0);
      });
    });
    describe("given an emoji is starting but does not have 2 characters", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 2,
          length: 0
        });
        const blot = {
          text: ":s"
        };
        mockQuill.getLeaf.returns([blot, 2]);
        emojiCompletion.onTextChange();
      }, "beforeEach"));
      it("does not show results", () => {
        import_chai.assert.equal(emojiCompletion.results.length, 0);
      });
    });
    describe("given an emoji is starting but does not match a short name", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 4,
          length: 0
        });
        const blot = {
          text: ":smy"
        };
        mockQuill.getLeaf.returns([blot, 4]);
        emojiCompletion.onTextChange();
      }, "beforeEach"));
      it("does not show results", () => {
        import_chai.assert.equal(emojiCompletion.results.length, 0);
      });
    });
    describe("given an emoji is starting and matches short names", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 4,
          length: 0
        });
        const blot = {
          text: ":smi"
        };
        mockQuill.getLeaf.returns([blot, 4]);
        emojiCompletion.onTextChange();
      }, "beforeEach"));
      it("stores the results and renders", () => {
        import_chai.assert.equal(emojiCompletion.results.length, 10);
        import_chai.assert.equal(emojiCompletion.render.called, true);
      });
    });
    describe("given an emoji was just completed", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 7,
          length: 0
        });
      }, "beforeEach"));
      describe("and given it matches a short name", () => {
        const text = ":smile:";
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          const blot = {
            text
          };
          mockQuill.getLeaf.returns([blot, 7]);
          emojiCompletion.onTextChange();
        }, "beforeEach"));
        it("inserts the emoji at the current cursor position", () => {
          const [emoji, index, range] = insertEmojiStub.args[0];
          import_chai.assert.equal(emoji.short_name, "smile");
          import_chai.assert.equal(index, 0);
          import_chai.assert.equal(range, 7);
        });
        it("does not show results", () => {
          import_chai.assert.equal(emojiCompletion.results.length, 0);
        });
      });
      describe("and given it matches a short name inside a larger string", () => {
        const text = "have a :smile: nice day";
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          const blot = {
            text
          };
          mockQuill.getSelection.returns({
            index: 13,
            length: 0
          });
          mockQuill.getLeaf.returns([blot, 13]);
          emojiCompletion.onTextChange();
        }, "beforeEach"));
        it("inserts the emoji at the current cursor position", () => {
          const [emoji, index, range] = insertEmojiStub.args[0];
          import_chai.assert.equal(emoji.short_name, "smile");
          import_chai.assert.equal(index, 7);
          import_chai.assert.equal(range, 7);
        });
        it("does not show results", () => {
          import_chai.assert.equal(emojiCompletion.results.length, 0);
        });
        it("sets the quill selection to the right cursor position", () => {
          const [index, range] = mockQuill.setSelection.args[0];
          import_chai.assert.equal(index, 8);
          import_chai.assert.equal(range, 0);
        });
      });
      describe("and given it does not match a short name", () => {
        const text = ":smyle:";
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          const blot = {
            text
          };
          mockQuill.getLeaf.returns([blot, 7]);
          emojiCompletion.onTextChange();
        }, "beforeEach"));
        it("does not show results", () => {
          import_chai.assert.equal(emojiCompletion.results.length, 0);
        });
      });
    });
    describe("given an emoji was just completed from inside the colons", () => {
      const validEmoji = ":smile:";
      const invalidEmoji = ":smyle:";
      const middleCursorIndex = validEmoji.length - 3;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: middleCursorIndex,
          length: 0
        });
      }, "beforeEach"));
      describe("and given it matches a short name", () => {
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          const blot = {
            text: validEmoji
          };
          mockQuill.getLeaf.returns([blot, middleCursorIndex]);
          emojiCompletion.onTextChange();
        }, "beforeEach"));
        it("inserts the emoji at the current cursor position", () => {
          const [emoji, index, range] = insertEmojiStub.args[0];
          import_chai.assert.equal(emoji.short_name, "smile");
          import_chai.assert.equal(index, 0);
          import_chai.assert.equal(range, validEmoji.length);
        });
        it("does not show results", () => {
          import_chai.assert.equal(emojiCompletion.results.length, 0);
        });
      });
      describe("and given it does not match a short name", () => {
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          const blot = {
            text: invalidEmoji
          };
          mockQuill.getLeaf.returns([blot, middleCursorIndex]);
          emojiCompletion.onTextChange();
        }, "beforeEach"));
        it("does not show results", () => {
          import_chai.assert.equal(emojiCompletion.results.length, 0);
        });
      });
    });
    describe("given a completeable emoji and colon was just pressed", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index: 6,
          length: 0
        });
      }, "beforeEach"));
      describe("and given it matches a short name", () => {
        const text = ":smile";
        beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
          const blot = {
            text
          };
          mockQuill.getLeaf.returns([blot, 6]);
          emojiCompletion.onTextChange(true);
        }, "beforeEach"));
        it("inserts the emoji at the current cursor position", () => {
          const [emoji, index, range] = insertEmojiStub.args[0];
          import_chai.assert.equal(emoji.short_name, "smile");
          import_chai.assert.equal(index, 0);
          import_chai.assert.equal(range, 6);
        });
        it("does not show results", () => {
          import_chai.assert.equal(emojiCompletion.results.length, 0);
        });
      });
    });
  });
  describe("completeEmoji", () => {
    let insertEmojiStub;
    beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
      emojiCompletion.results = [
        { short_name: "smile" },
        { short_name: "smile_cat" }
      ];
      emojiCompletion.index = 1;
      insertEmojiStub = import_sinon.default.stub(emojiCompletion, "insertEmoji");
    }, "beforeEach"));
    describe("given a valid token", () => {
      const text = ":smi";
      const index = text.length;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index,
          length: 0
        });
        const blot = {
          text
        };
        mockQuill.getLeaf.returns([blot, index]);
        emojiCompletion.completeEmoji();
      }, "beforeEach"));
      it("inserts the currently selected emoji at the current cursor position", () => {
        const [emoji, insertIndex, range] = insertEmojiStub.args[0];
        import_chai.assert.equal(emoji.short_name, "smile_cat");
        import_chai.assert.equal(insertIndex, 0);
        import_chai.assert.equal(range, text.length);
      });
    });
    describe("given a valid token is not present", () => {
      const text = "smi";
      const index = text.length;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        mockQuill.getSelection.returns({
          index,
          length: 0
        });
        const blot = {
          text
        };
        mockQuill.getLeaf.returns([blot, index]);
        emojiCompletion.completeEmoji();
      }, "beforeEach"));
      it("does not insert anything", () => {
        import_chai.assert.equal(insertEmojiStub.called, false);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tcGxldGlvbl90ZXN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgRW1vamlDb21wbGV0aW9uIH0gZnJvbSAnLi4vLi4vLi4vcXVpbGwvZW1vamkvY29tcGxldGlvbic7XG5pbXBvcnQgdHlwZSB7IEVtb2ppRGF0YSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZW1vamkvbGliJztcblxuZGVzY3JpYmUoJ2Vtb2ppQ29tcGxldGlvbicsICgpID0+IHtcbiAgbGV0IGVtb2ppQ29tcGxldGlvbjogRW1vamlDb21wbGV0aW9uO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBsZXQgbW9ja1F1aWxsOiBhbnk7XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgIG1vY2tRdWlsbCA9IHtcbiAgICAgIGdldExlYWY6IHNpbm9uLnN0dWIoKSxcbiAgICAgIGdldFNlbGVjdGlvbjogc2lub24uc3R1YigpLFxuICAgICAga2V5Ym9hcmQ6IHtcbiAgICAgICAgYWRkQmluZGluZzogc2lub24uc3R1YigpLFxuICAgICAgfSxcbiAgICAgIG9uOiBzaW5vbi5zdHViKCksXG4gICAgICBzZXRTZWxlY3Rpb246IHNpbm9uLnN0dWIoKSxcbiAgICAgIHVwZGF0ZUNvbnRlbnRzOiBzaW5vbi5zdHViKCksXG4gICAgfTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgb25QaWNrRW1vamk6IHNpbm9uLnN0dWIoKSxcbiAgICAgIHNldEVtb2ppUGlja2VyRWxlbWVudDogc2lub24uc3R1YigpLFxuICAgICAgc2tpblRvbmU6IDAsXG4gICAgfTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZW1vamlDb21wbGV0aW9uID0gbmV3IEVtb2ppQ29tcGxldGlvbihtb2NrUXVpbGwgYXMgYW55LCBvcHRpb25zKTtcblxuICAgIC8vIFN0dWIgcmVuZGVyaW5nIHRvIGF2b2lkIG1pc3NpbmcgRE9NIHVudGlsIHdlIGJyaW5nIGluIEVuenltZVxuICAgIGVtb2ppQ29tcGxldGlvbi5yZW5kZXIgPSBzaW5vbi5zdHViKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRDdXJyZW50TGVhZlRleHRQYXJ0aXRpb25zJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGxlZnQgYW5kIHJpZ2h0IHRleHQnLCAoKSA9PiB7XG4gICAgICBtb2NrUXVpbGwuZ2V0U2VsZWN0aW9uLnJldHVybnMoeyBpbmRleDogMCwgbGVuZ3RoOiAwIH0pO1xuICAgICAgY29uc3QgYmxvdCA9IHtcbiAgICAgICAgdGV4dDogJzpzbWlsZTonLFxuICAgICAgfTtcbiAgICAgIG1vY2tRdWlsbC5nZXRMZWFmLnJldHVybnMoW2Jsb3QsIDJdKTtcbiAgICAgIGNvbnN0IFtsZWZ0TGVhZlRleHQsIHJpZ2h0TGVhZlRleHRdID1cbiAgICAgICAgZW1vamlDb21wbGV0aW9uLmdldEN1cnJlbnRMZWFmVGV4dFBhcnRpdGlvbnMoKTtcbiAgICAgIGFzc2VydC5lcXVhbChsZWZ0TGVhZlRleHQsICc6cycpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHJpZ2h0TGVhZlRleHQsICdtaWxlOicpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnb25UZXh0Q2hhbmdlJywgKCkgPT4ge1xuICAgIGxldCBpbnNlcnRFbW9qaVN0dWI6IHNpbm9uLlNpbm9uU3R1YjxcbiAgICAgIFtFbW9qaURhdGEsIG51bWJlciwgbnVtYmVyLCAoYm9vbGVhbiB8IHVuZGVmaW5lZCk/XSxcbiAgICAgIHZvaWRcbiAgICA+O1xuXG4gICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGVtb2ppQ29tcGxldGlvbi5yZXN1bHRzID0gW3sgc2hvcnRfbmFtZTogJ2pveScgfSBhcyBhbnldO1xuICAgICAgZW1vamlDb21wbGV0aW9uLmluZGV4ID0gNTtcbiAgICAgIGluc2VydEVtb2ppU3R1YiA9IHNpbm9uXG4gICAgICAgIC5zdHViKGVtb2ppQ29tcGxldGlvbiwgJ2luc2VydEVtb2ppJylcbiAgICAgICAgLmNhbGxUaHJvdWdoKCk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goZnVuY3Rpb24gYWZ0ZXJFYWNoKCkge1xuICAgICAgaW5zZXJ0RW1vamlTdHViLnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnaXZlbiBhbiBlbW9qaSBpcyBub3Qgc3RhcnRpbmcgKG5vIGNvbG9uKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgbW9ja1F1aWxsLmdldFNlbGVjdGlvbi5yZXR1cm5zKHtcbiAgICAgICAgICBpbmRleDogMyxcbiAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgdGV4dDogJ3NtaScsXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tRdWlsbC5nZXRMZWFmLnJldHVybnMoW2Jsb3QsIDNdKTtcblxuICAgICAgICBlbW9qaUNvbXBsZXRpb24ub25UZXh0Q2hhbmdlKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2RvZXMgbm90IHNob3cgcmVzdWx0cycsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGVtb2ppQ29tcGxldGlvbi5yZXN1bHRzLmxlbmd0aCwgMCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnaXZlbiBhIGNvbG9uIGluIGEgc3RyaW5nIChidXQgbm90IGFuIGVtb2ppKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgbW9ja1F1aWxsLmdldFNlbGVjdGlvbi5yZXR1cm5zKHtcbiAgICAgICAgICBpbmRleDogNSxcbiAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgdGV4dDogJzEwOjMwJyxcbiAgICAgICAgfTtcbiAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgNV0pO1xuXG4gICAgICAgIGVtb2ppQ29tcGxldGlvbi5vblRleHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoZW1vamlDb21wbGV0aW9uLnJlc3VsdHMubGVuZ3RoLCAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGFuIGVtb2ppIGlzIHN0YXJ0aW5nIGJ1dCBkb2VzIG5vdCBoYXZlIDIgY2hhcmFjdGVycycsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgbW9ja1F1aWxsLmdldFNlbGVjdGlvbi5yZXR1cm5zKHtcbiAgICAgICAgICBpbmRleDogMixcbiAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgdGV4dDogJzpzJyxcbiAgICAgICAgfTtcbiAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgMl0pO1xuXG4gICAgICAgIGVtb2ppQ29tcGxldGlvbi5vblRleHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoZW1vamlDb21wbGV0aW9uLnJlc3VsdHMubGVuZ3RoLCAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGFuIGVtb2ppIGlzIHN0YXJ0aW5nIGJ1dCBkb2VzIG5vdCBtYXRjaCBhIHNob3J0IG5hbWUnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICAgIG1vY2tRdWlsbC5nZXRTZWxlY3Rpb24ucmV0dXJucyh7XG4gICAgICAgICAgaW5kZXg6IDQsXG4gICAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBibG90ID0ge1xuICAgICAgICAgIHRleHQ6ICc6c215JyxcbiAgICAgICAgfTtcbiAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgNF0pO1xuXG4gICAgICAgIGVtb2ppQ29tcGxldGlvbi5vblRleHRDaGFuZ2UoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoZW1vamlDb21wbGV0aW9uLnJlc3VsdHMubGVuZ3RoLCAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGFuIGVtb2ppIGlzIHN0YXJ0aW5nIGFuZCBtYXRjaGVzIHNob3J0IG5hbWVzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICBtb2NrUXVpbGwuZ2V0U2VsZWN0aW9uLnJldHVybnMoe1xuICAgICAgICAgIGluZGV4OiA0LFxuICAgICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYmxvdCA9IHtcbiAgICAgICAgICB0ZXh0OiAnOnNtaScsXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tRdWlsbC5nZXRMZWFmLnJldHVybnMoW2Jsb3QsIDRdKTtcblxuICAgICAgICBlbW9qaUNvbXBsZXRpb24ub25UZXh0Q2hhbmdlKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3N0b3JlcyB0aGUgcmVzdWx0cyBhbmQgcmVuZGVycycsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKGVtb2ppQ29tcGxldGlvbi5yZXN1bHRzLmxlbmd0aCwgMTApO1xuICAgICAgICBhc3NlcnQuZXF1YWwoKGVtb2ppQ29tcGxldGlvbi5yZW5kZXIgYXMgc2lub24uU2lub25TdHViKS5jYWxsZWQsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2l2ZW4gYW4gZW1vamkgd2FzIGp1c3QgY29tcGxldGVkJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICBtb2NrUXVpbGwuZ2V0U2VsZWN0aW9uLnJldHVybnMoe1xuICAgICAgICAgIGluZGV4OiA3LFxuICAgICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2FuZCBnaXZlbiBpdCBtYXRjaGVzIGEgc2hvcnQgbmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dCA9ICc6c21pbGU6JztcblxuICAgICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICAgICAgY29uc3QgYmxvdCA9IHtcbiAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBtb2NrUXVpbGwuZ2V0TGVhZi5yZXR1cm5zKFtibG90LCA3XSk7XG5cbiAgICAgICAgICBlbW9qaUNvbXBsZXRpb24ub25UZXh0Q2hhbmdlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbnNlcnRzIHRoZSBlbW9qaSBhdCB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgW2Vtb2ppLCBpbmRleCwgcmFuZ2VdID0gaW5zZXJ0RW1vamlTdHViLmFyZ3NbMF07XG5cbiAgICAgICAgICBhc3NlcnQuZXF1YWwoZW1vamkuc2hvcnRfbmFtZSwgJ3NtaWxlJyk7XG4gICAgICAgICAgYXNzZXJ0LmVxdWFsKGluZGV4LCAwKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwocmFuZ2UsIDcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaUNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgsIDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnYW5kIGdpdmVuIGl0IG1hdGNoZXMgYSBzaG9ydCBuYW1lIGluc2lkZSBhIGxhcmdlciBzdHJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSAnaGF2ZSBhIDpzbWlsZTogbmljZSBkYXknO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgICBjb25zdCBibG90ID0ge1xuICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG1vY2tRdWlsbC5nZXRTZWxlY3Rpb24ucmV0dXJucyh7XG4gICAgICAgICAgICBpbmRleDogMTMsXG4gICAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgMTNdKTtcblxuICAgICAgICAgIGVtb2ppQ29tcGxldGlvbi5vblRleHRDaGFuZ2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luc2VydHMgdGhlIGVtb2ppIGF0IHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBbZW1vamksIGluZGV4LCByYW5nZV0gPSBpbnNlcnRFbW9qaVN0dWIuYXJnc1swXTtcblxuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaS5zaG9ydF9uYW1lLCAnc21pbGUnKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwoaW5kZXgsIDcpO1xuICAgICAgICAgIGFzc2VydC5lcXVhbChyYW5nZSwgNyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkb2VzIG5vdCBzaG93IHJlc3VsdHMnLCAoKSA9PiB7XG4gICAgICAgICAgYXNzZXJ0LmVxdWFsKGVtb2ppQ29tcGxldGlvbi5yZXN1bHRzLmxlbmd0aCwgMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzZXRzIHRoZSBxdWlsbCBzZWxlY3Rpb24gdG8gdGhlIHJpZ2h0IGN1cnNvciBwb3NpdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBbaW5kZXgsIHJhbmdlXSA9IG1vY2tRdWlsbC5zZXRTZWxlY3Rpb24uYXJnc1swXTtcblxuICAgICAgICAgIGFzc2VydC5lcXVhbChpbmRleCwgOCk7XG4gICAgICAgICAgYXNzZXJ0LmVxdWFsKHJhbmdlLCAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2FuZCBnaXZlbiBpdCBkb2VzIG5vdCBtYXRjaCBhIHNob3J0IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSAnOnNteWxlOic7XG5cbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIH07XG4gICAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgN10pO1xuXG4gICAgICAgICAgZW1vamlDb21wbGV0aW9uLm9uVGV4dENoYW5nZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaUNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgsIDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGFuIGVtb2ppIHdhcyBqdXN0IGNvbXBsZXRlZCBmcm9tIGluc2lkZSB0aGUgY29sb25zJywgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWRFbW9qaSA9ICc6c21pbGU6JztcbiAgICAgIGNvbnN0IGludmFsaWRFbW9qaSA9ICc6c215bGU6JztcbiAgICAgIGNvbnN0IG1pZGRsZUN1cnNvckluZGV4ID0gdmFsaWRFbW9qaS5sZW5ndGggLSAzO1xuXG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICAgIG1vY2tRdWlsbC5nZXRTZWxlY3Rpb24ucmV0dXJucyh7XG4gICAgICAgICAgaW5kZXg6IG1pZGRsZUN1cnNvckluZGV4LFxuICAgICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2FuZCBnaXZlbiBpdCBtYXRjaGVzIGEgc2hvcnQgbmFtZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgICB0ZXh0OiB2YWxpZEVtb2ppLFxuICAgICAgICAgIH07XG4gICAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgbWlkZGxlQ3Vyc29ySW5kZXhdKTtcblxuICAgICAgICAgIGVtb2ppQ29tcGxldGlvbi5vblRleHRDaGFuZ2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2luc2VydHMgdGhlIGVtb2ppIGF0IHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBbZW1vamksIGluZGV4LCByYW5nZV0gPSBpbnNlcnRFbW9qaVN0dWIuYXJnc1swXTtcblxuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaS5zaG9ydF9uYW1lLCAnc21pbGUnKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwoaW5kZXgsIDApO1xuICAgICAgICAgIGFzc2VydC5lcXVhbChyYW5nZSwgdmFsaWRFbW9qaS5sZW5ndGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaUNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgsIDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnYW5kIGdpdmVuIGl0IGRvZXMgbm90IG1hdGNoIGEgc2hvcnQgbmFtZScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgICB0ZXh0OiBpbnZhbGlkRW1vamksXG4gICAgICAgICAgfTtcbiAgICAgICAgICBtb2NrUXVpbGwuZ2V0TGVhZi5yZXR1cm5zKFtibG90LCBtaWRkbGVDdXJzb3JJbmRleF0pO1xuXG4gICAgICAgICAgZW1vamlDb21wbGV0aW9uLm9uVGV4dENoYW5nZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaUNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgsIDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGEgY29tcGxldGVhYmxlIGVtb2ppIGFuZCBjb2xvbiB3YXMganVzdCBwcmVzc2VkJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICBtb2NrUXVpbGwuZ2V0U2VsZWN0aW9uLnJldHVybnMoe1xuICAgICAgICAgIGluZGV4OiA2LFxuICAgICAgICAgIGxlbmd0aDogMCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2FuZCBnaXZlbiBpdCBtYXRjaGVzIGEgc2hvcnQgbmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dCA9ICc6c21pbGUnO1xuXG4gICAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgICBjb25zdCBibG90ID0ge1xuICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICB9O1xuICAgICAgICAgIG1vY2tRdWlsbC5nZXRMZWFmLnJldHVybnMoW2Jsb3QsIDZdKTtcblxuICAgICAgICAgIGVtb2ppQ29tcGxldGlvbi5vblRleHRDaGFuZ2UodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdpbnNlcnRzIHRoZSBlbW9qaSBhdCB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24nLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgW2Vtb2ppLCBpbmRleCwgcmFuZ2VdID0gaW5zZXJ0RW1vamlTdHViLmFyZ3NbMF07XG5cbiAgICAgICAgICBhc3NlcnQuZXF1YWwoZW1vamkuc2hvcnRfbmFtZSwgJ3NtaWxlJyk7XG4gICAgICAgICAgYXNzZXJ0LmVxdWFsKGluZGV4LCAwKTtcbiAgICAgICAgICBhc3NlcnQuZXF1YWwocmFuZ2UsIDYpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3Qgc2hvdyByZXN1bHRzJywgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5lcXVhbChlbW9qaUNvbXBsZXRpb24ucmVzdWx0cy5sZW5ndGgsIDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29tcGxldGVFbW9qaScsICgpID0+IHtcbiAgICBsZXQgaW5zZXJ0RW1vamlTdHViOiBzaW5vbi5TaW5vblN0dWI8XG4gICAgICBbRW1vamlEYXRhLCBudW1iZXIsIG51bWJlciwgKGJvb2xlYW4gfCB1bmRlZmluZWQpP10sXG4gICAgICB2b2lkXG4gICAgPjtcblxuICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgIGVtb2ppQ29tcGxldGlvbi5yZXN1bHRzID0gW1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB7IHNob3J0X25hbWU6ICdzbWlsZScgfSBhcyBhbnksXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHsgc2hvcnRfbmFtZTogJ3NtaWxlX2NhdCcgfSBhcyBhbnksXG4gICAgICBdO1xuICAgICAgZW1vamlDb21wbGV0aW9uLmluZGV4ID0gMTtcbiAgICAgIGluc2VydEVtb2ppU3R1YiA9IHNpbm9uLnN0dWIoZW1vamlDb21wbGV0aW9uLCAnaW5zZXJ0RW1vamknKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnaXZlbiBhIHZhbGlkIHRva2VuJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9ICc6c21pJztcbiAgICAgIGNvbnN0IGluZGV4ID0gdGV4dC5sZW5ndGg7XG5cbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgbW9ja1F1aWxsLmdldFNlbGVjdGlvbi5yZXR1cm5zKHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBsZW5ndGg6IDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGJsb3QgPSB7XG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgfTtcbiAgICAgICAgbW9ja1F1aWxsLmdldExlYWYucmV0dXJucyhbYmxvdCwgaW5kZXhdKTtcblxuICAgICAgICBlbW9qaUNvbXBsZXRpb24uY29tcGxldGVFbW9qaSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdpbnNlcnRzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZW1vamkgYXQgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBbZW1vamksIGluc2VydEluZGV4LCByYW5nZV0gPSBpbnNlcnRFbW9qaVN0dWIuYXJnc1swXTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwoZW1vamkuc2hvcnRfbmFtZSwgJ3NtaWxlX2NhdCcpO1xuICAgICAgICBhc3NlcnQuZXF1YWwoaW5zZXJ0SW5kZXgsIDApO1xuICAgICAgICBhc3NlcnQuZXF1YWwocmFuZ2UsIHRleHQubGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dpdmVuIGEgdmFsaWQgdG9rZW4gaXMgbm90IHByZXNlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gJ3NtaSc7XG4gICAgICBjb25zdCBpbmRleCA9IHRleHQubGVuZ3RoO1xuXG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICAgIG1vY2tRdWlsbC5nZXRTZWxlY3Rpb24ucmV0dXJucyh7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgbGVuZ3RoOiAwLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBibG90ID0ge1xuICAgICAgICAgIHRleHQsXG4gICAgICAgIH07XG4gICAgICAgIG1vY2tRdWlsbC5nZXRMZWFmLnJldHVybnMoW2Jsb3QsIGluZGV4XSk7XG5cbiAgICAgICAgZW1vamlDb21wbGV0aW9uLmNvbXBsZXRlRW1vamkoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3QgaW5zZXJ0IGFueXRoaW5nJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuZXF1YWwoaW5zZXJ0RW1vamlTdHVi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
