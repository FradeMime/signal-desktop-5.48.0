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
var MediaEditor_exports = {};
__export(MediaEditor_exports, {
  MediaEditor: () => MediaEditor
});
module.exports = __toCommonJS(MediaEditor_exports);
var import_react_measure = __toESM(require("react-measure"));
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_dom = require("react-dom");
var import_fabric = require("fabric");
var import_lodash = require("lodash");
var log = __toESM(require("../logging/log"));
var import_Button = require("./Button");
var import_ContextMenu = require("./ContextMenu");
var import_Slider = require("./Slider");
var import_StickerButton = require("./stickers/StickerButton");
var import_theme = require("../util/theme");
var import_canvasToBytes = require("../util/canvasToBytes");
var import_useFabricHistory = require("../mediaEditor/useFabricHistory");
var import_usePortal = require("../hooks/usePortal");
var import_useUniqueId = require("../hooks/useUniqueId");
var import_MediaEditorFabricPencilBrush = require("../mediaEditor/MediaEditorFabricPencilBrush");
var import_MediaEditorFabricCropRect = require("../mediaEditor/MediaEditorFabricCropRect");
var import_MediaEditorFabricIText = require("../mediaEditor/MediaEditorFabricIText");
var import_MediaEditorFabricSticker = require("../mediaEditor/MediaEditorFabricSticker");
var import_fabricEffectListener = require("../mediaEditor/fabricEffectListener");
var import_color = require("../mediaEditor/util/color");
var import_getTextStyleAttributes = require("../mediaEditor/util/getTextStyleAttributes");
const INITIAL_IMAGE_STATE = {
  angle: 0,
  cropX: 0,
  cropY: 0,
  flipX: false,
  flipY: false,
  height: 0,
  width: 0
};
var EditMode = /* @__PURE__ */ ((EditMode2) => {
  EditMode2["Crop"] = "Crop";
  EditMode2["Draw"] = "Draw";
  EditMode2["Text"] = "Text";
  return EditMode2;
})(EditMode || {});
var DrawWidth = /* @__PURE__ */ ((DrawWidth2) => {
  DrawWidth2[DrawWidth2["Thin"] = 2] = "Thin";
  DrawWidth2[DrawWidth2["Regular"] = 4] = "Regular";
  DrawWidth2[DrawWidth2["Medium"] = 12] = "Medium";
  DrawWidth2[DrawWidth2["Heavy"] = 24] = "Heavy";
  return DrawWidth2;
})(DrawWidth || {});
var DrawTool = /* @__PURE__ */ ((DrawTool2) => {
  DrawTool2["Pen"] = "Pen";
  DrawTool2["Highlighter"] = "Highlighter";
  return DrawTool2;
})(DrawTool || {});
function isCmdOrCtrl(ev) {
  const { ctrlKey, metaKey } = ev;
  const commandKey = (0, import_lodash.get)(window, "platform") === "darwin" && metaKey;
  const controlKey = (0, import_lodash.get)(window, "platform") !== "darwin" && ctrlKey;
  return commandKey || controlKey;
}
const MediaEditor = /* @__PURE__ */ __name(({
  i18n,
  imageSrc,
  onClose,
  onDone,
  installedPacks,
  recentStickers
}) => {
  const [fabricCanvas, setFabricCanvas] = (0, import_react.useState)();
  const [image, setImage] = (0, import_react.useState)(new Image());
  const canvasId = (0, import_useUniqueId.useUniqueId)();
  const [imageState, setImageState] = (0, import_react.useState)(INITIAL_IMAGE_STATE);
  const { canRedo, canUndo, redoIfPossible, takeSnapshot, undoIfPossible } = (0, import_useFabricHistory.useFabricHistory)({
    fabricCanvas,
    imageState,
    setImageState
  });
  (0, import_react.useEffect)(() => {
    if (fabricCanvas) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImage(img);
      const canvas = new import_fabric.fabric.Canvas(canvasId);
      canvas.selection = false;
      setFabricCanvas(canvas);
      const newImageState = {
        ...INITIAL_IMAGE_STATE,
        height: img.height,
        width: img.width
      };
      setImageState(newImageState);
      takeSnapshot("initial state", newImageState, canvas);
    };
    img.onerror = () => {
      log.error("<MediaEditor>: image failed to load. Closing");
      onClose();
    };
    img.src = imageSrc;
    return () => {
      img.onload = import_lodash.noop;
      img.onerror = import_lodash.noop;
    };
  }, [canvasId, fabricCanvas, imageSrc, onClose, takeSnapshot]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return import_lodash.noop;
    }
    const globalShortcuts = [
      [
        (ev) => isCmdOrCtrl(ev) && ev.key === "c",
        () => setEditMode("Crop" /* Crop */)
      ],
      [
        (ev) => isCmdOrCtrl(ev) && ev.key === "d",
        () => setEditMode("Draw" /* Draw */)
      ],
      [
        (ev) => isCmdOrCtrl(ev) && ev.key === "t",
        () => setEditMode("Text" /* Text */)
      ],
      [(ev) => isCmdOrCtrl(ev) && ev.key === "z", undoIfPossible],
      [(ev) => isCmdOrCtrl(ev) && ev.shiftKey && ev.key === "z", redoIfPossible],
      [
        (ev) => ev.key === "Escape",
        () => {
          setEditMode(void 0);
          if (fabricCanvas.getActiveObject()) {
            fabricCanvas.discardActiveObject();
            fabricCanvas.requestRenderAll();
          }
        }
      ]
    ];
    const objectShortcuts = [
      [
        (ev) => ev.key === "Delete",
        (obj) => {
          fabricCanvas.remove(obj);
          setEditMode(void 0);
        }
      ],
      [
        (ev) => ev.key === "ArrowUp",
        (obj, ev) => {
          const px = ev.shiftKey ? 20 : 1;
          if (ev.altKey) {
            obj.set("angle", (obj.angle || 0) - px);
          } else {
            const { x, y } = obj.getCenterPoint();
            obj.setPositionByOrigin(new import_fabric.fabric.Point(x, y - px), "center", "center");
          }
          obj.setCoords();
          fabricCanvas.requestRenderAll();
        }
      ],
      [
        (ev) => ev.key === "ArrowLeft",
        (obj, ev) => {
          const px = ev.shiftKey ? 20 : 1;
          if (ev.altKey) {
            obj.set("angle", (obj.angle || 0) - px);
          } else {
            const { x, y } = obj.getCenterPoint();
            obj.setPositionByOrigin(new import_fabric.fabric.Point(x - px, y), "center", "center");
          }
          obj.setCoords();
          fabricCanvas.requestRenderAll();
        }
      ],
      [
        (ev) => ev.key === "ArrowDown",
        (obj, ev) => {
          const px = ev.shiftKey ? 20 : 1;
          if (ev.altKey) {
            obj.set("angle", (obj.angle || 0) + px);
          } else {
            const { x, y } = obj.getCenterPoint();
            obj.setPositionByOrigin(new import_fabric.fabric.Point(x, y + px), "center", "center");
          }
          obj.setCoords();
          fabricCanvas.requestRenderAll();
        }
      ],
      [
        (ev) => ev.key === "ArrowRight",
        (obj, ev) => {
          const px = ev.shiftKey ? 20 : 1;
          if (ev.altKey) {
            obj.set("angle", (obj.angle || 0) + px);
          } else {
            const { x, y } = obj.getCenterPoint();
            obj.setPositionByOrigin(new import_fabric.fabric.Point(x + px, y), "center", "center");
          }
          obj.setCoords();
          fabricCanvas.requestRenderAll();
        }
      ]
    ];
    function handleKeydown(ev) {
      if (!fabricCanvas) {
        return;
      }
      globalShortcuts.forEach(([conditional, runShortcut]) => {
        if (conditional(ev)) {
          runShortcut();
          ev.preventDefault();
          ev.stopPropagation();
        }
      });
      const obj = fabricCanvas.getActiveObject();
      if (!obj || obj.excludeFromExport || obj instanceof import_MediaEditorFabricIText.MediaEditorFabricIText && obj.isEditing) {
        return;
      }
      objectShortcuts.forEach(([conditional, runShortcut]) => {
        if (conditional(ev)) {
          runShortcut(obj, ev);
          ev.preventDefault();
          ev.stopPropagation();
        }
      });
    }
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [fabricCanvas, redoIfPossible, undoIfPossible]);
  const [containerWidth, setContainerWidth] = (0, import_react.useState)(0);
  const [containerHeight, setContainerHeight] = (0, import_react.useState)(0);
  const zoom = Math.min(containerWidth / imageState.width, containerHeight / imageState.height) || 1;
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas || !imageState.width || !imageState.height) {
      return;
    }
    fabricCanvas.setDimensions({
      width: imageState.width * zoom,
      height: imageState.height * zoom
    });
    fabricCanvas.setZoom(zoom);
  }, [
    containerHeight,
    containerWidth,
    fabricCanvas,
    imageState.height,
    imageState.width,
    zoom
  ]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    drawFabricBackgroundImage({ fabricCanvas, image, imageState });
  }, [fabricCanvas, image, imageState]);
  const [canCrop, setCanCrop] = (0, import_react.useState)(false);
  const [cropAspectRatioLock, setCropAspectRatioLock] = (0, import_react.useState)(false);
  const [drawTool, setDrawTool] = (0, import_react.useState)("Pen" /* Pen */);
  const [drawWidth, setDrawWidth] = (0, import_react.useState)(4 /* Regular */);
  const [editMode, setEditMode] = (0, import_react.useState)();
  const [sliderValue, setSliderValue] = (0, import_react.useState)(0);
  const [textStyle, setTextStyle] = (0, import_react.useState)(import_getTextStyleAttributes.TextStyle.Regular);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    return (0, import_fabricEffectListener.fabricEffectListener)(fabricCanvas, ["selection:created", "selection:updated", "selection:cleared"], () => {
      if (fabricCanvas?.getActiveObject() instanceof import_MediaEditorFabricIText.MediaEditorFabricIText) {
        setEditMode("Text" /* Text */);
      } else if (editMode === "Text" /* Text */) {
        setEditMode(void 0);
      }
    });
  }, [editMode, fabricCanvas]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    if (editMode === "Crop" /* Crop */) {
      fabricCanvas.uniformScaling = cropAspectRatioLock;
    } else {
      fabricCanvas.uniformScaling = true;
    }
  }, [cropAspectRatioLock, editMode, fabricCanvas]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    if (editMode !== "Text" /* Text */) {
      const obj = fabricCanvas.getActiveObject();
      if (obj && (0, import_lodash.has)(obj, "text") && (0, import_lodash.get)(obj, "text") === "") {
        fabricCanvas.remove(obj);
      }
    }
  }, [editMode, fabricCanvas]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    if (editMode !== "Draw" /* Draw */) {
      fabricCanvas.isDrawingMode = false;
      return;
    }
    fabricCanvas.discardActiveObject();
    fabricCanvas.isDrawingMode = true;
    const freeDrawingBrush = new import_MediaEditorFabricPencilBrush.MediaEditorFabricPencilBrush(fabricCanvas);
    if (drawTool === "Highlighter" /* Highlighter */) {
      freeDrawingBrush.color = (0, import_color.getRGBA)(sliderValue, 0.5);
      freeDrawingBrush.strokeLineCap = "square";
      freeDrawingBrush.strokeLineJoin = "miter";
      freeDrawingBrush.width = drawWidth / zoom * 2;
    } else {
      freeDrawingBrush.color = (0, import_color.getHSL)(sliderValue);
      freeDrawingBrush.strokeLineCap = "round";
      freeDrawingBrush.strokeLineJoin = "bevel";
      freeDrawingBrush.width = drawWidth / zoom;
    }
    fabricCanvas.freeDrawingBrush = freeDrawingBrush;
    fabricCanvas.requestRenderAll();
  }, [drawTool, drawWidth, editMode, fabricCanvas, sliderValue, zoom]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    const obj = fabricCanvas.getActiveObject();
    if (!obj || !(obj instanceof import_MediaEditorFabricIText.MediaEditorFabricIText)) {
      return;
    }
    const { isEditing } = obj;
    obj.exitEditing();
    obj.set((0, import_getTextStyleAttributes.getTextStyleAttributes)(textStyle, sliderValue));
    fabricCanvas.requestRenderAll();
    if (isEditing) {
      obj.enterEditing();
    }
  }, [fabricCanvas, sliderValue, textStyle]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    if (editMode === "Crop" /* Crop */) {
      const PADDING = import_MediaEditorFabricCropRect.MediaEditorFabricCropRect.PADDING / zoom;
      const height = imageState.height - PADDING * Math.max(440 / imageState.height, 2);
      const width = imageState.width - PADDING * Math.max(440 / imageState.width, 2);
      let rect;
      const obj = fabricCanvas.getActiveObject();
      if (obj instanceof import_MediaEditorFabricCropRect.MediaEditorFabricCropRect) {
        rect = obj;
        rect.set({ height, width, scaleX: 1, scaleY: 1 });
      } else {
        rect = new import_MediaEditorFabricCropRect.MediaEditorFabricCropRect({
          height,
          width
        });
        rect.on("modified", () => {
          const { height: currHeight, width: currWidth } = rect.getBoundingRect(true);
          setCanCrop(currHeight < height || currWidth < width);
        });
        rect.on("deselected", () => {
          setEditMode(void 0);
        });
        fabricCanvas.add(rect);
        fabricCanvas.setActiveObject(rect);
      }
      fabricCanvas.viewportCenterObject(rect);
      rect.setCoords();
    } else {
      fabricCanvas.getObjects().forEach((obj) => {
        if (obj instanceof import_MediaEditorFabricCropRect.MediaEditorFabricCropRect) {
          fabricCanvas.remove(obj);
        }
      });
    }
    setCanCrop(false);
  }, [editMode, fabricCanvas, imageState.height, imageState.width, zoom]);
  (0, import_react.useEffect)(() => {
    if (!fabricCanvas) {
      return;
    }
    if (editMode !== "Text" /* Text */) {
      return;
    }
    const obj = fabricCanvas.getActiveObject();
    if (obj instanceof import_MediaEditorFabricIText.MediaEditorFabricIText) {
      return;
    }
    const FONT_SIZE_RELATIVE_TO_CANVAS = 10;
    const fontSize = Math.min(imageState.width, imageState.height) / FONT_SIZE_RELATIVE_TO_CANVAS;
    const text = new import_MediaEditorFabricIText.MediaEditorFabricIText("", {
      ...(0, import_getTextStyleAttributes.getTextStyleAttributes)(textStyle, sliderValue),
      fontSize
    });
    text.setPositionByOrigin(new import_fabric.fabric.Point(imageState.width / 2, imageState.height / 2), "center", "center");
    text.setCoords();
    fabricCanvas.add(text);
    fabricCanvas.setActiveObject(text);
    text.enterEditing();
  }, [
    editMode,
    fabricCanvas,
    imageState.height,
    imageState.width,
    sliderValue,
    textStyle
  ]);
  const [isSaving, setIsSaving] = (0, import_react.useState)(false);
  const portal = (0, import_usePortal.usePortal)();
  if (!portal) {
    return null;
  }
  let tooling;
  if (editMode === "Text" /* Text */) {
    tooling = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
      handleStyle: { backgroundColor: (0, import_color.getHSL)(sliderValue) },
      label: i18n("CustomColorEditor__hue"),
      moduleClassName: "HueSlider MediaEditor__tools__tool",
      onChange: setSliderValue,
      value: sliderValue
    }), /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenu, {
      buttonClassName: (0, import_classnames.default)("MediaEditor__tools__tool", {
        "MediaEditor__tools__button--text-regular": textStyle === import_getTextStyleAttributes.TextStyle.Regular,
        "MediaEditor__tools__button--text-highlight": textStyle === import_getTextStyleAttributes.TextStyle.Highlight,
        "MediaEditor__tools__button--text-outline": textStyle === import_getTextStyleAttributes.TextStyle.Outline
      }),
      i18n,
      menuOptions: [
        {
          icon: "MediaEditor__icon--text-regular",
          label: i18n("MediaEditor__text--regular"),
          onClick: () => setTextStyle(import_getTextStyleAttributes.TextStyle.Regular),
          value: import_getTextStyleAttributes.TextStyle.Regular
        },
        {
          icon: "MediaEditor__icon--text-highlight",
          label: i18n("MediaEditor__text--highlight"),
          onClick: () => setTextStyle(import_getTextStyleAttributes.TextStyle.Highlight),
          value: import_getTextStyleAttributes.TextStyle.Highlight
        },
        {
          icon: "MediaEditor__icon--text-outline",
          label: i18n("MediaEditor__text--outline"),
          onClick: () => setTextStyle(import_getTextStyleAttributes.TextStyle.Outline),
          value: import_getTextStyleAttributes.TextStyle.Outline
        }
      ],
      theme: import_theme.Theme.Dark,
      value: textStyle
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      className: "MediaEditor__tools__tool MediaEditor__tools__button MediaEditor__tools__button--words",
      onClick: () => {
        setEditMode(void 0);
        const activeObject = fabricCanvas?.getActiveObject();
        if (activeObject instanceof import_MediaEditorFabricIText.MediaEditorFabricIText) {
          activeObject.exitEditing();
        }
      },
      type: "button"
    }, i18n("done")));
  } else if (editMode === "Draw" /* Draw */) {
    tooling = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Slider.Slider, {
      handleStyle: { backgroundColor: (0, import_color.getHSL)(sliderValue) },
      label: i18n("CustomColorEditor__hue"),
      moduleClassName: "HueSlider MediaEditor__tools__tool",
      onChange: setSliderValue,
      value: sliderValue
    }), /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenu, {
      buttonClassName: (0, import_classnames.default)("MediaEditor__tools__tool", {
        "MediaEditor__tools__button--draw-pen": drawTool === "Pen" /* Pen */,
        "MediaEditor__tools__button--draw-highlighter": drawTool === "Highlighter" /* Highlighter */
      }),
      i18n,
      menuOptions: [
        {
          icon: "MediaEditor__icon--draw-pen",
          label: i18n("MediaEditor__draw--pen"),
          onClick: () => setDrawTool("Pen" /* Pen */),
          value: "Pen" /* Pen */
        },
        {
          icon: "MediaEditor__icon--draw-highlighter",
          label: i18n("MediaEditor__draw--highlighter"),
          onClick: () => setDrawTool("Highlighter" /* Highlighter */),
          value: "Highlighter" /* Highlighter */
        }
      ],
      theme: import_theme.Theme.Dark,
      value: drawTool
    }), /* @__PURE__ */ import_react.default.createElement(import_ContextMenu.ContextMenu, {
      buttonClassName: (0, import_classnames.default)("MediaEditor__tools__tool", {
        "MediaEditor__tools__button--width-thin": drawWidth === 2 /* Thin */,
        "MediaEditor__tools__button--width-regular": drawWidth === 4 /* Regular */,
        "MediaEditor__tools__button--width-medium": drawWidth === 12 /* Medium */,
        "MediaEditor__tools__button--width-heavy": drawWidth === 24 /* Heavy */
      }),
      i18n,
      menuOptions: [
        {
          icon: "MediaEditor__icon--width-thin",
          label: i18n("MediaEditor__draw--thin"),
          onClick: () => setDrawWidth(2 /* Thin */),
          value: 2 /* Thin */
        },
        {
          icon: "MediaEditor__icon--width-regular",
          label: i18n("MediaEditor__draw--regular"),
          onClick: () => setDrawWidth(4 /* Regular */),
          value: 4 /* Regular */
        },
        {
          icon: "MediaEditor__icon--width-medium",
          label: i18n("MediaEditor__draw--medium"),
          onClick: () => setDrawWidth(12 /* Medium */),
          value: 12 /* Medium */
        },
        {
          icon: "MediaEditor__icon--width-heavy",
          label: i18n("MediaEditor__draw--heavy"),
          onClick: () => setDrawWidth(24 /* Heavy */),
          value: 24 /* Heavy */
        }
      ],
      theme: import_theme.Theme.Dark,
      value: drawWidth
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      className: "MediaEditor__tools__tool MediaEditor__tools__button MediaEditor__tools__button--words",
      onClick: () => setEditMode(void 0),
      type: "button"
    }, i18n("done")));
  } else if (editMode === "Crop" /* Crop */) {
    const canReset = imageState.cropX !== 0 || imageState.cropY !== 0 || imageState.flipX || imageState.flipY || imageState.angle !== 0;
    tooling = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("button", {
      className: "MediaEditor__tools__tool MediaEditor__tools__button MediaEditor__tools__button--words",
      disabled: !canReset,
      onClick: async () => {
        if (!fabricCanvas) {
          return;
        }
        const newImageState = {
          ...INITIAL_IMAGE_STATE,
          height: image.height,
          width: image.width
        };
        setImageState(newImageState);
        moveFabricObjectsForReset(fabricCanvas, imageState);
        takeSnapshot("reset", newImageState);
      },
      type: "button"
    }, i18n("MediaEditor__crop--reset")), /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("MediaEditor__crop--rotate"),
      className: "MediaEditor__tools__tool MediaEditor__tools__button MediaEditor__tools__button--rotate",
      onClick: () => {
        if (!fabricCanvas) {
          return;
        }
        fabricCanvas.getObjects().forEach((obj) => {
          if (obj instanceof import_MediaEditorFabricCropRect.MediaEditorFabricCropRect) {
            return;
          }
          const center = obj.getCenterPoint();
          obj.set("angle", ((obj.angle || 0) + 270) % 360);
          obj.setPositionByOrigin(new import_fabric.fabric.Point(center.y, imageState.width - center.x), "center", "center");
          obj.setCoords();
        });
        const newImageState = {
          ...imageState,
          angle: (imageState.angle + 270) % 360,
          height: imageState.width,
          width: imageState.height
        };
        setImageState(newImageState);
        takeSnapshot("rotate", newImageState);
      },
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("MediaEditor__crop--flip"),
      className: "MediaEditor__tools__tool MediaEditor__tools__button MediaEditor__tools__button--flip",
      onClick: () => {
        if (!fabricCanvas) {
          return;
        }
        const newImageState = {
          ...imageState,
          ...imageState.angle % 180 ? { flipY: !imageState.flipY } : { flipX: !imageState.flipX }
        };
        setImageState(newImageState);
        takeSnapshot("flip", newImageState);
      },
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      "aria-label": i18n("MediaEditor__crop--lock"),
      className: (0, import_classnames.default)("MediaEditor__tools__button", `MediaEditor__tools__button--crop-${cropAspectRatioLock ? "" : "un"}locked`),
      onClick: () => {
        if (fabricCanvas) {
          fabricCanvas.uniformScaling = !cropAspectRatioLock;
        }
        setCropAspectRatioLock(!cropAspectRatioLock);
      },
      type: "button"
    }), /* @__PURE__ */ import_react.default.createElement("button", {
      className: "MediaEditor__tools__tool MediaEditor__tools__button MediaEditor__tools__button--words",
      disabled: !canCrop,
      onClick: () => {
        if (!fabricCanvas) {
          return;
        }
        const pendingCrop = getPendingCrop(fabricCanvas);
        if (!pendingCrop) {
          return;
        }
        const newImageState = getNewImageStateFromCrop(imageState, pendingCrop);
        setImageState(newImageState);
        moveFabricObjectsForCrop(fabricCanvas, pendingCrop);
        takeSnapshot("crop", newImageState);
        setEditMode(void 0);
      },
      type: "button"
    }, i18n("done")));
  }
  return (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__container"
  }, /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true,
    onResize: ({ bounds }) => {
      if (!bounds) {
        log.error("We should be measuring the bounds");
        return;
      }
      setContainerWidth(bounds.width);
      setContainerHeight(bounds.height);
    }
  }, ({ measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__media",
    ref: measureRef
  }, image && /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("canvas", {
    className: (0, import_classnames.default)("MediaEditor__media--canvas", {
      "MediaEditor__media--canvas--cropping": editMode === "Crop" /* Crop */
    }),
    id: canvasId
  }))))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__toolbar"
  }, tooling ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__tools"
  }, tooling) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__toolbar--space"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__toolbar--buttons"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    onClick: onClose,
    theme: import_theme.Theme.Dark,
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("discard")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "MediaEditor__controls"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaEditor__control--draw"),
    className: (0, import_classnames.default)({
      MediaEditor__control: true,
      "MediaEditor__control--pen": true,
      "MediaEditor__control--selected": editMode === "Draw" /* Draw */
    }),
    onClick: () => {
      setEditMode(editMode === "Draw" /* Draw */ ? void 0 : "Draw" /* Draw */);
    },
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaEditor__control--text"),
    className: (0, import_classnames.default)({
      MediaEditor__control: true,
      "MediaEditor__control--text": true,
      "MediaEditor__control--selected": editMode === "Text" /* Text */
    }),
    onClick: () => {
      if (editMode === "Text" /* Text */) {
        setEditMode(void 0);
        const obj = fabricCanvas?.getActiveObject();
        if (obj instanceof import_MediaEditorFabricIText.MediaEditorFabricIText) {
          obj.exitEditing();
        }
      } else {
        setEditMode("Text" /* Text */);
      }
    },
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement(import_StickerButton.StickerButton, {
    blessedPacks: [],
    className: (0, import_classnames.default)({
      MediaEditor__control: true,
      "MediaEditor__control--sticker": true
    }),
    clearInstalledStickerPack: import_lodash.noop,
    clearShowIntroduction: () => {
      fabricCanvas?.discardActiveObject();
      setEditMode(void 0);
    },
    clearShowPickerHint: import_lodash.noop,
    i18n,
    installedPacks,
    knownPacks: [],
    onPickSticker: (_packId, _stickerId, src) => {
      if (!fabricCanvas) {
        return;
      }
      const STICKER_SIZE_RELATIVE_TO_CANVAS = 4;
      const size = Math.min(imageState.width, imageState.height) / STICKER_SIZE_RELATIVE_TO_CANVAS;
      const sticker = new import_MediaEditorFabricSticker.MediaEditorFabricSticker(src);
      sticker.scaleToHeight(size);
      sticker.setPositionByOrigin(new import_fabric.fabric.Point(imageState.width / 2, imageState.height / 2), "center", "center");
      sticker.setCoords();
      fabricCanvas.add(sticker);
      fabricCanvas.setActiveObject(sticker);
      setEditMode(void 0);
    },
    receivedPacks: [],
    recentStickers,
    showPickerHint: false,
    theme: import_theme.Theme.Dark
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaEditor__control--crop"),
    className: (0, import_classnames.default)({
      MediaEditor__control: true,
      "MediaEditor__control--crop": true,
      "MediaEditor__control--selected": editMode === "Crop" /* Crop */
    }),
    onClick: () => {
      if (!fabricCanvas) {
        return;
      }
      if (editMode === "Crop" /* Crop */) {
        const obj = fabricCanvas.getActiveObject();
        if (obj instanceof import_MediaEditorFabricCropRect.MediaEditorFabricCropRect) {
          fabricCanvas.remove(obj);
        }
        setEditMode(void 0);
      } else {
        setEditMode("Crop" /* Crop */);
      }
    },
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaEditor__control--undo"),
    className: "MediaEditor__control MediaEditor__control--undo",
    disabled: !canUndo,
    onClick: () => {
      if (editMode === "Crop" /* Crop */) {
        setEditMode(void 0);
      }
      undoIfPossible();
    },
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("MediaEditor__control--redo"),
    className: "MediaEditor__control MediaEditor__control--redo",
    disabled: !canRedo,
    onClick: () => {
      if (editMode === "Crop" /* Crop */) {
        setEditMode(void 0);
      }
      redoIfPossible();
    },
    type: "button"
  })), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !image || isSaving,
    onClick: async () => {
      if (!fabricCanvas) {
        return;
      }
      setEditMode(void 0);
      setIsSaving(true);
      let data;
      try {
        const renderFabricCanvas = await cloneFabricCanvas(fabricCanvas);
        renderFabricCanvas.remove(...renderFabricCanvas.getObjects().filter((obj) => obj.excludeFromExport));
        let finalImageState;
        const pendingCrop = getPendingCrop(fabricCanvas);
        if (pendingCrop) {
          finalImageState = getNewImageStateFromCrop(imageState, pendingCrop);
          moveFabricObjectsForCrop(renderFabricCanvas, pendingCrop);
          drawFabricBackgroundImage({
            fabricCanvas: renderFabricCanvas,
            image,
            imageState: finalImageState
          });
        } else {
          finalImageState = imageState;
        }
        renderFabricCanvas.setDimensions({
          width: finalImageState.width,
          height: finalImageState.height
        });
        renderFabricCanvas.setZoom(1);
        const renderedCanvas = renderFabricCanvas.toCanvasElement();
        data = await (0, import_canvasToBytes.canvasToBytes)(renderedCanvas);
      } catch (err) {
        onClose();
        throw err;
      } finally {
        setIsSaving(false);
      }
      onDone(data);
    },
    theme: import_theme.Theme.Dark,
    variant: import_Button.ButtonVariant.Primary
  }, i18n("save"))))), portal);
}, "MediaEditor");
function getPendingCrop(fabricCanvas) {
  const activeObject = fabricCanvas.getActiveObject();
  return activeObject instanceof import_MediaEditorFabricCropRect.MediaEditorFabricCropRect ? activeObject.getBoundingRect(true) : void 0;
}
function getNewImageStateFromCrop(state, { left, height, top, width }) {
  let cropX;
  let cropY;
  switch (state.angle) {
    case 0:
      cropX = state.cropX + left;
      cropY = state.cropY + top;
      break;
    case 90:
      cropX = state.cropX + top;
      cropY = state.cropY + (state.width - (left + width));
      break;
    case 180:
      cropX = state.cropX + (state.width - (left + width));
      cropY = state.cropY + (state.height - (top + height));
      break;
    case 270:
      cropX = state.cropX + (state.height - (top + height));
      cropY = state.cropY + left;
      break;
    default:
      throw new Error("Unexpected angle");
  }
  return {
    ...state,
    cropX,
    cropY,
    height,
    width
  };
}
function cloneFabricCanvas(original) {
  return new Promise((resolve) => {
    original.clone(resolve);
  });
}
function moveFabricObjectsForCrop(fabricCanvas, { left, top }) {
  fabricCanvas.getObjects().forEach((obj) => {
    const { x, y } = obj.getCenterPoint();
    const translatedCenter = new import_fabric.fabric.Point(x - left, y - top);
    obj.setPositionByOrigin(translatedCenter, "center", "center");
    obj.setCoords();
  });
}
function moveFabricObjectsForReset(fabricCanvas, oldImageState) {
  fabricCanvas.getObjects().forEach((obj) => {
    if (obj.excludeFromExport) {
      return;
    }
    let newCenterX;
    let newCenterY;
    const oldCenter = obj.getCenterPoint();
    const distanceFromRightEdge = oldImageState.width - oldCenter.x;
    const distanceFromBottomEdge = oldImageState.height - oldCenter.y;
    switch (oldImageState.angle % 360) {
      case 0:
        newCenterX = oldCenter.x;
        newCenterY = oldCenter.y;
        break;
      case 90:
        newCenterX = oldCenter.y;
        newCenterY = distanceFromRightEdge;
        break;
      case 180:
        newCenterX = distanceFromRightEdge;
        newCenterY = distanceFromBottomEdge;
        break;
      case 270:
        newCenterX = distanceFromBottomEdge;
        newCenterY = oldCenter.x;
        break;
      default:
        throw new Error("Unexpected angle");
    }
    newCenterX += oldImageState.cropX;
    newCenterY += oldImageState.cropY;
    obj.set("angle", (obj.angle || 0) - oldImageState.angle);
    obj.setPositionByOrigin(new import_fabric.fabric.Point(newCenterX, newCenterY), "center", "center");
    obj.setCoords();
  });
}
function drawFabricBackgroundImage({
  fabricCanvas,
  image,
  imageState
}) {
  const backgroundImage = new import_fabric.fabric.Image(image, {
    canvas: fabricCanvas,
    height: imageState.height || image.height,
    width: imageState.width || image.width
  });
  let left;
  let top;
  switch (imageState.angle) {
    case 0:
      left = 0;
      top = 0;
      break;
    case 90:
      left = imageState.width;
      top = 0;
      break;
    case 180:
      left = imageState.width;
      top = imageState.height;
      break;
    case 270:
      left = 0;
      top = imageState.height;
      break;
    default:
      throw new Error("Unexpected angle");
  }
  let { height, width } = imageState;
  if (imageState.angle % 180) {
    [width, height] = [height, width];
  }
  fabricCanvas.setBackgroundImage(backgroundImage, fabricCanvas.requestRenderAll.bind(fabricCanvas), {
    angle: imageState.angle,
    cropX: imageState.cropX,
    cropY: imageState.cropY,
    flipX: imageState.flipX,
    flipY: imageState.flipY,
    left,
    top,
    originX: "left",
    originY: "top",
    width,
    height
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaEditor
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3IudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IE1lYXN1cmUgZnJvbSAncmVhY3QtbWVhc3VyZSc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGZhYnJpYyB9IGZyb20gJ2ZhYnJpYyc7XG5pbXBvcnQgeyBnZXQsIGhhcywgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBTdGlja2VyQnV0dG9uUHJvcHMgfSBmcm9tICcuL3N0aWNrZXJzL1N0aWNrZXJCdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBJbWFnZVN0YXRlVHlwZSB9IGZyb20gJy4uL21lZGlhRWRpdG9yL0ltYWdlU3RhdGVUeXBlJztcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uVmFyaWFudCB9IGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCB7IENvbnRleHRNZW51IH0gZnJvbSAnLi9Db250ZXh0TWVudSc7XG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuL1NsaWRlcic7XG5pbXBvcnQgeyBTdGlja2VyQnV0dG9uIH0gZnJvbSAnLi9zdGlja2Vycy9TdGlja2VyQnV0dG9uJztcbmltcG9ydCB7IFRoZW1lIH0gZnJvbSAnLi4vdXRpbC90aGVtZSc7XG5pbXBvcnQgeyBjYW52YXNUb0J5dGVzIH0gZnJvbSAnLi4vdXRpbC9jYW52YXNUb0J5dGVzJztcbmltcG9ydCB7IHVzZUZhYnJpY0hpc3RvcnkgfSBmcm9tICcuLi9tZWRpYUVkaXRvci91c2VGYWJyaWNIaXN0b3J5JztcbmltcG9ydCB7IHVzZVBvcnRhbCB9IGZyb20gJy4uL2hvb2tzL3VzZVBvcnRhbCc7XG5pbXBvcnQgeyB1c2VVbmlxdWVJZCB9IGZyb20gJy4uL2hvb2tzL3VzZVVuaXF1ZUlkJztcblxuaW1wb3J0IHsgTWVkaWFFZGl0b3JGYWJyaWNQZW5jaWxCcnVzaCB9IGZyb20gJy4uL21lZGlhRWRpdG9yL01lZGlhRWRpdG9yRmFicmljUGVuY2lsQnJ1c2gnO1xuaW1wb3J0IHsgTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdCB9IGZyb20gJy4uL21lZGlhRWRpdG9yL01lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QnO1xuaW1wb3J0IHsgTWVkaWFFZGl0b3JGYWJyaWNJVGV4dCB9IGZyb20gJy4uL21lZGlhRWRpdG9yL01lZGlhRWRpdG9yRmFicmljSVRleHQnO1xuaW1wb3J0IHsgTWVkaWFFZGl0b3JGYWJyaWNTdGlja2VyIH0gZnJvbSAnLi4vbWVkaWFFZGl0b3IvTWVkaWFFZGl0b3JGYWJyaWNTdGlja2VyJztcbmltcG9ydCB7IGZhYnJpY0VmZmVjdExpc3RlbmVyIH0gZnJvbSAnLi4vbWVkaWFFZGl0b3IvZmFicmljRWZmZWN0TGlzdGVuZXInO1xuaW1wb3J0IHsgZ2V0UkdCQSwgZ2V0SFNMIH0gZnJvbSAnLi4vbWVkaWFFZGl0b3IvdXRpbC9jb2xvcic7XG5pbXBvcnQge1xuICBUZXh0U3R5bGUsXG4gIGdldFRleHRTdHlsZUF0dHJpYnV0ZXMsXG59IGZyb20gJy4uL21lZGlhRWRpdG9yL3V0aWwvZ2V0VGV4dFN0eWxlQXR0cmlidXRlcyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaW1hZ2VTcmM6IHN0cmluZztcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbiAgb25Eb25lOiAoZGF0YTogVWludDhBcnJheSkgPT4gdW5rbm93bjtcbn0gJiBQaWNrPFN0aWNrZXJCdXR0b25Qcm9wcywgJ2luc3RhbGxlZFBhY2tzJyB8ICdyZWNlbnRTdGlja2Vycyc+O1xuXG5jb25zdCBJTklUSUFMX0lNQUdFX1NUQVRFOiBJbWFnZVN0YXRlVHlwZSA9IHtcbiAgYW5nbGU6IDAsXG4gIGNyb3BYOiAwLFxuICBjcm9wWTogMCxcbiAgZmxpcFg6IGZhbHNlLFxuICBmbGlwWTogZmFsc2UsXG4gIGhlaWdodDogMCxcbiAgd2lkdGg6IDAsXG59O1xuXG5lbnVtIEVkaXRNb2RlIHtcbiAgQ3JvcCA9ICdDcm9wJyxcbiAgRHJhdyA9ICdEcmF3JyxcbiAgVGV4dCA9ICdUZXh0Jyxcbn1cblxuZW51bSBEcmF3V2lkdGgge1xuICBUaGluID0gMixcbiAgUmVndWxhciA9IDQsXG4gIE1lZGl1bSA9IDEyLFxuICBIZWF2eSA9IDI0LFxufVxuXG5lbnVtIERyYXdUb29sIHtcbiAgUGVuID0gJ1BlbicsXG4gIEhpZ2hsaWdodGVyID0gJ0hpZ2hsaWdodGVyJyxcbn1cblxudHlwZSBQZW5kaW5nQ3JvcFR5cGUgPSB7XG4gIGxlZnQ6IG51bWJlcjtcbiAgdG9wOiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xufTtcblxuZnVuY3Rpb24gaXNDbWRPckN0cmwoZXY6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcbiAgY29uc3QgeyBjdHJsS2V5LCBtZXRhS2V5IH0gPSBldjtcbiAgY29uc3QgY29tbWFuZEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpID09PSAnZGFyd2luJyAmJiBtZXRhS2V5O1xuICBjb25zdCBjb250cm9sS2V5ID0gZ2V0KHdpbmRvdywgJ3BsYXRmb3JtJykgIT09ICdkYXJ3aW4nICYmIGN0cmxLZXk7XG4gIHJldHVybiBjb21tYW5kS2V5IHx8IGNvbnRyb2xLZXk7XG59XG5cbmV4cG9ydCBjb25zdCBNZWRpYUVkaXRvciA9ICh7XG4gIGkxOG4sXG4gIGltYWdlU3JjLFxuICBvbkNsb3NlLFxuICBvbkRvbmUsXG5cbiAgLy8gU3RpY2tlckJ1dHRvblByb3BzXG4gIGluc3RhbGxlZFBhY2tzLFxuICByZWNlbnRTdGlja2Vycyxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGNvbnN0IFtmYWJyaWNDYW52YXMsIHNldEZhYnJpY0NhbnZhc10gPSB1c2VTdGF0ZTxmYWJyaWMuQ2FudmFzIHwgdW5kZWZpbmVkPigpO1xuICBjb25zdCBbaW1hZ2UsIHNldEltYWdlXSA9IHVzZVN0YXRlPEhUTUxJbWFnZUVsZW1lbnQ+KG5ldyBJbWFnZSgpKTtcblxuICBjb25zdCBjYW52YXNJZCA9IHVzZVVuaXF1ZUlkKCk7XG5cbiAgY29uc3QgW2ltYWdlU3RhdGUsIHNldEltYWdlU3RhdGVdID1cbiAgICB1c2VTdGF0ZTxJbWFnZVN0YXRlVHlwZT4oSU5JVElBTF9JTUFHRV9TVEFURSk7XG5cbiAgLy8gSGlzdG9yeSBzdGF0ZVxuICBjb25zdCB7IGNhblJlZG8sIGNhblVuZG8sIHJlZG9JZlBvc3NpYmxlLCB0YWtlU25hcHNob3QsIHVuZG9JZlBvc3NpYmxlIH0gPVxuICAgIHVzZUZhYnJpY0hpc3Rvcnkoe1xuICAgICAgZmFicmljQ2FudmFzLFxuICAgICAgaW1hZ2VTdGF0ZSxcbiAgICAgIHNldEltYWdlU3RhdGUsXG4gICAgfSk7XG5cbiAgLy8gSW5pdGlhbCBpbWFnZSBsb2FkIGFuZCBGYWJyaWMgY2FudmFzIHNldHVwXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQuIFdlIGNhbid0IHJlLXJ1biB0aGlzIGZ1bmN0aW9uIGlmIHdlJ3ZlIGFscmVhZHkgc2V0dXBcbiAgICAvLyAgICBhIGNhbnZhcyBzaW5jZSBGYWJyaWMgZG9lc24ndCBsaWtlIHRoYXQuXG4gICAgaWYgKGZhYnJpY0NhbnZhcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBzZXRJbWFnZShpbWcpO1xuXG4gICAgICBjb25zdCBjYW52YXMgPSBuZXcgZmFicmljLkNhbnZhcyhjYW52YXNJZCk7XG4gICAgICBjYW52YXMuc2VsZWN0aW9uID0gZmFsc2U7XG4gICAgICBzZXRGYWJyaWNDYW52YXMoY2FudmFzKTtcblxuICAgICAgY29uc3QgbmV3SW1hZ2VTdGF0ZSA9IHtcbiAgICAgICAgLi4uSU5JVElBTF9JTUFHRV9TVEFURSxcbiAgICAgICAgaGVpZ2h0OiBpbWcuaGVpZ2h0LFxuICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgfTtcbiAgICAgIHNldEltYWdlU3RhdGUobmV3SW1hZ2VTdGF0ZSk7XG4gICAgICB0YWtlU25hcHNob3QoJ2luaXRpYWwgc3RhdGUnLCBuZXdJbWFnZVN0YXRlLCBjYW52YXMpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAvLyBUaGlzIGlzIGEgYmFkIGV4cGVyaWVuY2UsIGJ1dCBpdCBzaG91bGQgYmUgaW1wb3NzaWJsZS5cbiAgICAgIGxvZy5lcnJvcignPE1lZGlhRWRpdG9yPjogaW1hZ2UgZmFpbGVkIHRvIGxvYWQuIENsb3NpbmcnKTtcbiAgICAgIG9uQ2xvc2UoKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBpbWFnZVNyYztcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaW1nLm9ubG9hZCA9IG5vb3A7XG4gICAgICBpbWcub25lcnJvciA9IG5vb3A7XG4gICAgfTtcbiAgfSwgW2NhbnZhc0lkLCBmYWJyaWNDYW52YXMsIGltYWdlU3JjLCBvbkNsb3NlLCB0YWtlU25hcHNob3RdKTtcblxuICAvLyBLZXlib2FyZCBzdXBwb3J0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgIHJldHVybiBub29wO1xuICAgIH1cblxuICAgIGNvbnN0IGdsb2JhbFNob3J0Y3V0czogQXJyYXk8XG4gICAgICBbKGV2OiBLZXlib2FyZEV2ZW50KSA9PiBib29sZWFuLCAoKSA9PiB1bmtub3duXVxuICAgID4gPSBbXG4gICAgICBbXG4gICAgICAgIGV2ID0+IGlzQ21kT3JDdHJsKGV2KSAmJiBldi5rZXkgPT09ICdjJyxcbiAgICAgICAgKCkgPT4gc2V0RWRpdE1vZGUoRWRpdE1vZGUuQ3JvcCksXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICBldiA9PiBpc0NtZE9yQ3RybChldikgJiYgZXYua2V5ID09PSAnZCcsXG4gICAgICAgICgpID0+IHNldEVkaXRNb2RlKEVkaXRNb2RlLkRyYXcpLFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgZXYgPT4gaXNDbWRPckN0cmwoZXYpICYmIGV2LmtleSA9PT0gJ3QnLFxuICAgICAgICAoKSA9PiBzZXRFZGl0TW9kZShFZGl0TW9kZS5UZXh0KSxcbiAgICAgIF0sXG4gICAgICBbZXYgPT4gaXNDbWRPckN0cmwoZXYpICYmIGV2LmtleSA9PT0gJ3onLCB1bmRvSWZQb3NzaWJsZV0sXG4gICAgICBbZXYgPT4gaXNDbWRPckN0cmwoZXYpICYmIGV2LnNoaWZ0S2V5ICYmIGV2LmtleSA9PT0gJ3onLCByZWRvSWZQb3NzaWJsZV0sXG4gICAgICBbXG4gICAgICAgIGV2ID0+IGV2LmtleSA9PT0gJ0VzY2FwZScsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBzZXRFZGl0TW9kZSh1bmRlZmluZWQpO1xuXG4gICAgICAgICAgaWYgKGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKSkge1xuICAgICAgICAgICAgZmFicmljQ2FudmFzLmRpc2NhcmRBY3RpdmVPYmplY3QoKTtcbiAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5yZXF1ZXN0UmVuZGVyQWxsKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICBdO1xuXG4gICAgY29uc3Qgb2JqZWN0U2hvcnRjdXRzOiBBcnJheTxcbiAgICAgIFtcbiAgICAgICAgKGV2OiBLZXlib2FyZEV2ZW50KSA9PiBib29sZWFuLFxuICAgICAgICAob2JqOiBmYWJyaWMuT2JqZWN0LCBldjogS2V5Ym9hcmRFdmVudCkgPT4gdW5rbm93blxuICAgICAgXVxuICAgID4gPSBbXG4gICAgICBbXG4gICAgICAgIGV2ID0+IGV2LmtleSA9PT0gJ0RlbGV0ZScsXG4gICAgICAgIG9iaiA9PiB7XG4gICAgICAgICAgZmFicmljQ2FudmFzLnJlbW92ZShvYmopO1xuICAgICAgICAgIHNldEVkaXRNb2RlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICBldiA9PiBldi5rZXkgPT09ICdBcnJvd1VwJyxcbiAgICAgICAgKG9iaiwgZXYpID0+IHtcbiAgICAgICAgICBjb25zdCBweCA9IGV2LnNoaWZ0S2V5ID8gMjAgOiAxO1xuICAgICAgICAgIGlmIChldi5hbHRLZXkpIHtcbiAgICAgICAgICAgIG9iai5zZXQoJ2FuZ2xlJywgKG9iai5hbmdsZSB8fCAwKSAtIHB4KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBvYmouZ2V0Q2VudGVyUG9pbnQoKTtcbiAgICAgICAgICAgIG9iai5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxuICAgICAgICAgICAgICBuZXcgZmFicmljLlBvaW50KHgsIHkgLSBweCksXG4gICAgICAgICAgICAgICdjZW50ZXInLFxuICAgICAgICAgICAgICAnY2VudGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqLnNldENvb3JkcygpO1xuICAgICAgICAgIGZhYnJpY0NhbnZhcy5yZXF1ZXN0UmVuZGVyQWxsKCk7XG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICBldiA9PiBldi5rZXkgPT09ICdBcnJvd0xlZnQnLFxuICAgICAgICAob2JqLCBldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHB4ID0gZXYuc2hpZnRLZXkgPyAyMCA6IDE7XG4gICAgICAgICAgaWYgKGV2LmFsdEtleSkge1xuICAgICAgICAgICAgb2JqLnNldCgnYW5nbGUnLCAob2JqLmFuZ2xlIHx8IDApIC0gcHgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IG9iai5nZXRDZW50ZXJQb2ludCgpO1xuICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uQnlPcmlnaW4oXG4gICAgICAgICAgICAgIG5ldyBmYWJyaWMuUG9pbnQoeCAtIHB4LCB5KSxcbiAgICAgICAgICAgICAgJ2NlbnRlcicsXG4gICAgICAgICAgICAgICdjZW50ZXInXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvYmouc2V0Q29vcmRzKCk7XG4gICAgICAgICAgZmFicmljQ2FudmFzLnJlcXVlc3RSZW5kZXJBbGwoKTtcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBbXG4gICAgICAgIGV2ID0+IGV2LmtleSA9PT0gJ0Fycm93RG93bicsXG4gICAgICAgIChvYmosIGV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgcHggPSBldi5zaGlmdEtleSA/IDIwIDogMTtcbiAgICAgICAgICBpZiAoZXYuYWx0S2V5KSB7XG4gICAgICAgICAgICBvYmouc2V0KCdhbmdsZScsIChvYmouYW5nbGUgfHwgMCkgKyBweCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gb2JqLmdldENlbnRlclBvaW50KCk7XG4gICAgICAgICAgICBvYmouc2V0UG9zaXRpb25CeU9yaWdpbihcbiAgICAgICAgICAgICAgbmV3IGZhYnJpYy5Qb2ludCh4LCB5ICsgcHgpLFxuICAgICAgICAgICAgICAnY2VudGVyJyxcbiAgICAgICAgICAgICAgJ2NlbnRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iai5zZXRDb29yZHMoKTtcbiAgICAgICAgICBmYWJyaWNDYW52YXMucmVxdWVzdFJlbmRlckFsbCgpO1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgZXYgPT4gZXYua2V5ID09PSAnQXJyb3dSaWdodCcsXG4gICAgICAgIChvYmosIGV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgcHggPSBldi5zaGlmdEtleSA/IDIwIDogMTtcbiAgICAgICAgICBpZiAoZXYuYWx0S2V5KSB7XG4gICAgICAgICAgICBvYmouc2V0KCdhbmdsZScsIChvYmouYW5nbGUgfHwgMCkgKyBweCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gb2JqLmdldENlbnRlclBvaW50KCk7XG4gICAgICAgICAgICBvYmouc2V0UG9zaXRpb25CeU9yaWdpbihcbiAgICAgICAgICAgICAgbmV3IGZhYnJpYy5Qb2ludCh4ICsgcHgsIHkpLFxuICAgICAgICAgICAgICAnY2VudGVyJyxcbiAgICAgICAgICAgICAgJ2NlbnRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9iai5zZXRDb29yZHMoKTtcbiAgICAgICAgICBmYWJyaWNDYW52YXMucmVxdWVzdFJlbmRlckFsbCgpO1xuICAgICAgICB9LFxuICAgICAgXSxcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlS2V5ZG93bihldjogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBnbG9iYWxTaG9ydGN1dHMuZm9yRWFjaCgoW2NvbmRpdGlvbmFsLCBydW5TaG9ydGN1dF0pID0+IHtcbiAgICAgICAgaWYgKGNvbmRpdGlvbmFsKGV2KSkge1xuICAgICAgICAgIHJ1blNob3J0Y3V0KCk7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9iaiA9IGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcblxuICAgICAgaWYgKFxuICAgICAgICAhb2JqIHx8XG4gICAgICAgIG9iai5leGNsdWRlRnJvbUV4cG9ydCB8fFxuICAgICAgICAob2JqIGluc3RhbmNlb2YgTWVkaWFFZGl0b3JGYWJyaWNJVGV4dCAmJiBvYmouaXNFZGl0aW5nKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb2JqZWN0U2hvcnRjdXRzLmZvckVhY2goKFtjb25kaXRpb25hbCwgcnVuU2hvcnRjdXRdKSA9PiB7XG4gICAgICAgIGlmIChjb25kaXRpb25hbChldikpIHtcbiAgICAgICAgICBydW5TaG9ydGN1dChvYmosIGV2KTtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5ZG93bik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZUtleWRvd24pO1xuICAgIH07XG4gIH0sIFtmYWJyaWNDYW52YXMsIHJlZG9JZlBvc3NpYmxlLCB1bmRvSWZQb3NzaWJsZV0pO1xuXG4gIGNvbnN0IFtjb250YWluZXJXaWR0aCwgc2V0Q29udGFpbmVyV2lkdGhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjb250YWluZXJIZWlnaHQsIHNldENvbnRhaW5lckhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcblxuICBjb25zdCB6b29tID1cbiAgICBNYXRoLm1pbihcbiAgICAgIGNvbnRhaW5lcldpZHRoIC8gaW1hZ2VTdGF0ZS53aWR0aCxcbiAgICAgIGNvbnRhaW5lckhlaWdodCAvIGltYWdlU3RhdGUuaGVpZ2h0XG4gICAgKSB8fCAxO1xuXG4gIC8vIFVwZGF0ZSB0aGUgY2FudmFzIGRpbWVuc2lvbnMgKGFuZCB0aGVyZWZvcmUgem9vbSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWZhYnJpY0NhbnZhcyB8fCAhaW1hZ2VTdGF0ZS53aWR0aCB8fCAhaW1hZ2VTdGF0ZS5oZWlnaHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZmFicmljQ2FudmFzLnNldERpbWVuc2lvbnMoe1xuICAgICAgd2lkdGg6IGltYWdlU3RhdGUud2lkdGggKiB6b29tLFxuICAgICAgaGVpZ2h0OiBpbWFnZVN0YXRlLmhlaWdodCAqIHpvb20sXG4gICAgfSk7XG4gICAgZmFicmljQ2FudmFzLnNldFpvb20oem9vbSk7XG4gIH0sIFtcbiAgICBjb250YWluZXJIZWlnaHQsXG4gICAgY29udGFpbmVyV2lkdGgsXG4gICAgZmFicmljQ2FudmFzLFxuICAgIGltYWdlU3RhdGUuaGVpZ2h0LFxuICAgIGltYWdlU3RhdGUud2lkdGgsXG4gICAgem9vbSxcbiAgXSk7XG5cbiAgLy8gUmVmcmVzaCB0aGUgYmFja2dyb3VuZCBpbWFnZSBhY2NvcmRpbmcgdG8gaW1hZ2VTdGF0ZSBjaGFuZ2VzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhd0ZhYnJpY0JhY2tncm91bmRJbWFnZSh7IGZhYnJpY0NhbnZhcywgaW1hZ2UsIGltYWdlU3RhdGUgfSk7XG4gIH0sIFtmYWJyaWNDYW52YXMsIGltYWdlLCBpbWFnZVN0YXRlXSk7XG5cbiAgY29uc3QgW2NhbkNyb3AsIHNldENhbkNyb3BdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY3JvcEFzcGVjdFJhdGlvTG9jaywgc2V0Q3JvcEFzcGVjdFJhdGlvTG9ja10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkcmF3VG9vbCwgc2V0RHJhd1Rvb2xdID0gdXNlU3RhdGU8RHJhd1Rvb2w+KERyYXdUb29sLlBlbik7XG4gIGNvbnN0IFtkcmF3V2lkdGgsIHNldERyYXdXaWR0aF0gPSB1c2VTdGF0ZTxEcmF3V2lkdGg+KERyYXdXaWR0aC5SZWd1bGFyKTtcbiAgY29uc3QgW2VkaXRNb2RlLCBzZXRFZGl0TW9kZV0gPSB1c2VTdGF0ZTxFZGl0TW9kZSB8IHVuZGVmaW5lZD4oKTtcbiAgY29uc3QgW3NsaWRlclZhbHVlLCBzZXRTbGlkZXJWYWx1ZV0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbdGV4dFN0eWxlLCBzZXRUZXh0U3R5bGVdID0gdXNlU3RhdGU8VGV4dFN0eWxlPihUZXh0U3R5bGUuUmVndWxhcik7XG5cbiAgLy8gSWYgeW91IHNlbGVjdCBhIHRleHQgcGF0aCBhdXRvIGVudGVyIGVkaXQgbW9kZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZmFicmljQ2FudmFzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBmYWJyaWNFZmZlY3RMaXN0ZW5lcihcbiAgICAgIGZhYnJpY0NhbnZhcyxcbiAgICAgIFsnc2VsZWN0aW9uOmNyZWF0ZWQnLCAnc2VsZWN0aW9uOnVwZGF0ZWQnLCAnc2VsZWN0aW9uOmNsZWFyZWQnXSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKGZhYnJpY0NhbnZhcz8uZ2V0QWN0aXZlT2JqZWN0KCkgaW5zdGFuY2VvZiBNZWRpYUVkaXRvckZhYnJpY0lUZXh0KSB7XG4gICAgICAgICAgc2V0RWRpdE1vZGUoRWRpdE1vZGUuVGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLlRleHQpIHtcbiAgICAgICAgICBzZXRFZGl0TW9kZSh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfSwgW2VkaXRNb2RlLCBmYWJyaWNDYW52YXNdKTtcblxuICAvLyBFbnN1cmUgc2NhbGluZyBpcyBpbiBsb2NrZWR8dW5sb2NrZWQgc3RhdGUgb25seSB3aGVuIGNyb3BwaW5nXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLkNyb3ApIHtcbiAgICAgIGZhYnJpY0NhbnZhcy51bmlmb3JtU2NhbGluZyA9IGNyb3BBc3BlY3RSYXRpb0xvY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZhYnJpY0NhbnZhcy51bmlmb3JtU2NhbGluZyA9IHRydWU7XG4gICAgfVxuICB9LCBbY3JvcEFzcGVjdFJhdGlvTG9jaywgZWRpdE1vZGUsIGZhYnJpY0NhbnZhc10pO1xuXG4gIC8vIFJlbW92ZSBhbnkgYmxhbmsgdGV4dCB3aGVuIGVkaXQgbW9kZSBjaGFuZ2VzIG9mZiBvZiB0ZXh0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZWRpdE1vZGUgIT09IEVkaXRNb2RlLlRleHQpIHtcbiAgICAgIGNvbnN0IG9iaiA9IGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcbiAgICAgIGlmIChvYmogJiYgaGFzKG9iaiwgJ3RleHQnKSAmJiBnZXQob2JqLCAndGV4dCcpID09PSAnJykge1xuICAgICAgICBmYWJyaWNDYW52YXMucmVtb3ZlKG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9LCBbZWRpdE1vZGUsIGZhYnJpY0NhbnZhc10pO1xuXG4gIC8vIFRvZ2dsZSBkcmF3IG1vZGVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWZhYnJpY0NhbnZhcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlZGl0TW9kZSAhPT0gRWRpdE1vZGUuRHJhdykge1xuICAgICAgZmFicmljQ2FudmFzLmlzRHJhd2luZ01vZGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmYWJyaWNDYW52YXMuZGlzY2FyZEFjdGl2ZU9iamVjdCgpO1xuICAgIGZhYnJpY0NhbnZhcy5pc0RyYXdpbmdNb2RlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGZyZWVEcmF3aW5nQnJ1c2ggPSBuZXcgTWVkaWFFZGl0b3JGYWJyaWNQZW5jaWxCcnVzaChmYWJyaWNDYW52YXMpO1xuICAgIGlmIChkcmF3VG9vbCA9PT0gRHJhd1Rvb2wuSGlnaGxpZ2h0ZXIpIHtcbiAgICAgIGZyZWVEcmF3aW5nQnJ1c2guY29sb3IgPSBnZXRSR0JBKHNsaWRlclZhbHVlLCAwLjUpO1xuICAgICAgZnJlZURyYXdpbmdCcnVzaC5zdHJva2VMaW5lQ2FwID0gJ3NxdWFyZSc7XG4gICAgICBmcmVlRHJhd2luZ0JydXNoLnN0cm9rZUxpbmVKb2luID0gJ21pdGVyJztcbiAgICAgIGZyZWVEcmF3aW5nQnJ1c2gud2lkdGggPSAoZHJhd1dpZHRoIC8gem9vbSkgKiAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmVlRHJhd2luZ0JydXNoLmNvbG9yID0gZ2V0SFNMKHNsaWRlclZhbHVlKTtcbiAgICAgIGZyZWVEcmF3aW5nQnJ1c2guc3Ryb2tlTGluZUNhcCA9ICdyb3VuZCc7XG4gICAgICBmcmVlRHJhd2luZ0JydXNoLnN0cm9rZUxpbmVKb2luID0gJ2JldmVsJztcbiAgICAgIGZyZWVEcmF3aW5nQnJ1c2gud2lkdGggPSBkcmF3V2lkdGggLyB6b29tO1xuICAgIH1cbiAgICBmYWJyaWNDYW52YXMuZnJlZURyYXdpbmdCcnVzaCA9IGZyZWVEcmF3aW5nQnJ1c2g7XG5cbiAgICBmYWJyaWNDYW52YXMucmVxdWVzdFJlbmRlckFsbCgpO1xuICB9LCBbZHJhd1Rvb2wsIGRyYXdXaWR0aCwgZWRpdE1vZGUsIGZhYnJpY0NhbnZhcywgc2xpZGVyVmFsdWUsIHpvb21dKTtcblxuICAvLyBDaGFuZ2UgdGV4dCBzdHlsZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZmFicmljQ2FudmFzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2JqID0gZmFicmljQ2FudmFzLmdldEFjdGl2ZU9iamVjdCgpO1xuXG4gICAgaWYgKCFvYmogfHwgIShvYmogaW5zdGFuY2VvZiBNZWRpYUVkaXRvckZhYnJpY0lUZXh0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgaXNFZGl0aW5nIH0gPSBvYmo7XG4gICAgb2JqLmV4aXRFZGl0aW5nKCk7XG4gICAgb2JqLnNldChnZXRUZXh0U3R5bGVBdHRyaWJ1dGVzKHRleHRTdHlsZSwgc2xpZGVyVmFsdWUpKTtcbiAgICBmYWJyaWNDYW52YXMucmVxdWVzdFJlbmRlckFsbCgpO1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIG9iai5lbnRlckVkaXRpbmcoKTtcbiAgICB9XG4gIH0sIFtmYWJyaWNDYW52YXMsIHNsaWRlclZhbHVlLCB0ZXh0U3R5bGVdKTtcblxuICAvLyBDcmVhdGUgdGhlIENyb3BwaW5nUmVjdFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghZmFicmljQ2FudmFzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVkaXRNb2RlID09PSBFZGl0TW9kZS5Dcm9wKSB7XG4gICAgICBjb25zdCBQQURESU5HID0gTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdC5QQURESU5HIC8gem9vbTtcbiAgICAgIC8vIEZvciByZWFzb25zIHdlIGRvbid0IHVuZGVyc3RhbmQsIGhlaWdodCBhbmQgd2lkdGggb24gc21hbGwgaW1hZ2VzIGRvZXNuJ3Qgd29ya1xuICAgICAgLy8gICByaWdodCAoaXQgYmxlZWRzIG91dCkgc28gd2UgZGVjcmVhc2UgdGhlbSBmb3Igc21hbGwgaW1hZ2VzLlxuICAgICAgY29uc3QgaGVpZ2h0ID1cbiAgICAgICAgaW1hZ2VTdGF0ZS5oZWlnaHQgLSBQQURESU5HICogTWF0aC5tYXgoNDQwIC8gaW1hZ2VTdGF0ZS5oZWlnaHQsIDIpO1xuICAgICAgY29uc3Qgd2lkdGggPVxuICAgICAgICBpbWFnZVN0YXRlLndpZHRoIC0gUEFERElORyAqIE1hdGgubWF4KDQ0MCAvIGltYWdlU3RhdGUud2lkdGgsIDIpO1xuXG4gICAgICBsZXQgcmVjdDogTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdDtcbiAgICAgIGNvbnN0IG9iaiA9IGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcblxuICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QpIHtcbiAgICAgICAgcmVjdCA9IG9iajtcbiAgICAgICAgcmVjdC5zZXQoeyBoZWlnaHQsIHdpZHRoLCBzY2FsZVg6IDEsIHNjYWxlWTogMSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY3QgPSBuZXcgTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdCh7XG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICB9KTtcblxuICAgICAgICByZWN0Lm9uKCdtb2RpZmllZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IGhlaWdodDogY3VyckhlaWdodCwgd2lkdGg6IGN1cnJXaWR0aCB9ID1cbiAgICAgICAgICAgIHJlY3QuZ2V0Qm91bmRpbmdSZWN0KHRydWUpO1xuXG4gICAgICAgICAgc2V0Q2FuQ3JvcChjdXJySGVpZ2h0IDwgaGVpZ2h0IHx8IGN1cnJXaWR0aCA8IHdpZHRoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVjdC5vbignZGVzZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgICBzZXRFZGl0TW9kZSh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmYWJyaWNDYW52YXMuYWRkKHJlY3QpO1xuICAgICAgICBmYWJyaWNDYW52YXMuc2V0QWN0aXZlT2JqZWN0KHJlY3QpO1xuICAgICAgfVxuXG4gICAgICBmYWJyaWNDYW52YXMudmlld3BvcnRDZW50ZXJPYmplY3QocmVjdCk7XG4gICAgICByZWN0LnNldENvb3JkcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWJyaWNDYW52YXMuZ2V0T2JqZWN0cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QpIHtcbiAgICAgICAgICBmYWJyaWNDYW52YXMucmVtb3ZlKG9iaik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldENhbkNyb3AoZmFsc2UpO1xuICB9LCBbZWRpdE1vZGUsIGZhYnJpY0NhbnZhcywgaW1hZ2VTdGF0ZS5oZWlnaHQsIGltYWdlU3RhdGUud2lkdGgsIHpvb21dKTtcblxuICAvLyBDcmVhdGUgYW4gSVRleHQgbm9kZSB3aGVuIGVkaXQgbW9kZSBjaGFuZ2VzIHRvIFRleHRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWZhYnJpY0NhbnZhcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlZGl0TW9kZSAhPT0gRWRpdE1vZGUuVGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9iaiA9IGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgTWVkaWFFZGl0b3JGYWJyaWNJVGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IEZPTlRfU0laRV9SRUxBVElWRV9UT19DQU5WQVMgPSAxMDtcbiAgICBjb25zdCBmb250U2l6ZSA9XG4gICAgICBNYXRoLm1pbihpbWFnZVN0YXRlLndpZHRoLCBpbWFnZVN0YXRlLmhlaWdodCkgL1xuICAgICAgRk9OVF9TSVpFX1JFTEFUSVZFX1RPX0NBTlZBUztcbiAgICBjb25zdCB0ZXh0ID0gbmV3IE1lZGlhRWRpdG9yRmFicmljSVRleHQoJycsIHtcbiAgICAgIC4uLmdldFRleHRTdHlsZUF0dHJpYnV0ZXModGV4dFN0eWxlLCBzbGlkZXJWYWx1ZSksXG4gICAgICBmb250U2l6ZSxcbiAgICB9KTtcbiAgICB0ZXh0LnNldFBvc2l0aW9uQnlPcmlnaW4oXG4gICAgICBuZXcgZmFicmljLlBvaW50KGltYWdlU3RhdGUud2lkdGggLyAyLCBpbWFnZVN0YXRlLmhlaWdodCAvIDIpLFxuICAgICAgJ2NlbnRlcicsXG4gICAgICAnY2VudGVyJ1xuICAgICk7XG4gICAgdGV4dC5zZXRDb29yZHMoKTtcbiAgICBmYWJyaWNDYW52YXMuYWRkKHRleHQpO1xuICAgIGZhYnJpY0NhbnZhcy5zZXRBY3RpdmVPYmplY3QodGV4dCk7XG5cbiAgICB0ZXh0LmVudGVyRWRpdGluZygpO1xuICB9LCBbXG4gICAgZWRpdE1vZGUsXG4gICAgZmFicmljQ2FudmFzLFxuICAgIGltYWdlU3RhdGUuaGVpZ2h0LFxuICAgIGltYWdlU3RhdGUud2lkdGgsXG4gICAgc2xpZGVyVmFsdWUsXG4gICAgdGV4dFN0eWxlLFxuICBdKTtcblxuICBjb25zdCBbaXNTYXZpbmcsIHNldElzU2F2aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBJbiBhbiBpZGVhbCB3b3JsZCB3ZSdkIHVzZSA8TW9kYWxIb3N0IC8+IHRvIGdldCB0aGUgbmljZSBhbmltYXRpb24gYmVuZWZpdHNcbiAgLy8gYnV0IGJlY2F1c2Ugb2YgdGhlIHdheSBJVGV4dCBpcyBpbXBsZW1lbnRlZCAtLSB3aXRoIGEgaGlkZGVuIHRleHRhcmVhIC0tIHRvXG4gIC8vIGNhcHR1cmUga2V5Ym9hcmQgZXZlbnRzLCB3ZSBjYW4ndCB1c2UgTW9kYWxIb3N0IHNpbmNlIHRoYXQgdHJhcHMgZm9jdXMsIGFuZFxuICAvLyBmb2N1cyB0cmFwcGluZyBkb2Vzbid0IHBsYXkgbmljZSB3aXRoIGZhYnJpYydzIElUZXh0LlxuICBjb25zdCBwb3J0YWwgPSB1c2VQb3J0YWwoKTtcblxuICBpZiAoIXBvcnRhbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGV0IHRvb2xpbmc6IEpTWC5FbGVtZW50IHwgdW5kZWZpbmVkO1xuICBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLlRleHQpIHtcbiAgICB0b29saW5nID0gKFxuICAgICAgPD5cbiAgICAgICAgPFNsaWRlclxuICAgICAgICAgIGhhbmRsZVN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogZ2V0SFNMKHNsaWRlclZhbHVlKSB9fVxuICAgICAgICAgIGxhYmVsPXtpMThuKCdDdXN0b21Db2xvckVkaXRvcl9faHVlJyl9XG4gICAgICAgICAgbW9kdWxlQ2xhc3NOYW1lPVwiSHVlU2xpZGVyIE1lZGlhRWRpdG9yX190b29sc19fdG9vbFwiXG4gICAgICAgICAgb25DaGFuZ2U9e3NldFNsaWRlclZhbHVlfVxuICAgICAgICAgIHZhbHVlPXtzbGlkZXJWYWx1ZX1cbiAgICAgICAgLz5cbiAgICAgICAgPENvbnRleHRNZW51XG4gICAgICAgICAgYnV0dG9uQ2xhc3NOYW1lPXtjbGFzc05hbWVzKCdNZWRpYUVkaXRvcl9fdG9vbHNfX3Rvb2wnLCB7XG4gICAgICAgICAgICAnTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXRleHQtcmVndWxhcic6XG4gICAgICAgICAgICAgIHRleHRTdHlsZSA9PT0gVGV4dFN0eWxlLlJlZ3VsYXIsXG4gICAgICAgICAgICAnTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXRleHQtaGlnaGxpZ2h0JzpcbiAgICAgICAgICAgICAgdGV4dFN0eWxlID09PSBUZXh0U3R5bGUuSGlnaGxpZ2h0LFxuICAgICAgICAgICAgJ01lZGlhRWRpdG9yX190b29sc19fYnV0dG9uLS10ZXh0LW91dGxpbmUnOlxuICAgICAgICAgICAgICB0ZXh0U3R5bGUgPT09IFRleHRTdHlsZS5PdXRsaW5lLFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgbWVudU9wdGlvbnM9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWNvbjogJ01lZGlhRWRpdG9yX19pY29uLS10ZXh0LXJlZ3VsYXInLFxuICAgICAgICAgICAgICBsYWJlbDogaTE4bignTWVkaWFFZGl0b3JfX3RleHQtLXJlZ3VsYXInKSxcbiAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gc2V0VGV4dFN0eWxlKFRleHRTdHlsZS5SZWd1bGFyKSxcbiAgICAgICAgICAgICAgdmFsdWU6IFRleHRTdHlsZS5SZWd1bGFyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWNvbjogJ01lZGlhRWRpdG9yX19pY29uLS10ZXh0LWhpZ2hsaWdodCcsXG4gICAgICAgICAgICAgIGxhYmVsOiBpMThuKCdNZWRpYUVkaXRvcl9fdGV4dC0taGlnaGxpZ2h0JyksXG4gICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHNldFRleHRTdHlsZShUZXh0U3R5bGUuSGlnaGxpZ2h0KSxcbiAgICAgICAgICAgICAgdmFsdWU6IFRleHRTdHlsZS5IaWdobGlnaHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpY29uOiAnTWVkaWFFZGl0b3JfX2ljb24tLXRleHQtb3V0bGluZScsXG4gICAgICAgICAgICAgIGxhYmVsOiBpMThuKCdNZWRpYUVkaXRvcl9fdGV4dC0tb3V0bGluZScpLFxuICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBzZXRUZXh0U3R5bGUoVGV4dFN0eWxlLk91dGxpbmUpLFxuICAgICAgICAgICAgICB2YWx1ZTogVGV4dFN0eWxlLk91dGxpbmUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgICAgdGhlbWU9e1RoZW1lLkRhcmt9XG4gICAgICAgICAgdmFsdWU9e3RleHRTdHlsZX1cbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cIk1lZGlhRWRpdG9yX190b29sc19fdG9vbCBNZWRpYUVkaXRvcl9fdG9vbHNfX2J1dHRvbiBNZWRpYUVkaXRvcl9fdG9vbHNfX2J1dHRvbi0td29yZHNcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNldEVkaXRNb2RlKHVuZGVmaW5lZCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZU9iamVjdCA9IGZhYnJpY0NhbnZhcz8uZ2V0QWN0aXZlT2JqZWN0KCk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlT2JqZWN0IGluc3RhbmNlb2YgTWVkaWFFZGl0b3JGYWJyaWNJVGV4dCkge1xuICAgICAgICAgICAgICBhY3RpdmVPYmplY3QuZXhpdEVkaXRpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ2RvbmUnKX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8Lz5cbiAgICApO1xuICB9IGVsc2UgaWYgKGVkaXRNb2RlID09PSBFZGl0TW9kZS5EcmF3KSB7XG4gICAgdG9vbGluZyA9IChcbiAgICAgIDw+XG4gICAgICAgIDxTbGlkZXJcbiAgICAgICAgICBoYW5kbGVTdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6IGdldEhTTChzbGlkZXJWYWx1ZSkgfX1cbiAgICAgICAgICBsYWJlbD17aTE4bignQ3VzdG9tQ29sb3JFZGl0b3JfX2h1ZScpfVxuICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIkh1ZVNsaWRlciBNZWRpYUVkaXRvcl9fdG9vbHNfX3Rvb2xcIlxuICAgICAgICAgIG9uQ2hhbmdlPXtzZXRTbGlkZXJWYWx1ZX1cbiAgICAgICAgICB2YWx1ZT17c2xpZGVyVmFsdWV9XG4gICAgICAgIC8+XG4gICAgICAgIDxDb250ZXh0TWVudVxuICAgICAgICAgIGJ1dHRvbkNsYXNzTmFtZT17Y2xhc3NOYW1lcygnTWVkaWFFZGl0b3JfX3Rvb2xzX190b29sJywge1xuICAgICAgICAgICAgJ01lZGlhRWRpdG9yX190b29sc19fYnV0dG9uLS1kcmF3LXBlbic6IGRyYXdUb29sID09PSBEcmF3VG9vbC5QZW4sXG4gICAgICAgICAgICAnTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLWRyYXctaGlnaGxpZ2h0ZXInOlxuICAgICAgICAgICAgICBkcmF3VG9vbCA9PT0gRHJhd1Rvb2wuSGlnaGxpZ2h0ZXIsXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBtZW51T3B0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpY29uOiAnTWVkaWFFZGl0b3JfX2ljb24tLWRyYXctcGVuJyxcbiAgICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ01lZGlhRWRpdG9yX19kcmF3LS1wZW4nKSxcbiAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gc2V0RHJhd1Rvb2woRHJhd1Rvb2wuUGVuKSxcbiAgICAgICAgICAgICAgdmFsdWU6IERyYXdUb29sLlBlbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGljb246ICdNZWRpYUVkaXRvcl9faWNvbi0tZHJhdy1oaWdobGlnaHRlcicsXG4gICAgICAgICAgICAgIGxhYmVsOiBpMThuKCdNZWRpYUVkaXRvcl9fZHJhdy0taGlnaGxpZ2h0ZXInKSxcbiAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gc2V0RHJhd1Rvb2woRHJhd1Rvb2wuSGlnaGxpZ2h0ZXIpLFxuICAgICAgICAgICAgICB2YWx1ZTogRHJhd1Rvb2wuSGlnaGxpZ2h0ZXIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF19XG4gICAgICAgICAgdGhlbWU9e1RoZW1lLkRhcmt9XG4gICAgICAgICAgdmFsdWU9e2RyYXdUb29sfVxuICAgICAgICAvPlxuICAgICAgICA8Q29udGV4dE1lbnVcbiAgICAgICAgICBidXR0b25DbGFzc05hbWU9e2NsYXNzTmFtZXMoJ01lZGlhRWRpdG9yX190b29sc19fdG9vbCcsIHtcbiAgICAgICAgICAgICdNZWRpYUVkaXRvcl9fdG9vbHNfX2J1dHRvbi0td2lkdGgtdGhpbic6XG4gICAgICAgICAgICAgIGRyYXdXaWR0aCA9PT0gRHJhd1dpZHRoLlRoaW4sXG4gICAgICAgICAgICAnTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXdpZHRoLXJlZ3VsYXInOlxuICAgICAgICAgICAgICBkcmF3V2lkdGggPT09IERyYXdXaWR0aC5SZWd1bGFyLFxuICAgICAgICAgICAgJ01lZGlhRWRpdG9yX190b29sc19fYnV0dG9uLS13aWR0aC1tZWRpdW0nOlxuICAgICAgICAgICAgICBkcmF3V2lkdGggPT09IERyYXdXaWR0aC5NZWRpdW0sXG4gICAgICAgICAgICAnTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXdpZHRoLWhlYXZ5JzpcbiAgICAgICAgICAgICAgZHJhd1dpZHRoID09PSBEcmF3V2lkdGguSGVhdnksXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBtZW51T3B0aW9ucz17W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpY29uOiAnTWVkaWFFZGl0b3JfX2ljb24tLXdpZHRoLXRoaW4nLFxuICAgICAgICAgICAgICBsYWJlbDogaTE4bignTWVkaWFFZGl0b3JfX2RyYXctLXRoaW4nKSxcbiAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gc2V0RHJhd1dpZHRoKERyYXdXaWR0aC5UaGluKSxcbiAgICAgICAgICAgICAgdmFsdWU6IERyYXdXaWR0aC5UaGluLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaWNvbjogJ01lZGlhRWRpdG9yX19pY29uLS13aWR0aC1yZWd1bGFyJyxcbiAgICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ01lZGlhRWRpdG9yX19kcmF3LS1yZWd1bGFyJyksXG4gICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHNldERyYXdXaWR0aChEcmF3V2lkdGguUmVndWxhciksXG4gICAgICAgICAgICAgIHZhbHVlOiBEcmF3V2lkdGguUmVndWxhcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGljb246ICdNZWRpYUVkaXRvcl9faWNvbi0td2lkdGgtbWVkaXVtJyxcbiAgICAgICAgICAgICAgbGFiZWw6IGkxOG4oJ01lZGlhRWRpdG9yX19kcmF3LS1tZWRpdW0nKSxcbiAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gc2V0RHJhd1dpZHRoKERyYXdXaWR0aC5NZWRpdW0pLFxuICAgICAgICAgICAgICB2YWx1ZTogRHJhd1dpZHRoLk1lZGl1bSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGljb246ICdNZWRpYUVkaXRvcl9faWNvbi0td2lkdGgtaGVhdnknLFxuICAgICAgICAgICAgICBsYWJlbDogaTE4bignTWVkaWFFZGl0b3JfX2RyYXctLWhlYXZ5JyksXG4gICAgICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHNldERyYXdXaWR0aChEcmF3V2lkdGguSGVhdnkpLFxuICAgICAgICAgICAgICB2YWx1ZTogRHJhd1dpZHRoLkhlYXZ5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIHRoZW1lPXtUaGVtZS5EYXJrfVxuICAgICAgICAgIHZhbHVlPXtkcmF3V2lkdGh9XG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJNZWRpYUVkaXRvcl9fdG9vbHNfX3Rvb2wgTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24gTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXdvcmRzXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0TW9kZSh1bmRlZmluZWQpfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ2RvbmUnKX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8Lz5cbiAgICApO1xuICB9IGVsc2UgaWYgKGVkaXRNb2RlID09PSBFZGl0TW9kZS5Dcm9wKSB7XG4gICAgY29uc3QgY2FuUmVzZXQgPVxuICAgICAgaW1hZ2VTdGF0ZS5jcm9wWCAhPT0gMCB8fFxuICAgICAgaW1hZ2VTdGF0ZS5jcm9wWSAhPT0gMCB8fFxuICAgICAgaW1hZ2VTdGF0ZS5mbGlwWCB8fFxuICAgICAgaW1hZ2VTdGF0ZS5mbGlwWSB8fFxuICAgICAgaW1hZ2VTdGF0ZS5hbmdsZSAhPT0gMDtcblxuICAgIHRvb2xpbmcgPSAoXG4gICAgICA8PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX3Rvb2xzX190b29sIE1lZGlhRWRpdG9yX190b29sc19fYnV0dG9uIE1lZGlhRWRpdG9yX190b29sc19fYnV0dG9uLS13b3Jkc1wiXG4gICAgICAgICAgZGlzYWJsZWQ9eyFjYW5SZXNldH1cbiAgICAgICAgICBvbkNsaWNrPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZhYnJpY0NhbnZhcykge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlU3RhdGUgPSB7XG4gICAgICAgICAgICAgIC4uLklOSVRJQUxfSU1BR0VfU1RBVEUsXG4gICAgICAgICAgICAgIGhlaWdodDogaW1hZ2UuaGVpZ2h0LFxuICAgICAgICAgICAgICB3aWR0aDogaW1hZ2Uud2lkdGgsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0SW1hZ2VTdGF0ZShuZXdJbWFnZVN0YXRlKTtcbiAgICAgICAgICAgIG1vdmVGYWJyaWNPYmplY3RzRm9yUmVzZXQoZmFicmljQ2FudmFzLCBpbWFnZVN0YXRlKTtcbiAgICAgICAgICAgIHRha2VTbmFwc2hvdCgncmVzZXQnLCBuZXdJbWFnZVN0YXRlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ01lZGlhRWRpdG9yX19jcm9wLS1yZXNldCcpfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ01lZGlhRWRpdG9yX19jcm9wLS1yb3RhdGUnKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJNZWRpYUVkaXRvcl9fdG9vbHNfX3Rvb2wgTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24gTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXJvdGF0ZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmYWJyaWNDYW52YXMuZ2V0T2JqZWN0cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBjZW50ZXIgPSBvYmouZ2V0Q2VudGVyUG9pbnQoKTtcblxuICAgICAgICAgICAgICBvYmouc2V0KCdhbmdsZScsICgob2JqLmFuZ2xlIHx8IDApICsgMjcwKSAlIDM2MCk7XG5cbiAgICAgICAgICAgICAgb2JqLnNldFBvc2l0aW9uQnlPcmlnaW4oXG4gICAgICAgICAgICAgICAgbmV3IGZhYnJpYy5Qb2ludChjZW50ZXIueSwgaW1hZ2VTdGF0ZS53aWR0aCAtIGNlbnRlci54KSxcbiAgICAgICAgICAgICAgICAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAnY2VudGVyJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBvYmouc2V0Q29vcmRzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgLi4uaW1hZ2VTdGF0ZSxcbiAgICAgICAgICAgICAgYW5nbGU6IChpbWFnZVN0YXRlLmFuZ2xlICsgMjcwKSAlIDM2MCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBpbWFnZVN0YXRlLndpZHRoLFxuICAgICAgICAgICAgICB3aWR0aDogaW1hZ2VTdGF0ZS5oZWlnaHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2V0SW1hZ2VTdGF0ZShuZXdJbWFnZVN0YXRlKTtcbiAgICAgICAgICAgIHRha2VTbmFwc2hvdCgncm90YXRlJywgbmV3SW1hZ2VTdGF0ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ01lZGlhRWRpdG9yX19jcm9wLS1mbGlwJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX3Rvb2xzX190b29sIE1lZGlhRWRpdG9yX190b29sc19fYnV0dG9uIE1lZGlhRWRpdG9yX190b29sc19fYnV0dG9uLS1mbGlwXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWZhYnJpY0NhbnZhcykge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlU3RhdGUgPSB7XG4gICAgICAgICAgICAgIC4uLmltYWdlU3RhdGUsXG4gICAgICAgICAgICAgIC4uLihpbWFnZVN0YXRlLmFuZ2xlICUgMTgwXG4gICAgICAgICAgICAgICAgPyB7IGZsaXBZOiAhaW1hZ2VTdGF0ZS5mbGlwWSB9XG4gICAgICAgICAgICAgICAgOiB7IGZsaXBYOiAhaW1hZ2VTdGF0ZS5mbGlwWCB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZXRJbWFnZVN0YXRlKG5ld0ltYWdlU3RhdGUpO1xuICAgICAgICAgICAgdGFrZVNuYXBzaG90KCdmbGlwJywgbmV3SW1hZ2VTdGF0ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ01lZGlhRWRpdG9yX19jcm9wLS1sb2NrJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ01lZGlhRWRpdG9yX190b29sc19fYnV0dG9uJyxcbiAgICAgICAgICAgIGBNZWRpYUVkaXRvcl9fdG9vbHNfX2J1dHRvbi0tY3JvcC0ke1xuICAgICAgICAgICAgICBjcm9wQXNwZWN0UmF0aW9Mb2NrID8gJycgOiAndW4nXG4gICAgICAgICAgICB9bG9ja2VkYFxuICAgICAgICAgICl9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZhYnJpY0NhbnZhcykge1xuICAgICAgICAgICAgICBmYWJyaWNDYW52YXMudW5pZm9ybVNjYWxpbmcgPSAhY3JvcEFzcGVjdFJhdGlvTG9jaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldENyb3BBc3BlY3RSYXRpb0xvY2soIWNyb3BBc3BlY3RSYXRpb0xvY2spO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJNZWRpYUVkaXRvcl9fdG9vbHNfX3Rvb2wgTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24gTWVkaWFFZGl0b3JfX3Rvb2xzX19idXR0b24tLXdvcmRzXCJcbiAgICAgICAgICBkaXNhYmxlZD17IWNhbkNyb3B9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nQ3JvcCA9IGdldFBlbmRpbmdDcm9wKGZhYnJpY0NhbnZhcyk7XG4gICAgICAgICAgICBpZiAoIXBlbmRpbmdDcm9wKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VTdGF0ZSA9IGdldE5ld0ltYWdlU3RhdGVGcm9tQ3JvcChcbiAgICAgICAgICAgICAgaW1hZ2VTdGF0ZSxcbiAgICAgICAgICAgICAgcGVuZGluZ0Nyb3BcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRJbWFnZVN0YXRlKG5ld0ltYWdlU3RhdGUpO1xuICAgICAgICAgICAgbW92ZUZhYnJpY09iamVjdHNGb3JDcm9wKGZhYnJpY0NhbnZhcywgcGVuZGluZ0Nyb3ApO1xuICAgICAgICAgICAgdGFrZVNuYXBzaG90KCdjcm9wJywgbmV3SW1hZ2VTdGF0ZSk7XG4gICAgICAgICAgICBzZXRFZGl0TW9kZSh1bmRlZmluZWQpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignZG9uZScpfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX2NvbnRhaW5lclwiPlxuICAgICAgICA8TWVhc3VyZVxuICAgICAgICAgIGJvdW5kc1xuICAgICAgICAgIG9uUmVzaXplPXsoeyBib3VuZHMgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFib3VuZHMpIHtcbiAgICAgICAgICAgICAgbG9nLmVycm9yKCdXZSBzaG91bGQgYmUgbWVhc3VyaW5nIHRoZSBib3VuZHMnKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Q29udGFpbmVyV2lkdGgoYm91bmRzLndpZHRoKTtcbiAgICAgICAgICAgIHNldENvbnRhaW5lckhlaWdodChib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgeyh7IG1lYXN1cmVSZWYgfSkgPT4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJNZWRpYUVkaXRvcl9fbWVkaWFcIiByZWY9e21lYXN1cmVSZWZ9PlxuICAgICAgICAgICAgICB7aW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8Y2FudmFzXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnTWVkaWFFZGl0b3JfX21lZGlhLS1jYW52YXMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgJ01lZGlhRWRpdG9yX19tZWRpYS0tY2FudmFzLS1jcm9wcGluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0TW9kZSA9PT0gRWRpdE1vZGUuQ3JvcCxcbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIGlkPXtjYW52YXNJZH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L01lYXN1cmU+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX3Rvb2xiYXJcIj5cbiAgICAgICAge3Rvb2xpbmcgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJNZWRpYUVkaXRvcl9fdG9vbHNcIj57dG9vbGluZ308L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIk1lZGlhRWRpdG9yX190b29sYmFyLS1zcGFjZVwiIC8+XG4gICAgICAgICl9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX3Rvb2xiYXItLWJ1dHRvbnNcIj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgdGhlbWU9e1RoZW1lLkRhcmt9XG4gICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignZGlzY2FyZCcpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX2NvbnRyb2xzXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ01lZGlhRWRpdG9yX19jb250cm9sLS1kcmF3Jyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgTWVkaWFFZGl0b3JfX2NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICAgICAgJ01lZGlhRWRpdG9yX19jb250cm9sLS1wZW4nOiB0cnVlLFxuICAgICAgICAgICAgICAgICdNZWRpYUVkaXRvcl9fY29udHJvbC0tc2VsZWN0ZWQnOiBlZGl0TW9kZSA9PT0gRWRpdE1vZGUuRHJhdyxcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRFZGl0TW9kZShcbiAgICAgICAgICAgICAgICAgIGVkaXRNb2RlID09PSBFZGl0TW9kZS5EcmF3ID8gdW5kZWZpbmVkIDogRWRpdE1vZGUuRHJhd1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXRleHQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICBNZWRpYUVkaXRvcl9fY29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXRleHQnOiB0cnVlLFxuICAgICAgICAgICAgICAgICdNZWRpYUVkaXRvcl9fY29udHJvbC0tc2VsZWN0ZWQnOiBlZGl0TW9kZSA9PT0gRWRpdE1vZGUuVGV4dCxcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLlRleHQpIHtcbiAgICAgICAgICAgICAgICAgIHNldEVkaXRNb2RlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBmYWJyaWNDYW52YXM/LmdldEFjdGl2ZU9iamVjdCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIE1lZGlhRWRpdG9yRmFicmljSVRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmV4aXRFZGl0aW5nKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHNldEVkaXRNb2RlKEVkaXRNb2RlLlRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFN0aWNrZXJCdXR0b25cbiAgICAgICAgICAgICAgYmxlc3NlZFBhY2tzPXtbXX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICBNZWRpYUVkaXRvcl9fY29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXN0aWNrZXInOiB0cnVlLFxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgY2xlYXJJbnN0YWxsZWRTdGlja2VyUGFjaz17bm9vcH1cbiAgICAgICAgICAgICAgY2xlYXJTaG93SW50cm9kdWN0aW9uPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gV2UncmUgdXNpbmcgdGhpcyBhcyBhIGNhbGxiYWNrIGZvciB3aGVuIHRoZSBzdGlja2VyIGJ1dHRvblxuICAgICAgICAgICAgICAgIC8vIGlzIHByZXNzZWQuXG4gICAgICAgICAgICAgICAgZmFicmljQ2FudmFzPy5kaXNjYXJkQWN0aXZlT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgc2V0RWRpdE1vZGUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xlYXJTaG93UGlja2VySGludD17bm9vcH1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaW5zdGFsbGVkUGFja3M9e2luc3RhbGxlZFBhY2tzfVxuICAgICAgICAgICAgICBrbm93blBhY2tzPXtbXX1cbiAgICAgICAgICAgICAgb25QaWNrU3RpY2tlcj17KF9wYWNrSWQsIF9zdGlja2VySWQsIHNyYzogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBTVElDS0VSX1NJWkVfUkVMQVRJVkVfVE9fQ0FOVkFTID0gNDtcbiAgICAgICAgICAgICAgICBjb25zdCBzaXplID1cbiAgICAgICAgICAgICAgICAgIE1hdGgubWluKGltYWdlU3RhdGUud2lkdGgsIGltYWdlU3RhdGUuaGVpZ2h0KSAvXG4gICAgICAgICAgICAgICAgICBTVElDS0VSX1NJWkVfUkVMQVRJVkVfVE9fQ0FOVkFTO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG5ldyBNZWRpYUVkaXRvckZhYnJpY1N0aWNrZXIoc3JjKTtcbiAgICAgICAgICAgICAgICBzdGlja2VyLnNjYWxlVG9IZWlnaHQoc2l6ZSk7XG4gICAgICAgICAgICAgICAgc3RpY2tlci5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxuICAgICAgICAgICAgICAgICAgbmV3IGZhYnJpYy5Qb2ludChpbWFnZVN0YXRlLndpZHRoIC8gMiwgaW1hZ2VTdGF0ZS5oZWlnaHQgLyAyKSxcbiAgICAgICAgICAgICAgICAgICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgJ2NlbnRlcidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHN0aWNrZXIuc2V0Q29vcmRzKCk7XG5cbiAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMuYWRkKHN0aWNrZXIpO1xuICAgICAgICAgICAgICAgIGZhYnJpY0NhbnZhcy5zZXRBY3RpdmVPYmplY3Qoc3RpY2tlcik7XG4gICAgICAgICAgICAgICAgc2V0RWRpdE1vZGUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcmVjZWl2ZWRQYWNrcz17W119XG4gICAgICAgICAgICAgIHJlY2VudFN0aWNrZXJzPXtyZWNlbnRTdGlja2Vyc31cbiAgICAgICAgICAgICAgc2hvd1BpY2tlckhpbnQ9e2ZhbHNlfVxuICAgICAgICAgICAgICB0aGVtZT17VGhlbWUuRGFya31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ01lZGlhRWRpdG9yX19jb250cm9sLS1jcm9wJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgTWVkaWFFZGl0b3JfX2NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICAgICAgJ01lZGlhRWRpdG9yX19jb250cm9sLS1jcm9wJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXNlbGVjdGVkJzogZWRpdE1vZGUgPT09IEVkaXRNb2RlLkNyb3AsXG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWJyaWNDYW52YXMpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRNb2RlID09PSBFZGl0TW9kZS5Dcm9wKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBmYWJyaWNDYW52YXMuZ2V0QWN0aXZlT2JqZWN0KCk7XG4gICAgICAgICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdCkge1xuICAgICAgICAgICAgICAgICAgICBmYWJyaWNDYW52YXMucmVtb3ZlKG9iaik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBzZXRFZGl0TW9kZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBzZXRFZGl0TW9kZShFZGl0TW9kZS5Dcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXVuZG8nKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX2NvbnRyb2wgTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXVuZG9cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblVuZG99XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLkNyb3ApIHtcbiAgICAgICAgICAgICAgICAgIHNldEVkaXRNb2RlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVuZG9JZlBvc3NpYmxlKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXJlZG8nKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiTWVkaWFFZGl0b3JfX2NvbnRyb2wgTWVkaWFFZGl0b3JfX2NvbnRyb2wtLXJlZG9cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWNhblJlZG99XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdE1vZGUgPT09IEVkaXRNb2RlLkNyb3ApIHtcbiAgICAgICAgICAgICAgICAgIHNldEVkaXRNb2RlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlZG9JZlBvc3NpYmxlKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17IWltYWdlIHx8IGlzU2F2aW5nfVxuICAgICAgICAgICAgb25DbGljaz17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWZhYnJpY0NhbnZhcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHNldEVkaXRNb2RlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIHNldElzU2F2aW5nKHRydWUpO1xuXG4gICAgICAgICAgICAgIGxldCBkYXRhOiBVaW50OEFycmF5O1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlckZhYnJpY0NhbnZhcyA9IGF3YWl0IGNsb25lRmFicmljQ2FudmFzKFxuICAgICAgICAgICAgICAgICAgZmFicmljQ2FudmFzXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHJlbmRlckZhYnJpY0NhbnZhcy5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAuLi5yZW5kZXJGYWJyaWNDYW52YXNcbiAgICAgICAgICAgICAgICAgICAgLmdldE9iamVjdHMoKVxuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKG9iaiA9PiBvYmouZXhjbHVkZUZyb21FeHBvcnQpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGxldCBmaW5hbEltYWdlU3RhdGU6IEltYWdlU3RhdGVUeXBlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdDcm9wID0gZ2V0UGVuZGluZ0Nyb3AoZmFicmljQ2FudmFzKTtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ0Nyb3ApIHtcbiAgICAgICAgICAgICAgICAgIGZpbmFsSW1hZ2VTdGF0ZSA9IGdldE5ld0ltYWdlU3RhdGVGcm9tQ3JvcChcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ0Nyb3BcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBtb3ZlRmFicmljT2JqZWN0c0ZvckNyb3AocmVuZGVyRmFicmljQ2FudmFzLCBwZW5kaW5nQ3JvcCk7XG4gICAgICAgICAgICAgICAgICBkcmF3RmFicmljQmFja2dyb3VuZEltYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgZmFicmljQ2FudmFzOiByZW5kZXJGYWJyaWNDYW52YXMsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVN0YXRlOiBmaW5hbEltYWdlU3RhdGUsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmluYWxJbWFnZVN0YXRlID0gaW1hZ2VTdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZW5kZXJGYWJyaWNDYW52YXMuc2V0RGltZW5zaW9ucyh7XG4gICAgICAgICAgICAgICAgICB3aWR0aDogZmluYWxJbWFnZVN0YXRlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBmaW5hbEltYWdlU3RhdGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlbmRlckZhYnJpY0NhbnZhcy5zZXRab29tKDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkQ2FudmFzID0gcmVuZGVyRmFicmljQ2FudmFzLnRvQ2FudmFzRWxlbWVudCgpO1xuXG4gICAgICAgICAgICAgICAgZGF0YSA9IGF3YWl0IGNhbnZhc1RvQnl0ZXMocmVuZGVyZWRDYW52YXMpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHNldElzU2F2aW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG9uRG9uZShkYXRhKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB0aGVtZT17VGhlbWUuRGFya31cbiAgICAgICAgICAgIHZhcmlhbnQ9e0J1dHRvblZhcmlhbnQuUHJpbWFyeX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignc2F2ZScpfVxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBwb3J0YWxcbiAgKTtcbn07XG5cbmZ1bmN0aW9uIGdldFBlbmRpbmdDcm9wKFxuICBmYWJyaWNDYW52YXM6IGZhYnJpYy5DYW52YXNcbik6IHVuZGVmaW5lZCB8IFBlbmRpbmdDcm9wVHlwZSB7XG4gIGNvbnN0IGFjdGl2ZU9iamVjdCA9IGZhYnJpY0NhbnZhcy5nZXRBY3RpdmVPYmplY3QoKTtcbiAgcmV0dXJuIGFjdGl2ZU9iamVjdCBpbnN0YW5jZW9mIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3RcbiAgICA/IGFjdGl2ZU9iamVjdC5nZXRCb3VuZGluZ1JlY3QodHJ1ZSlcbiAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0TmV3SW1hZ2VTdGF0ZUZyb21Dcm9wKFxuICBzdGF0ZTogUmVhZG9ubHk8SW1hZ2VTdGF0ZVR5cGU+LFxuICB7IGxlZnQsIGhlaWdodCwgdG9wLCB3aWR0aCB9OiBSZWFkb25seTxQZW5kaW5nQ3JvcFR5cGU+XG4pOiBJbWFnZVN0YXRlVHlwZSB7XG4gIGxldCBjcm9wWDogbnVtYmVyO1xuICBsZXQgY3JvcFk6IG51bWJlcjtcbiAgc3dpdGNoIChzdGF0ZS5hbmdsZSkge1xuICAgIGNhc2UgMDpcbiAgICAgIGNyb3BYID0gc3RhdGUuY3JvcFggKyBsZWZ0O1xuICAgICAgY3JvcFkgPSBzdGF0ZS5jcm9wWSArIHRvcDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgOTA6XG4gICAgICBjcm9wWCA9IHN0YXRlLmNyb3BYICsgdG9wO1xuICAgICAgY3JvcFkgPSBzdGF0ZS5jcm9wWSArIChzdGF0ZS53aWR0aCAtIChsZWZ0ICsgd2lkdGgpKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMTgwOlxuICAgICAgY3JvcFggPSBzdGF0ZS5jcm9wWCArIChzdGF0ZS53aWR0aCAtIChsZWZ0ICsgd2lkdGgpKTtcbiAgICAgIGNyb3BZID0gc3RhdGUuY3JvcFkgKyAoc3RhdGUuaGVpZ2h0IC0gKHRvcCArIGhlaWdodCkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyNzA6XG4gICAgICBjcm9wWCA9IHN0YXRlLmNyb3BYICsgKHN0YXRlLmhlaWdodCAtICh0b3AgKyBoZWlnaHQpKTtcbiAgICAgIGNyb3BZID0gc3RhdGUuY3JvcFkgKyBsZWZ0O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBhbmdsZScpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBjcm9wWCxcbiAgICBjcm9wWSxcbiAgICBoZWlnaHQsXG4gICAgd2lkdGgsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsb25lRmFicmljQ2FudmFzKG9yaWdpbmFsOiBmYWJyaWMuQ2FudmFzKTogUHJvbWlzZTxmYWJyaWMuQ2FudmFzPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBvcmlnaW5hbC5jbG9uZShyZXNvbHZlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVGYWJyaWNPYmplY3RzRm9yQ3JvcChcbiAgZmFicmljQ2FudmFzOiBmYWJyaWMuQ2FudmFzLFxuICB7IGxlZnQsIHRvcCB9OiBSZWFkb25seTxQZW5kaW5nQ3JvcFR5cGU+XG4pOiB2b2lkIHtcbiAgZmFicmljQ2FudmFzLmdldE9iamVjdHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSBvYmouZ2V0Q2VudGVyUG9pbnQoKTtcblxuICAgIGNvbnN0IHRyYW5zbGF0ZWRDZW50ZXIgPSBuZXcgZmFicmljLlBvaW50KHggLSBsZWZ0LCB5IC0gdG9wKTtcbiAgICBvYmouc2V0UG9zaXRpb25CeU9yaWdpbih0cmFuc2xhdGVkQ2VudGVyLCAnY2VudGVyJywgJ2NlbnRlcicpO1xuICAgIG9iai5zZXRDb29yZHMoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVGYWJyaWNPYmplY3RzRm9yUmVzZXQoXG4gIGZhYnJpY0NhbnZhczogZmFicmljLkNhbnZhcyxcbiAgb2xkSW1hZ2VTdGF0ZTogUmVhZG9ubHk8SW1hZ2VTdGF0ZVR5cGU+XG4pOiB2b2lkIHtcbiAgZmFicmljQ2FudmFzLmdldE9iamVjdHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgaWYgKG9iai5leGNsdWRlRnJvbUV4cG9ydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBuZXdDZW50ZXJYOiBudW1iZXI7XG4gICAgbGV0IG5ld0NlbnRlclk6IG51bWJlcjtcblxuICAgIC8vIEZpcnN0LCByZXNldCBwb3NpdGlvbiBjaGFuZ2VzIGNhdXNlZCBieSBpbWFnZSByb3RhdGlvbjpcbiAgICBjb25zdCBvbGRDZW50ZXIgPSBvYmouZ2V0Q2VudGVyUG9pbnQoKTtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21SaWdodEVkZ2UgPSBvbGRJbWFnZVN0YXRlLndpZHRoIC0gb2xkQ2VudGVyLng7XG4gICAgY29uc3QgZGlzdGFuY2VGcm9tQm90dG9tRWRnZSA9IG9sZEltYWdlU3RhdGUuaGVpZ2h0IC0gb2xkQ2VudGVyLnk7XG4gICAgc3dpdGNoIChvbGRJbWFnZVN0YXRlLmFuZ2xlICUgMzYwKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG5ld0NlbnRlclggPSBvbGRDZW50ZXIueDtcbiAgICAgICAgbmV3Q2VudGVyWSA9IG9sZENlbnRlci55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTA6XG4gICAgICAgIG5ld0NlbnRlclggPSBvbGRDZW50ZXIueTtcbiAgICAgICAgbmV3Q2VudGVyWSA9IGRpc3RhbmNlRnJvbVJpZ2h0RWRnZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE4MDpcbiAgICAgICAgbmV3Q2VudGVyWCA9IGRpc3RhbmNlRnJvbVJpZ2h0RWRnZTtcbiAgICAgICAgbmV3Q2VudGVyWSA9IGRpc3RhbmNlRnJvbUJvdHRvbUVkZ2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyNzA6XG4gICAgICAgIG5ld0NlbnRlclggPSBkaXN0YW5jZUZyb21Cb3R0b21FZGdlO1xuICAgICAgICBuZXdDZW50ZXJZID0gb2xkQ2VudGVyLng7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGFuZ2xlJyk7XG4gICAgfVxuXG4gICAgLy8gTmV4dCwgcmVzZXQgcG9zaXRpb24gY2hhbmdlcyBjYXVzZWQgYnkgY3JvcDpcbiAgICBuZXdDZW50ZXJYICs9IG9sZEltYWdlU3RhdGUuY3JvcFg7XG4gICAgbmV3Q2VudGVyWSArPSBvbGRJbWFnZVN0YXRlLmNyb3BZO1xuXG4gICAgLy8gSXQncyBpbXBvcnRhbnQgdG8gc2V0IHRoZSBhbmdsZSAqYmVmb3JlKiBzZXR0aW5nIHRoZSBwb3NpdGlvbiwgYmVjYXVzZVxuICAgIC8vICAgRmFicmljJ3MgcG9zaXRpb25pbmcgaXMgYWZmZWN0ZWQgYnkgb2JqZWN0IGFuZ2xlLlxuICAgIG9iai5zZXQoJ2FuZ2xlJywgKG9iai5hbmdsZSB8fCAwKSAtIG9sZEltYWdlU3RhdGUuYW5nbGUpO1xuICAgIG9iai5zZXRQb3NpdGlvbkJ5T3JpZ2luKFxuICAgICAgbmV3IGZhYnJpYy5Qb2ludChuZXdDZW50ZXJYLCBuZXdDZW50ZXJZKSxcbiAgICAgICdjZW50ZXInLFxuICAgICAgJ2NlbnRlcidcbiAgICApO1xuXG4gICAgb2JqLnNldENvb3JkcygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZHJhd0ZhYnJpY0JhY2tncm91bmRJbWFnZSh7XG4gIGZhYnJpY0NhbnZhcyxcbiAgaW1hZ2UsXG4gIGltYWdlU3RhdGUsXG59OiBSZWFkb25seTx7XG4gIGZhYnJpY0NhbnZhczogZmFicmljLkNhbnZhcztcbiAgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGltYWdlU3RhdGU6IFJlYWRvbmx5PEltYWdlU3RhdGVUeXBlPjtcbn0+KTogdm9pZCB7XG4gIGNvbnN0IGJhY2tncm91bmRJbWFnZSA9IG5ldyBmYWJyaWMuSW1hZ2UoaW1hZ2UsIHtcbiAgICBjYW52YXM6IGZhYnJpY0NhbnZhcyxcbiAgICBoZWlnaHQ6IGltYWdlU3RhdGUuaGVpZ2h0IHx8IGltYWdlLmhlaWdodCxcbiAgICB3aWR0aDogaW1hZ2VTdGF0ZS53aWR0aCB8fCBpbWFnZS53aWR0aCxcbiAgfSk7XG5cbiAgbGV0IGxlZnQ6IG51bWJlcjtcbiAgbGV0IHRvcDogbnVtYmVyO1xuICBzd2l0Y2ggKGltYWdlU3RhdGUuYW5nbGUpIHtcbiAgICBjYXNlIDA6XG4gICAgICBsZWZ0ID0gMDtcbiAgICAgIHRvcCA9IDA7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDkwOlxuICAgICAgbGVmdCA9IGltYWdlU3RhdGUud2lkdGg7XG4gICAgICB0b3AgPSAwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAxODA6XG4gICAgICBsZWZ0ID0gaW1hZ2VTdGF0ZS53aWR0aDtcbiAgICAgIHRvcCA9IGltYWdlU3RhdGUuaGVpZ2h0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyNzA6XG4gICAgICBsZWZ0ID0gMDtcbiAgICAgIHRvcCA9IGltYWdlU3RhdGUuaGVpZ2h0O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBhbmdsZScpO1xuICB9XG5cbiAgbGV0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gaW1hZ2VTdGF0ZTtcbiAgaWYgKGltYWdlU3RhdGUuYW5nbGUgJSAxODApIHtcbiAgICBbd2lkdGgsIGhlaWdodF0gPSBbaGVpZ2h0LCB3aWR0aF07XG4gIH1cblxuICBmYWJyaWNDYW52YXMuc2V0QmFja2dyb3VuZEltYWdlKFxuICAgIGJhY2tncm91bmRJbWFnZSxcbiAgICBmYWJyaWNDYW52YXMucmVxdWVzdFJlbmRlckFsbC5iaW5kKGZhYnJpY0NhbnZhcyksXG4gICAge1xuICAgICAgYW5nbGU6IGltYWdlU3RhdGUuYW5nbGUsXG4gICAgICBjcm9wWDogaW1hZ2VTdGF0ZS5jcm9wWCxcbiAgICAgIGNyb3BZOiBpbWFnZVN0YXRlLmNyb3BZLFxuICAgICAgZmxpcFg6IGltYWdlU3RhdGUuZmxpcFgsXG4gICAgICBmbGlwWTogaW1hZ2VTdGF0ZS5mbGlwWSxcbiAgICAgIGxlZnQsXG4gICAgICB0b3AsXG4gICAgICBvcmlnaW5YOiAnbGVmdCcsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAg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
