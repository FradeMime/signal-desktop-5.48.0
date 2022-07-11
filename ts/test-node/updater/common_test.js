var import_chai = require("chai");
var import_fs_extra = require("fs-extra");
var import_promises = require("fs/promises");
var import_path = require("path");
var import_common = require("../../updater/common");
describe("updater/signatures", () => {
  const windows = (0, import_common.parseYaml)(`version: 1.23.2
files:
  - url: signal-desktop-win-1.23.2.exe
    sha512: hhK+cVAb+QOK/Ln0RBcq8Rb1iPcUC0KZeT4NwLB25PMGoPmakY27XE1bXq4QlkASJN1EkYTbKf3oUJtcllziyQ==
    size: 92020776
path: signal-desktop-win-1.23.2.exe
sha512: hhK+cVAb+QOK/Ln0RBcq8Rb1iPcUC0KZeT4NwLB25PMGoPmakY27XE1bXq4QlkASJN1EkYTbKf3oUJtcllziyQ==
releaseDate: '2019-03-29T16:58:08.210Z'
`);
  const mac = (0, import_common.parseYaml)(`version: 1.23.2
files:
  - url: signal-desktop-mac-x64-1.23.2.zip
    sha512: STurwHhpE2rwwpwz3/RQBbMbVYY2Hh1DVpeofwIWPXoDTX/41zia+ByKXq8BvnjIMdQ3YmPHu+UppAW/+CFkFQ==
    size: 150317727
  - url: signal-desktop-mac-arm64-1.23.2.zip
    sha512: PGFqCtiFep27rJcE3s8J2BAH9GQIRg460J0IVwbUCQERLZlN8YP71B1xWW09gCmA5YeEY4oDynqBLmgQfEFtfw==
    size: 148022367
  - url: signal-desktop-mac-x64-1.23.2.dmg
    sha512: xbX5QDyzdvQd6rVzpamRLfWu+oIbhlW9pLbpKywQSiEx6BPZHTYCulBx9V5zrKh7TNM9nRpZJ3Sph2bU3v+5uQ==
    size: 154866781
  - url: signal-desktop-mac-arm64-1.23.2.dmg
    sha512: 7wgGWCogQ9OWMGnqEUmiSeRct3w60zyzYp5cIUvJIVFe8WoB/qS7n721n+xCsrdteclR6yu1cqkOh/xN/wgS0Q==
    size: 152618547
path: signal-desktop-mac-x64-1.23.2.zip
sha512: STurwHhpE2rwwpwz3/RQBbMbVYY2Hh1DVpeofwIWPXoDTX/41zia+ByKXq8BvnjIMdQ3YmPHu+UppAW/+CFkFQ==
releaseDate: '2021-12-03T19:00:23.754Z'
`);
  const windowsBeta = (0, import_common.parseYaml)(`version: 1.23.2-beta.1
files:
  - url: signal-desktop-beta-win-1.23.2-beta.1.exe
    sha512: ZHM1F3y/Y6ulP5NhbFuh7t2ZCpY4lD9BeBhPV+g2B/0p/66kp0MJDeVxTgjR49OakwpMAafA1d6y2QBail4hSQ==
    size: 92028656
path: signal-desktop-beta-win-1.23.2-beta.1.exe
sha512: ZHM1F3y/Y6ulP5NhbFuh7t2ZCpY4lD9BeBhPV+g2B/0p/66kp0MJDeVxTgjR49OakwpMAafA1d6y2QBail4hSQ==
releaseDate: '2019-03-29T01:56:00.544Z'
`);
  const macBeta = (0, import_common.parseYaml)(`version: 1.23.2-beta.1
files:
  - url: signal-desktop-mac-x64-1.23.2-beta.1.zip
    sha512: STurwHhpE2rwwpwz3/RQBbMbVYY2Hh1DVpeofwIWPXoDTX/41zia+ByKXq8BvnjIMdQ3YmPHu+UppAW/+CFkFQ==
    size: 150317727
  - url: signal-desktop-mac-arm64-1.23.2-beta.1.zip
    sha512: PGFqCtiFep27rJcE3s8J2BAH9GQIRg460J0IVwbUCQERLZlN8YP71B1xWW09gCmA5YeEY4oDynqBLmgQfEFtfw==
    size: 148022367
  - url: signal-desktop-mac-x64-1.23.2-beta.1.dmg
    sha512: xbX5QDyzdvQd6rVzpamRLfWu+oIbhlW9pLbpKywQSiEx6BPZHTYCulBx9V5zrKh7TNM9nRpZJ3Sph2bU3v+5uQ==
    size: 154866781
  - url: signal-desktop-mac-arm64-1.23.2-beta.1.dmg
    sha512: 7wgGWCogQ9OWMGnqEUmiSeRct3w60zyzYp5cIUvJIVFe8WoB/qS7n721n+xCsrdteclR6yu1cqkOh/xN/wgS0Q==
    size: 152618547
path: signal-desktop-mac-x64-1.23.2-beta.1.zip
sha512: STurwHhpE2rwwpwz3/RQBbMbVYY2Hh1DVpeofwIWPXoDTX/41zia+ByKXq8BvnjIMdQ3YmPHu+UppAW/+CFkFQ==
releaseDate: '2021-12-03T19:00:23.754Z'
`);
  describe("#getVersion", () => {
    it("successfully gets version", () => {
      const expected = "1.23.2";
      import_chai.assert.strictEqual((0, import_common.getVersion)(windows), expected);
      import_chai.assert.strictEqual((0, import_common.getVersion)(mac), expected);
      const expectedBeta = "1.23.2-beta.1";
      import_chai.assert.strictEqual((0, import_common.getVersion)(windowsBeta), expectedBeta);
      import_chai.assert.strictEqual((0, import_common.getVersion)(macBeta), expectedBeta);
    });
  });
  describe("#getUpdateFileName", () => {
    it("successfully gets version", () => {
      import_chai.assert.strictEqual((0, import_common.getUpdateFileName)(windows, "win32", "x64"), "signal-desktop-win-1.23.2.exe");
      import_chai.assert.strictEqual((0, import_common.getUpdateFileName)(mac, "darwin", "x64"), "signal-desktop-mac-x64-1.23.2.zip");
      import_chai.assert.strictEqual((0, import_common.getUpdateFileName)(mac, "darwin", "arm64"), "signal-desktop-mac-arm64-1.23.2.zip");
      import_chai.assert.strictEqual((0, import_common.getUpdateFileName)(windowsBeta, "win32", "x64"), "signal-desktop-beta-win-1.23.2-beta.1.exe");
      import_chai.assert.strictEqual((0, import_common.getUpdateFileName)(macBeta, "darwin", "x64"), "signal-desktop-mac-x64-1.23.2-beta.1.zip");
      import_chai.assert.strictEqual((0, import_common.getUpdateFileName)(macBeta, "darwin", "arm64"), "signal-desktop-mac-arm64-1.23.2-beta.1.zip");
    });
  });
  describe("#isUpdateFileNameValid", () => {
    it("returns true for normal filenames", () => {
      import_chai.assert.strictEqual((0, import_common.isUpdateFileNameValid)("signal-desktop-win-1.23.2.exe"), true);
      import_chai.assert.strictEqual((0, import_common.isUpdateFileNameValid)("signal-desktop-mac-x64-1.23.2-beta.1.zip"), true);
    });
    it("returns false for problematic names", () => {
      import_chai.assert.strictEqual((0, import_common.isUpdateFileNameValid)("../signal-desktop-win-1.23.2.exe"), false);
      import_chai.assert.strictEqual((0, import_common.isUpdateFileNameValid)("%signal-desktop-mac-x64-1.23.2-beta.1.zip"), false);
      import_chai.assert.strictEqual((0, import_common.isUpdateFileNameValid)("@signal-desktop-mac-x64-1.23.2-beta.1.zip"), false);
    });
  });
  describe("#validatePath", () => {
    it("succeeds for simple children", async () => {
      const base = await (0, import_common.createUpdateCacheDirIfNeeded)();
      (0, import_common.validatePath)(base, `${base}/child`);
      (0, import_common.validatePath)(base, `${base}/child/grandchild`);
    });
    it("returns false for problematic names", async () => {
      const base = await (0, import_common.createUpdateCacheDirIfNeeded)();
      import_chai.assert.throws(() => {
        (0, import_common.validatePath)(base, `${base}/../child`);
      });
      import_chai.assert.throws(() => {
        (0, import_common.validatePath)(base, "/root");
      });
    });
  });
  describe("createTempDir", () => {
    it("creates a temporary directory", async () => {
      const dir = await (0, import_common.createTempDir)();
      import_chai.assert.isTrue((await (0, import_promises.stat)(dir)).isDirectory());
      await (0, import_common.deleteTempDir)(dir);
      import_chai.assert.isFalse(await (0, import_fs_extra.pathExists)(dir), "Directory should be deleted");
    });
  });
  describe("getTempDir", () => {
    it("reserves a temporary directory", async () => {
      const dir = await (0, import_common.getTempDir)();
      import_chai.assert.isTrue((await (0, import_promises.stat)((0, import_path.join)(dir, ".."))).isDirectory(), "Parent folder should exist");
      import_chai.assert.isFalse(await (0, import_fs_extra.pathExists)(dir), "Reserved folder should not exist");
      await (0, import_promises.mkdir)(dir);
      await (0, import_common.deleteTempDir)(dir);
      import_chai.assert.isFalse(await (0, import_fs_extra.pathExists)(dir), "Directory should be deleted");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29tbW9uX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IHBhdGhFeGlzdHMgfSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgeyBzdGF0LCBta2RpciB9IGZyb20gJ2ZzL3Byb21pc2VzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlVXBkYXRlQ2FjaGVEaXJJZk5lZWRlZCxcbiAgZ2V0VXBkYXRlRmlsZU5hbWUsXG4gIGdldFZlcnNpb24sXG4gIGlzVXBkYXRlRmlsZU5hbWVWYWxpZCxcbiAgdmFsaWRhdGVQYXRoLFxuICBwYXJzZVlhbWwsXG4gIGNyZWF0ZVRlbXBEaXIsXG4gIGdldFRlbXBEaXIsXG4gIGRlbGV0ZVRlbXBEaXIsXG59IGZyb20gJy4uLy4uL3VwZGF0ZXIvY29tbW9uJztcblxuZGVzY3JpYmUoJ3VwZGF0ZXIvc2lnbmF0dXJlcycsICgpID0+IHtcbiAgY29uc3Qgd2luZG93cyA9IHBhcnNlWWFtbChgdmVyc2lvbjogMS4yMy4yXG5maWxlczpcbiAgLSB1cmw6IHNpZ25hbC1kZXNrdG9wLXdpbi0xLjIzLjIuZXhlXG4gICAgc2hhNTEyOiBoaEsrY1ZBYitRT0svTG4wUkJjcThSYjFpUGNVQzBLWmVUNE53TEIyNVBNR29QbWFrWTI3WEUxYlhxNFFsa0FTSk4xRWtZVGJLZjNvVUp0Y2xseml5UT09XG4gICAgc2l6ZTogOTIwMjA3NzZcbnBhdGg6IHNpZ25hbC1kZXNrdG9wLXdpbi0xLjIzLjIuZXhlXG5zaGE1MTI6IGhoSytjVkFiK1FPSy9MbjBSQmNxOFJiMWlQY1VDMEtaZVQ0TndMQjI1UE1Hb1BtYWtZMjdYRTFiWHE0UWxrQVNKTjFFa1lUYktmM29VSnRjbGx6aXlRPT1cbnJlbGVhc2VEYXRlOiAnMjAxOS0wMy0yOVQxNjo1ODowOC4yMTBaJ1xuYCk7XG4gIGNvbnN0IG1hYyA9IHBhcnNlWWFtbChgdmVyc2lvbjogMS4yMy4yXG5maWxlczpcbiAgLSB1cmw6IHNpZ25hbC1kZXNrdG9wLW1hYy14NjQtMS4yMy4yLnppcFxuICAgIHNoYTUxMjogU1R1cndIaHBFMnJ3d3B3ejMvUlFCYk1iVllZMkhoMURWcGVvZndJV1BYb0RUWC80MXppYStCeUtYcThCdm5qSU1kUTNZbVBIdStVcHBBVy8rQ0ZrRlE9PVxuICAgIHNpemU6IDE1MDMxNzcyN1xuICAtIHVybDogc2lnbmFsLWRlc2t0b3AtbWFjLWFybTY0LTEuMjMuMi56aXBcbiAgICBzaGE1MTI6IFBHRnFDdGlGZXAyN3JKY0UzczhKMkJBSDlHUUlSZzQ2MEowSVZ3YlVDUUVSTFpsTjhZUDcxQjF4V1cwOWdDbUE1WWVFWTRvRHlucUJMbWdRZkVGdGZ3PT1cbiAgICBzaXplOiAxNDgwMjIzNjdcbiAgLSB1cmw6IHNpZ25hbC1kZXNrdG9wLW1hYy14NjQtMS4yMy4yLmRtZ1xuICAgIHNoYTUxMjogeGJYNVFEeXpkdlFkNnJWenBhbVJMZld1K29JYmhsVzlwTGJwS3l3UVNpRXg2QlBaSFRZQ3VsQng5VjV6cktoN1ROTTluUnBaSjNTcGgyYlUzdis1dVE9PVxuICAgIHNpemU6IDE1NDg2Njc4MVxuICAtIHVybDogc2lnbmFsLWRlc2t0b3AtbWFjLWFybTY0LTEuMjMuMi5kbWdcbiAgICBzaGE1MTI6IDd3Z0dXQ29nUTlPV01HbnFFVW1pU2VSY3QzdzYwenl6WXA1Y0lVdkpJVkZlOFdvQi9xUzduNzIxbit4Q3NyZHRlY2xSNnl1MWNxa09oL3hOL3dnUzBRPT1cbiAgICBzaXplOiAxNTI2MTg1NDdcbnBhdGg6IHNpZ25hbC1kZXNrdG9wLW1hYy14NjQtMS4yMy4yLnppcFxuc2hhNTEyOiBTVHVyd0hocEUycnd3cHd6My9SUUJiTWJWWVkySGgxRFZwZW9md0lXUFhvRFRYLzQxemlhK0J5S1hxOEJ2bmpJTWRRM1ltUEh1K1VwcEFXLytDRmtGUT09XG5yZWxlYXNlRGF0ZTogJzIwMjEtMTItMDNUMTk6MDA6MjMuNzU0WidcbmApO1xuICBjb25zdCB3aW5kb3dzQmV0YSA9IHBhcnNlWWFtbChgdmVyc2lvbjogMS4yMy4yLWJldGEuMVxuZmlsZXM6XG4gIC0gdXJsOiBzaWduYWwtZGVza3RvcC1iZXRhLXdpbi0xLjIzLjItYmV0YS4xLmV4ZVxuICAgIHNoYTUxMjogWkhNMUYzeS9ZNnVsUDVOaGJGdWg3dDJaQ3BZNGxEOUJlQmhQVitnMkIvMHAvNjZrcDBNSkRlVnhUZ2pSNDlPYWt3cE1BYWZBMWQ2eTJRQmFpbDRoU1E9PVxuICAgIHNpemU6IDkyMDI4NjU2XG5wYXRoOiBzaWduYWwtZGVza3RvcC1iZXRhLXdpbi0xLjIzLjItYmV0YS4xLmV4ZVxuc2hhNTEyOiBaSE0xRjN5L1k2dWxQNU5oYkZ1aDd0MlpDcFk0bEQ5QmVCaFBWK2cyQi8wcC82NmtwME1KRGVWeFRnalI0OU9ha3dwTUFhZkExZDZ5MlFCYWlsNGhTUT09XG5yZWxlYXNlRGF0ZTogJzIwMTktMDMtMjlUMDE6NTY6MDAuNTQ0WidcbmApO1xuICBjb25zdCBtYWNCZXRhID0gcGFyc2VZYW1sKGB2ZXJzaW9uOiAxLjIzLjItYmV0YS4xXG5maWxlczpcbiAgLSB1cmw6IHNpZ25hbC1kZXNrdG9wLW1hYy14NjQtMS4yMy4yLWJldGEuMS56aXBcbiAgICBzaGE1MTI6IFNUdXJ3SGhwRTJyd3dwd3ozL1JRQmJNYlZZWTJIaDFEVnBlb2Z3SVdQWG9EVFgvNDF6aWErQnlLWHE4QnZuaklNZFEzWW1QSHUrVXBwQVcvK0NGa0ZRPT1cbiAgICBzaXplOiAxNTAzMTc3MjdcbiAgLSB1cmw6IHNpZ25hbC1kZXNrdG9wLW1hYy1hcm02NC0xLjIzLjItYmV0YS4xLnppcFxuICAgIHNoYTUxMjogUEdGcUN0aUZlcDI3ckpjRTNzOEoyQkFIOUdRSVJnNDYwSjBJVndiVUNRRVJMWmxOOFlQNzFCMXhXVzA5Z0NtQTVZZUVZNG9EeW5xQkxtZ1FmRUZ0Znc9PVxuICAgIHNpemU6IDE0ODAyMjM2N1xuICAtIHVybDogc2lnbmFsLWRlc2t0b3AtbWFjLXg2NC0xLjIzLjItYmV0YS4xLmRtZ1xuICAgIHNoYTUxMjogeGJYNVFEeXpkdlFkNnJWenBhbVJMZld1K29JYmhsVzlwTGJwS3l3UVNpRXg2QlBaSFRZQ3VsQng5VjV6cktoN1ROTTluUnBaSjNTcGgyYlUzdis1dVE9PVxuICAgIHNpemU6IDE1NDg2Njc4MVxuICAtIHVybDogc2lnbmFsLWRlc2t0b3AtbWFjLWFybTY0LTEuMjMuMi1iZXRhLjEuZG1nXG4gICAgc2hhNTEyOiA3d2dHV0NvZ1E5T1dNR25xRVVtaVNlUmN0M3c2MHp5ellwNWNJVXZKSVZGZThXb0IvcVM3bjcyMW4reENzcmR0ZWNsUjZ5dTFjcWtPaC94Ti93Z1MwUT09XG4gICAgc2l6ZTogMTUyNjE4NTQ3XG5wYXRoOiBzaWduYWwtZGVza3RvcC1tYWMteDY0LTEuMjMuMi1iZXRhLjEuemlwXG5zaGE1MTI6IFNUdXJ3SGhwRTJyd3dwd3ozL1JRQmJNYlZZWTJIaDFEVnBlb2Z3SVdQWG9EVFgvNDF6aWErQnlLWHE4QnZuaklNZFEzWW1QSHUrVXBwQVcvK0NGa0ZRPT1cbnJlbGVhc2VEYXRlOiAnMjAyMS0xMi0wM1QxOTowMDoyMy43NTRaJ1xuYCk7XG5cbiAgZGVzY3JpYmUoJyNnZXRWZXJzaW9uJywgKCkgPT4ge1xuICAgIGl0KCdzdWNjZXNzZnVsbHkgZ2V0cyB2ZXJzaW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnMS4yMy4yJztcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRWZXJzaW9uKHdpbmRvd3MpLCBleHBlY3RlZCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZ2V0VmVyc2lvbihtYWMpLCBleHBlY3RlZCk7XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkQmV0YSA9ICcxLjIzLjItYmV0YS4xJztcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRWZXJzaW9uKHdpbmRvd3NCZXRhKSwgZXhwZWN0ZWRCZXRhKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChnZXRWZXJzaW9uKG1hY0JldGEpLCBleHBlY3RlZEJldGEpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldFVwZGF0ZUZpbGVOYW1lJywgKCkgPT4ge1xuICAgIGl0KCdzdWNjZXNzZnVsbHkgZ2V0cyB2ZXJzaW9uJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRVcGRhdGVGaWxlTmFtZSh3aW5kb3dzLCAnd2luMzInLCAneDY0JyksXG4gICAgICAgICdzaWduYWwtZGVza3RvcC13aW4tMS4yMy4yLmV4ZSdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFVwZGF0ZUZpbGVOYW1lKG1hYywgJ2RhcndpbicsICd4NjQnKSxcbiAgICAgICAgJ3NpZ25hbC1kZXNrdG9wLW1hYy14NjQtMS4yMy4yLnppcCdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFVwZGF0ZUZpbGVOYW1lKG1hYywgJ2RhcndpbicsICdhcm02NCcpLFxuICAgICAgICAnc2lnbmFsLWRlc2t0b3AtbWFjLWFybTY0LTEuMjMuMi56aXAnXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRVcGRhdGVGaWxlTmFtZSh3aW5kb3dzQmV0YSwgJ3dpbjMyJywgJ3g2NCcpLFxuICAgICAgICAnc2lnbmFsLWRlc2t0b3AtYmV0YS13aW4tMS4yMy4yLWJldGEuMS5leGUnXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRVcGRhdGVGaWxlTmFtZShtYWNCZXRhLCAnZGFyd2luJywgJ3g2NCcpLFxuICAgICAgICAnc2lnbmFsLWRlc2t0b3AtbWFjLXg2NC0xLjIzLjItYmV0YS4xLnppcCdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldFVwZGF0ZUZpbGVOYW1lKG1hY0JldGEsICdkYXJ3aW4nLCAnYXJtNjQnKSxcbiAgICAgICAgJ3NpZ25hbC1kZXNrdG9wLW1hYy1hcm02NC0xLjIzLjItYmV0YS4xLnppcCdcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjaXNVcGRhdGVGaWxlTmFtZVZhbGlkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIG5vcm1hbCBmaWxlbmFtZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGlzVXBkYXRlRmlsZU5hbWVWYWxpZCgnc2lnbmFsLWRlc2t0b3Atd2luLTEuMjMuMi5leGUnKSxcbiAgICAgICAgdHJ1ZVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgaXNVcGRhdGVGaWxlTmFtZVZhbGlkKCdzaWduYWwtZGVza3RvcC1tYWMteDY0LTEuMjMuMi1iZXRhLjEuemlwJyksXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHByb2JsZW1hdGljIG5hbWVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBpc1VwZGF0ZUZpbGVOYW1lVmFsaWQoJy4uL3NpZ25hbC1kZXNrdG9wLXdpbi0xLjIzLjIuZXhlJyksXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBpc1VwZGF0ZUZpbGVOYW1lVmFsaWQoJyVzaWduYWwtZGVza3RvcC1tYWMteDY0LTEuMjMuMi1iZXRhLjEuemlwJyksXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBpc1VwZGF0ZUZpbGVOYW1lVmFsaWQoJ0BzaWduYWwtZGVza3RvcC1tYWMteDY0LTEuMjMuMi1iZXRhLjEuemlwJyksXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI3ZhbGlkYXRlUGF0aCcsICgpID0+IHtcbiAgICBpdCgnc3VjY2VlZHMgZm9yIHNpbXBsZSBjaGlsZHJlbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGJhc2UgPSBhd2FpdCBjcmVhdGVVcGRhdGVDYWNoZURpcklmTmVlZGVkKCk7XG4gICAgICB2YWxpZGF0ZVBhdGgoYmFzZSwgYCR7YmFzZX0vY2hpbGRgKTtcbiAgICAgIHZhbGlkYXRlUGF0aChiYXNlLCBgJHtiYXNlfS9jaGlsZC9ncmFuZGNoaWxkYCk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHByb2JsZW1hdGljIG5hbWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYmFzZSA9IGF3YWl0IGNyZWF0ZVVwZGF0ZUNhY2hlRGlySWZOZWVkZWQoKTtcbiAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4ge1xuICAgICAgICB2YWxpZGF0ZVBhdGgoYmFzZSwgYCR7YmFzZX0vLi4vY2hpbGRgKTtcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LnRocm93cygoKSA9PiB7XG4gICAgICAgIHZhbGlkYXRlUGF0aChiYXNlLCAnL3Jvb3QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY3JlYXRlVGVtcERpcicsICgpID0+IHtcbiAgICBpdCgnY3JlYXRlcyBhIHRlbXBvcmFyeSBkaXJlY3RvcnknLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkaXIgPSBhd2FpdCBjcmVhdGVUZW1wRGlyKCk7XG4gICAgICBhc3NlcnQuaXNUcnVlKChhd2FpdCBzdGF0KGRpcikpLmlzRGlyZWN0b3J5KCkpO1xuXG4gICAgICBhd2FpdCBkZWxldGVUZW1wRGlyKGRpcik7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGF3YWl0IHBhdGhFeGlzdHMoZGlyKSwgJ0RpcmVjdG9yeSBzaG91bGQgYmUgZGVsZXRlZCcpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0VGVtcERpcicsICgpID0+IHtcbiAgICBpdCgncmVzZXJ2ZXMgYSB0ZW1wb3JhcnkgZGlyZWN0b3J5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGlyID0gYXdhaXQgZ2V0VGVtcERpcigpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgKGF3YWl0IHN0YXQoam9pbihkaXIsICcuLicpKSkuaXNEaXJlY3RvcnkoKSxcbiAgICAgICAgJ1BhcmVudCBmb2xkZXIgc2hvdWxkIGV4aXN0J1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGF3YWl0IHBhdGhFeGlzdHMoZGlyKSwgJ1Jlc2VydmVkIGZvbGRlciBzaG91bGQgbm90IGV4aXN0Jyk7XG5cbiAgICAgIGF3YWl0IG1rZGlyKGRpcik7XG5cbiAgICAgIGF3YWl0IGRlbGV0ZVRlbXBEaXIoZGlyKTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoYXdhaXQgcGF0aEV4aXN0cyhkaXIpLCAnRGlyZWN0b3J5IHNob3VsZCBiZSBkZWxldGVkJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBdUI7QUFDdkIsc0JBQTJCO0FBQzNCLHNCQUE0QjtBQUM1QixrQkFBcUI7QUFFckIsb0JBVU87QUFFUCxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLFFBQU0sVUFBVSw2QkFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FRM0I7QUFDQyxRQUFNLE1BQU0sNkJBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBaUJ2QjtBQUNDLFFBQU0sY0FBYyw2QkFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FRL0I7QUFDQyxRQUFNLFVBQVUsNkJBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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
