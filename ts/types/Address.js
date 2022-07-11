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
var Address_exports = {};
__export(Address_exports, {
  Address: () => Address
});
module.exports = __toCommonJS(Address_exports);
var import_assert = require("../util/assert");
var import_UUID = require("./UUID");
const ADDRESS_REGEXP = /^([0-9a-f-]+).(\d+)$/i;
class Address {
  constructor(uuid, deviceId) {
    this.uuid = uuid;
    this.deviceId = deviceId;
  }
  toString() {
    return `${this.uuid.toString()}.${this.deviceId}`;
  }
  static parse(value) {
    const match = value.match(ADDRESS_REGEXP);
    (0, import_assert.strictAssert)(match !== null, `Invalid Address: ${value}`);
    const [whole, uuid, deviceId] = match;
    (0, import_assert.strictAssert)(whole === value, "Integrity check");
    return Address.create(uuid, parseInt(deviceId, 10));
  }
  static create(uuid, deviceId) {
    return new Address(new import_UUID.UUID(uuid), deviceId);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Address
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWRkcmVzcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuL1VVSUQnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4vVVVJRCc7XG5cbmV4cG9ydCB0eXBlIEFkZHJlc3NTdHJpbmdUeXBlID0gYCR7VVVJRFN0cmluZ1R5cGV9LiR7bnVtYmVyfWA7XG5cbmNvbnN0IEFERFJFU1NfUkVHRVhQID0gL14oWzAtOWEtZi1dKykuKFxcZCspJC9pO1xuXG5leHBvcnQgY2xhc3MgQWRkcmVzcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB1dWlkOiBVVUlELCBwdWJsaWMgcmVhZG9ubHkgZGV2aWNlSWQ6IG51bWJlcikge31cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogQWRkcmVzc1N0cmluZ1R5cGUge1xuICAgIHJldHVybiBgJHt0aGlzLnV1aWQudG9TdHJpbmcoKX0uJHt0aGlzLmRldmljZUlkfWA7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBBZGRyZXNzIHtcbiAgICBjb25zdCBtYXRjaCA9IHZhbHVlLm1hdGNoKEFERFJFU1NfUkVHRVhQKTtcbiAgICBzdHJpY3RBc3NlcnQobWF0Y2ggIT09IG51bGwsIGBJbnZhbGlkIEFkZHJlc3M6ICR7dmFsdWV9YCk7XG4gICAgY29uc3QgW3dob2xlLCB1dWlkLCBkZXZpY2VJZF0gPSBtYXRjaDtcbiAgICBzdHJpY3RBc3NlcnQod2hvbGUgPT09IHZhbHVlLCAnSW50ZWdyaXR5IGNoZWNrJyk7XG4gICAgcmV0dXJuIEFkZHJlc3MuY3JlYXRlKHV1aWQsIHBhcnNlSW50KGRldmljZUlkLCAxMCkpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBjcmVhdGUodXVpZDogc3RyaW5nLCBkZXZpY2VJZDogbnVtYmVyKTogQWRkcmVzcyB7XG4gICAgcmV0dXJuIG5ldyBBZGRyZXNzKG5ldyBVVUlEKHV1aWQpLCBkZXZpY2VJZCk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBNkI7QUFHN0Isa0JBQXFCO0FBSXJCLE1BQU0saUJBQWlCO0FBRWhCLE1BQU0sUUFBUTtBQUFBLEVBQ25CLFlBQTRCLE1BQTRCLFVBQWtCO0FBQTlDO0FBQTRCO0FBQUEsRUFBbUI7QUFBQSxFQUVwRSxXQUE4QjtBQUNuQyxXQUFPLEdBQUcsS0FBSyxLQUFLLFNBQVMsS0FBSyxLQUFLO0FBQUEsRUFDekM7QUFBQSxTQUVjLE1BQU0sT0FBd0I7QUFDMUMsVUFBTSxRQUFRLE1BQU0sTUFBTSxjQUFjO0FBQ3hDLG9DQUFhLFVBQVUsTUFBTSxvQkFBb0IsT0FBTztBQUN4RCxVQUFNLENBQUMsT0FBTyxNQUFNLFlBQVk7QUFDaEMsb0NBQWEsVUFBVSxPQUFPLGlCQUFpQjtBQUMvQyxXQUFPLFFBQVEsT0FBTyxNQUFNLFNBQVMsVUFBVSxFQUFFLENBQUM7QUFBQSxFQUNwRDtBQUFBLFNBRWMsT0FBTyxNQUFjLFVBQTJCO0FBQzVELFdBQU8sSUFBSSxRQUFRLElBQUksaUJBQUssSUFBSSxHQUFHLFFBQVE7QUFBQSxFQUM3QztBQUNGO0FBbEJPIiwKICAibmFtZXMiOiBbXQp9Cg==
