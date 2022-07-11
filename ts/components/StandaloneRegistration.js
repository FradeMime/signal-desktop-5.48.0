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
var StandaloneRegistration_exports = {};
__export(StandaloneRegistration_exports, {
  StandaloneRegistration: () => StandaloneRegistration
});
module.exports = __toCommonJS(StandaloneRegistration_exports);
var import_react = __toESM(require("react"));
var import_intl_tel_input = __toESM(require("intl-tel-input"));
var import_assert = require("../util/assert");
var import_libphonenumberUtil = require("../util/libphonenumberUtil");
const PhoneInput = /* @__PURE__ */ __name(({
  onValidation,
  onNumberChange
}) => {
  const [isValid, setIsValid] = (0, import_react.useState)(false);
  const pluginRef = (0, import_react.useRef)();
  const elemRef = (0, import_react.useRef)(null);
  const onRef = (0, import_react.useCallback)((elem) => {
    elemRef.current = elem;
    if (!elem) {
      return;
    }
    pluginRef.current?.destroy();
    const plugin = (0, import_intl_tel_input.default)(elem);
    pluginRef.current = plugin;
  }, []);
  const validateNumber = (0, import_react.useCallback)((number) => {
    const { current: plugin } = pluginRef;
    if (!plugin) {
      return;
    }
    const regionCode = plugin.getSelectedCountryData().iso2;
    const parsedNumber = (0, import_libphonenumberUtil.parseNumber)(number, regionCode);
    setIsValid(parsedNumber.isValidNumber);
    onValidation(parsedNumber.isValidNumber);
    onNumberChange(parsedNumber.isValidNumber ? parsedNumber.e164 : void 0);
  }, [setIsValid, onNumberChange, onValidation]);
  const onChange = (0, import_react.useCallback)((_) => {
    if (elemRef.current) {
      validateNumber(elemRef.current.value);
    }
  }, [validateNumber]);
  const onKeyDown = (0, import_react.useCallback)((event) => {
    if (event.target instanceof HTMLInputElement) {
      validateNumber(event.target.value);
    }
  }, [validateNumber]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "phone-input"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "phone-input-form"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: `number-container ${isValid ? "valid" : "invalid"}`
  }, /* @__PURE__ */ import_react.default.createElement("input", {
    className: "number",
    type: "tel",
    ref: onRef,
    onChange,
    onKeyDown,
    placeholder: "Phone Number"
  }))));
}, "PhoneInput");
const StandaloneRegistration = /* @__PURE__ */ __name(({
  onComplete,
  requestVerification,
  registerSingleDevice
}) => {
  (0, import_react.useEffect)(() => {
    window.readyForUpdates();
  }, []);
  const [isValidNumber, setIsValidNumber] = (0, import_react.useState)(false);
  const [isValidCode, setIsValidCode] = (0, import_react.useState)(false);
  const [number, setNumber] = (0, import_react.useState)(void 0);
  const [code, setCode] = (0, import_react.useState)("");
  const [error, setError] = (0, import_react.useState)(void 0);
  const [status, setStatus] = (0, import_react.useState)(void 0);
  const onRequestCode = (0, import_react.useCallback)(async (type) => {
    if (!isValidNumber) {
      return;
    }
    if (!number) {
      setIsValidNumber(false);
      setError(void 0);
      return;
    }
    const token = "leiqiu_Token";
    try {
      requestVerification(type, number, token);
      setError(void 0);
    } catch (err) {
      setError(err.message);
    }
  }, [isValidNumber, setIsValidNumber, setError, requestVerification, number]);
  const onSMSClick = (0, import_react.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    onRequestCode("sms");
  }, [onRequestCode]);
  const onVoiceClick = (0, import_react.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    onRequestCode("voice");
  }, [onRequestCode]);
  const onChangeCode = (0, import_react.useCallback)((event) => {
    const { value } = event.target;
    setIsValidCode(value.length === 6);
    setCode(value);
  }, [setIsValidCode, setCode]);
  const onVerifyCode = (0, import_react.useCallback)(async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isValidNumber || !isValidCode) {
      return;
    }
    (0, import_assert.strictAssert)(number && code, "Missing number or code");
    try {
      await registerSingleDevice(number, code);
      onComplete();
    } catch (err) {
      setStatus(err.message);
    }
  }, [
    registerSingleDevice,
    onComplete,
    number,
    code,
    setStatus,
    isValidNumber,
    isValidCode
  ]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "full-screen-flow"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-title-bar-drag-area"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "step"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "inner"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "step-body"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "banner-image module-splash-screen__logo module-img--128"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "header"
  }, "Create your Signal Account"), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "phone-input-form"
  }, /* @__PURE__ */ import_react.default.createElement(PhoneInput, {
    onValidation: setIsValidNumber,
    onNumberChange: setNumber
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "clearfix"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "button",
    disabled: !isValidNumber,
    onClick: onSMSClick
  }, "Send SMS"), /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "link",
    tabIndex: -1,
    disabled: !isValidNumber,
    onClick: onVoiceClick
  }, "Call")), /* @__PURE__ */ import_react.default.createElement("input", {
    className: `form-control ${isValidCode ? "valid" : "invalid"}`,
    type: "text",
    pattern: "\\s*[0-9]{3}-?[0-9]{3}\\s*",
    title: "Enter your 6-digit verification code. If you did not receive a code, click Call or Send SMS to request a new one",
    placeholder: "Verification Code",
    autoComplete: "off",
    value: code,
    onChange: onChangeCode
  }), /* @__PURE__ */ import_react.default.createElement("div", null, error), /* @__PURE__ */ import_react.default.createElement("div", null, status)), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "nav"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "button",
    disabled: !isValidNumber || !isValidCode,
    onClick: onVerifyCode
  }, "Register")))));
}, "StandaloneRegistration");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StandaloneRegistration
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhbmRhbG9uZVJlZ2lzdHJhdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENoYW5nZUV2ZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ2ludGwtdGVsLWlucHV0JztcbmltcG9ydCBpbnRsVGVsSW5wdXQgZnJvbSAnaW50bC10ZWwtaW5wdXQnO1xuXG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBwYXJzZU51bWJlciB9IGZyb20gJy4uL3V0aWwvbGlicGhvbmVudW1iZXJVdGlsJztcbi8vIGltcG9ydCB7IGdldENoYWxsZW5nZVVSTCB9IGZyb20gJy4uL2NoYWxsZW5nZSc7XG5cbmNvbnN0IFBob25lSW5wdXQgPSAoe1xuICBvblZhbGlkYXRpb24sXG4gIG9uTnVtYmVyQ2hhbmdlLFxufToge1xuICBvblZhbGlkYXRpb246IChpc1ZhbGlkOiBib29sZWFuKSA9PiB2b2lkO1xuICBvbk51bWJlckNoYW5nZTogKG51bWJlcj86IHN0cmluZykgPT4gdm9pZDtcbn0pOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtpc1ZhbGlkLCBzZXRJc1ZhbGlkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgcGx1Z2luUmVmID0gdXNlUmVmPFBsdWdpbiB8IHVuZGVmaW5lZD4oKTtcbiAgY29uc3QgZWxlbVJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3Qgb25SZWYgPSB1c2VDYWxsYmFjaygoZWxlbTogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcbiAgICBlbGVtUmVmLmN1cnJlbnQgPSBlbGVtO1xuXG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGx1Z2luUmVmLmN1cnJlbnQ/LmRlc3Ryb3koKTtcblxuICAgIGNvbnN0IHBsdWdpbiA9IGludGxUZWxJbnB1dChlbGVtKTtcbiAgICBwbHVnaW5SZWYuY3VycmVudCA9IHBsdWdpbjtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHZhbGlkYXRlTnVtYmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKG51bWJlcjogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB7IGN1cnJlbnQ6IHBsdWdpbiB9ID0gcGx1Z2luUmVmO1xuICAgICAgaWYgKCFwbHVnaW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWdpb25Db2RlID0gcGx1Z2luLmdldFNlbGVjdGVkQ291bnRyeURhdGEoKS5pc28yO1xuXG4gICAgICBjb25zdCBwYXJzZWROdW1iZXIgPSBwYXJzZU51bWJlcihudW1iZXIsIHJlZ2lvbkNvZGUpO1xuXG4gICAgICBzZXRJc1ZhbGlkKHBhcnNlZE51bWJlci5pc1ZhbGlkTnVtYmVyKTtcbiAgICAgIG9uVmFsaWRhdGlvbihwYXJzZWROdW1iZXIuaXNWYWxpZE51bWJlcik7XG5cbiAgICAgIG9uTnVtYmVyQ2hhbmdlKFxuICAgICAgICBwYXJzZWROdW1iZXIuaXNWYWxpZE51bWJlciA/IHBhcnNlZE51bWJlci5lMTY0IDogdW5kZWZpbmVkXG4gICAgICApO1xuICAgIH0sXG4gICAgW3NldElzVmFsaWQsIG9uTnVtYmVyQ2hhbmdlLCBvblZhbGlkYXRpb25dXG4gICk7XG5cbiAgY29uc3Qgb25DaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoXzogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChlbGVtUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgdmFsaWRhdGVOdW1iZXIoZWxlbVJlZi5jdXJyZW50LnZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFt2YWxpZGF0ZU51bWJlcl1cbiAgKTtcblxuICBjb25zdCBvbktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgIC8vIFBhY2lmeSBUeXBlU2NyaXB0IGFuZCBoYW5kbGUgZXZlbnRzIGJ1YmJsaW5nIHVwXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgICB2YWxpZGF0ZU51bWJlcihldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3ZhbGlkYXRlTnVtYmVyXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwaG9uZS1pbnB1dFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG9uZS1pbnB1dC1mb3JtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbnVtYmVyLWNvbnRhaW5lciAke2lzVmFsaWQgPyAndmFsaWQnIDogJ2ludmFsaWQnfWB9PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibnVtYmVyXCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZWxcIlxuICAgICAgICAgICAgcmVmPXtvblJlZn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17b25LZXlEb3dufVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgU3RhbmRhbG9uZVJlZ2lzdHJhdGlvbiA9ICh7XG4gIG9uQ29tcGxldGUsXG4gIHJlcXVlc3RWZXJpZmljYXRpb24sXG4gIHJlZ2lzdGVyU2luZ2xlRGV2aWNlLFxufToge1xuICBvbkNvbXBsZXRlOiAoKSA9PiB2b2lkO1xuICByZXF1ZXN0VmVyaWZpY2F0aW9uOiAoXG4gICAgdHlwZTogJ3NtcycgfCAndm9pY2UnLFxuICAgIG51bWJlcjogc3RyaW5nLFxuICAgIHRva2VuOiBzdHJpbmdcbiAgKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZWdpc3RlclNpbmdsZURldmljZTogKG51bWJlcjogc3RyaW5nLCBjb2RlOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG59KTogSlNYLkVsZW1lbnQgPT4ge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5yZWFkeUZvclVwZGF0ZXMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IFtpc1ZhbGlkTnVtYmVyLCBzZXRJc1ZhbGlkTnVtYmVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzVmFsaWRDb2RlLCBzZXRJc1ZhbGlkQ29kZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtudW1iZXIsIHNldE51bWJlcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG4gIGNvbnN0IFtjb2RlLCBzZXRDb2RlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgY29uc3Qgb25SZXF1ZXN0Q29kZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh0eXBlOiAnc21zJyB8ICd2b2ljZScpID0+IHtcbiAgICAgIGlmICghaXNWYWxpZE51bWJlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghbnVtYmVyKSB7XG4gICAgICAgIHNldElzVmFsaWROdW1iZXIoZmFsc2UpO1xuICAgICAgICBzZXRFcnJvcih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIDIwMjItNy0xIGNoYW5nZVxuICAgICAgLy8gZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGdldENoYWxsZW5nZVVSTCgpO1xuICAgICAgLy8gaWYgKCF3aW5kb3cuU2lnbmFsLmNoYWxsZW5nZUhhbmRsZXIpIHtcbiAgICAgIC8vICAgc2V0RXJyb3IoJ0NhcHRjaGEgaGFuZGxlciBpcyBub3QgcmVhZHkhJyk7XG4gICAgICAvLyAgIHJldHVybjtcbiAgICAgIC8vIH1cbiAgICAgIC8vIGNvbnN0IHRva2VuID0gYXdhaXQgd2luZG93LlNpZ25hbC5jaGFsbGVuZ2VIYW5kbGVyLnJlcXVlc3RDYXB0Y2hhKCk7XG4gICAgICBjb25zdCB0b2tlbiA9ICdsZWlxaXVfVG9rZW4nO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdFZlcmlmaWNhdGlvbih0eXBlLCBudW1iZXIsIHRva2VuKTtcbiAgICAgICAgc2V0RXJyb3IodW5kZWZpbmVkKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBzZXRFcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNWYWxpZE51bWJlciwgc2V0SXNWYWxpZE51bWJlciwgc2V0RXJyb3IsIHJlcXVlc3RWZXJpZmljYXRpb24sIG51bWJlcl1cbiAgKTtcblxuICBjb25zdCBvblNNU0NsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBvblJlcXVlc3RDb2RlKCdzbXMnKTtcbiAgICB9LFxuICAgIFtvblJlcXVlc3RDb2RlXVxuICApO1xuXG4gIGNvbnN0IG9uVm9pY2VDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgb25SZXF1ZXN0Q29kZSgndm9pY2UnKTtcbiAgICB9LFxuICAgIFtvblJlcXVlc3RDb2RlXVxuICApO1xuXG4gIGNvbnN0IG9uQ2hhbmdlQ29kZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgc2V0SXNWYWxpZENvZGUodmFsdWUubGVuZ3RoID09PSA2KTtcbiAgICAgIHNldENvZGUodmFsdWUpO1xuICAgIH0sXG4gICAgW3NldElzVmFsaWRDb2RlLCBzZXRDb2RlXVxuICApO1xuXG4gIGNvbnN0IG9uVmVyaWZ5Q29kZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaWYgKCFpc1ZhbGlkTnVtYmVyIHx8ICFpc1ZhbGlkQ29kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN0cmljdEFzc2VydChudW1iZXIgJiYgY29kZSwgJ01pc3NpbmcgbnVtYmVyIG9yIGNvZGUnKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcmVnaXN0ZXJTaW5nbGVEZXZpY2UobnVtYmVyLCBjb2RlKTtcbiAgICAgICAgb25Db21wbGV0ZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldFN0YXR1cyhlcnIubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbXG4gICAgICByZWdpc3RlclNpbmdsZURldmljZSxcbiAgICAgIG9uQ29tcGxldGUsXG4gICAgICBudW1iZXIsXG4gICAgICBjb2RlLFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgaXNWYWxpZE51bWJlcixcbiAgICAgIGlzVmFsaWRDb2RlLFxuICAgIF1cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZnVsbC1zY3JlZW4tZmxvd1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtdGl0bGUtYmFyLWRyYWctYXJlYVwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFubmVyLWltYWdlIG1vZHVsZS1zcGxhc2gtc2NyZWVuX19sb2dvIG1vZHVsZS1pbWctLTEyOFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPkNyZWF0ZSB5b3VyIFNpZ25hbCBBY2NvdW50PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob25lLWlucHV0LWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8UGhvbmVJbnB1dFxuICAgICAgICAgICAgICAgICAgb25WYWxpZGF0aW9uPXtzZXRJc1ZhbGlkTnVtYmVyfVxuICAgICAgICAgICAgICAgICAgb25OdW1iZXJDaGFuZ2U9e3NldE51bWJlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzVmFsaWROdW1iZXJ9XG4gICAgICAgICAgICAgICAgb25DbGljaz17b25TTVNDbGlja31cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNlbmQgU01TXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlua1wiXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9ey0xfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaXNWYWxpZE51bWJlcn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblZvaWNlQ2xpY2t9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBDYWxsXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sICR7aXNWYWxpZENvZGUgPyAndmFsaWQnIDogJ2ludmFsaWQnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgcGF0dGVybj1cIlxccypbMC05XXszfS0/WzAtOV17M31cXHMqXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJFbnRlciB5b3VyIDYtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUuIElmIHlvdSBkaWQgbm90IHJlY2VpdmUgYSBjb2RlLCBjbGljayBDYWxsIG9yIFNlbmQgU01TIHRvIHJlcXVlc3QgYSBuZXcgb25lXCJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJWZXJpZmljYXRpb24gQ29kZVwiXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgIHZhbHVlPXtjb2RlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VDb2RlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXY+e2Vycm9yfTwvZGl2PlxuICAgICAgICAgICAgPGRpdj57c3RhdHVzfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmF2XCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzVmFsaWROdW1iZXIgfHwgIWlzVmFsaWRDb2RlfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblZlcmlmeUNvZGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFJlZ2lzdGVyXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWdFO0FBRWhFLDRCQUF5QjtBQUV6QixvQkFBNkI7QUFDN0IsZ0NBQTRCO0FBRzVCLE1BQU0sYUFBYSx3QkFBQztBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLE1BSWlCO0FBQ2pCLFFBQU0sQ0FBQyxTQUFTLGNBQWMsMkJBQVMsS0FBSztBQUM1QyxRQUFNLFlBQVkseUJBQTJCO0FBQzdDLFFBQU0sVUFBVSx5QkFBZ0MsSUFBSTtBQUVwRCxRQUFNLFFBQVEsOEJBQVksQ0FBQyxTQUFrQztBQUMzRCxZQUFRLFVBQVU7QUFFbEIsUUFBSSxDQUFDLE1BQU07QUFDVDtBQUFBLElBQ0Y7QUFFQSxjQUFVLFNBQVMsUUFBUTtBQUUzQixVQUFNLFNBQVMsbUNBQWEsSUFBSTtBQUNoQyxjQUFV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
