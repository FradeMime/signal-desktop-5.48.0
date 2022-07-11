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
var WhatsNewModal_exports = {};
__export(WhatsNewModal_exports, {
  WhatsNewModal: () => WhatsNewModal
});
module.exports = __toCommonJS(WhatsNewModal_exports);
var import_react = __toESM(require("react"));
var import_moment = __toESM(require("moment"));
var import_Modal = require("./Modal");
var import_Intl = require("./Intl");
var import_Emojify = require("./conversation/Emojify");
const renderText = /* @__PURE__ */ __name(({ key, text }) => /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
  key,
  text
}), "renderText");
const releaseNotes = {
  date: new Date(window.getBuildCreation?.() || Date.now()),
  version: window.getVersion?.(),
  features: [
    {
      key: "WhatsNew__bugfixes",
      components: void 0
    }
  ]
};
const WhatsNewModal = /* @__PURE__ */ __name(({
  i18n,
  hideWhatsNewModal
}) => {
  let contentNode;
  if (releaseNotes.features.length === 1) {
    const { key, components } = releaseNotes.features[0];
    contentNode = /* @__PURE__ */ import_react.default.createElement("p", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: key,
      renderText,
      components
    }));
  } else {
    contentNode = /* @__PURE__ */ import_react.default.createElement("ul", null, releaseNotes.features.map(({ key, components }) => /* @__PURE__ */ import_react.default.createElement("li", {
      key
    }, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      i18n,
      id: key,
      renderText,
      components
    }))));
  }
  return /* @__PURE__ */ import_react.default.createElement(import_Modal.Modal, {
    hasXButton: true,
    i18n,
    onClose: hideWhatsNewModal,
    title: i18n("WhatsNew__modal-title")
  }, /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", null, (0, import_moment.default)(releaseNotes.date).format("LL"), " \xB7", " ", releaseNotes.version), contentNode));
}, "WhatsNewModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhatsNewModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiV2hhdHNOZXdNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Q2hpbGQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vTW9kYWwnO1xuaW1wb3J0IHR5cGUgeyBJbnRsQ29tcG9uZW50c1R5cGUgfSBmcm9tICcuL0ludGwnO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4vSW50bCc7XG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vRW1vamlmeSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFJlbmRlclRleHRDYWxsYmFja1R5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBoaWRlV2hhdHNOZXdNb2RhbDogKCkgPT4gdW5rbm93bjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbnR5cGUgUmVsZWFzZU5vdGVzVHlwZSA9IHtcbiAgZGF0ZTogRGF0ZTtcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBmZWF0dXJlczogQXJyYXk8eyBrZXk6IHN0cmluZzsgY29tcG9uZW50czogSW50bENvbXBvbmVudHNUeXBlIH0+O1xufTtcblxuY29uc3QgcmVuZGVyVGV4dDogUmVuZGVyVGV4dENhbGxiYWNrVHlwZSA9ICh7IGtleSwgdGV4dCB9KSA9PiAoXG4gIDxFbW9qaWZ5IGtleT17a2V5fSB0ZXh0PXt0ZXh0fSAvPlxuKTtcblxuY29uc3QgcmVsZWFzZU5vdGVzOiBSZWxlYXNlTm90ZXNUeXBlID0ge1xuICBkYXRlOiBuZXcgRGF0ZSh3aW5kb3cuZ2V0QnVpbGRDcmVhdGlvbj8uKCkgfHwgRGF0ZS5ub3coKSksXG4gIHZlcnNpb246IHdpbmRvdy5nZXRWZXJzaW9uPy4oKSxcbiAgZmVhdHVyZXM6IFtcbiAgICB7XG4gICAgICBrZXk6ICdXaGF0c05ld19fYnVnZml4ZXMnLFxuICAgICAgY29tcG9uZW50czogdW5kZWZpbmVkLFxuICAgIH0sXG4gIF0sXG59O1xuXG5leHBvcnQgY29uc3QgV2hhdHNOZXdNb2RhbCA9ICh7XG4gIGkxOG4sXG4gIGhpZGVXaGF0c05ld01vZGFsLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBsZXQgY29udGVudE5vZGU6IFJlYWN0Q2hpbGQ7XG5cbiAgaWYgKHJlbGVhc2VOb3Rlcy5mZWF0dXJlcy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCB7IGtleSwgY29tcG9uZW50cyB9ID0gcmVsZWFzZU5vdGVzLmZlYXR1cmVzWzBdO1xuICAgIGNvbnRlbnROb2RlID0gKFxuICAgICAgPHA+XG4gICAgICAgIDxJbnRsXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpZD17a2V5fVxuICAgICAgICAgIHJlbmRlclRleHQ9e3JlbmRlclRleHR9XG4gICAgICAgICAgY29tcG9uZW50cz17Y29tcG9uZW50c31cbiAgICAgICAgLz5cbiAgICAgIDwvcD5cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvbnRlbnROb2RlID0gKFxuICAgICAgPHVsPlxuICAgICAgICB7cmVsZWFzZU5vdGVzLmZlYXR1cmVzLm1hcCgoeyBrZXksIGNvbXBvbmVudHMgfSkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e2tleX0+XG4gICAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBpZD17a2V5fVxuICAgICAgICAgICAgICByZW5kZXJUZXh0PXtyZW5kZXJUZXh0fVxuICAgICAgICAgICAgICBjb21wb25lbnRzPXtjb21wb25lbnRzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsXG4gICAgICBoYXNYQnV0dG9uXG4gICAgICBpMThuPXtpMThufVxuICAgICAgb25DbG9zZT17aGlkZVdoYXRzTmV3TW9kYWx9XG4gICAgICB0aXRsZT17aTE4bignV2hhdHNOZXdfX21vZGFsLXRpdGxlJyl9XG4gICAgPlxuICAgICAgPD5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAge21vbWVudChyZWxlYXNlTm90ZXMuZGF0ZSkuZm9ybWF0KCdMTCcpfSAmbWlkZG90O3snICd9XG4gICAgICAgICAge3JlbGVhc2VOb3Rlcy52ZXJzaW9ufVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIHtjb250ZW50Tm9kZX1cbiAgICAgIDwvPlxuICAgIDwvTW9kYWw+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQixvQkFBbUI7QUFFbkIsbUJBQXNCO0FBRXRCLGtCQUFxQjtBQUNyQixxQkFBd0I7QUFjeEIsTUFBTSxhQUFxQyx3QkFBQyxFQUFFLEtBQUssV0FDakQsbURBQUM7QUFBQSxFQUFRO0FBQUEsRUFBVTtBQUFBLENBQVksR0FEVTtBQUkzQyxNQUFNLGVBQWlDO0FBQUEsRUFDckMsTUFBTSxJQUFJLEtBQUssT0FBTyxtQkFBbUIsS0FBSyxLQUFLLElBQUksQ0FBQztBQUFBLEVBQ3hELFNBQVMsT0FBTyxhQUFhO0FBQUEsRUFDN0IsVUFBVTtBQUFBLElBQ1I7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNGO0FBRU8sTUFBTSxnQkFBZ0Isd0JBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixNQUFJO0FBRUosTUFBSSxhQUFhLFNBQVMsV0FBVyxHQUFHO0FBQ3RDLFVBQU0sRUFBRSxLQUFLLGVBQWUsYUFBYSxTQUFTO0FBQ2xELGtCQUNFLG1EQUFDLFdBQ0MsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxJQUFJO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxLQUNGLENBQ0Y7QUFBQSxFQUVKLE9BQU87QUFDTCxrQkFDRSxtREFBQyxZQUNFLGFBQWEsU0FBUyxJQUFJLENBQUMsRUFBRSxLQUFLLGlCQUNqQyxtREFBQztBQUFBLE1BQUc7QUFBQSxPQUNGLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsSUFBSTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsS0FDRixDQUNGLENBQ0QsQ0FDSDtBQUFBLEVBRUo7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFDQyxZQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsT0FBTyxLQUFLLHVCQUF1QjtBQUFBLEtBRW5DLHdGQUNFLG1EQUFDLGNBQ0UsMkJBQU8sYUFBYSxJQUFJLEVBQUUsT0FBTyxJQUFJLEdBQUUsU0FBVSxLQUNqRCxhQUFhLE9BQ2hCLEdBQ0MsV0FDSCxDQUNGO0FBRUosR0FuRDZCOyIsCiAgIm5hbWVzIjogW10KfQo=
