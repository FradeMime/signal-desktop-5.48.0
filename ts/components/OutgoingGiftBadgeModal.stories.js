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
var OutgoingGiftBadgeModal_stories_exports = {};
__export(OutgoingGiftBadgeModal_stories_exports, {
  MissingBadge: () => MissingBadge,
  Normal: () => Normal,
  default: () => OutgoingGiftBadgeModal_stories_default
});
module.exports = __toCommonJS(OutgoingGiftBadgeModal_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_OutgoingGiftBadgeModal = require("./OutgoingGiftBadgeModal");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_BadgeCategory = require("../badges/BadgeCategory");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getPreferredBadge = /* @__PURE__ */ __name(() => ({
  category: import_BadgeCategory.BadgeCategory.Donor,
  descriptionTemplate: "This is a description of the badge",
  id: "BOOST-3",
  images: [
    {
      transparent: {
        localPath: "/fixtures/orange-heart.svg",
        url: "http://someplace"
      }
    }
  ],
  name: "heart"
}), "getPreferredBadge");
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  recipientTitle: (0, import_addon_knobs.text)("recipientTitle", overrideProps.recipientTitle || "Default Name"),
  badgeId: (0, import_addon_knobs.text)("badgeId", overrideProps.badgeId || "heart"),
  getPreferredBadge,
  hideOutgoingGiftBadgeModal: (0, import_addon_actions.action)("hideOutgoingGiftBadgeModal"),
  i18n
}), "createProps");
var OutgoingGiftBadgeModal_stories_default = {
  title: "Components/OutgoingGiftBadgeModal"
};
const Normal = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_OutgoingGiftBadgeModal.OutgoingGiftBadgeModal, {
    ...createProps()
  });
}, "Normal");
const MissingBadge = /* @__PURE__ */ __name(() => {
  const props = {
    ...createProps(),
    getPreferredBadge: () => void 0
  };
  return /* @__PURE__ */ React.createElement(import_OutgoingGiftBadgeModal.OutgoingGiftBadgeModal, {
    ...props
  });
}, "MissingBadge");
MissingBadge.story = {
  name: "Missing badge"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MissingBadge,
  Normal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiT3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vT3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbCc7XG5pbXBvcnQgeyBPdXRnb2luZ0dpZnRCYWRnZU1vZGFsIH0gZnJvbSAnLi9PdXRnb2luZ0dpZnRCYWRnZU1vZGFsJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBCYWRnZUNhdGVnb3J5IH0gZnJvbSAnLi4vYmFkZ2VzL0JhZGdlQ2F0ZWdvcnknO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBnZXRQcmVmZXJyZWRCYWRnZSA9ICgpID0+ICh7XG4gIGNhdGVnb3J5OiBCYWRnZUNhdGVnb3J5LkRvbm9yLFxuICBkZXNjcmlwdGlvblRlbXBsYXRlOiAnVGhpcyBpcyBhIGRlc2NyaXB0aW9uIG9mIHRoZSBiYWRnZScsXG4gIGlkOiAnQk9PU1QtMycsXG4gIGltYWdlczogW1xuICAgIHtcbiAgICAgIHRyYW5zcGFyZW50OiB7XG4gICAgICAgIGxvY2FsUGF0aDogJy9maXh0dXJlcy9vcmFuZ2UtaGVhcnQuc3ZnJyxcbiAgICAgICAgdXJsOiAnaHR0cDovL3NvbWVwbGFjZScsXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIG5hbWU6ICdoZWFydCcsXG59KTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAob3ZlcnJpZGVQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgcmVjaXBpZW50VGl0bGU6IHRleHQoXG4gICAgJ3JlY2lwaWVudFRpdGxlJyxcbiAgICBvdmVycmlkZVByb3BzLnJlY2lwaWVudFRpdGxlIHx8ICdEZWZhdWx0IE5hbWUnXG4gICksXG4gIGJhZGdlSWQ6IHRleHQoJ2JhZGdlSWQnLCBvdmVycmlkZVByb3BzLmJhZGdlSWQgfHwgJ2hlYXJ0JyksXG4gIGdldFByZWZlcnJlZEJhZGdlLFxuICBoaWRlT3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbDogYWN0aW9uKCdoaWRlT3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbCcpLFxuICBpMThuLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL091dGdvaW5nR2lmdEJhZGdlTW9kYWwnLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vcm1hbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiA8T3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbCB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTWlzc2luZ0JhZGdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4uY3JlYXRlUHJvcHMoKSxcbiAgICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICB9O1xuXG4gIHJldHVybiA8T3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuTWlzc2luZ0JhZGdlLnN0b3J5ID0ge1xuICBuYW1lOiAnTWlzc2luZyBiYWRnZScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFDckIsMkJBQXVCO0FBR3ZCLG9DQUF1QztBQUV2Qyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLDJCQUE4QjtBQUU5QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLG9CQUFvQiw2QkFBTztBQUFBLEVBQy9CLFVBQVUsbUNBQWM7QUFBQSxFQUN4QixxQkFBcUI7QUFBQSxFQUNyQixJQUFJO0FBQUEsRUFDSixRQUFRO0FBQUEsSUFDTjtBQUFBLE1BQ0UsYUFBYTtBQUFBLFFBQ1gsV0FBVztBQUFBLFFBQ1gsS0FBSztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUNSLElBYjBCO0FBZTFCLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLGdCQUFnQiw2QkFDZCxrQkFDQSxjQUFjLGtCQUFrQixjQUNsQztBQUFBLEVBQ0EsU0FBUyw2QkFBSyxXQUFXLGNBQWMsV0FBVyxPQUFPO0FBQUEsRUFDekQ7QUFBQSxFQUNBLDRCQUE0QixpQ0FBTyw0QkFBNEI7QUFBQSxFQUMvRDtBQUNGLElBVG9CO0FBV3BCLElBQU8seUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sU0FBUyw2QkFBbUI7QUFDdkMsU0FBTyxvQ0FBQztBQUFBLE9BQTJCLFlBQVk7QUFBQSxHQUFHO0FBQ3BELEdBRnNCO0FBSWYsTUFBTSxlQUFlLDZCQUFtQjtBQUM3QyxRQUFNLFFBQVE7QUFBQSxPQUNULFlBQVk7QUFBQSxJQUNmLG1CQUFtQixNQUFNO0FBQUEsRUFDM0I7QUFFQSxTQUFPLG9DQUFDO0FBQUEsT0FBMkI7QUFBQSxHQUFPO0FBQzVDLEdBUDRCO0FBUzVCLGFBQWEsUUFBUTtBQUFBLEVBQ25CLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
