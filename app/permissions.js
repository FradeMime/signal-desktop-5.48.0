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
var permissions_exports = {};
__export(permissions_exports, {
  installPermissionsHandler: () => installPermissionsHandler
});
module.exports = __toCommonJS(permissions_exports);
const PERMISSIONS = {
  fullscreen: true,
  notifications: true,
  media: false,
  geolocation: false,
  midiSysex: false,
  openExternal: false,
  pointerLock: false
};
function _createPermissionHandler(userConfig) {
  return (_webContents, permission, callback, details) => {
    if (permission === "media") {
      if (details.mediaTypes?.includes("audio") || details.mediaTypes?.includes("video")) {
        if (details.mediaTypes?.includes("audio") && userConfig.get("mediaPermissions")) {
          callback(true);
          return;
        }
        if (details.mediaTypes?.includes("video") && userConfig.get("mediaCameraPermissions")) {
          callback(true);
          return;
        }
        callback(false);
        return;
      }
      callback(true);
      return;
    }
    if (PERMISSIONS[permission]) {
      console.log(`Approving request for permission '${permission}'`);
      callback(true);
      return;
    }
    console.log(`Denying request for permission '${permission}'`);
    callback(false);
  };
}
function installPermissionsHandler({
  session,
  userConfig
}) {
  session.defaultSession.setPermissionRequestHandler(null);
  session.defaultSession.setPermissionRequestHandler(_createPermissionHandler(userConfig));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  installPermissionsHandler
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGVybWlzc2lvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyBUaGUgbGlzdCBvZiBwZXJtaXNzaW9ucyBpcyBoZXJlOlxuLy8gICBodHRwczovL2VsZWN0cm9uanMub3JnL2RvY3MvYXBpL3Nlc3Npb24jc2Vzc2V0cGVybWlzc2lvbnJlcXVlc3RoYW5kbGVyaGFuZGxlclxuXG5pbXBvcnQgdHlwZSB7IHNlc3Npb24gYXMgRWxlY3Ryb25TZXNzaW9uIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgdHlwZSB7IENvbmZpZ1R5cGUgfSBmcm9tICcuL2Jhc2VfY29uZmlnJztcblxuY29uc3QgUEVSTUlTU0lPTlM6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0ge1xuICAvLyBBbGxvd2VkXG4gIGZ1bGxzY3JlZW46IHRydWUsIC8vIHJlcXVpcmVkIHRvIHNob3cgdmlkZW9zIGluIGZ1bGwtc2NyZWVuXG4gIG5vdGlmaWNhdGlvbnM6IHRydWUsIC8vIHJlcXVpcmVkIHRvIHNob3cgT1Mgbm90aWZpY2F0aW9ucyBmb3IgbmV3IG1lc3NhZ2VzXG5cbiAgLy8gT2ZmIGJ5IGRlZmF1bHQsIGNhbiBiZSBlbmFibGVkIGJ5IHVzZXJcbiAgbWVkaWE6IGZhbHNlLCAvLyByZXF1aXJlZCBmb3IgYWNjZXNzIHRvIG1pY3JvcGhvbmUgYW5kIGNhbWVyYSwgdXNlZCBmb3Igdm9pY2Ugbm90ZXMgYW5kIGNhbGxpbmdcblxuICAvLyBOb3QgYWxsb3dlZFxuICBnZW9sb2NhdGlvbjogZmFsc2UsXG4gIG1pZGlTeXNleDogZmFsc2UsXG4gIG9wZW5FeHRlcm5hbDogZmFsc2UsIC8vIHdlIGRvbid0IG5lZWQgdGhpczsgd2Ugb3BlbiBsaW5rcyB2aWEgJ3dpbGwtbmF2aWdhdGUnIGV2ZW50XG4gIHBvaW50ZXJMb2NrOiBmYWxzZSxcbn07XG5cbmZ1bmN0aW9uIF9jcmVhdGVQZXJtaXNzaW9uSGFuZGxlcihcbiAgdXNlckNvbmZpZzogUGljazxDb25maWdUeXBlLCAnZ2V0Jz5cbik6IFBhcmFtZXRlcnM8dHlwZW9mIEVsZWN0cm9uU2Vzc2lvbi5wcm90b3R5cGUuc2V0UGVybWlzc2lvblJlcXVlc3RIYW5kbGVyPlswXSB7XG4gIHJldHVybiAoX3dlYkNvbnRlbnRzLCBwZXJtaXNzaW9uLCBjYWxsYmFjaywgZGV0YWlscyk6IHZvaWQgPT4ge1xuICAgIC8vIFdlIGRlZmF1bHQgJ21lZGlhJyBwZXJtaXNzaW9uIHRvIGZhbHNlLCBidXQgdGhlIHVzZXIgY2FuIG92ZXJyaWRlIHRoYXQgZm9yXG4gICAgLy8gdGhlIG1pY3JvcGhvbmUgYW5kIGNhbWVyYS5cbiAgICBpZiAocGVybWlzc2lvbiA9PT0gJ21lZGlhJykge1xuICAgICAgaWYgKFxuICAgICAgICBkZXRhaWxzLm1lZGlhVHlwZXM/LmluY2x1ZGVzKCdhdWRpbycpIHx8XG4gICAgICAgIGRldGFpbHMubWVkaWFUeXBlcz8uaW5jbHVkZXMoJ3ZpZGVvJylcbiAgICAgICkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZGV0YWlscy5tZWRpYVR5cGVzPy5pbmNsdWRlcygnYXVkaW8nKSAmJlxuICAgICAgICAgIHVzZXJDb25maWcuZ2V0KCdtZWRpYVBlcm1pc3Npb25zJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBkZXRhaWxzLm1lZGlhVHlwZXM/LmluY2x1ZGVzKCd2aWRlbycpICYmXG4gICAgICAgICAgdXNlckNvbmZpZy5nZXQoJ21lZGlhQ2FtZXJhUGVybWlzc2lvbnMnKVxuICAgICAgICApIHtcbiAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaXQgZG9lc24ndCBoYXZlICd2aWRlbycgb3IgJ2F1ZGlvJywgaXQncyBwcm9iYWJseSBzY3JlZW5zaGFyZS5cbiAgICAgIC8vIFRPRE86IERFU0tUT1AtMTYxMVxuICAgICAgY2FsbGJhY2sodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKFBFUk1JU1NJT05TW3Blcm1pc3Npb25dKSB7XG4gICAgICBjb25zb2xlLmxvZyhgQXBwcm92aW5nIHJlcXVlc3QgZm9yIHBlcm1pc3Npb24gJyR7cGVybWlzc2lvbn0nYCk7XG4gICAgICBjYWxsYmFjayh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgRGVueWluZyByZXF1ZXN0IGZvciBwZXJtaXNzaW9uICcke3Blcm1pc3Npb259J2ApO1xuICAgIGNhbGxiYWNrKGZhbHNlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGxQZXJtaXNzaW9uc0hhbmRsZXIoe1xuICBzZXNzaW9uLFxuICB1c2VyQ29uZmlnLFxufToge1xuICBzZXNzaW9uOiB0eXBlb2YgRWxlY3Ryb25TZXNzaW9uO1xuICB1c2VyQ29uZmlnOiBQaWNrPENvbmZpZ1R5cGUsICdnZXQnPjtcbn0pOiB2b2lkIHtcbiAgLy8gU2V0dGluZyB0aGUgcGVybWlzc2lvbiByZXF1ZXN0IGhhbmRsZXIgdG8gbnVsbCBmaXJzdCBmb3JjZXMgYW55IHBlcm1pc3Npb25zIHRvIGJlXG4gIC8vICAgcmVxdWVzdGVkIGFnYWluLiBXaXRob3V0IHRoaXMsIHJldm9rZWQgcGVybWlzc2lvbnMgbWlnaHQgc3RpbGwgYmUgYXZhaWxhYmxlIGlmXG4gIC8vICAgdGhleSd2ZSBhbHJlYWR5IGJlZW4gdXNlZCBzdWNjZXNzZnVsbHkuXG4gIHNlc3Npb24uZGVmYXVsdFNlc3Npb24uc2V0UGVybWlzc2lvblJlcXVlc3RIYW5kbGVyKG51bGwpO1xuXG4gIHNlc3Npb24uZGVmYXVsdFNlc3Npb24uc2V0UGVybWlzc2lvblJlcXVlc3RIYW5kbGVyKFxuICAgIF9jcmVhdGVQZXJtaXNzaW9uSGFuZGxlcih1c2VyQ29uZmlnKVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBLE1BQU0sY0FBdUM7QUFBQSxFQUUzQyxZQUFZO0FBQUEsRUFDWixlQUFlO0FBQUEsRUFHZixPQUFPO0FBQUEsRUFHUCxhQUFhO0FBQUEsRUFDYixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQ2Y7QUFFQSxrQ0FDRSxZQUM2RTtBQUM3RSxTQUFPLENBQUMsY0FBYyxZQUFZLFVBQVUsWUFBa0I7QUFHNUQsUUFBSSxlQUFlLFNBQVM7QUFDMUIsVUFDRSxRQUFRLFlBQVksU0FBUyxPQUFPLEtBQ3BDLFFBQVEsWUFBWSxTQUFTLE9BQU8sR0FDcEM7QUFDQSxZQUNFLFFBQVEsWUFBWSxTQUFTLE9BQU8sS0FDcEMsV0FBVyxJQUFJLGtCQUFrQixHQUNqQztBQUNBLG1CQUFTLElBQUk7QUFDYjtBQUFBLFFBQ0Y7QUFDQSxZQUNFLFFBQVEsWUFBWSxTQUFTLE9BQU8sS0FDcEMsV0FBVyxJQUFJLHdCQUF3QixHQUN2QztBQUNBLG1CQUFTLElBQUk7QUFDYjtBQUFBLFFBQ0Y7QUFFQSxpQkFBUyxLQUFLO0FBQ2Q7QUFBQSxNQUNGO0FBSUEsZUFBUyxJQUFJO0FBQ2I7QUFBQSxJQUNGO0FBRUEsUUFBSSxZQUFZLGFBQWE7QUFDM0IsY0FBUSxJQUFJLHFDQUFxQyxhQUFhO0FBQzlELGVBQVMsSUFBSTtBQUNiO0FBQUEsSUFDRjtBQUVBLFlBQVEsSUFBSSxtQ0FBbUMsYUFBYTtBQUM1RCxhQUFTLEtBQUs7QUFBQSxFQUNoQjtBQUNGO0FBN0NTLEFBK0NGLG1DQUFtQztBQUFBLEVBQ3hDO0FBQUEsRUFDQTtBQUFBLEdBSU87QUFJUCxVQUFRLGVBQWUsNEJBQTRCLElBQUk7QUFFdkQsVUFBUSxlQUFlLDRCQUNyQix5QkFBeUIsVUFBVSxDQUNyQztBQUNGO0FBZmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
