var import_chai = require("chai");
var import_lodash = require("lodash");
var import_BadgeCategory = require("../../badges/BadgeCategory");
var import_BadgeImageTheme = require("../../badges/BadgeImageTheme");
var import_parseBadgesFromServer = require("../../badges/parseBadgesFromServer");
describe("parseBadgesFromServer", () => {
  const UPDATES_URL = "https://updates2.signal.org/desktop";
  const validBadgeData = {
    id: "fake-badge-id",
    category: "donor",
    name: "Cool Donor",
    description: "Hello {short_name}",
    svg: "huge badge.svg",
    svgs: ["small", "medium", "large"].map((size) => ({
      dark: `${size} badge dark.svg`,
      light: `${size} badge light.svg`
    }))
  };
  const validBadge = {
    id: validBadgeData.id,
    category: import_BadgeCategory.BadgeCategory.Donor,
    name: "Cool Donor",
    descriptionTemplate: "Hello {short_name}",
    images: [
      ...["small", "medium", "large"].map((size) => ({
        [import_BadgeImageTheme.BadgeImageTheme.Dark]: {
          url: `https://updates2.signal.org/static/badges/${size}%20badge%20dark.svg`
        },
        [import_BadgeImageTheme.BadgeImageTheme.Light]: {
          url: `https://updates2.signal.org/static/badges/${size}%20badge%20light.svg`
        }
      })),
      {
        [import_BadgeImageTheme.BadgeImageTheme.Transparent]: {
          url: "https://updates2.signal.org/static/badges/huge%20badge.svg"
        }
      }
    ]
  };
  it("returns an empty array if passed a non-array", () => {
    [void 0, null, "foo.svg", validBadgeData].forEach((input) => {
      import_chai.assert.isEmpty((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL));
    });
  });
  it("returns an empty array if passed one", () => {
    import_chai.assert.isEmpty((0, import_parseBadgesFromServer.parseBadgesFromServer)([], UPDATES_URL));
  });
  it("parses valid badge data", () => {
    const input = [validBadgeData];
    import_chai.assert.deepStrictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), [
      validBadge
    ]);
  });
  it("only returns the first 1000 badges", () => {
    const input = Array(1234).fill(validBadgeData);
    import_chai.assert.lengthOf((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), 1e3);
  });
  it("discards badges with invalid IDs", () => {
    [void 0, null, 123].forEach((id) => {
      const invalidBadgeData = {
        ...validBadgeData,
        name: "Should be missing",
        id
      };
      const input = [validBadgeData, invalidBadgeData];
      import_chai.assert.deepStrictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), [
        validBadge
      ]);
    });
  });
  it("discards badges with invalid names", () => {
    [void 0, null, 123].forEach((name) => {
      const invalidBadgeData = {
        ...validBadgeData,
        description: "Should be missing",
        name
      };
      const input = [validBadgeData, invalidBadgeData];
      import_chai.assert.deepStrictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), [
        validBadge
      ]);
    });
  });
  it("discards badges with invalid description templates", () => {
    [void 0, null, 123].forEach((description) => {
      const invalidBadgeData = {
        ...validBadgeData,
        name: "Hello",
        description
      };
      const input = [validBadgeData, invalidBadgeData];
      import_chai.assert.deepStrictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), [
        validBadge
      ]);
    });
  });
  it('discards badges that lack a valid "huge" SVG', () => {
    const input = [
      validBadgeData,
      (0, import_lodash.omit)(validBadgeData, "svg"),
      { ...validBadgeData, svg: 123 }
    ];
    import_chai.assert.deepStrictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), [
      validBadge
    ]);
  });
  it('discards badges that lack exactly 3 valid "normal" SVGs', () => {
    const input = [
      validBadgeData,
      (0, import_lodash.omit)(validBadgeData, "svgs"),
      { ...validBadgeData, svgs: "bad!" },
      { ...validBadgeData, svgs: [] },
      {
        ...validBadgeData,
        svgs: validBadgeData.svgs.slice(0, 2)
      },
      {
        ...validBadgeData,
        svgs: [{}, ...validBadgeData.svgs.slice(1)]
      },
      {
        ...validBadgeData,
        svgs: [{ dark: 123 }, ...validBadgeData.svgs.slice(1)]
      },
      {
        ...validBadgeData,
        svgs: [
          ...validBadgeData.svgs,
          {
            dark: "too.svg",
            light: "many.svg"
          }
        ]
      }
    ];
    import_chai.assert.deepStrictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL), [
      validBadge
    ]);
  });
  it('converts "donor" to the Donor category', () => {
    const input = [validBadgeData];
    import_chai.assert.strictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL)[0]?.category, import_BadgeCategory.BadgeCategory.Donor);
  });
  it('converts "other" to the Other category', () => {
    const input = [
      {
        ...validBadgeData,
        category: "other"
      }
    ];
    import_chai.assert.strictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL)[0]?.category, import_BadgeCategory.BadgeCategory.Other);
  });
  it("converts unexpected categories to Other", () => {
    const input = [
      {
        ...validBadgeData,
        category: "garbage"
      }
    ];
    import_chai.assert.strictEqual((0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL)[0]?.category, import_BadgeCategory.BadgeCategory.Other);
  });
  it("parses your own badges", () => {
    const input = [
      {
        ...validBadgeData,
        expiration: 1234,
        visible: true
      }
    ];
    const badge = (0, import_parseBadgesFromServer.parseBadgesFromServer)(input, UPDATES_URL)[0];
    if (!badge || !("expiresAt" in badge) || !("isVisible" in badge)) {
      throw new Error("Badge is invalid");
    }
    import_chai.assert.strictEqual(badge.expiresAt, 1234 * 1e3);
    import_chai.assert.isTrue(badge.isVisible);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VCYWRnZXNGcm9tU2VydmVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEJhZGdlQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9iYWRnZXMvQmFkZ2VDYXRlZ29yeSc7XG5pbXBvcnQgeyBCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuLi8uLi9iYWRnZXMvQmFkZ2VJbWFnZVRoZW1lJztcblxuaW1wb3J0IHsgcGFyc2VCYWRnZXNGcm9tU2VydmVyIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL3BhcnNlQmFkZ2VzRnJvbVNlcnZlcic7XG5cbmRlc2NyaWJlKCdwYXJzZUJhZGdlc0Zyb21TZXJ2ZXInLCAoKSA9PiB7XG4gIGNvbnN0IFVQREFURVNfVVJMID0gJ2h0dHBzOi8vdXBkYXRlczIuc2lnbmFsLm9yZy9kZXNrdG9wJztcblxuICBjb25zdCB2YWxpZEJhZGdlRGF0YSA9IHtcbiAgICBpZDogJ2Zha2UtYmFkZ2UtaWQnLFxuICAgIGNhdGVnb3J5OiAnZG9ub3InLFxuICAgIG5hbWU6ICdDb29sIERvbm9yJyxcbiAgICBkZXNjcmlwdGlvbjogJ0hlbGxvIHtzaG9ydF9uYW1lfScsXG4gICAgc3ZnOiAnaHVnZSBiYWRnZS5zdmcnLFxuICAgIHN2Z3M6IFsnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJ10ubWFwKHNpemUgPT4gKHtcbiAgICAgIGRhcms6IGAke3NpemV9IGJhZGdlIGRhcmsuc3ZnYCxcbiAgICAgIGxpZ2h0OiBgJHtzaXplfSBiYWRnZSBsaWdodC5zdmdgLFxuICAgIH0pKSxcbiAgfTtcbiAgY29uc3QgdmFsaWRCYWRnZSA9IHtcbiAgICBpZDogdmFsaWRCYWRnZURhdGEuaWQsXG4gICAgY2F0ZWdvcnk6IEJhZGdlQ2F0ZWdvcnkuRG9ub3IsXG4gICAgbmFtZTogJ0Nvb2wgRG9ub3InLFxuICAgIGRlc2NyaXB0aW9uVGVtcGxhdGU6ICdIZWxsbyB7c2hvcnRfbmFtZX0nLFxuICAgIGltYWdlczogW1xuICAgICAgLi4uWydzbWFsbCcsICdtZWRpdW0nLCAnbGFyZ2UnXS5tYXAoc2l6ZSA9PiAoe1xuICAgICAgICBbQmFkZ2VJbWFnZVRoZW1lLkRhcmtdOiB7XG4gICAgICAgICAgdXJsOiBgaHR0cHM6Ly91cGRhdGVzMi5zaWduYWwub3JnL3N0YXRpYy9iYWRnZXMvJHtzaXplfSUyMGJhZGdlJTIwZGFyay5zdmdgLFxuICAgICAgICB9LFxuICAgICAgICBbQmFkZ2VJbWFnZVRoZW1lLkxpZ2h0XToge1xuICAgICAgICAgIHVybDogYGh0dHBzOi8vdXBkYXRlczIuc2lnbmFsLm9yZy9zdGF0aWMvYmFkZ2VzLyR7c2l6ZX0lMjBiYWRnZSUyMGxpZ2h0LnN2Z2AsXG4gICAgICAgIH0sXG4gICAgICB9KSksXG4gICAgICB7XG4gICAgICAgIFtCYWRnZUltYWdlVGhlbWUuVHJhbnNwYXJlbnRdOiB7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly91cGRhdGVzMi5zaWduYWwub3JnL3N0YXRpYy9iYWRnZXMvaHVnZSUyMGJhZGdlLnN2ZycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG5cbiAgaXQoJ3JldHVybnMgYW4gZW1wdHkgYXJyYXkgaWYgcGFzc2VkIGEgbm9uLWFycmF5JywgKCkgPT4ge1xuICAgIFt1bmRlZmluZWQsIG51bGwsICdmb28uc3ZnJywgdmFsaWRCYWRnZURhdGFdLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgYXNzZXJ0LmlzRW1wdHkocGFyc2VCYWRnZXNGcm9tU2VydmVyKGlucHV0LCBVUERBVEVTX1VSTCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBhbiBlbXB0eSBhcnJheSBpZiBwYXNzZWQgb25lJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc0VtcHR5KHBhcnNlQmFkZ2VzRnJvbVNlcnZlcihbXSwgVVBEQVRFU19VUkwpKTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnNlcyB2YWxpZCBiYWRnZSBkYXRhJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gW3ZhbGlkQmFkZ2VEYXRhXTtcbiAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHBhcnNlQmFkZ2VzRnJvbVNlcnZlcihpbnB1dCwgVVBEQVRFU19VUkwpLCBbXG4gICAgICB2YWxpZEJhZGdlLFxuICAgIF0pO1xuICB9KTtcblxuICBpdCgnb25seSByZXR1cm5zIHRoZSBmaXJzdCAxMDAwIGJhZGdlcycsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IEFycmF5KDEyMzQpLmZpbGwodmFsaWRCYWRnZURhdGEpO1xuICAgIGFzc2VydC5sZW5ndGhPZihwYXJzZUJhZGdlc0Zyb21TZXJ2ZXIoaW5wdXQsIFVQREFURVNfVVJMKSwgMTAwMCk7XG4gIH0pO1xuXG4gIGl0KCdkaXNjYXJkcyBiYWRnZXMgd2l0aCBpbnZhbGlkIElEcycsICgpID0+IHtcbiAgICBbdW5kZWZpbmVkLCBudWxsLCAxMjNdLmZvckVhY2goaWQgPT4ge1xuICAgICAgY29uc3QgaW52YWxpZEJhZGdlRGF0YSA9IHtcbiAgICAgICAgLi4udmFsaWRCYWRnZURhdGEsXG4gICAgICAgIG5hbWU6ICdTaG91bGQgYmUgbWlzc2luZycsXG4gICAgICAgIGlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGlucHV0ID0gW3ZhbGlkQmFkZ2VEYXRhLCBpbnZhbGlkQmFkZ2VEYXRhXTtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocGFyc2VCYWRnZXNGcm9tU2VydmVyKGlucHV0LCBVUERBVEVTX1VSTCksIFtcbiAgICAgICAgdmFsaWRCYWRnZSxcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnZGlzY2FyZHMgYmFkZ2VzIHdpdGggaW52YWxpZCBuYW1lcycsICgpID0+IHtcbiAgICBbdW5kZWZpbmVkLCBudWxsLCAxMjNdLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICBjb25zdCBpbnZhbGlkQmFkZ2VEYXRhID0ge1xuICAgICAgICAuLi52YWxpZEJhZGdlRGF0YSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTaG91bGQgYmUgbWlzc2luZycsXG4gICAgICAgIG5hbWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgaW5wdXQgPSBbdmFsaWRCYWRnZURhdGEsIGludmFsaWRCYWRnZURhdGFdO1xuICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChwYXJzZUJhZGdlc0Zyb21TZXJ2ZXIoaW5wdXQsIFVQREFURVNfVVJMKSwgW1xuICAgICAgICB2YWxpZEJhZGdlLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGl0KCdkaXNjYXJkcyBiYWRnZXMgd2l0aCBpbnZhbGlkIGRlc2NyaXB0aW9uIHRlbXBsYXRlcycsICgpID0+IHtcbiAgICBbdW5kZWZpbmVkLCBudWxsLCAxMjNdLmZvckVhY2goZGVzY3JpcHRpb24gPT4ge1xuICAgICAgY29uc3QgaW52YWxpZEJhZGdlRGF0YSA9IHtcbiAgICAgICAgLi4udmFsaWRCYWRnZURhdGEsXG4gICAgICAgIG5hbWU6ICdIZWxsbycsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGlucHV0ID0gW3ZhbGlkQmFkZ2VEYXRhLCBpbnZhbGlkQmFkZ2VEYXRhXTtcbiAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocGFyc2VCYWRnZXNGcm9tU2VydmVyKGlucHV0LCBVUERBVEVTX1VSTCksIFtcbiAgICAgICAgdmFsaWRCYWRnZSxcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9KTtcblxuICBpdCgnZGlzY2FyZHMgYmFkZ2VzIHRoYXQgbGFjayBhIHZhbGlkIFwiaHVnZVwiIFNWRycsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IFtcbiAgICAgIHZhbGlkQmFkZ2VEYXRhLFxuICAgICAgb21pdCh2YWxpZEJhZGdlRGF0YSwgJ3N2ZycpLFxuICAgICAgeyAuLi52YWxpZEJhZGdlRGF0YSwgc3ZnOiAxMjMgfSxcbiAgICBdO1xuICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwocGFyc2VCYWRnZXNGcm9tU2VydmVyKGlucHV0LCBVUERBVEVTX1VSTCksIFtcbiAgICAgIHZhbGlkQmFkZ2UsXG4gICAgXSk7XG4gIH0pO1xuXG4gIGl0KCdkaXNjYXJkcyBiYWRnZXMgdGhhdCBsYWNrIGV4YWN0bHkgMyB2YWxpZCBcIm5vcm1hbFwiIFNWR3MnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBbXG4gICAgICB2YWxpZEJhZGdlRGF0YSxcbiAgICAgIG9taXQodmFsaWRCYWRnZURhdGEsICdzdmdzJyksXG4gICAgICB7IC4uLnZhbGlkQmFkZ2VEYXRhLCBzdmdzOiAnYmFkIScgfSxcbiAgICAgIHsgLi4udmFsaWRCYWRnZURhdGEsIHN2Z3M6IFtdIH0sXG4gICAgICB7XG4gICAgICAgIC4uLnZhbGlkQmFkZ2VEYXRhLFxuICAgICAgICBzdmdzOiB2YWxpZEJhZGdlRGF0YS5zdmdzLnNsaWNlKDAsIDIpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLi4udmFsaWRCYWRnZURhdGEsXG4gICAgICAgIHN2Z3M6IFt7fSwgLi4udmFsaWRCYWRnZURhdGEuc3Zncy5zbGljZSgxKV0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAuLi52YWxpZEJhZGdlRGF0YSxcbiAgICAgICAgc3ZnczogW3sgZGFyazogMTIzIH0sIC4uLnZhbGlkQmFkZ2VEYXRhLnN2Z3Muc2xpY2UoMSldLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLi4udmFsaWRCYWRnZURhdGEsXG4gICAgICAgIHN2Z3M6IFtcbiAgICAgICAgICAuLi52YWxpZEJhZGdlRGF0YS5zdmdzLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhcms6ICd0b28uc3ZnJyxcbiAgICAgICAgICAgIGxpZ2h0OiAnbWFueS5zdmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF07XG4gICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChwYXJzZUJhZGdlc0Zyb21TZXJ2ZXIoaW5wdXQsIFVQREFURVNfVVJMKSwgW1xuICAgICAgdmFsaWRCYWRnZSxcbiAgICBdKTtcbiAgfSk7XG5cbiAgaXQoJ2NvbnZlcnRzIFwiZG9ub3JcIiB0byB0aGUgRG9ub3IgY2F0ZWdvcnknLCAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBbdmFsaWRCYWRnZURhdGFdO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIHBhcnNlQmFkZ2VzRnJvbVNlcnZlcihpbnB1dCwgVVBEQVRFU19VUkwpWzBdPy5jYXRlZ29yeSxcbiAgICAgIEJhZGdlQ2F0ZWdvcnkuRG9ub3JcbiAgICApO1xuICB9KTtcblxuICBpdCgnY29udmVydHMgXCJvdGhlclwiIHRvIHRoZSBPdGhlciBjYXRlZ29yeScsICgpID0+IHtcbiAgICBjb25zdCBpbnB1dCA9IFtcbiAgICAgIHtcbiAgICAgICAgLi4udmFsaWRCYWRnZURhdGEsXG4gICAgICAgIGNhdGVnb3J5OiAnb3RoZXInLFxuICAgICAgfSxcbiAgICBdO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIHBhcnNlQmFkZ2VzRnJvbVNlcnZlcihpbnB1dCwgVVBEQVRFU19VUkwpWzBdPy5jYXRlZ29yeSxcbiAgICAgIEJhZGdlQ2F0ZWdvcnkuT3RoZXJcbiAgICApO1xuICB9KTtcblxuICBpdCgnY29udmVydHMgdW5leHBlY3RlZCBjYXRlZ29yaWVzIHRvIE90aGVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gW1xuICAgICAge1xuICAgICAgICAuLi52YWxpZEJhZGdlRGF0YSxcbiAgICAgICAgY2F0ZWdvcnk6ICdnYXJiYWdlJyxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBwYXJzZUJhZGdlc0Zyb21TZXJ2ZXIoaW5wdXQsIFVQREFURVNfVVJMKVswXT8uY2F0ZWdvcnksXG4gICAgICBCYWRnZUNhdGVnb3J5Lk90aGVyXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3BhcnNlcyB5b3VyIG93biBiYWRnZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBbXG4gICAgICB7XG4gICAgICAgIC4uLnZhbGlkQmFkZ2VEYXRhLFxuICAgICAgICBleHBpcmF0aW9uOiAxMjM0LFxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICBdO1xuXG4gICAgY29uc3QgYmFkZ2UgPSBwYXJzZUJhZGdlc0Zyb21TZXJ2ZXIoaW5wdXQsIFVQREFURVNfVVJMKVswXTtcbiAgICBpZiAoIWJhZGdlIHx8ICEoJ2V4cGlyZXNBdCcgaW4gYmFkZ2UpIHx8ICEoJ2lzVmlzaWJsZScgaW4gYmFkZ2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhZGdlIGlzIGludmFsaWQnKTtcbiAgICB9XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYmFkZ2UuZXhwaXJlc0F0LCAxMjM0ICogMTAwMCk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShiYWRnZS5pc1Zpc2libGUpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBR0Esa0JBQXVCO0FBQ3ZCLG9CQUFxQjtBQUNyQiwyQkFBOEI7QUFDOUIsNkJBQWdDO0FBRWhDLG1DQUFzQztBQUV0QyxTQUFTLHlCQUF5QixNQUFNO0FBQ3RDLFFBQU0sY0FBYztBQUVwQixRQUFNLGlCQUFpQjtBQUFBLElBQ3JCLElBQUk7QUFBQSxJQUNKLFVBQVU7QUFBQSxJQUNWLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLEtBQUs7QUFBQSxJQUNMLE1BQU0sQ0FBQyxTQUFTLFVBQVUsT0FBTyxFQUFFLElBQUksVUFBUztBQUFBLE1BQzlDLE1BQU0sR0FBRztBQUFBLE1BQ1QsT0FBTyxHQUFHO0FBQUEsSUFDWixFQUFFO0FBQUEsRUFDSjtBQUNBLFFBQU0sYUFBYTtBQUFBLElBQ2pC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
