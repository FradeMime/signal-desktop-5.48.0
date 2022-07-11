var import_chai = require("chai");
var import_deconstructLookup = require("../../util/deconstructLookup");
describe("deconstructLookup", () => {
  it("looks up an array of properties in a lookup", () => {
    const lookup = {
      high: 5,
      seven: 89,
      big: 999
    };
    const keys = ["seven", "high"];
    import_chai.assert.deepEqual((0, import_deconstructLookup.deconstructLookup)(lookup, keys), [89, 5]);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVjb25zdHJ1Y3RMb29rdXBfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHsgZGVjb25zdHJ1Y3RMb29rdXAgfSBmcm9tICcuLi8uLi91dGlsL2RlY29uc3RydWN0TG9va3VwJztcblxuZGVzY3JpYmUoJ2RlY29uc3RydWN0TG9va3VwJywgKCkgPT4ge1xuICBpdCgnbG9va3MgdXAgYW4gYXJyYXkgb2YgcHJvcGVydGllcyBpbiBhIGxvb2t1cCcsICgpID0+IHtcbiAgICBjb25zdCBsb29rdXAgPSB7XG4gICAgICBoaWdoOiA1LFxuICAgICAgc2V2ZW46IDg5LFxuICAgICAgYmlnOiA5OTksXG4gICAgfTtcbiAgICBjb25zdCBrZXlzID0gWydzZXZlbicsICdoaWdoJ107XG5cbiAgICBhc3NlcnQuZGVlcEVxdWFsKGRlY29uc3RydWN0TG9va3VwKGxvb2t1cCwga2V5cyksIFs4OSwgNV0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBRXZCLCtCQUFrQztBQUVsQyxTQUFTLHFCQUFxQixNQUFNO0FBQ2xDLEtBQUcsK0NBQStDLE1BQU07QUFDdEQsVUFBTSxTQUFTO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsSUFDUDtBQUNBLFVBQU0sT0FBTyxDQUFDLFNBQVMsTUFBTTtBQUU3Qix1QkFBTyxVQUFVLGdEQUFrQixRQUFRLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDM0QsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
