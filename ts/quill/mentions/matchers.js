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
var matchers_exports = {};
__export(matchers_exports, {
  matchMention: () => matchMention
});
module.exports = __toCommonJS(matchers_exports);
var import_quill_delta = __toESM(require("quill-delta"));
const matchMention = /* @__PURE__ */ __name((memberRepositoryRef) => (node, delta) => {
  const memberRepository = memberRepositoryRef.current;
  if (memberRepository) {
    const { title } = node.dataset;
    if (node.classList.contains("MessageBody__at-mention")) {
      const { id } = node.dataset;
      const conversation = memberRepository.getMemberById(id);
      if (conversation && conversation.uuid) {
        return new import_quill_delta.default().insert({
          mention: {
            title,
            uuid: conversation.uuid
          }
        });
      }
      return new import_quill_delta.default().insert(`@${title}`);
    }
    if (node.classList.contains("mention-blot")) {
      const { uuid } = node.dataset;
      const conversation = memberRepository.getMemberByUuid(uuid);
      if (conversation && conversation.uuid) {
        return new import_quill_delta.default().insert({
          mention: {
            title: title || conversation.title,
            uuid: conversation.uuid
          }
        });
      }
      return new import_quill_delta.default().insert(`@${title}`);
    }
  }
  return delta;
}, "matchMention");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  matchMention
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWF0Y2hlcnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IERlbHRhIGZyb20gJ3F1aWxsLWRlbHRhJztcbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBNZW1iZXJSZXBvc2l0b3J5IH0gZnJvbSAnLi4vbWVtYmVyUmVwb3NpdG9yeSc7XG5cbmV4cG9ydCBjb25zdCBtYXRjaE1lbnRpb24gPVxuICAobWVtYmVyUmVwb3NpdG9yeVJlZjogUmVmT2JqZWN0PE1lbWJlclJlcG9zaXRvcnk+KSA9PlxuICAobm9kZTogSFRNTEVsZW1lbnQsIGRlbHRhOiBEZWx0YSk6IERlbHRhID0+IHtcbiAgICBjb25zdCBtZW1iZXJSZXBvc2l0b3J5ID0gbWVtYmVyUmVwb3NpdG9yeVJlZi5jdXJyZW50O1xuXG4gICAgaWYgKG1lbWJlclJlcG9zaXRvcnkpIHtcbiAgICAgIGNvbnN0IHsgdGl0bGUgfSA9IG5vZGUuZGF0YXNldDtcblxuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdNZXNzYWdlQm9keV9fYXQtbWVudGlvbicpKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IG5vZGUuZGF0YXNldDtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gbWVtYmVyUmVwb3NpdG9yeS5nZXRNZW1iZXJCeUlkKGlkKTtcblxuICAgICAgICBpZiAoY29udmVyc2F0aW9uICYmIGNvbnZlcnNhdGlvbi51dWlkKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBEZWx0YSgpLmluc2VydCh7XG4gICAgICAgICAgICBtZW50aW9uOiB7XG4gICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICB1dWlkOiBjb252ZXJzYXRpb24udXVpZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERlbHRhKCkuaW5zZXJ0KGBAJHt0aXRsZX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW50aW9uLWJsb3QnKSkge1xuICAgICAgICBjb25zdCB7IHV1aWQgfSA9IG5vZGUuZGF0YXNldDtcbiAgICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gbWVtYmVyUmVwb3NpdG9yeS5nZXRNZW1iZXJCeVV1aWQodXVpZCk7XG5cbiAgICAgICAgaWYgKGNvbnZlcnNhdGlvbiAmJiBjb252ZXJzYXRpb24udXVpZCkge1xuICAgICAgICAgIHJldHVybiBuZXcgRGVsdGEoKS5pbnNlcnQoe1xuICAgICAgICAgICAgbWVudGlvbjoge1xuICAgICAgICAgICAgICB0aXRsZTogdGl0bGUgfHwgY29udmVyc2F0aW9uLnRpdGxlLFxuICAgICAgICAgICAgICB1dWlkOiBjb252ZXJzYXRpb24udXVpZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IERlbHRhKCkuaW5zZXJ0KGBAJHt0aXRsZX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsdGE7XG4gIH07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQWtCO0FBSVgsTUFBTSxlQUNYLHdCQUFDLHdCQUNELENBQUMsTUFBbUIsVUFBd0I7QUFDMUMsUUFBTSxtQkFBbUIsb0JBQW9CO0FBRTdDLE1BQUksa0JBQWtCO0FBQ3BCLFVBQU0sRUFBRSxVQUFVLEtBQUs7QUFFdkIsUUFBSSxLQUFLLFVBQVUsU0FBUyx5QkFBeUIsR0FBRztBQUN0RCxZQUFNLEVBQUUsT0FBTyxLQUFLO0FBQ3BCLFlBQU0sZUFBZSxpQkFBaUIsY0FBYyxFQUFFO0FBRXRELFVBQUksZ0JBQWdCLGFBQWEsTUFBTTtBQUNyQyxlQUFPLElBQUksMkJBQU0sRUFBRSxPQUFPO0FBQUEsVUFDeEIsU0FBUztBQUFBLFlBQ1A7QUFBQSxZQUNBLE1BQU0sYUFBYTtBQUFBLFVBQ3JCO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLGFBQU8sSUFBSSwyQkFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPO0FBQUEsSUFDdkM7QUFFQSxRQUFJLEtBQUssVUFBVSxTQUFTLGNBQWMsR0FBRztBQUMzQyxZQUFNLEVBQUUsU0FBUyxLQUFLO0FBQ3RCLFlBQU0sZUFBZSxpQkFBaUIsZ0JBQWdCLElBQUk7QUFFMUQsVUFBSSxnQkFBZ0IsYUFBYSxNQUFNO0FBQ3JDLGVBQU8sSUFBSSwyQkFBTSxFQUFFLE9BQU87QUFBQSxVQUN4QixTQUFTO0FBQUEsWUFDUCxPQUFPLFNBQVMsYUFBYTtBQUFBLFlBQzdCLE1BQU0sYUFBYTtBQUFBLFVBQ3JCO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLGFBQU8sSUFBSSwyQkFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNULEdBekNBOyIsCiAgIm5hbWVzIjogW10KfQo=
