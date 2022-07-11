var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var blot_exports = {};
__export(blot_exports, {
  DirectionalBlot: () => DirectionalBlot
});
module.exports = __toCommonJS(blot_exports);
var import_quill = __toESM(require("quill"));
const Block = import_quill.default.import("blots/block");
class DirectionalBlot extends Block {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("dir", "auto");
    return node;
  }
}
DirectionalBlot.tagName = "div";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DirectionalBlot
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmxvdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFF1aWxsIGZyb20gJ3F1aWxsJztcblxuY29uc3QgQmxvY2sgPSBRdWlsbC5pbXBvcnQoJ2Jsb3RzL2Jsb2NrJyk7XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25hbEJsb3QgZXh0ZW5kcyBCbG9jayB7XG4gIHN0YXRpYyB0YWdOYW1lID0gJ2Rpdic7XG5cbiAgc3RhdGljIGNyZWF0ZSh2YWx1ZTogc3RyaW5nKTogTm9kZSB7XG4gICAgY29uc3Qgbm9kZSA9IHN1cGVyLmNyZWF0ZSh2YWx1ZSk7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RpcicsICdhdXRvJyk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsTUFBTSxRQUFRLHFCQUFNLE9BQU8sYUFBYTtBQUVqQyxNQUFNLHdCQUF3QixNQUFNO0FBQUEsU0FHbEMsT0FBTyxPQUFxQjtBQUNqQyxVQUFNLE9BQU8sTUFBTSxPQUFPLEtBQUs7QUFDL0IsU0FBSyxhQUFhLE9BQU8sTUFBTTtBQUMvQixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBUk8sQUFDRSxBQURGLGdCQUNFLFVBQVU7IiwKICAibmFtZXMiOiBbXQp9Cg==
