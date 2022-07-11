var import_path = require("path");
var import_lodash = require("lodash");
var import_util = require("./util");
const exceptionsPath = (0, import_path.join)(__dirname, "exceptions.json");
const exceptions = (0, import_util.loadJSON)(exceptionsPath);
const byRule = (0, import_lodash.groupBy)(exceptions, "rule");
const byRuleThenByCategory = (0, import_lodash.fromPairs)((0, import_lodash.map)(byRule, (list, ruleName) => {
  const byCategory = (0, import_lodash.groupBy)(list, "reasonCategory");
  return [
    ruleName,
    (0, import_lodash.fromPairs)((0, import_lodash.map)(byCategory, (innerList, categoryName) => {
      return [categoryName, innerList.length];
    }))
  ];
}));
console.log(JSON.stringify(byRuleThenByCategory, null, "  "));
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYW5hbHl6ZV9leGNlcHRpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyBmcm9tUGFpcnMsIGdyb3VwQnksIG1hcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHsgRXhjZXB0aW9uVHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgbG9hZEpTT04gfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBleGNlcHRpb25zUGF0aCA9IGpvaW4oX19kaXJuYW1lLCAnZXhjZXB0aW9ucy5qc29uJyk7XG5jb25zdCBleGNlcHRpb25zOiBBcnJheTxFeGNlcHRpb25UeXBlPiA9IGxvYWRKU09OKGV4Y2VwdGlvbnNQYXRoKTtcbmNvbnN0IGJ5UnVsZSA9IGdyb3VwQnkoZXhjZXB0aW9ucywgJ3J1bGUnKTtcblxuY29uc3QgYnlSdWxlVGhlbkJ5Q2F0ZWdvcnkgPSBmcm9tUGFpcnMoXG4gIG1hcChieVJ1bGUsIChsaXN0LCBydWxlTmFtZSkgPT4ge1xuICAgIGNvbnN0IGJ5Q2F0ZWdvcnkgPSBncm91cEJ5KGxpc3QsICdyZWFzb25DYXRlZ29yeScpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHJ1bGVOYW1lLFxuICAgICAgZnJvbVBhaXJzKFxuICAgICAgICBtYXAoYnlDYXRlZ29yeSwgKGlubmVyTGlzdCwgY2F0ZWdvcnlOYW1lKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtjYXRlZ29yeU5hbWUsIGlubmVyTGlzdC5sZW5ndGhdO1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICBdO1xuICB9KVxuKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbmNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGJ5UnVsZVRoZW5CeUNhdGVnb3J5LCBudWxsLCAnICAnKSk7XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBcUI7QUFFckIsb0JBQXdDO0FBR3hDLGtCQUF5QjtBQUV6QixNQUFNLGlCQUFpQixzQkFBSyxXQUFXLGlCQUFpQjtBQUN4RCxNQUFNLGFBQW1DLDBCQUFTLGNBQWM7QUFDaEUsTUFBTSxTQUFTLDJCQUFRLFlBQVksTUFBTTtBQUV6QyxNQUFNLHVCQUF1Qiw2QkFDM0IsdUJBQUksUUFBUSxDQUFDLE1BQU0sYUFBYTtBQUM5QixRQUFNLGFBQWEsMkJBQVEsTUFBTSxnQkFBZ0I7QUFFakQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLDZCQUNFLHVCQUFJLFlBQVksQ0FBQyxXQUFXLGlCQUFpQjtBQUMzQyxhQUFPLENBQUMsY0FBYyxVQUFVLE1BQU07QUFBQSxJQUN4QyxDQUFDLENBQ0g7QUFBQSxFQUNGO0FBQ0YsQ0FBQyxDQUNIO0FBR0EsUUFBUSxJQUFJLEtBQUssVUFBVSxzQkFBc0IsTUFBTSxJQUFJLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
