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
var search_exports = {};
__export(search_exports, {
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer
});
module.exports = __toCommonJS(search_exports);
var import_lodash = require("lodash");
var import_cleanSearchTerm = require("../../util/cleanSearchTerm");
var import_filterAndSortConversations = require("../../util/filterAndSortConversations");
var import_Client = __toESM(require("../../sql/Client"));
var import_makeLookup = require("../../util/makeLookup");
var import_search = require("../selectors/search");
var import_conversations = require("../selectors/conversations");
var import_user = require("../selectors/user");
var import_assert = require("../../util/assert");
var import_conversations2 = require("./conversations");
var log = __toESM(require("../../logging/log"));
const {
  searchMessages: dataSearchMessages,
  searchMessagesInConversation
} = import_Client.default;
const actions = {
  startSearch,
  clearSearch,
  clearConversationSearch,
  searchInConversation,
  updateSearchTerm
};
function startSearch() {
  return {
    type: "SEARCH_START",
    payload: null
  };
}
function clearSearch() {
  return {
    type: "SEARCH_CLEAR",
    payload: null
  };
}
function clearConversationSearch() {
  return {
    type: "CLEAR_CONVERSATION_SEARCH",
    payload: null
  };
}
function searchInConversation(searchConversationId) {
  return {
    type: "SEARCH_IN_CONVERSATION",
    payload: { searchConversationId }
  };
}
function updateSearchTerm(query) {
  return (dispatch, getState) => {
    dispatch({
      type: "SEARCH_UPDATE",
      payload: { query }
    });
    const state = getState();
    const ourConversationId = (0, import_user.getUserConversationId)(state);
    (0, import_assert.strictAssert)(ourConversationId, "updateSearchTerm our conversation is missing");
    doSearch({
      dispatch,
      allConversations: (0, import_conversations.getAllConversations)(state),
      regionCode: (0, import_user.getRegionCode)(state),
      noteToSelf: (0, import_user.getIntl)(state)("noteToSelf").toLowerCase(),
      ourConversationId,
      query: (0, import_search.getQuery)(state),
      searchConversationId: (0, import_search.getSearchConversation)(state)?.id
    });
  };
}
const doSearch = (0, import_lodash.debounce)(({
  dispatch,
  allConversations,
  regionCode,
  noteToSelf,
  ourConversationId,
  query,
  searchConversationId
}) => {
  if (!query) {
    return;
  }
  (async () => {
    dispatch({
      type: "SEARCH_MESSAGES_RESULTS_FULFILLED",
      payload: {
        messages: await queryMessages(query, searchConversationId),
        query
      }
    });
  })();
  if (!searchConversationId) {
    (async () => {
      const { conversationIds, contactIds } = await queryConversationsAndContacts(query, {
        ourConversationId,
        noteToSelf,
        regionCode,
        allConversations
      });
      dispatch({
        type: "SEARCH_DISCUSSIONS_RESULTS_FULFILLED",
        payload: {
          conversationIds,
          contactIds,
          query
        }
      });
    })();
  }
}, 200);
async function queryMessages(query, searchConversationId) {
  try {
    const normalized = (0, import_cleanSearchTerm.cleanSearchTerm)(query);
    if (normalized.length === 0) {
      return [];
    }
    if (searchConversationId) {
      return searchMessagesInConversation(normalized, searchConversationId);
    }
    return dataSearchMessages(normalized);
  } catch (e) {
    return [];
  }
}
async function queryConversationsAndContacts(query, options) {
  const { ourConversationId, noteToSelf, regionCode, allConversations } = options;
  const searchResults = (0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(allConversations, query, regionCode);
  let conversationIds = [];
  let contactIds = [];
  const max = searchResults.length;
  for (let i = 0; i < max; i += 1) {
    const conversation = searchResults[i];
    if (conversation.type === "direct" && !conversation.lastMessage) {
      contactIds.push(conversation.id);
    } else {
      conversationIds.push(conversation.id);
    }
  }
  if (noteToSelf.indexOf(query.toLowerCase()) !== -1) {
    log.info("search test queryConversationsAndContacts");
    contactIds = contactIds.filter((id) => id !== ourConversationId);
    conversationIds = conversationIds.filter((id) => id !== ourConversationId);
    contactIds.unshift(ourConversationId);
  }
  return { conversationIds, contactIds };
}
function getEmptyState() {
  return {
    startSearchCounter: 0,
    query: "",
    messageIds: [],
    messageLookup: {},
    conversationIds: [],
    contactIds: [],
    discussionsLoading: false,
    messagesLoading: false
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === "SHOW_ARCHIVED_CONVERSATIONS") {
    return getEmptyState();
  }
  if (action.type === "SEARCH_START") {
    return {
      ...state,
      searchConversationId: void 0,
      startSearchCounter: state.startSearchCounter + 1
    };
  }
  if (action.type === "SEARCH_CLEAR") {
    return getEmptyState();
  }
  if (action.type === "SEARCH_UPDATE") {
    const { payload } = action;
    const { query } = payload;
    const hasQuery = Boolean(query);
    const isWithinConversation = Boolean(state.searchConversationId);
    return {
      ...state,
      query,
      messagesLoading: hasQuery,
      ...hasQuery ? {
        messageIds: [],
        messageLookup: {},
        discussionsLoading: !isWithinConversation,
        contactIds: [],
        conversationIds: []
      } : {}
    };
  }
  if (action.type === "SEARCH_IN_CONVERSATION") {
    const { payload } = action;
    const { searchConversationId } = payload;
    if (searchConversationId === state.searchConversationId) {
      return {
        ...state,
        startSearchCounter: state.startSearchCounter + 1
      };
    }
    return {
      ...getEmptyState(),
      searchConversationId,
      startSearchCounter: state.startSearchCounter + 1
    };
  }
  if (action.type === "CLEAR_CONVERSATION_SEARCH") {
    const { searchConversationId } = state;
    return {
      ...getEmptyState(),
      searchConversationId
    };
  }
  if (action.type === "SEARCH_MESSAGES_RESULTS_FULFILLED") {
    const { payload } = action;
    const { messages, query } = payload;
    if (state.query !== query) {
      return state;
    }
    const messageIds = messages.map((message) => message.id);
    return {
      ...state,
      query,
      messageIds,
      messageLookup: (0, import_makeLookup.makeLookup)(messages, "id"),
      messagesLoading: false
    };
  }
  if (action.type === "SEARCH_DISCUSSIONS_RESULTS_FULFILLED") {
    const { payload } = action;
    const { contactIds, conversationIds, query } = payload;
    if (state.query !== query) {
      return state;
    }
    return {
      ...state,
      contactIds,
      conversationIds,
      discussionsLoading: false
    };
  }
  if (action.type === "CONVERSATIONS_REMOVE_ALL") {
    return getEmptyState();
  }
  if (action.type === import_conversations2.SELECTED_CONVERSATION_CHANGED) {
    const { payload } = action;
    const { id, messageId } = payload;
    const { searchConversationId } = state;
    if (searchConversationId && searchConversationId !== id) {
      return getEmptyState();
    }
    return {
      ...state,
      selectedMessage: messageId
    };
  }
  if (action.type === "CONVERSATION_UNLOADED") {
    const { payload } = action;
    const { id } = payload;
    const { searchConversationId } = state;
    if (searchConversationId && searchConversationId === id) {
      return getEmptyState();
    }
    return state;
  }
  if (action.type === "MESSAGE_DELETED") {
    const { messageIds, messageLookup } = state;
    if (!messageIds || messageIds.length < 1) {
      return state;
    }
    const { payload } = action;
    const { id } = payload;
    return {
      ...state,
      messageIds: (0, import_lodash.reject)(messageIds, (messageId) => id === messageId),
      messageLookup: (0, import_lodash.omit)(messageLookup, id)
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getEmptyState,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VhcmNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBUaHVua0FjdGlvbiwgVGh1bmtEaXNwYXRjaCB9IGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IGRlYm91bmNlLCBvbWl0LCByZWplY3QgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBjbGVhblNlYXJjaFRlcm0gfSBmcm9tICcuLi8uLi91dGlsL2NsZWFuU2VhcmNoVGVybSc7XG5pbXBvcnQgeyBmaWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9uc0J5UmVjZW50IH0gZnJvbSAnLi4vLi4vdXRpbC9maWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7XG4gIENsaWVudFNlYXJjaFJlc3VsdE1lc3NhZ2VUeXBlLFxuICBDbGllbnRJbnRlcmZhY2UsXG59IGZyb20gJy4uLy4uL3NxbC9JbnRlcmZhY2UnO1xuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBtYWtlTG9va3VwIH0gZnJvbSAnLi4vLi4vdXRpbC9tYWtlTG9va3VwJztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25UeXBlLFxuICBDb252ZXJzYXRpb25VbmxvYWRlZEFjdGlvblR5cGUsXG4gIE1lc3NhZ2VEZWxldGVkQWN0aW9uVHlwZSxcbiAgTWVzc2FnZVR5cGUsXG4gIFJlbW92ZUFsbENvbnZlcnNhdGlvbnNBY3Rpb25UeXBlLFxuICBTZWxlY3RlZENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlLFxuICBTaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zQWN0aW9uVHlwZSxcbn0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldFF1ZXJ5LCBnZXRTZWFyY2hDb252ZXJzYXRpb24gfSBmcm9tICcuLi9zZWxlY3RvcnMvc2VhcmNoJztcbmltcG9ydCB7IGdldEFsbENvbnZlcnNhdGlvbnMgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQge1xuICBnZXRJbnRsLFxuICBnZXRSZWdpb25Db2RlLFxuICBnZXRVc2VyQ29udmVyc2F0aW9uSWQsXG59IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IFNFTEVDVEVEX0NPTlZFUlNBVElPTl9DSEFOR0VEIH0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5cbi8vIHNlYXJjaCBiYXIgZnVuY3Rpb25zXG5cbmNvbnN0IHtcbiAgc2VhcmNoTWVzc2FnZXM6IGRhdGFTZWFyY2hNZXNzYWdlcyxcbiAgc2VhcmNoTWVzc2FnZXNJbkNvbnZlcnNhdGlvbixcbn06IENsaWVudEludGVyZmFjZSA9IGRhdGFJbnRlcmZhY2U7XG5cbi8vIFN0YXRlXG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VTZWFyY2hSZXN1bHRUeXBlID0gTWVzc2FnZVR5cGUgJiB7XG4gIHNuaXBwZXQ/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlU2VhcmNoUmVzdWx0TG9va3VwVHlwZSA9IHtcbiAgW2lkOiBzdHJpbmddOiBNZXNzYWdlU2VhcmNoUmVzdWx0VHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFNlYXJjaFN0YXRlVHlwZSA9IHtcbiAgc3RhcnRTZWFyY2hDb3VudGVyOiBudW1iZXI7XG4gIHNlYXJjaENvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBjb250YWN0SWRzOiBBcnJheTxzdHJpbmc+O1xuICBjb252ZXJzYXRpb25JZHM6IEFycmF5PHN0cmluZz47XG4gIHF1ZXJ5OiBzdHJpbmc7XG4gIG1lc3NhZ2VJZHM6IEFycmF5PHN0cmluZz47XG4gIC8vIFdlIGRvIHN0b3JlIG1lc3NhZ2UgZGF0YSB0byBwYXNzIHRocm91Z2ggdGhlIHNlbGVjdG9yXG4gIG1lc3NhZ2VMb29rdXA6IE1lc3NhZ2VTZWFyY2hSZXN1bHRMb29rdXBUeXBlO1xuICBzZWxlY3RlZE1lc3NhZ2U/OiBzdHJpbmc7XG4gIC8vIExvYWRpbmcgc3RhdGVcbiAgZGlzY3Vzc2lvbnNMb2FkaW5nOiBib29sZWFuO1xuICBtZXNzYWdlc0xvYWRpbmc6IGJvb2xlYW47XG59O1xuXG4vLyBBY3Rpb25zXG5cbnR5cGUgU2VhcmNoTWVzc2FnZXNSZXN1bHRzRnVsZmlsbGVkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFQVJDSF9NRVNTQUdFU19SRVNVTFRTX0ZVTEZJTExFRCc7XG4gIHBheWxvYWQ6IHtcbiAgICBtZXNzYWdlczogQXJyYXk8TWVzc2FnZVNlYXJjaFJlc3VsdFR5cGU+O1xuICAgIHF1ZXJ5OiBzdHJpbmc7XG4gIH07XG59O1xudHlwZSBTZWFyY2hEaXNjdXNzaW9uc1Jlc3VsdHNGdWxmaWxsZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnU0VBUkNIX0RJU0NVU1NJT05TX1JFU1VMVFNfRlVMRklMTEVEJztcbiAgcGF5bG9hZDoge1xuICAgIGNvbnZlcnNhdGlvbklkczogQXJyYXk8c3RyaW5nPjtcbiAgICBjb250YWN0SWRzOiBBcnJheTxzdHJpbmc+O1xuICAgIHF1ZXJ5OiBzdHJpbmc7XG4gIH07XG59O1xudHlwZSBVcGRhdGVTZWFyY2hUZXJtQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFQVJDSF9VUERBVEUnO1xuICBwYXlsb2FkOiB7XG4gICAgcXVlcnk6IHN0cmluZztcbiAgfTtcbn07XG50eXBlIFN0YXJ0U2VhcmNoQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFQVJDSF9TVEFSVCc7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xudHlwZSBDbGVhclNlYXJjaEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTRUFSQ0hfQ0xFQVInO1xuICBwYXlsb2FkOiBudWxsO1xufTtcbnR5cGUgQ2xlYXJDb252ZXJzYXRpb25TZWFyY2hBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ0xFQVJfQ09OVkVSU0FUSU9OX1NFQVJDSCc7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xudHlwZSBTZWFyY2hJbkNvbnZlcnNhdGlvbkFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTRUFSQ0hfSU5fQ09OVkVSU0FUSU9OJztcbiAgcGF5bG9hZDogeyBzZWFyY2hDb252ZXJzYXRpb25JZDogc3RyaW5nIH07XG59O1xuXG5leHBvcnQgdHlwZSBTZWFyY2hBY3Rpb25UeXBlID1cbiAgfCBTZWFyY2hNZXNzYWdlc1Jlc3VsdHNGdWxmaWxsZWRBY3Rpb25UeXBlXG4gIHwgU2VhcmNoRGlzY3Vzc2lvbnNSZXN1bHRzRnVsZmlsbGVkQWN0aW9uVHlwZVxuICB8IFVwZGF0ZVNlYXJjaFRlcm1BY3Rpb25UeXBlXG4gIHwgU3RhcnRTZWFyY2hBY3Rpb25UeXBlXG4gIHwgQ2xlYXJTZWFyY2hBY3Rpb25UeXBlXG4gIHwgQ2xlYXJDb252ZXJzYXRpb25TZWFyY2hBY3Rpb25UeXBlXG4gIHwgU2VhcmNoSW5Db252ZXJzYXRpb25BY3Rpb25UeXBlXG4gIHwgTWVzc2FnZURlbGV0ZWRBY3Rpb25UeXBlXG4gIHwgUmVtb3ZlQWxsQ29udmVyc2F0aW9uc0FjdGlvblR5cGVcbiAgfCBTZWxlY3RlZENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlXG4gIHwgU2hvd0FyY2hpdmVkQ29udmVyc2F0aW9uc0FjdGlvblR5cGVcbiAgfCBDb252ZXJzYXRpb25VbmxvYWRlZEFjdGlvblR5cGU7XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgc3RhcnRTZWFyY2gsXG4gIGNsZWFyU2VhcmNoLFxuICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaCxcbiAgc2VhcmNoSW5Db252ZXJzYXRpb24sXG4gIHVwZGF0ZVNlYXJjaFRlcm0sXG59O1xuXG5mdW5jdGlvbiBzdGFydFNlYXJjaCgpOiBTdGFydFNlYXJjaEFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdTRUFSQ0hfU1RBUlQnLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH07XG59XG5mdW5jdGlvbiBjbGVhclNlYXJjaCgpOiBDbGVhclNlYXJjaEFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdTRUFSQ0hfQ0xFQVInLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH07XG59XG5mdW5jdGlvbiBjbGVhckNvbnZlcnNhdGlvblNlYXJjaCgpOiBDbGVhckNvbnZlcnNhdGlvblNlYXJjaEFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdDTEVBUl9DT05WRVJTQVRJT05fU0VBUkNIJyxcbiAgICBwYXlsb2FkOiBudWxsLFxuICB9O1xufVxuZnVuY3Rpb24gc2VhcmNoSW5Db252ZXJzYXRpb24oXG4gIHNlYXJjaENvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IFNlYXJjaEluQ29udmVyc2F0aW9uQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NFQVJDSF9JTl9DT05WRVJTQVRJT04nLFxuICAgIHBheWxvYWQ6IHsgc2VhcmNoQ29udmVyc2F0aW9uSWQgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2VhcmNoVGVybShcbiAgcXVlcnk6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgVXBkYXRlU2VhcmNoVGVybUFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnU0VBUkNIX1VQREFURScsXG4gICAgICBwYXlsb2FkOiB7IHF1ZXJ5IH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG4gICAgY29uc3Qgb3VyQ29udmVyc2F0aW9uSWQgPSBnZXRVc2VyQ29udmVyc2F0aW9uSWQoc3RhdGUpO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgICAgJ3VwZGF0ZVNlYXJjaFRlcm0gb3VyIGNvbnZlcnNhdGlvbiBpcyBtaXNzaW5nJ1xuICAgICk7XG5cbiAgICBkb1NlYXJjaCh7XG4gICAgICBkaXNwYXRjaCxcbiAgICAgIGFsbENvbnZlcnNhdGlvbnM6IGdldEFsbENvbnZlcnNhdGlvbnMoc3RhdGUpLFxuICAgICAgcmVnaW9uQ29kZTogZ2V0UmVnaW9uQ29kZShzdGF0ZSksXG4gICAgICBub3RlVG9TZWxmOiBnZXRJbnRsKHN0YXRlKSgnbm90ZVRvU2VsZicpLnRvTG93ZXJDYXNlKCksXG4gICAgICBvdXJDb252ZXJzYXRpb25JZCxcbiAgICAgIHF1ZXJ5OiBnZXRRdWVyeShzdGF0ZSksXG4gICAgICBzZWFyY2hDb252ZXJzYXRpb25JZDogZ2V0U2VhcmNoQ29udmVyc2F0aW9uKHN0YXRlKT8uaWQsXG4gICAgfSk7XG4gIH07XG59XG5cbmNvbnN0IGRvU2VhcmNoID0gZGVib3VuY2UoXG4gICh7XG4gICAgZGlzcGF0Y2gsXG4gICAgYWxsQ29udmVyc2F0aW9ucyxcbiAgICByZWdpb25Db2RlLFxuICAgIG5vdGVUb1NlbGYsXG4gICAgb3VyQ29udmVyc2F0aW9uSWQsXG4gICAgcXVlcnksXG4gICAgc2VhcmNoQ29udmVyc2F0aW9uSWQsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBkaXNwYXRjaDogVGh1bmtEaXNwYXRjaDxcbiAgICAgIFJvb3RTdGF0ZVR5cGUsXG4gICAgICB1bmtub3duLFxuICAgICAgfCBTZWFyY2hNZXNzYWdlc1Jlc3VsdHNGdWxmaWxsZWRBY3Rpb25UeXBlXG4gICAgICB8IFNlYXJjaERpc2N1c3Npb25zUmVzdWx0c0Z1bGZpbGxlZEFjdGlvblR5cGVcbiAgICA+O1xuICAgIGFsbENvbnZlcnNhdGlvbnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gICAgbm90ZVRvU2VsZjogc3RyaW5nO1xuICAgIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIHF1ZXJ5OiBzdHJpbmc7XG4gICAgc2VhcmNoQ29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgfT4pID0+IHtcbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ1NFQVJDSF9NRVNTQUdFU19SRVNVTFRTX0ZVTEZJTExFRCcsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBtZXNzYWdlczogYXdhaXQgcXVlcnlNZXNzYWdlcyhxdWVyeSwgc2VhcmNoQ29udmVyc2F0aW9uSWQpLFxuICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSkoKTtcblxuICAgIGlmICghc2VhcmNoQ29udmVyc2F0aW9uSWQpIHtcbiAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWRzLCBjb250YWN0SWRzIH0gPVxuICAgICAgICAgIGF3YWl0IHF1ZXJ5Q29udmVyc2F0aW9uc0FuZENvbnRhY3RzKHF1ZXJ5LCB7XG4gICAgICAgICAgICBvdXJDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAgIG5vdGVUb1NlbGYsXG4gICAgICAgICAgICByZWdpb25Db2RlLFxuICAgICAgICAgICAgYWxsQ29udmVyc2F0aW9ucyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogJ1NFQVJDSF9ESVNDVVNTSU9OU19SRVNVTFRTX0ZVTEZJTExFRCcsXG4gICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWRzLFxuICAgICAgICAgICAgY29udGFjdElkcyxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSkoKTtcbiAgICB9XG4gIH0sXG4gIDIwMFxuKTtcblxuYXN5bmMgZnVuY3Rpb24gcXVlcnlNZXNzYWdlcyhcbiAgcXVlcnk6IHN0cmluZyxcbiAgc2VhcmNoQ29udmVyc2F0aW9uSWQ/OiBzdHJpbmdcbik6IFByb21pc2U8QXJyYXk8Q2xpZW50U2VhcmNoUmVzdWx0TWVzc2FnZVR5cGU+PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGNsZWFuU2VhcmNoVGVybShxdWVyeSk7XG4gICAgaWYgKG5vcm1hbGl6ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaENvbnZlcnNhdGlvbklkKSB7XG4gICAgICByZXR1cm4gc2VhcmNoTWVzc2FnZXNJbkNvbnZlcnNhdGlvbihub3JtYWxpemVkLCBzZWFyY2hDb252ZXJzYXRpb25JZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFTZWFyY2hNZXNzYWdlcyhub3JtYWxpemVkKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBxdWVyeUNvbnZlcnNhdGlvbnNBbmRDb250YWN0cyhcbiAgcXVlcnk6IHN0cmluZyxcbiAgb3B0aW9uczoge1xuICAgIG91ckNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgbm90ZVRvU2VsZjogc3RyaW5nO1xuICAgIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBhbGxDb252ZXJzYXRpb25zOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICB9XG4pOiBQcm9taXNlPHtcbiAgY29udGFjdElkczogQXJyYXk8c3RyaW5nPjtcbiAgY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+O1xufT4ge1xuICBjb25zdCB7IG91ckNvbnZlcnNhdGlvbklkLCBub3RlVG9TZWxmLCByZWdpb25Db2RlLCBhbGxDb252ZXJzYXRpb25zIH0gPVxuICAgIG9wdGlvbnM7XG5cbiAgY29uc3Qgc2VhcmNoUmVzdWx0czogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPVxuICAgIGZpbHRlckFuZFNvcnRDb252ZXJzYXRpb25zQnlSZWNlbnQoYWxsQ29udmVyc2F0aW9ucywgcXVlcnksIHJlZ2lvbkNvZGUpO1xuXG4gIC8vIFNwbGl0IGludG8gdHdvIGdyb3VwcyAtIGFjdGl2ZSBjb252ZXJzYXRpb25zIGFuZCBpdGVtcyBqdXN0IGZyb20gYWRkcmVzcyBib29rXG4gIGxldCBjb252ZXJzYXRpb25JZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgbGV0IGNvbnRhY3RJZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uc3QgbWF4ID0gc2VhcmNoUmVzdWx0cy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSBzZWFyY2hSZXN1bHRzW2ldO1xuXG4gICAgaWYgKGNvbnZlcnNhdGlvbi50eXBlID09PSAnZGlyZWN0JyAmJiAhY29udmVyc2F0aW9uLmxhc3RNZXNzYWdlKSB7XG4gICAgICBjb250YWN0SWRzLnB1c2goY29udmVyc2F0aW9uLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udmVyc2F0aW9uSWRzLnB1c2goY29udmVyc2F0aW9uLmlkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbmplY3Qgc3ludGhldGljIE5vdGUgdG8gU2VsZiBlbnRyeSBpZiBxdWVyeSBtYXRjaGVzIGxvY2FsaXplZCAnTm90ZSB0byBTZWxmJ1xuICBpZiAobm90ZVRvU2VsZi5pbmRleE9mKHF1ZXJ5LnRvTG93ZXJDYXNlKCkpICE9PSAtMSkge1xuICAgIGxvZy5pbmZvKCdzZWFyY2ggdGVzdCBxdWVyeUNvbnZlcnNhdGlvbnNBbmRDb250YWN0cycpO1xuICAgIC8vIGVuc3VyZSB0aGF0IHdlIGRvbid0IGhhdmUgZHVwbGljYXRlcyBpbiBvdXIgcmVzdWx0c1xuICAgIGNvbnRhY3RJZHMgPSBjb250YWN0SWRzLmZpbHRlcihpZCA9PiBpZCAhPT0gb3VyQ29udmVyc2F0aW9uSWQpO1xuICAgIGNvbnZlcnNhdGlvbklkcyA9IGNvbnZlcnNhdGlvbklkcy5maWx0ZXIoaWQgPT4gaWQgIT09IG91ckNvbnZlcnNhdGlvbklkKTtcblxuICAgIGNvbnRhY3RJZHMudW5zaGlmdChvdXJDb252ZXJzYXRpb25JZCk7XG4gIH1cblxuICByZXR1cm4geyBjb252ZXJzYXRpb25JZHMsIGNvbnRhY3RJZHMgfTtcbn1cblxuLy8gUmVkdWNlclxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW1wdHlTdGF0ZSgpOiBTZWFyY2hTdGF0ZVR5cGUge1xuICByZXR1cm4ge1xuICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICBxdWVyeTogJycsXG4gICAgbWVzc2FnZUlkczogW10sXG4gICAgbWVzc2FnZUxvb2t1cDoge30sXG4gICAgY29udmVyc2F0aW9uSWRzOiBbXSxcbiAgICBjb250YWN0SWRzOiBbXSxcbiAgICBkaXNjdXNzaW9uc0xvYWRpbmc6IGZhbHNlLFxuICAgIG1lc3NhZ2VzTG9hZGluZzogZmFsc2UsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VyKFxuICBzdGF0ZTogUmVhZG9ubHk8U2VhcmNoU3RhdGVUeXBlPiA9IGdldEVtcHR5U3RhdGUoKSxcbiAgYWN0aW9uOiBSZWFkb25seTxTZWFyY2hBY3Rpb25UeXBlPlxuKTogU2VhcmNoU3RhdGVUeXBlIHtcbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0hPV19BUkNISVZFRF9DT05WRVJTQVRJT05TJykge1xuICAgIHJldHVybiBnZXRFbXB0eVN0YXRlKCk7XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRUFSQ0hfU1RBUlQnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc2VhcmNoQ29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCxcbiAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogc3RhdGUuc3RhcnRTZWFyY2hDb3VudGVyICsgMSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VBUkNIX0NMRUFSJykge1xuICAgIHJldHVybiBnZXRFbXB0eVN0YXRlKCk7XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRUFSQ0hfVVBEQVRFJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgcXVlcnkgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCBoYXNRdWVyeSA9IEJvb2xlYW4ocXVlcnkpO1xuICAgIGNvbnN0IGlzV2l0aGluQ29udmVyc2F0aW9uID0gQm9vbGVhbihzdGF0ZS5zZWFyY2hDb252ZXJzYXRpb25JZCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBxdWVyeSxcbiAgICAgIG1lc3NhZ2VzTG9hZGluZzogaGFzUXVlcnksXG4gICAgICAuLi4oaGFzUXVlcnlcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBtZXNzYWdlSWRzOiBbXSxcbiAgICAgICAgICAgIG1lc3NhZ2VMb29rdXA6IHt9LFxuICAgICAgICAgICAgZGlzY3Vzc2lvbnNMb2FkaW5nOiAhaXNXaXRoaW5Db252ZXJzYXRpb24sXG4gICAgICAgICAgICBjb250YWN0SWRzOiBbXSxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkczogW10sXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9KSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VBUkNIX0lOX0NPTlZFUlNBVElPTicpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IHNlYXJjaENvbnZlcnNhdGlvbklkIH0gPSBwYXlsb2FkO1xuXG4gICAgaWYgKHNlYXJjaENvbnZlcnNhdGlvbklkID09PSBzdGF0ZS5zZWFyY2hDb252ZXJzYXRpb25JZCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogc3RhdGUuc3RhcnRTZWFyY2hDb3VudGVyICsgMSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgIHNlYXJjaENvbnZlcnNhdGlvbklkLFxuICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiBzdGF0ZS5zdGFydFNlYXJjaENvdW50ZXIgKyAxLFxuICAgIH07XG4gIH1cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnQ0xFQVJfQ09OVkVSU0FUSU9OX1NFQVJDSCcpIHtcbiAgICBjb25zdCB7IHNlYXJjaENvbnZlcnNhdGlvbklkIH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICBzZWFyY2hDb252ZXJzYXRpb25JZCxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VBUkNIX01FU1NBR0VTX1JFU1VMVFNfRlVMRklMTEVEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgbWVzc2FnZXMsIHF1ZXJ5IH0gPSBwYXlsb2FkO1xuXG4gICAgLy8gUmVqZWN0IGlmIHRoZSBhc3NvY2lhdGVkIHF1ZXJ5IGlzIG5vdCB0aGUgbW9zdCByZWNlbnQgdXNlci1wcm92aWRlZCBxdWVyeVxuICAgIGlmIChzdGF0ZS5xdWVyeSAhPT0gcXVlcnkpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlSWRzID0gbWVzc2FnZXMubWFwKG1lc3NhZ2UgPT4gbWVzc2FnZS5pZCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBxdWVyeSxcbiAgICAgIG1lc3NhZ2VJZHMsXG4gICAgICBtZXNzYWdlTG9va3VwOiBtYWtlTG9va3VwKG1lc3NhZ2VzLCAnaWQnKSxcbiAgICAgIG1lc3NhZ2VzTG9hZGluZzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ1NFQVJDSF9ESVNDVVNTSU9OU19SRVNVTFRTX0ZVTEZJTExFRCcpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IGNvbnRhY3RJZHMsIGNvbnZlcnNhdGlvbklkcywgcXVlcnkgfSA9IHBheWxvYWQ7XG5cbiAgICAvLyBSZWplY3QgaWYgdGhlIGFzc29jaWF0ZWQgcXVlcnkgaXMgbm90IHRoZSBtb3N0IHJlY2VudCB1c2VyLXByb3ZpZGVkIHF1ZXJ5XG4gICAgaWYgKHN0YXRlLnF1ZXJ5ICE9PSBxdWVyeSkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNvbnRhY3RJZHMsXG4gICAgICBjb252ZXJzYXRpb25JZHMsXG4gICAgICBkaXNjdXNzaW9uc0xvYWRpbmc6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdDT05WRVJTQVRJT05TX1JFTU9WRV9BTEwnKSB7XG4gICAgcmV0dXJuIGdldEVtcHR5U3RhdGUoKTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VMRUNURURfQ09OVkVSU0FUSU9OX0NIQU5HRUQpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IGlkLCBtZXNzYWdlSWQgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgeyBzZWFyY2hDb252ZXJzYXRpb25JZCB9ID0gc3RhdGU7XG5cbiAgICBpZiAoc2VhcmNoQ29udmVyc2F0aW9uSWQgJiYgc2VhcmNoQ29udmVyc2F0aW9uSWQgIT09IGlkKSB7XG4gICAgICByZXR1cm4gZ2V0RW1wdHlTdGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNlbGVjdGVkTWVzc2FnZTogbWVzc2FnZUlkLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdDT05WRVJTQVRJT05fVU5MT0FERUQnKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gICAgY29uc3QgeyBpZCB9ID0gcGF5bG9hZDtcbiAgICBjb25zdCB7IHNlYXJjaENvbnZlcnNhdGlvbklkIH0gPSBzdGF0ZTtcblxuICAgIGlmIChzZWFyY2hDb252ZXJzYXRpb25JZCAmJiBzZWFyY2hDb252ZXJzYXRpb25JZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiBnZXRFbXB0eVN0YXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnTUVTU0FHRV9ERUxFVEVEJykge1xuICAgIGNvbnN0IHsgbWVzc2FnZUlkcywgbWVzc2FnZUxvb2t1cCB9ID0gc3RhdGU7XG4gICAgaWYgKCFtZXNzYWdlSWRzIHx8IG1lc3NhZ2VJZHMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgaWQgfSA9IHBheWxvYWQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBtZXNzYWdlSWRzOiByZWplY3QobWVzc2FnZUlkcywgbWVzc2FnZUlkID0+IGlkID09PSBtZXNzYWdlSWQpLFxuICAgICAgbWVzc2FnZUxvb2t1cDogb21pdChtZXNzYWdlTG9va3VwLCBpZCksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsb0JBQXVDO0FBR3ZDLDZCQUFnQztBQUNoQyx3Q0FBbUQ7QUFLbkQsb0JBQTBCO0FBQzFCLHdCQUEyQjtBQVczQixvQkFBZ0Q7QUFDaEQsMkJBQW9DO0FBQ3BDLGtCQUlPO0FBQ1Asb0JBQTZCO0FBQzdCLDRCQUE4QztBQUM5QyxVQUFxQjtBQUlyQixNQUFNO0FBQUEsRUFDSixnQkFBZ0I7QUFBQSxFQUNoQjtBQUFBLElBQ21CO0FBbUZkLE1BQU0sVUFBVTtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsdUJBQThDO0FBQzVDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNYO0FBQ0Y7QUFMUyxBQU1ULHVCQUE4QztBQUM1QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDWDtBQUNGO0FBTFMsQUFNVCxtQ0FBc0U7QUFDcEUsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUxTLEFBTVQsOEJBQ0Usc0JBQ2dDO0FBQ2hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVMsRUFBRSxxQkFBcUI7QUFBQSxFQUNsQztBQUNGO0FBUFMsQUFTVCwwQkFDRSxPQUN1RTtBQUN2RSxTQUFPLENBQUMsVUFBVSxhQUFhO0FBQzdCLGFBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsRUFBRSxNQUFNO0FBQUEsSUFDbkIsQ0FBQztBQUVELFVBQU0sUUFBUSxTQUFTO0FBQ3ZCLFVBQU0sb0JBQW9CLHVDQUFzQixLQUFLO0FBQ3JELG9DQUNFLG1CQUNBLDhDQUNGO0FBRUEsYUFBUztBQUFBLE1BQ1A7QUFBQSxNQUNBLGtCQUFrQiw4Q0FBb0IsS0FBSztBQUFBLE1BQzNDLFlBQVksK0JBQWMsS0FBSztBQUFBLE1BQy9CLFlBQVkseUJBQVEsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZO0FBQUEsTUFDckQ7QUFBQSxNQUNBLE9BQU8sNEJBQVMsS0FBSztBQUFBLE1BQ3JCLHNCQUFzQix5Q0FBc0IsS0FBSyxHQUFHO0FBQUEsSUFDdEQsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQTFCUyxBQTRCVCxNQUFNLFdBQVcsNEJBQ2YsQ0FBQztBQUFBLEVBQ0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQWNLO0FBQ0wsTUFBSSxDQUFDLE9BQU87QUFDVjtBQUFBLEVBQ0Y7QUFFQSxFQUFDLGFBQVk7QUFDWCxhQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsUUFDUCxVQUFVLE1BQU0sY0FBYyxPQUFPLG9CQUFvQjtBQUFBLFFBQ3pEO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRztBQUVILE1BQUksQ0FBQyxzQkFBc0I7QUFDekIsSUFBQyxhQUFZO0FBQ1gsWUFBTSxFQUFFLGlCQUFpQixlQUN2QixNQUFNLDhCQUE4QixPQUFPO0FBQUEsUUFDekM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFFSCxlQUFTO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsR0FBRztBQUFBLEVBQ0w7QUFDRixHQUNBLEdBQ0Y7QUFFQSw2QkFDRSxPQUNBLHNCQUMrQztBQUMvQyxNQUFJO0FBQ0YsVUFBTSxhQUFhLDRDQUFnQixLQUFLO0FBQ3hDLFFBQUksV0FBVyxXQUFXLEdBQUc7QUFDM0IsYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUVBLFFBQUksc0JBQXNCO0FBQ3hCLGFBQU8sNkJBQTZCLFlBQVksb0JBQW9CO0FBQUEsSUFDdEU7QUFFQSxXQUFPLG1CQUFtQixVQUFVO0FBQUEsRUFDdEMsU0FBUyxHQUFQO0FBQ0EsV0FBTyxDQUFDO0FBQUEsRUFDVjtBQUNGO0FBbEJlLEFBb0JmLDZDQUNFLE9BQ0EsU0FTQztBQUNELFFBQU0sRUFBRSxtQkFBbUIsWUFBWSxZQUFZLHFCQUNqRDtBQUVGLFFBQU0sZ0JBQ0osMEVBQW1DLGtCQUFrQixPQUFPLFVBQVU7QUFHeEUsTUFBSSxrQkFBaUMsQ0FBQztBQUN0QyxNQUFJLGFBQTRCLENBQUM7QUFDakMsUUFBTSxNQUFNLGNBQWM7QUFDMUIsV0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRztBQUMvQixVQUFNLGVBQWUsY0FBYztBQUVuQyxRQUFJLGFBQWEsU0FBUyxZQUFZLENBQUMsYUFBYSxhQUFhO0FBQy9ELGlCQUFXLEtBQUssYUFBYSxFQUFFO0FBQUEsSUFDakMsT0FBTztBQUNMLHNCQUFnQixLQUFLLGFBQWEsRUFBRTtBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUdBLE1BQUksV0FBVyxRQUFRLE1BQU0sWUFBWSxDQUFDLE1BQU0sSUFBSTtBQUNsRCxRQUFJLEtBQUssMkNBQTJDO0FBRXBELGlCQUFhLFdBQVcsT0FBTyxRQUFNLE9BQU8saUJBQWlCO0FBQzdELHNCQUFrQixnQkFBZ0IsT0FBTyxRQUFNLE9BQU8saUJBQWlCO0FBRXZFLGVBQVcsUUFBUSxpQkFBaUI7QUFBQSxFQUN0QztBQUVBLFNBQU8sRUFBRSxpQkFBaUIsV0FBVztBQUN2QztBQTNDZSxBQStDUix5QkFBMEM7QUFDL0MsU0FBTztBQUFBLElBQ0wsb0JBQW9CO0FBQUEsSUFDcEIsT0FBTztBQUFBLElBQ1AsWUFBWSxDQUFDO0FBQUEsSUFDYixlQUFlLENBQUM7QUFBQSxJQUNoQixpQkFBaUIsQ0FBQztBQUFBLElBQ2xCLFlBQVksQ0FBQztBQUFBLElBQ2Isb0JBQW9CO0FBQUEsSUFDcEIsaUJBQWlCO0FBQUEsRUFDbkI7QUFDRjtBQVhnQixBQWFULGlCQUNMLFFBQW1DLGNBQWMsR0FDakQsUUFDaUI7QUFDakIsTUFBSSxPQUFPLFNBQVMsK0JBQStCO0FBQ2pELFdBQU8sY0FBYztBQUFBLEVBQ3ZCO0FBRUEsTUFBSSxPQUFPLFNBQVMsZ0JBQWdCO0FBQ2xDLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxzQkFBc0I7QUFBQSxNQUN0QixvQkFBb0IsTUFBTSxxQkFBcUI7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE9BQU8sU0FBUyxnQkFBZ0I7QUFDbEMsV0FBTyxjQUFjO0FBQUEsRUFDdkI7QUFFQSxNQUFJLE9BQU8sU0FBUyxpQkFBaUI7QUFDbkMsVUFBTSxFQUFFLFlBQVk7QUFDcEIsVUFBTSxFQUFFLFVBQVU7QUFFbEIsVUFBTSxXQUFXLFFBQVEsS0FBSztBQUM5QixVQUFNLHVCQUF1QixRQUFRLE1BQU0sb0JBQW9CO0FBRS9ELFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSDtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsU0FDYixXQUNBO0FBQUEsUUFDRSxZQUFZLENBQUM7QUFBQSxRQUNiLGVBQWUsQ0FBQztBQUFBLFFBQ2hCLG9CQUFvQixDQUFDO0FBQUEsUUFDckIsWUFBWSxDQUFDO0FBQUEsUUFDYixpQkFBaUIsQ0FBQztBQUFBLE1BQ3BCLElBQ0EsQ0FBQztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFNBQVMsMEJBQTBCO0FBQzVDLFVBQU0sRUFBRSxZQUFZO0FBQ3BCLFVBQU0sRUFBRSx5QkFBeUI7QUFFakMsUUFBSSx5QkFBeUIsTUFBTSxzQkFBc0I7QUFDdkQsYUFBTztBQUFBLFdBQ0Y7QUFBQSxRQUNILG9CQUFvQixNQUFNLHFCQUFxQjtBQUFBLE1BQ2pEO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxTQUNGLGNBQWM7QUFBQSxNQUNqQjtBQUFBLE1BQ0Esb0JBQW9CLE1BQU0scUJBQXFCO0FBQUEsSUFDakQ7QUFBQSxFQUNGO0FBQ0EsTUFBSSxPQUFPLFNBQVMsNkJBQTZCO0FBQy9DLFVBQU0sRUFBRSx5QkFBeUI7QUFFakMsV0FBTztBQUFBLFNBQ0YsY0FBYztBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE9BQU8sU0FBUyxxQ0FBcUM7QUFDdkQsVUFBTSxFQUFFLFlBQVk7QUFDcEIsVUFBTSxFQUFFLFVBQVUsVUFBVTtBQUc1QixRQUFJLE1BQU0sVUFBVSxPQUFPO0FBQ3pCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxhQUFhLFNBQVMsSUFBSSxhQUFXLFFBQVEsRUFBRTtBQUVyRCxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0g7QUFBQSxNQUNBO0FBQUEsTUFDQSxlQUFlLGtDQUFXLFVBQVUsSUFBSTtBQUFBLE1BQ3hDLGlCQUFpQjtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxTQUFTLHdDQUF3QztBQUMxRCxVQUFNLEVBQUUsWUFBWTtBQUNwQixVQUFNLEVBQUUsWUFBWSxpQkFBaUIsVUFBVTtBQUcvQyxRQUFJLE1BQU0sVUFBVSxPQUFPO0FBQ3pCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLFNBQ0Y7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLE1BQ0Esb0JBQW9CO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFNBQVMsNEJBQTRCO0FBQzlDLFdBQU8sY0FBYztBQUFBLEVBQ3ZCO0FBRUEsTUFBSSxPQUFPLFNBQVMscURBQStCO0FBQ2pELFVBQU0sRUFBRSxZQUFZO0FBQ3BCLFVBQU0sRUFBRSxJQUFJLGNBQWM7QUFDMUIsVUFBTSxFQUFFLHlCQUF5QjtBQUVqQyxRQUFJLHdCQUF3Qix5QkFBeUIsSUFBSTtBQUN2RCxhQUFPLGNBQWM7QUFBQSxJQUN2QjtBQUVBLFdBQU87QUFBQSxTQUNGO0FBQUEsTUFDSCxpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE9BQU8sU0FBUyx5QkFBeUI7QUFDM0MsVUFBTSxFQUFFLFlBQVk7QUFDcEIsVUFBTSxFQUFFLE9BQU87QUFDZixVQUFNLEVBQUUseUJBQXlCO0FBRWpDLFFBQUksd0JBQXdCLHlCQUF5QixJQUFJO0FBQ3ZELGFBQU8sY0FBYztBQUFBLElBQ3ZCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE9BQU8sU0FBUyxtQkFBbUI7QUFDckMsVUFBTSxFQUFFLFlBQVksa0JBQWtCO0FBQ3RDLFFBQUksQ0FBQyxjQUFjLFdBQVcsU0FBUyxHQUFHO0FBQ3hDLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxFQUFFLFlBQVk7QUFDcEIsVUFBTSxFQUFFLE9BQU87QUFFZixXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsWUFBWSwwQkFBTyxZQUFZLGVBQWEsT0FBTyxTQUFTO0FBQUEsTUFDNUQsZUFBZSx3QkFBSyxlQUFlLEVBQUU7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUExSmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
