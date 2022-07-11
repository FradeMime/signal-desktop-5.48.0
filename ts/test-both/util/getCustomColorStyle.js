var import_chai = require("chai");
var import_getCustomColorStyle = require("../../util/getCustomColorStyle");
describe("getCustomColorStyle", () => {
  it("returns undefined if no color passed in", () => {
    import_chai.assert.isUndefined((0, import_getCustomColorStyle.getCustomColorStyle)());
  });
  it("returns backgroundColor for solid colors", () => {
    const color = {
      start: {
        hue: 90,
        saturation: 100
      }
    };
    import_chai.assert.deepEqual((0, import_getCustomColorStyle.getCustomColorStyle)(color), {
      backgroundColor: "hsl(90, 100%, 30%)"
    });
  });
  it("returns backgroundImage with linear-gradient for gradients", () => {
    const color = {
      start: {
        hue: 90,
        saturation: 100
      },
      end: {
        hue: 180,
        saturation: 50
      },
      deg: 270
    };
    import_chai.assert.deepEqual((0, import_getCustomColorStyle.getCustomColorStyle)(color), {
      backgroundImage: "linear-gradient(0deg, hsl(90, 100%, 30%), hsl(180, 50%, 30%))"
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q3VzdG9tQ29sb3JTdHlsZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgZ2V0Q3VzdG9tQ29sb3JTdHlsZSB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0Q3VzdG9tQ29sb3JTdHlsZSc7XG5cbmRlc2NyaWJlKCdnZXRDdXN0b21Db2xvclN0eWxlJywgKCkgPT4ge1xuICBpdCgncmV0dXJucyB1bmRlZmluZWQgaWYgbm8gY29sb3IgcGFzc2VkIGluJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRDdXN0b21Db2xvclN0eWxlKCkpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBiYWNrZ3JvdW5kQ29sb3IgZm9yIHNvbGlkIGNvbG9ycycsICgpID0+IHtcbiAgICBjb25zdCBjb2xvciA9IHtcbiAgICAgIHN0YXJ0OiB7XG4gICAgICAgIGh1ZTogOTAsXG4gICAgICAgIHNhdHVyYXRpb246IDEwMCxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoZ2V0Q3VzdG9tQ29sb3JTdHlsZShjb2xvciksIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2hzbCg5MCwgMTAwJSwgMzAlKScsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGJhY2tncm91bmRJbWFnZSB3aXRoIGxpbmVhci1ncmFkaWVudCBmb3IgZ3JhZGllbnRzJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbG9yID0ge1xuICAgICAgc3RhcnQ6IHtcbiAgICAgICAgaHVlOiA5MCxcbiAgICAgICAgc2F0dXJhdGlvbjogMTAwLFxuICAgICAgfSxcbiAgICAgIGVuZDoge1xuICAgICAgICBodWU6IDE4MCxcbiAgICAgICAgc2F0dXJhdGlvbjogNTAsXG4gICAgICB9LFxuICAgICAgZGVnOiAyNzAsXG4gICAgfTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoZ2V0Q3VzdG9tQ29sb3JTdHlsZShjb2xvciksIHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTpcbiAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgwZGVnLCBoc2woOTAsIDEwMCUsIDMwJSksIGhzbCgxODAsIDUwJSwgMzAlKSknLFxuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLGlDQUFvQztBQUVwQyxTQUFTLHVCQUF1QixNQUFNO0FBQ3BDLEtBQUcsMkNBQTJDLE1BQU07QUFDbEQsdUJBQU8sWUFBWSxvREFBb0IsQ0FBQztBQUFBLEVBQzFDLENBQUM7QUFFRCxLQUFHLDRDQUE0QyxNQUFNO0FBQ25ELFVBQU0sUUFBUTtBQUFBLE1BQ1osT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBRUEsdUJBQU8sVUFBVSxvREFBb0IsS0FBSyxHQUFHO0FBQUEsTUFDM0MsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELEtBQUcsOERBQThELE1BQU07QUFDckUsVUFBTSxRQUFRO0FBQUEsTUFDWixPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBQ0gsS0FBSztBQUFBLFFBQ0wsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLEtBQUs7QUFBQSxJQUNQO0FBRUEsdUJBQU8sVUFBVSxvREFBb0IsS0FBSyxHQUFHO0FBQUEsTUFDM0MsaUJBQ0U7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNILENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
