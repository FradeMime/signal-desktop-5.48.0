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
var ChangeNumberNotification_exports = {};
__export(ChangeNumberNotification_exports, {
  ChangeNumberNotification: () => ChangeNumberNotification
});
module.exports = __toCommonJS(ChangeNumberNotification_exports);
var import_react = __toESM(require("react"));
var import_Intl = require("../Intl");
var import_SystemMessage = require("./SystemMessage");
var import_MessageTimestamp = require("./MessageTimestamp");
var import_Emojify = require("./Emojify");
const ChangeNumberNotification = /* @__PURE__ */ __name((props) => {
  const { i18n, sender, timestamp } = props;
  return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
    contents: /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      id: "ChangeNumber--notification",
      components: {
        sender: /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
          text: sender.title || sender.firstName
        })
      },
      i18n
    }), "\xA0\xB7\xA0", /* @__PURE__ */ import_react.default.createElement(import_MessageTimestamp.MessageTimestamp, {
      i18n,
      timestamp
    })),
    icon: "phone"
  });
}, "ChangeNumberNotification");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChangeNumberNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi4vSW50bCc7XG5cbmltcG9ydCB7IFN5c3RlbU1lc3NhZ2UgfSBmcm9tICcuL1N5c3RlbU1lc3NhZ2UnO1xuaW1wb3J0IHsgTWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4vTWVzc2FnZVRpbWVzdGFtcCc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9FbW9qaWZ5JztcblxuZXhwb3J0IHR5cGUgUHJvcHNEYXRhID0ge1xuICBzZW5kZXI6IENvbnZlcnNhdGlvblR5cGU7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNIb3VzZWtlZXBpbmcgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY29uc3QgQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uOiBSZWFjdC5GQzxQcm9wcz4gPSBwcm9wcyA9PiB7XG4gIGNvbnN0IHsgaTE4biwgc2VuZGVyLCB0aW1lc3RhbXAgfSA9IHByb3BzO1xuXG4gIHJldHVybiAoXG4gICAgPFN5c3RlbU1lc3NhZ2VcbiAgICAgIGNvbnRlbnRzPXtcbiAgICAgICAgPD5cbiAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgaWQ9XCJDaGFuZ2VOdW1iZXItLW5vdGlmaWNhdGlvblwiXG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIHNlbmRlcjogPEVtb2ppZnkgdGV4dD17c2VuZGVyLnRpdGxlIHx8IHNlbmRlci5maXJzdE5hbWV9IC8+LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgICAmbmJzcDtcdTAwQjcmbmJzcDtcbiAgICAgICAgICA8TWVzc2FnZVRpbWVzdGFtcCBpMThuPXtpMThufSB0aW1lc3RhbXA9e3RpbWVzdGFtcH0gLz5cbiAgICAgICAgPC8+XG4gICAgICB9XG4gICAgICBpY29uPVwicGhvbmVcIlxuICAgIC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUlsQixrQkFBcUI7QUFFckIsMkJBQThCO0FBQzlCLDhCQUFpQztBQUNqQyxxQkFBd0I7QUFhakIsTUFBTSwyQkFBNEMsa0NBQVM7QUFDaEUsUUFBTSxFQUFFLE1BQU0sUUFBUSxjQUFjO0FBRXBDLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFVBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxNQUNDLElBQUc7QUFBQSxNQUNILFlBQVk7QUFBQSxRQUNWLFFBQVEsbURBQUM7QUFBQSxVQUFRLE1BQU0sT0FBTyxTQUFTLE9BQU87QUFBQSxTQUFXO0FBQUEsTUFDM0Q7QUFBQSxNQUNBO0FBQUEsS0FDRixHQUFFLGdCQUVGLG1EQUFDO0FBQUEsTUFBaUI7QUFBQSxNQUFZO0FBQUEsS0FBc0IsQ0FDdEQ7QUFBQSxJQUVGLE1BQUs7QUFBQSxHQUNQO0FBRUosR0FyQnlEOyIsCiAgIm5hbWVzIjogW10KfQo=
