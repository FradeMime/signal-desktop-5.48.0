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
var AbortableProcess_exports = {};
__export(AbortableProcess_exports, {
  AbortableProcess: () => AbortableProcess
});
module.exports = __toCommonJS(AbortableProcess_exports);
var import_explodePromise = require("./explodePromise");
class AbortableProcess {
  constructor(name, controller, resultPromise) {
    this.name = name;
    this.controller = controller;
    const { promise: abortPromise, reject: abortReject } = (0, import_explodePromise.explodePromise)();
    this.abortReject = abortReject;
    this.resultPromise = Promise.race([abortPromise, resultPromise]);
  }
  abort() {
    this.controller.abort();
    this.abortReject(new Error(`Process "${this.name}" was aborted`));
  }
  getResult() {
    return this.resultPromise;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AbortableProcess
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWJvcnRhYmxlUHJvY2Vzcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cblxuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuL2V4cGxvZGVQcm9taXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlciB7XG4gIGFib3J0KCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBBYm9ydGFibGVQcm9jZXNzPFJlc3VsdD4gaW1wbGVtZW50cyBJQ29udHJvbGxlciB7XG4gIHByaXZhdGUgYWJvcnRSZWplY3Q6IChlcnJvcjogRXJyb3IpID0+IHZvaWQ7XG5cbiAgcHVibGljIHJlYWRvbmx5IHJlc3VsdFByb21pc2U6IFByb21pc2U8UmVzdWx0PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRyb2xsZXI6IElDb250cm9sbGVyLFxuICAgIHJlc3VsdFByb21pc2U6IFByb21pc2U8UmVzdWx0PlxuICApIHtcbiAgICBjb25zdCB7IHByb21pc2U6IGFib3J0UHJvbWlzZSwgcmVqZWN0OiBhYm9ydFJlamVjdCB9ID1cbiAgICAgIGV4cGxvZGVQcm9taXNlPFJlc3VsdD4oKTtcblxuICAgIHRoaXMuYWJvcnRSZWplY3QgPSBhYm9ydFJlamVjdDtcbiAgICB0aGlzLnJlc3VsdFByb21pc2UgPSBQcm9taXNlLnJhY2UoW2Fib3J0UHJvbWlzZSwgcmVzdWx0UHJvbWlzZV0pO1xuICB9XG5cbiAgcHVibGljIGFib3J0KCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbGxlci5hYm9ydCgpO1xuICAgIHRoaXMuYWJvcnRSZWplY3QobmV3IEVycm9yKGBQcm9jZXNzIFwiJHt0aGlzLm5hbWV9XCIgd2FzIGFib3J0ZWRgKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVzdWx0KCk6IFByb21pc2U8UmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0UHJvbWlzZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLDRCQUErQjtBQU14QixNQUFNLGlCQUFnRDtBQUFBLEVBSzNELFlBQ21CLE1BQ0EsWUFDakIsZUFDQTtBQUhpQjtBQUNBO0FBR2pCLFVBQU0sRUFBRSxTQUFTLGNBQWMsUUFBUSxnQkFDckMsMENBQXVCO0FBRXpCLFNBQUssY0FBYztBQUNuQixTQUFLLGdCQUFnQixRQUFRLEtBQUssQ0FBQyxjQUFjLGFBQWEsQ0FBQztBQUFBLEVBQ2pFO0FBQUEsRUFFTyxRQUFjO0FBQ25CLFNBQUssV0FBVyxNQUFNO0FBQ3RCLFNBQUssWUFBWSxJQUFJLE1BQU0sWUFBWSxLQUFLLG1CQUFtQixDQUFDO0FBQUEsRUFDbEU7QUFBQSxFQUVPLFlBQTZCO0FBQ2xDLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFDRjtBQXpCTyIsCiAgIm5hbWVzIjogW10KfQo=
