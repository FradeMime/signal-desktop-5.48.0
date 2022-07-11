var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var gv2_uuid_exports = {};
__export(gv2_uuid_exports, {
  default: () => updateToSchemaVersion43
});
module.exports = __toCommonJS(gv2_uuid_exports);
var import_lodash = require("lodash");
var import_isNotNil = require("../../util/isNotNil");
var import_assert = require("../../util/assert");
var import_util = require("../util");
function updateToSchemaVersion43(currentVersion, db, logger) {
  if (currentVersion >= 43) {
    return;
  }
  const getConversationUuid = db.prepare(`
      SELECT uuid
      FROM
        conversations
      WHERE
        id = $conversationId
      `).pluck();
  const updateConversationStmt = db.prepare(`
    UPDATE conversations SET
      json = $json,
      members = $members
    WHERE id = $id;
    `);
  const updateMessageStmt = db.prepare(`
    UPDATE messages SET
      json = $json,
      sourceUuid = $sourceUuid
    WHERE id = $id;
    `);
  const upgradeConversation = /* @__PURE__ */ __name((convo) => {
    const legacy = convo;
    let result = convo;
    const logId = `(${legacy.id}) groupv2(${legacy.groupId})`;
    const memberKeys = [
      "membersV2",
      "pendingMembersV2",
      "pendingAdminApprovalV2"
    ];
    for (const key of memberKeys) {
      const oldValue = legacy[key];
      if (!Array.isArray(oldValue)) {
        continue;
      }
      let addedByCount = 0;
      const newValue = oldValue.map((member) => {
        const uuid = getConversationUuid.get({
          conversationId: member.conversationId
        });
        if (!uuid) {
          logger.warn(`updateToSchemaVersion43: ${logId}.${key} UUID not found for ${member.conversationId}`);
          return void 0;
        }
        const updated = {
          ...(0, import_lodash.omit)(member, "conversationId"),
          uuid
        };
        if (!("addedByUserId" in member) || !member.addedByUserId) {
          return updated;
        }
        const addedByUserId = getConversationUuid.get({
          conversationId: member.addedByUserId
        });
        if (!addedByUserId) {
          return updated;
        }
        addedByCount += 1;
        return {
          ...updated,
          addedByUserId
        };
      }).filter(import_isNotNil.isNotNil);
      result = {
        ...result,
        [key]: newValue
      };
      if (oldValue.length !== 0) {
        logger.info(`updateToSchemaVersion43: migrated ${oldValue.length} ${key} entries to ${newValue.length} for ${logId}`);
      }
      if (addedByCount > 0) {
        logger.info(`updateToSchemaVersion43: migrated ${addedByCount} addedByUserId in ${key} for ${logId}`);
      }
    }
    if (result === convo) {
      return;
    }
    let dbMembers;
    if (result.membersV2) {
      dbMembers = result.membersV2.map((item) => item.uuid).join(" ");
    } else if (result.members) {
      dbMembers = result.members.join(" ");
    } else {
      dbMembers = null;
    }
    updateConversationStmt.run({
      id: result.id,
      json: (0, import_util.objectToJSON)(result),
      members: dbMembers
    });
  }, "upgradeConversation");
  const upgradeMessage = /* @__PURE__ */ __name((message) => {
    const { id, groupV2Change, sourceUuid, invitedGV2Members } = message;
    let result = message;
    if (groupV2Change) {
      (0, import_assert.assert)(result.groupV2Change, "Pacify typescript");
      const from = getConversationUuid.get({
        conversationId: groupV2Change.from
      });
      if (from) {
        result = {
          ...result,
          groupV2Change: {
            ...result.groupV2Change,
            from
          }
        };
      } else {
        result = {
          ...result,
          groupV2Change: (0, import_lodash.omit)(result.groupV2Change, ["from"])
        };
      }
      let changedDetails = false;
      const details = groupV2Change.details.map((legacyDetail, i) => {
        const oldDetail = result.groupV2Change?.details[i];
        (0, import_assert.assert)(oldDetail, "Pacify typescript");
        let newDetail = oldDetail;
        for (const key of ["conversationId", "inviter"]) {
          const oldValue = legacyDetail[key];
          const newKey = key === "conversationId" ? "uuid" : key;
          if (oldValue === void 0) {
            continue;
          }
          changedDetails = true;
          const newValue = getConversationUuid.get({
            conversationId: oldValue
          });
          if (key === "inviter" && !newValue) {
            continue;
          }
          if (!newValue) {
            logger.warn(`updateToSchemaVersion43: ${id}.groupV2Change.details.${key} UUID not found for ${oldValue}`);
            return void 0;
          }
          (0, import_assert.assert)(newDetail.type === legacyDetail.type, "Pacify typescript");
          newDetail = {
            ...(0, import_lodash.omit)(newDetail, key),
            [newKey]: newValue
          };
        }
        return newDetail;
      }).filter(import_isNotNil.isNotNil);
      if (changedDetails) {
        result = {
          ...result,
          groupV2Change: {
            ...result.groupV2Change,
            details
          }
        };
      }
    }
    if (sourceUuid) {
      const newValue = getConversationUuid.get({
        conversationId: sourceUuid
      });
      if (newValue) {
        result = {
          ...result,
          sourceUuid: newValue
        };
      }
    }
    if (invitedGV2Members) {
      const newMembers = invitedGV2Members.map(({ addedByUserId, conversationId }, i) => {
        const uuid = getConversationUuid.get({
          conversationId
        });
        const oldMember = result.invitedGV2Members && result.invitedGV2Members[i];
        (0, import_assert.assert)(oldMember !== void 0, "Pacify typescript");
        if (!uuid) {
          logger.warn(`updateToSchemaVersion43: ${id}.invitedGV2Members UUID not found for ${conversationId}`);
          return void 0;
        }
        const newMember = {
          ...(0, import_lodash.omit)(oldMember, ["conversationId"]),
          uuid
        };
        if (!addedByUserId) {
          return newMember;
        }
        const newAddedBy = getConversationUuid.get({
          conversationId: addedByUserId
        });
        if (!newAddedBy) {
          return newMember;
        }
        return {
          ...newMember,
          addedByUserId: newAddedBy
        };
      }).filter(import_isNotNil.isNotNil);
      result = {
        ...result,
        invitedGV2Members: newMembers
      };
    }
    if (result === message) {
      return false;
    }
    updateMessageStmt.run({
      id: result.id,
      json: JSON.stringify(result),
      sourceUuid: result.sourceUuid ?? null
    });
    return true;
  }, "upgradeMessage");
  db.transaction(() => {
    const allConversations = db.prepare(`
      SELECT json, profileLastFetchedAt
      FROM conversations
      ORDER BY id ASC;
      `).all().map(({ json }) => (0, import_util.jsonToObject)(json));
    logger.info(`updateToSchemaVersion43: About to iterate through ${allConversations.length} conversations`);
    for (const convo of allConversations) {
      upgradeConversation(convo);
    }
    const messageCount = (0, import_util.getCountFromTable)(db, "messages");
    logger.info(`updateToSchemaVersion43: About to iterate through ${messageCount} messages`);
    let updatedCount = 0;
    for (const message of new import_util.TableIterator(db, "messages")) {
      if (upgradeMessage(message)) {
        updatedCount += 1;
      }
    }
    logger.info(`updateToSchemaVersion43: Updated ${updatedCount} messages`);
    db.pragma("user_version = 43");
  })();
  logger.info("updateToSchemaVersion43: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDMtZ3YyLXV1aWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBEYXRhYmFzZSB9IGZyb20gJ2JldHRlci1zcWxpdGUzJztcbmltcG9ydCB7IG9taXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnLi4vLi4vdXRpbC9pc05vdE5pbCc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge1xuICBUYWJsZUl0ZXJhdG9yLFxuICBnZXRDb3VudEZyb21UYWJsZSxcbiAganNvblRvT2JqZWN0LFxuICBvYmplY3RUb0pTT04sXG59IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHR5cGUgeyBFbXB0eVF1ZXJ5LCBRdWVyeSB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlVHlwZSwgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL0ludGVyZmFjZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQzKFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSA0Mykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHR5cGUgTGVnYWN5UGVuZGluZ01lbWJlclR5cGUgPSB7XG4gICAgYWRkZWRCeVVzZXJJZD86IHN0cmluZztcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9O1xuXG4gIHR5cGUgTGVnYWN5QWRtaW5BcHByb3ZhbFR5cGUgPSB7XG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgfTtcblxuICB0eXBlIExlZ2FjeUNvbnZlcnNhdGlvblR5cGUgPSB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBncm91cElkOiBzdHJpbmc7XG4gICAgbWVtYmVyc1YyPzogQXJyYXk8e1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICB9PjtcbiAgICBwZW5kaW5nTWVtYmVyc1YyPzogQXJyYXk8TGVnYWN5UGVuZGluZ01lbWJlclR5cGU+O1xuICAgIHBlbmRpbmdBZG1pbkFwcHJvdmFsVjI/OiBBcnJheTxMZWdhY3lBZG1pbkFwcHJvdmFsVHlwZT47XG4gIH07XG5cbiAgY29uc3QgZ2V0Q29udmVyc2F0aW9uVXVpZCA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIHV1aWRcbiAgICAgIEZST01cbiAgICAgICAgY29udmVyc2F0aW9uc1xuICAgICAgV0hFUkVcbiAgICAgICAgaWQgPSAkY29udmVyc2F0aW9uSWRcbiAgICAgIGBcbiAgICApXG4gICAgLnBsdWNrKCk7XG5cbiAgY29uc3QgdXBkYXRlQ29udmVyc2F0aW9uU3RtdCA9IGRiLnByZXBhcmUoXG4gICAgYFxuICAgIFVQREFURSBjb252ZXJzYXRpb25zIFNFVFxuICAgICAganNvbiA9ICRqc29uLFxuICAgICAgbWVtYmVycyA9ICRtZW1iZXJzXG4gICAgV0hFUkUgaWQgPSAkaWQ7XG4gICAgYFxuICApO1xuXG4gIGNvbnN0IHVwZGF0ZU1lc3NhZ2VTdG10ID0gZGIucHJlcGFyZShcbiAgICBgXG4gICAgVVBEQVRFIG1lc3NhZ2VzIFNFVFxuICAgICAganNvbiA9ICRqc29uLFxuICAgICAgc291cmNlVXVpZCA9ICRzb3VyY2VVdWlkXG4gICAgV0hFUkUgaWQgPSAkaWQ7XG4gICAgYFxuICApO1xuXG4gIGNvbnN0IHVwZ3JhZGVDb252ZXJzYXRpb24gPSAoY29udm86IENvbnZlcnNhdGlvblR5cGUpID0+IHtcbiAgICBjb25zdCBsZWdhY3kgPSBjb252byBhcyB1bmtub3duIGFzIExlZ2FjeUNvbnZlcnNhdGlvblR5cGU7XG4gICAgbGV0IHJlc3VsdCA9IGNvbnZvO1xuXG4gICAgY29uc3QgbG9nSWQgPSBgKCR7bGVnYWN5LmlkfSkgZ3JvdXB2Migke2xlZ2FjeS5ncm91cElkfSlgO1xuXG4gICAgY29uc3QgbWVtYmVyS2V5czogQXJyYXk8a2V5b2YgTGVnYWN5Q29udmVyc2F0aW9uVHlwZT4gPSBbXG4gICAgICAnbWVtYmVyc1YyJyxcbiAgICAgICdwZW5kaW5nTWVtYmVyc1YyJyxcbiAgICAgICdwZW5kaW5nQWRtaW5BcHByb3ZhbFYyJyxcbiAgICBdO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIG1lbWJlcktleXMpIHtcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gbGVnYWN5W2tleV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkob2xkVmFsdWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgYWRkZWRCeUNvdW50ID0gMDtcblxuICAgICAgY29uc3QgbmV3VmFsdWUgPSBvbGRWYWx1ZVxuICAgICAgICAubWFwKG1lbWJlciA9PiB7XG4gICAgICAgICAgY29uc3QgdXVpZDogVVVJRFN0cmluZ1R5cGUgPSBnZXRDb252ZXJzYXRpb25VdWlkLmdldCh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogbWVtYmVyLmNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghdXVpZCkge1xuICAgICAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgICAgIGB1cGRhdGVUb1NjaGVtYVZlcnNpb240MzogJHtsb2dJZH0uJHtrZXl9IFVVSUQgbm90IGZvdW5kIGAgK1xuICAgICAgICAgICAgICAgIGBmb3IgJHttZW1iZXIuY29udmVyc2F0aW9uSWR9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHtcbiAgICAgICAgICAgIC4uLm9taXQobWVtYmVyLCAnY29udmVyc2F0aW9uSWQnKSxcbiAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIFdlIHByZXZpb3VzbHkgc3RvcmVkIG91ciBjb252ZXJzYXRpb25cbiAgICAgICAgICBpZiAoISgnYWRkZWRCeVVzZXJJZCcgaW4gbWVtYmVyKSB8fCAhbWVtYmVyLmFkZGVkQnlVc2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGFkZGVkQnlVc2VySWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkID1cbiAgICAgICAgICAgIGdldENvbnZlcnNhdGlvblV1aWQuZ2V0KHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IG1lbWJlci5hZGRlZEJ5VXNlcklkLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWFkZGVkQnlVc2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFkZGVkQnlDb3VudCArPSAxO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnVwZGF0ZWQsXG4gICAgICAgICAgICBhZGRlZEJ5VXNlcklkLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuXG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgW2tleV06IG5ld1ZhbHVlLFxuICAgICAgfTtcblxuICAgICAgaWYgKG9sZFZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgICBgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDM6IG1pZ3JhdGVkICR7b2xkVmFsdWUubGVuZ3RofSAke2tleX0gYCArXG4gICAgICAgICAgICBgZW50cmllcyB0byAke25ld1ZhbHVlLmxlbmd0aH0gZm9yICR7bG9nSWR9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWRkZWRCeUNvdW50ID4gMCkge1xuICAgICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgICBgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDM6IG1pZ3JhdGVkICR7YWRkZWRCeUNvdW50fSBhZGRlZEJ5VXNlcklkIGAgK1xuICAgICAgICAgICAgYGluICR7a2V5fSBmb3IgJHtsb2dJZH1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCA9PT0gY29udm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZGJNZW1iZXJzOiBzdHJpbmcgfCBudWxsO1xuICAgIGlmIChyZXN1bHQubWVtYmVyc1YyKSB7XG4gICAgICBkYk1lbWJlcnMgPSByZXN1bHQubWVtYmVyc1YyLm1hcChpdGVtID0+IGl0ZW0udXVpZCkuam9pbignICcpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0Lm1lbWJlcnMpIHtcbiAgICAgIGRiTWVtYmVycyA9IHJlc3VsdC5tZW1iZXJzLmpvaW4oJyAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGJNZW1iZXJzID0gbnVsbDtcbiAgICB9XG5cbiAgICB1cGRhdGVDb252ZXJzYXRpb25TdG10LnJ1bih7XG4gICAgICBpZDogcmVzdWx0LmlkLFxuICAgICAganNvbjogb2JqZWN0VG9KU09OKHJlc3VsdCksXG4gICAgICBtZW1iZXJzOiBkYk1lbWJlcnMsXG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBMZWdhY3lNZXNzYWdlVHlwZSA9IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGdyb3VwVjJDaGFuZ2U/OiB7XG4gICAgICBmcm9tOiBzdHJpbmc7XG4gICAgICBkZXRhaWxzOiBBcnJheTxcbiAgICAgICAgKFxuICAgICAgICAgIHwge1xuICAgICAgICAgICAgICB0eXBlOlxuICAgICAgICAgICAgICAgIHwgJ21lbWJlci1hZGQnXG4gICAgICAgICAgICAgICAgfCAnbWVtYmVyLWFkZC1mcm9tLWludml0ZSdcbiAgICAgICAgICAgICAgICB8ICdtZW1iZXItYWRkLWZyb20tbGluaydcbiAgICAgICAgICAgICAgICB8ICdtZW1iZXItYWRkLWZyb20tYWRtaW4tYXBwcm92YWwnXG4gICAgICAgICAgICAgICAgfCAnbWVtYmVyLXByaXZpbGVnZSdcbiAgICAgICAgICAgICAgICB8ICdtZW1iZXItcmVtb3ZlJ1xuICAgICAgICAgICAgICAgIHwgJ3BlbmRpbmctYWRkLW9uZSdcbiAgICAgICAgICAgICAgICB8ICdwZW5kaW5nLXJlbW92ZS1vbmUnXG4gICAgICAgICAgICAgICAgfCAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZSdcbiAgICAgICAgICAgICAgICB8ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJztcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB8IHtcbiAgICAgICAgICAgICAgdHlwZTogdW5rbm93bjtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ/OiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICkgJlxuICAgICAgICAgIChcbiAgICAgICAgICAgIHwge1xuICAgICAgICAgICAgICAgIHR5cGU6XG4gICAgICAgICAgICAgICAgICB8ICdtZW1iZXItYWRkLWZyb20taW52aXRlJ1xuICAgICAgICAgICAgICAgICAgfCAncGVuZGluZy1yZW1vdmUtb25lJ1xuICAgICAgICAgICAgICAgICAgfCAncGVuZGluZy1yZW1vdmUtbWFueSdcbiAgICAgICAgICAgICAgICAgIHwgJ2FkbWluLWFwcHJvdmFsLXJlbW92ZS1vbmUnO1xuICAgICAgICAgICAgICAgIGludml0ZXI6IHN0cmluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfCB7XG4gICAgICAgICAgICAgICAgaW52aXRlcj86IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgID47XG4gICAgfTtcbiAgICBzb3VyY2VVdWlkOiBzdHJpbmc7XG4gICAgaW52aXRlZEdWMk1lbWJlcnM/OiBBcnJheTxMZWdhY3lQZW5kaW5nTWVtYmVyVHlwZT47XG4gIH07XG5cbiAgY29uc3QgdXBncmFkZU1lc3NhZ2UgPSAobWVzc2FnZTogTWVzc2FnZVR5cGUpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCB7IGlkLCBncm91cFYyQ2hhbmdlLCBzb3VyY2VVdWlkLCBpbnZpdGVkR1YyTWVtYmVycyB9ID1cbiAgICAgIG1lc3NhZ2UgYXMgdW5rbm93biBhcyBMZWdhY3lNZXNzYWdlVHlwZTtcbiAgICBsZXQgcmVzdWx0ID0gbWVzc2FnZTtcblxuICAgIGlmIChncm91cFYyQ2hhbmdlKSB7XG4gICAgICBhc3NlcnQocmVzdWx0Lmdyb3VwVjJDaGFuZ2UsICdQYWNpZnkgdHlwZXNjcmlwdCcpO1xuXG4gICAgICBjb25zdCBmcm9tOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZCA9IGdldENvbnZlcnNhdGlvblV1aWQuZ2V0KHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGdyb3VwVjJDaGFuZ2UuZnJvbSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZnJvbSkge1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgICAgIC4uLnJlc3VsdC5ncm91cFYyQ2hhbmdlLFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgIC4uLnJlc3VsdCxcbiAgICAgICAgICBncm91cFYyQ2hhbmdlOiBvbWl0KHJlc3VsdC5ncm91cFYyQ2hhbmdlLCBbJ2Zyb20nXSksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGxldCBjaGFuZ2VkRGV0YWlscyA9IGZhbHNlO1xuICAgICAgY29uc3QgZGV0YWlscyA9IGdyb3VwVjJDaGFuZ2UuZGV0YWlsc1xuICAgICAgICAubWFwKChsZWdhY3lEZXRhaWwsIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBvbGREZXRhaWwgPSByZXN1bHQuZ3JvdXBWMkNoYW5nZT8uZGV0YWlsc1tpXTtcbiAgICAgICAgICBhc3NlcnQob2xkRGV0YWlsLCAnUGFjaWZ5IHR5cGVzY3JpcHQnKTtcbiAgICAgICAgICBsZXQgbmV3RGV0YWlsID0gb2xkRGV0YWlsO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgWydjb252ZXJzYXRpb25JZCcgYXMgY29uc3QsICdpbnZpdGVyJyBhcyBjb25zdF0pIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gbGVnYWN5RGV0YWlsW2tleV07XG4gICAgICAgICAgICBjb25zdCBuZXdLZXkgPSBrZXkgPT09ICdjb252ZXJzYXRpb25JZCcgPyAndXVpZCcgOiBrZXk7XG5cbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhbmdlZERldGFpbHMgPSB0cnVlO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZTogVVVJRFN0cmluZ1R5cGUgfCBudWxsID0gZ2V0Q29udmVyc2F0aW9uVXVpZC5nZXQoe1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogb2xkVmFsdWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdpbnZpdGVyJyAmJiAhbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgICAgICAgIGB1cGRhdGVUb1NjaGVtYVZlcnNpb240MzogJHtpZH0uZ3JvdXBWMkNoYW5nZS5kZXRhaWxzLiR7a2V5fSBgICtcbiAgICAgICAgICAgICAgICAgIGBVVUlEIG5vdCBmb3VuZCBmb3IgJHtvbGRWYWx1ZX1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2VydChuZXdEZXRhaWwudHlwZSA9PT0gbGVnYWN5RGV0YWlsLnR5cGUsICdQYWNpZnkgdHlwZXNjcmlwdCcpO1xuICAgICAgICAgICAgbmV3RGV0YWlsID0ge1xuICAgICAgICAgICAgICAuLi5vbWl0KG5ld0RldGFpbCwga2V5KSxcbiAgICAgICAgICAgICAgW25ld0tleV06IG5ld1ZhbHVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3RGV0YWlsO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKGlzTm90TmlsKTtcblxuICAgICAgaWYgKGNoYW5nZWREZXRhaWxzKSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAuLi5yZXN1bHQsXG4gICAgICAgICAgZ3JvdXBWMkNoYW5nZToge1xuICAgICAgICAgICAgLi4ucmVzdWx0Lmdyb3VwVjJDaGFuZ2UsXG4gICAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZVV1aWQpIHtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBVVUlEU3RyaW5nVHlwZSB8IG51bGwgPSBnZXRDb252ZXJzYXRpb25VdWlkLmdldCh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBzb3VyY2VVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgIHNvdXJjZVV1aWQ6IG5ld1ZhbHVlLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbnZpdGVkR1YyTWVtYmVycykge1xuICAgICAgY29uc3QgbmV3TWVtYmVycyA9IGludml0ZWRHVjJNZW1iZXJzXG4gICAgICAgIC5tYXAoKHsgYWRkZWRCeVVzZXJJZCwgY29udmVyc2F0aW9uSWQgfSwgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHV1aWQ6IFVVSURTdHJpbmdUeXBlIHwgbnVsbCA9IGdldENvbnZlcnNhdGlvblV1aWQuZ2V0KHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnN0IG9sZE1lbWJlciA9XG4gICAgICAgICAgICByZXN1bHQuaW52aXRlZEdWMk1lbWJlcnMgJiYgcmVzdWx0Lmludml0ZWRHVjJNZW1iZXJzW2ldO1xuICAgICAgICAgIGFzc2VydChvbGRNZW1iZXIgIT09IHVuZGVmaW5lZCwgJ1BhY2lmeSB0eXBlc2NyaXB0Jyk7XG5cbiAgICAgICAgICBpZiAoIXV1aWQpIHtcbiAgICAgICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgICAgICBgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDM6ICR7aWR9Lmludml0ZWRHVjJNZW1iZXJzIFVVSUQgYCArXG4gICAgICAgICAgICAgICAgYG5vdCBmb3VuZCBmb3IgJHtjb252ZXJzYXRpb25JZH1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBuZXdNZW1iZXIgPSB7XG4gICAgICAgICAgICAuLi5vbWl0KG9sZE1lbWJlciwgWydjb252ZXJzYXRpb25JZCddKSxcbiAgICAgICAgICAgIHV1aWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghYWRkZWRCeVVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ld01lbWJlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBuZXdBZGRlZEJ5OiBVVUlEU3RyaW5nVHlwZSB8IG51bGwgPSBnZXRDb252ZXJzYXRpb25VdWlkLmdldCh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogYWRkZWRCeVVzZXJJZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIW5ld0FkZGVkQnkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdNZW1iZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLm5ld01lbWJlcixcbiAgICAgICAgICAgIGFkZGVkQnlVc2VySWQ6IG5ld0FkZGVkQnksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihpc05vdE5pbCk7XG5cbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICBpbnZpdGVkR1YyTWVtYmVyczogbmV3TWVtYmVycyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCA9PT0gbWVzc2FnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZU1lc3NhZ2VTdG10LnJ1bih7XG4gICAgICBpZDogcmVzdWx0LmlkLFxuICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSxcbiAgICAgIHNvdXJjZVV1aWQ6IHJlc3VsdC5zb3VyY2VVdWlkID8/IG51bGwsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3QgYWxsQ29udmVyc2F0aW9ucyA9IGRiXG4gICAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgU0VMRUNUIGpzb24sIHByb2ZpbGVMYXN0RmV0Y2hlZEF0XG4gICAgICBGUk9NIGNvbnZlcnNhdGlvbnNcbiAgICAgIE9SREVSIEJZIGlkIEFTQztcbiAgICAgIGBcbiAgICAgIClcbiAgICAgIC5hbGwoKVxuICAgICAgLm1hcCgoeyBqc29uIH0pID0+IGpzb25Ub09iamVjdDxDb252ZXJzYXRpb25UeXBlPihqc29uKSk7XG5cbiAgICBsb2dnZXIuaW5mbyhcbiAgICAgICd1cGRhdGVUb1NjaGVtYVZlcnNpb240MzogQWJvdXQgdG8gaXRlcmF0ZSB0aHJvdWdoICcgK1xuICAgICAgICBgJHthbGxDb252ZXJzYXRpb25zLmxlbmd0aH0gY29udmVyc2F0aW9uc2BcbiAgICApO1xuXG4gICAgZm9yIChjb25zdCBjb252byBvZiBhbGxDb252ZXJzYXRpb25zKSB7XG4gICAgICB1cGdyYWRlQ29udmVyc2F0aW9uKGNvbnZvKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlQ291bnQgPSBnZXRDb3VudEZyb21UYWJsZShkYiwgJ21lc3NhZ2VzJyk7XG4gICAgbG9nZ2VyLmluZm8oXG4gICAgICAndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDM6IEFib3V0IHRvIGl0ZXJhdGUgdGhyb3VnaCAnICtcbiAgICAgICAgYCR7bWVzc2FnZUNvdW50fSBtZXNzYWdlc2BcbiAgICApO1xuXG4gICAgbGV0IHVwZGF0ZWRDb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIG5ldyBUYWJsZUl0ZXJhdG9yPE1lc3NhZ2VUeXBlPihkYiwgJ21lc3NhZ2VzJykpIHtcbiAgICAgIGlmICh1cGdyYWRlTWVzc2FnZShtZXNzYWdlKSkge1xuICAgICAgICB1cGRhdGVkQ291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbyhgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDM6IFVwZGF0ZWQgJHt1cGRhdGVkQ291bnR9IG1lc3NhZ2VzYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDQzJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVU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
