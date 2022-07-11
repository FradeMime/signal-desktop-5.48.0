var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_getOwn = require("../../util/getOwn");
describe("getOwn", () => {
  class Person {
    constructor(birthYear) {
      this.birthYear = birthYear;
    }
    getAge() {
      return new Date().getFullYear() - this.birthYear;
    }
  }
  it("returns undefined when asking for a non-existent property", () => {
    const obj = { bar: 123 };
    import_chai.assert.isUndefined((0, import_getOwn.getOwn)(obj, "foo"));
  });
  it("returns undefined when asking for a non-own property", () => {
    const obj = { bar: 123 };
    import_chai.assert.isUndefined((0, import_getOwn.getOwn)(obj, "hasOwnProperty"));
    const person = new Person(1880);
    import_chai.assert.isUndefined((0, import_getOwn.getOwn)(person, "getAge"));
  });
  it("returns own properties", () => {
    const obj = { foo: 123 };
    import_chai.assert.strictEqual((0, import_getOwn.getOwn)(obj, "foo"), 123);
    const person = new Person(1880);
    import_chai.assert.strictEqual((0, import_getOwn.getOwn)(person, "birthYear"), 1880);
  });
  it("works even if `hasOwnProperty` has been overridden for the object", () => {
    const obj = {
      foo: 123,
      hasOwnProperty: () => true
    };
    import_chai.assert.strictEqual((0, import_getOwn.getOwn)(obj, "foo"), 123);
    import_chai.assert.isUndefined((0, import_getOwn.getOwn)(obj, "bar"));
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0T3duX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0T3duJztcblxuZGVzY3JpYmUoJ2dldE93bicsICgpID0+IHtcbiAgY2xhc3MgUGVyc29uIHtcbiAgICBwdWJsaWMgYmlydGhZZWFyOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihiaXJ0aFllYXI6IG51bWJlcikge1xuICAgICAgdGhpcy5iaXJ0aFllYXIgPSBiaXJ0aFllYXI7XG4gICAgfVxuXG4gICAgZ2V0QWdlKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAtIHRoaXMuYmlydGhZZWFyO1xuICAgIH1cbiAgfVxuXG4gIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCB3aGVuIGFza2luZyBmb3IgYSBub24tZXhpc3RlbnQgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgY29uc3Qgb2JqOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0geyBiYXI6IDEyMyB9O1xuICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRPd24ob2JqLCAnZm9vJykpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB1bmRlZmluZWQgd2hlbiBhc2tpbmcgZm9yIGEgbm9uLW93biBwcm9wZXJ0eScsICgpID0+IHtcbiAgICBjb25zdCBvYmo6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7IGJhcjogMTIzIH07XG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGdldE93bihvYmosICdoYXNPd25Qcm9wZXJ0eScpKTtcblxuICAgIGNvbnN0IHBlcnNvbiA9IG5ldyBQZXJzb24oMTg4MCk7XG4gICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGdldE93bihwZXJzb24sICdnZXRBZ2UnKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIG93biBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgIGNvbnN0IG9iajogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHsgZm9vOiAxMjMgfTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0T3duKG9iaiwgJ2ZvbycpLCAxMjMpO1xuXG4gICAgY29uc3QgcGVyc29uID0gbmV3IFBlcnNvbigxODgwKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0T3duKHBlcnNvbiwgJ2JpcnRoWWVhcicpLCAxODgwKTtcbiAgfSk7XG5cbiAgaXQoJ3dvcmtzIGV2ZW4gaWYgYGhhc093blByb3BlcnR5YCBoYXMgYmVlbiBvdmVycmlkZGVuIGZvciB0aGUgb2JqZWN0JywgKCkgPT4ge1xuICAgIGNvbnN0IG9iajogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XG4gICAgICBmb286IDEyMyxcbiAgICAgIGhhc093blByb3BlcnR5OiAoKSA9PiB0cnVlLFxuICAgIH07XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGdldE93bihvYmosICdmb28nKSwgMTIzKTtcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQoZ2V0T3duKG9iaiwgJ2JhcicpKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBR0Esa0JBQXVCO0FBRXZCLG9CQUF1QjtBQUV2QixTQUFTLFVBQVUsTUFBTTtBQUN2QixRQUFNLE9BQU87QUFBQSxJQUdYLFlBQVksV0FBbUI7QUFDN0IsV0FBSyxZQUFZO0FBQUEsSUFDbkI7QUFBQSxJQUVBLFNBQVM7QUFDUCxhQUFPLElBQUksS0FBSyxFQUFFLFlBQVksSUFBSSxLQUFLO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBVkEsQUFZQSxLQUFHLDZEQUE2RCxNQUFNO0FBQ3BFLFVBQU0sTUFBOEIsRUFBRSxLQUFLLElBQUk7QUFDL0MsdUJBQU8sWUFBWSwwQkFBTyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQ3ZDLENBQUM7QUFFRCxLQUFHLHdEQUF3RCxNQUFNO0FBQy9ELFVBQU0sTUFBOEIsRUFBRSxLQUFLLElBQUk7QUFDL0MsdUJBQU8sWUFBWSwwQkFBTyxLQUFLLGdCQUFnQixDQUFDO0FBRWhELFVBQU0sU0FBUyxJQUFJLE9BQU8sSUFBSTtBQUM5Qix1QkFBTyxZQUFZLDBCQUFPLFFBQVEsUUFBUSxDQUFDO0FBQUEsRUFDN0MsQ0FBQztBQUVELEtBQUcsMEJBQTBCLE1BQU07QUFDakMsVUFBTSxNQUE4QixFQUFFLEtBQUssSUFBSTtBQUMvQyx1QkFBTyxZQUFZLDBCQUFPLEtBQUssS0FBSyxHQUFHLEdBQUc7QUFFMUMsVUFBTSxTQUFTLElBQUksT0FBTyxJQUFJO0FBQzlCLHVCQUFPLFlBQVksMEJBQU8sUUFBUSxXQUFXLEdBQUcsSUFBSTtBQUFBLEVBQ3RELENBQUM7QUFFRCxLQUFHLHFFQUFxRSxNQUFNO0FBQzVFLFVBQU0sTUFBK0I7QUFBQSxNQUNuQyxLQUFLO0FBQUEsTUFDTCxnQkFBZ0IsTUFBTTtBQUFBLElBQ3hCO0FBQ0EsdUJBQU8sWUFBWSwwQkFBTyxLQUFLLEtBQUssR0FBRyxHQUFHO0FBQzFDLHVCQUFPLFlBQVksMEJBQU8sS0FBSyxLQUFLLENBQUM7QUFBQSxFQUN2QyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
