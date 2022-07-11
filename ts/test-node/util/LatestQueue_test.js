var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var sinon = __toESM(require("sinon"));
var import_LatestQueue = require("../../util/LatestQueue");
describe("LatestQueue", () => {
  it("if the queue is empty, new tasks are started immediately", (done) => {
    new import_LatestQueue.LatestQueue().add(async () => {
      done();
    });
  });
  it("only enqueues the latest operation", (done) => {
    const queue = new import_LatestQueue.LatestQueue();
    const spy = sinon.spy();
    let openFirstTaskGate;
    const firstTaskGate = new Promise((resolve) => {
      openFirstTaskGate = resolve;
    });
    if (!openFirstTaskGate) {
      throw new Error("Test is misconfigured; cannot grab inner resolve");
    }
    queue.add(async () => {
      await firstTaskGate;
      spy("first");
    });
    queue.add(async () => {
      spy("second");
    });
    queue.add(async () => {
      spy("third");
    });
    sinon.assert.notCalled(spy);
    openFirstTaskGate();
    queue.onceEmpty(() => {
      sinon.assert.calledTwice(spy);
      sinon.assert.calledWith(spy, "first");
      sinon.assert.calledWith(spy, "third");
      done();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGF0ZXN0UXVldWVfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB7IExhdGVzdFF1ZXVlIH0gZnJvbSAnLi4vLi4vdXRpbC9MYXRlc3RRdWV1ZSc7XG5cbmRlc2NyaWJlKCdMYXRlc3RRdWV1ZScsICgpID0+IHtcbiAgaXQoJ2lmIHRoZSBxdWV1ZSBpcyBlbXB0eSwgbmV3IHRhc2tzIGFyZSBzdGFydGVkIGltbWVkaWF0ZWx5JywgZG9uZSA9PiB7XG4gICAgbmV3IExhdGVzdFF1ZXVlKCkuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ29ubHkgZW5xdWV1ZXMgdGhlIGxhdGVzdCBvcGVyYXRpb24nLCBkb25lID0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IG5ldyBMYXRlc3RRdWV1ZSgpO1xuXG4gICAgY29uc3Qgc3B5ID0gc2lub24uc3B5KCk7XG5cbiAgICBsZXQgb3BlbkZpcnN0VGFza0dhdGU6IHVuZGVmaW5lZCB8ICgoKSA9PiB2b2lkKTtcbiAgICBjb25zdCBmaXJzdFRhc2tHYXRlID0gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICBvcGVuRmlyc3RUYXNrR2F0ZSA9IHJlc29sdmU7XG4gICAgfSk7XG4gICAgaWYgKCFvcGVuRmlyc3RUYXNrR2F0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZXN0IGlzIG1pc2NvbmZpZ3VyZWQ7IGNhbm5vdCBncmFiIGlubmVyIHJlc29sdmUnKTtcbiAgICB9XG5cbiAgICBxdWV1ZS5hZGQoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZmlyc3RUYXNrR2F0ZTtcbiAgICAgIHNweSgnZmlyc3QnKTtcbiAgICB9KTtcblxuICAgIHF1ZXVlLmFkZChhc3luYyAoKSA9PiB7XG4gICAgICBzcHkoJ3NlY29uZCcpO1xuICAgIH0pO1xuXG4gICAgcXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgIHNweSgndGhpcmQnKTtcbiAgICB9KTtcblxuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoc3B5KTtcblxuICAgIG9wZW5GaXJzdFRhc2tHYXRlKCk7XG5cbiAgICBxdWV1ZS5vbmNlRW1wdHkoKCkgPT4ge1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKHNweSk7XG4gICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChzcHksICdmaXJzdCcpO1xuICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoc3B5LCAndGhpcmQnKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsWUFBdUI7QUFFdkIseUJBQTRCO0FBRTVCLFNBQVMsZUFBZSxNQUFNO0FBQzVCLEtBQUcsNERBQTRELFVBQVE7QUFDckUsUUFBSSwrQkFBWSxFQUFFLElBQUksWUFBWTtBQUNoQyxXQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsS0FBRyxzQ0FBc0MsVUFBUTtBQUMvQyxVQUFNLFFBQVEsSUFBSSwrQkFBWTtBQUU5QixVQUFNLE1BQU0sTUFBTSxJQUFJO0FBRXRCLFFBQUk7QUFDSixVQUFNLGdCQUFnQixJQUFJLFFBQWMsYUFBVztBQUNqRCwwQkFBb0I7QUFBQSxJQUN0QixDQUFDO0FBQ0QsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixZQUFNLElBQUksTUFBTSxrREFBa0Q7QUFBQSxJQUNwRTtBQUVBLFVBQU0sSUFBSSxZQUFZO0FBQ3BCLFlBQU07QUFDTixVQUFJLE9BQU87QUFBQSxJQUNiLENBQUM7QUFFRCxVQUFNLElBQUksWUFBWTtBQUNwQixVQUFJLFFBQVE7QUFBQSxJQUNkLENBQUM7QUFFRCxVQUFNLElBQUksWUFBWTtBQUNwQixVQUFJLE9BQU87QUFBQSxJQUNiLENBQUM7QUFFRCxVQUFNLE9BQU8sVUFBVSxHQUFHO0FBRTFCLHNCQUFrQjtBQUVsQixVQUFNLFVBQVUsTUFBTTtBQUNwQixZQUFNLE9BQU8sWUFBWSxHQUFHO0FBQzVCLFlBQU0sT0FBTyxXQUFXLEtBQUssT0FBTztBQUNwQyxZQUFNLE9BQU8sV0FBVyxLQUFLLE9BQU87QUFFcEMsV0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
