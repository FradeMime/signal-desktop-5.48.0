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
var MessageBodyReadMore_exports = {};
__export(MessageBodyReadMore_exports, {
  MessageBodyReadMore: () => MessageBodyReadMore,
  doesMessageBodyOverflow: () => doesMessageBodyOverflow
});
module.exports = __toCommonJS(MessageBodyReadMore_exports);
var import_react = __toESM(require("react"));
var import_MessageBody = require("./MessageBody");
var import_graphemeAwareSlice = require("../../util/graphemeAwareSlice");
const INITIAL_LENGTH = 800;
const INCREMENT_COUNT = 3e3;
const BUFFER = 100;
function doesMessageBodyOverflow(str) {
  return str.length > INITIAL_LENGTH + BUFFER;
}
function MessageBodyReadMore({
  bodyRanges,
  direction,
  disableLinks,
  displayLimit,
  i18n,
  id,
  messageExpanded,
  openConversation,
  kickOffBodyDownload,
  text,
  textAttachment
}) {
  const maxLength = displayLimit || INITIAL_LENGTH;
  const { hasReadMore, text: slicedText } = (0, import_graphemeAwareSlice.graphemeAwareSlice)(text, maxLength, BUFFER);
  const onIncreaseTextLength = hasReadMore ? () => {
    messageExpanded(id, maxLength + INCREMENT_COUNT);
  } : void 0;
  return /* @__PURE__ */ import_react.default.createElement(import_MessageBody.MessageBody, {
    bodyRanges,
    disableLinks,
    direction,
    i18n,
    onIncreaseTextLength,
    openConversation,
    kickOffBodyDownload,
    text: slicedText,
    textAttachment
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageBodyReadMore,
  doesMessageBodyOverflow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZUJvZHlSZWFkTW9yZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIE1lc3NhZ2VCb2R5UHJvcHNUeXBlIH0gZnJvbSAnLi9NZXNzYWdlQm9keSc7XG5pbXBvcnQgeyBNZXNzYWdlQm9keSB9IGZyb20gJy4vTWVzc2FnZUJvZHknO1xuaW1wb3J0IHsgZ3JhcGhlbWVBd2FyZVNsaWNlIH0gZnJvbSAnLi4vLi4vdXRpbC9ncmFwaGVtZUF3YXJlU2xpY2UnO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFBpY2s8XG4gIE1lc3NhZ2VCb2R5UHJvcHNUeXBlLFxuICB8ICdkaXJlY3Rpb24nXG4gIHwgJ3RleHQnXG4gIHwgJ3RleHRBdHRhY2htZW50J1xuICB8ICdkaXNhYmxlTGlua3MnXG4gIHwgJ2kxOG4nXG4gIHwgJ2JvZHlSYW5nZXMnXG4gIHwgJ29wZW5Db252ZXJzYXRpb24nXG4gIHwgJ2tpY2tPZmZCb2R5RG93bmxvYWQnXG4+ICYge1xuICBpZDogc3RyaW5nO1xuICBkaXNwbGF5TGltaXQ/OiBudW1iZXI7XG4gIG1lc3NhZ2VFeHBhbmRlZDogKGlkOiBzdHJpbmcsIGRpc3BsYXlMaW1pdDogbnVtYmVyKSA9PiB1bmtub3duO1xufTtcblxuY29uc3QgSU5JVElBTF9MRU5HVEggPSA4MDA7XG5jb25zdCBJTkNSRU1FTlRfQ09VTlQgPSAzMDAwO1xuY29uc3QgQlVGRkVSID0gMTAwO1xuXG5leHBvcnQgZnVuY3Rpb24gZG9lc01lc3NhZ2VCb2R5T3ZlcmZsb3coc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIHN0ci5sZW5ndGggPiBJTklUSUFMX0xFTkdUSCArIEJVRkZFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1lc3NhZ2VCb2R5UmVhZE1vcmUoe1xuICBib2R5UmFuZ2VzLFxuICBkaXJlY3Rpb24sXG4gIGRpc2FibGVMaW5rcyxcbiAgZGlzcGxheUxpbWl0LFxuICBpMThuLFxuICBpZCxcbiAgbWVzc2FnZUV4cGFuZGVkLFxuICBvcGVuQ29udmVyc2F0aW9uLFxuICBraWNrT2ZmQm9keURvd25sb2FkLFxuICB0ZXh0LFxuICB0ZXh0QXR0YWNobWVudCxcbn06IFByb3BzKTogSlNYLkVsZW1lbnQge1xuICBjb25zdCBtYXhMZW5ndGggPSBkaXNwbGF5TGltaXQgfHwgSU5JVElBTF9MRU5HVEg7XG5cbiAgY29uc3QgeyBoYXNSZWFkTW9yZSwgdGV4dDogc2xpY2VkVGV4dCB9ID0gZ3JhcGhlbWVBd2FyZVNsaWNlKFxuICAgIHRleHQsXG4gICAgbWF4TGVuZ3RoLFxuICAgIEJVRkZFUlxuICApO1xuXG4gIGNvbnN0IG9uSW5jcmVhc2VUZXh0TGVuZ3RoID0gaGFzUmVhZE1vcmVcbiAgICA/ICgpID0+IHtcbiAgICAgICAgbWVzc2FnZUV4cGFuZGVkKGlkLCBtYXhMZW5ndGggKyBJTkNSRU1FTlRfQ09VTlQpO1xuICAgICAgfVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiAoXG4gICAgPE1lc3NhZ2VCb2R5XG4gICAgICBib2R5UmFuZ2VzPXtib2R5UmFuZ2VzfVxuICAgICAgZGlzYWJsZUxpbmtzPXtkaXNhYmxlTGlua3N9XG4gICAgICBkaXJlY3Rpb249e2RpcmVjdGlvbn1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkluY3JlYXNlVGV4dExlbmd0aD17b25JbmNyZWFzZVRleHRMZW5ndGh9XG4gICAgICBvcGVuQ29udmVyc2F0aW9uPXtvcGVuQ29udmVyc2F0aW9ufVxuICAgICAga2lja09mZkJvZHlEb3dubG9hZD17a2lja09mZkJvZHlEb3dubG9hZH1cbiAgICAgIHRleHQ9e3NsaWNlZFRleHR9XG4gICAgICB0ZXh0QXR0YWNobWVudD17dGV4dEF0dGFjaG1lbnR9XG4gICAgLz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUdsQix5QkFBNEI7QUFDNUIsZ0NBQW1DO0FBa0JuQyxNQUFNLGlCQUFpQjtBQUN2QixNQUFNLGtCQUFrQjtBQUN4QixNQUFNLFNBQVM7QUFFUixpQ0FBaUMsS0FBc0I7QUFDNUQsU0FBTyxJQUFJLFNBQVMsaUJBQWlCO0FBQ3ZDO0FBRmdCLEFBSVQsNkJBQTZCO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FDcUI7QUFDckIsUUFBTSxZQUFZLGdCQUFnQjtBQUVsQyxRQUFNLEVBQUUsYUFBYSxNQUFNLGVBQWUsa0RBQ3hDLE1BQ0EsV0FDQSxNQUNGO0FBRUEsUUFBTSx1QkFBdUIsY0FDekIsTUFBTTtBQUNKLG9CQUFnQixJQUFJLFlBQVksZUFBZTtBQUFBLEVBQ2pELElBQ0E7QUFFSixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ047QUFBQSxHQUNGO0FBRUo7QUF4Q2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
