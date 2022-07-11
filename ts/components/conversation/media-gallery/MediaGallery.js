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
var MediaGallery_exports = {};
__export(MediaGallery_exports, {
  MediaGallery: () => MediaGallery
});
module.exports = __toCommonJS(MediaGallery_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_moment = __toESM(require("moment"));
var import_AttachmentSection = require("./AttachmentSection");
var import_EmptyState = require("./EmptyState");
var import_groupMediaItemsByDate = require("./groupMediaItemsByDate");
var import_missingCaseError = require("../../../util/missingCaseError");
var import_getMessageTimestamp = require("../../../util/getMessageTimestamp");
const MONTH_FORMAT = "MMMM YYYY";
const Tab = /* @__PURE__ */ __name(({
  isSelected,
  label,
  onSelect,
  type
}) => {
  const handleClick = onSelect ? () => {
    onSelect({ type });
  } : void 0;
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-media-gallery__tab", isSelected ? "module-media-gallery__tab--active" : null),
    onClick: handleClick,
    role: "tab",
    tabIndex: 0
  }, label);
}, "Tab");
class MediaGallery extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.focusRef = import_react.default.createRef();
    this.handleTabSelect = /* @__PURE__ */ __name((event) => {
      this.setState({ selectedTab: event.type });
    }, "handleTabSelect");
    this.state = {
      selectedTab: "media"
    };
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.focusRef.current) {
        this.focusRef.current.focus();
      }
    });
  }
  render() {
    const { i18n } = this.props;
    const { selectedTab } = this.state;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-media-gallery",
      tabIndex: -1,
      ref: this.focusRef
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-media-gallery__tab-container"
    }, /* @__PURE__ */ import_react.default.createElement(Tab, {
      label: i18n("media"),
      type: "media",
      isSelected: selectedTab === "media",
      onSelect: this.handleTabSelect
    }), /* @__PURE__ */ import_react.default.createElement(Tab, {
      label: i18n("documents"),
      type: "documents",
      isSelected: selectedTab === "documents",
      onSelect: this.handleTabSelect
    })), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-media-gallery__content"
    }, this.renderSections()));
  }
  renderSections() {
    const { i18n, media, documents, onItemClick } = this.props;
    const { selectedTab } = this.state;
    const mediaItems = selectedTab === "media" ? media : documents;
    const type = selectedTab;
    if (!mediaItems || mediaItems.length === 0) {
      const label = (() => {
        switch (type) {
          case "media":
            return i18n("mediaEmptyState");
          case "documents":
            return i18n("documentsEmptyState");
          default:
            throw (0, import_missingCaseError.missingCaseError)(type);
        }
      })();
      return /* @__PURE__ */ import_react.default.createElement(import_EmptyState.EmptyState, {
        "data-test": "EmptyState",
        label
      });
    }
    const now = Date.now();
    const sections = (0, import_groupMediaItemsByDate.groupMediaItemsByDate)(now, mediaItems).map((section) => {
      const first = section.mediaItems[0];
      const { message } = first;
      const date = (0, import_moment.default)((0, import_getMessageTimestamp.getMessageTimestamp)(message));
      const header = section.type === "yearMonth" ? date.format(MONTH_FORMAT) : i18n(section.type);
      return /* @__PURE__ */ import_react.default.createElement(import_AttachmentSection.AttachmentSection, {
        key: header,
        header,
        i18n,
        type,
        mediaItems: section.mediaItems,
        onItemClick
      });
    });
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-media-gallery__sections"
    }, sections);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaGallery
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFHYWxsZXJ5LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBBdHRhY2htZW50U2VjdGlvbiB9IGZyb20gJy4vQXR0YWNobWVudFNlY3Rpb24nO1xuaW1wb3J0IHsgRW1wdHlTdGF0ZSB9IGZyb20gJy4vRW1wdHlTdGF0ZSc7XG5pbXBvcnQgeyBncm91cE1lZGlhSXRlbXNCeURhdGUgfSBmcm9tICcuL2dyb3VwTWVkaWFJdGVtc0J5RGF0ZSc7XG5pbXBvcnQgdHlwZSB7IEl0ZW1DbGlja0V2ZW50IH0gZnJvbSAnLi90eXBlcy9JdGVtQ2xpY2tFdmVudCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgZ2V0TWVzc2FnZVRpbWVzdGFtcCB9IGZyb20gJy4uLy4uLy4uL3V0aWwvZ2V0TWVzc2FnZVRpbWVzdGFtcCc7XG5cbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBkb2N1bWVudHM6IEFycmF5PE1lZGlhSXRlbVR5cGU+O1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtZWRpYTogQXJyYXk8TWVkaWFJdGVtVHlwZT47XG5cbiAgb25JdGVtQ2xpY2s/OiAoZXZlbnQ6IEl0ZW1DbGlja0V2ZW50KSA9PiB2b2lkO1xufTtcblxudHlwZSBTdGF0ZSA9IHtcbiAgc2VsZWN0ZWRUYWI6ICdtZWRpYScgfCAnZG9jdW1lbnRzJztcbn07XG5cbmNvbnN0IE1PTlRIX0ZPUk1BVCA9ICdNTU1NIFlZWVknO1xuXG50eXBlIFRhYlNlbGVjdEV2ZW50ID0ge1xuICB0eXBlOiAnbWVkaWEnIHwgJ2RvY3VtZW50cyc7XG59O1xuXG5jb25zdCBUYWIgPSAoe1xuICBpc1NlbGVjdGVkLFxuICBsYWJlbCxcbiAgb25TZWxlY3QsXG4gIHR5cGUsXG59OiB7XG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9uU2VsZWN0PzogKGV2ZW50OiBUYWJTZWxlY3RFdmVudCkgPT4gdm9pZDtcbiAgdHlwZTogJ21lZGlhJyB8ICdkb2N1bWVudHMnO1xufSkgPT4ge1xuICBjb25zdCBoYW5kbGVDbGljayA9IG9uU2VsZWN0XG4gICAgPyAoKSA9PiB7XG4gICAgICAgIG9uU2VsZWN0KHsgdHlwZSB9KTtcbiAgICAgIH1cbiAgICA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gKFxuICAgIC8vIEhhcyBrZXkgZXZlbnRzIGhhbmRsZWQgZWxzZXdoZXJlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHNcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdtb2R1bGUtbWVkaWEtZ2FsbGVyeV9fdGFiJyxcbiAgICAgICAgaXNTZWxlY3RlZCA/ICdtb2R1bGUtbWVkaWEtZ2FsbGVyeV9fdGFiLS1hY3RpdmUnIDogbnVsbFxuICAgICAgKX1cbiAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgICAgcm9sZT1cInRhYlwiXG4gICAgICB0YWJJbmRleD17MH1cbiAgICA+XG4gICAgICB7bGFiZWx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY2xhc3MgTWVkaWFHYWxsZXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzLCBTdGF0ZT4ge1xuICBwdWJsaWMgcmVhZG9ubHkgZm9jdXNSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD4gPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkVGFiOiAnbWVkaWEnLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50RGlkTW91bnQoKTogdm9pZCB7XG4gICAgLy8gV2hlbiB0aGlzIGNvbXBvbmVudCBpcyBjcmVhdGVkLCBpdCdzIGluaXRpYWxseSBub3QgcGFydCBvZiB0aGUgRE9NLCBhbmQgdGhlbiBpdCdzXG4gICAgLy8gICBhZGRlZCBvZmYtc2NyZWVuIGFuZCBhbmltYXRlZCBpbi4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIGZvY3VzIHRha2VzLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZm9jdXNSZWYuY3VycmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzUmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvdmVycmlkZSByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHsgaTE4biB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkVGFiIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lZGlhLWdhbGxlcnlcIiB0YWJJbmRleD17LTF9IHJlZj17dGhpcy5mb2N1c1JlZn0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lZGlhLWdhbGxlcnlfX3RhYi1jb250YWluZXJcIj5cbiAgICAgICAgICA8VGFiXG4gICAgICAgICAgICBsYWJlbD17aTE4bignbWVkaWEnKX1cbiAgICAgICAgICAgIHR5cGU9XCJtZWRpYVwiXG4gICAgICAgICAgICBpc1NlbGVjdGVkPXtzZWxlY3RlZFRhYiA9PT0gJ21lZGlhJ31cbiAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLmhhbmRsZVRhYlNlbGVjdH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUYWJcbiAgICAgICAgICAgIGxhYmVsPXtpMThuKCdkb2N1bWVudHMnKX1cbiAgICAgICAgICAgIHR5cGU9XCJkb2N1bWVudHNcIlxuICAgICAgICAgICAgaXNTZWxlY3RlZD17c2VsZWN0ZWRUYWIgPT09ICdkb2N1bWVudHMnfVxuICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuaGFuZGxlVGFiU2VsZWN0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZWRpYS1nYWxsZXJ5X19jb250ZW50XCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyU2VjdGlvbnMoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBoYW5kbGVUYWJTZWxlY3QgPSAoZXZlbnQ6IFRhYlNlbGVjdEV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkVGFiOiBldmVudC50eXBlIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgcmVuZGVyU2VjdGlvbnMoKSB7XG4gICAgY29uc3QgeyBpMThuLCBtZWRpYSwgZG9jdW1lbnRzLCBvbkl0ZW1DbGljayB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHNlbGVjdGVkVGFiIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgbWVkaWFJdGVtcyA9IHNlbGVjdGVkVGFiID09PSAnbWVkaWEnID8gbWVkaWEgOiBkb2N1bWVudHM7XG4gICAgY29uc3QgdHlwZSA9IHNlbGVjdGVkVGFiO1xuXG4gICAgaWYgKCFtZWRpYUl0ZW1zIHx8IG1lZGlhSXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBsYWJlbCA9ICgoKSA9PiB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgJ21lZGlhJzpcbiAgICAgICAgICAgIHJldHVybiBpMThuKCdtZWRpYUVtcHR5U3RhdGUnKTtcblxuICAgICAgICAgIGNhc2UgJ2RvY3VtZW50cyc6XG4gICAgICAgICAgICByZXR1cm4gaTE4bignZG9jdW1lbnRzRW1wdHlTdGF0ZScpO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0pKCk7XG5cbiAgICAgIHJldHVybiA8RW1wdHlTdGF0ZSBkYXRhLXRlc3Q9XCJFbXB0eVN0YXRlXCIgbGFiZWw9e2xhYmVsfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHNlY3Rpb25zID0gZ3JvdXBNZWRpYUl0ZW1zQnlEYXRlKG5vdywgbWVkaWFJdGVtcykubWFwKHNlY3Rpb24gPT4ge1xuICAgICAgY29uc3QgZmlyc3QgPSBzZWN0aW9uLm1lZGlhSXRlbXNbMF07XG4gICAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IGZpcnN0O1xuICAgICAgY29uc3QgZGF0ZSA9IG1vbWVudChnZXRNZXNzYWdlVGltZXN0YW1wKG1lc3NhZ2UpKTtcbiAgICAgIGNvbnN0IGhlYWRlciA9XG4gICAgICAgIHNlY3Rpb24udHlwZSA9PT0gJ3llYXJNb250aCdcbiAgICAgICAgICA/IGRhdGUuZm9ybWF0KE1PTlRIX0ZPUk1BVClcbiAgICAgICAgICA6IGkxOG4oc2VjdGlvbi50eXBlKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEF0dGFjaG1lbnRTZWN0aW9uXG4gICAgICAgICAga2V5PXtoZWFkZXJ9XG4gICAgICAgICAgaGVhZGVyPXtoZWFkZXJ9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICB0eXBlPXt0eXBlfVxuICAgICAgICAgIG1lZGlhSXRlbXM9e3NlY3Rpb24ubWVkaWFJdGVtc31cbiAgICAgICAgICBvbkl0ZW1DbGljaz17b25JdGVtQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lZGlhLWdhbGxlcnlfX3NlY3Rpb25zXCI+e3NlY3Rpb25zfTwvZGl2PjtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFFdkIsb0JBQW1CO0FBRW5CLCtCQUFrQztBQUNsQyx3QkFBMkI7QUFDM0IsbUNBQXNDO0FBRXRDLDhCQUFpQztBQUVqQyxpQ0FBb0M7QUFnQnBDLE1BQU0sZUFBZTtBQU1yQixNQUFNLE1BQU0sd0JBQUM7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFNSTtBQUNKLFFBQU0sY0FBYyxXQUNoQixNQUFNO0FBQ0osYUFBUyxFQUFFLEtBQUssQ0FBQztBQUFBLEVBQ25CLElBQ0E7QUFFSixTQUdFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULDZCQUNBLGFBQWEsc0NBQXNDLElBQ3JEO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVCxNQUFLO0FBQUEsSUFDTCxVQUFVO0FBQUEsS0FFVCxLQUNIO0FBRUosR0FoQ1k7QUFrQ0wsTUFBTSxxQkFBcUIscUJBQU0sVUFBd0I7QUFBQSxFQUc5RCxZQUFZLE9BQWM7QUFDeEIsVUFBTSxLQUFLO0FBSEcsb0JBQTRDLHFCQUFNLFVBQVU7QUE4QzNELDJCQUFrQix3QkFBQyxVQUFnQztBQUNsRSxXQUFLLFNBQVMsRUFBRSxhQUFhLE1BQU0sS0FBSyxDQUFDO0FBQUEsSUFDM0MsR0FGbUM7QUExQ2pDLFNBQUssUUFBUTtBQUFBLE1BQ1gsYUFBYTtBQUFBLElBQ2Y7QUFBQSxFQUNGO0FBQUEsRUFFZ0Isb0JBQTBCO0FBR3hDLGVBQVcsTUFBTTtBQUNmLFVBQUksS0FBSyxTQUFTLFNBQVM7QUFDekIsYUFBSyxTQUFTLFFBQVEsTUFBTTtBQUFBLE1BQzlCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRWdCLFNBQXNCO0FBQ3BDLFVBQU0sRUFBRSxTQUFTLEtBQUs7QUFDdEIsVUFBTSxFQUFFLGdCQUFnQixLQUFLO0FBRTdCLFdBQ0UsbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxNQUF1QixVQUFVO0FBQUEsTUFBSSxLQUFLLEtBQUs7QUFBQSxPQUM1RCxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ2IsbURBQUM7QUFBQSxNQUNDLE9BQU8sS0FBSyxPQUFPO0FBQUEsTUFDbkIsTUFBSztBQUFBLE1BQ0wsWUFBWSxnQkFBZ0I7QUFBQSxNQUM1QixVQUFVLEtBQUs7QUFBQSxLQUNqQixHQUNBLG1EQUFDO0FBQUEsTUFDQyxPQUFPLEtBQUssV0FBVztBQUFBLE1BQ3ZCLE1BQUs7QUFBQSxNQUNMLFlBQVksZ0JBQWdCO0FBQUEsTUFDNUIsVUFBVSxLQUFLO0FBQUEsS0FDakIsQ0FDRixHQUNBLG1EQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FDWixLQUFLLGVBQWUsQ0FDdkIsQ0FDRjtBQUFBLEVBRUo7QUFBQSxFQU1RLGlCQUFpQjtBQUN2QixVQUFNLEVBQUUsTUFBTSxPQUFPLFdBQVcsZ0JBQWdCLEtBQUs7QUFDckQsVUFBTSxFQUFFLGdCQUFnQixLQUFLO0FBRTdCLFVBQU0sYUFBYSxnQkFBZ0IsVUFBVSxRQUFRO0FBQ3JELFVBQU0sT0FBTztBQUViLFFBQUksQ0FBQyxjQUFjLFdBQVcsV0FBVyxHQUFHO0FBQzFDLFlBQU0sUUFBUyxPQUFNO0FBQ25CLGdCQUFRO0FBQUEsZUFDRDtBQUNILG1CQUFPLEtBQUssaUJBQWlCO0FBQUEsZUFFMUI7QUFDSCxtQkFBTyxLQUFLLHFCQUFxQjtBQUFBO0FBR2pDLGtCQUFNLDhDQUFpQixJQUFJO0FBQUE7QUFBQSxNQUVqQyxHQUFHO0FBRUgsYUFBTyxtREFBQztBQUFBLFFBQVcsYUFBVTtBQUFBLFFBQWE7QUFBQSxPQUFjO0FBQUEsSUFDMUQ7QUFFQSxVQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFVBQU0sV0FBVyx3REFBc0IsS0FBSyxVQUFVLEVBQUUsSUFBSSxhQUFXO0FBQ3JFLFlBQU0sUUFBUSxRQUFRLFdBQVc7QUFDakMsWUFBTSxFQUFFLFlBQVk7QUFDcEIsWUFBTSxPQUFPLDJCQUFPLG9EQUFvQixPQUFPLENBQUM7QUFDaEQsWUFBTSxTQUNKLFFBQVEsU0FBUyxjQUNiLEtBQUssT0FBTyxZQUFZLElBQ3hCLEtBQUssUUFBUSxJQUFJO0FBRXZCLGFBQ0UsbURBQUM7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFlBQVksUUFBUTtBQUFBLFFBQ3BCO0FBQUEsT0FDRjtBQUFBLElBRUosQ0FBQztBQUVELFdBQU8sbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxPQUFrQyxRQUFTO0FBQUEsRUFDbkU7QUFDRjtBQW5HTyIsCiAgIm5hbWVzIjogW10KfQo=
