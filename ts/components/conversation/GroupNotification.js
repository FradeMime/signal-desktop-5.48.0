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
var GroupNotification_exports = {};
__export(GroupNotification_exports, {
  GroupNotification: () => GroupNotification
});
module.exports = __toCommonJS(GroupNotification_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_ContactName = require("./ContactName");
var import_SystemMessage = require("./SystemMessage");
var import_Intl = require("../Intl");
var import_missingCaseError = require("../../util/missingCaseError");
class GroupNotification extends import_react.default.Component {
  renderChange(change, from) {
    const { contacts, type, newName } = change;
    const { i18n } = this.props;
    const otherPeople = (0, import_lodash.compact)((contacts || []).map((contact) => {
      if (contact.isMe) {
        return null;
      }
      return /* @__PURE__ */ import_react.default.createElement("span", {
        key: `external-${contact.id}`,
        className: "module-group-notification__contact"
      }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
        title: contact.title
      }));
    }));
    const otherPeopleWithCommas = (0, import_lodash.compact)((0, import_lodash.flatten)(otherPeople.map((person, index) => [index > 0 ? ", " : null, person])));
    const contactsIncludesMe = (contacts || []).length !== otherPeople.length;
    switch (type) {
      case "name":
        return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
          i18n,
          id: "titleIsNow",
          components: [newName || ""]
        });
      case "avatar":
        return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
          i18n,
          id: "updatedGroupAvatar"
        });
      case "add":
        if (!contacts || !contacts.length) {
          throw new Error("Group update is missing contacts");
        }
        const otherPeopleNotifMsg = otherPeople.length === 1 ? "joinedTheGroup" : "multipleJoinedTheGroup";
        return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, otherPeople.length > 0 && /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
          i18n,
          id: otherPeopleNotifMsg,
          components: [otherPeopleWithCommas]
        }), contactsIncludesMe && /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-group-notification__change"
        }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
          i18n,
          id: "youJoinedTheGroup"
        })));
      case "remove":
        if (from && from.isMe) {
          return i18n("youLeftTheGroup");
        }
        if (!contacts || !contacts.length) {
          throw new Error("Group update is missing contacts");
        }
        const leftKey = contacts.length > 1 ? "multipleLeftTheGroup" : "leftTheGroup";
        return /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
          i18n,
          id: leftKey,
          components: [otherPeopleWithCommas]
        });
      case "general":
        return;
      default:
        throw (0, import_missingCaseError.missingCaseError)(type);
    }
  }
  render() {
    const { changes: rawChanges, i18n, from } = this.props;
    const changes = Array.isArray(rawChanges) ? rawChanges : [];
    const firstChange = changes[0];
    const isLeftOnly = changes.length === 1 && firstChange?.type === "remove";
    const fromLabel = from.isMe ? /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "youUpdatedTheGroup"
    }) : /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: "updatedTheGroup",
      components: [/* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
        title: from.title
      })]
    });
    let contents;
    if (isLeftOnly) {
      contents = this.renderChange(firstChange, from);
    } else {
      contents = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("p", null, fromLabel), changes.map((change, i) => /* @__PURE__ */ import_react.default.createElement("p", {
        key: i,
        className: "module-group-notification__change"
      }, this.renderChange(change, from))));
    }
    return /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
      contents,
      icon: "group"
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBOb3RpZmljYXRpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29tcGFjdCwgZmxhdHRlbiB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgeyBTeXN0ZW1NZXNzYWdlIH0gZnJvbSAnLi9TeXN0ZW1NZXNzYWdlJztcbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi9JbnRsJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBDaGFuZ2VUeXBlID0gJ2FkZCcgfCAncmVtb3ZlJyB8ICduYW1lJyB8ICdhdmF0YXInIHwgJ2dlbmVyYWwnO1xuXG50eXBlIENoYW5nZSA9IHtcbiAgdHlwZTogQ2hhbmdlVHlwZTtcbiAgbmV3TmFtZT86IHN0cmluZztcbiAgY29udGFjdHM/OiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzRGF0YSA9IHtcbiAgZnJvbTogQ29udmVyc2F0aW9uVHlwZTtcbiAgY2hhbmdlczogQXJyYXk8Q2hhbmdlPjtcbn07XG5cbnR5cGUgUHJvcHNIb3VzZWtlZXBpbmcgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY2xhc3MgR3JvdXBOb3RpZmljYXRpb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHM+IHtcbiAgcHVibGljIHJlbmRlckNoYW5nZShcbiAgICBjaGFuZ2U6IENoYW5nZSxcbiAgICBmcm9tOiBDb252ZXJzYXRpb25UeXBlXG4gICk6IEpTWC5FbGVtZW50IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgeyBjb250YWN0cywgdHlwZSwgbmV3TmFtZSB9ID0gY2hhbmdlO1xuICAgIGNvbnN0IHsgaTE4biB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IG90aGVyUGVvcGxlOiBBcnJheTxKU1guRWxlbWVudD4gPSBjb21wYWN0KFxuICAgICAgKGNvbnRhY3RzIHx8IFtdKS5tYXAoY29udGFjdCA9PiB7XG4gICAgICAgIGlmIChjb250YWN0LmlzTWUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGtleT17YGV4dGVybmFsLSR7Y29udGFjdC5pZH1gfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLW5vdGlmaWNhdGlvbl9fY29udGFjdFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPENvbnRhY3ROYW1lIHRpdGxlPXtjb250YWN0LnRpdGxlfSAvPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb25zdCBvdGhlclBlb3BsZVdpdGhDb21tYXM6IEFycmF5PEpTWC5FbGVtZW50IHwgc3RyaW5nPiA9IGNvbXBhY3QoXG4gICAgICBmbGF0dGVuKFxuICAgICAgICBvdGhlclBlb3BsZS5tYXAoKHBlcnNvbiwgaW5kZXgpID0+IFtpbmRleCA+IDAgPyAnLCAnIDogbnVsbCwgcGVyc29uXSlcbiAgICAgIClcbiAgICApO1xuICAgIGNvbnN0IGNvbnRhY3RzSW5jbHVkZXNNZSA9IChjb250YWN0cyB8fCBbXSkubGVuZ3RoICE9PSBvdGhlclBlb3BsZS5sZW5ndGg7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxJbnRsIGkxOG49e2kxOG59IGlkPVwidGl0bGVJc05vd1wiIGNvbXBvbmVudHM9e1tuZXdOYW1lIHx8ICcnXX0gLz5cbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ2F2YXRhcic6XG4gICAgICAgIHJldHVybiA8SW50bCBpMThuPXtpMThufSBpZD1cInVwZGF0ZWRHcm91cEF2YXRhclwiIC8+O1xuICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgaWYgKCFjb250YWN0cyB8fCAhY29udGFjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCB1cGRhdGUgaXMgbWlzc2luZyBjb250YWN0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgIGNvbnN0IG90aGVyUGVvcGxlTm90aWZNc2cgPVxuICAgICAgICAgIG90aGVyUGVvcGxlLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgPyAnam9pbmVkVGhlR3JvdXAnXG4gICAgICAgICAgICA6ICdtdWx0aXBsZUpvaW5lZFRoZUdyb3VwJztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7b3RoZXJQZW9wbGUubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICBpZD17b3RoZXJQZW9wbGVOb3RpZk1zZ31cbiAgICAgICAgICAgICAgICBjb21wb25lbnRzPXtbb3RoZXJQZW9wbGVXaXRoQ29tbWFzXX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7Y29udGFjdHNJbmNsdWRlc01lICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtZ3JvdXAtbm90aWZpY2F0aW9uX19jaGFuZ2VcIj5cbiAgICAgICAgICAgICAgICA8SW50bCBpMThuPXtpMThufSBpZD1cInlvdUpvaW5lZFRoZUdyb3VwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvPlxuICAgICAgICApO1xuICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgaWYgKGZyb20gJiYgZnJvbS5pc01lKSB7XG4gICAgICAgICAgcmV0dXJuIGkxOG4oJ3lvdUxlZnRUaGVHcm91cCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250YWN0cyB8fCAhY29udGFjdHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCB1cGRhdGUgaXMgbWlzc2luZyBjb250YWN0cycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgIGNvbnN0IGxlZnRLZXkgPVxuICAgICAgICAgIGNvbnRhY3RzLmxlbmd0aCA+IDEgPyAnbXVsdGlwbGVMZWZ0VGhlR3JvdXAnIDogJ2xlZnRUaGVHcm91cCc7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8SW50bCBpMThuPXtpMThufSBpZD17bGVmdEtleX0gY29tcG9uZW50cz17W290aGVyUGVvcGxlV2l0aENvbW1hc119IC8+XG4gICAgICAgICk7XG4gICAgICBjYXNlICdnZW5lcmFsJzpcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih0eXBlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7IGNoYW5nZXM6IHJhd0NoYW5nZXMsIGkxOG4sIGZyb20gfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBUaGlzIGNoZWNrIGlzIGp1c3QgdG8gYmUgZXh0cmEgY2FyZWZ1bCwgYW5kIGNhbiBwcm9iYWJseSBiZSByZW1vdmVkLlxuICAgIGNvbnN0IGNoYW5nZXM6IEFycmF5PENoYW5nZT4gPSBBcnJheS5pc0FycmF5KHJhd0NoYW5nZXMpID8gcmF3Q2hhbmdlcyA6IFtdO1xuXG4gICAgLy8gTGVhdmUgbWVzc2FnZXMgYXJlIGFsd2F5cyBmcm9tIHRoZSBwZXJzb24gbGVhdmluZywgc28gd2Ugb21pdCB0aGUgZnJvbUxhYmVsIGlmXG4gICAgLy8gICB0aGUgY2hhbmdlIGlzIGEgJ2xlYXZlLidcbiAgICBjb25zdCBmaXJzdENoYW5nZTogdW5kZWZpbmVkIHwgQ2hhbmdlID0gY2hhbmdlc1swXTtcbiAgICBjb25zdCBpc0xlZnRPbmx5ID0gY2hhbmdlcy5sZW5ndGggPT09IDEgJiYgZmlyc3RDaGFuZ2U/LnR5cGUgPT09ICdyZW1vdmUnO1xuXG4gICAgY29uc3QgZnJvbUxhYmVsID0gZnJvbS5pc01lID8gKFxuICAgICAgPEludGwgaTE4bj17aTE4bn0gaWQ9XCJ5b3VVcGRhdGVkVGhlR3JvdXBcIiAvPlxuICAgICkgOiAoXG4gICAgICA8SW50bFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpZD1cInVwZGF0ZWRUaGVHcm91cFwiXG4gICAgICAgIGNvbXBvbmVudHM9e1s8Q29udGFjdE5hbWUgdGl0bGU9e2Zyb20udGl0bGV9IC8+XX1cbiAgICAgIC8+XG4gICAgKTtcblxuICAgIGxldCBjb250ZW50czogUmVhY3ROb2RlO1xuICAgIGlmIChpc0xlZnRPbmx5KSB7XG4gICAgICBjb250ZW50cyA9IHRoaXMucmVuZGVyQ2hhbmdlKGZpcnN0Q2hhbmdlLCBmcm9tKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudHMgPSAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPHA+e2Zyb21MYWJlbH08L3A+XG4gICAgICAgICAge2NoYW5nZXMubWFwKChjaGFuZ2UsIGkpID0+IChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgIDxwIGtleT17aX0gY2xhc3NOYW1lPVwibW9kdWxlLWdyb3VwLW5vdGlmaWNhdGlvbl9fY2hhbmdlXCI+XG4gICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoYW5nZShjaGFuZ2UsIGZyb20pfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICkpfVxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDxTeXN0ZW1NZXNzYWdlIGNvbnRlbnRzPXtjb250ZW50c30gaWNvbj1cImdyb3VwXCIgLz47XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsb0JBQWlDO0FBRWpDLHlCQUE0QjtBQUM1QiwyQkFBOEI7QUFDOUIsa0JBQXFCO0FBR3JCLDhCQUFpQztBQXNCMUIsTUFBTSwwQkFBMEIscUJBQU0sVUFBaUI7QUFBQSxFQUNyRCxhQUNMLFFBQ0EsTUFDeUM7QUFDekMsVUFBTSxFQUFFLFVBQVUsTUFBTSxZQUFZO0FBQ3BDLFVBQU0sRUFBRSxTQUFTLEtBQUs7QUFFdEIsVUFBTSxjQUFrQywyQkFDckMsYUFBWSxDQUFDLEdBQUcsSUFBSSxhQUFXO0FBQzlCLFVBQUksUUFBUSxNQUFNO0FBQ2hCLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFDRSxtREFBQztBQUFBLFFBQ0MsS0FBSyxZQUFZLFFBQVE7QUFBQSxRQUN6QixXQUFVO0FBQUEsU0FFVixtREFBQztBQUFBLFFBQVksT0FBTyxR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
