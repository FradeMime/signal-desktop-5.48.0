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
var ProfileChangeNotification_stories_exports = {};
__export(ProfileChangeNotification_stories_exports, {
  FromContact: () => FromContact,
  FromContactWithLongNamesBeforeAndAfter: () => FromContactWithLongNamesBeforeAndAfter,
  FromNonContact: () => FromNonContact,
  default: () => ProfileChangeNotification_stories_default
});
module.exports = __toCommonJS(ProfileChangeNotification_stories_exports);
var React = __toESM(require("react"));
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_ProfileChangeNotification = require("./ProfileChangeNotification");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ProfileChangeNotification_stories_default = {
  title: "Components/Conversation/ProfileChangeNotification"
};
const FromContact = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ProfileChangeNotification.ProfileChangeNotification, {
    i18n,
    changedContact: (0, import_getDefaultConversation.getDefaultConversation)({
      id: "some-guid",
      type: "direct",
      title: "Mr. Fire \u{1F525}",
      name: "Mr. Fire \u{1F525}"
    }),
    change: {
      type: "name",
      oldName: "Mr. Fire \u{1F525} Old",
      newName: "Mr. Fire \u{1F525} New"
    }
  });
}, "FromContact");
FromContact.story = {
  name: "From contact"
};
const FromNonContact = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ProfileChangeNotification.ProfileChangeNotification, {
    i18n,
    changedContact: (0, import_getDefaultConversation.getDefaultConversation)({
      id: "some-guid",
      type: "direct",
      title: "Mr. Fire \u{1F525}"
    }),
    change: {
      type: "name",
      oldName: "Mr. Fire \u{1F525} Old",
      newName: "Mr. Fire \u{1F525} New"
    }
  });
}, "FromNonContact");
FromNonContact.story = {
  name: "From non-contact"
};
const FromContactWithLongNamesBeforeAndAfter = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ProfileChangeNotification.ProfileChangeNotification, {
    i18n,
    changedContact: (0, import_getDefaultConversation.getDefaultConversation)({
      id: "some-guid",
      type: "direct",
      title: "Mr. Fire \u{1F525}"
    }),
    change: {
      type: "name",
      oldName: "\u{1F485}\u{1F937}\u{1F3FD}\u200D\u2640\uFE0F\u{1F3EF}".repeat(50),
      newName: "\u260E\uFE0F\u{1F389}\u{1F3DD}".repeat(50)
    }
  });
}, "FromContactWithLongNamesBeforeAndAfter");
FromContactWithLongNamesBeforeAndAfter.story = {
  name: "From contact with long names before and after"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FromContact,
  FromContactWithLongNamesBeforeAndAfter,
  FromNonContact
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9Qcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1Byb2ZpbGVDaGFuZ2VOb3RpZmljYXRpb24nLFxufTtcblxuZXhwb3J0IGNvbnN0IEZyb21Db250YWN0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8UHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvblxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIGNoYW5nZWRDb250YWN0PXtnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaWQ6ICdzb21lLWd1aWQnLFxuICAgICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgICAgdGl0bGU6ICdNci4gRmlyZSBcdUQ4M0RcdUREMjUnLFxuICAgICAgICBuYW1lOiAnTXIuIEZpcmUgXHVEODNEXHVERDI1JyxcbiAgICAgIH0pfVxuICAgICAgY2hhbmdlPXt7XG4gICAgICAgIHR5cGU6ICduYW1lJyxcbiAgICAgICAgb2xkTmFtZTogJ01yLiBGaXJlIFx1RDgzRFx1REQyNSBPbGQnLFxuICAgICAgICBuZXdOYW1lOiAnTXIuIEZpcmUgXHVEODNEXHVERDI1IE5ldycsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59O1xuXG5Gcm9tQ29udGFjdC5zdG9yeSA9IHtcbiAgbmFtZTogJ0Zyb20gY29udGFjdCcsXG59O1xuXG5leHBvcnQgY29uc3QgRnJvbU5vbkNvbnRhY3QgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uXG4gICAgICBpMThuPXtpMThufVxuICAgICAgY2hhbmdlZENvbnRhY3Q9e2dldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBpZDogJ3NvbWUtZ3VpZCcsXG4gICAgICAgIHR5cGU6ICdkaXJlY3QnLFxuICAgICAgICB0aXRsZTogJ01yLiBGaXJlIFx1RDgzRFx1REQyNScsXG4gICAgICB9KX1cbiAgICAgIGNoYW5nZT17e1xuICAgICAgICB0eXBlOiAnbmFtZScsXG4gICAgICAgIG9sZE5hbWU6ICdNci4gRmlyZSBcdUQ4M0RcdUREMjUgT2xkJyxcbiAgICAgICAgbmV3TmFtZTogJ01yLiBGaXJlIFx1RDgzRFx1REQyNSBOZXcnLFxuICAgICAgfX1cbiAgICAvPlxuICApO1xufTtcblxuRnJvbU5vbkNvbnRhY3Quc3RvcnkgPSB7XG4gIG5hbWU6ICdGcm9tIG5vbi1jb250YWN0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBGcm9tQ29udGFjdFdpdGhMb25nTmFtZXNCZWZvcmVBbmRBZnRlciA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPFByb2ZpbGVDaGFuZ2VOb3RpZmljYXRpb25cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBjaGFuZ2VkQ29udGFjdD17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIGlkOiAnc29tZS1ndWlkJyxcbiAgICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICAgIHRpdGxlOiAnTXIuIEZpcmUgXHVEODNEXHVERDI1JyxcbiAgICAgIH0pfVxuICAgICAgY2hhbmdlPXt7XG4gICAgICAgIHR5cGU6ICduYW1lJyxcbiAgICAgICAgb2xkTmFtZTogJ1x1RDgzRFx1REM4NVx1RDgzRVx1REQzN1x1RDgzQ1x1REZGRFx1MjAwRFx1MjY0MFx1RkUwRlx1RDgzQ1x1REZFRicucmVwZWF0KDUwKSxcbiAgICAgICAgbmV3TmFtZTogJ1x1MjYwRVx1RkUwRlx1RDgzQ1x1REY4OVx1RDgzQ1x1REZERCcucmVwZWF0KDUwKSxcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn07XG5cbkZyb21Db250YWN0V2l0aExvbmdOYW1lc0JlZm9yZUFuZEFmdGVyLnN0b3J5ID0ge1xuICBuYW1lOiAnRnJvbSBjb250YWN0IHdpdGggbG9uZyBuYW1lcyBiZWZvcmUgYW5kIGFmdGVyJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsb0NBQXVDO0FBQ3ZDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsdUNBQTBDO0FBRTFDLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sNENBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sY0FBYyw2QkFBbUI7QUFDNUMsU0FDRSxvQ0FBQztBQUFBLElBQ0M7QUFBQSxJQUNBLGdCQUFnQiwwREFBdUI7QUFBQSxNQUNyQyxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUEsSUFDWDtBQUFBLEdBQ0Y7QUFFSixHQWpCMkI7QUFtQjNCLFlBQVksUUFBUTtBQUFBLEVBQ2xCLE1BQU07QUFDUjtBQUVPLE1BQU0saUJBQWlCLDZCQUFtQjtBQUMvQyxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsZ0JBQWdCLDBEQUF1QjtBQUFBLE1BQ3JDLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNULENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxJQUNYO0FBQUEsR0FDRjtBQUVKLEdBaEI4QjtBQWtCOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSO0FBRU8sTUFBTSx5Q0FBeUMsNkJBQW1CO0FBQ3ZFLFNBQ0Usb0NBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxnQkFBZ0IsMERBQXVCO0FBQUEsTUFDckMsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1QsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sU0FBUyx5REFBYyxPQUFPLEVBQUU7QUFBQSxNQUNoQyxTQUFTLGlDQUFTLE9BQU8sRUFBRTtBQUFBLElBQzdCO0FBQUEsR0FDRjtBQUVKLEdBaEJzRDtBQWtCdEQsdUNBQXVDLFFBQVE7QUFBQSxFQUM3QyxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
