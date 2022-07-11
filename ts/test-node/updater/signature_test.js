var import_fs = require("fs");
var import_path = require("path");
var import_chai = require("chai");
var import_fs_extra = require("fs-extra");
var import_signature = require("../../updater/signature");
var import_common = require("../../updater/common");
var import_curve = require("../../updater/curve");
describe("updater/signatures", () => {
  it("_getFileHash returns correct hash", async () => {
    const filePath = (0, import_path.join)(__dirname, "../../../fixtures/ghost-kitty.mp4");
    const expected = "7bc77f27d92d00b4a1d57c480ca86dacc43d57bc318339c92119d1fbf6b557a5";
    const hash = await (0, import_signature._getFileHash)(filePath);
    import_chai.assert.strictEqual(expected, Buffer.from(hash).toString("hex"));
  });
  it("roundtrips binary file writes", async () => {
    let tempDir;
    try {
      tempDir = await (0, import_common.createTempDir)();
      const path = (0, import_path.join)(tempDir, "something.bin");
      const { publicKey } = (0, import_curve.keyPair)();
      await (0, import_signature.writeHexToPath)(path, publicKey);
      const fromDisk = await (0, import_signature.loadHexFromPath)(path);
      import_chai.assert.strictEqual(Buffer.from(fromDisk).compare(Buffer.from(publicKey)), 0);
    } finally {
      if (tempDir) {
        await (0, import_common.deleteTempDir)(tempDir);
      }
    }
  });
  it("roundtrips signature", async () => {
    let tempDir;
    try {
      tempDir = await (0, import_common.createTempDir)();
      const version = "v1.23.2";
      const sourcePath = (0, import_path.join)(__dirname, "../../../fixtures/ghost-kitty.mp4");
      const updatePath = (0, import_path.join)(tempDir, "ghost-kitty.mp4");
      await (0, import_fs_extra.copy)(sourcePath, updatePath);
      const privateKeyPath = (0, import_path.join)(tempDir, "private.key");
      const { publicKey, privateKey } = (0, import_curve.keyPair)();
      await (0, import_signature.writeHexToPath)(privateKeyPath, privateKey);
      const signature = await (0, import_signature.writeSignature)(updatePath, version, privateKeyPath);
      const signaturePath = (0, import_signature.getSignaturePath)(updatePath);
      import_chai.assert.strictEqual((0, import_fs.existsSync)(signaturePath), true);
      const verified = await (0, import_signature.verifySignature)(updatePath, version, signature, publicKey);
      import_chai.assert.strictEqual(verified, true);
    } finally {
      if (tempDir) {
        await (0, import_common.deleteTempDir)(tempDir);
      }
    }
  });
  it("fails signature verification if version changes", async () => {
    let tempDir;
    try {
      tempDir = await (0, import_common.createTempDir)();
      const version = "v1.23.2";
      const brokenVersion = "v1.23.3";
      const sourcePath = (0, import_path.join)(__dirname, "../../../fixtures/ghost-kitty.mp4");
      const updatePath = (0, import_path.join)(tempDir, "ghost-kitty.mp4");
      await (0, import_fs_extra.copy)(sourcePath, updatePath);
      const privateKeyPath = (0, import_path.join)(tempDir, "private.key");
      const { publicKey, privateKey } = (0, import_curve.keyPair)();
      await (0, import_signature.writeHexToPath)(privateKeyPath, privateKey);
      const signature = await (0, import_signature.writeSignature)(updatePath, version, privateKeyPath);
      const verified = await (0, import_signature.verifySignature)(updatePath, brokenVersion, signature, publicKey);
      import_chai.assert.strictEqual(verified, false);
    } finally {
      if (tempDir) {
        await (0, import_common.deleteTempDir)(tempDir);
      }
    }
  });
  it("fails signature verification if signature tampered with", async () => {
    let tempDir;
    try {
      tempDir = await (0, import_common.createTempDir)();
      const version = "v1.23.2";
      const sourcePath = (0, import_path.join)(__dirname, "../../../fixtures/ghost-kitty.mp4");
      const updatePath = (0, import_path.join)(tempDir, "ghost-kitty.mp4");
      await (0, import_fs_extra.copy)(sourcePath, updatePath);
      const privateKeyPath = (0, import_path.join)(tempDir, "private.key");
      const { publicKey, privateKey } = (0, import_curve.keyPair)();
      await (0, import_signature.writeHexToPath)(privateKeyPath, privateKey);
      const signature = await (0, import_signature.writeSignature)(updatePath, version, privateKeyPath);
      signature[4] += 3;
      const verified = await (0, import_signature.verifySignature)(updatePath, version, signature, publicKey);
      import_chai.assert.strictEqual(verified, false);
    } finally {
      if (tempDir) {
        await (0, import_common.deleteTempDir)(tempDir);
      }
    }
  });
  it("fails signature verification if binary file tampered with", async () => {
    let tempDir;
    try {
      tempDir = await (0, import_common.createTempDir)();
      const version = "v1.23.2";
      const sourcePath = (0, import_path.join)(__dirname, "../../../fixtures/ghost-kitty.mp4");
      const updatePath = (0, import_path.join)(tempDir, "ghost-kitty.mp4");
      await (0, import_fs_extra.copy)(sourcePath, updatePath);
      const privateKeyPath = (0, import_path.join)(tempDir, "private.key");
      const { publicKey, privateKey } = (0, import_curve.keyPair)();
      await (0, import_signature.writeHexToPath)(privateKeyPath, privateKey);
      const signature = await (0, import_signature.writeSignature)(updatePath, version, privateKeyPath);
      const brokenSourcePath = (0, import_path.join)(__dirname, "../../../fixtures/pixabay-Soap-Bubble-7141.mp4");
      await (0, import_fs_extra.copy)(brokenSourcePath, updatePath);
      const verified = await (0, import_signature.verifySignature)(updatePath, version, signature, publicKey);
      import_chai.assert.strictEqual(verified, false);
    } finally {
      if (tempDir) {
        await (0, import_common.deleteTempDir)(tempDir);
      }
    }
  });
  it("fails signature verification if signed by different key", async () => {
    let tempDir;
    try {
      tempDir = await (0, import_common.createTempDir)();
      const version = "v1.23.2";
      const sourcePath = (0, import_path.join)(__dirname, "../../../fixtures/ghost-kitty.mp4");
      const updatePath = (0, import_path.join)(tempDir, "ghost-kitty.mp4");
      await (0, import_fs_extra.copy)(sourcePath, updatePath);
      const privateKeyPath = (0, import_path.join)(tempDir, "private.key");
      const { publicKey } = (0, import_curve.keyPair)();
      const { privateKey } = (0, import_curve.keyPair)();
      await (0, import_signature.writeHexToPath)(privateKeyPath, privateKey);
      const signature = await (0, import_signature.writeSignature)(updatePath, version, privateKeyPath);
      const verified = await (0, import_signature.verifySignature)(updatePath, version, signature, publicKey);
      import_chai.assert.strictEqual(verified, false);
    } finally {
      if (tempDir) {
        await (0, import_common.deleteTempDir)(tempDir);
      }
    }
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2lnbmF0dXJlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7IGNvcHkgfSBmcm9tICdmcy1leHRyYSc7XG5cbmltcG9ydCB7XG4gIF9nZXRGaWxlSGFzaCxcbiAgZ2V0U2lnbmF0dXJlUGF0aCxcbiAgbG9hZEhleEZyb21QYXRoLFxuICB2ZXJpZnlTaWduYXR1cmUsXG4gIHdyaXRlSGV4VG9QYXRoLFxuICB3cml0ZVNpZ25hdHVyZSxcbn0gZnJvbSAnLi4vLi4vdXBkYXRlci9zaWduYXR1cmUnO1xuaW1wb3J0IHsgY3JlYXRlVGVtcERpciwgZGVsZXRlVGVtcERpciB9IGZyb20gJy4uLy4uL3VwZGF0ZXIvY29tbW9uJztcbmltcG9ydCB7IGtleVBhaXIgfSBmcm9tICcuLi8uLi91cGRhdGVyL2N1cnZlJztcblxuZGVzY3JpYmUoJ3VwZGF0ZXIvc2lnbmF0dXJlcycsICgpID0+IHtcbiAgaXQoJ19nZXRGaWxlSGFzaCByZXR1cm5zIGNvcnJlY3QgaGFzaCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vZml4dHVyZXMvZ2hvc3Qta2l0dHkubXA0Jyk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPVxuICAgICAgJzdiYzc3ZjI3ZDkyZDAwYjRhMWQ1N2M0ODBjYTg2ZGFjYzQzZDU3YmMzMTgzMzljOTIxMTlkMWZiZjZiNTU3YTUnO1xuXG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IF9nZXRGaWxlSGFzaChmaWxlUGF0aCk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoZXhwZWN0ZWQsIEJ1ZmZlci5mcm9tKGhhc2gpLnRvU3RyaW5nKCdoZXgnKSk7XG4gIH0pO1xuXG4gIGl0KCdyb3VuZHRyaXBzIGJpbmFyeSBmaWxlIHdyaXRlcycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgdGVtcERpcjtcblxuICAgIHRyeSB7XG4gICAgICB0ZW1wRGlyID0gYXdhaXQgY3JlYXRlVGVtcERpcigpO1xuXG4gICAgICBjb25zdCBwYXRoID0gam9pbih0ZW1wRGlyLCAnc29tZXRoaW5nLmJpbicpO1xuICAgICAgY29uc3QgeyBwdWJsaWNLZXkgfSA9IGtleVBhaXIoKTtcblxuICAgICAgYXdhaXQgd3JpdGVIZXhUb1BhdGgocGF0aCwgcHVibGljS2V5KTtcblxuICAgICAgY29uc3QgZnJvbURpc2sgPSBhd2FpdCBsb2FkSGV4RnJvbVBhdGgocGF0aCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgQnVmZmVyLmZyb20oZnJvbURpc2spLmNvbXBhcmUoQnVmZmVyLmZyb20ocHVibGljS2V5KSksXG4gICAgICAgIDBcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0ZW1wRGlyKSB7XG4gICAgICAgIGF3YWl0IGRlbGV0ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpdCgncm91bmR0cmlwcyBzaWduYXR1cmUnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHRlbXBEaXI7XG5cbiAgICB0cnkge1xuICAgICAgdGVtcERpciA9IGF3YWl0IGNyZWF0ZVRlbXBEaXIoKTtcblxuICAgICAgY29uc3QgdmVyc2lvbiA9ICd2MS4yMy4yJztcbiAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL2ZpeHR1cmVzL2dob3N0LWtpdHR5Lm1wNCcpO1xuICAgICAgY29uc3QgdXBkYXRlUGF0aCA9IGpvaW4odGVtcERpciwgJ2dob3N0LWtpdHR5Lm1wNCcpO1xuICAgICAgYXdhaXQgY29weShzb3VyY2VQYXRoLCB1cGRhdGVQYXRoKTtcblxuICAgICAgY29uc3QgcHJpdmF0ZUtleVBhdGggPSBqb2luKHRlbXBEaXIsICdwcml2YXRlLmtleScpO1xuICAgICAgY29uc3QgeyBwdWJsaWNLZXksIHByaXZhdGVLZXkgfSA9IGtleVBhaXIoKTtcbiAgICAgIGF3YWl0IHdyaXRlSGV4VG9QYXRoKHByaXZhdGVLZXlQYXRoLCBwcml2YXRlS2V5KTtcblxuICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgd3JpdGVTaWduYXR1cmUoXG4gICAgICAgIHVwZGF0ZVBhdGgsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIHByaXZhdGVLZXlQYXRoXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzaWduYXR1cmVQYXRoID0gZ2V0U2lnbmF0dXJlUGF0aCh1cGRhdGVQYXRoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChleGlzdHNTeW5jKHNpZ25hdHVyZVBhdGgpLCB0cnVlKTtcblxuICAgICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB2ZXJpZnlTaWduYXR1cmUoXG4gICAgICAgIHVwZGF0ZVBhdGgsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgcHVibGljS2V5XG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHZlcmlmaWVkLCB0cnVlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHRlbXBEaXIpIHtcbiAgICAgICAgYXdhaXQgZGVsZXRlVGVtcERpcih0ZW1wRGlyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdmYWlscyBzaWduYXR1cmUgdmVyaWZpY2F0aW9uIGlmIHZlcnNpb24gY2hhbmdlcycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgdGVtcERpcjtcblxuICAgIHRyeSB7XG4gICAgICB0ZW1wRGlyID0gYXdhaXQgY3JlYXRlVGVtcERpcigpO1xuXG4gICAgICBjb25zdCB2ZXJzaW9uID0gJ3YxLjIzLjInO1xuICAgICAgY29uc3QgYnJva2VuVmVyc2lvbiA9ICd2MS4yMy4zJztcblxuICAgICAgY29uc3Qgc291cmNlUGF0aCA9IGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vZml4dHVyZXMvZ2hvc3Qta2l0dHkubXA0Jyk7XG4gICAgICBjb25zdCB1cGRhdGVQYXRoID0gam9pbih0ZW1wRGlyLCAnZ2hvc3Qta2l0dHkubXA0Jyk7XG4gICAgICBhd2FpdCBjb3B5KHNvdXJjZVBhdGgsIHVwZGF0ZVBhdGgpO1xuXG4gICAgICBjb25zdCBwcml2YXRlS2V5UGF0aCA9IGpvaW4odGVtcERpciwgJ3ByaXZhdGUua2V5Jyk7XG4gICAgICBjb25zdCB7IHB1YmxpY0tleSwgcHJpdmF0ZUtleSB9ID0ga2V5UGFpcigpO1xuICAgICAgYXdhaXQgd3JpdGVIZXhUb1BhdGgocHJpdmF0ZUtleVBhdGgsIHByaXZhdGVLZXkpO1xuXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB3cml0ZVNpZ25hdHVyZShcbiAgICAgICAgdXBkYXRlUGF0aCxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgcHJpdmF0ZUtleVBhdGhcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHZlcmlmaWVkID0gYXdhaXQgdmVyaWZ5U2lnbmF0dXJlKFxuICAgICAgICB1cGRhdGVQYXRoLFxuICAgICAgICBicm9rZW5WZXJzaW9uLFxuICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIHB1YmxpY0tleVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh2ZXJpZmllZCwgZmFsc2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAodGVtcERpcikge1xuICAgICAgICBhd2FpdCBkZWxldGVUZW1wRGlyKHRlbXBEaXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ2ZhaWxzIHNpZ25hdHVyZSB2ZXJpZmljYXRpb24gaWYgc2lnbmF0dXJlIHRhbXBlcmVkIHdpdGgnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHRlbXBEaXI7XG5cbiAgICB0cnkge1xuICAgICAgdGVtcERpciA9IGF3YWl0IGNyZWF0ZVRlbXBEaXIoKTtcblxuICAgICAgY29uc3QgdmVyc2lvbiA9ICd2MS4yMy4yJztcblxuICAgICAgY29uc3Qgc291cmNlUGF0aCA9IGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vZml4dHVyZXMvZ2hvc3Qta2l0dHkubXA0Jyk7XG4gICAgICBjb25zdCB1cGRhdGVQYXRoID0gam9pbih0ZW1wRGlyLCAnZ2hvc3Qta2l0dHkubXA0Jyk7XG4gICAgICBhd2FpdCBjb3B5KHNvdXJjZVBhdGgsIHVwZGF0ZVBhdGgpO1xuXG4gICAgICBjb25zdCBwcml2YXRlS2V5UGF0aCA9IGpvaW4odGVtcERpciwgJ3ByaXZhdGUua2V5Jyk7XG4gICAgICBjb25zdCB7IHB1YmxpY0tleSwgcHJpdmF0ZUtleSB9ID0ga2V5UGFpcigpO1xuICAgICAgYXdhaXQgd3JpdGVIZXhUb1BhdGgocHJpdmF0ZUtleVBhdGgsIHByaXZhdGVLZXkpO1xuXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB3cml0ZVNpZ25hdHVyZShcbiAgICAgICAgdXBkYXRlUGF0aCxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgcHJpdmF0ZUtleVBhdGhcbiAgICAgICk7XG4gICAgICBzaWduYXR1cmVbNF0gKz0gMztcblxuICAgICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB2ZXJpZnlTaWduYXR1cmUoXG4gICAgICAgIHVwZGF0ZVBhdGgsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgcHVibGljS2V5XG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHZlcmlmaWVkLCBmYWxzZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0ZW1wRGlyKSB7XG4gICAgICAgIGF3YWl0IGRlbGV0ZVRlbXBEaXIodGVtcERpcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpdCgnZmFpbHMgc2lnbmF0dXJlIHZlcmlmaWNhdGlvbiBpZiBiaW5hcnkgZmlsZSB0YW1wZXJlZCB3aXRoJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCB0ZW1wRGlyO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRlbXBEaXIgPSBhd2FpdCBjcmVhdGVUZW1wRGlyKCk7XG5cbiAgICAgIGNvbnN0IHZlcnNpb24gPSAndjEuMjMuMic7XG5cbiAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL2ZpeHR1cmVzL2dob3N0LWtpdHR5Lm1wNCcpO1xuICAgICAgY29uc3QgdXBkYXRlUGF0aCA9IGpvaW4odGVtcERpciwgJ2dob3N0LWtpdHR5Lm1wNCcpO1xuICAgICAgYXdhaXQgY29weShzb3VyY2VQYXRoLCB1cGRhdGVQYXRoKTtcblxuICAgICAgY29uc3QgcHJpdmF0ZUtleVBhdGggPSBqb2luKHRlbXBEaXIsICdwcml2YXRlLmtleScpO1xuICAgICAgY29uc3QgeyBwdWJsaWNLZXksIHByaXZhdGVLZXkgfSA9IGtleVBhaXIoKTtcbiAgICAgIGF3YWl0IHdyaXRlSGV4VG9QYXRoKHByaXZhdGVLZXlQYXRoLCBwcml2YXRlS2V5KTtcblxuICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYXdhaXQgd3JpdGVTaWduYXR1cmUoXG4gICAgICAgIHVwZGF0ZVBhdGgsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIHByaXZhdGVLZXlQYXRoXG4gICAgICApO1xuXG4gICAgICBjb25zdCBicm9rZW5Tb3VyY2VQYXRoID0gam9pbihcbiAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAnLi4vLi4vLi4vZml4dHVyZXMvcGl4YWJheS1Tb2FwLUJ1YmJsZS03MTQxLm1wNCdcbiAgICAgICk7XG4gICAgICBhd2FpdCBjb3B5KGJyb2tlblNvdXJjZVBhdGgsIHVwZGF0ZVBhdGgpO1xuXG4gICAgICBjb25zdCB2ZXJpZmllZCA9IGF3YWl0IHZlcmlmeVNpZ25hdHVyZShcbiAgICAgICAgdXBkYXRlUGF0aCxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICBwdWJsaWNLZXlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwodmVyaWZpZWQsIGZhbHNlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHRlbXBEaXIpIHtcbiAgICAgICAgYXdhaXQgZGVsZXRlVGVtcERpcih0ZW1wRGlyKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGl0KCdmYWlscyBzaWduYXR1cmUgdmVyaWZpY2F0aW9uIGlmIHNpZ25lZCBieSBkaWZmZXJlbnQga2V5JywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCB0ZW1wRGlyO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRlbXBEaXIgPSBhd2FpdCBjcmVhdGVUZW1wRGlyKCk7XG5cbiAgICAgIGNvbnN0IHZlcnNpb24gPSAndjEuMjMuMic7XG5cbiAgICAgIGNvbnN0IHNvdXJjZVBhdGggPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL2ZpeHR1cmVzL2dob3N0LWtpdHR5Lm1wNCcpO1xuICAgICAgY29uc3QgdXBkYXRlUGF0aCA9IGpvaW4odGVtcERpciwgJ2dob3N0LWtpdHR5Lm1wNCcpO1xuICAgICAgYXdhaXQgY29weShzb3VyY2VQYXRoLCB1cGRhdGVQYXRoKTtcblxuICAgICAgY29uc3QgcHJpdmF0ZUtleVBhdGggPSBqb2luKHRlbXBEaXIsICdwcml2YXRlLmtleScpO1xuICAgICAgY29uc3QgeyBwdWJsaWNLZXkgfSA9IGtleVBhaXIoKTtcbiAgICAgIGNvbnN0IHsgcHJpdmF0ZUtleSB9ID0ga2V5UGFpcigpO1xuICAgICAgYXdhaXQgd3JpdGVIZXhUb1BhdGgocHJpdmF0ZUtleVBhdGgsIHByaXZhdGVLZXkpO1xuXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCB3cml0ZVNpZ25hdHVyZShcbiAgICAgICAgdXBkYXRlUGF0aCxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgcHJpdmF0ZUtleVBhdGhcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHZlcmlmaWVkID0gYXdhaXQgdmVyaWZ5U2lnbmF0dXJlKFxuICAgICAgICB1cGRhdGVQYXRoLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIHB1YmxpY0tleVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCh2ZXJpZmllZCwgZmFsc2UpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAodGVtcERpcikge1xuICAgICAgICBhd2FpdCBkZWxldGVUZW1wRGlyKHRlbXBEaXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUdBLGdCQUEyQjtBQUMzQixrQkFBcUI7QUFFckIsa0JBQXVCO0FBQ3ZCLHNCQUFxQjtBQUVyQix1QkFPTztBQUNQLG9CQUE2QztBQUM3QyxtQkFBd0I7QUFFeEIsU0FBUyxzQkFBc0IsTUFBTTtBQUNuQyxLQUFHLHFDQUFxQyxZQUFZO0FBQ2xELFVBQU0sV0FBVyxzQkFBSyxXQUFXLG1DQUFtQztBQUNwRSxVQUFNLFdBQ0o7QUFFRixVQUFNLE9BQU8sTUFBTSxtQ0FBYSxRQUFRO0FBRXhDLHVCQUFPLFlBQVksVUFBVSxPQUFPLEtBQUssSUFBSSxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQUEsRUFDaEUsQ0FBQztBQUVELEtBQUcsaUNBQWlDLFlBQVk7QUFDOUMsUUFBSTtBQUVKLFFBQUk7QUFDRixnQkFBVSxNQUFNLGlDQUFjO0FBRTlCLFlBQU0sT0FBTyxzQkFBSyxTQUFTLGVBQWU7QUFDMUMsWUFBTSxFQUFFLGNBQWMsMEJBQVE7QUFFOUIsWUFBTSxxQ0FBZSxNQUFNLFNBQVM7QUFFcEMsWUFBTSxXQUFXLE1BQU0sc0NBQWdCLElBQUk7QUFFM0MseUJBQU8sWUFDTCxPQUFPLEtBQUssUUFBUSxFQUFFLFFBQVEsT0FBTyxLQUFLLFNBQVMsQ0FBQyxHQUNwRCxDQUNGO0FBQUEsSUFDRixVQUFFO0FB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
