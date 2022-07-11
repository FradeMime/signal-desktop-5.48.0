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
var QualifiedAddress_exports = {};
__export(QualifiedAddress_exports, {
  QualifiedAddress: () => QualifiedAddress
});
module.exports = __toCommonJS(QualifiedAddress_exports);
var import_assert = require("../util/assert");
var import_UUID = require("./UUID");
var import_Address = require("./Address");
const QUALIFIED_ADDRESS_REGEXP = /^([0-9a-f-]+):([0-9a-f-]+).(\d+)$/i;
class QualifiedAddress {
  constructor(ourUuid, address) {
    this.ourUuid = ourUuid;
    this.address = address;
  }
  get uuid() {
    return this.address.uuid;
  }
  get deviceId() {
    return this.address.deviceId;
  }
  toString() {
    return `${this.ourUuid.toString()}:${this.address.toString()}`;
  }
  static parse(value) {
    const match = value.match(QUALIFIED_ADDRESS_REGEXP);
    (0, import_assert.strictAssert)(match !== null, `Invalid QualifiedAddress: ${value}`);
    const [whole, ourUuid, uuid, deviceId] = match;
    (0, import_assert.strictAssert)(whole === value, "Integrity check");
    return new QualifiedAddress(new import_UUID.UUID(ourUuid), import_Address.Address.create(uuid, parseInt(deviceId, 10)));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QualifiedAddress
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUXVhbGlmaWVkQWRkcmVzcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuL1VVSUQnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4vVVVJRCc7XG5pbXBvcnQgdHlwZSB7IEFkZHJlc3NTdHJpbmdUeXBlIH0gZnJvbSAnLi9BZGRyZXNzJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuL0FkZHJlc3MnO1xuXG5jb25zdCBRVUFMSUZJRURfQUREUkVTU19SRUdFWFAgPSAvXihbMC05YS1mLV0rKTooWzAtOWEtZi1dKykuKFxcZCspJC9pO1xuXG5leHBvcnQgdHlwZSBRdWFsaWZpZWRBZGRyZXNzQ3JlYXRlT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIG91clV1aWQ6IHN0cmluZztcbiAgdXVpZDogc3RyaW5nO1xuICBkZXZpY2VJZDogbnVtYmVyO1xufT47XG5cbmV4cG9ydCB0eXBlIFF1YWxpZmllZEFkZHJlc3NTdHJpbmdUeXBlID1cbiAgYCR7VVVJRFN0cmluZ1R5cGV9OiR7QWRkcmVzc1N0cmluZ1R5cGV9YDtcblxuZXhwb3J0IGNsYXNzIFF1YWxpZmllZEFkZHJlc3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgb3VyVXVpZDogVVVJRCxcbiAgICBwdWJsaWMgcmVhZG9ubHkgYWRkcmVzczogQWRkcmVzc1xuICApIHt9XG5cbiAgcHVibGljIGdldCB1dWlkKCk6IFVVSUQge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3MudXVpZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGV2aWNlSWQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzLmRldmljZUlkO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IFF1YWxpZmllZEFkZHJlc3NTdHJpbmdUeXBlIHtcbiAgICByZXR1cm4gYCR7dGhpcy5vdXJVdWlkLnRvU3RyaW5nKCl9OiR7dGhpcy5hZGRyZXNzLnRvU3RyaW5nKCl9YDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgcGFyc2UodmFsdWU6IHN0cmluZyk6IFF1YWxpZmllZEFkZHJlc3Mge1xuICAgIGNvbnN0IG1hdGNoID0gdmFsdWUubWF0Y2goUVVBTElGSUVEX0FERFJFU1NfUkVHRVhQKTtcbiAgICBzdHJpY3RBc3NlcnQobWF0Y2ggIT09IG51bGwsIGBJbnZhbGlkIFF1YWxpZmllZEFkZHJlc3M6ICR7dmFsdWV9YCk7XG4gICAgY29uc3QgW3dob2xlLCBvdXJVdWlkLCB1dWlkLCBkZXZpY2VJZF0gPSBtYXRjaDtcbiAgICBzdHJpY3RBc3NlcnQod2hvbGUgPT09IHZhbHVlLCAnSW50ZWdyaXR5IGNoZWNrJyk7XG5cbiAgICByZXR1cm4gbmV3IFF1YWxpZmllZEFkZHJlc3MoXG4gICAgICBuZXcgVVVJRChvdXJVdWlkKSxcbiAgICAgIEFkZHJlc3MuY3JlYXRlKHV1aWQsIHBhcnNlSW50KGRldmljZUlkLCAxMCkpXG4gICAgKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUE2QjtBQUc3QixrQkFBcUI7QUFFckIscUJBQXdCO0FBRXhCLE1BQU0sMkJBQTJCO0FBVzFCLE1BQU0saUJBQWlCO0FBQUEsRUFDNUIsWUFDa0IsU0FDQSxTQUNoQjtBQUZnQjtBQUNBO0FBQUEsRUFDZjtBQUFBLE1BRVEsT0FBYTtBQUN0QixXQUFPLEtBQUssUUFBUTtBQUFBLEVBQ3RCO0FBQUEsTUFFVyxXQUFtQjtBQUM1QixXQUFPLEtBQUssUUFBUTtBQUFBLEVBQ3RCO0FBQUEsRUFFTyxXQUF1QztBQUM1QyxXQUFPLEdBQUcsS0FBSyxRQUFRLFNBQVMsS0FBSyxLQUFLLFFBQVEsU0FBUztBQUFBLEVBQzdEO0FBQUEsU0FFYyxNQUFNLE9BQWlDO0FBQ25ELFVBQU0sUUFBUSxNQUFNLE1BQU0sd0JBQXdCO0FBQ2xELG9DQUFhLFVBQVUsTUFBTSw2QkFBNkIsT0FBTztBQUNqRSxVQUFNLENBQUMsT0FBTyxTQUFTLE1BQU0sWUFBWTtBQUN6QyxvQ0FBYSxVQUFVLE9BQU8saUJBQWlCO0FBRS9DLFdBQU8sSUFBSSxpQkFDVCxJQUFJLGlCQUFLLE9BQU8sR0FDaEIsdUJBQVEsT0FBTyxNQUFNLFNBQVMsVUFBVSxFQUFFLENBQUMsQ0FDN0M7QUFBQSxFQUNGO0FBQ0Y7QUE3Qk8iLAogICJuYW1lcyI6IFtdCn0K
