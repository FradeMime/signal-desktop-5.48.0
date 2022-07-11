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
var ReactionPicker_exports = {};
__export(ReactionPicker_exports, {
  ReactionPicker: () => ReactionPicker
});
module.exports = __toCommonJS(ReactionPicker_exports);
var React = __toESM(require("react"));
var import_lib = require("../emoji/lib");
var import_useRestoreFocus = require("../../hooks/useRestoreFocus");
var import_ReactionPickerPicker = require("../ReactionPickerPicker");
const ReactionPicker = React.forwardRef(({
  i18n,
  onClose,
  onPick,
  onSetSkinTone,
  openCustomizePreferredReactionsModal,
  preferredReactionEmoji,
  renderEmojiPicker,
  selected,
  style
}, ref) => {
  const [pickingOther, setPickingOther] = React.useState(false);
  React.useEffect(() => {
    const handler = /* @__PURE__ */ __name((e) => {
      if (onClose && e.key === "Escape") {
        onClose();
      }
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);
  const onPickEmoji = React.useCallback(({ shortName, skinTone: pickedSkinTone }) => {
    onPick((0, import_lib.convertShortName)(shortName, pickedSkinTone));
  }, [onPick]);
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  if (pickingOther) {
    return renderEmojiPicker({
      onClickSettings: openCustomizePreferredReactionsModal,
      onClose,
      onPickEmoji,
      onSetSkinTone,
      ref,
      style
    });
  }
  const otherSelected = selected && !preferredReactionEmoji.includes(selected);
  let moreButton;
  if (otherSelected) {
    moreButton = /* @__PURE__ */ React.createElement(import_ReactionPickerPicker.ReactionPickerPickerEmojiButton, {
      emoji: selected,
      onClick: () => {
        onPick(selected);
      },
      isSelected: true,
      title: i18n("Reactions--remove")
    });
  } else {
    moreButton = /* @__PURE__ */ React.createElement(import_ReactionPickerPicker.ReactionPickerPickerMoreButton, {
      i18n,
      onClick: () => {
        setPickingOther(true);
      }
    });
  }
  let hasSelectedSomething = false;
  return /* @__PURE__ */ React.createElement(import_ReactionPickerPicker.ReactionPickerPicker, {
    isSomethingSelected: typeof selected === "number",
    pickerStyle: import_ReactionPickerPicker.ReactionPickerPickerStyle.Picker,
    ref,
    style
  }, preferredReactionEmoji.map((emoji, index) => {
    const maybeFocusRef = index === 0 ? focusRef : void 0;
    const isSelected = !hasSelectedSomething && emoji === selected;
    if (isSelected) {
      hasSelectedSomething = true;
    }
    return /* @__PURE__ */ React.createElement(import_ReactionPickerPicker.ReactionPickerPickerEmojiButton, {
      emoji,
      isSelected,
      key: index,
      onClick: () => {
        onPick(emoji);
      },
      ref: maybeFocusRef
    });
  }), moreButton);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactionPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVhY3Rpb25QaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29udmVydFNob3J0TmFtZSB9IGZyb20gJy4uL2Vtb2ppL2xpYic7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIEVtb2ppUGlja2VyUHJvcHMgfSBmcm9tICcuLi9lbW9qaS9FbW9qaVBpY2tlcic7XG5pbXBvcnQgeyB1c2VSZXN0b3JlRm9jdXMgfSBmcm9tICcuLi8uLi9ob29rcy91c2VSZXN0b3JlRm9jdXMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQge1xuICBSZWFjdGlvblBpY2tlclBpY2tlcixcbiAgUmVhY3Rpb25QaWNrZXJQaWNrZXJFbW9qaUJ1dHRvbixcbiAgUmVhY3Rpb25QaWNrZXJQaWNrZXJNb3JlQnV0dG9uLFxuICBSZWFjdGlvblBpY2tlclBpY2tlclN0eWxlLFxufSBmcm9tICcuLi9SZWFjdGlvblBpY2tlclBpY2tlcic7XG5cbmV4cG9ydCB0eXBlIFJlbmRlckVtb2ppUGlja2VyUHJvcHMgPSBQaWNrPFByb3BzLCAnb25DbG9zZScgfCAnc3R5bGUnPiAmXG4gIFBpY2s8XG4gICAgRW1vamlQaWNrZXJQcm9wcyxcbiAgICAnb25DbGlja1NldHRpbmdzJyB8ICdvblBpY2tFbW9qaScgfCAnb25TZXRTa2luVG9uZSdcbiAgPiAmIHtcbiAgICByZWY6IFJlYWN0LlJlZjxIVE1MRGl2RWxlbWVudD47XG4gIH07XG5cbmV4cG9ydCB0eXBlIE93blByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBzZWxlY3RlZD86IHN0cmluZztcbiAgb25DbG9zZT86ICgpID0+IHVua25vd247XG4gIG9uUGljazogKGVtb2ppOiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uU2V0U2tpblRvbmU6ICh0b25lOiBudW1iZXIpID0+IHVua25vd247XG4gIG9wZW5DdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbD86ICgpID0+IHVua25vd247XG4gIHByZWZlcnJlZFJlYWN0aW9uRW1vamk6IEFycmF5PHN0cmluZz47XG4gIHJlbmRlckVtb2ppUGlja2VyOiAocHJvcHM6IFJlbmRlckVtb2ppUGlja2VyUHJvcHMpID0+IFJlYWN0LlJlYWN0RWxlbWVudDtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gT3duUHJvcHMgJiBQaWNrPFJlYWN0LkhUTUxQcm9wczxIVE1MRGl2RWxlbWVudD4sICdzdHlsZSc+O1xuXG5leHBvcnQgY29uc3QgUmVhY3Rpb25QaWNrZXIgPSBSZWFjdC5mb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBQcm9wcz4oXG4gIChcbiAgICB7XG4gICAgICBpMThuLFxuICAgICAgb25DbG9zZSxcbiAgICAgIG9uUGljayxcbiAgICAgIG9uU2V0U2tpblRvbmUsXG4gICAgICBvcGVuQ3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWwsXG4gICAgICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICAgICAgcmVuZGVyRW1vamlQaWNrZXIsXG4gICAgICBzZWxlY3RlZCxcbiAgICAgIHN0eWxlLFxuICAgIH0sXG4gICAgcmVmXG4gICkgPT4ge1xuICAgIGNvbnN0IFtwaWNraW5nT3RoZXIsIHNldFBpY2tpbmdPdGhlcl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG5cbiAgICAvLyBIYW5kbGUgZXNjYXBlIGtleVxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKG9uQ2xvc2UgJiYgZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcik7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKTtcbiAgICAgIH07XG4gICAgfSwgW29uQ2xvc2VdKTtcblxuICAgIC8vIEhhbmRsZSBFbW9qaVBpY2tlcjo6b25QaWNrRW1vamlcbiAgICBjb25zdCBvblBpY2tFbW9qaTogRW1vamlQaWNrZXJQcm9wc1snb25QaWNrRW1vamknXSA9IFJlYWN0LnVzZUNhbGxiYWNrKFxuICAgICAgKHsgc2hvcnROYW1lLCBza2luVG9uZTogcGlja2VkU2tpblRvbmUgfSkgPT4ge1xuICAgICAgICBvblBpY2soY29udmVydFNob3J0TmFtZShzaG9ydE5hbWUsIHBpY2tlZFNraW5Ub25lKSk7XG4gICAgICB9LFxuICAgICAgW29uUGlja11cbiAgICApO1xuXG4gICAgLy8gRm9jdXMgZmlyc3QgYnV0dG9uIGFuZCByZXN0b3JlIGZvY3VzIG9uIHVubW91bnRcbiAgICBjb25zdCBbZm9jdXNSZWZdID0gdXNlUmVzdG9yZUZvY3VzKCk7XG5cbiAgICBpZiAocGlja2luZ090aGVyKSB7XG4gICAgICByZXR1cm4gcmVuZGVyRW1vamlQaWNrZXIoe1xuICAgICAgICBvbkNsaWNrU2V0dGluZ3M6IG9wZW5DdXN0b21pemVQcmVmZXJyZWRSZWFjdGlvbnNNb2RhbCxcbiAgICAgICAgb25DbG9zZSxcbiAgICAgICAgb25QaWNrRW1vamksXG4gICAgICAgIG9uU2V0U2tpblRvbmUsXG4gICAgICAgIHJlZixcbiAgICAgICAgc3R5bGUsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBvdGhlclNlbGVjdGVkID1cbiAgICAgIHNlbGVjdGVkICYmICFwcmVmZXJyZWRSZWFjdGlvbkVtb2ppLmluY2x1ZGVzKHNlbGVjdGVkKTtcblxuICAgIGxldCBtb3JlQnV0dG9uOiBSZWFjdC5SZWFjdE5vZGU7XG4gICAgaWYgKG90aGVyU2VsZWN0ZWQpIHtcbiAgICAgIG1vcmVCdXR0b24gPSAoXG4gICAgICAgIDxSZWFjdGlvblBpY2tlclBpY2tlckVtb2ppQnV0dG9uXG4gICAgICAgICAgZW1vamk9e3NlbGVjdGVkfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIG9uUGljayhzZWxlY3RlZCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ1JlYWN0aW9ucy0tcmVtb3ZlJyl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3JlQnV0dG9uID0gKFxuICAgICAgICA8UmVhY3Rpb25QaWNrZXJQaWNrZXJNb3JlQnV0dG9uXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRQaWNraW5nT3RoZXIodHJ1ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBsb2dpYyBpcyBoZXJlIHRvIGF2b2lkIHNlbGVjdGluZyBkdXBsaWNhdGUgZW1vamkuXG4gICAgbGV0IGhhc1NlbGVjdGVkU29tZXRoaW5nID0gZmFsc2U7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0aW9uUGlja2VyUGlja2VyXG4gICAgICAgIGlzU29tZXRoaW5nU2VsZWN0ZWQ9e3R5cGVvZiBzZWxlY3RlZCA9PT0gJ251bWJlcid9XG4gICAgICAgIHBpY2tlclN0eWxlPXtSZWFjdGlvblBpY2tlclBpY2tlclN0eWxlLlBpY2tlcn1cbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgID5cbiAgICAgICAge3ByZWZlcnJlZFJlYWN0aW9uRW1vamkubWFwKChlbW9qaSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBtYXliZUZvY3VzUmVmID0gaW5kZXggPT09IDAgPyBmb2N1c1JlZiA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSAhaGFzU2VsZWN0ZWRTb21ldGhpbmcgJiYgZW1vamkgPT09IHNlbGVjdGVkO1xuICAgICAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICBoYXNTZWxlY3RlZFNvbWV0aGluZyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxSZWFjdGlvblBpY2tlclBpY2tlckVtb2ppQnV0dG9uXG4gICAgICAgICAgICAgIGVtb2ppPXtlbW9qaX1cbiAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aXNTZWxlY3RlZH1cbiAgICAgICAgICAgICAgLy8gVGhlIGluZGV4IGlzIHRoZSBvbmx5IHRoaW5nIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgZW1vamksIGJlY2F1c2VcbiAgICAgICAgICAgICAgLy8gICB0aGVyZSBjYW4gYmUgZHVwbGljYXRlcyBpbiB0aGUgbGlzdC5cbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgb25QaWNrKGVtb2ppKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcmVmPXttYXliZUZvY3VzUmVmfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgICAge21vcmVCdXR0b259XG4gICAgICA8L1JlYWN0aW9uUGlja2VyUGlja2VyPlxuICAgICk7XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsaUJBQWlDO0FBRWpDLDZCQUFnQztBQUVoQyxrQ0FLTztBQXVCQSxNQUFNLGlCQUFpQixNQUFNLFdBQ2xDLENBQ0U7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUVGLFFBQ0c7QUFDSCxRQUFNLENBQUMsY0FBYyxtQkFBbUIsTUFBTSxTQUFTLEtBQUs7QUFHNUQsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxVQUFVLHdCQUFDLE1BQXFCO0FBQ3BDLFVBQUksV0FBVyxFQUFFLFFBQVEsVUFBVTtBQUNqQyxnQkFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGLEdBSmdCO0FBTWhCLGFBQVMsaUJBQWlCLFdBQVcsT0FBTztBQUU1QyxXQUFPLE1BQU07QUFDWCxlQUFTLG9CQUFvQixXQUFXLE9BQU87QUFBQSxJQUNqRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUdaLFFBQU0sY0FBK0MsTUFBTSxZQUN6RCxDQUFDLEVBQUUsV0FBVyxVQUFVLHFCQUFxQjtBQUMzQyxXQUFPLGlDQUFpQixXQUFXLGNBQWMsQ0FBQztBQUFBLEVBQ3BELEdBQ0EsQ0FBQyxNQUFNLENBQ1Q7QUFHQSxRQUFNLENBQUMsWUFBWSw0Q0FBZ0I7QUFFbkMsTUFBSSxjQUFjO0FBQ2hCLFdBQU8sa0JBQWtCO0FBQUEsTUFDdkIsaUJBQWlCO0FBQUEsTUFDakI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sZ0JBQ0osWUFBWSxDQUFDLHVCQUF1QixTQUFTLFFBQVE7QUFFdkQsTUFBSTtBQUNKLE1BQUksZUFBZTtBQUNqQixpQkFDRSxvQ0FBQztBQUFBLE1BQ0MsT0FBTztBQUFBLE1BQ1AsU0FBUyxNQUFNO0FBQ2IsZUFBTyxRQUFRO0FBQUEsTUFDakI7QUFBQSxNQUNBLFlBQVU7QUFBQSxNQUNWLE9BQU8sS0FBSyxtQkFBbUI7QUFBQSxLQUNqQztBQUFBLEVBRUosT0FBTztBQUNMLGlCQUNFLG9DQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsU0FBUyxNQUFNO0FBQ2Isd0JBQWdCLElBQUk7QUFBQSxNQUN0QjtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBR0EsTUFBSSx1QkFBdUI7QUFFM0IsU0FDRSxvQ0FBQztBQUFBLElBQ0MscUJBQXFCLE9BQU8sYUFBYTtBQUFBLElBQ3pDLGFBQWEsc0RBQTBCO0FBQUEsSUFDdkM7QUFBQSxJQUNBO0FBQUEsS0FFQyx1QkFBdUIsSUFBSSxDQUFDLE9BQU8sVUFBVTtBQUM1QyxVQUFNLGdCQUFnQixVQUFVLElBQUksV0FBVztBQUUvQyxVQUFNLGFBQWEsQ0FBQyx3QkFBd0IsVUFBVTtBQUN0RCxRQUFJLFlBQVk7QUFDZCw2QkFBdUI7QUFBQSxJQUN6QjtBQUVBLFdBQ0Usb0NBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BSUEsS0FBSztBQUFBLE1BQ0wsU0FBUyxNQUFNO0FBQ2IsZUFBTyxLQUFLO0FBQUEsTUFDZDtBQUFBLE1BQ0EsS0FBSztBQUFBLEtBQ1A7QUFBQSxFQUVKLENBQUMsR0FDQSxVQUNIO0FBRUosQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
