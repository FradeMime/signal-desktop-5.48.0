var import_chai = require("chai");
var import_getHSL = require("../../util/getHSL");
describe("getHSL", () => {
  it("returns expected lightness values", () => {
    const saturation = 100;
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 0, saturation }), "hsl(0, 100%, 45%)");
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 60, saturation }), "hsl(60, 100%, 30%)");
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 90, saturation }), "hsl(90, 100%, 30%)");
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 180, saturation }), "hsl(180, 100%, 30%)");
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 240, saturation }), "hsl(240, 100%, 50%)");
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 300, saturation }), "hsl(300, 100%, 40%)");
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 360, saturation }), "hsl(360, 100%, 45%)");
  });
  it("calculates lightness between values", () => {
    import_chai.assert.equal((0, import_getHSL.getHSL)({ hue: 210, saturation: 100 }), "hsl(210, 100%, 40%)");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SFNMX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGdldEhTTCB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0SFNMJztcblxuZGVzY3JpYmUoJ2dldEhTTCcsICgpID0+IHtcbiAgaXQoJ3JldHVybnMgZXhwZWN0ZWQgbGlnaHRuZXNzIHZhbHVlcycsICgpID0+IHtcbiAgICBjb25zdCBzYXR1cmF0aW9uID0gMTAwO1xuICAgIGFzc2VydC5lcXVhbChnZXRIU0woeyBodWU6IDAsIHNhdHVyYXRpb24gfSksICdoc2woMCwgMTAwJSwgNDUlKScpO1xuICAgIGFzc2VydC5lcXVhbChnZXRIU0woeyBodWU6IDYwLCBzYXR1cmF0aW9uIH0pLCAnaHNsKDYwLCAxMDAlLCAzMCUpJyk7XG4gICAgYXNzZXJ0LmVxdWFsKGdldEhTTCh7IGh1ZTogOTAsIHNhdHVyYXRpb24gfSksICdoc2woOTAsIDEwMCUsIDMwJSknKTtcbiAgICBhc3NlcnQuZXF1YWwoZ2V0SFNMKHsgaHVlOiAxODAsIHNhdHVyYXRpb24gfSksICdoc2woMTgwLCAxMDAlLCAzMCUpJyk7XG4gICAgYXNzZXJ0LmVxdWFsKGdldEhTTCh7IGh1ZTogMjQwLCBzYXR1cmF0aW9uIH0pLCAnaHNsKDI0MCwgMTAwJSwgNTAlKScpO1xuICAgIGFzc2VydC5lcXVhbChnZXRIU0woeyBodWU6IDMwMCwgc2F0dXJhdGlvbiB9KSwgJ2hzbCgzMDAsIDEwMCUsIDQwJSknKTtcbiAgICBhc3NlcnQuZXF1YWwoZ2V0SFNMKHsgaHVlOiAzNjAsIHNhdHVyYXRpb24gfSksICdoc2woMzYwLCAxMDAlLCA0NSUpJyk7XG4gIH0pO1xuXG4gIGl0KCdjYWxjdWxhdGVzIGxpZ2h0bmVzcyBiZXR3ZWVuIHZhbHVlcycsICgpID0+IHtcbiAgICBhc3NlcnQuZXF1YWwoZ2V0SFNMKHsgaHVlOiAyMTAsIHNhdHVyYXRpb246IDEwMCB9KSwgJ2hzbCgyMTAsIDEwMCUsIDQwJSknKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGtCQUF1QjtBQUV2QixvQkFBdUI7QUFFdkIsU0FBUyxVQUFVLE1BQU07QUFDdkIsS0FBRyxxQ0FBcUMsTUFBTTtBQUM1QyxVQUFNLGFBQWE7QUFDbkIsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxtQkFBbUI7QUFDaEUsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssSUFBSSxXQUFXLENBQUMsR0FBRyxvQkFBb0I7QUFDbEUsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssSUFBSSxXQUFXLENBQUMsR0FBRyxvQkFBb0I7QUFDbEUsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssS0FBSyxXQUFXLENBQUMsR0FBRyxxQkFBcUI7QUFDcEUsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssS0FBSyxXQUFXLENBQUMsR0FBRyxxQkFBcUI7QUFDcEUsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssS0FBSyxXQUFXLENBQUMsR0FBRyxxQkFBcUI7QUFDcEUsdUJBQU8sTUFBTSwwQkFBTyxFQUFFLEtBQUssS0FBSyxXQUFXLENBQUMsR0FBRyxxQkFBcUI7QUFBQSxFQUN0RSxDQUFDO0FBRUQsS0FBRyx1Q0FBdUMsTUFBTTtBQUM5Qyx1QkFBTyxNQUFNLDBCQUFPLEVBQUUsS0FBSyxLQUFLLFlBQVksSUFBSSxDQUFDLEdBQUcscUJBQXFCO0FBQUEsRUFDM0UsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
