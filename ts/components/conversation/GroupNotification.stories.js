var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var GroupNotification_stories_exports = {};
__export(GroupNotification_stories_exports, {
  _GroupNotification: () => _GroupNotification,
  default: () => GroupNotification_stories_default
});
module.exports = __toCommonJS(GroupNotification_stories_exports);
var React = __toESM(require("react"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_GroupNotification = require("./GroupNotification");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var GroupNotification_stories_default = {
  title: "Components/Conversation"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const longName = "\u{1F377}\u{1F413}\u{1F976}".repeat(50);
const stories = [
  [
    "Combo",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mrs. Ice",
                phoneNumber: "(202) 555-1001"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                phoneNumber: "(202) 555-1002",
                title: "Ms. Earth"
              })
            ]
          },
          { type: "name", newName: "Fishing Stories" },
          { type: "avatar" }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000",
          isMe: true
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mrs. Ice",
                phoneNumber: "(202) 555-1001"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Ms. Earth",
                phoneNumber: "(202) 555-1002"
              })
            ]
          },
          { type: "name", newName: "Fishing Stories" },
          { type: "avatar" }
        ],
        i18n
      }
    ]
  ],
  [
    "Joined group",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "(202) 555-1000",
                phoneNumber: "(202) 555-1000"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mrs. Ice",
                phoneNumber: "(202) 555-1001"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Ms. Earth",
                phoneNumber: "(202) 555-1002"
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "(202) 555-1000",
                phoneNumber: "(202) 555-1000",
                isMe: true
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mrs. Ice",
                phoneNumber: "(202) 555-1001"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Ms. Earth",
                phoneNumber: "(202) 555-1002"
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mr. Fire",
                phoneNumber: "(202) 555-1000"
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000",
          isMe: true
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mr. Fire",
                phoneNumber: "(202) 555-1000"
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mr. Fire",
                phoneNumber: "(202) 555-1000",
                isMe: true
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "add",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mr. Fire",
                phoneNumber: "(202) 555-1000",
                isMe: true
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mrs. Ice",
                phoneNumber: "(202) 555-1001"
              })
            ]
          }
        ],
        i18n
      }
    ]
  ],
  [
    "Left group",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "remove",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mr. Fire",
                phoneNumber: "(202) 555-1000"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mrs. Ice",
                phoneNumber: "(202) 555-1001"
              }),
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Ms. Earth",
                phoneNumber: "(202) 555-1002"
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "remove",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Mr. Fire",
                phoneNumber: "(202) 555-1000"
              })
            ]
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000",
          isMe: true
        }),
        changes: [
          {
            type: "remove",
            contacts: [
              (0, import_getDefaultConversation.getDefaultConversation)({
                title: "Alice",
                phoneNumber: "(202) 555-1000",
                isMe: true
              })
            ]
          }
        ],
        i18n
      }
    ]
  ],
  [
    "Title changed",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "name",
            newName: "New Group Name"
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000",
          isMe: true
        }),
        changes: [
          {
            type: "name",
            newName: "New Group Name"
          }
        ],
        i18n
      }
    ]
  ],
  [
    "Avatar changed",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "avatar",
            newName: "New Group Name"
          }
        ],
        i18n
      },
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000",
          isMe: true
        }),
        changes: [
          {
            type: "avatar",
            newName: "New Group Name"
          }
        ],
        i18n
      }
    ]
  ],
  [
    "Generic group update",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: "Alice",
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "general"
          }
        ],
        i18n
      }
    ]
  ],
  [
    "Long name",
    [
      {
        from: (0, import_getDefaultConversation.getDefaultConversation)({
          title: longName,
          phoneNumber: "(202) 555-1000"
        }),
        changes: [
          {
            type: "general"
          }
        ],
        i18n
      }
    ]
  ]
];
const _GroupNotification = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(React.Fragment, null, stories.map(([title, propsArray]) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", null, title), propsArray.map((props, i) => /* @__PURE__ */ React.createElement("div", {
  key: i,
  className: "module-inline-notification-wrapper"
}, /* @__PURE__ */ React.createElement(import_GroupNotification.GroupNotification, {
  ...props
})))))), "_GroupNotification");
_GroupNotification.story = {
  name: "GroupNotification"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _GroupNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBOb3RpZmljYXRpb24uc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vR3JvdXBOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgR3JvdXBOb3RpZmljYXRpb24gfSBmcm9tICcuL0dyb3VwTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uJyxcbn07XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbnR5cGUgR3JvdXBOb3RpZmljYXRpb25TdG9yeSA9IFtzdHJpbmcsIEFycmF5PFByb3BzPl07XG5cbmNvbnN0IGxvbmdOYW1lID0gJ1x1RDgzQ1x1REY3N1x1RDgzRFx1REMxM1x1RDgzRVx1REQ3NicucmVwZWF0KDUwKTtcblxuY29uc3Qgc3RvcmllczogQXJyYXk8R3JvdXBOb3RpZmljYXRpb25TdG9yeT4gPSBbXG4gIFtcbiAgICAnQ29tYm8nLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FkZCcsXG4gICAgICAgICAgICBjb250YWN0czogW1xuICAgICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01ycy4gSWNlJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAxJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDInLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXMuIEVhcnRoJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyB0eXBlOiAnbmFtZScsIG5ld05hbWU6ICdGaXNoaW5nIFN0b3JpZXMnIH0sXG4gICAgICAgICAgeyB0eXBlOiAnYXZhdGFyJyB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIGNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkJyxcbiAgICAgICAgICAgIGNvbnRhY3RzOiBbXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXJzLiBJY2UnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDEnLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdNcy4gRWFydGgnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDInLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IHR5cGU6ICduYW1lJywgbmV3TmFtZTogJ0Zpc2hpbmcgU3RvcmllcycgfSxcbiAgICAgICAgICB7IHR5cGU6ICdhdmF0YXInIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgIF0sXG4gIF0sXG4gIFtcbiAgICAnSm9pbmVkIGdyb3VwJyxcbiAgICBbXG4gICAgICB7XG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnQWxpY2UnLFxuICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICB9KSxcbiAgICAgICAgY2hhbmdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZGQnLFxuICAgICAgICAgICAgY29udGFjdHM6IFtcbiAgICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01ycy4gSWNlJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAxJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXMuIEVhcnRoJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAyJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgfSksXG4gICAgICAgIGNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkJyxcbiAgICAgICAgICAgIGNvbnRhY3RzOiBbXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01ycy4gSWNlJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAxJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXMuIEVhcnRoJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAyJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgfSksXG4gICAgICAgIGNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkJyxcbiAgICAgICAgICAgIGNvbnRhY3RzOiBbXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXIuIEZpcmUnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaTE4bixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnQWxpY2UnLFxuICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FkZCcsXG4gICAgICAgICAgICBjb250YWN0czogW1xuICAgICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01yLiBGaXJlJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgfSksXG4gICAgICAgIGNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWRkJyxcbiAgICAgICAgICAgIGNvbnRhY3RzOiBbXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXIuIEZpcmUnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2FkZCcsXG4gICAgICAgICAgICBjb250YWN0czogW1xuICAgICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01yLiBGaXJlJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdNcnMuIEljZScsXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMScsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICBdLFxuICBdLFxuICBbXG4gICAgJ0xlZnQgZ3JvdXAnLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3JlbW92ZScsXG4gICAgICAgICAgICBjb250YWN0czogW1xuICAgICAgICAgICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ01yLiBGaXJlJyxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTXJzLiBJY2UnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDEnLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdNcy4gRWFydGgnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDInLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaTE4bixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnQWxpY2UnLFxuICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICB9KSxcbiAgICAgICAgY2hhbmdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgICAgY29udGFjdHM6IFtcbiAgICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdNci4gRmlyZScsXG4gICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIGNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAncmVtb3ZlJyxcbiAgICAgICAgICAgIGNvbnRhY3RzOiBbXG4gICAgICAgICAgICAgIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnQWxpY2UnLFxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICBdLFxuICBdLFxuICBbXG4gICAgJ1RpdGxlIGNoYW5nZWQnLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ25hbWUnLFxuICAgICAgICAgICAgbmV3TmFtZTogJ05ldyBHcm91cCBOYW1lJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgICAgaXNNZTogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIGNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbmFtZScsXG4gICAgICAgICAgICBuZXdOYW1lOiAnTmV3IEdyb3VwIE5hbWUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgIF0sXG4gIF0sXG4gIFtcbiAgICAnQXZhdGFyIGNoYW5nZWQnLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgZnJvbTogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdBbGljZScsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2F2YXRhcicsXG4gICAgICAgICAgICBuZXdOYW1lOiAnTmV3IEdyb3VwIE5hbWUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICB0aXRsZTogJ0FsaWNlJyxcbiAgICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgY2hhbmdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhdmF0YXInLFxuICAgICAgICAgICAgbmV3TmFtZTogJ05ldyBHcm91cCBOYW1lJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICBdLFxuICBdLFxuICBbXG4gICAgJ0dlbmVyaWMgZ3JvdXAgdXBkYXRlJyxcbiAgICBbXG4gICAgICB7XG4gICAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnQWxpY2UnLFxuICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTEwMDAnLFxuICAgICAgICB9KSxcbiAgICAgICAgY2hhbmdlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdnZW5lcmFsJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpMThuLFxuICAgICAgfSxcbiAgICBdLFxuICBdLFxuICBbXG4gICAgJ0xvbmcgbmFtZScsXG4gICAgW1xuICAgICAge1xuICAgICAgICBmcm9tOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICB0aXRsZTogbG9uZ05hbWUsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6ICcoMjAyKSA1NTUtMTAwMCcsXG4gICAgICAgIH0pLFxuICAgICAgICBjaGFuZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2dlbmVyYWwnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGkxOG4sXG4gICAgICB9LFxuICAgIF0sXG4gIF0sXG5dO1xuXG5leHBvcnQgY29uc3QgX0dyb3VwTm90aWZpY2F0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPD5cbiAgICB7c3Rvcmllcy5tYXAoKFt0aXRsZSwgcHJvcHNBcnJheV0pID0+IChcbiAgICAgIDw+XG4gICAgICAgIDxoMz57dGl0bGV9PC9oMz5cbiAgICAgICAge3Byb3BzQXJyYXkubWFwKChwcm9wcywgaSkgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJtb2R1bGUtaW5saW5lLW5vdGlmaWNhdGlvbi13cmFwcGVyXCI+XG4gICAgICAgICAgICA8R3JvdXBOb3RpZmljYXRpb24gey4uLnByb3BzfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvPlxuICAgICkpfVxuICA8Lz5cbik7XG5cbl9Hcm91cE5vdGlmaWNhdGlvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwTm90aWZpY2F0aW9uJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLCtCQUFrQztBQUNsQyxvQ0FBdUM7QUFFdkMsSUFBTyxvQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFJdkMsTUFBTSxXQUFXLDhCQUFTLE9BQU8sRUFBRTtBQUVuQyxNQUFNLFVBQXlDO0FBQUEsRUFDN0M7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxRQUNFLE1BQU0s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UUFDRjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsUUFDRSxNQUFNLDBEQUF1QjtBQUFBLFVBQzNCLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxRQUNELFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU0sMERBQXVCO0FBQUEsVUFDM0IsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLFFBQ0QsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsUUFDRSxNQUFNLDBEQUF1QjtBQUFBLFVBQzNCLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxRQUNELFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU0sMERBQXVCO0FBQUEsVUFDM0IsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLFFBQ0QsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsUUFDRSxNQUFNLDBEQUF1QjtBQUFBLFVBQzNCLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmLENBQUM7QUFBQSxRQUNELFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLFFBQ0UsTUFBTSwwREFBdUI7QUFBQSxVQUMzQixPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsUUFDZixDQUFDO0FBQUEsUUFDRCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRU8sTUFBTSxxQkFBcUIsNkJBQ2hDLDBEQUNHLFFBQVEsSUFBSSxDQUFDLENBQUMsT0FBTyxnQkFDcEIsMERBQ0Usb0NBQUMsWUFBSSxLQUFNLEdBQ1YsV0FBVyxJQUFJLENBQUMsT0FBTyxNQUN0QixvQ0FBQztBQUFBLEVBQUksS0FBSztBQUFBLEVBQUcsV0FBVTtBQUFBLEdBQ3JCLG9DQUFDO0FBQUEsS0FBc0I7QUFBQSxDQUFPLENBQ2hDLENBQ0QsQ0FDSCxDQUNELENBQ0gsR0FaZ0M7QUFlbEMsbUJBQW1CLFFBQVE7QUFBQSxFQUN6QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
