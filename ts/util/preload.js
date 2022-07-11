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
var preload_exports = {};
__export(preload_exports, {
  createCallback: () => createCallback,
  createSetting: () => createSetting,
  installCallback: () => installCallback,
  installSetting: () => installSetting
});
module.exports = __toCommonJS(preload_exports);
var import_electron = require("electron");
var import_assert = require("./assert");
function capitalize(name) {
  const result = name.slice(0, 1).toUpperCase() + name.slice(1);
  return result;
}
function getSetterName(name) {
  return `set${capitalize(name)}`;
}
function getGetterName(name) {
  return `get${capitalize(name)}`;
}
function createSetting(name, overrideOptions = {}) {
  const options = {
    getter: true,
    setter: true,
    ...overrideOptions
  };
  function getValue() {
    (0, import_assert.strictAssert)(options.getter, `${name} has no getter`);
    return import_electron.ipcRenderer.invoke(`settings:get:${name}`);
  }
  function setValue(value) {
    (0, import_assert.strictAssert)(options.setter, `${name} has no setter`);
    return import_electron.ipcRenderer.invoke(`settings:set:${name}`, value);
  }
  return {
    getValue,
    setValue
  };
}
function createCallback(name) {
  return (...args) => {
    return import_electron.ipcRenderer.invoke(`settings:call:${name}`, args);
  };
}
function installSetting(name, { getter = true, setter = true } = {}) {
  const getterName = getGetterName(name);
  const setterName = getSetterName(name);
  if (getter) {
    import_electron.ipcRenderer.on(`settings:get:${name}`, async (_event, { seq }) => {
      const getFn = window.Events[getterName];
      if (!getFn) {
        import_electron.ipcRenderer.send(`settings:get:${name}`, `installGetter: ${getterName} not found for event ${name}`);
        return;
      }
      try {
        import_electron.ipcRenderer.send("settings:response", seq, null, await getFn());
      } catch (error) {
        import_electron.ipcRenderer.send("settings:response", seq, error && error.stack ? error.stack : error);
      }
    });
  }
  if (setter) {
    import_electron.ipcRenderer.on(`settings:set:${name}`, async (_event, { seq, value }) => {
      const setFn = window.Events[setterName];
      if (!setFn) {
        import_electron.ipcRenderer.send("settings:response", seq, `installSetter: ${setterName} not found for event ${name}`);
        return;
      }
      try {
        await setFn(value);
        import_electron.ipcRenderer.send("settings:response", seq, null);
      } catch (error) {
        import_electron.ipcRenderer.send("settings:response", seq, error && error.stack ? error.stack : error);
      }
    });
  }
}
function installCallback(name) {
  import_electron.ipcRenderer.on(`settings:call:${name}`, async (_, { seq, args }) => {
    const hook = window.Events[name];
    try {
      import_electron.ipcRenderer.send("settings:response", seq, null, await hook(...args));
    } catch (error) {
      import_electron.ipcRenderer.send("settings:response", seq, error && error.stack ? error.stack : error);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCallback,
  createSetting,
  installCallback,
  installSetting
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHR5cGUgeyBVbndyYXBQcm9taXNlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7XG4gIElQQ0V2ZW50c1ZhbHVlc1R5cGUsXG4gIElQQ0V2ZW50c0NhbGxiYWNrc1R5cGUsXG4gIElQQ0V2ZW50R2V0dGVyVHlwZSxcbiAgSVBDRXZlbnRTZXR0ZXJUeXBlLFxufSBmcm9tICcuL2NyZWF0ZUlQQ0V2ZW50cyc7XG5cbnR5cGUgU2V0dGluZ09wdGlvbnNUeXBlID0ge1xuICBnZXR0ZXI/OiBib29sZWFuO1xuICBzZXR0ZXI/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgU2V0dGluZ1R5cGU8VmFsdWU+ID0gUmVhZG9ubHk8e1xuICBnZXRWYWx1ZTogKCkgPT4gUHJvbWlzZTxWYWx1ZT47XG4gIHNldFZhbHVlOiAodmFsdWU6IFZhbHVlKSA9PiBQcm9taXNlPFZhbHVlPjtcbn0+O1xuXG5mdW5jdGlvbiBjYXBpdGFsaXplPE5hbWUgZXh0ZW5kcyBrZXlvZiBJUENFdmVudHNWYWx1ZXNUeXBlPihcbiAgbmFtZTogTmFtZVxuKTogQ2FwaXRhbGl6ZTxOYW1lPiB7XG4gIGNvbnN0IHJlc3VsdCA9IG5hbWUuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG5cbiAgcmV0dXJuIHJlc3VsdCBhcyBDYXBpdGFsaXplPE5hbWU+O1xufVxuXG5mdW5jdGlvbiBnZXRTZXR0ZXJOYW1lPEtleSBleHRlbmRzIGtleW9mIElQQ0V2ZW50c1ZhbHVlc1R5cGU+KFxuICBuYW1lOiBLZXlcbik6IElQQ0V2ZW50U2V0dGVyVHlwZTxLZXk+IHtcbiAgcmV0dXJuIGBzZXQke2NhcGl0YWxpemUobmFtZSl9YDtcbn1cblxuZnVuY3Rpb24gZ2V0R2V0dGVyTmFtZTxLZXkgZXh0ZW5kcyBrZXlvZiBJUENFdmVudHNWYWx1ZXNUeXBlPihcbiAgbmFtZTogS2V5XG4pOiBJUENFdmVudEdldHRlclR5cGU8S2V5PiB7XG4gIHJldHVybiBgZ2V0JHtjYXBpdGFsaXplKG5hbWUpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXR0aW5nPFxuICBOYW1lIGV4dGVuZHMga2V5b2YgSVBDRXZlbnRzVmFsdWVzVHlwZSxcbiAgVmFsdWUgZXh0ZW5kcyBJUENFdmVudHNWYWx1ZXNUeXBlW05hbWVdXG4+KG5hbWU6IE5hbWUsIG92ZXJyaWRlT3B0aW9uczogU2V0dGluZ09wdGlvbnNUeXBlID0ge30pOiBTZXR0aW5nVHlwZTxWYWx1ZT4ge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIGdldHRlcjogdHJ1ZSxcbiAgICBzZXR0ZXI6IHRydWUsXG4gICAgLi4ub3ZlcnJpZGVPcHRpb25zLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGdldFZhbHVlKCk6IFByb21pc2U8VmFsdWU+IHtcbiAgICBzdHJpY3RBc3NlcnQob3B0aW9ucy5nZXR0ZXIsIGAke25hbWV9IGhhcyBubyBnZXR0ZXJgKTtcbiAgICByZXR1cm4gaXBjUmVuZGVyZXIuaW52b2tlKGBzZXR0aW5nczpnZXQ6JHtuYW1lfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VmFsdWUodmFsdWU6IFZhbHVlKTogUHJvbWlzZTxWYWx1ZT4ge1xuICAgIHN0cmljdEFzc2VydChvcHRpb25zLnNldHRlciwgYCR7bmFtZX0gaGFzIG5vIHNldHRlcmApO1xuICAgIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoYHNldHRpbmdzOnNldDoke25hbWV9YCwgdmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRWYWx1ZSxcbiAgICBzZXRWYWx1ZSxcbiAgfTtcbn1cblxudHlwZSBVbndyYXBSZXR1cm48XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIENhbGxiYWNrIGV4dGVuZHMgKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IHVua25vd25cbj4gPSBVbndyYXBQcm9taXNlPFJldHVyblR5cGU8Q2FsbGJhY2s+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhbGxiYWNrPFxuICBOYW1lIGV4dGVuZHMga2V5b2YgSVBDRXZlbnRzQ2FsbGJhY2tzVHlwZSxcbiAgQ2FsbGJhY2sgZXh0ZW5kcyBJUENFdmVudHNDYWxsYmFja3NUeXBlW05hbWVdXG4+KFxuICBuYW1lOiBOYW1lXG4pOiAoLi4uYXJnczogUGFyYW1ldGVyczxDYWxsYmFjaz4pID0+IFByb21pc2U8VW53cmFwUmV0dXJuPENhbGxiYWNrPj4ge1xuICByZXR1cm4gKC4uLmFyZ3M6IFBhcmFtZXRlcnM8Q2FsbGJhY2s+KTogUHJvbWlzZTxVbndyYXBSZXR1cm48Q2FsbGJhY2s+PiA9PiB7XG4gICAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZShgc2V0dGluZ3M6Y2FsbDoke25hbWV9YCwgYXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsU2V0dGluZyhcbiAgbmFtZToga2V5b2YgSVBDRXZlbnRzVmFsdWVzVHlwZSxcbiAgeyBnZXR0ZXIgPSB0cnVlLCBzZXR0ZXIgPSB0cnVlIH06IHsgZ2V0dGVyPzogYm9vbGVhbjsgc2V0dGVyPzogYm9vbGVhbiB9ID0ge31cbik6IHZvaWQge1xuICBjb25zdCBnZXR0ZXJOYW1lID0gZ2V0R2V0dGVyTmFtZShuYW1lKTtcbiAgY29uc3Qgc2V0dGVyTmFtZSA9IGdldFNldHRlck5hbWUobmFtZSk7XG5cbiAgaWYgKGdldHRlcikge1xuICAgIGlwY1JlbmRlcmVyLm9uKGBzZXR0aW5nczpnZXQ6JHtuYW1lfWAsIGFzeW5jIChfZXZlbnQsIHsgc2VxIH0pID0+IHtcbiAgICAgIGNvbnN0IGdldEZuID0gd2luZG93LkV2ZW50c1tnZXR0ZXJOYW1lXTtcbiAgICAgIGlmICghZ2V0Rm4pIHtcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZChcbiAgICAgICAgICBgc2V0dGluZ3M6Z2V0OiR7bmFtZX1gLFxuICAgICAgICAgIGBpbnN0YWxsR2V0dGVyOiAke2dldHRlck5hbWV9IG5vdCBmb3VuZCBmb3IgZXZlbnQgJHtuYW1lfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2V0dGluZ3M6cmVzcG9uc2UnLCBzZXEsIG51bGwsIGF3YWl0IGdldEZuKCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZChcbiAgICAgICAgICAnc2V0dGluZ3M6cmVzcG9uc2UnLFxuICAgICAgICAgIHNlcSxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChzZXR0ZXIpIHtcbiAgICBpcGNSZW5kZXJlci5vbihgc2V0dGluZ3M6c2V0OiR7bmFtZX1gLCBhc3luYyAoX2V2ZW50LCB7IHNlcSwgdmFsdWUgfSkgPT4ge1xuICAgICAgLy8gU29tZSBzZXR0aW5ncyBkbyBub3QgaGF2ZSBzZXR0ZXJzLi4uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgY29uc3Qgc2V0Rm4gPSAod2luZG93LkV2ZW50cyBhcyBhbnkpW3NldHRlck5hbWVdIGFzIChcbiAgICAgICAgdmFsdWU6IHVua25vd25cbiAgICAgICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgIGlmICghc2V0Rm4pIHtcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZChcbiAgICAgICAgICAnc2V0dGluZ3M6cmVzcG9uc2UnLFxuICAgICAgICAgIHNlcSxcbiAgICAgICAgICBgaW5zdGFsbFNldHRlcjogJHtzZXR0ZXJOYW1lfSBub3QgZm91bmQgZm9yIGV2ZW50ICR7bmFtZX1gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHNldEZuKHZhbHVlKTtcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2V0dGluZ3M6cmVzcG9uc2UnLCBzZXEsIG51bGwpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaXBjUmVuZGVyZXIuc2VuZChcbiAgICAgICAgICAnc2V0dGluZ3M6cmVzcG9uc2UnLFxuICAgICAgICAgIHNlcSxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbENhbGxiYWNrPE5hbWUgZXh0ZW5kcyBrZXlvZiBJUENFdmVudHNDYWxsYmFja3NUeXBlPihcbiAgbmFtZTogTmFtZVxuKTogdm9pZCB7XG4gIGlwY1JlbmRlcmVyLm9uKGBzZXR0aW5nczpjYWxsOiR7bmFtZX1gLCBhc3luYyAoXywgeyBzZXEsIGFyZ3MgfSkgPT4ge1xuICAgIGNvbnN0IGhvb2sgPSB3aW5kb3cuRXZlbnRzW25hbWVdIGFzIChcbiAgICAgIC4uLmhvb2tBcmdzOiBBcnJheTx1bmtub3duPlxuICAgICkgPT4gUHJvbWlzZTx1bmtub3duPjtcbiAgICB0cnkge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2V0dGluZ3M6cmVzcG9uc2UnLCBzZXEsIG51bGwsIGF3YWl0IGhvb2soLi4uYXJncykpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKFxuICAgICAgICAnc2V0dGluZ3M6cmVzcG9uc2UnLFxuICAgICAgICBzZXEsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUE0QjtBQUU1QixvQkFBNkI7QUFtQjdCLG9CQUNFLE1BQ2tCO0FBQ2xCLFFBQU0sU0FBUyxLQUFLLE1BQU0sR0FBRyxDQUFDLEVBQUUsWUFBWSxJQUFJLEtBQUssTUFBTSxDQUFDO0FBRTVELFNBQU87QUFDVDtBQU5TLEFBUVQsdUJBQ0UsTUFDeUI7QUFDekIsU0FBTyxNQUFNLFdBQVcsSUFBSTtBQUM5QjtBQUpTLEFBTVQsdUJBQ0UsTUFDeUI7QUFDekIsU0FBTyxNQUFNLFdBQVcsSUFBSTtBQUM5QjtBQUpTLEFBTUYsdUJBR0wsTUFBWSxrQkFBc0MsQ0FBQyxHQUF1QjtBQUMxRSxRQUFNLFVBQVU7QUFBQSxJQUNkLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxPQUNMO0FBQUEsRUFDTDtBQUVBLHNCQUFvQztBQUNsQyxvQ0FBYSxRQUFRLFFBQVEsR0FBRyxvQkFBb0I7QUFDcEQsV0FBTyw0QkFBWSxPQUFPLGdCQUFnQixNQUFNO0FBQUEsRUFDbEQ7QUFIUyxBQUtULG9CQUFrQixPQUE4QjtBQUM5QyxvQ0FBYSxRQUFRLFFBQVEsR0FBRyxvQkFBb0I7QUFDcEQsV0FBTyw0QkFBWSxPQUFPLGdCQUFnQixRQUFRLEtBQUs7QUFBQSxFQUN6RDtBQUhTLEFBS1QsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBeEJnQixBQStCVCx3QkFJTCxNQUNvRTtBQUNwRSxTQUFPLElBQUksU0FBZ0U7QUFDekUsV0FBTyw0QkFBWSxPQUFPLGlCQUFpQixRQUFRLElBQUk7QUFBQSxFQUN6RDtBQUNGO0FBVGdCLEFBV1Qsd0JBQ0wsTUFDQSxFQUFFLFNBQVMsTUFBTSxTQUFTLFNBQWlELENBQUMsR0FDdEU7QUFDTixRQUFNLGFBQWEsY0FBYyxJQUFJO0FBQ3JDLFFBQU0sYUFBYSxjQUFjLElBQUk7QUFFckMsTUFBSSxRQUFRO0FBQ1YsZ0NBQVksR0FBRyxnQkFBZ0IsUUFBUSxPQUFPLFFBQVEsRUFBRSxVQUFVO0FBQ2hFLFlBQU0sUUFBUSxPQUFPLE9BQU87QUFDNUIsVUFBSSxDQUFDLE9BQU87QUFDVixvQ0FBWSxLQUNWLGdCQUFnQixRQUNoQixrQkFBa0Isa0NBQWtDLE1BQ3REO0FBQ0E7QUFBQSxNQUNGO0FBQ0EsVUFBSTtBQUNGLG9DQUFZLEtBQUsscUJBQXFCLEtBQUssTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUFBLE1BQ2hFLFNBQVMsT0FBUDtBQUNBLG9DQUFZLEtBQ1YscUJBQ0EsS0FDQSxTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVEsS0FDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQUksUUFBUTtBQUNWLGdDQUFZLEdBQUcsZ0JBQWdCLFFBQVEsT0FBTyxRQUFRLEVBQUUsS0FBSyxZQUFZO0FBR3ZFLFlBQU0sUUFBUyxPQUFPLE9BQWU7QUFHckMsVUFBSSxDQUFDLE9BQU87QUFDVixvQ0FBWSxLQUNWLHFCQUNBLEtBQ0Esa0JBQWtCLGtDQUFrQyxNQUN0RDtBQUNBO0FBQUEsTUFDRjtBQUNBLFVBQUk7QUFDRixjQUFNLE1BQU0sS0FBSztBQUNqQixvQ0FBWSxLQUFLLHFCQUFxQixLQUFLLElBQUk7QUFBQSxNQUNqRCxTQUFTLE9BQVA7QUFDQSxvQ0FBWSxLQUNWLHFCQUNBLEtBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQXhEZ0IsQUEwRFQseUJBQ0wsTUFDTTtBQUNOLDhCQUFZLEdBQUcsaUJBQWlCLFFBQVEsT0FBTyxHQUFHLEVBQUUsS0FBSyxXQUFXO0FBQ2xFLFVBQU0sT0FBTyxPQUFPLE9BQU87QUFHM0IsUUFBSTtBQUNGLGtDQUFZLEtBQUsscUJBQXFCLEtBQUssTUFBTSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7QUFBQSxJQUN0RSxTQUFTLE9BQVA7QUFDQSxrQ0FBWSxLQUNWLHFCQUNBLEtBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBakJnQiIsCiAgIm5hbWVzIjogW10KfQo=
