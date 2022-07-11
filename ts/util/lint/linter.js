var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var fs = __toESM(require("fs"));
var import_path = require("path");
var import_normalize_path = __toESM(require("normalize-path"));
var import_p_map = __toESM(require("p-map"));
var import_fast_glob = __toESM(require("fast-glob"));
var import_types = require("./types");
var import_util = require("./util");
const ALL_REASONS = import_types.REASONS.join("|");
const rulesPath = (0, import_path.join)(__dirname, "rules.json");
const exceptionsPath = (0, import_path.join)(__dirname, "exceptions.json");
const basePath = (0, import_path.join)(__dirname, "../../..");
const searchPattern = (0, import_normalize_path.default)((0, import_path.join)(basePath, "**/*.{js,ts,tsx}"));
const excludedFilesRegexp = RegExp([
  "^release/",
  "^preload.bundle.js(LICENSE.txt|map)?",
  "^storybook-static/",
  "\\.d\\.ts$",
  ".+\\.stories\\.js",
  ".+\\.stories\\.tsx",
  "^ts/.+\\.js",
  "^app/.+(ts|js)",
  "^ts/models/messages.js",
  "^ts/models/messages.ts",
  "^ts/models/conversations.js",
  "^ts/models/conversations.ts",
  "^ts/views/conversation_view.js",
  "^ts/views/conversation_view.ts",
  "^ts/background.js",
  "^ts/background.ts",
  "^ts/Crypto.js",
  "^ts/Crypto.ts",
  "^ts/textsecure/MessageReceiver.js",
  "^ts/textsecure/MessageReceiver.ts",
  "^ts/ConversationController.js",
  "^ts/ConversationController.ts",
  "^ts/SignalProtocolStore.ts",
  "^ts/SignalProtocolStore.js",
  "^ts/textsecure/[^./]+.ts",
  "^ts/textsecure/[^./]+.js",
  "^js/components.js",
  "^js/curve/",
  "^js/util_worker.js",
  "^libtextsecure/test/test.js",
  "^sticker-creator/dist/bundle.js",
  "^test/test.js",
  "^ts/workers/heicConverter.bundle.js",
  "^ts/sql/mainWorker.bundle.js",
  "^js/Mp3LameEncoder.min.js",
  "^libtextsecure/test/.+",
  "^test/.+",
  "^ts/test[^/]*/.+",
  "^.github/.+",
  "^node_modules/@signalapp/libsignal-client/.+",
  "^node_modules/core-js-pure/.+",
  "^node_modules/core-js/.+",
  "^node_modules/fbjs/.+",
  "^node_modules/lodash/.+",
  "^node_modules/react/.+",
  "^node_modules/react-contextmenu/.+",
  "^node_modules/react-dom/.+",
  "^node_modules/react-dropzone/.+",
  "^node_modules/react-hot-loader/.+",
  "^node_modules/react-icon-base/.+",
  "^node_modules/react-input-autosize/.+",
  "^node_modules/react-measure/.+",
  "^node_modules/react-popper/.+",
  "^node_modules/react-redux/.+",
  "^node_modules/react-router/.+",
  "^node_modules/react-router-dom/.+",
  "^node_modules/react-select/.+",
  "^node_modules/react-sortable-hoc/.+",
  "^node_modules/react-transition-group/.+",
  "^node_modules/react-virtualized/.+",
  "^node_modules/reactcss/.+",
  "^node_modules/snyk/.+",
  "^node_modules/snyk-resolve-deps/.+",
  "^node_modules/snyk-try-require/.+",
  "^node_modules/@snyk/.+",
  "^node_modules/react-color/.+/(?:core-js|fbjs|lodash)/.+",
  "^node_modules/@babel/.+",
  "^node_modules/@chanzuckerberg/axe-storybook-testing/.+",
  "^node_modules/@signalapp/mock-server/.+",
  "^node_modules/@svgr/.+",
  "^node_modules/@types/.+",
  "^node_modules/@webassemblyjs/.+",
  "^node_modules/@electron/.+",
  "^node_modules/ajv/.+",
  "^node_modules/ajv-keywords/.+",
  "^node_modules/amdefine/.+",
  "^node_modules/ansi-styles/.+",
  "^node_modules/ansi-colors/.+",
  "^node_modules/anymatch/.+",
  "^node_modules/app-builder-lib/.+",
  "^node_modules/asn1\\.js/.+",
  "^node_modules/autoprefixer/.+",
  "^node_modules/babel.+",
  "^node_modules/bluebird/.+",
  "^node_modules/body-parser/.+",
  "^node_modules/bower/.+",
  "^node_modules/braces/.+",
  "^node_modules/buble/.+",
  "^node_modules/builder-util-runtime/.+",
  "^node_modules/builder-util/.+",
  "^node_modules/catharsis/.+",
  "^node_modules/chai/.+",
  "^node_modules/chokidar/.+",
  "^node_modules/clean-css/.+",
  "^node_modules/cli-table2/.+",
  "^node_modules/cliui/.+",
  "^node_modules/codemirror/.+",
  "^node_modules/coffee-script/.+",
  "^node_modules/compression/.+",
  "^node_modules/cross-env/.+",
  "^node_modules/css-loader/.+",
  "^node_modules/css-modules-loader-core/.+",
  "^node_modules/css-selector-tokenizer/.+",
  "^node_modules/css-tree/.+",
  "^node_modules/csso/.+",
  "^node_modules/default-gateway/.+",
  "^node_modules/degenerator/.+",
  "^node_modules/detect-port-alt/.+",
  "^node_modules/dmg-builder/.+",
  "^node_modules/electron-builder/.+",
  "^node_modules/electron-chromedriver/.+",
  "^node_modules/electron-icon-maker/.+",
  "^node_modules/electron-mocha/",
  "^node_modules/electron-osx-sign/.+",
  "^node_modules/electron-publish/.+",
  "^node_modules/emotion/.+",
  "^node_modules/es-abstract/.+",
  "^node_modules/es5-shim/.+",
  "^node_modules/es6-shim/.+",
  "^node_modules/esbuild/.+",
  "^node_modules/escodegen/.+",
  "^node_modules/eslint.+",
  "^node_modules/@typescript-eslint.+",
  "^node_modules/esprima/.+",
  "^node_modules/express/.+",
  "^node_modules/fast-glob/.+",
  "^node_modules/file-loader/.+",
  "^node_modules/file-system-cache/.+",
  "^node_modules/finalhandler/.+",
  "^node_modules/foreground-chat/.+",
  "^node_modules/fsevents/.+",
  "^node_modules/gauge/.+",
  "^node_modules/global-agent/.+",
  "^node_modules/globule/.+",
  "^node_modules/handle-thing/.+",
  "^node_modules/handlebars/.+",
  "^node_modules/har-validator/.+",
  "^node_modules/highlight\\.js/.+",
  "^node_modules/hpack\\.js/.+",
  "^node_modules/http-proxy-middlewar/.+",
  "^node_modules/icss-utils/.+",
  "^node_modules/intl-tel-input/examples/.+",
  "^node_modules/istanbul.+",
  "^node_modules/jimp/.+",
  "^node_modules/jquery/.+",
  "^node_modules/jake/.+",
  "^node_modules/jss-global/.+",
  "^node_modules/jss/.+",
  "^node_modules/liftup/.+",
  "^node_modules/livereload-js/.+",
  "^node_modules/lolex/.+",
  "^node_modules/log-symbols/.+",
  "^node_modules/magic-string/.+",
  "^node_modules/markdown-it/.+",
  "^node_modules/meow/.+",
  "^node_modules/minimatch/.+",
  "^node_modules/mocha/.+",
  "^node_modules/needle/.+",
  "^node_modules/nise/.+",
  "^node_modules/node-gyp/.+",
  "^node_modules/npm-run-all/.+",
  "^node_modules/nsp/.+",
  "^node_modules/nyc/.+",
  "^node_modules/optionator/.+",
  "^node_modules/plist/.+",
  "^node_modules/phantomjs-prebuilt/.+",
  "^node_modules/playwright/.+",
  "^node_modules/playwright-core/.+",
  "^node_modules/postcss.+",
  "^node_modules/preserve/.+",
  "^node_modules/prettier/.+",
  "^node_modules/prop-types/.+",
  "^node_modules/protobufjs/cli/.+",
  "^node_modules/ramda/.+",
  "^node_modules/react-dev-utils/.+",
  "^node_modules/react-docgen/.+",
  "^node_modules/react-error-overlay/.+",
  "^node_modules/read-config-file/.+",
  "^node_modules/read-pkg/.+",
  "^node_modules/recast/.+",
  "^node_modules/reduce-css-calc/.+",
  "^node_modules/requizzle/.+",
  "^node_modules/resolve/.+",
  "^node_modules/sass-graph/.+",
  "^node_modules/sass-loader/.+",
  "^node_modules/sass/.+",
  "^node_modules/schema-utils/.+",
  "^node_modules/scss-tokenizer/.+",
  "^node_modules/send/.+",
  "^node_modules/serve-index/.+",
  "^node_modules/sinon/.+",
  "^node_modules/snapdragon-util/.+",
  "^node_modules/snapdragon/.+",
  "^node_modules/sockjs-client/.+",
  "^node_modules/style-loader/.+",
  "^node_modules/svgo/.+",
  "^node_modules/terser/.+",
  "^node_modules/testcheck/.+",
  "^node_modules/text-encoding/.+",
  "^node_modules/tiny-lr/.+",
  "^node_modules/tinycolor2/.+",
  "^node_modules/to-ast/.+",
  "^node_modules/trough/.+",
  "^node_modules/ts-loader/.+",
  "^node_modules/ts-node/.+",
  "^node_modules/tweetnacl/.+",
  "^node_modules/typed-scss-modules/.+",
  "^node_modules/typescript/.+",
  "^node_modules/uglify-es/.+",
  "^node_modules/uglify-js/.+",
  "^node_modules/url-loader/.+",
  "^node_modules/use/.+",
  "^node_modules/vary/.+",
  "^node_modules/vm-browserify/.+",
  "^node_modules/webdriverio/.+",
  "^node_modules/webpack/.+",
  "^node_modules/xml-parse-from-string/.+",
  "^node_modules/xmlbuilder/.+",
  "^node_modules/xmldom/.+",
  "^node_modules/yargs-unparser/",
  "^node_modules/yargs/.+",
  "^node_modules/find-yarn-workspace-root/.+",
  "^node_modules/update-notifier/.+",
  "^node_modules/windows-release/.+",
  "^node_modules/@emotion/.+",
  "^node_modules/@storybook/.+",
  "^node_modules/cosmiconfig/.+",
  "^node_modules/create-emotion/.+",
  "^node_modules/fork-ts-checker-webpack-plugin/.+",
  "^node_modules/gzip-size/.+",
  "^node_modules/markdown-to-jsx/.+",
  "^node_modules/mini-css-extract-plugin/.+",
  "^node_modules/polished.+",
  "^node_modules/prismjs/.+",
  "^node_modules/react-draggable/.+",
  "^node_modules/refractor/.+",
  "^node_modules/regexpu-core/.+",
  "^node_modules/shelljs/.+",
  "^node_modules/simplebar/.+",
  "^node_modules/store2/.+",
  "^node_modules/telejson/.+",
  "^node_modules/watchpack-chokidar2/.+",
  "^node_modules/css-select/.+",
  "^node_modules/dotenv-webpack/.+",
  "^node_modules/follow-redirects/.+",
  "^node_modules/html-webpack-plugin/.+",
  "^node_modules/selfsigned/.+",
  "^node_modules/portfinder/.+",
  "^node_modules/renderkid/.+",
  "^node_modules/spdy-transport/.+",
  "^node_modules/spdy/.+",
  "^node_modules/uglifyjs-webpack-plugin/.+",
  "^node_modules/v8-compile-cache/.+",
  "^node_modules/watchpack/.+",
  "^node_modules/webpack-cli/.+",
  "^node_modules/webpack-dev-middleware/.+",
  "^node_modules/webpack-dev-server/.+",
  "^node_modules/webpack-hot-middleware/.+",
  "^node_modules/webpack-merge/.+",
  "^node_modules/webpack/.+"
].join("|"));
function setupRules(allRules) {
  allRules.forEach((rule, index) => {
    if (!rule.name) {
      throw new Error(`Rule at index ${index} is missing a name`);
    }
    if (!rule.expression) {
      throw new Error(`Rule '${rule.name}' is missing an expression`);
    }
    rule.regex = new RegExp(rule.expression, "g");
  });
}
async function main(argv) {
  const shouldRemoveUnusedExceptions = argv.includes("--remove-unused-exceptions");
  const now = new Date();
  const rules = (0, import_util.loadJSON)(rulesPath);
  setupRules(rules);
  const exceptions = (0, import_util.loadJSON)(exceptionsPath);
  let unusedExceptions = exceptions;
  const results = [];
  let scannedCount = 0;
  await (0, import_p_map.default)(await (0, import_fast_glob.default)(searchPattern, { onlyFiles: true }), async (file) => {
    const relativePath = (0, import_path.relative)(basePath, file).replace(/\\/g, "/");
    const isFileExcluded = excludedFilesRegexp.test(relativePath);
    if (isFileExcluded) {
      return;
    }
    scannedCount += 1;
    const lines = (await fs.promises.readFile(file, import_util.ENCODING)).split(/\r?\n/);
    rules.forEach((rule) => {
      const excludedModules = rule.excludedModules || [];
      if (excludedModules.some((module2) => relativePath.startsWith(module2))) {
        return;
      }
      lines.forEach((line) => {
        if (!rule.regex.test(line)) {
          return;
        }
        if (rule.expression) {
          rule.regex = new RegExp(rule.expression, "g");
        }
        const matchedException = unusedExceptions.find((exception) => exception.rule === rule.name && exception.path === relativePath && (line.length < 300 ? exception.line === line : exception.line === void 0));
        if (matchedException) {
          unusedExceptions = unusedExceptions.filter((exception) => exception !== matchedException);
        } else {
          results.push({
            rule: rule.name,
            path: relativePath,
            line: line.length < 300 ? line : void 0,
            reasonCategory: ALL_REASONS,
            updated: now.toJSON(),
            reasonDetail: "<optional>"
          });
        }
      });
    });
  }, { concurrency: 100 });
  let unusedExceptionsLogMessage;
  if (shouldRemoveUnusedExceptions && unusedExceptions.length) {
    unusedExceptionsLogMessage = `${unusedExceptions.length} unused exceptions (automatically removed),`;
    const unusedExceptionsSet = new Set(unusedExceptions);
    const newExceptions = exceptions.filter((exception) => !unusedExceptionsSet.has(exception));
    (0, import_util.writeExceptions)(exceptionsPath, newExceptions);
    unusedExceptions = [];
  } else {
    unusedExceptionsLogMessage = `${unusedExceptions.length} unused exceptions,`;
  }
  console.log(`${scannedCount} files scanned.`, `${results.length} questionable lines,`, unusedExceptionsLogMessage, `${exceptions.length} total exceptions.`);
  if (results.length === 0 && unusedExceptions.length === 0) {
    process.exit();
  }
  console.log();
  console.log("Questionable lines:");
  console.log(JSON.stringify((0, import_util.sortExceptions)(results), null, "  "));
  if (unusedExceptions.length) {
    console.log();
    console.log("Unused exceptions! Run with --remove-unused-exceptions to automatically remove them.");
    console.log(JSON.stringify((0, import_util.sortExceptions)(unusedExceptions), null, "  "));
  }
  process.exit(1);
}
main(process.argv).catch((err) => {
  console.error(err);
  process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGludGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgam9pbiwgcmVsYXRpdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBub3JtYWxpemVQYXRoIGZyb20gJ25vcm1hbGl6ZS1wYXRoJztcbmltcG9ydCBwTWFwIGZyb20gJ3AtbWFwJztcbmltcG9ydCBGYXN0R2xvYiBmcm9tICdmYXN0LWdsb2InO1xuXG5pbXBvcnQgdHlwZSB7IEV4Y2VwdGlvblR5cGUsIFJ1bGVUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBSRUFTT05TIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBFTkNPRElORywgbG9hZEpTT04sIHNvcnRFeGNlcHRpb25zLCB3cml0ZUV4Y2VwdGlvbnMgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBBTExfUkVBU09OUyA9IFJFQVNPTlMuam9pbignfCcpO1xuXG5jb25zdCBydWxlc1BhdGggPSBqb2luKF9fZGlybmFtZSwgJ3J1bGVzLmpzb24nKTtcbmNvbnN0IGV4Y2VwdGlvbnNQYXRoID0gam9pbihfX2Rpcm5hbWUsICdleGNlcHRpb25zLmpzb24nKTtcbmNvbnN0IGJhc2VQYXRoID0gam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLicpO1xuXG5jb25zdCBzZWFyY2hQYXR0ZXJuID0gbm9ybWFsaXplUGF0aChqb2luKGJhc2VQYXRoLCAnKiovKi57anMsdHMsdHN4fScpKTtcblxuY29uc3QgZXhjbHVkZWRGaWxlc1JlZ2V4cCA9IFJlZ0V4cChcbiAgW1xuICAgICdecmVsZWFzZS8nLFxuICAgICdecHJlbG9hZC5idW5kbGUuanMoTElDRU5TRS50eHR8bWFwKT8nLFxuICAgICdec3Rvcnlib29rLXN0YXRpYy8nLFxuXG4gICAgLy8gTm9uLWRpc3RyaWJ1dGVkIGZpbGVzXG4gICAgJ1xcXFwuZFxcXFwudHMkJyxcbiAgICAnLitcXFxcLnN0b3JpZXNcXFxcLmpzJyxcbiAgICAnLitcXFxcLnN0b3JpZXNcXFxcLnRzeCcsXG5cbiAgICAvLyBDb21waWxlZCBmaWxlc1xuICAgICdedHMvLitcXFxcLmpzJyxcblxuICAgIC8vIEhpZ2gtdHJhZmZpYyBmaWxlcyBpbiBvdXIgcHJvamVjdFxuICAgICdeYXBwLy4rKHRzfGpzKScsXG4gICAgJ150cy9tb2RlbHMvbWVzc2FnZXMuanMnLFxuICAgICdedHMvbW9kZWxzL21lc3NhZ2VzLnRzJyxcbiAgICAnXnRzL21vZGVscy9jb252ZXJzYXRpb25zLmpzJyxcbiAgICAnXnRzL21vZGVscy9jb252ZXJzYXRpb25zLnRzJyxcbiAgICAnXnRzL3ZpZXdzL2NvbnZlcnNhdGlvbl92aWV3LmpzJyxcbiAgICAnXnRzL3ZpZXdzL2NvbnZlcnNhdGlvbl92aWV3LnRzJyxcbiAgICAnXnRzL2JhY2tncm91bmQuanMnLFxuICAgICdedHMvYmFja2dyb3VuZC50cycsXG4gICAgJ150cy9DcnlwdG8uanMnLFxuICAgICdedHMvQ3J5cHRvLnRzJyxcbiAgICAnXnRzL3RleHRzZWN1cmUvTWVzc2FnZVJlY2VpdmVyLmpzJyxcbiAgICAnXnRzL3RleHRzZWN1cmUvTWVzc2FnZVJlY2VpdmVyLnRzJyxcbiAgICAnXnRzL0NvbnZlcnNhdGlvbkNvbnRyb2xsZXIuanMnLFxuICAgICdedHMvQ29udmVyc2F0aW9uQ29udHJvbGxlci50cycsXG4gICAgJ150cy9TaWduYWxQcm90b2NvbFN0b3JlLnRzJyxcbiAgICAnXnRzL1NpZ25hbFByb3RvY29sU3RvcmUuanMnLFxuICAgICdedHMvdGV4dHNlY3VyZS9bXi4vXSsudHMnLFxuICAgICdedHMvdGV4dHNlY3VyZS9bXi4vXSsuanMnLFxuXG4gICAgLy8gR2VuZXJhdGVkIGZpbGVzXG4gICAgJ15qcy9jb21wb25lbnRzLmpzJyxcbiAgICAnXmpzL2N1cnZlLycsXG4gICAgJ15qcy91dGlsX3dvcmtlci5qcycsXG4gICAgJ15saWJ0ZXh0c2VjdXJlL3Rlc3QvdGVzdC5qcycsXG4gICAgJ15zdGlja2VyLWNyZWF0b3IvZGlzdC9idW5kbGUuanMnLFxuICAgICdedGVzdC90ZXN0LmpzJyxcbiAgICAnXnRzL3dvcmtlcnMvaGVpY0NvbnZlcnRlci5idW5kbGUuanMnLFxuICAgICdedHMvc3FsL21haW5Xb3JrZXIuYnVuZGxlLmpzJyxcblxuICAgIC8vIENvcGllZCBmcm9tIGRlcGVuZGVuY3lcbiAgICAnXmpzL01wM0xhbWVFbmNvZGVyLm1pbi5qcycsXG5cbiAgICAvLyBUZXN0IGZpbGVzXG4gICAgJ15saWJ0ZXh0c2VjdXJlL3Rlc3QvLisnLFxuICAgICdedGVzdC8uKycsXG4gICAgJ150cy90ZXN0W14vXSovLisnLFxuXG4gICAgLy8gR2l0aHViIHdvcmtmbG93c1xuICAgICdeLmdpdGh1Yi8uKycsXG5cbiAgICAvLyBNb2R1bGVzIHdlIHRydXN0XG4gICAgJ15ub2RlX21vZHVsZXMvQHNpZ25hbGFwcC9saWJzaWduYWwtY2xpZW50Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jb3JlLWpzLXB1cmUvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2NvcmUtanMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2ZianMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2xvZGFzaC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcmVhY3QvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LWNvbnRleHRtZW51Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1kb20vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LWRyb3B6b25lLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1ob3QtbG9hZGVyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1pY29uLWJhc2UvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LWlucHV0LWF1dG9zaXplLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1tZWFzdXJlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1wb3BwZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LXJvdXRlci1kb20vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcmVhY3Qtc29ydGFibGUtaG9jLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC10cmFuc2l0aW9uLWdyb3VwLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC12aXJ0dWFsaXplZC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcmVhY3Rjc3MvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NueWsvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NueWstcmVzb2x2ZS1kZXBzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9zbnlrLXRyeS1yZXF1aXJlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9Ac255ay8uKycsXG5cbiAgICAvLyBTdWJtb2R1bGVzIHdlIHRydXN0XG4gICAgJ15ub2RlX21vZHVsZXMvcmVhY3QtY29sb3IvLisvKD86Y29yZS1qc3xmYmpzfGxvZGFzaCkvLisnLFxuXG4gICAgLy8gTW9kdWxlcyB1c2VkIG9ubHkgaW4gdGVzdC9kZXZlbG9wbWVudCBzY2VuYXJpb3NcbiAgICAnXm5vZGVfbW9kdWxlcy9AYmFiZWwvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL0BjaGFuenVja2VyYmVyZy9heGUtc3Rvcnlib29rLXRlc3RpbmcvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL0BzaWduYWxhcHAvbW9jay1zZXJ2ZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL0BzdmdyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9AdHlwZXMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL0B3ZWJhc3NlbWJseWpzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9AZWxlY3Ryb24vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Fqdi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvYWp2LWtleXdvcmRzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9hbWRlZmluZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvYW5zaS1zdHlsZXMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Fuc2ktY29sb3JzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9hbnltYXRjaC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvYXBwLWJ1aWxkZXItbGliLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9hc24xXFxcXC5qcy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9iYWJlbC4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9ibHVlYmlyZC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvYm9keS1wYXJzZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Jvd2VyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9icmFjZXMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2J1YmxlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9idWlsZGVyLXV0aWwtcnVudGltZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvYnVpbGRlci11dGlsLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jYXRoYXJzaXMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2NoYWkvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Nob2tpZGFyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jbGVhbi1jc3MvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2NsaS10YWJsZTIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2NsaXVpLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jb2RlbWlycm9yLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jb2ZmZWUtc2NyaXB0Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jb21wcmVzc2lvbi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvY3Jvc3MtZW52Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jc3MtbG9hZGVyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jc3MtbW9kdWxlcy1sb2FkZXItY29yZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvY3NzLXNlbGVjdG9yLXRva2VuaXplci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvY3NzLXRyZWUvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Nzc28vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2RlZmF1bHQtZ2F0ZXdheS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZGVnZW5lcmF0b3IvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2RldGVjdC1wb3J0LWFsdC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZG1nLWJ1aWxkZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2VsZWN0cm9uLWJ1aWxkZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2VsZWN0cm9uLWNocm9tZWRyaXZlci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZWxlY3Ryb24taWNvbi1tYWtlci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZWxlY3Ryb24tbW9jaGEvJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9lbGVjdHJvbi1vc3gtc2lnbi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZWxlY3Ryb24tcHVibGlzaC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZW1vdGlvbi8uKycsIC8vIEN1cnJlbnRseSBvbmx5IHVzZWQgaW4gc3Rvcnlib29rXG4gICAgJ15ub2RlX21vZHVsZXMvZXMtYWJzdHJhY3QvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2VzNS1zaGltLy4rJywgLy8gQ3VycmVudGx5IG9ubHkgdXNlZCBpbiBzdG9yeWJvb2tcbiAgICAnXm5vZGVfbW9kdWxlcy9lczYtc2hpbS8uKycsIC8vIEN1cnJlbnRseSBvbmx5IHVzZWQgaW4gc3Rvcnlib29rXG4gICAgJ15ub2RlX21vZHVsZXMvZXNidWlsZC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZXNjb2RlZ2VuLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9lc2xpbnQuKycsXG4gICAgJ15ub2RlX21vZHVsZXMvQHR5cGVzY3JpcHQtZXNsaW50LisnLFxuICAgICdebm9kZV9tb2R1bGVzL2VzcHJpbWEvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2V4cHJlc3MvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Zhc3QtZ2xvYi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZmlsZS1sb2FkZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2ZpbGUtc3lzdGVtLWNhY2hlLy4rJywgLy8gQ3VycmVudGx5IG9ubHkgdXNlZCBpbiBzdG9yeWJvb2tcbiAgICAnXm5vZGVfbW9kdWxlcy9maW5hbGhhbmRsZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2ZvcmVncm91bmQtY2hhdC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZnNldmVudHMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2dhdWdlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9nbG9iYWwtYWdlbnQvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2dsb2J1bGUvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2hhbmRsZS10aGluZy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvaGFuZGxlYmFycy8uKycsIC8vIFVzZWQgYnkgbnljI2lzdGFuYnVsLXJlcG9ydHNcbiAgICAnXm5vZGVfbW9kdWxlcy9oYXItdmFsaWRhdG9yLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9oaWdobGlnaHRcXFxcLmpzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9ocGFja1xcXFwuanMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2h0dHAtcHJveHktbWlkZGxld2FyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9pY3NzLXV0aWxzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9pbnRsLXRlbC1pbnB1dC9leGFtcGxlcy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvaXN0YW5idWwuKycsXG4gICAgJ15ub2RlX21vZHVsZXMvamltcC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvanF1ZXJ5Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9qYWtlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9qc3MtZ2xvYmFsLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9qc3MvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2xpZnR1cC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvbGl2ZXJlbG9hZC1qcy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvbG9sZXgvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2xvZy1zeW1ib2xzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9tYWdpYy1zdHJpbmcvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL21hcmtkb3duLWl0Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9tZW93Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9taW5pbWF0Y2gvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL21vY2hhLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9uZWVkbGUvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL25pc2UvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL25vZGUtZ3lwLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9ucG0tcnVuLWFsbC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvbnNwLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9ueWMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL29wdGlvbmF0b3IvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3BsaXN0Ly4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9waGFudG9tanMtcHJlYnVpbHQvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3BsYXl3cmlnaHQvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3BsYXl3cmlnaHQtY29yZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcG9zdGNzcy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9wcmVzZXJ2ZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcHJldHRpZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3Byb3RvYnVmanMvY2xpLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yYW1kYS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcmVhY3QtZGV2LXV0aWxzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFjdC1kb2NnZW4vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LWVycm9yLW92ZXJsYXkvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWQtY29uZmlnLWZpbGUvLisnLCAvLyBVc2VkIGJ5IGVsZWN0cm9uLWJ1aWxkZXJcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWFkLXBrZy8uKycsIC8vIFVzZWQgYnkgbnBtLXJ1bi1hbGxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWNhc3QvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlZHVjZS1jc3MtY2FsYy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcmVxdWl6emxlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZXNvbHZlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9zYXNzLWdyYXBoLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvc2Fzcy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvc2NoZW1hLXV0aWxzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9zY3NzLXRva2VuaXplci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvc2VuZC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvc2VydmUtaW5kZXgvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3Npbm9uLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9zbmFwZHJhZ29uLXV0aWwvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NuYXBkcmFnb24vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NvY2tqcy1jbGllbnQvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvc3Znby8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdGVyc2VyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy90ZXN0Y2hlY2svLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3RleHQtZW5jb2RpbmcvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3RpbnktbHIvLisnLCAvLyBVc2VkIGJ5IGdydW50LWNvbnRyaWItd2F0Y2hcbiAgICAnXm5vZGVfbW9kdWxlcy90aW55Y29sb3IyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy90by1hc3QvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3Ryb3VnaC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdHMtbG9hZGVyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy90cy1ub2RlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy90d2VldG5hY2wvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3R5cGVkLXNjc3MtbW9kdWxlcy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdHlwZXNjcmlwdC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdWdsaWZ5LWVzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy91Z2xpZnktanMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3VybC1sb2FkZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3VzZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdmFyeS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdm0tYnJvd3NlcmlmeS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvd2ViZHJpdmVyaW8vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3dlYnBhY2svLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3htbC1wYXJzZS1mcm9tLXN0cmluZy8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMveG1sYnVpbGRlci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMveG1sZG9tLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy95YXJncy11bnBhcnNlci8nLFxuICAgICdebm9kZV9tb2R1bGVzL3lhcmdzLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9maW5kLXlhcm4td29ya3NwYWNlLXJvb3QvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3VwZGF0ZS1ub3RpZmllci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvd2luZG93cy1yZWxlYXNlLy4rJyxcblxuICAgIC8vIFVzZWQgYnkgU3Rvcnlib29rXG4gICAgJ15ub2RlX21vZHVsZXMvQGVtb3Rpb24vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL0BzdG9yeWJvb2svLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2Nvc21pY29uZmlnLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9jcmVhdGUtZW1vdGlvbi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvZm9yay10cy1jaGVja2VyLXdlYnBhY2stcGx1Z2luLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9nemlwLXNpemUvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL21hcmtkb3duLXRvLWpzeC8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3BvbGlzaGVkLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3ByaXNtanMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlYWN0LWRyYWdnYWJsZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvcmVmcmFjdG9yLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy9yZWdleHB1LWNvcmUvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NoZWxsanMvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NpbXBsZWJhci8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvc3RvcmUyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy90ZWxlanNvbi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvd2F0Y2hwYWNrLWNob2tpZGFyMi8uKycsXG5cbiAgICAvLyBVc2VkIGJ5IFdlYnBhY2tcbiAgICAnXm5vZGVfbW9kdWxlcy9jc3Mtc2VsZWN0Ly4rJywgLy8gVXNlZCBieSBodG1sLXdlYnBhY2stcGx1Z2luXG4gICAgJ15ub2RlX21vZHVsZXMvZG90ZW52LXdlYnBhY2svLisnLFxuICAgICdebm9kZV9tb2R1bGVzL2ZvbGxvdy1yZWRpcmVjdHMvLisnLCAvLyBVc2VkIGJ5IHdlYnBhY2stZGV2LXNlcnZlclxuICAgICdebm9kZV9tb2R1bGVzL2h0bWwtd2VicGFjay1wbHVnaW4vLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3NlbGZzaWduZWQvLisnLCAvLyBVc2VkIGJ5IHdlYnBhY2stZGV2LXNlcnZlclxuICAgICdebm9kZV9tb2R1bGVzL3BvcnRmaW5kZXIvLisnLFxuICAgICdebm9kZV9tb2R1bGVzL3JlbmRlcmtpZC8uKycsIC8vIFVzZWQgYnkgaHRtbC13ZWJwYWNrLXBsdWdpblxuICAgICdebm9kZV9tb2R1bGVzL3NwZHktdHJhbnNwb3J0Ly4rJywgLy8gVXNlZCBieSB3ZWJwYWNrLWRldi1zZXJ2ZXJcbiAgICAnXm5vZGVfbW9kdWxlcy9zcGR5Ly4rJywgLy8gVXNlZCBieSB3ZWJwYWNrLWRldi1zZXJ2ZXJcbiAgICAnXm5vZGVfbW9kdWxlcy91Z2xpZnlqcy13ZWJwYWNrLXBsdWdpbi8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvdjgtY29tcGlsZS1jYWNoZS8uKycsIC8vIFVzZWQgYnkgd2VicGFjay1jbGlcbiAgICAnXm5vZGVfbW9kdWxlcy93YXRjaHBhY2svLisnLCAvLyBVc2VkIGJ5IHdlYnBhY2tcbiAgICAnXm5vZGVfbW9kdWxlcy93ZWJwYWNrLWNsaS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtbWlkZGxld2FyZS8uKycsXG4gICAgJ15ub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy93ZWJwYWNrLWhvdC1taWRkbGV3YXJlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy93ZWJwYWNrLW1lcmdlLy4rJyxcbiAgICAnXm5vZGVfbW9kdWxlcy93ZWJwYWNrLy4rJyxcbiAgXS5qb2luKCd8Jylcbik7XG5cbmZ1bmN0aW9uIHNldHVwUnVsZXMoYWxsUnVsZXM6IEFycmF5PFJ1bGVUeXBlPikge1xuICBhbGxSdWxlcy5mb3JFYWNoKChydWxlOiBSdWxlVHlwZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIGlmICghcnVsZS5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJ1bGUgYXQgaW5kZXggJHtpbmRleH0gaXMgbWlzc2luZyBhIG5hbWVgKTtcbiAgICB9XG5cbiAgICBpZiAoIXJ1bGUuZXhwcmVzc2lvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSdWxlICcke3J1bGUubmFtZX0nIGlzIG1pc3NpbmcgYW4gZXhwcmVzc2lvbmApO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHJ1bGUucmVnZXggPSBuZXcgUmVnRXhwKHJ1bGUuZXhwcmVzc2lvbiwgJ2cnKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oYXJndjogUmVhZG9ubHlBcnJheTxzdHJpbmc+KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHNob3VsZFJlbW92ZVVudXNlZEV4Y2VwdGlvbnMgPSBhcmd2LmluY2x1ZGVzKFxuICAgICctLXJlbW92ZS11bnVzZWQtZXhjZXB0aW9ucydcbiAgKTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gIGNvbnN0IHJ1bGVzOiBBcnJheTxSdWxlVHlwZT4gPSBsb2FkSlNPTihydWxlc1BhdGgpO1xuICBzZXR1cFJ1bGVzKHJ1bGVzKTtcblxuICBjb25zdCBleGNlcHRpb25zOiBBcnJheTxFeGNlcHRpb25UeXBlPiA9IGxvYWRKU09OKGV4Y2VwdGlvbnNQYXRoKTtcbiAgbGV0IHVudXNlZEV4Y2VwdGlvbnMgPSBleGNlcHRpb25zO1xuXG4gIGNvbnN0IHJlc3VsdHM6IEFycmF5PEV4Y2VwdGlvblR5cGU+ID0gW107XG4gIGxldCBzY2FubmVkQ291bnQgPSAwO1xuXG4gIGF3YWl0IHBNYXAoXG4gICAgYXdhaXQgRmFzdEdsb2Ioc2VhcmNoUGF0dGVybiwgeyBvbmx5RmlsZXM6IHRydWUgfSksXG4gICAgYXN5bmMgKGZpbGU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcmVsYXRpdmUoYmFzZVBhdGgsIGZpbGUpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcblxuICAgICAgY29uc3QgaXNGaWxlRXhjbHVkZWQgPSBleGNsdWRlZEZpbGVzUmVnZXhwLnRlc3QocmVsYXRpdmVQYXRoKTtcbiAgICAgIGlmIChpc0ZpbGVFeGNsdWRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNjYW5uZWRDb3VudCArPSAxO1xuXG4gICAgICBjb25zdCBsaW5lcyA9IChhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShmaWxlLCBFTkNPRElORykpLnNwbGl0KC9cXHI/XFxuLyk7XG5cbiAgICAgIHJ1bGVzLmZvckVhY2goKHJ1bGU6IFJ1bGVUeXBlKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4Y2x1ZGVkTW9kdWxlcyA9IHJ1bGUuZXhjbHVkZWRNb2R1bGVzIHx8IFtdO1xuICAgICAgICBpZiAoZXhjbHVkZWRNb2R1bGVzLnNvbWUobW9kdWxlID0+IHJlbGF0aXZlUGF0aC5zdGFydHNXaXRoKG1vZHVsZSkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCFydWxlLnJlZ2V4LnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVjcmVhdGUgdGhpcyBydWxlIHNpbmNlIGl0IGhhcyBnIGZsYWcsIGFuZCBjYXJyaWVzIGxvY2FsIHN0YXRlXG4gICAgICAgICAgaWYgKHJ1bGUuZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgICBydWxlLnJlZ2V4ID0gbmV3IFJlZ0V4cChydWxlLmV4cHJlc3Npb24sICdnJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgbWF0Y2hlZEV4Y2VwdGlvbiA9IHVudXNlZEV4Y2VwdGlvbnMuZmluZChcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9PlxuICAgICAgICAgICAgICBleGNlcHRpb24ucnVsZSA9PT0gcnVsZS5uYW1lICYmXG4gICAgICAgICAgICAgIGV4Y2VwdGlvbi5wYXRoID09PSByZWxhdGl2ZVBhdGggJiZcbiAgICAgICAgICAgICAgKGxpbmUubGVuZ3RoIDwgMzAwXG4gICAgICAgICAgICAgICAgPyBleGNlcHRpb24ubGluZSA9PT0gbGluZVxuICAgICAgICAgICAgICAgIDogZXhjZXB0aW9uLmxpbmUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKG1hdGNoZWRFeGNlcHRpb24pIHtcbiAgICAgICAgICAgIHVudXNlZEV4Y2VwdGlvbnMgPSB1bnVzZWRFeGNlcHRpb25zLmZpbHRlcihcbiAgICAgICAgICAgICAgZXhjZXB0aW9uID0+IGV4Y2VwdGlvbiAhPT0gbWF0Y2hlZEV4Y2VwdGlvblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgICAgcnVsZTogcnVsZS5uYW1lLFxuICAgICAgICAgICAgICBwYXRoOiByZWxhdGl2ZVBhdGgsXG4gICAgICAgICAgICAgIGxpbmU6IGxpbmUubGVuZ3RoIDwgMzAwID8gbGluZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgcmVhc29uQ2F0ZWdvcnk6IEFMTF9SRUFTT05TLFxuICAgICAgICAgICAgICB1cGRhdGVkOiBub3cudG9KU09OKCksXG4gICAgICAgICAgICAgIHJlYXNvbkRldGFpbDogJzxvcHRpb25hbD4nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy8gV2l0aG91dCB0aGlzLCB3ZSBtYXkgcnVuIGludG8gXCJ0b28gbWFueSBvcGVuIGZpbGVzXCIgZXJyb3JzLlxuICAgIHsgY29uY3VycmVuY3k6IDEwMCB9XG4gICk7XG5cbiAgbGV0IHVudXNlZEV4Y2VwdGlvbnNMb2dNZXNzYWdlOiBzdHJpbmc7XG5cbiAgaWYgKHNob3VsZFJlbW92ZVVudXNlZEV4Y2VwdGlvbnMgJiYgdW51c2VkRXhjZXB0aW9ucy5sZW5ndGgpIHtcbiAgICB1bnVzZWRFeGNlcHRpb25zTG9nTWVzc2FnZSA9IGAke3VudXNlZEV4Y2VwdGlvbnMubGVuZ3RofSB1bnVzZWQgZXhjZXB0aW9ucyAoYXV0b21hdGljYWxseSByZW1vdmVkKSxgO1xuXG4gICAgY29uc3QgdW51c2VkRXhjZXB0aW9uc1NldCA9IG5ldyBTZXQodW51c2VkRXhjZXB0aW9ucyk7XG4gICAgY29uc3QgbmV3RXhjZXB0aW9ucyA9IGV4Y2VwdGlvbnMuZmlsdGVyKFxuICAgICAgZXhjZXB0aW9uID0+ICF1bnVzZWRFeGNlcHRpb25zU2V0LmhhcyhleGNlcHRpb24pXG4gICAgKTtcbiAgICB3cml0ZUV4Y2VwdGlvbnMoZXhjZXB0aW9uc1BhdGgsIG5ld0V4Y2VwdGlvbnMpO1xuXG4gICAgdW51c2VkRXhjZXB0aW9ucyA9IFtdO1xuICB9IGVsc2Uge1xuICAgIHVudXNlZEV4Y2VwdGlvbnNMb2dNZXNzYWdlID0gYCR7dW51c2VkRXhjZXB0aW9ucy5sZW5ndGh9IHVudXNlZCBleGNlcHRpb25zLGA7XG4gIH1cblxuICBjb25zb2xlLmxvZyhcbiAgICBgJHtzY2FubmVkQ291bnR9IGZpbGVzIHNjYW5uZWQuYCxcbiAgICBgJHtyZXN1bHRzLmxlbmd0aH0gcXVlc3Rpb25hYmxlIGxpbmVzLGAsXG4gICAgdW51c2VkRXhjZXB0aW9uc0xvZ01lc3NhZ2UsXG4gICAgYCR7ZXhjZXB0aW9ucy5sZW5ndGh9IHRvdGFsIGV4Y2VwdGlvbnMuYFxuICApO1xuXG4gIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCAmJiB1bnVzZWRFeGNlcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIHByb2Nlc3MuZXhpdCgpO1xuICB9XG5cbiAgY29uc29sZS5sb2coKTtcbiAgY29uc29sZS5sb2coJ1F1ZXN0aW9uYWJsZSBsaW5lczonKTtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc29ydEV4Y2VwdGlvbnMocmVzdWx0cyksIG51bGwsICcgICcpKTtcblxuICBpZiAodW51c2VkRXhjZXB0aW9ucy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmxvZygpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ1VudXNlZCBleGNlcHRpb25zISBSdW4gd2l0aCAtLXJlbW92ZS11bnVzZWQtZXhjZXB0aW9ucyB0byBhdXRvbWF0aWNhbGx5IHJlbW92ZSB0aGVtLidcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHNvcnRFeGNlcHRpb25zKHVudXNlZEV4Y2VwdGlvbnMpLCBudWxsLCAnICAnKSk7XG4gIH1cblxuICBwcm9jZXNzLmV4aXQoMSk7XG59XG5cbm1haW4ocHJvY2Vzcy5hcmd2KS5jYXRjaChlcnIgPT4ge1xuICBjb25zb2xlLmVycm9yKGVycik7XG4gIHByb2Nlc3MuZXhpdCgxKTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLFNBQW9CO0FBQ3BCLGtCQUErQjtBQUMvQiw0QkFBMEI7QUFDMUIsbUJBQWlCO0FBQ2pCLHVCQUFxQjtBQUdyQixtQkFBd0I7QUFDeEIsa0JBQW9FO0FBRXBFLE1BQU0sY0FBYyxxQkFBUSxLQUFLLEdBQUc7QUFFcEMsTUFBTSxZQUFZLHNCQUFLLFdBQVcsWUFBWTtBQUM5QyxNQUFNLGlCQUFpQixzQkFBSyxXQUFXLGlCQUFpQjtBQUN4RCxNQUFNLFdBQVcsc0JBQUssV0FBVyxVQUFVO0FBRTNDLE1BQU0sZ0JBQWdCLG1DQUFjLHNCQUFLLFVBQVUsa0JBQWtCLENBQUM7QUFFdEUsTUFBTSxzQkFBc0IsT0FDMUI7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUdBO0FBQUEsRUFHQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFHQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBR0E7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBR0E7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFB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
