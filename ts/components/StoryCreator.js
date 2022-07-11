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
var StoryCreator_exports = {};
__export(StoryCreator_exports, {
  StoryCreator: () => StoryCreator
});
module.exports = __toCommonJS(StoryCreator_exports);
var import_focus_trap_react = __toESM(require("focus-trap-react"));
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_react_popper = require("react-popper");
var import_Button = require("./Button");
var import_ContextMenu = require("./ContextMenu");
var import_LinkPreview = require("../types/LinkPreview");
var import_Input = require("./Input");
var import_Slider = require("./Slider");
var import_StagedLinkPreview = require("./conversation/StagedLinkPreview");
var import_TextAttachment = require("./TextAttachment");
var import_theme = require("../util/theme");
var import_color = require("../mediaEditor/util/color");
var import_getStoryBackground = require("../util/getStoryBackground");
var import_objectMap = require("../util/objectMap");
var TextStyle = /* @__PURE__ */ ((TextStyle2) => {
  TextStyle2[TextStyle2["Default"] = 0] = "Default";
  TextStyle2[TextStyle2["Regular"] = 1] = "Regular";
  TextStyle2[TextStyle2["Bold"] = 2] = "Bold";
  TextStyle2[TextStyle2["Serif"] = 3] = "Serif";
  TextStyle2[TextStyle2["Script"] = 4] = "Script";
  TextStyle2[TextStyle2["Condensed"] = 5] = "Condensed";
  return TextStyle2;
})(TextStyle || {});
var TextBackground = /* @__PURE__ */ ((TextBackground2) => {
  TextBackground2[TextBackground2["None"] = 0] = "None";
  TextBackground2[TextBackground2["Background"] = 1] = "Background";
  TextBackground2[TextBackground2["Inverse"] = 2] = "Inverse";
  return TextBackground2;
})(TextBackground || {});
const BackgroundStyle = {
  BG1099: { angle: 191, endColor: 4282529679, startColor: 4294260804 },
  BG1098: { startColor: 4293938406, endColor: 4279119837, angle: 192 },
  BG1031: { startColor: 4294950980, endColor: 4294859832, angle: 175 },
  BG1101: { startColor: 4278227945, endColor: 4286632135, angle: 180 },
  BG1100: { startColor: 4284861868, endColor: 4278884698, angle: 180 },
  BG1070: { color: 4294951251 },
  BG1080: { color: 4291607859 },
  BG1079: { color: 4286869806 },
  BG1083: { color: 4278825851 },
  BG1095: { color: 4287335417 },
  BG1088: { color: 4283519478 },
  BG1077: { color: 4294405742 },
  BG1094: { color: 4291315265 },
  BG1097: { color: 4291216549 },
  BG1074: { color: 4288976277 },
  BG1092: { color: 4280887593 }
};
function getBackground(bgStyle) {
  if ((0, import_lodash.has)(bgStyle, "color")) {
    return { color: (0, import_lodash.get)(bgStyle, "color") };
  }
  const angle = (0, import_lodash.get)(bgStyle, "angle");
  const startColor = (0, import_lodash.get)(bgStyle, "startColor");
  const endColor = (0, import_lodash.get)(bgStyle, "endColor");
  return {
    gradient: { angle, startColor, endColor }
  };
}
const StoryCreator = /* @__PURE__ */ __name(({
  debouncedMaybeGrabLinkPreview,
  i18n,
  linkPreview,
  onClose,
  onNext
}) => {
  const [isEditingText, setIsEditingText] = (0, import_react.useState)(false);
  const [selectedBackground, setSelectedBackground] = (0, import_react.useState)(BackgroundStyle.BG1099);
  const [textStyle, setTextStyle] = (0, import_react.useState)(1 /* Regular */);
  const [textBackground, setTextBackground] = (0, import_react.useState)(0 /* None */);
  const [sliderValue, setSliderValue] = (0, import_react.useState)(0);
  const [text, setText] = (0, import_react.useState)("");
  const textEditorRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (isEditingText) {
      textEditorRef.current?.focus();
    } else {
      textEditorRef.current?.blur();
    }
  }, [isEditingText]);
  const [isColorPickerShowing, setIsColorPickerShowing] = (0, import_react.useState)(false);
  const [colorPickerPopperButtonRef, setColorPickerPopperButtonRef] = (0, import_react.useState)(null);
  const [colorPickerPopperRef, setColorPickerPopperRef] = (0, import_react.useState)(null);
  const colorPickerPopper = (0, import_react_popper.usePopper)(colorPickerPopperButtonRef, colorPickerPopperRef, {
    modifiers: [
      {
        name: "arrow"
      }
    ],
    placement: "top",
    strategy: "fixed"
  });
  const [hasLinkPreviewApplied, setHasLinkPreviewApplied] = (0, import_react.useState)(false);
  const [linkPreviewInputValue, setLinkPreviewInputValue] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    if (!linkPreviewInputValue) {
      return;
    }
    debouncedMaybeGrabLinkPreview(linkPreviewInputValue, import_LinkPreview.LinkPreviewSourceType.StoryCreator);
  }, [debouncedMaybeGrabLinkPreview, linkPreviewInputValue]);
  (0, import_react.useEffect)(() => {
    if (!text) {
      return;
    }
    debouncedMaybeGrabLinkPreview(text, import_LinkPreview.LinkPreviewSourceType.StoryCreator);
  }, [debouncedMaybeGrabLinkPreview, text]);
  (0, import_react.useEffect)(() => {
    if (!linkPreview || !text) {
      return;
    }
    const links = (0, import_LinkPreview.findLinks)(text);
    const shouldApplyLinkPreview = links.includes(linkPreview.url);
    setHasLinkPreviewApplied(shouldApplyLinkPreview);
  }, [linkPreview, text]);
  const [isLinkPreviewInputShowing, setIsLinkPreviewInputShowing] = (0, import_react.useState)(false);
  const [linkPreviewInputPopperButtonRef, setLinkPreviewInputPopperButtonRef] = (0, import_react.useState)(null);
  const [linkPreviewInputPopperRef, setLinkPreviewInputPopperRef] = (0, import_react.useState)(null);
  const linkPreviewInputPopper = (0, import_react_popper.usePopper)(linkPreviewInputPopperButtonRef, linkPreviewInputPopperRef, {
    modifiers: [
      {
        name: "arrow"
      }
    ],
    placement: "top",
    strategy: "fixed"
  });
  (0, import_react.useEffect)(() => {
    const handleOutsideClick = /* @__PURE__ */ __name((event) => {
      if (!colorPickerPopperButtonRef?.contains(event.target)) {
        setIsColorPickerShowing(false);
        event.stopPropagation();
        event.preventDefault();
      }
    }, "handleOutsideClick");
    const handleEscape = /* @__PURE__ */ __name((event) => {
      if (event.key === "Escape") {
        setIsColorPickerShowing(false);
        event.preventDefault();
        event.stopPropagation();
      }
    }, "handleEscape");
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isColorPickerShowing, colorPickerPopperButtonRef]);
  const sliderColorNumber = (0, import_color.getRGBANumber)(sliderValue);
  let textForegroundColor = sliderColorNumber;
  let textBackgroundColor;
  if (textBackground === 1 /* Background */) {
    textBackgroundColor = import_getStoryBackground.COLOR_WHITE_INT;
    textForegroundColor = sliderValue >= 95 ? import_getStoryBackground.COLOR_BLACK_INT : sliderColorNumber;
  } else if (textBackground === 2 /* Inverse */) {
    textBackgroundColor = sliderValue >= 95 ? import_getStoryBackground.COLOR_BLACK_INT : sliderColorNumber;
    textForegroundColor = import_getStoryBackground.COLOR_WHITE_INT;
  }
  return /* @__PURE__ */ import_react.default.createElement(import_focus_trap_react.default, {
    focusTrapOptions: { allowOutsideClick: true }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__container"
  }, /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
    i18n,
    isEditingText,
    onChange: setText,
    textAttachment: {
      ...getBackground(selectedBackground),
      text,
      textStyle,
      textForegroundColor,
      textBackgroundColor,
      preview: hasLinkPreviewApplied ? linkPreview : void 0
    }
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__toolbar"
  }, isEditingText ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__tools"
  }, /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
    handleStyle: { backgroundColor: (0, import_color.getRGBA)(sliderValue) },
    label: i18n("CustomColorEditor__hue"),
    moduleClassName: "HueSlider StoryCreator__tools__tool",
    onChange: setSliderValue,
    value: sliderValue
  }), /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenu, {
    buttonClassName: (0, import_classnames.default)("StoryCreator__tools__tool", {
      "StoryCreator__tools__button--font-regular": textStyle === 1 /* Regular */,
      "StoryCreator__tools__button--font-bold": textStyle === 2 /* Bold */,
      "StoryCreator__tools__button--font-serif": textStyle === 3 /* Serif */,
      "StoryCreator__tools__button--font-script": textStyle === 4 /* Script */,
      "StoryCreator__tools__button--font-condensed": textStyle === 5 /* Condensed */
    }),
    i18n,
    menuOptions: [
      {
        icon: "StoryCreator__icon--font-regular",
        label: i18n("StoryCreator__text--regular"),
        onClick: () => setTextStyle(1 /* Regular */),
        value: 1 /* Regular */
      },
      {
        icon: "StoryCreator__icon--font-bold",
        label: i18n("StoryCreator__text--bold"),
        onClick: () => setTextStyle(2 /* Bold */),
        value: 2 /* Bold */
      },
      {
        icon: "StoryCreator__icon--font-serif",
        label: i18n("StoryCreator__text--serif"),
        onClick: () => setTextStyle(3 /* Serif */),
        value: 3 /* Serif */
      },
      {
        icon: "StoryCreator__icon--font-script",
        label: i18n("StoryCreator__text--script"),
        onClick: () => setTextStyle(4 /* Script */),
        value: 4 /* Script */
      },
      {
        icon: "StoryCreator__icon--font-condensed",
        label: i18n("StoryCreator__text--condensed"),
        onClick: () => setTextStyle(5 /* Condensed */),
        value: 5 /* Condensed */
      }
    ],
    theme: import_theme.Theme.Dark,
    value: textStyle
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("StoryCreator__text-bg"),
    className: (0, import_classnames.default)("StoryCreator__tools__tool", {
      "StoryCreator__tools__button--bg-none": textBackground === 0 /* None */,
      "StoryCreator__tools__button--bg": textBackground === 1 /* Background */,
      "StoryCreator__tools__button--bg-inverse": textBackground === 2 /* Inverse */
    }),
    onClick: () => {
      if (textBackground === 0 /* None */) {
        setTextBackground(1 /* Background */);
      } else if (textBackground === 1 /* Background */) {
        setTextBackground(2 /* Inverse */);
      } else {
        setTextBackground(0 /* None */);
      }
    },
    type: "button"
  })) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__toolbar--space"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__toolbar--buttons"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClose,
    theme: import_theme.Theme.Dark,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("discard")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__controls"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("StoryCreator__story-bg"),
    className: (0, import_classnames.default)({
      StoryCreator__control: true,
      "StoryCreator__control--bg": true,
      "StoryCreator__control--bg--selected": isColorPickerShowing
    }),
    onClick: () => setIsColorPickerShowing(!isColorPickerShowing),
    ref: setColorPickerPopperButtonRef,
    style: {
      background: (0, import_getStoryBackground.getBackgroundColor)(getBackground(selectedBackground))
    },
    type: "button"
  }), isColorPickerShowing && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__popper",
    ref: setColorPickerPopperRef,
    style: colorPickerPopper.styles.popper,
    ...colorPickerPopper.attributes.popper
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    "data-popper-arrow": true,
    className: "StoryCreator__popper__arrow"
  }), (0, import_objectMap.objectMap)(BackgroundStyle, (bg, backgroundValue) => /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("StoryCreator__story-bg"),
    className: (0, import_classnames.default)({
      StoryCreator__bg: true,
      "StoryCreator__bg--selected": selectedBackground === backgroundValue
    }),
    key: String(bg),
    onClick: () => {
      setSelectedBackground(backgroundValue);
      setIsColorPickerShowing(false);
    },
    type: "button",
    style: {
      background: (0, import_getStoryBackground.getBackgroundColor)(getBackground(backgroundValue))
    }
  }))), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("StoryCreator__control--draw"),
    className: (0, import_classnames.default)({
      StoryCreator__control: true,
      "StoryCreator__control--text": true,
      "StoryCreator__control--selected": isEditingText
    }),
    onClick: () => {
      setIsEditingText(!isEditingText);
    },
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("StoryCreator__control--link"),
    className: "StoryCreator__control StoryCreator__control--link",
    onClick: () => setIsLinkPreviewInputShowing(!isLinkPreviewInputShowing),
    ref: setLinkPreviewInputPopperButtonRef,
    type: "button"
  }), isLinkPreviewInputShowing && /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("StoryCreator__popper StoryCreator__link-preview-input-popper", (0, import_theme.themeClassName)(import_theme.Theme.Dark)),
    ref: setLinkPreviewInputPopperRef,
    style: linkPreviewInputPopper.styles.popper,
    ...linkPreviewInputPopper.attributes.popper
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    "data-popper-arrow": true,
    className: "StoryCreator__popper__arrow"
  }), /* @__PURE__ */ import_react.default.createElement(import_Input.Input, {
    disableSpellcheck: true,
    i18n,
    moduleClassName: "StoryCreator__link-preview-input",
    onChange: setLinkPreviewInputValue,
    placeholder: i18n("StoryCreator__link-preview-placeholder"),
    ref: (el) => el?.focus(),
    value: linkPreviewInputValue
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__link-preview-container"
  }, linkPreview ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_StagedLinkPreview.StagedLinkPreview, {
    domain: linkPreview.domain,
    i18n,
    image: linkPreview.image,
    moduleClassName: "StoryCreator__link-preview",
    title: linkPreview.title,
    url: linkPreview.url
  }), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    className: "StoryCreator__link-preview-button",
    onClick: () => {
      setHasLinkPreviewApplied(true);
      setIsLinkPreviewInputShowing(false);
    },
    theme: import_theme.Theme.Dark,
    variant: import_Button.ButtonVariant.Primary
  }, i18n("StoryCreator__add-link"))) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__link-preview-empty"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "StoryCreator__link-preview-empty__icon"
  }), i18n("StoryCreator__link-preview-empty"))))), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onNext,
    theme: import_theme.Theme.Dark,
    variant: import_Button.ButtonVariant.Primary
  }, i18n("StoryCreator__next"))))));
}, "StoryCreator");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoryCreator
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlDcmVhdG9yLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgRm9jdXNUcmFwIGZyb20gJ2ZvY3VzLXRyYXAtcmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZ2V0LCBoYXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlUG9wcGVyIH0gZnJvbSAncmVhY3QtcG9wcGVyJztcblxuaW1wb3J0IHR5cGUgeyBMaW5rUHJldmlld1R5cGUgfSBmcm9tICcuLi90eXBlcy9tZXNzYWdlL0xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgVGV4dEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5cbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IENvbnRleHRNZW51IH0gZnJvbSAnLi9Db250ZXh0TWVudSc7XG5pbXBvcnQgeyBMaW5rUHJldmlld1NvdXJjZVR5cGUsIGZpbmRMaW5rcyB9IGZyb20gJy4uL3R5cGVzL0xpbmtQcmV2aWV3JztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnLi9JbnB1dCc7XG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuL1NsaWRlcic7XG5pbXBvcnQgeyBTdGFnZWRMaW5rUHJldmlldyB9IGZyb20gJy4vY29udmVyc2F0aW9uL1N0YWdlZExpbmtQcmV2aWV3JztcbmltcG9ydCB7IFRleHRBdHRhY2htZW50IH0gZnJvbSAnLi9UZXh0QXR0YWNobWVudCc7XG5pbXBvcnQgeyBUaGVtZSwgdGhlbWVDbGFzc05hbWUgfSBmcm9tICcuLi91dGlsL3RoZW1lJztcbmltcG9ydCB7IGdldFJHQkEsIGdldFJHQkFOdW1iZXIgfSBmcm9tICcuLi9tZWRpYUVkaXRvci91dGlsL2NvbG9yJztcbmltcG9ydCB7XG4gIENPTE9SX0JMQUNLX0lOVCxcbiAgQ09MT1JfV0hJVEVfSU5ULFxuICBnZXRCYWNrZ3JvdW5kQ29sb3IsXG59IGZyb20gJy4uL3V0aWwvZ2V0U3RvcnlCYWNrZ3JvdW5kJztcbmltcG9ydCB7IG9iamVjdE1hcCB9IGZyb20gJy4uL3V0aWwvb2JqZWN0TWFwJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBkZWJvdW5jZWRNYXliZUdyYWJMaW5rUHJldmlldzogKFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBzb3VyY2U6IExpbmtQcmV2aWV3U291cmNlVHlwZVxuICApID0+IHVua25vd247XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGxpbmtQcmV2aWV3PzogTGlua1ByZXZpZXdUeXBlO1xuICBvbkNsb3NlOiAoKSA9PiB1bmtub3duO1xuICBvbk5leHQ6ICgpID0+IHVua25vd247XG59O1xuXG5lbnVtIFRleHRTdHlsZSB7XG4gIERlZmF1bHQsXG4gIFJlZ3VsYXIsXG4gIEJvbGQsXG4gIFNlcmlmLFxuICBTY3JpcHQsXG4gIENvbmRlbnNlZCxcbn1cblxuZW51bSBUZXh0QmFja2dyb3VuZCB7XG4gIE5vbmUsXG4gIEJhY2tncm91bmQsXG4gIEludmVyc2UsXG59XG5cbmNvbnN0IEJhY2tncm91bmRTdHlsZSA9IHtcbiAgQkcxMDk5OiB7IGFuZ2xlOiAxOTEsIGVuZENvbG9yOiA0MjgyNTI5Njc5LCBzdGFydENvbG9yOiA0Mjk0MjYwODA0IH0sXG4gIEJHMTA5ODogeyBzdGFydENvbG9yOiA0MjkzOTM4NDA2LCBlbmRDb2xvcjogNDI3OTExOTgzNywgYW5nbGU6IDE5MiB9LFxuICBCRzEwMzE6IHsgc3RhcnRDb2xvcjogNDI5NDk1MDk4MCwgZW5kQ29sb3I6IDQyOTQ4NTk4MzIsIGFuZ2xlOiAxNzUgfSxcbiAgQkcxMTAxOiB7IHN0YXJ0Q29sb3I6IDQyNzgyMjc5NDUsIGVuZENvbG9yOiA0Mjg2NjMyMTM1LCBhbmdsZTogMTgwIH0sXG4gIEJHMTEwMDogeyBzdGFydENvbG9yOiA0Mjg0ODYxODY4LCBlbmRDb2xvcjogNDI3ODg4NDY5OCwgYW5nbGU6IDE4MCB9LFxuICBCRzEwNzA6IHsgY29sb3I6IDQyOTQ5NTEyNTEgfSxcbiAgQkcxMDgwOiB7IGNvbG9yOiA0MjkxNjA3ODU5IH0sXG4gIEJHMTA3OTogeyBjb2xvcjogNDI4Njg2OTgwNiB9LFxuICBCRzEwODM6IHsgY29sb3I6IDQyNzg4MjU4NTEgfSxcbiAgQkcxMDk1OiB7IGNvbG9yOiA0Mjg3MzM1NDE3IH0sXG4gIEJHMTA4ODogeyBjb2xvcjogNDI4MzUxOTQ3OCB9LFxuICBCRzEwNzc6IHsgY29sb3I6IDQyOTQ0MDU3NDIgfSxcbiAgQkcxMDk0OiB7IGNvbG9yOiA0MjkxMzE1MjY1IH0sXG4gIEJHMTA5NzogeyBjb2xvcjogNDI5MTIxNjU0OSB9LFxuICBCRzEwNzQ6IHsgY29sb3I6IDQyODg5NzYyNzcgfSxcbiAgQkcxMDkyOiB7IGNvbG9yOiA0MjgwODg3NTkzIH0sXG59O1xuXG50eXBlIEJhY2tncm91bmRTdHlsZVR5cGUgPSB0eXBlb2YgQmFja2dyb3VuZFN0eWxlW2tleW9mIHR5cGVvZiBCYWNrZ3JvdW5kU3R5bGVdO1xuXG5mdW5jdGlvbiBnZXRCYWNrZ3JvdW5kKFxuICBiZ1N0eWxlOiBCYWNrZ3JvdW5kU3R5bGVUeXBlXG4pOiBQaWNrPFRleHRBdHRhY2htZW50VHlwZSwgJ2NvbG9yJyB8ICdncmFkaWVudCc+IHtcbiAgaWYgKGhhcyhiZ1N0eWxlLCAnY29sb3InKSkge1xuICAgIHJldHVybiB7IGNvbG9yOiBnZXQoYmdTdHlsZSwgJ2NvbG9yJykgfTtcbiAgfVxuXG4gIGNvbnN0IGFuZ2xlID0gZ2V0KGJnU3R5bGUsICdhbmdsZScpO1xuICBjb25zdCBzdGFydENvbG9yID0gZ2V0KGJnU3R5bGUsICdzdGFydENvbG9yJyk7XG4gIGNvbnN0IGVuZENvbG9yID0gZ2V0KGJnU3R5bGUsICdlbmRDb2xvcicpO1xuXG4gIHJldHVybiB7XG4gICAgZ3JhZGllbnQ6IHsgYW5nbGUsIHN0YXJ0Q29sb3IsIGVuZENvbG9yIH0sXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBTdG9yeUNyZWF0b3IgPSAoe1xuICBkZWJvdW5jZWRNYXliZUdyYWJMaW5rUHJldmlldyxcbiAgaTE4bixcbiAgbGlua1ByZXZpZXcsXG4gIG9uQ2xvc2UsXG4gIG9uTmV4dCxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW2lzRWRpdGluZ1RleHQsIHNldElzRWRpdGluZ1RleHRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0ZWRCYWNrZ3JvdW5kLCBzZXRTZWxlY3RlZEJhY2tncm91bmRdID1cbiAgICB1c2VTdGF0ZTxCYWNrZ3JvdW5kU3R5bGVUeXBlPihCYWNrZ3JvdW5kU3R5bGUuQkcxMDk5KTtcbiAgY29uc3QgW3RleHRTdHlsZSwgc2V0VGV4dFN0eWxlXSA9IHVzZVN0YXRlPFRleHRTdHlsZT4oVGV4dFN0eWxlLlJlZ3VsYXIpO1xuICBjb25zdCBbdGV4dEJhY2tncm91bmQsIHNldFRleHRCYWNrZ3JvdW5kXSA9IHVzZVN0YXRlPFRleHRCYWNrZ3JvdW5kPihcbiAgICBUZXh0QmFja2dyb3VuZC5Ob25lXG4gICk7XG4gIGNvbnN0IFtzbGlkZXJWYWx1ZSwgc2V0U2xpZGVyVmFsdWVdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW3RleHQsIHNldFRleHRdID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG5cbiAgY29uc3QgdGV4dEVkaXRvclJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNFZGl0aW5nVGV4dCkge1xuICAgICAgdGV4dEVkaXRvclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZXh0RWRpdG9yUmVmLmN1cnJlbnQ/LmJsdXIoKTtcbiAgICB9XG4gIH0sIFtpc0VkaXRpbmdUZXh0XSk7XG5cbiAgY29uc3QgW2lzQ29sb3JQaWNrZXJTaG93aW5nLCBzZXRJc0NvbG9yUGlja2VyU2hvd2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb2xvclBpY2tlclBvcHBlckJ1dHRvblJlZiwgc2V0Q29sb3JQaWNrZXJQb3BwZXJCdXR0b25SZWZdID1cbiAgICB1c2VTdGF0ZTxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbY29sb3JQaWNrZXJQb3BwZXJSZWYsIHNldENvbG9yUGlja2VyUG9wcGVyUmVmXSA9XG4gICAgdXNlU3RhdGU8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBjb2xvclBpY2tlclBvcHBlciA9IHVzZVBvcHBlcihcbiAgICBjb2xvclBpY2tlclBvcHBlckJ1dHRvblJlZixcbiAgICBjb2xvclBpY2tlclBvcHBlclJlZixcbiAgICB7XG4gICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdhcnJvdycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgIHN0cmF0ZWd5OiAnZml4ZWQnLFxuICAgIH1cbiAgKTtcblxuICBjb25zdCBbaGFzTGlua1ByZXZpZXdBcHBsaWVkLCBzZXRIYXNMaW5rUHJldmlld0FwcGxpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua1ByZXZpZXdJbnB1dFZhbHVlLCBzZXRMaW5rUHJldmlld0lucHV0VmFsdWVdID0gdXNlU3RhdGUoJycpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFsaW5rUHJldmlld0lucHV0VmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVib3VuY2VkTWF5YmVHcmFiTGlua1ByZXZpZXcoXG4gICAgICBsaW5rUHJldmlld0lucHV0VmFsdWUsXG4gICAgICBMaW5rUHJldmlld1NvdXJjZVR5cGUuU3RvcnlDcmVhdG9yXG4gICAgKTtcbiAgfSwgW2RlYm91bmNlZE1heWJlR3JhYkxpbmtQcmV2aWV3LCBsaW5rUHJldmlld0lucHV0VmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghdGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkZWJvdW5jZWRNYXliZUdyYWJMaW5rUHJldmlldyh0ZXh0LCBMaW5rUHJldmlld1NvdXJjZVR5cGUuU3RvcnlDcmVhdG9yKTtcbiAgfSwgW2RlYm91bmNlZE1heWJlR3JhYkxpbmtQcmV2aWV3LCB0ZXh0XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWxpbmtQcmV2aWV3IHx8ICF0ZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlua3MgPSBmaW5kTGlua3ModGV4dCk7XG5cbiAgICBjb25zdCBzaG91bGRBcHBseUxpbmtQcmV2aWV3ID0gbGlua3MuaW5jbHVkZXMobGlua1ByZXZpZXcudXJsKTtcbiAgICBzZXRIYXNMaW5rUHJldmlld0FwcGxpZWQoc2hvdWxkQXBwbHlMaW5rUHJldmlldyk7XG4gIH0sIFtsaW5rUHJldmlldywgdGV4dF0pO1xuXG4gIGNvbnN0IFtpc0xpbmtQcmV2aWV3SW5wdXRTaG93aW5nLCBzZXRJc0xpbmtQcmV2aWV3SW5wdXRTaG93aW5nXSA9XG4gICAgdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbGlua1ByZXZpZXdJbnB1dFBvcHBlckJ1dHRvblJlZiwgc2V0TGlua1ByZXZpZXdJbnB1dFBvcHBlckJ1dHRvblJlZl0gPVxuICAgIHVzZVN0YXRlPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5rUHJldmlld0lucHV0UG9wcGVyUmVmLCBzZXRMaW5rUHJldmlld0lucHV0UG9wcGVyUmVmXSA9XG4gICAgdXNlU3RhdGU8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBsaW5rUHJldmlld0lucHV0UG9wcGVyID0gdXNlUG9wcGVyKFxuICAgIGxpbmtQcmV2aWV3SW5wdXRQb3BwZXJCdXR0b25SZWYsXG4gICAgbGlua1ByZXZpZXdJbnB1dFBvcHBlclJlZixcbiAgICB7XG4gICAgICBtb2RpZmllcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdhcnJvdycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICAgIHN0cmF0ZWd5OiAnZml4ZWQnLFxuICAgIH1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgaWYgKCFjb2xvclBpY2tlclBvcHBlckJ1dHRvblJlZj8uY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICAgIHNldElzQ29sb3JQaWNrZXJTaG93aW5nKGZhbHNlKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgIHNldElzQ29sb3JQaWNrZXJTaG93aW5nKGZhbHNlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlRXNjYXBlKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlRXNjYXBlKTtcbiAgICB9O1xuICB9LCBbaXNDb2xvclBpY2tlclNob3dpbmcsIGNvbG9yUGlja2VyUG9wcGVyQnV0dG9uUmVmXSk7XG5cbiAgY29uc3Qgc2xpZGVyQ29sb3JOdW1iZXIgPSBnZXRSR0JBTnVtYmVyKHNsaWRlclZhbHVlKTtcblxuICBsZXQgdGV4dEZvcmVncm91bmRDb2xvciA9IHNsaWRlckNvbG9yTnVtYmVyO1xuICBsZXQgdGV4dEJhY2tncm91bmRDb2xvcjogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIGlmICh0ZXh0QmFja2dyb3VuZCA9PT0gVGV4dEJhY2tncm91bmQuQmFja2dyb3VuZCkge1xuICAgIHRleHRCYWNrZ3JvdW5kQ29sb3IgPSBDT0xPUl9XSElURV9JTlQ7XG4gICAgdGV4dEZvcmVncm91bmRDb2xvciA9XG4gICAgICBzbGlkZXJWYWx1ZSA+PSA5NSA/IENPTE9SX0JMQUNLX0lOVCA6IHNsaWRlckNvbG9yTnVtYmVyO1xuICB9IGVsc2UgaWYgKHRleHRCYWNrZ3JvdW5kID09PSBUZXh0QmFja2dyb3VuZC5JbnZlcnNlKSB7XG4gICAgdGV4dEJhY2tncm91bmRDb2xvciA9XG4gICAgICBzbGlkZXJWYWx1ZSA+PSA5NSA/IENPTE9SX0JMQUNLX0lOVCA6IHNsaWRlckNvbG9yTnVtYmVyO1xuICAgIHRleHRGb3JlZ3JvdW5kQ29sb3IgPSBDT0xPUl9XSElURV9JTlQ7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxGb2N1c1RyYXAgZm9jdXNUcmFwT3B0aW9ucz17eyBhbGxvd091dHNpZGVDbGljazogdHJ1ZSB9fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yX19jb250YWluZXJcIj5cbiAgICAgICAgICA8VGV4dEF0dGFjaG1lbnRcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpc0VkaXRpbmdUZXh0PXtpc0VkaXRpbmdUZXh0fVxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFRleHR9XG4gICAgICAgICAgICB0ZXh0QXR0YWNobWVudD17e1xuICAgICAgICAgICAgICAuLi5nZXRCYWNrZ3JvdW5kKHNlbGVjdGVkQmFja2dyb3VuZCksXG4gICAgICAgICAgICAgIHRleHQsXG4gICAgICAgICAgICAgIHRleHRTdHlsZSxcbiAgICAgICAgICAgICAgdGV4dEZvcmVncm91bmRDb2xvcixcbiAgICAgICAgICAgICAgdGV4dEJhY2tncm91bmRDb2xvcixcbiAgICAgICAgICAgICAgcHJldmlldzogaGFzTGlua1ByZXZpZXdBcHBsaWVkID8gbGlua1ByZXZpZXcgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Q3JlYXRvcl9fdG9vbGJhclwiPlxuICAgICAgICAgIHtpc0VkaXRpbmdUZXh0ID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeUNyZWF0b3JfX3Rvb2xzXCI+XG4gICAgICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgICAgICBoYW5kbGVTdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGdldFJHQkEoc2xpZGVyVmFsdWUpIH19XG4gICAgICAgICAgICAgICAgbGFiZWw9e2kxOG4oJ0N1c3RvbUNvbG9yRWRpdG9yX19odWUnKX1cbiAgICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJIdWVTbGlkZXIgU3RvcnlDcmVhdG9yX190b29sc19fdG9vbFwiXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFNsaWRlclZhbHVlfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtzbGlkZXJWYWx1ZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPENvbnRleHRNZW51XG4gICAgICAgICAgICAgICAgYnV0dG9uQ2xhc3NOYW1lPXtjbGFzc05hbWVzKCdTdG9yeUNyZWF0b3JfX3Rvb2xzX190b29sJywge1xuICAgICAgICAgICAgICAgICAgJ1N0b3J5Q3JlYXRvcl9fdG9vbHNfX2J1dHRvbi0tZm9udC1yZWd1bGFyJzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dFN0eWxlID09PSBUZXh0U3R5bGUuUmVndWxhcixcbiAgICAgICAgICAgICAgICAgICdTdG9yeUNyZWF0b3JfX3Rvb2xzX19idXR0b24tLWZvbnQtYm9sZCc6XG4gICAgICAgICAgICAgICAgICAgIHRleHRTdHlsZSA9PT0gVGV4dFN0eWxlLkJvbGQsXG4gICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX190b29sc19fYnV0dG9uLS1mb250LXNlcmlmJzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dFN0eWxlID09PSBUZXh0U3R5bGUuU2VyaWYsXG4gICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX190b29sc19fYnV0dG9uLS1mb250LXNjcmlwdCc6XG4gICAgICAgICAgICAgICAgICAgIHRleHRTdHlsZSA9PT0gVGV4dFN0eWxlLlNjcmlwdCxcbiAgICAgICAgICAgICAgICAgICdTdG9yeUNyZWF0b3JfX3Rvb2xzX19idXR0b24tLWZvbnQtY29uZGVuc2VkJzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dFN0eWxlID09PSBUZXh0U3R5bGUuQ29uZGVuc2VkLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgbWVudU9wdGlvbnM9e1tcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ1N0b3J5Q3JlYXRvcl9faWNvbi0tZm9udC1yZWd1bGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ1N0b3J5Q3JlYXRvcl9fdGV4dC0tcmVndWxhcicpLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBzZXRUZXh0U3R5bGUoVGV4dFN0eWxlLlJlZ3VsYXIpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogVGV4dFN0eWxlLlJlZ3VsYXIsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpY29uOiAnU3RvcnlDcmVhdG9yX19pY29uLS1mb250LWJvbGQnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogaTE4bignU3RvcnlDcmVhdG9yX190ZXh0LS1ib2xkJyksXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHNldFRleHRTdHlsZShUZXh0U3R5bGUuQm9sZCksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBUZXh0U3R5bGUuQm9sZCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGljb246ICdTdG9yeUNyZWF0b3JfX2ljb24tLWZvbnQtc2VyaWYnLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogaTE4bignU3RvcnlDcmVhdG9yX190ZXh0LS1zZXJpZicpLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBzZXRUZXh0U3R5bGUoVGV4dFN0eWxlLlNlcmlmKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFRleHRTdHlsZS5TZXJpZixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGljb246ICdTdG9yeUNyZWF0b3JfX2ljb24tLWZvbnQtc2NyaXB0JyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ1N0b3J5Q3JlYXRvcl9fdGV4dC0tc2NyaXB0JyksXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHNldFRleHRTdHlsZShUZXh0U3R5bGUuU2NyaXB0KSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFRleHRTdHlsZS5TY3JpcHQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpY29uOiAnU3RvcnlDcmVhdG9yX19pY29uLS1mb250LWNvbmRlbnNlZCcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpMThuKCdTdG9yeUNyZWF0b3JfX3RleHQtLWNvbmRlbnNlZCcpLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBzZXRUZXh0U3R5bGUoVGV4dFN0eWxlLkNvbmRlbnNlZCksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBUZXh0U3R5bGUuQ29uZGVuc2VkLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0ZXh0U3R5bGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdTdG9yeUNyZWF0b3JfX3RleHQtYmcnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ1N0b3J5Q3JlYXRvcl9fdG9vbHNfX3Rvb2wnLCB7XG4gICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX190b29sc19fYnV0dG9uLS1iZy1ub25lJzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dEJhY2tncm91bmQgPT09IFRleHRCYWNrZ3JvdW5kLk5vbmUsXG4gICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX190b29sc19fYnV0dG9uLS1iZyc6XG4gICAgICAgICAgICAgICAgICAgIHRleHRCYWNrZ3JvdW5kID09PSBUZXh0QmFja2dyb3VuZC5CYWNrZ3JvdW5kLFxuICAgICAgICAgICAgICAgICAgJ1N0b3J5Q3JlYXRvcl9fdG9vbHNfX2J1dHRvbi0tYmctaW52ZXJzZSc6XG4gICAgICAgICAgICAgICAgICAgIHRleHRCYWNrZ3JvdW5kID09PSBUZXh0QmFja2dyb3VuZC5JbnZlcnNlLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICh0ZXh0QmFja2dyb3VuZCA9PT0gVGV4dEJhY2tncm91bmQuTm9uZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUZXh0QmFja2dyb3VuZChUZXh0QmFja2dyb3VuZC5CYWNrZ3JvdW5kKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4dEJhY2tncm91bmQgPT09IFRleHRCYWNrZ3JvdW5kLkJhY2tncm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGV4dEJhY2tncm91bmQoVGV4dEJhY2tncm91bmQuSW52ZXJzZSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUZXh0QmFja2dyb3VuZChUZXh0QmFja2dyb3VuZC5Ob25lKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yX190b29sYmFyLS1zcGFjZVwiIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Q3JlYXRvcl9fdG9vbGJhci0tYnV0dG9uc1wiPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICB0aGVtZT17VGhlbWUuRGFya31cbiAgICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5TZWNvbmRhcnl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpMThuKCdkaXNjYXJkJyl9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yX19jb250cm9sc1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignU3RvcnlDcmVhdG9yX19zdG9yeS1iZycpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgICBTdG9yeUNyZWF0b3JfX2NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX19jb250cm9sLS1iZyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX19jb250cm9sLS1iZy0tc2VsZWN0ZWQnOiBpc0NvbG9yUGlja2VyU2hvd2luZyxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NvbG9yUGlja2VyU2hvd2luZyghaXNDb2xvclBpY2tlclNob3dpbmcpfVxuICAgICAgICAgICAgICAgIHJlZj17c2V0Q29sb3JQaWNrZXJQb3BwZXJCdXR0b25SZWZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGdldEJhY2tncm91bmRDb2xvcihcbiAgICAgICAgICAgICAgICAgICAgZ2V0QmFja2dyb3VuZChzZWxlY3RlZEJhY2tncm91bmQpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtpc0NvbG9yUGlja2VyU2hvd2luZyAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yX19wb3BwZXJcIlxuICAgICAgICAgICAgICAgICAgcmVmPXtzZXRDb2xvclBpY2tlclBvcHBlclJlZn1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXtjb2xvclBpY2tlclBvcHBlci5zdHlsZXMucG9wcGVyfVxuICAgICAgICAgICAgICAgICAgey4uLmNvbG9yUGlja2VyUG9wcGVyLmF0dHJpYnV0ZXMucG9wcGVyfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1wb3BwZXItYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yX19wb3BwZXJfX2Fycm93XCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7b2JqZWN0TWFwPEJhY2tncm91bmRTdHlsZVR5cGU+KFxuICAgICAgICAgICAgICAgICAgICBCYWNrZ3JvdW5kU3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIChiZywgYmFja2dyb3VuZFZhbHVlKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignU3RvcnlDcmVhdG9yX19zdG9yeS1iZycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgU3RvcnlDcmVhdG9yX19iZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ1N0b3J5Q3JlYXRvcl9fYmctLXNlbGVjdGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEJhY2tncm91bmQgPT09IGJhY2tncm91bmRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtTdHJpbmcoYmcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEJhY2tncm91bmQoYmFja2dyb3VuZFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNDb2xvclBpY2tlclNob3dpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZ2V0QmFja2dyb3VuZENvbG9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEJhY2tncm91bmQoYmFja2dyb3VuZFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignU3RvcnlDcmVhdG9yX19jb250cm9sLS1kcmF3Jyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgIFN0b3J5Q3JlYXRvcl9fY29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICdTdG9yeUNyZWF0b3JfX2NvbnRyb2wtLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgJ1N0b3J5Q3JlYXRvcl9fY29udHJvbC0tc2VsZWN0ZWQnOiBpc0VkaXRpbmdUZXh0LFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldElzRWRpdGluZ1RleHQoIWlzRWRpdGluZ1RleHQpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdTdG9yeUNyZWF0b3JfX2NvbnRyb2wtLWxpbmsnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJTdG9yeUNyZWF0b3JfX2NvbnRyb2wgU3RvcnlDcmVhdG9yX19jb250cm9sLS1saW5rXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgc2V0SXNMaW5rUHJldmlld0lucHV0U2hvd2luZyghaXNMaW5rUHJldmlld0lucHV0U2hvd2luZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVmPXtzZXRMaW5rUHJldmlld0lucHV0UG9wcGVyQnV0dG9uUmVmfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7aXNMaW5rUHJldmlld0lucHV0U2hvd2luZyAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAnU3RvcnlDcmVhdG9yX19wb3BwZXIgU3RvcnlDcmVhdG9yX19saW5rLXByZXZpZXctaW5wdXQtcG9wcGVyJyxcbiAgICAgICAgICAgICAgICAgICAgdGhlbWVDbGFzc05hbWUoVGhlbWUuRGFyaylcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICByZWY9e3NldExpbmtQcmV2aWV3SW5wdXRQb3BwZXJSZWZ9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17bGlua1ByZXZpZXdJbnB1dFBvcHBlci5zdHlsZXMucG9wcGVyfVxuICAgICAgICAgICAgICAgICAgey4uLmxpbmtQcmV2aWV3SW5wdXRQb3BwZXIuYXR0cmlidXRlcy5wb3BwZXJ9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBkYXRhLXBvcHBlci1hcnJvd1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJTdG9yeUNyZWF0b3JfX3BvcHBlcl9fYXJyb3dcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlU3BlbGxjaGVja1xuICAgICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJTdG9yeUNyZWF0b3JfX2xpbmstcHJldmlldy1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRMaW5rUHJldmlld0lucHV0VmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpMThuKCdTdG9yeUNyZWF0b3JfX2xpbmstcHJldmlldy1wbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgICAgICAgICByZWY9e2VsID0+IGVsPy5mb2N1cygpfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGlua1ByZXZpZXdJbnB1dFZhbHVlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiU3RvcnlDcmVhdG9yX19saW5rLXByZXZpZXctY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsaW5rUHJldmlldyA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWdlZExpbmtQcmV2aWV3XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRvbWFpbj17bGlua1ByZXZpZXcuZG9tYWlufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZT17bGlua1ByZXZpZXcuaW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlN0b3J5Q3JlYXRvcl9fbGluay1wcmV2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2xpbmtQcmV2aWV3LnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw9e2xpbmtQcmV2aWV3LnVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlN0b3J5Q3JlYXRvcl9fbGluay1wcmV2aWV3LWJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRIYXNMaW5rUHJldmlld0FwcGxpZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNMaW5rUHJldmlld0lucHV0U2hvd2luZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlByaW1hcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpMThuKCdTdG9yeUNyZWF0b3JfX2FkZC1saW5rJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Q3JlYXRvcl9fbGluay1wcmV2aWV3LWVtcHR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5Q3JlYXRvcl9fbGluay1wcmV2aWV3LWVtcHR5X19pY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpMThuKCdTdG9yeUNyZWF0b3JfX2xpbmstcHJldmlldy1lbXB0eScpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25OZXh0fVxuICAgICAgICAgICAgICB0aGVtZT17VGhlbWUuRGFya31cbiAgICAgICAgICAgICAgdmFyaWFudD17QnV0dG9uVmFyaWFudC5QcmltYXJ5fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aTE4bignU3RvcnlDcmVhdG9yX19uZXh0Jyl9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L0ZvY3VzVHJhcD5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFB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
