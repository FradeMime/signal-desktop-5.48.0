var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_license_comments = require("../util/lint/license_comments");
describe("license comments", () => {
  it("includes a license comment at the top of every relevant file", async function test() {
    this.timeout(1e4);
    await (0, import_license_comments.forEachRelevantFile)(async (file) => {
      let firstLine;
      let secondLine;
      if ((0, import_license_comments.getExtension)(file) === ".sh") {
        const firstThreeLines = await (0, import_license_comments.readFirstLines)(file, 3);
        [, firstLine, secondLine] = firstThreeLines;
      } else {
        [firstLine, secondLine] = await (0, import_license_comments.readFirstLines)(file, 2);
      }
      if (!firstLine || !secondLine) {
        throw new Error(`file ${file}: was missing a first or second line!`);
      }
      const { groups = {} } = firstLine.match(/Copyright (?<startYearWithDash>\d{4}-)?(?<endYearString>\d{4}) Signal Messenger, LLC/) || [];
      const { startYearWithDash, endYearString } = groups;
      const endYear = Number(endYearString);
      import_chai.assert.isAtLeast(endYear, 2020, `First line of ${file} is missing correct license header comment`);
      if (startYearWithDash) {
        const startYear = Number(startYearWithDash.slice(0, -1));
        import_chai.assert.isBelow(startYear, endYear, `Starting license year of ${file} is not below the ending year`);
      }
      import_chai.assert.include(secondLine, "SPDX-License-Identifier: AGPL-3.0-only", `Second line of ${file} is missing correct license header comment`);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGljZW5zZV9jb21tZW50c190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLy8gVGhpcyBmaWxlIGlzIG1lYW50IHRvIGJlIHJ1biBmcmVxdWVudGx5LCBzbyBpdCBkb2Vzbid0IGNoZWNrIHRoZSBsaWNlbnNlIHllYXIuIFNlZSB0aGVcbi8vIGltcG9ydGVkIGBsaWNlbnNlX2NvbW1lbnRzYCBmaWxlIGZvciBhIGpvYiB0aGF0IGRvZXMgdGhpcywgdG8gYmUgcnVuIG9uIENJLlxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHtcbiAgZm9yRWFjaFJlbGV2YW50RmlsZSxcbiAgZ2V0RXh0ZW5zaW9uLFxuICByZWFkRmlyc3RMaW5lcyxcbn0gZnJvbSAnLi4vdXRpbC9saW50L2xpY2Vuc2VfY29tbWVudHMnO1xuXG5kZXNjcmliZSgnbGljZW5zZSBjb21tZW50cycsICgpID0+IHtcbiAgaXQoJ2luY2x1ZGVzIGEgbGljZW5zZSBjb21tZW50IGF0IHRoZSB0b3Agb2YgZXZlcnkgcmVsZXZhbnQgZmlsZScsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgLy8gVGhpcyB1c3VhbGx5IGV4ZWN1dGVzIHF1aWNrbHkgYnV0IGNhbiBiZSBzbG93IGluIHNvbWUgY2FzZXMsIHN1Y2ggYXMgV2luZG93cyBDSS5cbiAgICB0aGlzLnRpbWVvdXQoMTAwMDApO1xuXG4gICAgYXdhaXQgZm9yRWFjaFJlbGV2YW50RmlsZShhc3luYyBmaWxlID0+IHtcbiAgICAgIGxldCBmaXJzdExpbmU6IHN0cmluZztcbiAgICAgIGxldCBzZWNvbmRMaW5lOiBzdHJpbmc7XG5cbiAgICAgIGlmIChnZXRFeHRlbnNpb24oZmlsZSkgPT09ICcuc2gnKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0VGhyZWVMaW5lcyA9IGF3YWl0IHJlYWRGaXJzdExpbmVzKGZpbGUsIDMpO1xuICAgICAgICBbLCBmaXJzdExpbmUsIHNlY29uZExpbmVdID0gZmlyc3RUaHJlZUxpbmVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW2ZpcnN0TGluZSwgc2Vjb25kTGluZV0gPSBhd2FpdCByZWFkRmlyc3RMaW5lcyhmaWxlLCAyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmaXJzdExpbmUgfHwgIXNlY29uZExpbmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmaWxlICR7ZmlsZX06IHdhcyBtaXNzaW5nIGEgZmlyc3Qgb3Igc2Vjb25kIGxpbmUhYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZ3JvdXBzID0ge30gfSA9XG4gICAgICAgIGZpcnN0TGluZS5tYXRjaChcbiAgICAgICAgICAvQ29weXJpZ2h0ICg/PHN0YXJ0WWVhcldpdGhEYXNoPlxcZHs0fS0pPyg/PGVuZFllYXJTdHJpbmc+XFxkezR9KSBTaWduYWwgTWVzc2VuZ2VyLCBMTEMvXG4gICAgICAgICkgfHwgW107XG4gICAgICBjb25zdCB7IHN0YXJ0WWVhcldpdGhEYXNoLCBlbmRZZWFyU3RyaW5nIH0gPSBncm91cHM7XG4gICAgICBjb25zdCBlbmRZZWFyID0gTnVtYmVyKGVuZFllYXJTdHJpbmcpO1xuXG4gICAgICAvLyBXZSBhZGRlZCB0aGVzZSBjb21tZW50cyBpbiAyMDIwLlxuICAgICAgYXNzZXJ0LmlzQXRMZWFzdChcbiAgICAgICAgZW5kWWVhcixcbiAgICAgICAgMjAyMCxcbiAgICAgICAgYEZpcnN0IGxpbmUgb2YgJHtmaWxlfSBpcyBtaXNzaW5nIGNvcnJlY3QgbGljZW5zZSBoZWFkZXIgY29tbWVudGBcbiAgICAgICk7XG5cbiAgICAgIGlmIChzdGFydFllYXJXaXRoRGFzaCkge1xuICAgICAgICBjb25zdCBzdGFydFllYXIgPSBOdW1iZXIoc3RhcnRZZWFyV2l0aERhc2guc2xpY2UoMCwgLTEpKTtcbiAgICAgICAgYXNzZXJ0LmlzQmVsb3coXG4gICAgICAgICAgc3RhcnRZZWFyLFxuICAgICAgICAgIGVuZFllYXIsXG4gICAgICAgICAgYFN0YXJ0aW5nIGxpY2Vuc2UgeWVhciBvZiAke2ZpbGV9IGlzIG5vdCBiZWxvdyB0aGUgZW5kaW5nIHllYXJgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGFzc2VydC5pbmNsdWRlKFxuICAgICAgICBzZWNvbmRMaW5lLFxuICAgICAgICAnU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHknLFxuICAgICAgICBgU2Vjb25kIGxpbmUgb2YgJHtmaWxlfSBpcyBtaXNzaW5nIGNvcnJlY3QgbGljZW5zZSBoZWFkZXIgY29tbWVudGBcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQU1BLGtCQUF1QjtBQUV2Qiw4QkFJTztBQUVQLFNBQVMsb0JBQW9CLE1BQU07QUFDakMsS0FBRyxnRUFBZ0Usc0JBQXNCO0FBRXZGLFNBQUssUUFBUSxHQUFLO0FBRWxCLFVBQU0saURBQW9CLE9BQU0sU0FBUTtBQUN0QyxVQUFJO0FBQ0osVUFBSTtBQUVKLFVBQUksMENBQWEsSUFBSSxNQUFNLE9BQU87QUFDaEMsY0FBTSxrQkFBa0IsTUFBTSw0Q0FBZSxNQUFNLENBQUM7QUFDcEQsU0FBQyxFQUFFLFdBQVcsVUFBVSxJQUFJO0FBQUEsTUFDOUIsT0FBTztBQUNMLFNBQUMsV0FBVyxVQUFVLElBQUksTUFBTSw0Q0FBZSxNQUFNLENBQUM7QUFBQSxNQUN4RDtBQUVBLFVBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTtBQUM3QixjQUFNLElBQUksTUFBTSxRQUFRLDJDQUEyQztBQUFBLE1BQ3JFO0FBRUEsWUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUNoQixVQUFVLE1BQ1Isc0ZBQ0YsS0FBSyxDQUFDO0FBQ1IsWUFBTSxFQUFFLG1CQUFtQixrQkFBa0I7QUFDN0MsWUFBTSxVQUFVLE9BQU8sYUFBYTtBQUdwQyx5QkFBTyxVQUNMLFNBQ0EsTUFDQSxpQkFBaUIsZ0RBQ25CO0FBRUEsVUFBSSxtQkFBbUI7QUFDckIsY0FBTSxZQUFZLE9BQU8sa0JBQWtCLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdkQsMkJBQU8sUUFDTCxXQUNBLFNBQ0EsNEJBQTRCLG1DQUM5QjtBQUFBLE1BQ0Y7QUFFQSx5QkFBTyxRQUNMLFlBQ0EsMENBQ0Esa0JBQWtCLGdEQUNwQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
