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
var TypingBubble_stories_exports = {};
__export(TypingBubble_stories_exports, {
  Direct: () => Direct,
  Group: () => Group,
  GroupWithBadge: () => GroupWithBadge,
  default: () => TypingBubble_stories_default
});
module.exports = __toCommonJS(TypingBubble_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_TypingBubble = require("./TypingBubble");
var import_Colors = require("../../types/Colors");
var import_getFakeBadge = require("../../test-both/helpers/getFakeBadge");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var TypingBubble_stories_default = {
  title: "Components/Conversation/TypingBubble"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  acceptedMessageRequest: true,
  badge: overrideProps.badge,
  isMe: false,
  i18n,
  color: (0, import_addon_knobs.select)("color", import_Colors.AvatarColors.reduce((m, c) => ({ ...m, [c]: c }), {}), overrideProps.color || import_Colors.AvatarColors[0]),
  avatarPath: (0, import_addon_knobs.text)("avatarPath", overrideProps.avatarPath || ""),
  title: "",
  profileName: (0, import_addon_knobs.text)("profileName", overrideProps.profileName || ""),
  conversationType: (0, import_addon_knobs.select)("conversationType", { group: "group", direct: "direct" }, overrideProps.conversationType || "direct"),
  sharedGroupNames: [],
  theme: import_Util.ThemeType.light
}), "createProps");
const Direct = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_TypingBubble.TypingBubble, {
    ...props
  });
}, "Direct");
const Group = /* @__PURE__ */ __name(() => {
  const props = createProps({ conversationType: "group" });
  return /* @__PURE__ */ React.createElement(import_TypingBubble.TypingBubble, {
    ...props
  });
}, "Group");
const GroupWithBadge = /* @__PURE__ */ __name(() => {
  const props = createProps({
    badge: (0, import_getFakeBadge.getFakeBadge)(),
    conversationType: "group"
  });
  return /* @__PURE__ */ React.createElement(import_TypingBubble.TypingBubble, {
    ...props
  });
}, "GroupWithBadge");
GroupWithBadge.story = {
  name: "Group (with badge)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Direct,
  Group,
  GroupWithBadge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVHlwaW5nQnViYmxlLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc2VsZWN0LCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vVHlwaW5nQnViYmxlJztcbmltcG9ydCB7IFR5cGluZ0J1YmJsZSB9IGZyb20gJy4vVHlwaW5nQnViYmxlJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBnZXRGYWtlQmFkZ2UgfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXRGYWtlQmFkZ2UnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9UeXBpbmdCdWJibGUnLFxufTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wcz4gPSB7fSk6IFByb3BzID0+ICh7XG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gIGJhZGdlOiBvdmVycmlkZVByb3BzLmJhZGdlLFxuICBpc01lOiBmYWxzZSxcbiAgaTE4bixcbiAgY29sb3I6IHNlbGVjdChcbiAgICAnY29sb3InLFxuICAgIEF2YXRhckNvbG9ycy5yZWR1Y2UoKG0sIGMpID0+ICh7IC4uLm0sIFtjXTogYyB9KSwge30pLFxuICAgIG92ZXJyaWRlUHJvcHMuY29sb3IgfHwgQXZhdGFyQ29sb3JzWzBdXG4gICksXG4gIGF2YXRhclBhdGg6IHRleHQoJ2F2YXRhclBhdGgnLCBvdmVycmlkZVByb3BzLmF2YXRhclBhdGggfHwgJycpLFxuICB0aXRsZTogJycsXG4gIHByb2ZpbGVOYW1lOiB0ZXh0KCdwcm9maWxlTmFtZScsIG92ZXJyaWRlUHJvcHMucHJvZmlsZU5hbWUgfHwgJycpLFxuICBjb252ZXJzYXRpb25UeXBlOiBzZWxlY3QoXG4gICAgJ2NvbnZlcnNhdGlvblR5cGUnLFxuICAgIHsgZ3JvdXA6ICdncm91cCcsIGRpcmVjdDogJ2RpcmVjdCcgfSxcbiAgICBvdmVycmlkZVByb3BzLmNvbnZlcnNhdGlvblR5cGUgfHwgJ2RpcmVjdCdcbiAgKSxcbiAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gIHRoZW1lOiBUaGVtZVR5cGUubGlnaHQsXG59KTtcblxuZXhwb3J0IGNvbnN0IERpcmVjdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoKTtcblxuICByZXR1cm4gPFR5cGluZ0J1YmJsZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7IGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcgfSk7XG5cbiAgcmV0dXJuIDxUeXBpbmdCdWJibGUgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cFdpdGhCYWRnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGJhZGdlOiBnZXRGYWtlQmFkZ2UoKSxcbiAgICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxuICB9KTtcblxuICByZXR1cm4gPFR5cGluZ0J1YmJsZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuR3JvdXBXaXRoQmFkZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCAod2l0aCBiYWRnZSknLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBNkI7QUFFN0IsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QiwwQkFBNkI7QUFDN0Isb0JBQTZCO0FBQzdCLDBCQUE2QjtBQUM3QixrQkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTywrQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRSx3QkFBd0I7QUFBQSxFQUN4QixPQUFPLGNBQWM7QUFBQSxFQUNyQixNQUFNO0FBQUEsRUFDTjtBQUFBLEVBQ0EsT0FBTywrQkFDTCxTQUNBLDJCQUFhLE9BQU8sQ0FBQyxHQUFHLE1BQU8sTUFBSyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUNwRCxjQUFjLFNBQVMsMkJBQWEsRUFDdEM7QUFBQSxFQUNBLFlBQVksNkJBQUssY0FBYyxjQUFjLGNBQWMsRUFBRTtBQUFBLEVBQzdELE9BQU87QUFBQSxFQUNQLGFBQWEsNkJBQUssZUFBZSxjQUFjLGVBQWUsRUFBRTtBQUFBLEVBQ2hFLGtCQUFrQiwrQkFDaEIsb0JBQ0EsRUFBRSxPQUFPLFNBQVMsUUFBUSxTQUFTLEdBQ25DLGNBQWMsb0JBQW9CLFFBQ3BDO0FBQUEsRUFDQSxrQkFBa0IsQ0FBQztBQUFBLEVBQ25CLE9BQU8sc0JBQVU7QUFDbkIsSUFwQm9CO0FBc0JiLE1BQU0sU0FBUyw2QkFBbUI7QUFDdkMsUUFBTSxRQUFRLFlBQVk7QUFFMUIsU0FBTyxvQ0FBQztBQUFBLE9BQWlCO0FBQUEsR0FBTztBQUNsQyxHQUpzQjtBQU1mLE1BQU0sUUFBUSw2QkFBbUI7QUFDdEMsUUFBTSxRQUFRLFlBQVksRUFBRSxrQkFBa0IsUUFBUSxDQUFDO0FBRXZELFNBQU8sb0NBQUM7QUFBQSxPQUFpQjtBQUFBLEdBQU87QUFDbEMsR0FKcUI7QUFNZCxNQUFNLGlCQUFpQiw2QkFBbUI7QUFDL0MsUUFBTSxRQUFRLFlBQVk7QUFBQSxJQUN4QixPQUFPLHNDQUFhO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsRUFDcEIsQ0FBQztBQUVELFNBQU8sb0NBQUM7QUFBQSxPQUFpQjtBQUFBLEdBQU87QUFDbEMsR0FQOEI7QUFTOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
