var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_audioPlayer = require("../../../state/ducks/audioPlayer");
var import_noop = require("../../../state/ducks/noop");
var import_audioPlayer2 = require("../../../state/selectors/audioPlayer");
var import_reducer = require("../../../state/reducer");
describe("state/selectors/audioPlayer", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => {
    return (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)());
  }, "getEmptyRootState");
  describe("isPaused", () => {
    it("returns true if state.audioPlayer.activeAudioID is undefined", () => {
      const state = getEmptyRootState();
      import_chai.assert.isTrue((0, import_audioPlayer2.isPaused)(state));
    });
    it("returns false if state.audioPlayer.activeAudioID is not undefined", () => {
      const state = getEmptyRootState();
      const updated = (0, import_reducer.reducer)(state, import_audioPlayer.actions.setActiveAudioID("id", "context"));
      import_chai.assert.isFalse((0, import_audioPlayer2.isPaused)(updated));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9QbGF5ZXJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IGFjdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9hdWRpb1BsYXllcic7XG5pbXBvcnQgeyBub29wQWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3Mvbm9vcCc7XG5pbXBvcnQgeyBpc1BhdXNlZCB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3NlbGVjdG9ycy9hdWRpb1BsYXllcic7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyByb290UmVkdWNlciB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuXG5kZXNjcmliZSgnc3RhdGUvc2VsZWN0b3JzL2F1ZGlvUGxheWVyJywgKCkgPT4ge1xuICBjb25zdCBnZXRFbXB0eVJvb3RTdGF0ZSA9ICgpOiBTdGF0ZVR5cGUgPT4ge1xuICAgIHJldHVybiByb290UmVkdWNlcih1bmRlZmluZWQsIG5vb3BBY3Rpb24oKSk7XG4gIH07XG5cbiAgZGVzY3JpYmUoJ2lzUGF1c2VkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgc3RhdGUuYXVkaW9QbGF5ZXIuYWN0aXZlQXVkaW9JRCBpcyB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5Um9vdFN0YXRlKCk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzUGF1c2VkKHN0YXRlKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiBzdGF0ZS5hdWRpb1BsYXllci5hY3RpdmVBdWRpb0lEIGlzIG5vdCB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5Um9vdFN0YXRlKCk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSByb290UmVkdWNlcihcbiAgICAgICAgc3RhdGUsXG4gICAgICAgIGFjdGlvbnMuc2V0QWN0aXZlQXVkaW9JRCgnaWQnLCAnY29udGV4dCcpXG4gICAgICApO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1BhdXNlZCh1cGRhdGVkKSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUdBLGtCQUF1QjtBQUN2Qix5QkFBd0I7QUFDeEIsa0JBQTJCO0FBQzNCLDBCQUF5QjtBQUV6QixxQkFBdUM7QUFFdkMsU0FBUywrQkFBK0IsTUFBTTtBQUM1QyxRQUFNLG9CQUFvQiw2QkFBaUI7QUFDekMsV0FBTyw0QkFBWSxRQUFXLDRCQUFXLENBQUM7QUFBQSxFQUM1QyxHQUYwQjtBQUkxQixXQUFTLFlBQVksTUFBTTtBQUN6QixPQUFHLGdFQUFnRSxNQUFNO0FBQ3ZFLFlBQU0sUUFBUSxrQkFBa0I7QUFDaEMseUJBQU8sT0FBTyxrQ0FBUyxLQUFLLENBQUM7QUFBQSxJQUMvQixDQUFDO0FBRUQsT0FBRyxxRUFBcUUsTUFBTTtBQUM1RSxZQUFNLFFBQVEsa0JBQWtCO0FBRWhDLFlBQU0sVUFBVSw0QkFDZCxPQUNBLDJCQUFRLGlCQUFpQixNQUFNLFNBQVMsQ0FDMUM7QUFFQSx5QkFBTyxRQUFRLGtDQUFTLE9BQU8sQ0FBQztBQUFBLElBQ2xDLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
