var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_lodash = require("lodash");
var import_uuid = require("uuid");
var import_durations = require("../../util/durations");
var import_timelineUtil = require("../../util/timelineUtil");
describe("<Timeline> utilities", () => {
  describe("areMessagesInSameGroup", () => {
    const defaultNewer = {
      type: "message",
      data: {
        author: { id: (0, import_uuid.v4)() },
        timestamp: new Date(1998, 10, 21, 12, 34, 56, 123).valueOf(),
        status: "delivered"
      }
    };
    const defaultOlder = {
      ...defaultNewer,
      data: {
        ...defaultNewer.data,
        timestamp: defaultNewer.data.timestamp - import_durations.MINUTE,
        status: "delivered"
      }
    };
    it("returns false if either item is missing", () => {
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(void 0, false, void 0));
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(defaultNewer, false, void 0));
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(void 0, false, defaultNewer));
    });
    it("returns false if authors don't match", () => {
      const older = {
        ...defaultOlder,
        data: { ...defaultOlder.data, author: { id: (0, import_uuid.v4)() } }
      };
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(older, false, defaultNewer));
    });
    it("returns false if the older item was sent more than 3 minutes before", () => {
      const older = {
        ...defaultNewer,
        data: {
          ...defaultNewer.data,
          timestamp: defaultNewer.data.timestamp - 3 * import_durations.MINUTE - import_durations.SECOND
        }
      };
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(older, false, defaultNewer));
    });
    it("returns false if the older item was somehow sent in the future", () => {
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(defaultNewer, false, defaultOlder));
    });
    it("returns false if the older item was sent across a day boundary, even if they're otherwise <3m apart", () => {
      const older = {
        ...defaultOlder,
        data: {
          ...defaultOlder.data,
          timestamp: new Date(2e3, 2, 2, 23, 59, 0, 0).valueOf()
        }
      };
      const newer = {
        ...defaultNewer,
        data: {
          ...defaultNewer.data,
          timestamp: new Date(2e3, 2, 3, 0, 1, 0, 0).valueOf()
        }
      };
      import_chai.assert.isBelow(newer.data.timestamp - older.data.timestamp, 3 * import_durations.MINUTE, "Test was set up incorrectly");
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(older, false, newer));
    });
    it("returns false if the older item has reactions", () => {
      const older = {
        ...defaultOlder,
        data: { ...defaultOlder.data, reactions: [{}] }
      };
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(older, false, defaultNewer));
    });
    it("returns false if there's an unread indicator in the middle", () => {
      import_chai.assert.isFalse((0, import_timelineUtil.areMessagesInSameGroup)(defaultOlder, true, defaultNewer));
    });
    it("returns true if everything above works out", () => {
      import_chai.assert.isTrue((0, import_timelineUtil.areMessagesInSameGroup)(defaultOlder, false, defaultNewer));
    });
  });
  describe("shouldCurrentMessageHideMetadata", () => {
    const defaultNewer = {
      type: "message",
      data: {
        author: { id: (0, import_uuid.v4)() },
        timestamp: new Date(1998, 10, 21, 12, 34, 56, 123).valueOf(),
        status: "delivered"
      }
    };
    const defaultCurrent = {
      type: "message",
      data: {
        author: { id: (0, import_uuid.v4)() },
        timestamp: defaultNewer.data.timestamp - import_durations.MINUTE,
        status: "delivered"
      }
    };
    it("returns false if messages aren't grouped", () => {
      import_chai.assert.isFalse((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(false, defaultCurrent, defaultNewer));
    });
    it("returns false if newer item is missing", () => {
      import_chai.assert.isFalse((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, defaultCurrent, void 0));
    });
    it("returns false if newer is deletedForEveryone", () => {
      const newer = {
        ...defaultNewer,
        data: { ...defaultNewer.data, deletedForEveryone: true }
      };
      import_chai.assert.isFalse((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, defaultCurrent, newer));
    });
    it("returns false if current message is unsent, even if its status matches the newer one", () => {
      const statuses = [
        "paused",
        "error",
        "partial-sent",
        "sending"
      ];
      for (const status of statuses) {
        const sameStatusNewer = {
          ...defaultNewer,
          data: { ...defaultNewer.data, status }
        };
        const current = {
          ...defaultCurrent,
          data: { ...defaultCurrent.data, status }
        };
        import_chai.assert.isFalse((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, current, defaultNewer));
        import_chai.assert.isFalse((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, current, sameStatusNewer));
      }
    });
    it("returns true if all messages are sent (but no higher)", () => {
      const newer = {
        ...defaultNewer,
        data: { ...defaultNewer.data, status: "sent" }
      };
      const current = {
        ...defaultCurrent,
        data: { ...defaultCurrent.data, status: "sent" }
      };
      import_chai.assert.isTrue((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, current, newer));
    });
    it("returns true if both have delivered status or above", () => {
      import_chai.assert.isTrue((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, defaultCurrent, defaultNewer));
    });
    it("returns true if both the current and next messages are deleted for everyone", () => {
      const current = {
        ...defaultCurrent,
        data: { ...defaultCurrent.data, deletedForEveryone: true }
      };
      const newer = {
        ...defaultNewer,
        data: { ...defaultNewer.data, deletedForEveryone: true }
      };
      import_chai.assert.isTrue((0, import_timelineUtil.shouldCurrentMessageHideMetadata)(true, current, newer));
    });
  });
  describe("getScrollAnchorBeforeUpdate", () => {
    const fakeItems = /* @__PURE__ */ __name((count) => (0, import_lodash.times)(count, () => (0, import_uuid.v4)()), "fakeItems");
    const defaultProps = {
      haveNewest: true,
      isIncomingMessageRequest: false,
      isSomeoneTyping: false,
      items: fakeItems(10),
      scrollToIndexCounter: 0
    };
    describe("during initial load", () => {
      it("does nothing if messages are loading for the first time", () => {
        const prevProps = {
          ...defaultProps,
          haveNewest: false,
          items: [],
          messageLoadingStates: import_timelineUtil.TimelineMessageLoadingState.DoingInitialLoad
        };
        const props = { ...prevProps, isSomeoneTyping: true };
        const isAtBottom = true;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
      });
    });
    it("scrolls to an index when applicable", () => {
      const props1 = defaultProps;
      const props2 = {
        ...defaultProps,
        scrollToIndex: 123,
        scrollToIndexCounter: 1
      };
      const props3 = {
        ...defaultProps,
        scrollToIndex: 123,
        scrollToIndexCounter: 2
      };
      const props4 = {
        ...defaultProps,
        scrollToIndex: 456,
        scrollToIndexCounter: 2
      };
      const isAtBottom = false;
      import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(props1, props2, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToIndex);
      import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(props2, props3, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToIndex);
      import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(props3, props4, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToIndex);
    });
    describe("when initial load completes", () => {
      const defaultPrevProps = {
        ...defaultProps,
        haveNewest: false,
        items: [],
        messageLoadingState: import_timelineUtil.TimelineMessageLoadingState.DoingInitialLoad
      };
      const isAtBottom = true;
      it("does nothing if there are no items", () => {
        const props = { ...defaultProps, items: [] };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(defaultPrevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
      });
      it("scrolls to the item index if applicable", () => {
        const prevProps = { ...defaultPrevProps, scrollToIndex: 3 };
        const props = {
          ...defaultProps,
          items: fakeItems(10),
          scrollToIndex: 3
        };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToIndex);
      });
      it("does nothing if it's an incoming message request", () => {
        const prevProps = {
          ...defaultPrevProps,
          isIncomingMessageRequest: true
        };
        const props = {
          ...defaultProps,
          items: fakeItems(10),
          isIncomingMessageRequest: true
        };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
      });
      it("scrolls to the unread indicator if one exists", () => {
        const props = {
          ...defaultProps,
          items: fakeItems(10),
          oldestUnseenIndex: 3
        };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(defaultPrevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToUnreadIndicator);
      });
      it("scrolls to the bottom in normal cases", () => {
        const props = {
          ...defaultProps,
          items: fakeItems(3)
        };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(defaultPrevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToBottom);
      });
    });
    describe("when a page of messages is loaded at the top", () => {
      it("uses bottom-anchored scrolling", () => {
        const oldItems = fakeItems(5);
        const prevProps = {
          ...defaultProps,
          messageLoadingState: import_timelineUtil.TimelineMessageLoadingState.LoadingOlderMessages,
          items: oldItems
        };
        const props = {
          ...defaultProps,
          items: [...fakeItems(10), ...oldItems]
        };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, false), import_timelineUtil.ScrollAnchor.Bottom);
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, true), import_timelineUtil.ScrollAnchor.Bottom);
      });
    });
    describe("when a page of messages is loaded at the bottom", () => {
      it("uses top-anchored scrolling", () => {
        const oldItems = fakeItems(5);
        const prevProps = {
          ...defaultProps,
          messageLoadingState: import_timelineUtil.TimelineMessageLoadingState.LoadingNewerMessages,
          items: oldItems
        };
        const props = {
          ...defaultProps,
          items: [...oldItems, ...fakeItems(10)]
        };
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, false), import_timelineUtil.ScrollAnchor.Top);
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, true), import_timelineUtil.ScrollAnchor.Top);
      });
    });
    describe("when a new message comes in", () => {
      const oldItems = fakeItems(5);
      const prevProps = { ...defaultProps, items: oldItems };
      const props = { ...defaultProps, items: [...oldItems, (0, import_uuid.v4)()] };
      it("does nothing if not scrolled to the bottom", () => {
        const isAtBottom = false;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
      });
      it("stays at the bottom if already there", () => {
        const isAtBottom = true;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToBottom);
      });
    });
    describe("when items are removed", () => {
      const oldItems = fakeItems(5);
      const prevProps = { ...defaultProps, items: oldItems };
      const propsWithSomethingRemoved = [
        { ...defaultProps, items: oldItems.slice(1) },
        {
          ...defaultProps,
          items: oldItems.filter((_value, index) => index !== 2)
        },
        { ...defaultProps, items: oldItems.slice(0, -1) }
      ];
      it("does nothing if not scrolled to the bottom", () => {
        const isAtBottom = false;
        propsWithSomethingRemoved.forEach((props) => {
          import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
        });
      });
      it("stays at the bottom if already there", () => {
        const isAtBottom = true;
        propsWithSomethingRemoved.forEach((props) => {
          import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToBottom);
        });
      });
    });
    describe("when the typing indicator appears", () => {
      const prevProps = defaultProps;
      it("does nothing if we don't have the newest messages (and therefore shouldn't show the indicator)", () => {
        [true, false].forEach((isAtBottom) => {
          const props = {
            ...defaultProps,
            haveNewest: false,
            isSomeoneTyping: true
          };
          import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
        });
      });
      it("does nothing if not scrolled to the bottom", () => {
        const props = { ...defaultProps, isSomeoneTyping: true };
        const isAtBottom = false;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
      });
      it("uses bottom-anchored scrolling if scrolled to the bottom", () => {
        const props = { ...defaultProps, isSomeoneTyping: true };
        const isAtBottom = true;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToBottom);
      });
    });
    describe("when the typing indicator disappears", () => {
      const prevProps = { ...defaultProps, isSomeoneTyping: true };
      it("does nothing if we don't have the newest messages (and therefore shouldn't show the indicator)", () => {
        [true, false].forEach((isAtBottom) => {
          const props = {
            ...defaultProps,
            haveNewest: false,
            isSomeoneTyping: false
          };
          import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
        });
      });
      it("does nothing if not scrolled to the bottom", () => {
        const props = { ...defaultProps, isSomeoneTyping: false };
        const isAtBottom = false;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ChangeNothing);
      });
      it("uses bottom-anchored scrolling if scrolled to the bottom", () => {
        const props = { ...defaultProps, isSomeoneTyping: false };
        const isAtBottom = true;
        import_chai.assert.strictEqual((0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, isAtBottom), import_timelineUtil.ScrollAnchor.ScrollToBottom);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZWxpbmVVdGlsX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgdHlwZSB7IExhc3RNZXNzYWdlU3RhdHVzIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBNSU5VVEUsIFNFQ09ORCB9IGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB0eXBlIHsgTWF5YmVNZXNzYWdlVGltZWxpbmVJdGVtVHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvdGltZWxpbmVVdGlsJztcbmltcG9ydCB7XG4gIFNjcm9sbEFuY2hvcixcbiAgYXJlTWVzc2FnZXNJblNhbWVHcm91cCxcbiAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlLFxuICBzaG91bGRDdXJyZW50TWVzc2FnZUhpZGVNZXRhZGF0YSxcbiAgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlLFxufSBmcm9tICcuLi8uLi91dGlsL3RpbWVsaW5lVXRpbCc7XG5cbmRlc2NyaWJlKCc8VGltZWxpbmU+IHV0aWxpdGllcycsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2FyZU1lc3NhZ2VzSW5TYW1lR3JvdXAnLCAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE5ld2VyOiBNYXliZU1lc3NhZ2VUaW1lbGluZUl0ZW1UeXBlID0ge1xuICAgICAgdHlwZTogJ21lc3NhZ2UnIGFzIGNvbnN0LFxuICAgICAgZGF0YToge1xuICAgICAgICBhdXRob3I6IHsgaWQ6IHV1aWQoKSB9LFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKDE5OTgsIDEwLCAyMSwgMTIsIDM0LCA1NiwgMTIzKS52YWx1ZU9mKCksXG4gICAgICAgIHN0YXR1czogJ2RlbGl2ZXJlZCcsXG4gICAgICB9LFxuICAgIH07XG4gICAgY29uc3QgZGVmYXVsdE9sZGVyOiBNYXliZU1lc3NhZ2VUaW1lbGluZUl0ZW1UeXBlID0ge1xuICAgICAgLi4uZGVmYXVsdE5ld2VyLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi5kZWZhdWx0TmV3ZXIuZGF0YSxcbiAgICAgICAgdGltZXN0YW1wOiBkZWZhdWx0TmV3ZXIuZGF0YS50aW1lc3RhbXAgLSBNSU5VVEUsXG4gICAgICAgIHN0YXR1czogJ2RlbGl2ZXJlZCcsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBlaXRoZXIgaXRlbSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXJlTWVzc2FnZXNJblNhbWVHcm91cCh1bmRlZmluZWQsIGZhbHNlLCB1bmRlZmluZWQpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGFyZU1lc3NhZ2VzSW5TYW1lR3JvdXAoZGVmYXVsdE5ld2VyLCBmYWxzZSwgdW5kZWZpbmVkKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShhcmVNZXNzYWdlc0luU2FtZUdyb3VwKHVuZGVmaW5lZCwgZmFsc2UsIGRlZmF1bHROZXdlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIGZhbHNlIGlmIGF1dGhvcnMgZG9uJ3QgbWF0Y2hcIiwgKCkgPT4ge1xuICAgICAgY29uc3Qgb2xkZXIgPSB7XG4gICAgICAgIC4uLmRlZmF1bHRPbGRlcixcbiAgICAgICAgZGF0YTogeyAuLi5kZWZhdWx0T2xkZXIuZGF0YSwgYXV0aG9yOiB7IGlkOiB1dWlkKCkgfSB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXJlTWVzc2FnZXNJblNhbWVHcm91cChvbGRlciwgZmFsc2UsIGRlZmF1bHROZXdlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG9sZGVyIGl0ZW0gd2FzIHNlbnQgbW9yZSB0aGFuIDMgbWludXRlcyBiZWZvcmUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRlciA9IHtcbiAgICAgICAgLi4uZGVmYXVsdE5ld2VyLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgLi4uZGVmYXVsdE5ld2VyLmRhdGEsXG4gICAgICAgICAgdGltZXN0YW1wOiBkZWZhdWx0TmV3ZXIuZGF0YS50aW1lc3RhbXAgLSAzICogTUlOVVRFIC0gU0VDT05ELFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXJlTWVzc2FnZXNJblNhbWVHcm91cChvbGRlciwgZmFsc2UsIGRlZmF1bHROZXdlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG9sZGVyIGl0ZW0gd2FzIHNvbWVob3cgc2VudCBpbiB0aGUgZnV0dXJlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXJlTWVzc2FnZXNJblNhbWVHcm91cChkZWZhdWx0TmV3ZXIsIGZhbHNlLCBkZWZhdWx0T2xkZXIpKTtcbiAgICB9KTtcblxuICAgIGl0KFwicmV0dXJucyBmYWxzZSBpZiB0aGUgb2xkZXIgaXRlbSB3YXMgc2VudCBhY3Jvc3MgYSBkYXkgYm91bmRhcnksIGV2ZW4gaWYgdGhleSdyZSBvdGhlcndpc2UgPDNtIGFwYXJ0XCIsICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZGVyID0ge1xuICAgICAgICAuLi5kZWZhdWx0T2xkZXIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAuLi5kZWZhdWx0T2xkZXIuZGF0YSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKDIwMDAsIDIsIDIsIDIzLCA1OSwgMCwgMCkudmFsdWVPZigpLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5kZWZhdWx0TmV3ZXIsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAuLi5kZWZhdWx0TmV3ZXIuZGF0YSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKDIwMDAsIDIsIDMsIDAsIDEsIDAsIDApLnZhbHVlT2YoKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBhc3NlcnQuaXNCZWxvdyhcbiAgICAgICAgbmV3ZXIuZGF0YS50aW1lc3RhbXAgLSBvbGRlci5kYXRhLnRpbWVzdGFtcCxcbiAgICAgICAgMyAqIE1JTlVURSxcbiAgICAgICAgJ1Rlc3Qgd2FzIHNldCB1cCBpbmNvcnJlY3RseSdcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGFyZU1lc3NhZ2VzSW5TYW1lR3JvdXAob2xkZXIsIGZhbHNlLCBuZXdlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG9sZGVyIGl0ZW0gaGFzIHJlYWN0aW9ucycsICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZGVyID0ge1xuICAgICAgICAuLi5kZWZhdWx0T2xkZXIsXG4gICAgICAgIGRhdGE6IHsgLi4uZGVmYXVsdE9sZGVyLmRhdGEsIHJlYWN0aW9uczogW3t9XSB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXJlTWVzc2FnZXNJblNhbWVHcm91cChvbGRlciwgZmFsc2UsIGRlZmF1bHROZXdlcikpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIGZhbHNlIGlmIHRoZXJlJ3MgYW4gdW5yZWFkIGluZGljYXRvciBpbiB0aGUgbWlkZGxlXCIsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGFyZU1lc3NhZ2VzSW5TYW1lR3JvdXAoZGVmYXVsdE9sZGVyLCB0cnVlLCBkZWZhdWx0TmV3ZXIpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgZXZlcnl0aGluZyBhYm92ZSB3b3JrcyBvdXQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGFyZU1lc3NhZ2VzSW5TYW1lR3JvdXAoZGVmYXVsdE9sZGVyLCBmYWxzZSwgZGVmYXVsdE5ld2VyKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzaG91bGRDdXJyZW50TWVzc2FnZUhpZGVNZXRhZGF0YScsICgpID0+IHtcbiAgICBjb25zdCBkZWZhdWx0TmV3ZXI6IE1heWJlTWVzc2FnZVRpbWVsaW5lSXRlbVR5cGUgPSB7XG4gICAgICB0eXBlOiAnbWVzc2FnZScgYXMgY29uc3QsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGF1dGhvcjogeyBpZDogdXVpZCgpIH0sXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoMTk5OCwgMTAsIDIxLCAxMiwgMzQsIDU2LCAxMjMpLnZhbHVlT2YoKSxcbiAgICAgICAgc3RhdHVzOiAnZGVsaXZlcmVkJyxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBjb25zdCBkZWZhdWx0Q3VycmVudDogTWF5YmVNZXNzYWdlVGltZWxpbmVJdGVtVHlwZSA9IHtcbiAgICAgIHR5cGU6ICdtZXNzYWdlJyBhcyBjb25zdCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgYXV0aG9yOiB7IGlkOiB1dWlkKCkgfSxcbiAgICAgICAgdGltZXN0YW1wOiBkZWZhdWx0TmV3ZXIuZGF0YS50aW1lc3RhbXAgLSBNSU5VVEUsXG4gICAgICAgIHN0YXR1czogJ2RlbGl2ZXJlZCcsXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpdChcInJldHVybnMgZmFsc2UgaWYgbWVzc2FnZXMgYXJlbid0IGdyb3VwZWRcIiwgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIHNob3VsZEN1cnJlbnRNZXNzYWdlSGlkZU1ldGFkYXRhKGZhbHNlLCBkZWZhdWx0Q3VycmVudCwgZGVmYXVsdE5ld2VyKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5ld2VyIGl0ZW0gaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKFxuICAgICAgICBzaG91bGRDdXJyZW50TWVzc2FnZUhpZGVNZXRhZGF0YSh0cnVlLCBkZWZhdWx0Q3VycmVudCwgdW5kZWZpbmVkKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5ld2VyIGlzIGRlbGV0ZWRGb3JFdmVyeW9uZScsICgpID0+IHtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5kZWZhdWx0TmV3ZXIsXG4gICAgICAgIGRhdGE6IHsgLi4uZGVmYXVsdE5ld2VyLmRhdGEsIGRlbGV0ZWRGb3JFdmVyeW9uZTogdHJ1ZSB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIHNob3VsZEN1cnJlbnRNZXNzYWdlSGlkZU1ldGFkYXRhKHRydWUsIGRlZmF1bHRDdXJyZW50LCBuZXdlcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBjdXJyZW50IG1lc3NhZ2UgaXMgdW5zZW50LCBldmVuIGlmIGl0cyBzdGF0dXMgbWF0Y2hlcyB0aGUgbmV3ZXIgb25lJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdHVzZXM6IFJlYWRvbmx5QXJyYXk8TGFzdE1lc3NhZ2VTdGF0dXM+ID0gW1xuICAgICAgICAncGF1c2VkJyxcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgJ3BhcnRpYWwtc2VudCcsXG4gICAgICAgICdzZW5kaW5nJyxcbiAgICAgIF07XG4gICAgICBmb3IgKGNvbnN0IHN0YXR1cyBvZiBzdGF0dXNlcykge1xuICAgICAgICBjb25zdCBzYW1lU3RhdHVzTmV3ZXIgPSB7XG4gICAgICAgICAgLi4uZGVmYXVsdE5ld2VyLFxuICAgICAgICAgIGRhdGE6IHsgLi4uZGVmYXVsdE5ld2VyLmRhdGEsIHN0YXR1cyB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjdXJyZW50ID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRDdXJyZW50LFxuICAgICAgICAgIGRhdGE6IHsgLi4uZGVmYXVsdEN1cnJlbnQuZGF0YSwgc3RhdHVzIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgICAgc2hvdWxkQ3VycmVudE1lc3NhZ2VIaWRlTWV0YWRhdGEodHJ1ZSwgY3VycmVudCwgZGVmYXVsdE5ld2VyKVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBzaG91bGRDdXJyZW50TWVzc2FnZUhpZGVNZXRhZGF0YSh0cnVlLCBjdXJyZW50LCBzYW1lU3RhdHVzTmV3ZXIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGFsbCBtZXNzYWdlcyBhcmUgc2VudCAoYnV0IG5vIGhpZ2hlciknLCAoKSA9PiB7XG4gICAgICBjb25zdCBuZXdlciA9IHtcbiAgICAgICAgLi4uZGVmYXVsdE5ld2VyLFxuICAgICAgICBkYXRhOiB7IC4uLmRlZmF1bHROZXdlci5kYXRhLCBzdGF0dXM6ICdzZW50JyBhcyBjb25zdCB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB7XG4gICAgICAgIC4uLmRlZmF1bHRDdXJyZW50LFxuICAgICAgICBkYXRhOiB7IC4uLmRlZmF1bHRDdXJyZW50LmRhdGEsIHN0YXR1czogJ3NlbnQnIGFzIGNvbnN0IH0sXG4gICAgICB9O1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKHNob3VsZEN1cnJlbnRNZXNzYWdlSGlkZU1ldGFkYXRhKHRydWUsIGN1cnJlbnQsIG5ld2VyKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGJvdGggaGF2ZSBkZWxpdmVyZWQgc3RhdHVzIG9yIGFib3ZlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgc2hvdWxkQ3VycmVudE1lc3NhZ2VIaWRlTWV0YWRhdGEodHJ1ZSwgZGVmYXVsdEN1cnJlbnQsIGRlZmF1bHROZXdlcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGJvdGggdGhlIGN1cnJlbnQgYW5kIG5leHQgbWVzc2FnZXMgYXJlIGRlbGV0ZWQgZm9yIGV2ZXJ5b25lJywgKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudCA9IHtcbiAgICAgICAgLi4uZGVmYXVsdEN1cnJlbnQsXG4gICAgICAgIGRhdGE6IHsgLi4uZGVmYXVsdEN1cnJlbnQuZGF0YSwgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgbmV3ZXIgPSB7XG4gICAgICAgIC4uLmRlZmF1bHROZXdlcixcbiAgICAgICAgZGF0YTogeyAuLi5kZWZhdWx0TmV3ZXIuZGF0YSwgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlIH0sXG4gICAgICB9O1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKHNob3VsZEN1cnJlbnRNZXNzYWdlSGlkZU1ldGFkYXRhKHRydWUsIGN1cnJlbnQsIG5ld2VyKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUnLCAoKSA9PiB7XG4gICAgY29uc3QgZmFrZUl0ZW1zID0gKGNvdW50OiBudW1iZXIpID0+IHRpbWVzKGNvdW50LCAoKSA9PiB1dWlkKCkpO1xuXG4gICAgY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICAgICAgaGF2ZU5ld2VzdDogdHJ1ZSxcbiAgICAgIGlzSW5jb21pbmdNZXNzYWdlUmVxdWVzdDogZmFsc2UsXG4gICAgICBpc1NvbWVvbmVUeXBpbmc6IGZhbHNlLFxuICAgICAgaXRlbXM6IGZha2VJdGVtcygxMCksXG4gICAgICBzY3JvbGxUb0luZGV4Q291bnRlcjogMCxcbiAgICB9IGFzIGNvbnN0O1xuXG4gICAgZGVzY3JpYmUoJ2R1cmluZyBpbml0aWFsIGxvYWQnLCAoKSA9PiB7XG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIG1lc3NhZ2VzIGFyZSBsb2FkaW5nIGZvciB0aGUgZmlyc3QgdGltZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJldlByb3BzID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICBoYXZlTmV3ZXN0OiBmYWxzZSxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgbWVzc2FnZUxvYWRpbmdTdGF0ZXM6IFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZS5Eb2luZ0luaXRpYWxMb2FkLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcm9wcyA9IHsgLi4ucHJldlByb3BzLCBpc1NvbWVvbmVUeXBpbmc6IHRydWUgfTtcbiAgICAgICAgY29uc3QgaXNBdEJvdHRvbSA9IHRydWU7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCBpc0F0Qm90dG9tKSxcbiAgICAgICAgICBTY3JvbGxBbmNob3IuQ2hhbmdlTm90aGluZ1xuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2Nyb2xscyB0byBhbiBpbmRleCB3aGVuIGFwcGxpY2FibGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwcm9wczEgPSBkZWZhdWx0UHJvcHM7XG4gICAgICBjb25zdCBwcm9wczIgPSB7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogMTIzLFxuICAgICAgICBzY3JvbGxUb0luZGV4Q291bnRlcjogMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBwcm9wczMgPSB7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogMTIzLFxuICAgICAgICBzY3JvbGxUb0luZGV4Q291bnRlcjogMixcbiAgICAgIH07XG4gICAgICBjb25zdCBwcm9wczQgPSB7XG4gICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgc2Nyb2xsVG9JbmRleDogNDU2LFxuICAgICAgICBzY3JvbGxUb0luZGV4Q291bnRlcjogMixcbiAgICAgIH07XG4gICAgICBjb25zdCBpc0F0Qm90dG9tID0gZmFsc2U7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByb3BzMSwgcHJvcHMyLCBpc0F0Qm90dG9tKSxcbiAgICAgICAgU2Nyb2xsQW5jaG9yLlNjcm9sbFRvSW5kZXhcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcm9wczIsIHByb3BzMywgaXNBdEJvdHRvbSksXG4gICAgICAgIFNjcm9sbEFuY2hvci5TY3JvbGxUb0luZGV4XG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUocHJvcHMzLCBwcm9wczQsIGlzQXRCb3R0b20pLFxuICAgICAgICBTY3JvbGxBbmNob3IuU2Nyb2xsVG9JbmRleFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aGVuIGluaXRpYWwgbG9hZCBjb21wbGV0ZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0UHJldlByb3BzID0ge1xuICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgIGhhdmVOZXdlc3Q6IGZhbHNlLFxuICAgICAgICBpdGVtczogW10sXG4gICAgICAgIG1lc3NhZ2VMb2FkaW5nU3RhdGU6IFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZS5Eb2luZ0luaXRpYWxMb2FkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGlzQXRCb3R0b20gPSB0cnVlO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZXJlIGFyZSBubyBpdGVtcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7IC4uLmRlZmF1bHRQcm9wcywgaXRlbXM6IFtdIH07XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShkZWZhdWx0UHJldlByb3BzLCBwcm9wcywgaXNBdEJvdHRvbSksXG4gICAgICAgICAgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2Nyb2xscyB0byB0aGUgaXRlbSBpbmRleCBpZiBhcHBsaWNhYmxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcmV2UHJvcHMgPSB7IC4uLmRlZmF1bHRQcmV2UHJvcHMsIHNjcm9sbFRvSW5kZXg6IDMgfTtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICAgIGl0ZW1zOiBmYWtlSXRlbXMoMTApLFxuICAgICAgICAgIHNjcm9sbFRvSW5kZXg6IDMsXG4gICAgICAgIH07XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCBpc0F0Qm90dG9tKSxcbiAgICAgICAgICBTY3JvbGxBbmNob3IuU2Nyb2xsVG9JbmRleFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KFwiZG9lcyBub3RoaW5nIGlmIGl0J3MgYW4gaW5jb21pbmcgbWVzc2FnZSByZXF1ZXN0XCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJldlByb3BzID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRQcmV2UHJvcHMsXG4gICAgICAgICAgaXNJbmNvbWluZ01lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgaXRlbXM6IGZha2VJdGVtcygxMCksXG4gICAgICAgICAgaXNJbmNvbWluZ01lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUocHJldlByb3BzLCBwcm9wcywgaXNBdEJvdHRvbSksXG4gICAgICAgICAgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2Nyb2xscyB0byB0aGUgdW5yZWFkIGluZGljYXRvciBpZiBvbmUgZXhpc3RzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgaXRlbXM6IGZha2VJdGVtcygxMCksXG4gICAgICAgICAgb2xkZXN0VW5zZWVuSW5kZXg6IDMsXG4gICAgICAgIH07XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShkZWZhdWx0UHJldlByb3BzLCBwcm9wcywgaXNBdEJvdHRvbSksXG4gICAgICAgICAgU2Nyb2xsQW5jaG9yLlNjcm9sbFRvVW5yZWFkSW5kaWNhdG9yXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Njcm9sbHMgdG8gdGhlIGJvdHRvbSBpbiBub3JtYWwgY2FzZXMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICBpdGVtczogZmFrZUl0ZW1zKDMpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUoZGVmYXVsdFByZXZQcm9wcywgcHJvcHMsIGlzQXRCb3R0b20pLFxuICAgICAgICAgIFNjcm9sbEFuY2hvci5TY3JvbGxUb0JvdHRvbVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2hlbiBhIHBhZ2Ugb2YgbWVzc2FnZXMgaXMgbG9hZGVkIGF0IHRoZSB0b3AnLCAoKSA9PiB7XG4gICAgICBpdCgndXNlcyBib3R0b20tYW5jaG9yZWQgc2Nyb2xsaW5nJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvbGRJdGVtcyA9IGZha2VJdGVtcyg1KTtcbiAgICAgICAgY29uc3QgcHJldlByb3BzID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICAgICAgICBtZXNzYWdlTG9hZGluZ1N0YXRlOiBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUuTG9hZGluZ09sZGVyTWVzc2FnZXMsXG4gICAgICAgICAgaXRlbXM6IG9sZEl0ZW1zLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgaXRlbXM6IFsuLi5mYWtlSXRlbXMoMTApLCAuLi5vbGRJdGVtc10sXG4gICAgICAgIH07XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCBmYWxzZSksXG4gICAgICAgICAgU2Nyb2xsQW5jaG9yLkJvdHRvbVxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJvcHMsIHRydWUpLFxuICAgICAgICAgIFNjcm9sbEFuY2hvci5Cb3R0b21cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3doZW4gYSBwYWdlIG9mIG1lc3NhZ2VzIGlzIGxvYWRlZCBhdCB0aGUgYm90dG9tJywgKCkgPT4ge1xuICAgICAgaXQoJ3VzZXMgdG9wLWFuY2hvcmVkIHNjcm9sbGluZycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2xkSXRlbXMgPSBmYWtlSXRlbXMoNSk7XG4gICAgICAgIGNvbnN0IHByZXZQcm9wcyA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgbWVzc2FnZUxvYWRpbmdTdGF0ZTogVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlLkxvYWRpbmdOZXdlck1lc3NhZ2VzLFxuICAgICAgICAgIGl0ZW1zOiBvbGRJdGVtcyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgLi4uZGVmYXVsdFByb3BzLFxuICAgICAgICAgIGl0ZW1zOiBbLi4ub2xkSXRlbXMsIC4uLmZha2VJdGVtcygxMCldLFxuICAgICAgICB9O1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUocHJldlByb3BzLCBwcm9wcywgZmFsc2UpLFxuICAgICAgICAgIFNjcm9sbEFuY2hvci5Ub3BcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCB0cnVlKSxcbiAgICAgICAgICBTY3JvbGxBbmNob3IuVG9wXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd3aGVuIGEgbmV3IG1lc3NhZ2UgY29tZXMgaW4nLCAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRJdGVtcyA9IGZha2VJdGVtcyg1KTtcbiAgICAgIGNvbnN0IHByZXZQcm9wcyA9IHsgLi4uZGVmYXVsdFByb3BzLCBpdGVtczogb2xkSXRlbXMgfTtcbiAgICAgIGNvbnN0IHByb3BzID0geyAuLi5kZWZhdWx0UHJvcHMsIGl0ZW1zOiBbLi4ub2xkSXRlbXMsIHV1aWQoKV0gfTtcblxuICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiBub3Qgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbScsICgpID0+IHtcbiAgICAgICAgY29uc3QgaXNBdEJvdHRvbSA9IGZhbHNlO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUocHJldlByb3BzLCBwcm9wcywgaXNBdEJvdHRvbSksXG4gICAgICAgICAgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc3RheXMgYXQgdGhlIGJvdHRvbSBpZiBhbHJlYWR5IHRoZXJlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gdHJ1ZTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJvcHMsIGlzQXRCb3R0b20pLFxuICAgICAgICAgIFNjcm9sbEFuY2hvci5TY3JvbGxUb0JvdHRvbVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2hlbiBpdGVtcyBhcmUgcmVtb3ZlZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZEl0ZW1zID0gZmFrZUl0ZW1zKDUpO1xuICAgICAgY29uc3QgcHJldlByb3BzID0geyAuLi5kZWZhdWx0UHJvcHMsIGl0ZW1zOiBvbGRJdGVtcyB9O1xuXG4gICAgICBjb25zdCBwcm9wc1dpdGhTb21ldGhpbmdSZW1vdmVkID0gW1xuICAgICAgICB7IC4uLmRlZmF1bHRQcm9wcywgaXRlbXM6IG9sZEl0ZW1zLnNsaWNlKDEpIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgaXRlbXM6IG9sZEl0ZW1zLmZpbHRlcigoX3ZhbHVlLCBpbmRleCkgPT4gaW5kZXggIT09IDIpLFxuICAgICAgICB9LFxuICAgICAgICB7IC4uLmRlZmF1bHRQcm9wcywgaXRlbXM6IG9sZEl0ZW1zLnNsaWNlKDAsIC0xKSB9LFxuICAgICAgXTtcblxuICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiBub3Qgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbScsICgpID0+IHtcbiAgICAgICAgY29uc3QgaXNBdEJvdHRvbSA9IGZhbHNlO1xuXG4gICAgICAgIHByb3BzV2l0aFNvbWV0aGluZ1JlbW92ZWQuZm9yRWFjaChwcm9wcyA9PiB7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJvcHMsIGlzQXRCb3R0b20pLFxuICAgICAgICAgICAgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmdcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc3RheXMgYXQgdGhlIGJvdHRvbSBpZiBhbHJlYWR5IHRoZXJlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gdHJ1ZTtcblxuICAgICAgICBwcm9wc1dpdGhTb21ldGhpbmdSZW1vdmVkLmZvckVhY2gocHJvcHMgPT4ge1xuICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCBpc0F0Qm90dG9tKSxcbiAgICAgICAgICAgIFNjcm9sbEFuY2hvci5TY3JvbGxUb0JvdHRvbVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2hlbiB0aGUgdHlwaW5nIGluZGljYXRvciBhcHBlYXJzJywgKCkgPT4ge1xuICAgICAgY29uc3QgcHJldlByb3BzID0gZGVmYXVsdFByb3BzO1xuXG4gICAgICBpdChcImRvZXMgbm90aGluZyBpZiB3ZSBkb24ndCBoYXZlIHRoZSBuZXdlc3QgbWVzc2FnZXMgKGFuZCB0aGVyZWZvcmUgc2hvdWxkbid0IHNob3cgdGhlIGluZGljYXRvcilcIiwgKCkgPT4ge1xuICAgICAgICBbdHJ1ZSwgZmFsc2VdLmZvckVhY2goaXNBdEJvdHRvbSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgICBoYXZlTmV3ZXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzU29tZW9uZVR5cGluZzogdHJ1ZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJvcHMsIGlzQXRCb3R0b20pLFxuICAgICAgICAgICAgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmdcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIG5vdCBzY3JvbGxlZCB0byB0aGUgYm90dG9tJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHsgLi4uZGVmYXVsdFByb3BzLCBpc1NvbWVvbmVUeXBpbmc6IHRydWUgfTtcbiAgICAgICAgY29uc3QgaXNBdEJvdHRvbSA9IGZhbHNlO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUocHJldlByb3BzLCBwcm9wcywgaXNBdEJvdHRvbSksXG4gICAgICAgICAgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndXNlcyBib3R0b20tYW5jaG9yZWQgc2Nyb2xsaW5nIGlmIHNjcm9sbGVkIHRvIHRoZSBib3R0b20nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb3BzID0geyAuLi5kZWZhdWx0UHJvcHMsIGlzU29tZW9uZVR5cGluZzogdHJ1ZSB9O1xuICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gdHJ1ZTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJvcHMsIGlzQXRCb3R0b20pLFxuICAgICAgICAgIFNjcm9sbEFuY2hvci5TY3JvbGxUb0JvdHRvbVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnd2hlbiB0aGUgdHlwaW5nIGluZGljYXRvciBkaXNhcHBlYXJzJywgKCkgPT4ge1xuICAgICAgY29uc3QgcHJldlByb3BzID0geyAuLi5kZWZhdWx0UHJvcHMsIGlzU29tZW9uZVR5cGluZzogdHJ1ZSB9O1xuXG4gICAgICBpdChcImRvZXMgbm90aGluZyBpZiB3ZSBkb24ndCBoYXZlIHRoZSBuZXdlc3QgbWVzc2FnZXMgKGFuZCB0aGVyZWZvcmUgc2hvdWxkbid0IHNob3cgdGhlIGluZGljYXRvcilcIiwgKCkgPT4ge1xuICAgICAgICBbdHJ1ZSwgZmFsc2VdLmZvckVhY2goaXNBdEJvdHRvbSA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0UHJvcHMsXG4gICAgICAgICAgICBoYXZlTmV3ZXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzU29tZW9uZVR5cGluZzogZmFsc2UsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCBpc0F0Qm90dG9tKSxcbiAgICAgICAgICAgIFNjcm9sbEFuY2hvci5DaGFuZ2VOb3RoaW5nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiBub3Qgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbScsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7IC4uLmRlZmF1bHRQcm9wcywgaXNTb21lb25lVHlwaW5nOiBmYWxzZSB9O1xuICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gZmFsc2U7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShwcmV2UHJvcHMsIHByb3BzLCBpc0F0Qm90dG9tKSxcbiAgICAgICAgICBTY3JvbGxBbmNob3IuQ2hhbmdlTm90aGluZ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1c2VzIGJvdHRvbS1hbmNob3JlZCBzY3JvbGxpbmcgaWYgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbScsICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7IC4uLmRlZmF1bHRQcm9wcywgaXNTb21lb25lVHlwaW5nOiBmYWxzZSB9O1xuICAgICAgICBjb25zdCBpc0F0Qm90dG9tID0gdHJ1ZTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZ2V0U2Nyb2xsQW5jaG9yQmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJvcHMsIGlzQXRCb3R0b20pLFxuICAgICAgICAgIFNjcm9sbEFuY2hvci5TY3JvbGxUb0JvdHRvbVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUdBLGtCQUF1QjtBQUN2QixvQkFBc0I7QUFDdEIsa0JBQTJCO0FBRTNCLHVCQUErQjtBQUUvQiwwQkFNTztBQUVQLFNBQVMsd0JBQXdCLE1BQU07QUFDckMsV0FBUywwQkFBMEIsTUFBTTtBQUN2QyxVQUFNLGVBQTZDO0FBQUEsTUFDakQsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osUUFBUSxFQUFFLElBQUksb0JBQUssRUFBRTtBQUFBLFFBQ3JCLFdBQVcsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxRQUFRO0FBQUEsUUFDM0QsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQ0EsVUFB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
