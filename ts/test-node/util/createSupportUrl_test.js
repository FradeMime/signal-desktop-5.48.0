var import_chai = require("chai");
var import_createSupportUrl = require("../../util/createSupportUrl");
describe("createSupportUrl", () => {
  it('returns support url for "en" locale', () => {
    import_chai.assert.strictEqual((0, import_createSupportUrl.createSupportUrl)({ locale: "en" }), "https://support.signal.org/hc/en-us/requests/new?desktop");
  });
  it('returns support url for "fr" locale', () => {
    import_chai.assert.strictEqual((0, import_createSupportUrl.createSupportUrl)({ locale: "fr" }), "https://support.signal.org/hc/fr/requests/new?desktop");
  });
  it("returns support url with a query", () => {
    import_chai.assert.strictEqual((0, import_createSupportUrl.createSupportUrl)({ locale: "en", query: { debugLog: "https://" } }), "https://support.signal.org/hc/en-us/requests/new?desktop&debugLog=https%3A%2F%2F");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlU3VwcG9ydFVybF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBjcmVhdGVTdXBwb3J0VXJsIH0gZnJvbSAnLi4vLi4vdXRpbC9jcmVhdGVTdXBwb3J0VXJsJztcblxuZGVzY3JpYmUoJ2NyZWF0ZVN1cHBvcnRVcmwnLCAoKSA9PiB7XG4gIGl0KCdyZXR1cm5zIHN1cHBvcnQgdXJsIGZvciBcImVuXCIgbG9jYWxlJywgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGNyZWF0ZVN1cHBvcnRVcmwoeyBsb2NhbGU6ICdlbicgfSksXG4gICAgICAnaHR0cHM6Ly9zdXBwb3J0LnNpZ25hbC5vcmcvaGMvZW4tdXMvcmVxdWVzdHMvbmV3P2Rlc2t0b3AnXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgc3VwcG9ydCB1cmwgZm9yIFwiZnJcIiBsb2NhbGUnLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgY3JlYXRlU3VwcG9ydFVybCh7IGxvY2FsZTogJ2ZyJyB9KSxcbiAgICAgICdodHRwczovL3N1cHBvcnQuc2lnbmFsLm9yZy9oYy9mci9yZXF1ZXN0cy9uZXc/ZGVza3RvcCdcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBzdXBwb3J0IHVybCB3aXRoIGEgcXVlcnknLCAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgY3JlYXRlU3VwcG9ydFVybCh7IGxvY2FsZTogJ2VuJywgcXVlcnk6IHsgZGVidWdMb2c6ICdodHRwczovLycgfSB9KSxcbiAgICAgICdodHRwczovL3N1cHBvcnQuc2lnbmFsLm9yZy9oYy9lbi11cy9yZXF1ZXN0cy9uZXc/JyArXG4gICAgICAgICdkZXNrdG9wJmRlYnVnTG9nPWh0dHBzJTNBJTJGJTJGJ1xuICAgICk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsOEJBQWlDO0FBRWpDLFNBQVMsb0JBQW9CLE1BQU07QUFDakMsS0FBRyx1Q0FBdUMsTUFBTTtBQUM5Qyx1QkFBTyxZQUNMLDhDQUFpQixFQUFFLFFBQVEsS0FBSyxDQUFDLEdBQ2pDLDBEQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyx1Q0FBdUMsTUFBTTtBQUM5Qyx1QkFBTyxZQUNMLDhDQUFpQixFQUFFLFFBQVEsS0FBSyxDQUFDLEdBQ2pDLHVEQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxvQ0FBb0MsTUFBTTtBQUMzQyx1QkFBTyxZQUNMLDhDQUFpQixFQUFFLFFBQVEsTUFBTSxPQUFPLEVBQUUsVUFBVSxXQUFXLEVBQUUsQ0FBQyxHQUNsRSxrRkFFRjtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
