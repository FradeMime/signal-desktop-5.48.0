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
var Tooltip_exports = {};
__export(Tooltip_exports, {
  Tooltip: () => Tooltip,
  TooltipPlacement: () => TooltipPlacement
});
module.exports = __toCommonJS(Tooltip_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_react_popper = require("react-popper");
var import_theme = require("../util/theme");
var import_refMerger = require("../util/refMerger");
var import_popperUtil = require("../util/popperUtil");
const TooltipEventWrapper = import_react.default.forwardRef(({ onHoverChanged, children }, ref) => {
  const wrapperRef = import_react.default.useRef(null);
  const on = import_react.default.useCallback(() => {
    onHoverChanged(true);
  }, [onHoverChanged]);
  const off = import_react.default.useCallback(() => {
    onHoverChanged(false);
  }, [onHoverChanged]);
  const onFocus = import_react.default.useCallback(() => {
    if (window.getInteractionMode() === "keyboard") {
      on();
    }
  }, [on]);
  import_react.default.useEffect(() => {
    const wrapperEl = wrapperRef.current;
    if (!wrapperEl) {
      return import_lodash.noop;
    }
    wrapperEl.addEventListener("mouseenter", on);
    wrapperEl.addEventListener("mouseleave", off);
    return () => {
      wrapperEl.removeEventListener("mouseenter", on);
      wrapperEl.removeEventListener("mouseleave", off);
    };
  }, [on, off]);
  return /* @__PURE__ */ import_react.default.createElement("span", {
    onFocus,
    onBlur: off,
    ref: (0, import_refMerger.refMerger)(ref, wrapperRef)
  }, children);
});
var TooltipPlacement = /* @__PURE__ */ ((TooltipPlacement2) => {
  TooltipPlacement2["Top"] = "top";
  TooltipPlacement2["Right"] = "right";
  TooltipPlacement2["Bottom"] = "bottom";
  TooltipPlacement2["Left"] = "left";
  return TooltipPlacement2;
})(TooltipPlacement || {});
const Tooltip = /* @__PURE__ */ __name(({
  children,
  className,
  content,
  direction,
  sticky,
  theme,
  popperModifiers = []
}) => {
  const [isHovering, setIsHovering] = import_react.default.useState(false);
  const showTooltip = isHovering || Boolean(sticky);
  const tooltipThemeClassName = theme ? `module-tooltip--${(0, import_theme.themeClassName)(theme)}` : void 0;
  return /* @__PURE__ */ import_react.default.createElement(import_react_popper.Manager, null, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Reference, null, ({ ref }) => /* @__PURE__ */ import_react.default.createElement(TooltipEventWrapper, {
    ref,
    onHoverChanged: setIsHovering
  }, children)), /* @__PURE__ */ import_react.default.createElement(import_react_popper.Popper, {
    placement: direction,
    modifiers: [(0, import_popperUtil.offsetDistanceModifier)(12), ...popperModifiers]
  }, ({ arrowProps, placement, ref, style }) => showTooltip && /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-tooltip", tooltipThemeClassName, className),
    ref,
    style,
    "data-placement": placement
  }, content, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-tooltip-arrow",
    ref: arrowProps.ref,
    style: arrowProps.style
  }))));
}, "Tooltip");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tooltip,
  TooltipPlacement
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9vbHRpcC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IE1hbmFnZXIsIFJlZmVyZW5jZSwgUG9wcGVyIH0gZnJvbSAncmVhY3QtcG9wcGVyJztcbmltcG9ydCB0eXBlIHsgU3RyaWN0TW9kaWZpZXJzIH0gZnJvbSAnQHBvcHBlcmpzL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBUaGVtZSB9IGZyb20gJy4uL3V0aWwvdGhlbWUnO1xuaW1wb3J0IHsgdGhlbWVDbGFzc05hbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IHJlZk1lcmdlciB9IGZyb20gJy4uL3V0aWwvcmVmTWVyZ2VyJztcbmltcG9ydCB7IG9mZnNldERpc3RhbmNlTW9kaWZpZXIgfSBmcm9tICcuLi91dGlsL3BvcHBlclV0aWwnO1xuXG50eXBlIEV2ZW50V3JhcHBlclByb3BzVHlwZSA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgb25Ib3ZlckNoYW5nZWQ6IChfOiBib29sZWFuKSA9PiB2b2lkO1xufTtcblxuLy8gUmVhY3QgZG9lc24ndCByZWxpYWJseSBmaXJlIGBvbk1vdXNlTGVhdmVgIG9yIGBvbk1vdXNlT3V0YCBldmVudHMgaWYgd3JhcHBpbmcgYVxuLy8gICBkaXNhYmxlZCBidXR0b24uIFRoaXMgdXNlcyBuYXRpdmUgYnJvd3NlciBldmVudHMgdG8gYXZvaWQgdGhhdC5cbi8vXG4vLyBTZWUgPGh0dHBzOi8vbGVjc3Rvci5jb20vcmVhY3QtZGlzYWJsZWQtYnV0dG9uLW9ubW91c2VsZWF2ZS8+LlxuY29uc3QgVG9vbHRpcEV2ZW50V3JhcHBlciA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIEhUTUxTcGFuRWxlbWVudCxcbiAgRXZlbnRXcmFwcGVyUHJvcHNUeXBlXG4+KCh7IG9uSG92ZXJDaGFuZ2VkLCBjaGlsZHJlbiB9LCByZWYpID0+IHtcbiAgY29uc3Qgd3JhcHBlclJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MU3BhbkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBvbiA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvbkhvdmVyQ2hhbmdlZCh0cnVlKTtcbiAgfSwgW29uSG92ZXJDaGFuZ2VkXSk7XG5cbiAgY29uc3Qgb2ZmID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9uSG92ZXJDaGFuZ2VkKGZhbHNlKTtcbiAgfSwgW29uSG92ZXJDaGFuZ2VkXSk7XG5cbiAgY29uc3Qgb25Gb2N1cyA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAod2luZG93LmdldEludGVyYWN0aW9uTW9kZSgpID09PSAna2V5Ym9hcmQnKSB7XG4gICAgICBvbigpO1xuICAgIH1cbiAgfSwgW29uXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB3cmFwcGVyRWwgPSB3cmFwcGVyUmVmLmN1cnJlbnQ7XG5cbiAgICBpZiAoIXdyYXBwZXJFbCkge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgd3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBvbik7XG4gICAgd3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBvZmYpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgb24pO1xuICAgICAgd3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBvZmYpO1xuICAgIH07XG4gIH0sIFtvbiwgb2ZmXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c3BhblxuICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgIG9uQmx1cj17b2ZmfVxuICAgICAgcmVmPXtyZWZNZXJnZXI8SFRNTFNwYW5FbGVtZW50PihyZWYsIHdyYXBwZXJSZWYpfVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3NwYW4+XG4gICk7XG59KTtcblxuZXhwb3J0IGVudW0gVG9vbHRpcFBsYWNlbWVudCB7XG4gIFRvcCA9ICd0b3AnLFxuICBSaWdodCA9ICdyaWdodCcsXG4gIEJvdHRvbSA9ICdib3R0b20nLFxuICBMZWZ0ID0gJ2xlZnQnLFxufVxuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNvbnRlbnQ6IHN0cmluZyB8IEpTWC5FbGVtZW50O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGRpcmVjdGlvbj86IFRvb2x0aXBQbGFjZW1lbnQ7XG4gIHBvcHBlck1vZGlmaWVycz86IEFycmF5PFN0cmljdE1vZGlmaWVycz47XG4gIHN0aWNreT86IGJvb2xlYW47XG4gIHRoZW1lPzogVGhlbWU7XG59O1xuXG5leHBvcnQgY29uc3QgVG9vbHRpcDogUmVhY3QuRkM8UHJvcHNUeXBlPiA9ICh7XG4gIGNoaWxkcmVuLFxuICBjbGFzc05hbWUsXG4gIGNvbnRlbnQsXG4gIGRpcmVjdGlvbixcbiAgc3RpY2t5LFxuICB0aGVtZSxcbiAgcG9wcGVyTW9kaWZpZXJzID0gW10sXG59KSA9PiB7XG4gIGNvbnN0IFtpc0hvdmVyaW5nLCBzZXRJc0hvdmVyaW5nXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBzaG93VG9vbHRpcCA9IGlzSG92ZXJpbmcgfHwgQm9vbGVhbihzdGlja3kpO1xuXG4gIGNvbnN0IHRvb2x0aXBUaGVtZUNsYXNzTmFtZSA9IHRoZW1lXG4gICAgPyBgbW9kdWxlLXRvb2x0aXAtLSR7dGhlbWVDbGFzc05hbWUodGhlbWUpfWBcbiAgICA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4gKFxuICAgIDxNYW5hZ2VyPlxuICAgICAgPFJlZmVyZW5jZT5cbiAgICAgICAgeyh7IHJlZiB9KSA9PiAoXG4gICAgICAgICAgPFRvb2x0aXBFdmVudFdyYXBwZXIgcmVmPXtyZWZ9IG9uSG92ZXJDaGFuZ2VkPXtzZXRJc0hvdmVyaW5nfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICA8L1Rvb2x0aXBFdmVudFdyYXBwZXI+XG4gICAgICAgICl9XG4gICAgICA8L1JlZmVyZW5jZT5cbiAgICAgIDxQb3BwZXJcbiAgICAgICAgcGxhY2VtZW50PXtkaXJlY3Rpb259XG4gICAgICAgIG1vZGlmaWVycz17W29mZnNldERpc3RhbmNlTW9kaWZpZXIoMTIpLCAuLi5wb3BwZXJNb2RpZmllcnNdfVxuICAgICAgPlxuICAgICAgICB7KHsgYXJyb3dQcm9wcywgcGxhY2VtZW50LCByZWYsIHN0eWxlIH0pID0+XG4gICAgICAgICAgc2hvd1Rvb2x0aXAgJiYgKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgJ21vZHVsZS10b29sdGlwJyxcbiAgICAgICAgICAgICAgICB0b29sdGlwVGhlbWVDbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgIGRhdGEtcGxhY2VtZW50PXtwbGFjZW1lbnR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLXRvb2x0aXAtYXJyb3dcIlxuICAgICAgICAgICAgICAgIHJlZj17YXJyb3dQcm9wcy5yZWZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e2Fycm93UHJvcHMuc3R5bGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIDwvUG9wcGVyPlxuICAgIDwvTWFuYWdlcj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBQ3ZCLG9CQUFxQjtBQUNyQiwwQkFBMkM7QUFHM0MsbUJBQStCO0FBQy9CLHVCQUEwQjtBQUMxQix3QkFBdUM7QUFXdkMsTUFBTSxzQkFBc0IscUJBQU0sV0FHaEMsQ0FBQyxFQUFFLGdCQUFnQixZQUFZLFFBQVE7QUFDdkMsUUFBTSxhQUFhLHFCQUFNLE9BQStCLElBQUk7QUFFNUQsUUFBTSxLQUFLLHFCQUFNLFlBQVksTUFBTTtBQUNqQyxtQkFBZSxJQUFJO0FBQUEsRUFDckIsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUVuQixRQUFNLE1BQU0scUJBQU0sWUFBWSxNQUFNO0FBQ2xDLG1CQUFlLEtBQUs7QUFBQSxFQUN0QixHQUFHLENBQUMsY0FBYyxDQUFDO0FBRW5CLFFBQU0sVUFBVSxxQkFBTSxZQUFZLE1BQU07QUFDdEMsUUFBSSxPQUFPLG1CQUFtQixNQUFNLFlBQVk7QUFDOUMsU0FBRztBQUFBLElBQ0w7QUFBQSxFQUNGLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFFUCx1QkFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxZQUFZLFdBQVc7QUFFN0IsUUFBSSxDQUFDLFdBQVc7QUFDZCxhQUFPO0FBQUEsSUFDVDtBQUVBLGNBQVUsaUJBQWlCLGNBQWMsRUFBRTtBQUMzQyxjQUFVLGlCQUFpQixjQUFjLEdBQUc7QUFFNUMsV0FBTyxNQUFNO0FBQ1gsZ0JBQVUsb0JBQW9CLGNBQWMsRUFBRTtBQUM5QyxnQkFBVSxvQkFBb0IsY0FBYyxHQUFHO0FBQUEsSUFDakQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztBQUVaLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixLQUFLLGdDQUEyQixLQUFLLFVBQVU7QUFBQSxLQUU5QyxRQUNIO0FBRUosQ0FBQztBQUVNLElBQUssbUJBQUwsa0JBQUssc0JBQUw7QUFDTCw2QkFBTTtBQUNOLCtCQUFRO0FBQ1IsZ0NBQVM7QUFDVCw4QkFBTztBQUpHO0FBQUE7QUFnQkwsTUFBTSxVQUErQix3QkFBQztBQUFBLEVBQzNDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGtCQUFrQixDQUFDO0FBQUEsTUFDZjtBQUNKLFFBQU0sQ0FBQyxZQUFZLGlCQUFpQixxQkFBTSxTQUFTLEtBQUs7QUFFeEQsUUFBTSxjQUFjLGNBQWMsUUFBUSxNQUFNO0FBRWhELFFBQU0sd0JBQXdCLFFBQzFCLG1CQUFtQixpQ0FBZSxLQUFLLE1BQ3ZDO0FBRUosU0FDRSxtREFBQyxtQ0FDQyxtREFBQyxxQ0FDRSxDQUFDLEVBQUUsVUFDRixtREFBQztBQUFBLElBQW9CO0FBQUEsSUFBVSxnQkFBZ0I7QUFBQSxLQUM1QyxRQUNILENBRUosR0FDQSxtREFBQztBQUFBLElBQ0MsV0FBVztBQUFBLElBQ1gsV0FBVyxDQUFDLDhDQUF1QixFQUFFLEdBQUcsR0FBRyxlQUFlO0FBQUEsS0FFekQsQ0FBQyxFQUFFLFlBQVksV0FBVyxLQUFLLFlBQzlCLGVBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1Qsa0JBQ0EsdUJBQ0EsU0FDRjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxrQkFBZ0I7QUFBQSxLQUVmLFNBQ0QsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLEtBQUssV0FBVztBQUFBLElBQ2hCLE9BQU8sV0FBVztBQUFBLEdBQ3BCLENBQ0YsQ0FHTixDQUNGO0FBRUosR0F0RDRDOyIsCiAgIm5hbWVzIjogW10KfQo=
