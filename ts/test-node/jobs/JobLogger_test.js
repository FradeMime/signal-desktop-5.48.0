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
var sinon = __toESM(require("sinon"));
var import_JobLogger = require("../../jobs/JobLogger");
describe("JobLogger", () => {
  const LEVELS = ["fatal", "error", "warn", "info", "debug", "trace"];
  const createFakeLogger = /* @__PURE__ */ __name(() => ({
    fatal: sinon.fake(),
    error: sinon.fake(),
    warn: sinon.fake(),
    info: sinon.fake(),
    debug: sinon.fake(),
    trace: sinon.fake()
  }), "createFakeLogger");
  LEVELS.forEach((level) => {
    describe(level, () => {
      it("logs its arguments with a prefix", () => {
        const fakeLogger = createFakeLogger();
        const logger = new import_JobLogger.JobLogger({ id: "abc", queueType: "test queue" }, fakeLogger);
        logger.attempt = 123;
        logger[level]("foo", 456);
        sinon.assert.calledOnce(fakeLogger[level]);
        sinon.assert.calledWith(fakeLogger[level], sinon.match((arg) => typeof arg === "string" && arg.includes("test queue") && arg.includes("abc") && arg.includes("123")), "foo", 456);
        LEVELS.filter((l) => l !== level).forEach((otherLevel) => {
          sinon.assert.notCalled(fakeLogger[otherLevel]);
        });
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSm9iTG9nZ2VyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgeyBKb2JMb2dnZXIgfSBmcm9tICcuLi8uLi9qb2JzL0pvYkxvZ2dlcic7XG5cbmRlc2NyaWJlKCdKb2JMb2dnZXInLCAoKSA9PiB7XG4gIGNvbnN0IExFVkVMUyA9IFsnZmF0YWwnLCAnZXJyb3InLCAnd2FybicsICdpbmZvJywgJ2RlYnVnJywgJ3RyYWNlJ10gYXMgY29uc3Q7XG5cbiAgY29uc3QgY3JlYXRlRmFrZUxvZ2dlciA9ICgpID0+ICh7XG4gICAgZmF0YWw6IHNpbm9uLmZha2UoKSxcbiAgICBlcnJvcjogc2lub24uZmFrZSgpLFxuICAgIHdhcm46IHNpbm9uLmZha2UoKSxcbiAgICBpbmZvOiBzaW5vbi5mYWtlKCksXG4gICAgZGVidWc6IHNpbm9uLmZha2UoKSxcbiAgICB0cmFjZTogc2lub24uZmFrZSgpLFxuICB9KTtcblxuICBMRVZFTFMuZm9yRWFjaChsZXZlbCA9PiB7XG4gICAgZGVzY3JpYmUobGV2ZWwsICgpID0+IHtcbiAgICAgIGl0KCdsb2dzIGl0cyBhcmd1bWVudHMgd2l0aCBhIHByZWZpeCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmFrZUxvZ2dlciA9IGNyZWF0ZUZha2VMb2dnZXIoKTtcblxuICAgICAgICBjb25zdCBsb2dnZXIgPSBuZXcgSm9iTG9nZ2VyKFxuICAgICAgICAgIHsgaWQ6ICdhYmMnLCBxdWV1ZVR5cGU6ICd0ZXN0IHF1ZXVlJyB9LFxuICAgICAgICAgIGZha2VMb2dnZXJcbiAgICAgICAgKTtcblxuICAgICAgICBsb2dnZXIuYXR0ZW1wdCA9IDEyMztcbiAgICAgICAgbG9nZ2VyW2xldmVsXSgnZm9vJywgNDU2KTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShmYWtlTG9nZ2VyW2xldmVsXSk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgICAgZmFrZUxvZ2dlcltsZXZlbF0sXG4gICAgICAgICAgc2lub24ubWF0Y2goXG4gICAgICAgICAgICAoYXJnOiB1bmtub3duKSA9PlxuICAgICAgICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICBhcmcuaW5jbHVkZXMoJ3Rlc3QgcXVldWUnKSAmJlxuICAgICAgICAgICAgICBhcmcuaW5jbHVkZXMoJ2FiYycpICYmXG4gICAgICAgICAgICAgIGFyZy5pbmNsdWRlcygnMTIzJylcbiAgICAgICAgICApLFxuICAgICAgICAgICdmb28nLFxuICAgICAgICAgIDQ1NlxuICAgICAgICApO1xuXG4gICAgICAgIExFVkVMUy5maWx0ZXIobCA9PiBsICE9PSBsZXZlbCkuZm9yRWFjaChvdGhlckxldmVsID0+IHtcbiAgICAgICAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGZha2VMb2dnZXJbb3RoZXJMZXZlbF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFlBQXVCO0FBRXZCLHVCQUEwQjtBQUUxQixTQUFTLGFBQWEsTUFBTTtBQUMxQixRQUFNLFNBQVMsQ0FBQyxTQUFTLFNBQVMsUUFBUSxRQUFRLFNBQVMsT0FBTztBQUVsRSxRQUFNLG1CQUFtQiw2QkFBTztBQUFBLElBQzlCLE9BQU8sTUFBTSxLQUFLO0FBQUEsSUFDbEIsT0FBTyxNQUFNLEtBQUs7QUFBQSxJQUNsQixNQUFNLE1BQU0sS0FBSztBQUFBLElBQ2pCLE1BQU0sTUFBTSxLQUFLO0FBQUEsSUFDakIsT0FBTyxNQUFNLEtBQUs7QUFBQSxJQUNsQixPQUFPLE1BQU0sS0FBSztBQUFBLEVBQ3BCLElBUHlCO0FBU3pCLFNBQU8sUUFBUSxXQUFTO0FBQ3RCLGFBQVMsT0FBTyxNQUFNO0FBQ3BCLFNBQUcsb0NBQW9DLE1BQU07QUFDM0MsY0FBTSxhQUFhLGlCQUFpQjtBQUVwQyxjQUFNLFNBQVMsSUFBSSwyQkFDakIsRUFBRSxJQUFJLE9BQU8sV0FBVyxhQUFhLEdBQ3JDLFVBQ0Y7QUFFQSxlQUFPLFVBQVU7QUFDakIsZUFBTyxPQUFPLE9BQU8sR0FBRztBQUV4QixjQUFNLE9BQU8sV0FBVyxXQUFXLE1BQU07QUFFekMsY0FBTSxPQUFPLFdBQ1gsV0FBVyxRQUNYLE1BQU0sTUFDSixDQUFDLFFBQ0MsT0FBTyxRQUFRLFlBQ2YsSUFBSSxTQUFTLFlBQVksS0FDekIsSUFBSSxTQUFTLEtBQUssS0FDbEIsSUFBSSxTQUFTLEtBQUssQ0FDdEIsR0FDQSxPQUNBLEdBQ0Y7QUFFQSxlQUFPLE9BQU8sT0FBSyxNQUFNLEtBQUssRUFBRSxRQUFRLGdCQUFjO0FBQ3BELGdCQUFNLE9BQU8sVUFBVSxXQUFXLFdBQVc7QUFBQSxRQUMvQyxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
