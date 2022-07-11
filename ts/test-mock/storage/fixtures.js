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
var fixtures_exports = {};
__export(fixtures_exports, {
  App: () => import_playwright.App,
  Bootstrap: () => import_bootstrap.Bootstrap,
  debug: () => debug,
  initStorage: () => initStorage
});
module.exports = __toCommonJS(fixtures_exports);
var import_debug = __toESM(require("debug"));
var import_mock_server = require("@signalapp/mock-server");
var import_playwright = require("../playwright");
var import_bootstrap = require("../bootstrap");
const debug = (0, import_debug.default)("mock:test:storage");
const GROUP_SIZE = 8;
async function initStorage(options) {
  const bootstrap = new import_bootstrap.Bootstrap(options);
  await bootstrap.init();
  const { contacts, phone } = bootstrap;
  const [firstContact] = contacts;
  const members = [...contacts].slice(0, GROUP_SIZE);
  const group = await phone.createGroup({
    title: "Mock Group",
    members: [phone, ...members]
  });
  let state = import_mock_server.StorageState.getEmpty();
  state = state.updateAccount({
    profileKey: phone.profileKey.serialize(),
    e164: phone.device.number
  });
  state = state.addGroup(group, {
    whitelisted: true
  }).pinGroup(group);
  for (const contact of contacts) {
    state = state.addContact(contact, {
      identityState: import_mock_server.Proto.ContactRecord.IdentityState.VERIFIED,
      whitelisted: true,
      identityKey: contact.publicKey.serialize(),
      profileKey: contact.profileKey.serialize()
    });
  }
  state = state.pin(firstContact);
  await phone.setStorageState(state);
  const app = await bootstrap.link();
  const { desktop } = bootstrap;
  const contactSend = contacts[0].sendText(desktop, "hello from contact", {
    timestamp: bootstrap.getTimestamp(),
    sealed: true
  });
  const groupSend = members[0].sendText(desktop, "hello in group", {
    timestamp: bootstrap.getTimestamp(),
    sealed: true,
    group
  });
  await Promise.all([contactSend, groupSend]);
  return { bootstrap, app, group, members };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App,
  Bootstrap,
  debug,
  initStorage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZml4dHVyZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGNyZWF0ZURlYnVnIGZyb20gJ2RlYnVnJztcbmltcG9ydCB0eXBlIHsgR3JvdXAsIFByaW1hcnlEZXZpY2UgfSBmcm9tICdAc2lnbmFsYXBwL21vY2stc2VydmVyJztcbmltcG9ydCB7IFN0b3JhZ2VTdGF0ZSwgUHJvdG8gfSBmcm9tICdAc2lnbmFsYXBwL21vY2stc2VydmVyJztcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4uL3BsYXl3cmlnaHQnO1xuaW1wb3J0IHsgQm9vdHN0cmFwIH0gZnJvbSAnLi4vYm9vdHN0cmFwJztcbmltcG9ydCB0eXBlIHsgQm9vdHN0cmFwT3B0aW9ucyB9IGZyb20gJy4uL2Jvb3RzdHJhcCc7XG5cbmV4cG9ydCBjb25zdCBkZWJ1ZyA9IGNyZWF0ZURlYnVnKCdtb2NrOnRlc3Q6c3RvcmFnZScpO1xuXG5leHBvcnQgeyBBcHAsIEJvb3RzdHJhcCB9O1xuXG5jb25zdCBHUk9VUF9TSVpFID0gODtcblxuZXhwb3J0IHR5cGUgSW5pdFN0b3JhZ2VSZXN1bHRUeXBlID0gUmVhZG9ubHk8e1xuICBib290c3RyYXA6IEJvb3RzdHJhcDtcbiAgYXBwOiBBcHA7XG4gIGdyb3VwOiBHcm91cDtcbiAgbWVtYmVyczogUmVhZG9ubHlBcnJheTxQcmltYXJ5RGV2aWNlPjtcbn0+O1xuXG4vL1xuLy8gVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIGluaXRpYWwgc3RvcmFnZSBzZXJ2aWNlIHN0YXRlIHRoYXQgaW5jbHVkZXM6XG4vL1xuLy8gLSBBbGwgY29udGFjdHMgZnJvbSBjb250YWN0IHN5bmMgKGZpcnN0IGNvbnRhY3QgcGlubmVkKVxuLy8gLSBBIHBpbm5lZCBncm91cCB3aXRoIEdST1VQX1NJWkUgbWVtYmVycyAoZnJvbSB0aGUgY29udGFjdHMpXG4vLyAtIEFjY291bnQgd2l0aCBlMTY0IGFuZCBwcm9maWxlS2V5XG4vL1xuLy8gSW4gYWRkaXRpb24gdG8gYWJvdmUsIHRoaXMgZnVuY3Rpb24gd2lsbCBxdWV1ZSBvbmUgaW5jb21pbmcgbWVzc2FnZSBpbiB0aGVcbi8vIGdyb3VwLCBhbmQgb25lIGZvciB0aGUgZmlyc3QgY29udGFjdCAoc28gdGhhdCBib3RoIHdpbGwgYXBwZWFyIGluIHRoZSBsZWZ0XG4vLyBwYW5lKS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0U3RvcmFnZShcbiAgb3B0aW9ucz86IEJvb3RzdHJhcE9wdGlvbnNcbik6IFByb21pc2U8SW5pdFN0b3JhZ2VSZXN1bHRUeXBlPiB7XG4gIC8vIENyZWF0ZXMgcHJpbWFyeSBkZXZpY2UsIGNvbnRhY3RzXG4gIGNvbnN0IGJvb3RzdHJhcCA9IG5ldyBCb290c3RyYXAob3B0aW9ucyk7XG5cbiAgYXdhaXQgYm9vdHN0cmFwLmluaXQoKTtcblxuICAvLyBQb3B1bGF0ZSBzdG9yYWdlIHNlcnZpY2VcbiAgY29uc3QgeyBjb250YWN0cywgcGhvbmUgfSA9IGJvb3RzdHJhcDtcblxuICBjb25zdCBbZmlyc3RDb250YWN0XSA9IGNvbnRhY3RzO1xuXG4gIGNvbnN0IG1lbWJlcnMgPSBbLi4uY29udGFjdHNdLnNsaWNlKDAsIEdST1VQX1NJWkUpO1xuXG4gIGNvbnN0IGdyb3VwID0gYXdhaXQgcGhvbmUuY3JlYXRlR3JvdXAoe1xuICAgIHRpdGxlOiAnTW9jayBHcm91cCcsXG4gICAgbWVtYmVyczogW3Bob25lLCAuLi5tZW1iZXJzXSxcbiAgfSk7XG5cbiAgbGV0IHN0YXRlID0gU3RvcmFnZVN0YXRlLmdldEVtcHR5KCk7XG5cbiAgc3RhdGUgPSBzdGF0ZS51cGRhdGVBY2NvdW50KHtcbiAgICBwcm9maWxlS2V5OiBwaG9uZS5wcm9maWxlS2V5LnNlcmlhbGl6ZSgpLFxuICAgIGUxNjQ6IHBob25lLmRldmljZS5udW1iZXIsXG4gIH0pO1xuXG4gIHN0YXRlID0gc3RhdGVcbiAgICAuYWRkR3JvdXAoZ3JvdXAsIHtcbiAgICAgIHdoaXRlbGlzdGVkOiB0cnVlLFxuICAgIH0pXG4gICAgLnBpbkdyb3VwKGdyb3VwKTtcblxuICBmb3IgKGNvbnN0IGNvbnRhY3Qgb2YgY29udGFjdHMpIHtcbiAgICBzdGF0ZSA9IHN0YXRlLmFkZENvbnRhY3QoY29udGFjdCwge1xuICAgICAgaWRlbnRpdHlTdGF0ZTogUHJvdG8uQ29udGFjdFJlY29yZC5JZGVudGl0eVN0YXRlLlZFUklGSUVELFxuICAgICAgd2hpdGVsaXN0ZWQ6IHRydWUsXG5cbiAgICAgIGlkZW50aXR5S2V5OiBjb250YWN0LnB1YmxpY0tleS5zZXJpYWxpemUoKSxcbiAgICAgIHByb2ZpbGVLZXk6IGNvbnRhY3QucHJvZmlsZUtleS5zZXJpYWxpemUoKSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRlID0gc3RhdGUucGluKGZpcnN0Q29udGFjdCk7XG5cbiAgYXdhaXQgcGhvbmUuc2V0U3RvcmFnZVN0YXRlKHN0YXRlKTtcblxuICAvLyBMaW5rIG5ldyBkZXZpY2VcbiAgY29uc3QgYXBwID0gYXdhaXQgYm9vdHN0cmFwLmxpbmsoKTtcblxuICBjb25zdCB7IGRlc2t0b3AgfSA9IGJvb3RzdHJhcDtcblxuICAvLyBTZW5kIGEgbWVzc2FnZSB0byB0aGUgZ3JvdXAgYW5kIHRoZSBmaXJzdCBjb250YWN0XG4gIGNvbnN0IGNvbnRhY3RTZW5kID0gY29udGFjdHNbMF0uc2VuZFRleHQoZGVza3RvcCwgJ2hlbGxvIGZyb20gY29udGFjdCcsIHtcbiAgICB0aW1lc3RhbXA6IGJvb3RzdHJhcC5nZXRUaW1lc3RhbXAoKSxcbiAgICBzZWFsZWQ6IHRydWUsXG4gIH0pO1xuXG4gIGNvbnN0IGdyb3VwU2VuZCA9IG1lbWJlcnNbMF0uc2VuZFRleHQoZGVza3RvcCwgJ2hlbGxvIGluIGdyb3VwJywge1xuICAgIHRpbWVzdGFtcDogYm9vdHN0cmFwLmdldFRpbWVzdGFtcCgpLFxuICAgIHNlYWxlZDogdHJ1ZSxcbiAgICBncm91cCxcbiAgfSk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoW2NvbnRhY3RTZW5kLCBncm91cFNlbmRdKTtcblxuICByZXR1cm4geyBib290c3RyYXAsIGFwcCwgZ3JvdXAsIG1lbWJlcnMgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBd0I7QUFFeEIseUJBQW9DO0FBQ3BDLHdCQUFvQjtBQUNwQix1QkFBMEI7QUFHbkIsTUFBTSxRQUFRLDBCQUFZLG1CQUFtQjtBQUlwRCxNQUFNLGFBQWE7QUFtQm5CLDJCQUNFLFNBQ2dDO0FBRWhDLFFBQU0sWUFBWSxJQUFJLDJCQUFVLE9BQU87QUFFdkMsUUFBTSxVQUFVLEtBQUs7QUFHckIsUUFBTSxFQUFFLFVBQVUsVUFBVTtBQUU1QixRQUFNLENBQUMsZ0JBQWdCO0FBRXZCLFFBQU0sVUFBVSxDQUFDLEdBQUcsUUFBUSxFQUFFLE1BQU0sR0FBRyxVQUFVO0FBRWpELFFBQU0sUUFBUSxNQUFNLE1BQU0sWUFBWTtBQUFBLElBQ3BDLE9BQU87QUFBQSxJQUNQLFNBQVMsQ0FBQyxPQUFPLEdBQUcsT0FBTztBQUFBLEVBQzdCLENBQUM7QUFFRCxNQUFJLFFBQVEsZ0NBQWEsU0FBUztBQUVsQyxVQUFRLE1BQU0sY0FBYztBQUFBLElBQzFCLFlBQVksTUFBTSxXQUFXLFVBQVU7QUFBQSxJQUN2QyxNQUFNLE1BQU0sT0FBTztBQUFBLEVBQ3JCLENBQUM7QUFFRCxVQUFRLE1BQ0wsU0FBUyxPQUFPO0FBQUEsSUFDZixhQUFhO0FBQUEsRUFDZixDQUFDLEVBQ0EsU0FBUyxLQUFLO0FBRWpCLGFBQVcsV0FBVyxVQUFVO0FBQzlCLFlBQVEsTUFBTSxXQUFXLFNBQVM7QUFBQSxNQUNoQyxlQUFlLHlCQUFNLGNBQWMsY0FBYztBQUFBLE1BQ2pELGFBQWE7QUFBQSxNQUViLGFBQWEsUUFBUSxVQUFVLFVBQVU7QUFBQSxNQUN6QyxZQUFZLFFBQVEsV0FBVyxVQUFVO0FBQUEsSUFDM0MsQ0FBQztBQUFBLEVBQ0g7QUFFQSxVQUFRLE1BQU0sSUFBSSxZQUFZO0FBRTlCLFFBQU0sTUFBTSxnQkFBZ0IsS0FBSztBQUdqQyxRQUFNLE1BQU0sTUFBTSxVQUFVLEtBQUs7QUFFakMsUUFBTSxFQUFFLFlBQVk7QUFHcEIsUUFBTSxjQUFjLFNBQVMsR0FBRyxTQUFTLFNBQVMsc0JBQXNCO0FBQUEsSUFDdEUsV0FBVyxVQUFVLGFBQWE7QUFBQSxJQUNsQyxRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsUUFBTSxZQUFZLFFBQVEsR0FBRyxTQUFTLFNBQVMsa0JBQWtCO0FBQUEsSUFDL0QsV0FBVyxVQUFVLGFBQWE7QUFBQSxJQUNsQyxRQUFRO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sUUFBUSxJQUFJLENBQUMsYUFBYSxTQUFTLENBQUM7QUFFMUMsU0FBTyxFQUFFLFdBQVcsS0FBSyxPQUFPLFFBQVE7QUFDMUM7QUFuRXNCIiwKICAibmFtZXMiOiBbXQp9Cg==
