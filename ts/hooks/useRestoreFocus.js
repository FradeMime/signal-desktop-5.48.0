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
var useRestoreFocus_exports = {};
__export(useRestoreFocus_exports, {
  useDelayedRestoreFocus: () => useDelayedRestoreFocus,
  useRestoreFocus: () => useRestoreFocus
});
module.exports = __toCommonJS(useRestoreFocus_exports);
var React = __toESM(require("react"));
const useRestoreFocus = /* @__PURE__ */ __name(() => {
  const toFocusRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);
  const setFocusRef = React.useCallback((toFocus) => {
    if (!toFocus) {
      return;
    }
    if (toFocusRef.current) {
      return;
    }
    toFocusRef.current = toFocus;
    lastFocusedRef.current = document.activeElement;
    toFocus.focus();
  }, []);
  React.useEffect(() => {
    return () => {
      setTimeout(() => {
        if (lastFocusedRef.current && lastFocusedRef.current.focus) {
          lastFocusedRef.current.focus();
        }
      });
    };
  }, []);
  return [setFocusRef];
}, "useRestoreFocus");
const useDelayedRestoreFocus = /* @__PURE__ */ __name(() => {
  const toFocusRef = React.useRef(null);
  const lastFocusedRef = React.useRef(null);
  const setFocusRef = React.useCallback((toFocus) => {
    function setFocus() {
      if (!toFocus) {
        return;
      }
      if (toFocusRef.current) {
        return;
      }
      toFocusRef.current = toFocus;
      lastFocusedRef.current = document.activeElement;
      toFocus.focus();
    }
    const timeout = setTimeout(setFocus, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  React.useEffect(() => {
    return () => {
      setTimeout(() => {
        if (lastFocusedRef.current && lastFocusedRef.current.focus) {
          lastFocusedRef.current.focus();
        }
      });
    };
  }, []);
  return [setFocusRef];
}, "useDelayedRestoreFocus");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDelayedRestoreFocus,
  useRestoreFocus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlUmVzdG9yZUZvY3VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxudHlwZSBDYWxsYmFja1R5cGUgPSAodG9Gb2N1czogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB2b2lkO1xuXG4vLyBSZXN0b3JlIGZvY3VzIG9uIHRlYXJkb3duXG5leHBvcnQgY29uc3QgdXNlUmVzdG9yZUZvY3VzID0gKCk6IEFycmF5PENhbGxiYWNrVHlwZT4gPT4ge1xuICBjb25zdCB0b0ZvY3VzUmVmID0gUmVhY3QudXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhc3RGb2N1c2VkUmVmID0gUmVhY3QudXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gV2UgbmVlZCB0byB1c2UgYSBjYWxsYmFjayBoZXJlIGJlY2F1c2UgcmVmcyBhcmVuJ3QgbmVjZXNzYXJpbHkgcG9wdWxhdGVkIG9uIGZpcnN0XG4gIC8vICAgcmVuZGVyLiBGb3IgZXhhbXBsZSwgTW9kYWxIb3N0IG1ha2VzIGEgdG9wLWxldmVsIHBhcmVudCBkaXYgZmlyc3QsIGFuZCB0aGVuIHJlbmRlcnNcbiAgLy8gICBpbnRvIGl0LiBBbmQgdGhlIGNoaWxkcmVuIHlvdSBwYXNzIGl0IGRvbid0IGhhdmUgYWNjZXNzIHRvIHRoYXQgcm9vdCBkaXYuXG4gIGNvbnN0IHNldEZvY3VzUmVmID0gUmVhY3QudXNlQ2FsbGJhY2soXG4gICAgKHRvRm9jdXM6IEhUTUxFbGVtZW50IHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgaWYgKCF0b0ZvY3VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gV2Ugb25seSB3YW50IHRvIGRvIHRoaXMgb25jZS5cbiAgICAgIGlmICh0b0ZvY3VzUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdG9Gb2N1c1JlZi5jdXJyZW50ID0gdG9Gb2N1cztcblxuICAgICAgLy8gUmVtZW1iZXIgbGFzdC1mb2N1c2VkIGVsZW1lbnQsIGZvY3VzIHRoaXMgbmV3IHRhcmdldCBlbGVtZW50LlxuICAgICAgbGFzdEZvY3VzZWRSZWYuY3VycmVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0b0ZvY3VzLmZvY3VzKCk7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIC8vIE9uIHVubW91bnQsIHJldHVybmVkIGZvY3VzIHRvIGVsZW1lbnQgZm9jdXNlZCBiZWZvcmUgd2Ugc2V0IHRoZSBmb2N1c1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChsYXN0Rm9jdXNlZFJlZi5jdXJyZW50ICYmIGxhc3RGb2N1c2VkUmVmLmN1cnJlbnQuZm9jdXMpIHtcbiAgICAgICAgICBsYXN0Rm9jdXNlZFJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gW3NldEZvY3VzUmVmXTtcbn07XG5cbi8vIFBhbmVscyBhcmUgaW5pdGlhbGx5IHJlbmRlcmVkIG91dHNpZGUgdGhlIERPTSwgYW5kIHRoZW4gYWRkZWQgdG8gaXQuIFdlIG5lZWQgdG9cbi8vICAgZGVsYXkgb3VyIGF0dGVtcHRzIHRvIHNldCBmb2N1cy5cbi8vIEp1c3QgbGlrZSB0aGUgYWJvdmUgaG9vaywgYnV0IHdpdGggYSBkZWJvdW5jZS5cbmV4cG9ydCBjb25zdCB1c2VEZWxheWVkUmVzdG9yZUZvY3VzID0gKCk6IEFycmF5PENhbGxiYWNrVHlwZT4gPT4ge1xuICBjb25zdCB0b0ZvY3VzUmVmID0gUmVhY3QudXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhc3RGb2N1c2VkUmVmID0gUmVhY3QudXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qgc2V0Rm9jdXNSZWYgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAodG9Gb2N1czogSFRNTEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICBmdW5jdGlvbiBzZXRGb2N1cygpIHtcbiAgICAgICAgaWYgKCF0b0ZvY3VzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSB3YW50IHRvIGRvIHRoaXMgb25jZS5cbiAgICAgICAgaWYgKHRvRm9jdXNSZWYuY3VycmVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0b0ZvY3VzUmVmLmN1cnJlbnQgPSB0b0ZvY3VzO1xuXG4gICAgICAgIC8vIFJlbWVtYmVyIGxhc3QtZm9jdXNlZCBlbGVtZW50LCBmb2N1cyB0aGlzIG5ldyB0YXJnZXQgZWxlbWVudC5cbiAgICAgICAgbGFzdEZvY3VzZWRSZWYuY3VycmVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRvRm9jdXMuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoc2V0Rm9jdXMsIDI1MCk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIC8vIE9uIHVubW91bnQsIHJldHVybmVkIGZvY3VzIHRvIGVsZW1lbnQgZm9jdXNlZCBiZWZvcmUgd2Ugc2V0IHRoZSBmb2N1c1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChsYXN0Rm9jdXNlZFJlZi5jdXJyZW50ICYmIGxhc3RGb2N1c2VkUmVmLmN1cnJlbnQuZm9jdXMpIHtcbiAgICAgICAgICBsYXN0Rm9jdXNlZFJlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gW3NldEZvY3VzUmVmXTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUtoQixNQUFNLGtCQUFrQiw2QkFBMkI7QUFDeEQsUUFBTSxhQUFhLE1BQU0sT0FBMkIsSUFBSTtBQUN4RCxRQUFNLGlCQUFpQixNQUFNLE9BQTJCLElBQUk7QUFLNUQsUUFBTSxjQUFjLE1BQU0sWUFDeEIsQ0FBQyxZQUE0QztBQUMzQyxRQUFJLENBQUMsU0FBUztBQUNaO0FBQUEsSUFDRjtBQUdBLFFBQUksV0FBVyxTQUFTO0FBQ3RCO0FBQUEsSUFDRjtBQUNBLGVBQVcsVUFBVTtBQUdyQixtQkFBZSxVQUFVLFNBQVM7QUFDbEMsWUFBUSxNQUFNO0FBQUEsRUFDaEIsR0FDQSxDQUFDLENBQ0g7QUFFQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixXQUFPLE1BQU07QUFFWCxpQkFBVyxNQUFNO0FBQ2YsWUFBSSxlQUFlLFdBQVcsZUFBZSxRQUFRLE9BQU87QUFDMUQseUJBQWUsUUFBUSxNQUFNO0FBQUEsUUFDL0I7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU8sQ0FBQyxXQUFXO0FBQ3JCLEdBdEMrQjtBQTJDeEIsTUFBTSx5QkFBeUIsNkJBQTJCO0FBQy9ELFFBQU0sYUFBYSxNQUFNLE9BQTJCLElBQUk7QUFDeEQsUUFBTSxpQkFBaUIsTUFBTSxPQUEyQixJQUFJO0FBRTVELFFBQU0sY0FBYyxNQUFNLFlBQ3hCLENBQUMsWUFBNEM7QUFDM0Msd0JBQW9CO0FBQ2xCLFVBQUksQ0FBQyxTQUFTO0FBQ1o7QUFBQSxNQUNGO0FBR0EsVUFBSSxXQUFXLFNBQVM7QUFDdEI7QUFBQSxNQUNGO0FBQ0EsaUJBQVcsVUFBVTtBQUdyQixxQkFBZSxVQUFVLFNBQVM7QUFDbEMsY0FBUSxNQUFNO0FBQUEsSUFDaEI7QUFkUyxBQWdCVCxVQUFNLFVBQVUsV0FBVyxVQUFVLEdBQUc7QUFFeEMsV0FBTyxNQUFNO0FBQ1gsbUJBQWEsT0FBTztBQUFBLElBQ3RCO0FBQUEsRUFDRixHQUNBLENBQUMsQ0FDSDtBQUVBLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFdBQU8sTUFBTTtBQUVYLGlCQUFXLE1BQU07QUFDZixZQUFJLGVBQWUsV0FBVyxlQUFlLFFBQVEsT0FBTztBQUMxRCx5QkFBZSxRQUFRLE1BQU07QUFBQSxRQUMvQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTyxDQUFDLFdBQVc7QUFDckIsR0EzQ3NDOyIsCiAgIm5hbWVzIjogW10KfQo=
