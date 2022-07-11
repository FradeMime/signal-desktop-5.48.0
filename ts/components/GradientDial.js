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
var GradientDial_exports = {};
__export(GradientDial_exports, {
  GradientDial: () => GradientDial,
  KnobType: () => KnobType
});
module.exports = __toCommonJS(GradientDial_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var KnobType = /* @__PURE__ */ ((KnobType2) => {
  KnobType2["start"] = "start";
  KnobType2["end"] = "end";
  return KnobType2;
})(KnobType || {});
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
function getKnobCoordinates(degrees, rect) {
  const center = {
    x: rect.width / 2,
    y: rect.height / 2
  };
  const alpha = toDegrees(Math.atan(rect.height / rect.width));
  const beta = (360 - alpha * 4) / 4;
  if (degrees < alpha) {
    const a2 = center.x;
    const b2 = a2 * Math.tan(toRadians(degrees));
    return {
      start: {
        left: rect.width,
        top: center.y - b2
      },
      end: {
        left: 0,
        top: center.y + b2
      }
    };
  }
  if (degrees < 90) {
    const phi2 = 90 - degrees;
    const a2 = center.y;
    const b2 = a2 * Math.tan(toRadians(phi2));
    return {
      start: {
        left: center.x + b2,
        top: 0
      },
      end: {
        left: center.x - b2,
        top: rect.height
      }
    };
  }
  if (degrees < 90 + beta) {
    const phi2 = degrees - 90;
    const a2 = center.y;
    const b2 = a2 * Math.tan(toRadians(phi2));
    return {
      start: {
        left: center.x - b2,
        top: 0
      },
      end: {
        left: center.x + b2,
        top: rect.height
      }
    };
  }
  if (degrees < 180) {
    const phi2 = 180 - degrees;
    const a2 = center.x;
    const b2 = a2 * Math.tan(toRadians(phi2));
    return {
      start: {
        left: 0,
        top: center.y - b2
      },
      end: {
        left: rect.width,
        top: center.y + b2
      }
    };
  }
  if (degrees < 180 + alpha) {
    const phi2 = degrees - 180;
    const a2 = center.x;
    const b2 = a2 * Math.tan(toRadians(phi2));
    return {
      start: {
        left: 0,
        top: center.y + b2
      },
      end: {
        left: rect.width,
        top: center.y - b2
      }
    };
  }
  if (degrees < 270) {
    const phi2 = 270 - degrees;
    const a2 = center.y;
    const b2 = a2 * Math.tan(toRadians(phi2));
    return {
      start: {
        left: center.x - b2,
        top: rect.height
      },
      end: {
        left: center.x + b2,
        top: 0
      }
    };
  }
  if (degrees < 270 + beta) {
    const phi2 = degrees - 270;
    const a2 = center.y;
    const b2 = a2 * Math.tan(toRadians(phi2));
    return {
      start: {
        left: center.x + b2,
        top: rect.height
      },
      end: {
        left: center.x - b2,
        top: 0
      }
    };
  }
  const phi = 360 - degrees;
  const a = center.x;
  const b = a * Math.tan(toRadians(phi));
  return {
    start: {
      left: rect.width,
      top: center.y + b
    },
    end: {
      left: 0,
      top: center.y - b
    }
  };
}
const GradientDial = /* @__PURE__ */ __name(({
  deg = 180,
  knob1Style,
  knob2Style,
  onChange,
  onClick,
  selectedKnob
}) => {
  const containerRef = (0, import_react.useRef)(null);
  const [knobDim, setKnobDim] = (0, import_react.useState)({});
  const handleMouseMove = /* @__PURE__ */ __name((ev) => {
    if (!containerRef || !containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const center = {
      x: rect.width / 2,
      y: rect.height / 2
    };
    const a = {
      x: ev.clientX - (rect.x + center.x),
      y: ev.clientY - (rect.y + center.y)
    };
    const b = { x: center.x, y: 0 };
    const dot = a.x * b.x + a.y * b.y;
    const det = a.x * b.y - a.y * b.x;
    const offset = selectedKnob === "end" /* end */ ? 180 : 0;
    const degrees = (toDegrees(Math.atan2(det, dot)) + 360 + offset) % 360;
    onChange(degrees);
    ev.preventDefault();
    ev.stopPropagation();
  }, "handleMouseMove");
  const handleMouseUp = /* @__PURE__ */ __name(() => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  }, "handleMouseUp");
  const handleMouseDown = /* @__PURE__ */ __name((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, "handleMouseDown");
  const handleKeyDown = /* @__PURE__ */ __name((ev) => {
    let add = 1;
    if (ev.key === "ArrowDown" || ev.key === "ArrowLeft") {
      add = 1;
    }
    if (ev.key === "ArrowRight" || ev.key === "ArrowUp") {
      add = -1;
    }
    onChange(Math.min(360, Math.max(0, deg + add)));
  }, "handleKeyDown");
  (0, import_react.useEffect)(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    setKnobDim(getKnobCoordinates(deg, containerRect));
  }, [containerRef, deg]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "GradientDial__container",
    ref: containerRef
  }, knobDim.start && /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": "0",
    className: (0, import_classnames.default)("GradientDial__knob", {
      "GradientDial__knob--selected": selectedKnob === "start" /* start */
    }),
    onKeyDown: handleKeyDown,
    onMouseDown: (ev) => {
      if (selectedKnob === "start" /* start */) {
        handleMouseDown(ev);
      }
    },
    onClick: () => {
      onClick("start" /* start */);
    },
    role: "button",
    style: {
      ...knob1Style,
      ...knobDim.start
    },
    tabIndex: 0
  }), knobDim.end && /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-label": "1",
    className: (0, import_classnames.default)("GradientDial__knob", {
      "GradientDial__knob--selected": selectedKnob === "end" /* end */
    }),
    onKeyDown: handleKeyDown,
    onMouseDown: (ev) => {
      if (selectedKnob === "end" /* end */) {
        handleMouseDown(ev);
      }
    },
    onClick: () => {
      onClick("end" /* end */);
    },
    role: "button",
    style: {
      ...knob2Style,
      ...knobDim.end
    },
    tabIndex: 0
  }), knobDim.start && knobDim.end && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "GradientDial__bar--container"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "GradientDial__bar--node",
    style: {
      transform: `translate(-50%, -50%) rotate(${90 - deg}deg)`
    }
  })));
}, "GradientDial");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GradientDial,
  KnobType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JhZGllbnREaWFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENTU1Byb3BlcnRpZXMsIEtleWJvYXJkRXZlbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmV4cG9ydCBlbnVtIEtub2JUeXBlIHtcbiAgc3RhcnQgPSAnc3RhcnQnLFxuICBlbmQgPSAnZW5kJyxcbn1cblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBkZWc/OiBudW1iZXI7XG4gIGtub2IxU3R5bGU6IENTU1Byb3BlcnRpZXM7XG4gIGtub2IyU3R5bGU6IENTU1Byb3BlcnRpZXM7XG4gIG9uQ2hhbmdlOiAoZGVnOiBudW1iZXIpID0+IHVua25vd247XG4gIG9uQ2xpY2s6IChrbm9iOiBLbm9iVHlwZSkgPT4gdW5rbm93bjtcbiAgc2VsZWN0ZWRLbm9iOiBLbm9iVHlwZTtcbn07XG5cbi8vIENvbnZlcnRzIGZyb20gZGVncmVlcyB0byByYWRpYW5zLlxuZnVuY3Rpb24gdG9SYWRpYW5zKGRlZ3JlZXM6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiAoZGVncmVlcyAqIE1hdGguUEkpIC8gMTgwO1xufVxuXG4vLyBDb252ZXJ0cyBmcm9tIHJhZGlhbnMgdG8gZGVncmVlcy5cbmZ1bmN0aW9uIHRvRGVncmVlcyhyYWRpYW5zOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKHJhZGlhbnMgKiAxODApIC8gTWF0aC5QSTtcbn1cblxudHlwZSBDU1NQb3NpdGlvbiA9IHsgbGVmdDogbnVtYmVyOyB0b3A6IG51bWJlciB9O1xuXG5mdW5jdGlvbiBnZXRLbm9iQ29vcmRpbmF0ZXMoXG4gIGRlZ3JlZXM6IG51bWJlcixcbiAgcmVjdDogQ2xpZW50UmVjdFxuKTogeyBzdGFydDogQ1NTUG9zaXRpb247IGVuZDogQ1NTUG9zaXRpb24gfSB7XG4gIGNvbnN0IGNlbnRlciA9IHtcbiAgICB4OiByZWN0LndpZHRoIC8gMixcbiAgICB5OiByZWN0LmhlaWdodCAvIDIsXG4gIH07XG4gIGNvbnN0IGFscGhhID0gdG9EZWdyZWVzKE1hdGguYXRhbihyZWN0LmhlaWdodCAvIHJlY3Qud2lkdGgpKTtcbiAgY29uc3QgYmV0YSA9ICgzNjAuMCAtIGFscGhhICogNCkgLyA0O1xuXG4gIGlmIChkZWdyZWVzIDwgYWxwaGEpIHtcbiAgICAvLyBSaWdodCB0b3BcbiAgICBjb25zdCBhID0gY2VudGVyLng7XG4gICAgY29uc3QgYiA9IGEgKiBNYXRoLnRhbih0b1JhZGlhbnMoZGVncmVlcykpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGxlZnQ6IHJlY3Qud2lkdGgsXG4gICAgICAgIHRvcDogY2VudGVyLnkgLSBiLFxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICB0b3A6IGNlbnRlci55ICsgYixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChkZWdyZWVzIDwgOTApIHtcbiAgICAvLyBUb3AgcmlnaHRcbiAgICBjb25zdCBwaGkgPSA5MCAtIGRlZ3JlZXM7XG4gICAgY29uc3QgYSA9IGNlbnRlci55O1xuICAgIGNvbnN0IGIgPSBhICogTWF0aC50YW4odG9SYWRpYW5zKHBoaSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGxlZnQ6IGNlbnRlci54ICsgYixcbiAgICAgICAgdG9wOiAwLFxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBsZWZ0OiBjZW50ZXIueCAtIGIsXG4gICAgICAgIHRvcDogcmVjdC5oZWlnaHQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoZGVncmVlcyA8IDkwICsgYmV0YSkge1xuICAgIC8vIFRvcCBsZWZ0XG4gICAgY29uc3QgcGhpID0gZGVncmVlcyAtIDkwO1xuICAgIGNvbnN0IGEgPSBjZW50ZXIueTtcbiAgICBjb25zdCBiID0gYSAqIE1hdGgudGFuKHRvUmFkaWFucyhwaGkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDoge1xuICAgICAgICBsZWZ0OiBjZW50ZXIueCAtIGIsXG4gICAgICAgIHRvcDogMCxcbiAgICAgIH0sXG4gICAgICBlbmQ6IHtcbiAgICAgICAgbGVmdDogY2VudGVyLnggKyBiLFxuICAgICAgICB0b3A6IHJlY3QuaGVpZ2h0LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGRlZ3JlZXMgPCAxODApIHtcbiAgICAvLyBsZWZ0IHRvcFxuICAgIGNvbnN0IHBoaSA9IDE4MCAtIGRlZ3JlZXM7XG4gICAgY29uc3QgYSA9IGNlbnRlci54O1xuICAgIGNvbnN0IGIgPSBhICogTWF0aC50YW4odG9SYWRpYW5zKHBoaSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogY2VudGVyLnkgLSBiLFxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBsZWZ0OiByZWN0LndpZHRoLFxuICAgICAgICB0b3A6IGNlbnRlci55ICsgYixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChkZWdyZWVzIDwgMTgwICsgYWxwaGEpIHtcbiAgICAvLyBsZWZ0IGJvdHRvbVxuICAgIGNvbnN0IHBoaSA9IGRlZ3JlZXMgLSAxODA7XG4gICAgY29uc3QgYSA9IGNlbnRlci54O1xuICAgIGNvbnN0IGIgPSBhICogTWF0aC50YW4odG9SYWRpYW5zKHBoaSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogY2VudGVyLnkgKyBiLFxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBsZWZ0OiByZWN0LndpZHRoLFxuICAgICAgICB0b3A6IGNlbnRlci55IC0gYixcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChkZWdyZWVzIDwgMjcwKSB7XG4gICAgLy8gYm90dG9tIGxlZnRcbiAgICBjb25zdCBwaGkgPSAyNzAgLSBkZWdyZWVzO1xuICAgIGNvbnN0IGEgPSBjZW50ZXIueTtcbiAgICBjb25zdCBiID0gYSAqIE1hdGgudGFuKHRvUmFkaWFucyhwaGkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDoge1xuICAgICAgICBsZWZ0OiBjZW50ZXIueCAtIGIsXG4gICAgICAgIHRvcDogcmVjdC5oZWlnaHQsXG4gICAgICB9LFxuICAgICAgZW5kOiB7XG4gICAgICAgIGxlZnQ6IGNlbnRlci54ICsgYixcbiAgICAgICAgdG9wOiAwLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGRlZ3JlZXMgPCAyNzAgKyBiZXRhKSB7XG4gICAgLy8gYm90dG9tIHJpZ2h0XG4gICAgY29uc3QgcGhpID0gZGVncmVlcyAtIDI3MDtcbiAgICBjb25zdCBhID0gY2VudGVyLnk7XG4gICAgY29uc3QgYiA9IGEgKiBNYXRoLnRhbih0b1JhZGlhbnMocGhpKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHtcbiAgICAgICAgbGVmdDogY2VudGVyLnggKyBiLFxuICAgICAgICB0b3A6IHJlY3QuaGVpZ2h0LFxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBsZWZ0OiBjZW50ZXIueCAtIGIsXG4gICAgICAgIHRvcDogMCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIC8vIHJpZ2h0IGJvdHRvbVxuICBjb25zdCBwaGkgPSAzNjAgLSBkZWdyZWVzO1xuICBjb25zdCBhID0gY2VudGVyLng7XG4gIGNvbnN0IGIgPSBhICogTWF0aC50YW4odG9SYWRpYW5zKHBoaSkpO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnQ6IHtcbiAgICAgIGxlZnQ6IHJlY3Qud2lkdGgsXG4gICAgICB0b3A6IGNlbnRlci55ICsgYixcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogY2VudGVyLnkgLSBiLFxuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBHcmFkaWVudERpYWwgPSAoe1xuICBkZWcgPSAxODAsXG4gIGtub2IxU3R5bGUsXG4gIGtub2IyU3R5bGUsXG4gIG9uQ2hhbmdlLFxuICBvbkNsaWNrLFxuICBzZWxlY3RlZEtub2IsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IFtrbm9iRGltLCBzZXRLbm9iRGltXSA9IHVzZVN0YXRlPHtcbiAgICBzdGFydD86IENTU1Bvc2l0aW9uO1xuICAgIGVuZD86IENTU1Bvc2l0aW9uO1xuICB9Pih7fSk7XG5cbiAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGV2OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKCFjb250YWluZXJSZWYgfHwgIWNvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVjdCA9IGNvbnRhaW5lclJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNlbnRlciA9IHtcbiAgICAgIHg6IHJlY3Qud2lkdGggLyAyLFxuICAgICAgeTogcmVjdC5oZWlnaHQgLyAyLFxuICAgIH07XG5cbiAgICBjb25zdCBhID0ge1xuICAgICAgeDogZXYuY2xpZW50WCAtIChyZWN0LnggKyBjZW50ZXIueCksXG4gICAgICB5OiBldi5jbGllbnRZIC0gKHJlY3QueSArIGNlbnRlci55KSxcbiAgICB9O1xuICAgIGNvbnN0IGIgPSB7IHg6IGNlbnRlci54LCB5OiAwIH07XG4gICAgY29uc3QgZG90ID0gYS54ICogYi54ICsgYS55ICogYi55O1xuICAgIGNvbnN0IGRldCA9IGEueCAqIGIueSAtIGEueSAqIGIueDtcblxuICAgIGNvbnN0IG9mZnNldCA9IHNlbGVjdGVkS25vYiA9PT0gS25vYlR5cGUuZW5kID8gMTgwIDogMDtcbiAgICBjb25zdCBkZWdyZWVzID0gKHRvRGVncmVlcyhNYXRoLmF0YW4yKGRldCwgZG90KSkgKyAzNjAgKyBvZmZzZXQpICUgMzYwO1xuXG4gICAgb25DaGFuZ2UoZGVncmVlcyk7XG5cbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gIH07XG5cbiAgLy8gV2Ugd2FudCB0byB1c2UgUmVhY3QuTW91c2VFdmVudCBoZXJlIGJlY2F1c2UgYWJvdmUgd2VcbiAgLy8gdXNlIHRoZSByZWd1bGFyIE1vdXNlRXZlbnRcbiAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKGV2OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBsZXQgYWRkID0gMTtcblxuICAgIGlmIChldi5rZXkgPT09ICdBcnJvd0Rvd24nIHx8IGV2LmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgIGFkZCA9IDE7XG4gICAgfVxuXG4gICAgaWYgKGV2LmtleSA9PT0gJ0Fycm93UmlnaHQnIHx8IGV2LmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICBhZGQgPSAtMTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZShNYXRoLm1pbigzNjAsIE1hdGgubWF4KDAsIGRlZyArIGFkZCkpKTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghY29udGFpbmVyUmVmIHx8ICFjb250YWluZXJSZWYuY3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBzZXRLbm9iRGltKGdldEtub2JDb29yZGluYXRlcyhkZWcsIGNvbnRhaW5lclJlY3QpKTtcbiAgfSwgW2NvbnRhaW5lclJlZiwgZGVnXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkdyYWRpZW50RGlhbF9fY29udGFpbmVyXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAge2tub2JEaW0uc3RhcnQgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgYXJpYS1sYWJlbD1cIjBcIlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnR3JhZGllbnREaWFsX19rbm9iJywge1xuICAgICAgICAgICAgJ0dyYWRpZW50RGlhbF9fa25vYi0tc2VsZWN0ZWQnOiBzZWxlY3RlZEtub2IgPT09IEtub2JUeXBlLnN0YXJ0LFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIG9uS2V5RG93bj17aGFuZGxlS2V5RG93bn1cbiAgICAgICAgICBvbk1vdXNlRG93bj17ZXYgPT4ge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkS25vYiA9PT0gS25vYlR5cGUuc3RhcnQpIHtcbiAgICAgICAgICAgICAgaGFuZGxlTW91c2VEb3duKGV2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIG9uQ2xpY2soS25vYlR5cGUuc3RhcnQpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLmtub2IxU3R5bGUsXG4gICAgICAgICAgICAuLi5rbm9iRGltLnN0YXJ0LFxuICAgICAgICAgIH19XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge2tub2JEaW0uZW5kICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCIxXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ0dyYWRpZW50RGlhbF9fa25vYicsIHtcbiAgICAgICAgICAgICdHcmFkaWVudERpYWxfX2tub2ItLXNlbGVjdGVkJzogc2VsZWN0ZWRLbm9iID09PSBLbm9iVHlwZS5lbmQsXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxuICAgICAgICAgIG9uTW91c2VEb3duPXtldiA9PiB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRLbm9iID09PSBLbm9iVHlwZS5lbmQpIHtcbiAgICAgICAgICAgICAgaGFuZGxlTW91c2VEb3duKGV2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIG9uQ2xpY2soS25vYlR5cGUuZW5kKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5rbm9iMlN0eWxlLFxuICAgICAgICAgICAgLi4ua25vYkRpbS5lbmQsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7a25vYkRpbS5zdGFydCAmJiBrbm9iRGltLmVuZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiR3JhZGllbnREaWFsX19iYXItLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIkdyYWRpZW50RGlhbF9fYmFyLS1ub2RlXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSByb3RhdGUoJHs5MCAtIGRlZ31kZWcpYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFtRDtBQUNuRCx3QkFBdUI7QUFFaEIsSUFBSyxXQUFMLGtCQUFLLGNBQUw7QUFDTCx1QkFBUTtBQUNSLHFCQUFNO0FBRkk7QUFBQTtBQWVaLG1CQUFtQixTQUF5QjtBQUMxQyxTQUFRLFVBQVUsS0FBSyxLQUFNO0FBQy9CO0FBRlMsQUFLVCxtQkFBbUIsU0FBeUI7QUFDMUMsU0FBUSxVQUFVLE1BQU8sS0FBSztBQUNoQztBQUZTLEFBTVQsNEJBQ0UsU0FDQSxNQUMwQztBQUMxQyxRQUFNLFNBQVM7QUFBQSxJQUNiLEdBQUcsS0FBSyxRQUFRO0FBQUEsSUFDaEIsR0FBRyxLQUFLLFNBQVM7QUFBQSxFQUNuQjtBQUNBLFFBQU0sUUFBUSxVQUFVLEtBQUssS0FBSyxLQUFLLFNBQVMsS0FBSyxLQUFLLENBQUM7QUFDM0QsUUFBTSxPQUFRLE9BQVEsUUFBUSxLQUFLO0FBRW5DLE1BQUksVUFBVSxPQUFPO0FBRW5CLFVBQU0sS0FBSSxPQUFPO0FBQ2pCLFVBQU0sS0FB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
