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
var ConfirmModal_exports = {};
__export(ConfirmModal_exports, {
  ConfirmModal: () => ConfirmModal
});
module.exports = __toCommonJS(ConfirmModal_exports);
var React = __toESM(require("react"));
var import_react_dom = require("react-dom");
var styles = __toESM(require("./ConfirmModal.scss"));
var import_ConfirmDialog = require("../elements/ConfirmDialog");
const ConfirmModal = React.memo((props) => {
  const { onCancel } = props;
  const [popperRoot, setPopperRoot] = React.useState();
  React.useEffect(() => {
    const root = document.createElement("div");
    setPopperRoot(root);
    document.body.appendChild(root);
    const handleOutsideClick = /* @__PURE__ */ __name(({ target }) => {
      if (!root.contains(target)) {
        onCancel();
      }
    }, "handleOutsideClick");
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeChild(root);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onCancel]);
  return popperRoot ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement("div", {
    className: styles.facade
  }, /* @__PURE__ */ React.createElement(import_ConfirmDialog.ConfirmDialog, {
    ...props
  })), popperRoot) : null;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybU1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9Db25maXJtTW9kYWwuc2Nzcyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi4vZWxlbWVudHMvQ29uZmlybURpYWxvZyc7XG5pbXBvcnQgeyBDb25maXJtRGlhbG9nIH0gZnJvbSAnLi4vZWxlbWVudHMvQ29uZmlybURpYWxvZyc7XG5cbmV4cG9ydCB0eXBlIE1vZGUgPSAncmVtb3ZhYmxlJyB8ICdwaWNrLWVtb2ppJyB8ICdhZGQnO1xuXG5leHBvcnQgY29uc3QgQ29uZmlybU1vZGFsID0gUmVhY3QubWVtbygocHJvcHM6IFByb3BzKSA9PiB7XG4gIGNvbnN0IHsgb25DYW5jZWwgfSA9IHByb3BzO1xuICBjb25zdCBbcG9wcGVyUm9vdCwgc2V0UG9wcGVyUm9vdF0gPSBSZWFjdC51c2VTdGF0ZTxIVE1MRGl2RWxlbWVudD4oKTtcblxuICAvLyBDcmVhdGUgcG9wcGVyIHJvb3QgYW5kIGhhbmRsZSBvdXRzaWRlIGNsaWNrc1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZXRQb3BwZXJSb290KHJvb3QpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKHsgdGFyZ2V0IH06IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmICghcm9vdC5jb250YWlucyh0YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgICAgb25DYW5jZWwoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHJvb3QpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgIH07XG4gIH0sIFtvbkNhbmNlbF0pO1xuXG4gIHJldHVybiBwb3BwZXJSb290XG4gICAgPyBjcmVhdGVQb3J0YWwoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuZmFjYWRlfT5cbiAgICAgICAgICA8Q29uZmlybURpYWxvZyB7Li4ucHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PixcbiAgICAgICAgcG9wcGVyUm9vdFxuICAgICAgKVxuICAgIDogbnVsbDtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLHVCQUE2QjtBQUM3QixhQUF3QjtBQUV4QiwyQkFBOEI7QUFJdkIsTUFBTSxlQUFlLE1BQU0sS0FBSyxDQUFDLFVBQWlCO0FBQ3ZELFFBQU0sRUFBRSxhQUFhO0FBQ3JCLFFBQU0sQ0FBQyxZQUFZLGlCQUFpQixNQUFNLFNBQXlCO0FBR25FLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFVBQU0sT0FBTyxTQUFTLGNBQWMsS0FBSztBQUN6QyxrQkFBYyxJQUFJO0FBQ2xCLGFBQVMsS0FBSyxZQUFZLElBQUk7QUFDOUIsVUFBTSxxQkFBcUIsd0JBQUMsRUFBRSxhQUF5QjtBQUNyRCxVQUFJLENBQUMsS0FBSyxTQUFTLE1BQWMsR0FBRztBQUNsQyxpQkFBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLEdBSjJCO0FBSzNCLGFBQVMsaUJBQWlCLFNBQVMsa0JBQWtCO0FBRXJELFdBQU8sTUFBTTtBQUNYLGVBQVMsS0FBSyxZQUFZLElBQUk7QUFDOUIsZUFBUyxvQkFBb0IsU0FBUyxrQkFBa0I7QUFBQSxJQUMxRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUViLFNBQU8sYUFDSCxtQ0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVyxPQUFPO0FBQUEsS0FDckIsb0NBQUM7QUFBQSxPQUFrQjtBQUFBLEdBQU8sQ0FDNUIsR0FDQSxVQUNGLElBQ0E7QUFDTixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
