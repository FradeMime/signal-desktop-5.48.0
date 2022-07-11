var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var findAndFormatContact_exports = {};
__export(findAndFormatContact_exports, {
  findAndFormatContact: () => findAndFormatContact
});
module.exports = __toCommonJS(findAndFormatContact_exports);
var import_PhoneNumber = require("../types/PhoneNumber");
const PLACEHOLDER_CONTACT = {
  acceptedMessageRequest: false,
  badges: [],
  id: "placeholder-contact",
  isMe: false,
  sharedGroupNames: [],
  title: window.i18n("unknownContact"),
  type: "direct"
};
function findAndFormatContact(identifier) {
  if (!identifier) {
    return PLACEHOLDER_CONTACT;
  }
  const contactModel = window.ConversationController.get(identifier.toLowerCase());
  if (contactModel) {
    return contactModel.format();
  }
  const regionCode = window.storage.get("regionCode");
  if (!(0, import_PhoneNumber.isValidNumber)(identifier, { regionCode })) {
    return PLACEHOLDER_CONTACT;
  }
  const phoneNumber = (0, import_PhoneNumber.format)(identifier, { ourRegionCode: regionCode });
  return {
    acceptedMessageRequest: false,
    badges: [],
    id: "phone-only",
    isMe: false,
    phoneNumber,
    sharedGroupNames: [],
    title: phoneNumber,
    type: "direct"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findAndFormatContact
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmluZEFuZEZvcm1hdENvbnRhY3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBmb3JtYXQsIGlzVmFsaWROdW1iZXIgfSBmcm9tICcuLi90eXBlcy9QaG9uZU51bWJlcic7XG5cbnR5cGUgRm9ybWF0dGVkQ29udGFjdCA9IFBhcnRpYWw8Q29udmVyc2F0aW9uVHlwZT4gJlxuICBQaWNrPFxuICAgIENvbnZlcnNhdGlvblR5cGUsXG4gICAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgICB8ICdiYWRnZXMnXG4gICAgfCAnaWQnXG4gICAgfCAnaXNNZSdcbiAgICB8ICdzaGFyZWRHcm91cE5hbWVzJ1xuICAgIHwgJ3RpdGxlJ1xuICAgIHwgJ3R5cGUnXG4gICAgfCAndW5ibHVycmVkQXZhdGFyUGF0aCdcbiAgPjtcblxuY29uc3QgUExBQ0VIT0xERVJfQ09OVEFDVDogRm9ybWF0dGVkQ29udGFjdCA9IHtcbiAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogZmFsc2UsXG4gIGJhZGdlczogW10sXG4gIGlkOiAncGxhY2Vob2xkZXItY29udGFjdCcsXG4gIGlzTWU6IGZhbHNlLFxuICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgdGl0bGU6IHdpbmRvdy5pMThuKCd1bmtub3duQ29udGFjdCcpLFxuICB0eXBlOiAnZGlyZWN0Jyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQW5kRm9ybWF0Q29udGFjdChpZGVudGlmaWVyPzogc3RyaW5nKTogRm9ybWF0dGVkQ29udGFjdCB7XG4gIGlmICghaWRlbnRpZmllcikge1xuICAgIHJldHVybiBQTEFDRUhPTERFUl9DT05UQUNUO1xuICB9XG5cbiAgY29uc3QgY29udGFjdE1vZGVsID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KFxuICAgIGlkZW50aWZpZXIudG9Mb3dlckNhc2UoKVxuICApO1xuICBpZiAoY29udGFjdE1vZGVsKSB7XG4gICAgcmV0dXJuIGNvbnRhY3RNb2RlbC5mb3JtYXQoKTtcbiAgfVxuXG4gIGNvbnN0IHJlZ2lvbkNvZGUgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3JlZ2lvbkNvZGUnKTtcblxuICBpZiAoIWlzVmFsaWROdW1iZXIoaWRlbnRpZmllciwgeyByZWdpb25Db2RlIH0pKSB7XG4gICAgcmV0dXJuIFBMQUNFSE9MREVSX0NPTlRBQ1Q7XG4gIH1cblxuICBjb25zdCBwaG9uZU51bWJlciA9IGZvcm1hdChpZGVudGlmaWVyLCB7IG91clJlZ2lvbkNvZGU6IHJlZ2lvbkNvZGUgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiBmYWxzZSxcbiAgICBiYWRnZXM6IFtdLFxuICAgIGlkOiAncGhvbmUtb25seScsXG4gICAgaXNNZTogZmFsc2UsXG4gICAgcGhvbmVOdW1iZXIsXG4gICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgdGl0bGU6IHBob25lTnVtYmVyLFxuICAgIHR5cGU6ICdkaXJlY3QnLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLHlCQUFzQztBQWV0QyxNQUFNLHNCQUF3QztBQUFBLEVBQzVDLHdCQUF3QjtBQUFBLEVBQ3hCLFFBQVEsQ0FBQztBQUFBLEVBQ1QsSUFBSTtBQUFBLEVBQ0osTUFBTTtBQUFBLEVBQ04sa0JBQWtCLENBQUM7QUFBQSxFQUNuQixPQUFPLE9BQU8sS0FBSyxnQkFBZ0I7QUFBQSxFQUNuQyxNQUFNO0FBQ1I7QUFFTyw4QkFBOEIsWUFBdUM7QUFDMUUsTUFBSSxDQUFDLFlBQVk7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sZUFBZSxPQUFPLHVCQUF1QixJQUNqRCxXQUFXLFlBQVksQ0FDekI7QUFDQSxNQUFJLGNBQWM7QUFDaEIsV0FBTyxhQUFhLE9BQU87QUFBQSxFQUM3QjtBQUVBLFFBQU0sYUFBYSxPQUFPLFFBQVEsSUFBSSxZQUFZO0FBRWxELE1BQUksQ0FBQyxzQ0FBYyxZQUFZLEVBQUUsV0FBVyxDQUFDLEdBQUc7QUFDOUMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGNBQWMsK0JBQU8sWUFBWSxFQUFFLGVBQWUsV0FBVyxDQUFDO0FBRXBFLFNBQU87QUFBQSxJQUNMLHdCQUF3QjtBQUFBLElBQ3hCLFFBQVEsQ0FBQztBQUFBLElBQ1QsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ047QUFBQSxJQUNBLGtCQUFrQixDQUFDO0FBQUEsSUFDbkIsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1I7QUFDRjtBQTlCZ0IiLAogICJuYW1lcyI6IFtdCn0K
