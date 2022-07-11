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
var ReactWrapperView_exports = {};
__export(ReactWrapperView_exports, {
  ReactWrapperView: () => ReactWrapperView
});
module.exports = __toCommonJS(ReactWrapperView_exports);
var ReactDOM = __toESM(require("react-dom"));
var Backbone = __toESM(require("backbone"));
class ReactWrapperView extends Backbone.View {
  constructor({
    className,
    onClose,
    JSX
  }) {
    super();
    this.className = className ?? "react-wrapper";
    this.JSX = JSX;
    this.onClose = onClose;
    this.render();
  }
  update(JSX) {
    this.JSX = JSX;
    this.render();
  }
  render() {
    this.el.className = this.className;
    ReactDOM.render(this.JSX, this.el);
    return this;
  }
  remove() {
    if (this.onClose) {
      this.onClose();
    }
    ReactDOM.unmountComponentAtNode(this.el);
    Backbone.View.prototype.remove.call(this);
    return this;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactWrapperView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3RXcmFwcGVyVmlldy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCAqIGFzIEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcblxuZXhwb3J0IGNsYXNzIFJlYWN0V3JhcHBlclZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3IHtcbiAgcHJpdmF0ZSByZWFkb25seSBvbkNsb3NlPzogKCkgPT4gdW5rbm93bjtcbiAgcHJpdmF0ZSBKU1g6IFJlYWN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgY2xhc3NOYW1lLFxuICAgIG9uQ2xvc2UsXG4gICAgSlNYLFxuICB9OiBSZWFkb25seTx7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIG9uQ2xvc2U/OiAoKSA9PiB1bmtub3duO1xuICAgIEpTWDogUmVhY3RFbGVtZW50O1xuICB9Pikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSA/PyAncmVhY3Qtd3JhcHBlcic7XG4gICAgdGhpcy5KU1ggPSBKU1g7XG4gICAgdGhpcy5vbkNsb3NlID0gb25DbG9zZTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICB1cGRhdGUoSlNYOiBSZWFjdEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLkpTWCA9IEpTWDtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVuZGVyKCk6IHRoaXMge1xuICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gdGhpcy5jbGFzc05hbWU7XG4gICAgUmVhY3RET00ucmVuZGVyKHRoaXMuSlNYLCB0aGlzLmVsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbW92ZSgpOiB0aGlzIHtcbiAgICBpZiAodGhpcy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICB9XG4gICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmVsKTtcbiAgICBCYWNrYm9uZS5WaWV3LnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLGVBQTBCO0FBQzFCLGVBQTBCO0FBRW5CLE1BQU0seUJBQXlCLFNBQVMsS0FBSztBQUFBLEVBSWxELFlBQVk7QUFBQSxJQUNWO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQUtFO0FBQ0YsVUFBTTtBQUVOLFNBQUssWUFBWSxhQUFhO0FBQzlCLFNBQUssTUFBTTtBQUNYLFNBQUssVUFBVTtBQUVmLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVBLE9BQU8sS0FBeUI7QUFDOUIsU0FBSyxNQUFNO0FBQ1gsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLEVBRVMsU0FBZTtBQUN0QixTQUFLLEdBQUcsWUFBWSxLQUFLO0FBQ3pCLGFBQVMsT0FBTyxLQUFLLEtBQUssS0FBSyxFQUFFO0FBQ2pDLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUyxTQUFlO0FBQ3RCLFFBQUksS0FBSyxTQUFTO0FBQ2hCLFdBQUssUUFBUTtBQUFBLElBQ2Y7QUFDQSxhQUFTLHVCQUF1QixLQUFLLEVBQUU7QUFDdkMsYUFBUyxLQUFLLFVBQVUsT0FBTyxLQUFLLElBQUk7QUFDeEMsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQXpDTyIsCiAgIm5hbWVzIjogW10KfQo=
