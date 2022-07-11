var import_path = require("path");
var import_fs = require("fs");
console.log("Concatenating...");
const BASE_BOWER = (0, import_path.join)(__dirname, "../../components");
const BASE_NODE = (0, import_path.join)(__dirname, "../../node_modules");
const CONCAT_TARGET = (0, import_path.join)(__dirname, "../../js/components.js");
const CONCAT_SOURCES = [
  (0, import_path.join)(BASE_NODE, "jquery/dist/jquery.js"),
  (0, import_path.join)(BASE_NODE, "mustache/mustache.js"),
  (0, import_path.join)(BASE_NODE, "underscore/underscore.js"),
  (0, import_path.join)(BASE_BOWER, "webaudiorecorder/lib/WebAudioRecorder.js")
];
let concat = "// concatenated components.js";
CONCAT_SOURCES.forEach((source) => {
  const contents = (0, import_fs.readFileSync)(source, "utf8");
  const name = (0, import_path.basename)(source);
  console.log(`Concatenating ${source}`);
  concat += `

// ${name}
${contents}`;
});
console.log(`Writing to ${CONCAT_TARGET}`);
(0, import_fs.writeFileSync)(CONCAT_TARGET, concat);
console.log();
console.log("Copying...");
const BASE_JS = (0, import_path.join)(__dirname, "../../js");
const COPY_SOURCES = [
  {
    src: (0, import_path.join)(BASE_BOWER, "mp3lameencoder/lib/Mp3LameEncoder.js"),
    dest: (0, import_path.join)(BASE_JS, "Mp3LameEncoder.min.js")
  },
  {
    src: (0, import_path.join)(BASE_BOWER, "webaudiorecorder/lib/WebAudioRecorderMp3.js"),
    dest: (0, import_path.join)(BASE_JS, "WebAudioRecorderMp3.js")
  }
];
for (const { src, dest } of COPY_SOURCES) {
  console.log(`Copying ${src} to ${dest}`);
  (0, import_fs.copyFileSync)(src, dest);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29weS1hbmQtY29uY2F0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYmFzZW5hbWUsIGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNvcHlGaWxlU3luYywgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuXG4vLyBDb25jYXRcblxuY29uc29sZS5sb2coJ0NvbmNhdGVuYXRpbmcuLi4nKTtcblxuY29uc3QgQkFTRV9CT1dFUiA9IGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vY29tcG9uZW50cycpO1xuY29uc3QgQkFTRV9OT0RFID0gam9pbihfX2Rpcm5hbWUsICcuLi8uLi9ub2RlX21vZHVsZXMnKTtcbmNvbnN0IENPTkNBVF9UQVJHRVQgPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uL2pzL2NvbXBvbmVudHMuanMnKTtcbmNvbnN0IENPTkNBVF9TT1VSQ0VTID0gW1xuICBqb2luKEJBU0VfTk9ERSwgJ2pxdWVyeS9kaXN0L2pxdWVyeS5qcycpLFxuICBqb2luKEJBU0VfTk9ERSwgJ211c3RhY2hlL211c3RhY2hlLmpzJyksXG4gIGpvaW4oQkFTRV9OT0RFLCAndW5kZXJzY29yZS91bmRlcnNjb3JlLmpzJyksXG4gIGpvaW4oQkFTRV9CT1dFUiwgJ3dlYmF1ZGlvcmVjb3JkZXIvbGliL1dlYkF1ZGlvUmVjb3JkZXIuanMnKSxcbl07XG5cbmxldCBjb25jYXQgPSAnLy8gY29uY2F0ZW5hdGVkIGNvbXBvbmVudHMuanMnO1xuQ09OQ0FUX1NPVVJDRVMuZm9yRWFjaChzb3VyY2UgPT4ge1xuICBjb25zdCBjb250ZW50cyA9IHJlYWRGaWxlU3luYyhzb3VyY2UsICd1dGY4Jyk7XG4gIGNvbnN0IG5hbWUgPSBiYXNlbmFtZShzb3VyY2UpO1xuXG4gIGNvbnNvbGUubG9nKGBDb25jYXRlbmF0aW5nICR7c291cmNlfWApO1xuICBjb25jYXQgKz0gYFxcblxcbi8vICR7bmFtZX1cXG4ke2NvbnRlbnRzfWA7XG59KTtcblxuY29uc29sZS5sb2coYFdyaXRpbmcgdG8gJHtDT05DQVRfVEFSR0VUfWApO1xud3JpdGVGaWxlU3luYyhDT05DQVRfVEFSR0VULCBjb25jYXQpO1xuXG4vLyBDb3B5XG5cbmNvbnNvbGUubG9nKCk7XG5jb25zb2xlLmxvZygnQ29weWluZy4uLicpO1xuXG5jb25zdCBCQVNFX0pTID0gam9pbihfX2Rpcm5hbWUsICcuLi8uLi9qcycpO1xuY29uc3QgQ09QWV9TT1VSQ0VTID0gW1xuICB7XG4gICAgc3JjOiBqb2luKEJBU0VfQk9XRVIsICdtcDNsYW1lZW5jb2Rlci9saWIvTXAzTGFtZUVuY29kZXIuanMnKSxcbiAgICBkZXN0OiBqb2luKEJBU0VfSlMsICdNcDNMYW1lRW5jb2Rlci5taW4uanMnKSxcbiAgfSxcbiAge1xuICAgIHNyYzogam9pbihCQVNFX0JPV0VSLCAnd2ViYXVkaW9yZWNvcmRlci9saWIvV2ViQXVkaW9SZWNvcmRlck1wMy5qcycpLFxuICAgIGRlc3Q6IGpvaW4oQkFTRV9KUywgJ1dlYkF1ZGlvUmVjb3JkZXJNcDMuanMnKSxcbiAgfSxcbl07XG5cbmZvciAoY29uc3QgeyBzcmMsIGRlc3QgfSBvZiBDT1BZX1NPVVJDRVMpIHtcbiAgY29uc29sZS5sb2coYENvcHlpbmcgJHtzcmN9IHRvICR7ZGVzdH1gKTtcbiAgY29weUZpbGVTeW5jKHNyYywgZGVzdCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiQUFHQSxrQkFBK0I7QUFDL0IsZ0JBQTBEO0FBSTFELFFBQVEsSUFBSSxrQkFBa0I7QUFFOUIsTUFBTSxhQUFhLHNCQUFLLFdBQVcsa0JBQWtCO0FBQ3JELE1BQU0sWUFBWSxzQkFBSyxXQUFXLG9CQUFvQjtBQUN0RCxNQUFNLGdCQUFnQixzQkFBSyxXQUFXLHdCQUF3QjtBQUM5RCxNQUFNLGlCQUFpQjtBQUFBLEVBQ3JCLHNCQUFLLFdBQVcsdUJBQXVCO0FBQUEsRUFDdkMsc0JBQUssV0FBVyxzQkFBc0I7QUFBQSxFQUN0QyxzQkFBSyxXQUFXLDBCQUEwQjtBQUFBLEVBQzFDLHNCQUFLLFlBQVksMENBQTBDO0FBQzdEO0FBRUEsSUFBSSxTQUFTO0FBQ2IsZUFBZSxRQUFRLFlBQVU7QUFDL0IsUUFBTSxXQUFXLDRCQUFhLFFBQVEsTUFBTTtBQUM1QyxRQUFNLE9BQU8sMEJBQVMsTUFBTTtBQUU1QixVQUFRLElBQUksaUJBQWlCLFFBQVE7QUFDckMsWUFBVTtBQUFBO0FBQUEsS0FBVTtBQUFBLEVBQVM7QUFDL0IsQ0FBQztBQUVELFFBQVEsSUFBSSxjQUFjLGVBQWU7QUFDekMsNkJBQWMsZUFBZSxNQUFNO0FBSW5DLFFBQVEsSUFBSTtBQUNaLFFBQVEsSUFBSSxZQUFZO0FBRXhCLE1BQU0sVUFBVSxzQkFBSyxXQUFXLFVBQVU7QUFDMUMsTUFBTSxlQUFlO0FBQUEsRUFDbkI7QUFBQSxJQUNFLEtBQUssc0JBQUssWUFBWSxzQ0FBc0M7QUFBQSxJQUM1RCxNQUFNLHNCQUFLLFNBQVMsdUJBQXVCO0FBQUEsRUFDN0M7QUFBQSxFQUNBO0FBQUEsSUFDRSxLQUFLLHNCQUFLLFlBQVksNkNBQTZDO0FBQUEsSUFDbkUsTUFBTSxzQkFBSyxTQUFTLHdCQUF3QjtBQUFBLEVBQzlDO0FBQ0Y7QUFFQSxXQUFXLEVBQUUsS0FBSyxVQUFVLGNBQWM7QUFDeEMsVUFBUSxJQUFJLFdBQVcsVUFBVSxNQUFNO0FBQ3ZDLDhCQUFhLEtBQUssSUFBSTtBQUN4QjsiLAogICJuYW1lcyI6IFtdCn0K
