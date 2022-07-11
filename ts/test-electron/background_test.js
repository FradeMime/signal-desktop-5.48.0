var import_chai = require("chai");
var import_background = require("../background");
describe("#isOverHourIntoPast", () => {
  it("returns false for now", () => {
    import_chai.assert.isFalse((0, import_background.isOverHourIntoPast)(Date.now()));
  });
  it("returns false for 5 minutes ago", () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1e3;
    import_chai.assert.isFalse((0, import_background.isOverHourIntoPast)(fiveMinutesAgo));
  });
  it("returns true for 65 minutes ago", () => {
    const sixtyFiveMinutesAgo = Date.now() - 65 * 60 * 1e3;
    import_chai.assert.isTrue((0, import_background.isOverHourIntoPast)(sixtyFiveMinutesAgo));
  });
});
describe("#cleanupSessionResets", () => {
  it("leaves empty object alone", () => {
    window.storage.put("sessionResets", {});
    (0, import_background.cleanupSessionResets)();
    const actual = window.storage.get("sessionResets");
    const expected = {};
    import_chai.assert.deepEqual(actual, expected);
  });
  it("filters out any timestamp older than one hour", () => {
    const startValue = {
      one: Date.now() - 1,
      two: Date.now(),
      three: Date.now() - 65 * 60 * 1e3
    };
    window.storage.put("sessionResets", startValue);
    (0, import_background.cleanupSessionResets)();
    const actual = window.storage.get("sessionResets");
    const expected = window._.pick(startValue, ["one", "two"]);
    import_chai.assert.deepEqual(actual, expected);
  });
  it("filters out falsey items", () => {
    const startValue = {
      one: 0,
      two: Date.now()
    };
    window.storage.put("sessionResets", startValue);
    (0, import_background.cleanupSessionResets)();
    const actual = window.storage.get("sessionResets");
    const expected = window._.pick(startValue, ["two"]);
    import_chai.assert.deepEqual(actual, expected);
    import_chai.assert.deepEqual(Object.keys(startValue), ["two"]);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmFja2dyb3VuZF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgeyBpc092ZXJIb3VySW50b1Bhc3QsIGNsZWFudXBTZXNzaW9uUmVzZXRzIH0gZnJvbSAnLi4vYmFja2dyb3VuZCc7XG5cbmRlc2NyaWJlKCcjaXNPdmVySG91ckludG9QYXN0JywgKCkgPT4ge1xuICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm93JywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzT3ZlckhvdXJJbnRvUGFzdChEYXRlLm5vdygpKSk7XG4gIH0pO1xuICBpdCgncmV0dXJucyBmYWxzZSBmb3IgNSBtaW51dGVzIGFnbycsICgpID0+IHtcbiAgICBjb25zdCBmaXZlTWludXRlc0FnbyA9IERhdGUubm93KCkgLSA1ICogNjAgKiAxMDAwO1xuICAgIGFzc2VydC5pc0ZhbHNlKGlzT3ZlckhvdXJJbnRvUGFzdChmaXZlTWludXRlc0FnbykpO1xuICB9KTtcbiAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgNjUgbWludXRlcyBhZ28nLCAoKSA9PiB7XG4gICAgY29uc3Qgc2l4dHlGaXZlTWludXRlc0FnbyA9IERhdGUubm93KCkgLSA2NSAqIDYwICogMTAwMDtcbiAgICBhc3NlcnQuaXNUcnVlKGlzT3ZlckhvdXJJbnRvUGFzdChzaXh0eUZpdmVNaW51dGVzQWdvKSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCcjY2xlYW51cFNlc3Npb25SZXNldHMnLCAoKSA9PiB7XG4gIGl0KCdsZWF2ZXMgZW1wdHkgb2JqZWN0IGFsb25lJywgKCkgPT4ge1xuICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgnc2Vzc2lvblJlc2V0cycsIHt9KTtcbiAgICBjbGVhbnVwU2Vzc2lvblJlc2V0cygpO1xuICAgIGNvbnN0IGFjdHVhbCA9IHdpbmRvdy5zdG9yYWdlLmdldCgnc2Vzc2lvblJlc2V0cycpO1xuXG4gICAgY29uc3QgZXhwZWN0ZWQgPSB7fTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICB9KTtcbiAgaXQoJ2ZpbHRlcnMgb3V0IGFueSB0aW1lc3RhbXAgb2xkZXIgdGhhbiBvbmUgaG91cicsICgpID0+IHtcbiAgICBjb25zdCBzdGFydFZhbHVlID0ge1xuICAgICAgb25lOiBEYXRlLm5vdygpIC0gMSxcbiAgICAgIHR3bzogRGF0ZS5ub3coKSxcbiAgICAgIHRocmVlOiBEYXRlLm5vdygpIC0gNjUgKiA2MCAqIDEwMDAsXG4gICAgfTtcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3Nlc3Npb25SZXNldHMnLCBzdGFydFZhbHVlKTtcbiAgICBjbGVhbnVwU2Vzc2lvblJlc2V0cygpO1xuICAgIGNvbnN0IGFjdHVhbCA9IHdpbmRvdy5zdG9yYWdlLmdldCgnc2Vzc2lvblJlc2V0cycpO1xuXG4gICAgY29uc3QgZXhwZWN0ZWQgPSB3aW5kb3cuXy5waWNrKHN0YXJ0VmFsdWUsIFsnb25lJywgJ3R3byddKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICB9KTtcbiAgaXQoJ2ZpbHRlcnMgb3V0IGZhbHNleSBpdGVtcycsICgpID0+IHtcbiAgICBjb25zdCBzdGFydFZhbHVlID0ge1xuICAgICAgb25lOiAwLFxuICAgICAgdHdvOiBEYXRlLm5vdygpLFxuICAgIH07XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdzZXNzaW9uUmVzZXRzJywgc3RhcnRWYWx1ZSk7XG4gICAgY2xlYW51cFNlc3Npb25SZXNldHMoKTtcbiAgICBjb25zdCBhY3R1YWwgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3Nlc3Npb25SZXNldHMnKTtcblxuICAgIGNvbnN0IGV4cGVjdGVkID0gd2luZG93Ll8ucGljayhzdGFydFZhbHVlLCBbJ3R3byddKTtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuXG4gICAgYXNzZXJ0LmRlZXBFcXVhbChPYmplY3Qua2V5cyhzdGFydFZhbHVlKSwgWyd0d28nXSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFFdkIsd0JBQXlEO0FBRXpELFNBQVMsdUJBQXVCLE1BQU07QUFDcEMsS0FBRyx5QkFBeUIsTUFBTTtBQUNoQyx1QkFBTyxRQUFRLDBDQUFtQixLQUFLLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDL0MsQ0FBQztBQUNELEtBQUcsbUNBQW1DLE1BQU07QUFDMUMsVUFBTSxpQkFBaUIsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLO0FBQzdDLHVCQUFPLFFBQVEsMENBQW1CLGNBQWMsQ0FBQztBQUFBLEVBQ25ELENBQUM7QUFDRCxLQUFHLG1DQUFtQyxNQUFNO0FBQzFDLFVBQU0sc0JBQXNCLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSztBQUNuRCx1QkFBTyxPQUFPLDBDQUFtQixtQkFBbUIsQ0FBQztBQUFBLEVBQ3ZELENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyx5QkFBeUIsTUFBTTtBQUN0QyxLQUFHLDZCQUE2QixNQUFNO0FBQ3BDLFdBQU8sUUFBUSxJQUFJLGlCQUFpQixDQUFDLENBQUM7QUFDdEMsZ0RBQXFCO0FBQ3JCLFVBQU0sU0FBUyxPQUFPLFFBQVEsSUFBSSxlQUFlO0FBRWpELFVBQU0sV0FBVyxDQUFDO0FBQ2xCLHVCQUFPLFVBQVUsUUFBUSxRQUFRO0FBQUEsRUFDbkMsQ0FBQztBQUNELEtBQUcsaURBQWlELE1BQU07QUFDeEQsVUFBTSxhQUFhO0FBQUEsTUFDakIsS0FBSyxLQUFLLElBQUksSUFBSTtBQUFBLE1BQ2xCLEtBQUssS0FBSyxJQUFJO0FBQUEsTUFDZCxPQUFPLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSztBQUFBLElBQ2hDO0FBQ0EsV0FBTyxRQUFRLElBQUksaUJBQWlCLFVBQVU7QUFDOUMsZ0RBQXFCO0FBQ3JCLFVBQU0sU0FBUyxPQUFPLFFBQVEsSUFBSSxlQUFlO0FBRWpELFVBQU0sV0FBVyxPQUFPLEVBQUUsS0FBSyxZQUFZLENBQUMsT0FBTyxLQUFLLENBQUM7QUFDekQsdUJBQU8sVUFBVSxRQUFRLFFBQVE7QUFBQSxFQUNuQyxDQUFDO0FBQ0QsS0FBRyw0QkFBNEIsTUFBTTtBQUNuQyxVQUFNLGFBQWE7QUFBQSxNQUNqQixLQUFLO0FBQUEsTUFDTCxLQUFLLEtBQUssSUFBSTtBQUFBLElBQ2hCO0FBQ0EsV0FBTyxRQUFRLElBQUksaUJBQWlCLFVBQVU7QUFDOUMsZ0RBQXFCO0FBQ3JCLFVBQU0sU0FBUyxPQUFPLFFBQVEsSUFBSSxlQUFlO0FBRWpELFVBQU0sV0FBVyxPQUFPLEVBQUUsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUFDO0FBQ2xELHVCQUFPLFVBQVUsUUFBUSxRQUFRO0FBRWpDLHVCQUFPLFVBQVUsT0FBTyxLQUFLLFVBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUFBLEVBQ25ELENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
