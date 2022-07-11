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
var ScrollDownButton_stories_exports = {};
__export(ScrollDownButton_stories_exports, {
  Default: () => Default,
  default: () => ScrollDownButton_stories_default
});
module.exports = __toCommonJS(ScrollDownButton_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_ScrollDownButton = require("./ScrollDownButton");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  i18n,
  scrollDown: (0, import_addon_actions.action)("scrollDown"),
  conversationId: "fake-conversation-id",
  ...overrideProps
}), "createProps");
var ScrollDownButton_stories_default = {
  title: "Components/Conversation/ScrollDownButton",
  component: import_ScrollDownButton.ScrollDownButton,
  argTypes: {
    unreadCount: {
      control: { type: "radio" },
      options: {
        None: void 0,
        Some: 5,
        Plenty: 85,
        "Please Stop": 1e3
      }
    }
  }
};
const Template = /* @__PURE__ */ __name((args) => /* @__PURE__ */ React.createElement(import_ScrollDownButton.ScrollDownButton, {
  ...args
}), "Template");
const Default = Template.bind({});
Default.args = createProps({});
Default.story = {
  name: "Default"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2Nyb2xsRG93bkJ1dHRvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IE1ldGEsIFN0b3J5IH0gZnJvbSAnQHN0b3J5Ym9vay9yZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL1Njcm9sbERvd25CdXR0b24nO1xuaW1wb3J0IHsgU2Nyb2xsRG93bkJ1dHRvbiB9IGZyb20gJy4vU2Nyb2xsRG93bkJ1dHRvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBpMThuLFxuICBzY3JvbGxEb3duOiBhY3Rpb24oJ3Njcm9sbERvd24nKSxcbiAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gIC4uLm92ZXJyaWRlUHJvcHMsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1Njcm9sbERvd25CdXR0b24nLFxuICBjb21wb25lbnQ6IFNjcm9sbERvd25CdXR0b24sXG4gIGFyZ1R5cGVzOiB7XG4gICAgdW5yZWFkQ291bnQ6IHtcbiAgICAgIGNvbnRyb2w6IHsgdHlwZTogJ3JhZGlvJyB9LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBOb25lOiB1bmRlZmluZWQsXG4gICAgICAgIFNvbWU6IDUsXG4gICAgICAgIFBsZW50eTogODUsXG4gICAgICAgICdQbGVhc2UgU3RvcCc6IDEwMDAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59IGFzIE1ldGE7XG5cbmNvbnN0IFRlbXBsYXRlOiBTdG9yeTxQcm9wcz4gPSBhcmdzID0+IDxTY3JvbGxEb3duQnV0dG9uIHsuLi5hcmdzfSAvPjtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSBUZW1wbGF0ZS5iaW5kKHt9KTtcbkRlZmF1bHQuYXJncyA9IGNyZWF0ZVByb3BzKHt9KTtcbkRlZmF1bHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdEZWZhdWx0Jyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2Qiw4QkFBaUM7QUFFakMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxjQUFjLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUNsRTtBQUFBLEVBQ0EsWUFBWSxpQ0FBTyxZQUFZO0FBQUEsRUFDL0IsZ0JBQWdCO0FBQUEsS0FDYjtBQUNMLElBTG9CO0FBT3BCLElBQU8sbUNBQVE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFdBQVc7QUFBQSxFQUNYLFVBQVU7QUFBQSxJQUNSLGFBQWE7QUFBQSxNQUNYLFNBQVMsRUFBRSxNQUFNLFFBQVE7QUFBQSxNQUN6QixTQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsTUFBTSxXQUF5QixpQ0FBUSxvQ0FBQztBQUFBLEtBQXFCO0FBQUEsQ0FBTSxHQUFwQztBQUV4QixNQUFNLFVBQVUsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUN2QyxRQUFRLE9BQU8sWUFBWSxDQUFDLENBQUM7QUFDN0IsUUFBUSxRQUFRO0FBQUEsRUFDZCxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
