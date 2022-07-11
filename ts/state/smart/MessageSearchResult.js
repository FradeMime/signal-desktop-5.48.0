var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var MessageSearchResult_exports = {};
__export(MessageSearchResult_exports, {
  SmartMessageSearchResult: () => SmartMessageSearchResult
});
module.exports = __toCommonJS(MessageSearchResult_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_MessageSearchResult = require("../../components/conversationList/MessageSearchResult");
var import_badges = require("../selectors/badges");
var import_user = require("../selectors/user");
var import_search = require("../selectors/search");
function mapStateToProps(state, ourProps) {
  const { id, style } = ourProps;
  const props = (0, import_search.getMessageSearchResultSelector)(state)(id);
  if (!props) {
    throw new Error("SmartMessageSearchResult: no message was found");
  }
  return {
    ...props,
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    i18n: (0, import_user.getIntl)(state),
    style,
    theme: (0, import_user.getTheme)(state)
  };
}
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartMessageSearchResult = smart(import_MessageSearchResult.MessageSearchResult);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartMessageSearchResult
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVNlYXJjaFJlc3VsdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENTU1Byb3BlcnRpZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5cbmltcG9ydCB7IE1lc3NhZ2VTZWFyY2hSZXN1bHQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbkxpc3QvTWVzc2FnZVNlYXJjaFJlc3VsdCc7XG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRUaGVtZSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldE1lc3NhZ2VTZWFyY2hSZXN1bHRTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9zZWFyY2gnO1xuXG50eXBlIFNtYXJ0UHJvcHMgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHN0eWxlPzogQ1NTUHJvcGVydGllcztcbn07XG5cbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZTogU3RhdGVUeXBlLCBvdXJQcm9wczogU21hcnRQcm9wcykge1xuICBjb25zdCB7IGlkLCBzdHlsZSB9ID0gb3VyUHJvcHM7XG5cbiAgY29uc3QgcHJvcHMgPSBnZXRNZXNzYWdlU2VhcmNoUmVzdWx0U2VsZWN0b3Ioc3RhdGUpKGlkKTtcbiAgaWYgKCFwcm9wcykge1xuICAgIHRocm93IG5ldyBFcnJvcignU21hcnRNZXNzYWdlU2VhcmNoUmVzdWx0OiBubyBtZXNzYWdlIHdhcyBmb3VuZCcpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICBnZXRQcmVmZXJyZWRCYWRnZTogZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSksXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgc3R5bGUsXG4gICAgdGhlbWU6IGdldFRoZW1lKHN0YXRlKSxcbiAgfTtcbn1cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydE1lc3NhZ2VTZWFyY2hSZXN1bHQgPSBzbWFydChNZXNzYWdlU2VhcmNoUmVzdWx0KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSx5QkFBd0I7QUFFeEIscUJBQW1DO0FBR25DLGlDQUFvQztBQUNwQyxvQkFBMEM7QUFDMUMsa0JBQWtDO0FBQ2xDLG9CQUErQztBQU8vQyx5QkFBeUIsT0FBa0IsVUFBc0I7QUFDL0QsUUFBTSxFQUFFLElBQUksVUFBVTtBQUV0QixRQUFNLFFBQVEsa0RBQStCLEtBQUssRUFBRSxFQUFFO0FBQ3RELE1BQUksQ0FBQyxPQUFPO0FBQ1YsVUFBTSxJQUFJLE1BQU0sZ0RBQWdEO0FBQUEsRUFDbEU7QUFFQSxTQUFPO0FBQUEsT0FDRjtBQUFBLElBQ0gsbUJBQW1CLDZDQUEwQixLQUFLO0FBQUEsSUFDbEQsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkI7QUFBQSxJQUNBLE9BQU8sMEJBQVMsS0FBSztBQUFBLEVBQ3ZCO0FBQ0Y7QUFmUyxBQWdCVCxNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLDJCQUEyQixNQUFNLDhDQUFtQjsiLAogICJuYW1lcyI6IFtdCn0K
