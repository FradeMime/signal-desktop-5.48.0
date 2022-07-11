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
var ConversationView_exports = {};
__export(ConversationView_exports, {
  SmartConversationView: () => SmartConversationView
});
module.exports = __toCommonJS(ConversationView_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_ConversationView = require("../../components/conversation/ConversationView");
var import_CompositionArea = require("./CompositionArea");
var import_ConversationHeader = require("./ConversationHeader");
var import_Timeline = require("./Timeline");
const mapStateToProps = /* @__PURE__ */ __name((_state, props) => {
  const { compositionAreaProps, conversationHeaderProps, timelineProps } = props;
  return {
    renderCompositionArea: () => /* @__PURE__ */ import_react.default.createElement(import_CompositionArea.SmartCompositionArea, {
      ...compositionAreaProps
    }),
    renderConversationHeader: () => /* @__PURE__ */ import_react.default.createElement(import_ConversationHeader.SmartConversationHeader, {
      ...conversationHeaderProps
    }),
    renderTimeline: () => /* @__PURE__ */ import_react.default.createElement(import_Timeline.SmartTimeline, {
      ...timelineProps
    })
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartConversationView = smart(import_ConversationView.ConversationView);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartConversationView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uVmlldy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IENvbnZlcnNhdGlvblZpZXcgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9Db252ZXJzYXRpb25WaWV3JztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgdHlwZSB7IENvbXBvc2l0aW9uQXJlYVByb3BzVHlwZSB9IGZyb20gJy4vQ29tcG9zaXRpb25BcmVhJztcbmltcG9ydCB7IFNtYXJ0Q29tcG9zaXRpb25BcmVhIH0gZnJvbSAnLi9Db21wb3NpdGlvbkFyZWEnO1xuaW1wb3J0IHR5cGUgeyBPd25Qcm9wcyBhcyBDb252ZXJzYXRpb25IZWFkZXJQcm9wc1R5cGUgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkhlYWRlcic7XG5pbXBvcnQgeyBTbWFydENvbnZlcnNhdGlvbkhlYWRlciB9IGZyb20gJy4vQ29udmVyc2F0aW9uSGVhZGVyJztcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVQcm9wc1R5cGUgfSBmcm9tICcuL1RpbWVsaW5lJztcbmltcG9ydCB7IFNtYXJ0VGltZWxpbmUgfSBmcm9tICcuL1RpbWVsaW5lJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjb21wb3NpdGlvbkFyZWFQcm9wczogUGljazxcbiAgICBDb21wb3NpdGlvbkFyZWFQcm9wc1R5cGUsXG4gICAgfCAnY2xlYXJRdW90ZWRNZXNzYWdlJ1xuICAgIHwgJ2NvbXBvc2l0aW9uQXBpJ1xuICAgIHwgJ2dldFF1b3RlZE1lc3NhZ2UnXG4gICAgfCAnaGFuZGxlQ2xpY2tRdW90ZWRNZXNzYWdlJ1xuICAgIHwgJ2lkJ1xuICAgIHwgJ29uQWNjZXB0J1xuICAgIHwgJ29uQmxvY2snXG4gICAgfCAnb25CbG9ja0FuZFJlcG9ydFNwYW0nXG4gICAgfCAnb25DYW5jZWxKb2luUmVxdWVzdCdcbiAgICB8ICdvbkNsZWFyQXR0YWNobWVudHMnXG4gICAgfCAnb25DbGlja0FkZFBhY2snXG4gICAgfCAnb25DbG9zZUxpbmtQcmV2aWV3J1xuICAgIHwgJ29uRGVsZXRlJ1xuICAgIHwgJ29uRWRpdG9yU3RhdGVDaGFuZ2UnXG4gICAgfCAnb25QaWNrU3RpY2tlcidcbiAgICB8ICdvblNlbGVjdE1lZGlhUXVhbGl0eSdcbiAgICB8ICdvblNlbmRNZXNzYWdlJ1xuICAgIHwgJ29uU3RhcnRHcm91cE1pZ3JhdGlvbidcbiAgICB8ICdvblRleHRUb29Mb25nJ1xuICAgIHwgJ29uVW5ibG9jaydcbiAgICB8ICdvcGVuQ29udmVyc2F0aW9uJ1xuICA+O1xuICBjb252ZXJzYXRpb25IZWFkZXJQcm9wczogQ29udmVyc2F0aW9uSGVhZGVyUHJvcHNUeXBlO1xuICB0aW1lbGluZVByb3BzOiBUaW1lbGluZVByb3BzVHlwZTtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChfc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IFByb3BzVHlwZSkgPT4ge1xuICBjb25zdCB7IGNvbXBvc2l0aW9uQXJlYVByb3BzLCBjb252ZXJzYXRpb25IZWFkZXJQcm9wcywgdGltZWxpbmVQcm9wcyB9ID1cbiAgICBwcm9wcztcblxuICByZXR1cm4ge1xuICAgIHJlbmRlckNvbXBvc2l0aW9uQXJlYTogKCkgPT4gKFxuICAgICAgPFNtYXJ0Q29tcG9zaXRpb25BcmVhIHsuLi5jb21wb3NpdGlvbkFyZWFQcm9wc30gLz5cbiAgICApLFxuICAgIHJlbmRlckNvbnZlcnNhdGlvbkhlYWRlcjogKCkgPT4gKFxuICAgICAgPFNtYXJ0Q29udmVyc2F0aW9uSGVhZGVyIHsuLi5jb252ZXJzYXRpb25IZWFkZXJQcm9wc30gLz5cbiAgICApLFxuICAgIHJlbmRlclRpbWVsaW5lOiAoKSA9PiA8U21hcnRUaW1lbGluZSB7Li4udGltZWxpbmVQcm9wc30gLz4sXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRDb252ZXJzYXRpb25WaWV3ID0gc21hcnQoQ29udmVyc2F0aW9uVmlldyk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMsOEJBQWlDO0FBR2pDLDZCQUFxQztBQUVyQyxnQ0FBd0M7QUFFeEMsc0JBQThCO0FBK0I5QixNQUFNLGtCQUFrQix3QkFBQyxRQUFtQixVQUFxQjtBQUMvRCxRQUFNLEVBQUUsc0JBQXNCLHlCQUF5QixrQkFDckQ7QUFFRixTQUFPO0FBQUEsSUFDTCx1QkFBdUIsTUFDckIsbURBQUM7QUFBQSxTQUF5QjtBQUFBLEtBQXNCO0FBQUEsSUFFbEQsMEJBQTBCLE1BQ3hCLG1EQUFDO0FBQUEsU0FBNEI7QUFBQSxLQUF5QjtBQUFBLElBRXhELGdCQUFnQixNQUFNLG1EQUFDO0FBQUEsU0FBa0I7QUFBQSxLQUFlO0FBQUEsRUFDMUQ7QUFDRixHQWJ3QjtBQWV4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLHdCQUF3QixNQUFNLHdDQUFnQjsiLAogICJuYW1lcyI6IFtdCn0K
