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
var migrations_exports = {};
__export(migrations_exports, {
  SCHEMA_VERSIONS: () => SCHEMA_VERSIONS,
  updateSchema: () => updateSchema
});
module.exports = __toCommonJS(migrations_exports);
var import_lodash = require("lodash");
var import_UUID = require("../../types/UUID");
var import_util = require("../util");
var import_uuid_keys = __toESM(require("./41-uuid-keys"));
var import_stale_reactions = __toESM(require("./42-stale-reactions"));
var import_gv2_uuid = __toESM(require("./43-gv2-uuid"));
var import_badges = __toESM(require("./44-badges"));
var import_stories = __toESM(require("./45-stories"));
var import_optimize_stories = __toESM(require("./46-optimize-stories"));
var import_further_optimize = __toESM(require("./47-further-optimize"));
var import_fix_user_initiated_index = __toESM(require("./48-fix-user-initiated-index"));
var import_fix_preview_index = __toESM(require("./49-fix-preview-index"));
var import_fix_messages_unread_index = __toESM(require("./50-fix-messages-unread-index"));
var import_centralize_conversation_jobs = __toESM(require("./51-centralize-conversation-jobs"));
var import_optimize_stories2 = __toESM(require("./52-optimize-stories"));
var import_gv2_banned_members = __toESM(require("./53-gv2-banned-members"));
var import_unprocessed_received_at_counter = __toESM(require("./54-unprocessed-received-at-counter"));
var import_report_message_aci = __toESM(require("./55-report-message-aci"));
var import_add_unseen_to_message = __toESM(require("./56-add-unseen-to-message"));
var import_rm_message_history_unsynced = __toESM(require("./57-rm-message-history-unsynced"));
var import_update_unread = __toESM(require("./58-update-unread"));
var import_unprocessed_received_at_counter_index = __toESM(require("./59-unprocessed-received-at-counter-index"));
var import_update_expiring_index = __toESM(require("./60-update-expiring-index"));
function updateToSchemaVersion1(currentVersion, db, logger) {
  if (currentVersion >= 1) {
    return;
  }
  logger.info("updateToSchemaVersion1: starting...");
  db.transaction(() => {
    db.exec(`
      CREATE TABLE messages(
        id STRING PRIMARY KEY ASC,
        json TEXT,

        unread INTEGER,
        expires_at INTEGER,
        sent_at INTEGER,
        schemaVersion INTEGER,
        conversationId STRING,
        received_at INTEGER,
        source STRING,
        sourceDevice STRING,
        hasAttachments INTEGER,
        hasFileAttachments INTEGER,
        hasVisualMediaAttachments INTEGER
      );
      CREATE INDEX messages_unread ON messages (
        unread
      );
      CREATE INDEX messages_expires_at ON messages (
        expires_at
      );
      CREATE INDEX messages_receipt ON messages (
        sent_at
      );
      CREATE INDEX messages_schemaVersion ON messages (
        schemaVersion
      );
      CREATE INDEX messages_conversation ON messages (
        conversationId,
        received_at
      );
      CREATE INDEX messages_duplicate_check ON messages (
        source,
        sourceDevice,
        sent_at
      );
      CREATE INDEX messages_hasAttachments ON messages (
        conversationId,
        hasAttachments,
        received_at
      );
      CREATE INDEX messages_hasFileAttachments ON messages (
        conversationId,
        hasFileAttachments,
        received_at
      );
      CREATE INDEX messages_hasVisualMediaAttachments ON messages (
        conversationId,
        hasVisualMediaAttachments,
        received_at
      );
      CREATE TABLE unprocessed(
        id STRING,
        timestamp INTEGER,
        json TEXT
      );
      CREATE INDEX unprocessed_id ON unprocessed (
        id
      );
      CREATE INDEX unprocessed_timestamp ON unprocessed (
        timestamp
      );
    `);
    db.pragma("user_version = 1");
  })();
  logger.info("updateToSchemaVersion1: success!");
}
function updateToSchemaVersion2(currentVersion, db, logger) {
  if (currentVersion >= 2) {
    return;
  }
  logger.info("updateToSchemaVersion2: starting...");
  db.transaction(() => {
    db.exec(`
      ALTER TABLE messages
        ADD COLUMN expireTimer INTEGER;

      ALTER TABLE messages
        ADD COLUMN expirationStartTimestamp INTEGER;

      ALTER TABLE messages
        ADD COLUMN type STRING;

      CREATE INDEX messages_expiring ON messages (
        expireTimer,
        expirationStartTimestamp,
        expires_at
      );

      UPDATE messages SET
        expirationStartTimestamp = json_extract(json, '$.expirationStartTimestamp'),
        expireTimer = json_extract(json, '$.expireTimer'),
        type = json_extract(json, '$.type');
    `);
    db.pragma("user_version = 2");
  })();
  logger.info("updateToSchemaVersion2: success!");
}
function updateToSchemaVersion3(currentVersion, db, logger) {
  if (currentVersion >= 3) {
    return;
  }
  logger.info("updateToSchemaVersion3: starting...");
  db.transaction(() => {
    db.exec(`
      DROP INDEX messages_expiring;
      DROP INDEX messages_unread;

      CREATE INDEX messages_without_timer ON messages (
        expireTimer,
        expires_at,
        type
      ) WHERE expires_at IS NULL AND expireTimer IS NOT NULL;

      CREATE INDEX messages_unread ON messages (
        conversationId,
        unread
      ) WHERE unread IS NOT NULL;

      ANALYZE;
    `);
    db.pragma("user_version = 3");
  })();
  logger.info("updateToSchemaVersion3: success!");
}
function updateToSchemaVersion4(currentVersion, db, logger) {
  if (currentVersion >= 4) {
    return;
  }
  logger.info("updateToSchemaVersion4: starting...");
  db.transaction(() => {
    db.exec(`
      CREATE TABLE conversations(
        id STRING PRIMARY KEY ASC,
        json TEXT,

        active_at INTEGER,
        type STRING,
        members TEXT,
        name TEXT,
        profileName TEXT
      );
      CREATE INDEX conversations_active ON conversations (
        active_at
      ) WHERE active_at IS NOT NULL;

      CREATE INDEX conversations_type ON conversations (
        type
      ) WHERE type IS NOT NULL;
    `);
    db.pragma("user_version = 4");
  })();
  logger.info("updateToSchemaVersion4: success!");
}
function updateToSchemaVersion6(currentVersion, db, logger) {
  if (currentVersion >= 6) {
    return;
  }
  logger.info("updateToSchemaVersion6: starting...");
  db.transaction(() => {
    db.exec(`
      -- key-value, ids are strings, one extra column
      CREATE TABLE sessions(
        id STRING PRIMARY KEY ASC,
        number STRING,
        json TEXT
      );
      CREATE INDEX sessions_number ON sessions (
        number
      ) WHERE number IS NOT NULL;
      -- key-value, ids are strings
      CREATE TABLE groups(
        id STRING PRIMARY KEY ASC,
        json TEXT
      );
      CREATE TABLE identityKeys(
        id STRING PRIMARY KEY ASC,
        json TEXT
      );
      CREATE TABLE items(
        id STRING PRIMARY KEY ASC,
        json TEXT
      );
      -- key-value, ids are integers
      CREATE TABLE preKeys(
        id INTEGER PRIMARY KEY ASC,
        json TEXT
      );
      CREATE TABLE signedPreKeys(
        id INTEGER PRIMARY KEY ASC,
        json TEXT
      );
    `);
    db.pragma("user_version = 6");
  })();
  logger.info("updateToSchemaVersion6: success!");
}
function updateToSchemaVersion7(currentVersion, db, logger) {
  if (currentVersion >= 7) {
    return;
  }
  logger.info("updateToSchemaVersion7: starting...");
  db.transaction(() => {
    db.exec(`
      -- SQLite has been coercing our STRINGs into numbers, so we force it with TEXT
      -- We create a new table then copy the data into it, since we can't modify columns
      DROP INDEX sessions_number;
      ALTER TABLE sessions RENAME TO sessions_old;

      CREATE TABLE sessions(
        id TEXT PRIMARY KEY,
        number TEXT,
        json TEXT
      );
      CREATE INDEX sessions_number ON sessions (
        number
      ) WHERE number IS NOT NULL;
      INSERT INTO sessions(id, number, json)
        SELECT "+" || id, number, json FROM sessions_old;
      DROP TABLE sessions_old;
    `);
    db.pragma("user_version = 7");
  })();
  logger.info("updateToSchemaVersion7: success!");
}
function updateToSchemaVersion8(currentVersion, db, logger) {
  if (currentVersion >= 8) {
    return;
  }
  logger.info("updateToSchemaVersion8: starting...");
  db.transaction(() => {
    db.exec(`
      -- First, we pull a new body field out of the message table's json blob
      ALTER TABLE messages
        ADD COLUMN body TEXT;
      UPDATE messages SET body = json_extract(json, '$.body');

      -- Then we create our full-text search table and populate it
      CREATE VIRTUAL TABLE messages_fts
        USING fts5(id UNINDEXED, body);

      INSERT INTO messages_fts(id, body)
        SELECT id, body FROM messages;

      -- Then we set up triggers to keep the full-text search table up to date
      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages BEGIN
        INSERT INTO messages_fts (
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
      CREATE TRIGGER messages_on_delete AFTER DELETE ON messages BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
      END;
      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
        INSERT INTO messages_fts(
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
    `);
    db.pragma("user_version = 8");
  })();
  logger.info("updateToSchemaVersion8: success!");
}
function updateToSchemaVersion9(currentVersion, db, logger) {
  if (currentVersion >= 9) {
    return;
  }
  logger.info("updateToSchemaVersion9: starting...");
  db.transaction(() => {
    db.exec(`
      CREATE TABLE attachment_downloads(
        id STRING primary key,
        timestamp INTEGER,
        pending INTEGER,
        json TEXT
      );

      CREATE INDEX attachment_downloads_timestamp
        ON attachment_downloads (
          timestamp
      ) WHERE pending = 0;
      CREATE INDEX attachment_downloads_pending
        ON attachment_downloads (
          pending
      ) WHERE pending != 0;
    `);
    db.pragma("user_version = 9");
  })();
  logger.info("updateToSchemaVersion9: success!");
}
function updateToSchemaVersion10(currentVersion, db, logger) {
  if (currentVersion >= 10) {
    return;
  }
  logger.info("updateToSchemaVersion10: starting...");
  db.transaction(() => {
    db.exec(`
      DROP INDEX unprocessed_id;
      DROP INDEX unprocessed_timestamp;
      ALTER TABLE unprocessed RENAME TO unprocessed_old;

      CREATE TABLE unprocessed(
        id STRING,
        timestamp INTEGER,
        version INTEGER,
        attempts INTEGER,
        envelope TEXT,
        decrypted TEXT,
        source TEXT,
        sourceDevice TEXT,
        serverTimestamp INTEGER
      );

      CREATE INDEX unprocessed_id ON unprocessed (
        id
      );
      CREATE INDEX unprocessed_timestamp ON unprocessed (
        timestamp
      );

      INSERT INTO unprocessed (
        id,
        timestamp,
        version,
        attempts,
        envelope,
        decrypted,
        source,
        sourceDevice,
        serverTimestamp
      ) SELECT
        id,
        timestamp,
        json_extract(json, '$.version'),
        json_extract(json, '$.attempts'),
        json_extract(json, '$.envelope'),
        json_extract(json, '$.decrypted'),
        json_extract(json, '$.source'),
        json_extract(json, '$.sourceDevice'),
        json_extract(json, '$.serverTimestamp')
      FROM unprocessed_old;

      DROP TABLE unprocessed_old;
    `);
    db.pragma("user_version = 10");
  })();
  logger.info("updateToSchemaVersion10: success!");
}
function updateToSchemaVersion11(currentVersion, db, logger) {
  if (currentVersion >= 11) {
    return;
  }
  logger.info("updateToSchemaVersion11: starting...");
  db.transaction(() => {
    db.exec(`
      DROP TABLE groups;
    `);
    db.pragma("user_version = 11");
  })();
  logger.info("updateToSchemaVersion11: success!");
}
function updateToSchemaVersion12(currentVersion, db, logger) {
  if (currentVersion >= 12) {
    return;
  }
  logger.info("updateToSchemaVersion12: starting...");
  db.transaction(() => {
    db.exec(`
      CREATE TABLE sticker_packs(
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL,

        author STRING,
        coverStickerId INTEGER,
        createdAt INTEGER,
        downloadAttempts INTEGER,
        installedAt INTEGER,
        lastUsed INTEGER,
        status STRING,
        stickerCount INTEGER,
        title STRING
      );

      CREATE TABLE stickers(
        id INTEGER NOT NULL,
        packId TEXT NOT NULL,

        emoji STRING,
        height INTEGER,
        isCoverOnly INTEGER,
        lastUsed INTEGER,
        path STRING,
        width INTEGER,

        PRIMARY KEY (id, packId),
        CONSTRAINT stickers_fk
          FOREIGN KEY (packId)
          REFERENCES sticker_packs(id)
          ON DELETE CASCADE
      );

      CREATE INDEX stickers_recents
        ON stickers (
          lastUsed
      ) WHERE lastUsed IS NOT NULL;

      CREATE TABLE sticker_references(
        messageId STRING,
        packId TEXT,
        CONSTRAINT sticker_references_fk
          FOREIGN KEY(packId)
          REFERENCES sticker_packs(id)
          ON DELETE CASCADE
      );
    `);
    db.pragma("user_version = 12");
  })();
  logger.info("updateToSchemaVersion12: success!");
}
function updateToSchemaVersion13(currentVersion, db, logger) {
  if (currentVersion >= 13) {
    return;
  }
  logger.info("updateToSchemaVersion13: starting...");
  db.transaction(() => {
    db.exec(`
      ALTER TABLE sticker_packs ADD COLUMN attemptedStatus STRING;
    `);
    db.pragma("user_version = 13");
  })();
  logger.info("updateToSchemaVersion13: success!");
}
function updateToSchemaVersion14(currentVersion, db, logger) {
  if (currentVersion >= 14) {
    return;
  }
  logger.info("updateToSchemaVersion14: starting...");
  db.transaction(() => {
    db.exec(`
      CREATE TABLE emojis(
        shortName STRING PRIMARY KEY,
        lastUsage INTEGER
      );

      CREATE INDEX emojis_lastUsage
        ON emojis (
          lastUsage
      );
    `);
    db.pragma("user_version = 14");
  })();
  logger.info("updateToSchemaVersion14: success!");
}
function updateToSchemaVersion15(currentVersion, db, logger) {
  if (currentVersion >= 15) {
    return;
  }
  logger.info("updateToSchemaVersion15: starting...");
  db.transaction(() => {
    db.exec(`
      -- SQLite has again coerced our STRINGs into numbers, so we force it with TEXT
      -- We create a new table then copy the data into it, since we can't modify columns

      DROP INDEX emojis_lastUsage;
      ALTER TABLE emojis RENAME TO emojis_old;

      CREATE TABLE emojis(
        shortName TEXT PRIMARY KEY,
        lastUsage INTEGER
      );
      CREATE INDEX emojis_lastUsage
        ON emojis (
          lastUsage
      );

      DELETE FROM emojis WHERE shortName = 1;
      INSERT INTO emojis(shortName, lastUsage)
        SELECT shortName, lastUsage FROM emojis_old;

      DROP TABLE emojis_old;
    `);
    db.pragma("user_version = 15");
  })();
  logger.info("updateToSchemaVersion15: success!");
}
function updateToSchemaVersion16(currentVersion, db, logger) {
  if (currentVersion >= 16) {
    return;
  }
  logger.info("updateToSchemaVersion16: starting...");
  db.transaction(() => {
    db.exec(`
      ALTER TABLE messages
      ADD COLUMN messageTimer INTEGER;
      ALTER TABLE messages
      ADD COLUMN messageTimerStart INTEGER;
      ALTER TABLE messages
      ADD COLUMN messageTimerExpiresAt INTEGER;
      ALTER TABLE messages
      ADD COLUMN isErased INTEGER;

      CREATE INDEX messages_message_timer ON messages (
        messageTimer,
        messageTimerStart,
        messageTimerExpiresAt,
        isErased
      ) WHERE messageTimer IS NOT NULL;

      -- Updating full-text triggers to avoid anything with a messageTimer set

      DROP TRIGGER messages_on_insert;
      DROP TRIGGER messages_on_delete;
      DROP TRIGGER messages_on_update;

      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages
      WHEN new.messageTimer IS NULL
      BEGIN
        INSERT INTO messages_fts (
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
      CREATE TRIGGER messages_on_delete AFTER DELETE ON messages BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
      END;
      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN new.messageTimer IS NULL
      BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
        INSERT INTO messages_fts(
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
    `);
    db.pragma("user_version = 16");
  })();
  logger.info("updateToSchemaVersion16: success!");
}
function updateToSchemaVersion17(currentVersion, db, logger) {
  if (currentVersion >= 17) {
    return;
  }
  logger.info("updateToSchemaVersion17: starting...");
  db.transaction(() => {
    try {
      db.exec(`
        ALTER TABLE messages
        ADD COLUMN isViewOnce INTEGER;

        DROP INDEX messages_message_timer;
      `);
    } catch (error) {
      logger.info("updateToSchemaVersion17: Message table already had isViewOnce column");
    }
    try {
      db.exec("DROP INDEX messages_view_once;");
    } catch (error) {
      logger.info("updateToSchemaVersion17: Index messages_view_once did not already exist");
    }
    db.exec(`
      CREATE INDEX messages_view_once ON messages (
        isErased
      ) WHERE isViewOnce = 1;

      -- Updating full-text triggers to avoid anything with isViewOnce = 1

      DROP TRIGGER messages_on_insert;
      DROP TRIGGER messages_on_update;

      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages
      WHEN new.isViewOnce != 1
      BEGIN
        INSERT INTO messages_fts (
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN new.isViewOnce != 1
      BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
        INSERT INTO messages_fts(
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
    `);
    db.pragma("user_version = 17");
  })();
  logger.info("updateToSchemaVersion17: success!");
}
function updateToSchemaVersion18(currentVersion, db, logger) {
  if (currentVersion >= 18) {
    return;
  }
  logger.info("updateToSchemaVersion18: starting...");
  db.transaction(() => {
    db.exec(`
      -- Delete and rebuild full-text search index to capture everything

      DELETE FROM messages_fts;
      INSERT INTO messages_fts(messages_fts) VALUES('rebuild');

      INSERT INTO messages_fts(id, body)
      SELECT id, body FROM messages WHERE isViewOnce IS NULL OR isViewOnce != 1;

      -- Fixing full-text triggers

      DROP TRIGGER messages_on_insert;
      DROP TRIGGER messages_on_update;

      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages
      WHEN new.isViewOnce IS NULL OR new.isViewOnce != 1
      BEGIN
        INSERT INTO messages_fts (
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN new.isViewOnce IS NULL OR new.isViewOnce != 1
      BEGIN
        DELETE FROM messages_fts WHERE id = old.id;
        INSERT INTO messages_fts(
          id,
          body
        ) VALUES (
          new.id,
          new.body
        );
      END;
    `);
    db.pragma("user_version = 18");
  })();
  logger.info("updateToSchemaVersion18: success!");
}
function updateToSchemaVersion19(currentVersion, db, logger) {
  if (currentVersion >= 19) {
    return;
  }
  logger.info("updateToSchemaVersion19: starting...");
  db.transaction(() => {
    db.exec(`
      ALTER TABLE conversations
      ADD COLUMN profileFamilyName TEXT;
      ALTER TABLE conversations
      ADD COLUMN profileFullName TEXT;

      -- Preload new field with the profileName we already have
      UPDATE conversations SET profileFullName = profileName;
    `);
    db.pragma("user_version = 19");
  })();
  logger.info("updateToSchemaVersion19: success!");
}
function updateToSchemaVersion20(currentVersion, db, logger) {
  if (currentVersion >= 20) {
    return;
  }
  logger.info("updateToSchemaVersion20: starting...");
  db.transaction(() => {
    const triggers = db.prepare('SELECT * FROM sqlite_master WHERE type = "trigger" AND tbl_name = "messages"').all();
    for (const trigger of triggers) {
      db.exec(`DROP TRIGGER ${trigger.name}`);
    }
    db.exec(`
      ALTER TABLE conversations ADD COLUMN e164 TEXT;
      ALTER TABLE conversations ADD COLUMN uuid TEXT;
      ALTER TABLE conversations ADD COLUMN groupId TEXT;
      ALTER TABLE messages ADD COLUMN sourceUuid TEXT;
      ALTER TABLE sessions RENAME COLUMN number TO conversationId;
      CREATE INDEX conversations_e164 ON conversations(e164);
      CREATE INDEX conversations_uuid ON conversations(uuid);
      CREATE INDEX conversations_groupId ON conversations(groupId);
      CREATE INDEX messages_sourceUuid on messages(sourceUuid);

      -- Migrate existing IDs
      UPDATE conversations SET e164 = '+' || id WHERE type = 'private';
      UPDATE conversations SET groupId = id WHERE type = 'group';
    `);
    const maybeInvalidGroups = db.prepare("SELECT * FROM conversations WHERE type = 'group' AND members IS NULL;").all();
    for (const group of maybeInvalidGroups) {
      const json = JSON.parse(group.json);
      if (!json.members || !json.members.length) {
        db.prepare("DELETE FROM conversations WHERE id = $id;").run({
          id: json.id
        });
        db.prepare("DELETE FROM messages WHERE conversationId = $id;").run({ id: json.id });
      }
    }
    const allConversations = db.prepare("SELECT * FROM conversations;").all();
    const allConversationsByOldId = (0, import_lodash.keyBy)(allConversations, "id");
    for (const row of allConversations) {
      const oldId = row.id;
      const newId = import_UUID.UUID.generate().toString();
      allConversationsByOldId[oldId].id = newId;
      const patchObj = {
        id: newId
      };
      if (row.type === "private") {
        patchObj.e164 = `+${oldId}`;
      } else if (row.type === "group") {
        patchObj.groupId = oldId;
      }
      const patch = JSON.stringify(patchObj);
      db.prepare(`
        UPDATE conversations
        SET id = $newId, json = JSON_PATCH(json, $patch)
        WHERE id = $oldId
        `).run({
        newId,
        oldId,
        patch
      });
      const messagePatch = JSON.stringify({ conversationId: newId });
      db.prepare(`
        UPDATE messages
        SET conversationId = $newId, json = JSON_PATCH(json, $patch)
        WHERE conversationId = $oldId
        `).run({ newId, oldId, patch: messagePatch });
    }
    const groupConversations = db.prepare(`
        SELECT id, members, json FROM conversations WHERE type = 'group';
        `).all();
    groupConversations.forEach((groupRow) => {
      const members = groupRow.members.split(/\s?\+/).filter(Boolean);
      const newMembers = [];
      for (const m of members) {
        const memberRow = allConversationsByOldId[m];
        if (memberRow) {
          newMembers.push(memberRow.id);
        } else {
          const id = import_UUID.UUID.generate().toString();
          const updatedConversation = {
            id,
            e164: m,
            type: "private",
            version: 2,
            unreadCount: 0,
            verified: 0,
            inbox_position: 0,
            isPinned: false,
            lastMessageDeletedForEveryone: false,
            markedUnread: false,
            messageCount: 0,
            sentMessageCount: 0,
            profileSharing: false
          };
          db.prepare(`
            UPDATE conversations
            SET
              json = $json,
              e164 = $e164,
              type = $type,
            WHERE
              id = $id;
            `).run({
            id: updatedConversation.id,
            json: (0, import_util.objectToJSON)(updatedConversation),
            e164: updatedConversation.e164,
            type: updatedConversation.type
          });
          newMembers.push(id);
        }
      }
      const json = {
        ...(0, import_util.jsonToObject)(groupRow.json),
        members: newMembers
      };
      const newMembersValue = newMembers.join(" ");
      db.prepare(`
        UPDATE conversations
        SET members = $newMembersValue, json = $newJsonValue
        WHERE id = $id
        `).run({
        id: groupRow.id,
        newMembersValue,
        newJsonValue: (0, import_util.objectToJSON)(json)
      });
    });
    const allSessions = db.prepare("SELECT * FROM sessions;").all();
    for (const session of allSessions) {
      const newJson = JSON.parse(session.json);
      const conversation = allConversationsByOldId[newJson.number.substr(1)];
      if (conversation) {
        newJson.conversationId = conversation.id;
        newJson.id = `${newJson.conversationId}.${newJson.deviceId}`;
      }
      delete newJson.number;
      db.prepare(`
        UPDATE sessions
        SET id = $newId, json = $newJson, conversationId = $newConversationId
        WHERE id = $oldId
        `).run({
        newId: newJson.id,
        newJson: (0, import_util.objectToJSON)(newJson),
        oldId: session.id,
        newConversationId: newJson.conversationId
      });
    }
    const allIdentityKeys = db.prepare("SELECT * FROM identityKeys;").all();
    for (const identityKey of allIdentityKeys) {
      const newJson = JSON.parse(identityKey.json);
      newJson.id = allConversationsByOldId[newJson.id];
      db.prepare(`
        UPDATE identityKeys
        SET id = $newId, json = $newJson
        WHERE id = $oldId
        `).run({
        newId: newJson.id,
        newJson: (0, import_util.objectToJSON)(newJson),
        oldId: identityKey.id
      });
    }
    for (const trigger of triggers) {
      db.exec(trigger.sql);
    }
    db.pragma("user_version = 20");
  })();
  logger.info("updateToSchemaVersion20: success!");
}
function updateToSchemaVersion21(currentVersion, db, logger) {
  if (currentVersion >= 21) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      UPDATE conversations
      SET json = json_set(
        json,
        '$.messageCount',
        (SELECT count(*) FROM messages WHERE messages.conversationId = conversations.id)
      );
      UPDATE conversations
      SET json = json_set(
        json,
        '$.sentMessageCount',
        (SELECT count(*) FROM messages WHERE messages.conversationId = conversations.id AND messages.type = 'outgoing')
      );
    `);
    db.pragma("user_version = 21");
  })();
  logger.info("updateToSchemaVersion21: success!");
}
function updateToSchemaVersion22(currentVersion, db, logger) {
  if (currentVersion >= 22) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      ALTER TABLE unprocessed
        ADD COLUMN sourceUuid STRING;
    `);
    db.pragma("user_version = 22");
  })();
  logger.info("updateToSchemaVersion22: success!");
}
function updateToSchemaVersion23(currentVersion, db, logger) {
  if (currentVersion >= 23) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      -- Remove triggers which keep full-text search up to date
      DROP TRIGGER messages_on_insert;
      DROP TRIGGER messages_on_update;
      DROP TRIGGER messages_on_delete;
    `);
    db.pragma("user_version = 23");
  })();
  logger.info("updateToSchemaVersion23: success!");
}
function updateToSchemaVersion24(currentVersion, db, logger) {
  if (currentVersion >= 24) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      ALTER TABLE conversations
      ADD COLUMN profileLastFetchedAt INTEGER;
    `);
    db.pragma("user_version = 24");
  })();
  logger.info("updateToSchemaVersion24: success!");
}
function updateToSchemaVersion25(currentVersion, db, logger) {
  if (currentVersion >= 25) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      ALTER TABLE messages
      RENAME TO old_messages
    `);
    const indicesToDrop = [
      "messages_expires_at",
      "messages_receipt",
      "messages_schemaVersion",
      "messages_conversation",
      "messages_duplicate_check",
      "messages_hasAttachments",
      "messages_hasFileAttachments",
      "messages_hasVisualMediaAttachments",
      "messages_without_timer",
      "messages_unread",
      "messages_view_once",
      "messages_sourceUuid"
    ];
    for (const index of indicesToDrop) {
      db.exec(`DROP INDEX IF EXISTS ${index};`);
    }
    db.exec(`
      --
      -- Create a new table with a different primary key
      --

      CREATE TABLE messages(
        rowid INTEGER PRIMARY KEY ASC,
        id STRING UNIQUE,
        json TEXT,
        unread INTEGER,
        expires_at INTEGER,
        sent_at INTEGER,
        schemaVersion INTEGER,
        conversationId STRING,
        received_at INTEGER,
        source STRING,
        sourceDevice STRING,
        hasAttachments INTEGER,
        hasFileAttachments INTEGER,
        hasVisualMediaAttachments INTEGER,
        expireTimer INTEGER,
        expirationStartTimestamp INTEGER,
        type STRING,
        body TEXT,
        messageTimer INTEGER,
        messageTimerStart INTEGER,
        messageTimerExpiresAt INTEGER,
        isErased INTEGER,
        isViewOnce INTEGER,
        sourceUuid TEXT);

      -- Create index in lieu of old PRIMARY KEY
      CREATE INDEX messages_id ON messages (id ASC);

      --
      -- Recreate indices
      --

      CREATE INDEX messages_expires_at ON messages (expires_at);

      CREATE INDEX messages_receipt ON messages (sent_at);

      CREATE INDEX messages_schemaVersion ON messages (schemaVersion);

      CREATE INDEX messages_conversation ON messages
        (conversationId, received_at);

      CREATE INDEX messages_duplicate_check ON messages
        (source, sourceDevice, sent_at);

      CREATE INDEX messages_hasAttachments ON messages
        (conversationId, hasAttachments, received_at);

      CREATE INDEX messages_hasFileAttachments ON messages
        (conversationId, hasFileAttachments, received_at);

      CREATE INDEX messages_hasVisualMediaAttachments ON messages
        (conversationId, hasVisualMediaAttachments, received_at);

      CREATE INDEX messages_without_timer ON messages
        (expireTimer, expires_at, type)
        WHERE expires_at IS NULL AND expireTimer IS NOT NULL;

      CREATE INDEX messages_unread ON messages
        (conversationId, unread) WHERE unread IS NOT NULL;

      CREATE INDEX messages_view_once ON messages
        (isErased) WHERE isViewOnce = 1;

      CREATE INDEX messages_sourceUuid on messages(sourceUuid);

      -- New index for searchMessages
      CREATE INDEX messages_searchOrder on messages(received_at, sent_at);

      --
      -- Re-create messages_fts and add triggers
      --

      DROP TABLE messages_fts;

      CREATE VIRTUAL TABLE messages_fts USING fts5(body);

      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages
      WHEN new.isViewOnce IS NULL OR new.isViewOnce != 1
      BEGIN
        INSERT INTO messages_fts
        (rowid, body)
        VALUES
        (new.rowid, new.body);
      END;

      CREATE TRIGGER messages_on_delete AFTER DELETE ON messages BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
      END;

      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN new.isViewOnce IS NULL OR new.isViewOnce != 1
      BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
        INSERT INTO messages_fts
        (rowid, body)
        VALUES
        (new.rowid, new.body);
      END;

      --
      -- Copy data over
      --

      INSERT INTO messages
      (
        id, json, unread, expires_at, sent_at, schemaVersion, conversationId,
        received_at, source, sourceDevice, hasAttachments, hasFileAttachments,
        hasVisualMediaAttachments, expireTimer, expirationStartTimestamp, type,
        body, messageTimer, messageTimerStart, messageTimerExpiresAt, isErased,
        isViewOnce, sourceUuid
      )
      SELECT
        id, json, unread, expires_at, sent_at, schemaVersion, conversationId,
        received_at, source, sourceDevice, hasAttachments, hasFileAttachments,
        hasVisualMediaAttachments, expireTimer, expirationStartTimestamp, type,
        body, messageTimer, messageTimerStart, messageTimerExpiresAt, isErased,
        isViewOnce, sourceUuid
      FROM old_messages;

      -- Drop old database
      DROP TABLE old_messages;
    `);
    db.pragma("user_version = 25");
  })();
  logger.info("updateToSchemaVersion25: success!");
}
function updateToSchemaVersion26(currentVersion, db, logger) {
  if (currentVersion >= 26) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP TRIGGER messages_on_insert;
      DROP TRIGGER messages_on_update;

      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages
      WHEN new.isViewOnce IS NULL OR new.isViewOnce != 1
      BEGIN
        INSERT INTO messages_fts
        (rowid, body)
        VALUES
        (new.rowid, new.body);
      END;

      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN new.body != old.body AND
        (new.isViewOnce IS NULL OR new.isViewOnce != 1)
      BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
        INSERT INTO messages_fts
        (rowid, body)
        VALUES
        (new.rowid, new.body);
      END;
    `);
    db.pragma("user_version = 26");
  })();
  logger.info("updateToSchemaVersion26: success!");
}
function updateToSchemaVersion27(currentVersion, db, logger) {
  if (currentVersion >= 27) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DELETE FROM messages_fts WHERE rowid IN
        (SELECT rowid FROM messages WHERE body IS NULL);

      DROP TRIGGER messages_on_update;

      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN
        new.body IS NULL OR
        ((old.body IS NULL OR new.body != old.body) AND
         (new.isViewOnce IS NULL OR new.isViewOnce != 1))
      BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
        INSERT INTO messages_fts
        (rowid, body)
        VALUES
        (new.rowid, new.body);
      END;

      CREATE TRIGGER messages_on_view_once_update AFTER UPDATE ON messages
      WHEN
        new.body IS NOT NULL AND new.isViewOnce = 1
      BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
      END;
    `);
    db.pragma("user_version = 27");
  })();
  logger.info("updateToSchemaVersion27: success!");
}
function updateToSchemaVersion28(currentVersion, db, logger) {
  if (currentVersion >= 28) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      CREATE TABLE jobs(
        id TEXT PRIMARY KEY,
        queueType TEXT STRING NOT NULL,
        timestamp INTEGER NOT NULL,
        data STRING TEXT
      );

      CREATE INDEX jobs_timestamp ON jobs (timestamp);
    `);
    db.pragma("user_version = 28");
  })();
  logger.info("updateToSchemaVersion28: success!");
}
function updateToSchemaVersion29(currentVersion, db, logger) {
  if (currentVersion >= 29) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      CREATE TABLE reactions(
        conversationId STRING,
        emoji STRING,
        fromId STRING,
        messageReceivedAt INTEGER,
        targetAuthorUuid STRING,
        targetTimestamp INTEGER,
        unread INTEGER
      );

      CREATE INDEX reactions_unread ON reactions (
        unread,
        conversationId
      );

      CREATE INDEX reaction_identifier ON reactions (
        emoji,
        targetAuthorUuid,
        targetTimestamp
      );
    `);
    db.pragma("user_version = 29");
  })();
  logger.info("updateToSchemaVersion29: success!");
}
function updateToSchemaVersion30(currentVersion, db, logger) {
  if (currentVersion >= 30) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      CREATE TABLE senderKeys(
        id TEXT PRIMARY KEY NOT NULL,
        senderId TEXT NOT NULL,
        distributionId TEXT NOT NULL,
        data BLOB NOT NULL,
        lastUpdatedDate NUMBER NOT NULL
      );
    `);
    db.pragma("user_version = 30");
  })();
  logger.info("updateToSchemaVersion30: success!");
}
function updateToSchemaVersion31(currentVersion, db, logger) {
  if (currentVersion >= 31) {
    return;
  }
  logger.info("updateToSchemaVersion31: starting...");
  db.transaction(() => {
    db.exec(`
      DROP INDEX unprocessed_id;
      DROP INDEX unprocessed_timestamp;
      ALTER TABLE unprocessed RENAME TO unprocessed_old;

      CREATE TABLE unprocessed(
        id STRING PRIMARY KEY ASC,
        timestamp INTEGER,
        version INTEGER,
        attempts INTEGER,
        envelope TEXT,
        decrypted TEXT,
        source TEXT,
        sourceDevice TEXT,
        serverTimestamp INTEGER,
        sourceUuid STRING
      );

      CREATE INDEX unprocessed_timestamp ON unprocessed (
        timestamp
      );

      INSERT OR REPLACE INTO unprocessed
        (id, timestamp, version, attempts, envelope, decrypted, source,
         sourceDevice, serverTimestamp, sourceUuid)
      SELECT
        id, timestamp, version, attempts, envelope, decrypted, source,
         sourceDevice, serverTimestamp, sourceUuid
      FROM unprocessed_old;

      DROP TABLE unprocessed_old;
    `);
    db.pragma("user_version = 31");
  })();
  logger.info("updateToSchemaVersion31: success!");
}
function updateToSchemaVersion32(currentVersion, db, logger) {
  if (currentVersion >= 32) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      ALTER TABLE messages
      ADD COLUMN serverGuid STRING NULL;

      ALTER TABLE unprocessed
      ADD COLUMN serverGuid STRING NULL;
    `);
    db.pragma("user_version = 32");
  })();
  logger.info("updateToSchemaVersion32: success!");
}
function updateToSchemaVersion33(currentVersion, db, logger) {
  if (currentVersion >= 33) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      -- These indexes should exist, but we add "IF EXISTS" for safety.
      DROP INDEX IF EXISTS messages_expires_at;
      DROP INDEX IF EXISTS messages_without_timer;

      ALTER TABLE messages
      ADD COLUMN
      expiresAt INT
      GENERATED ALWAYS
      AS (expirationStartTimestamp + (expireTimer * 1000));

      CREATE INDEX message_expires_at ON messages (
        expiresAt
      );

      CREATE INDEX outgoing_messages_without_expiration_start_timestamp ON messages (
        expireTimer, expirationStartTimestamp, type
      )
      WHERE expireTimer IS NOT NULL AND expirationStartTimestamp IS NULL;
    `);
    db.pragma("user_version = 33");
  })();
  logger.info("updateToSchemaVersion33: success!");
}
function updateToSchemaVersion34(currentVersion, db, logger) {
  if (currentVersion >= 34) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      -- This index should exist, but we add "IF EXISTS" for safety.
      DROP INDEX IF EXISTS outgoing_messages_without_expiration_start_timestamp;

      CREATE INDEX messages_unexpectedly_missing_expiration_start_timestamp ON messages (
        expireTimer, expirationStartTimestamp, type
      )
      WHERE expireTimer IS NOT NULL AND expirationStartTimestamp IS NULL;
    `);
    db.pragma("user_version = 34");
  })();
  logger.info("updateToSchemaVersion34: success!");
}
function updateToSchemaVersion35(currentVersion, db, logger) {
  if (currentVersion >= 35) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      CREATE INDEX expiring_message_by_conversation_and_received_at
      ON messages
      (
        expirationStartTimestamp,
        expireTimer,
        conversationId,
        received_at
      );
    `);
    db.pragma("user_version = 35");
  })();
  logger.info("updateToSchemaVersion35: success!");
}
function updateToSchemaVersion36(currentVersion, db, logger) {
  if (currentVersion >= 36) {
    return;
  }
  db.pragma("user_version = 36");
  logger.info("updateToSchemaVersion36: success!");
}
function updateToSchemaVersion37(currentVersion, db, logger) {
  if (currentVersion >= 37) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      -- Create send log primary table

      CREATE TABLE sendLogPayloads(
        id INTEGER PRIMARY KEY ASC,

        timestamp INTEGER NOT NULL,
        contentHint INTEGER NOT NULL,
        proto BLOB NOT NULL
      );

      CREATE INDEX sendLogPayloadsByTimestamp ON sendLogPayloads (timestamp);

      -- Create send log recipients table with foreign key relationship to payloads

      CREATE TABLE sendLogRecipients(
        payloadId INTEGER NOT NULL,

        recipientUuid STRING NOT NULL,
        deviceId INTEGER NOT NULL,

        PRIMARY KEY (payloadId, recipientUuid, deviceId),

        CONSTRAINT sendLogRecipientsForeignKey
          FOREIGN KEY (payloadId)
          REFERENCES sendLogPayloads(id)
          ON DELETE CASCADE
      );

      CREATE INDEX sendLogRecipientsByRecipient
        ON sendLogRecipients (recipientUuid, deviceId);

      -- Create send log messages table with foreign key relationship to payloads

      CREATE TABLE sendLogMessageIds(
        payloadId INTEGER NOT NULL,

        messageId STRING NOT NULL,

        PRIMARY KEY (payloadId, messageId),

        CONSTRAINT sendLogMessageIdsForeignKey
          FOREIGN KEY (payloadId)
          REFERENCES sendLogPayloads(id)
          ON DELETE CASCADE
      );

      CREATE INDEX sendLogMessageIdsByMessage
        ON sendLogMessageIds (messageId);

      -- Recreate messages table delete trigger with send log support

      DROP TRIGGER messages_on_delete;

      CREATE TRIGGER messages_on_delete AFTER DELETE ON messages BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
        DELETE FROM sendLogPayloads WHERE id IN (
          SELECT payloadId FROM sendLogMessageIds
          WHERE messageId = old.id
        );
      END;

      --- Add messageId column to reactions table to properly track proto associations

      ALTER TABLE reactions ADD column messageId STRING;
    `);
    db.pragma("user_version = 37");
  })();
  logger.info("updateToSchemaVersion37: success!");
}
function updateToSchemaVersion38(currentVersion, db, logger) {
  if (currentVersion >= 38) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP INDEX IF EXISTS messages_duplicate_check;

      ALTER TABLE messages
        RENAME COLUMN sourceDevice TO deprecatedSourceDevice;
      ALTER TABLE messages
        ADD COLUMN sourceDevice INTEGER;

      UPDATE messages
      SET
        sourceDevice = CAST(deprecatedSourceDevice AS INTEGER),
        deprecatedSourceDevice = NULL;

      ALTER TABLE unprocessed
        RENAME COLUMN sourceDevice TO deprecatedSourceDevice;
      ALTER TABLE unprocessed
        ADD COLUMN sourceDevice INTEGER;

      UPDATE unprocessed
      SET
        sourceDevice = CAST(deprecatedSourceDevice AS INTEGER),
        deprecatedSourceDevice = NULL;
    `);
    db.pragma("user_version = 38");
  })();
  logger.info("updateToSchemaVersion38: success!");
}
function updateToSchemaVersion39(currentVersion, db, logger) {
  if (currentVersion >= 39) {
    return;
  }
  db.transaction(() => {
    db.exec("ALTER TABLE messages RENAME COLUMN unread TO readStatus;");
    db.pragma("user_version = 39");
  })();
  logger.info("updateToSchemaVersion39: success!");
}
function updateToSchemaVersion40(currentVersion, db, logger) {
  if (currentVersion >= 40) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      CREATE TABLE groupCallRings(
        ringId INTEGER PRIMARY KEY,
        isActive INTEGER NOT NULL,
        createdAt INTEGER NOT NULL
      );
      `);
    db.pragma("user_version = 40");
  })();
  logger.info("updateToSchemaVersion40: success!");
}
const SCHEMA_VERSIONS = [
  updateToSchemaVersion1,
  updateToSchemaVersion2,
  updateToSchemaVersion3,
  updateToSchemaVersion4,
  (_v, _i, _l) => void 0,
  updateToSchemaVersion6,
  updateToSchemaVersion7,
  updateToSchemaVersion8,
  updateToSchemaVersion9,
  updateToSchemaVersion10,
  updateToSchemaVersion11,
  updateToSchemaVersion12,
  updateToSchemaVersion13,
  updateToSchemaVersion14,
  updateToSchemaVersion15,
  updateToSchemaVersion16,
  updateToSchemaVersion17,
  updateToSchemaVersion18,
  updateToSchemaVersion19,
  updateToSchemaVersion20,
  updateToSchemaVersion21,
  updateToSchemaVersion22,
  updateToSchemaVersion23,
  updateToSchemaVersion24,
  updateToSchemaVersion25,
  updateToSchemaVersion26,
  updateToSchemaVersion27,
  updateToSchemaVersion28,
  updateToSchemaVersion29,
  updateToSchemaVersion30,
  updateToSchemaVersion31,
  updateToSchemaVersion32,
  updateToSchemaVersion33,
  updateToSchemaVersion34,
  updateToSchemaVersion35,
  updateToSchemaVersion36,
  updateToSchemaVersion37,
  updateToSchemaVersion38,
  updateToSchemaVersion39,
  updateToSchemaVersion40,
  import_uuid_keys.default,
  import_stale_reactions.default,
  import_gv2_uuid.default,
  import_badges.default,
  import_stories.default,
  import_optimize_stories.default,
  import_further_optimize.default,
  import_fix_user_initiated_index.default,
  import_fix_preview_index.default,
  import_fix_messages_unread_index.default,
  import_centralize_conversation_jobs.default,
  import_optimize_stories2.default,
  import_gv2_banned_members.default,
  import_unprocessed_received_at_counter.default,
  import_report_message_aci.default,
  import_add_unseen_to_message.default,
  import_rm_message_history_unsynced.default,
  import_update_unread.default,
  import_unprocessed_received_at_counter_index.default,
  import_update_expiring_index.default
];
function updateSchema(db, logger) {
  const sqliteVersion = (0, import_util.getSQLiteVersion)(db);
  const sqlcipherVersion = (0, import_util.getSQLCipherVersion)(db);
  const userVersion = (0, import_util.getUserVersion)(db);
  const maxUserVersion = SCHEMA_VERSIONS.length;
  const schemaVersion = (0, import_util.getSchemaVersion)(db);
  logger.info("updateSchema:\n", ` Current user_version: ${userVersion};
`, ` Most recent db schema: ${maxUserVersion};
`, ` SQLite version: ${sqliteVersion};
`, ` SQLCipher version: ${sqlcipherVersion};
`, ` (deprecated) schema_version: ${schemaVersion};
`);
  if (userVersion > maxUserVersion) {
    throw new Error(`SQL: User version is ${userVersion} but the expected maximum version is ${maxUserVersion}. Did you try to start an old version of Signal?`);
  }
  for (let index = 0; index < maxUserVersion; index += 1) {
    const runSchemaUpdate = SCHEMA_VERSIONS[index];
    runSchemaUpdate(userVersion, db, logger);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SCHEMA_VERSIONS,
  updateSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuaW1wb3J0IHsga2V5QnkgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7XG4gIGdldFNjaGVtYVZlcnNpb24sXG4gIGdldFVzZXJWZXJzaW9uLFxuICBnZXRTUUxDaXBoZXJWZXJzaW9uLFxuICBnZXRTUUxpdGVWZXJzaW9uLFxuICBvYmplY3RUb0pTT04sXG4gIGpzb25Ub09iamVjdCxcbn0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgdHlwZSB7IFF1ZXJ5LCBFbXB0eVF1ZXJ5IH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB1cGRhdGVUb1NjaGVtYVZlcnNpb240MSBmcm9tICcuLzQxLXV1aWQta2V5cyc7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDIgZnJvbSAnLi80Mi1zdGFsZS1yZWFjdGlvbnMnO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQzIGZyb20gJy4vNDMtZ3YyLXV1aWQnO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ0IGZyb20gJy4vNDQtYmFkZ2VzJztcbmltcG9ydCB1cGRhdGVUb1NjaGVtYVZlcnNpb240NSBmcm9tICcuLzQ1LXN0b3JpZXMnO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ2IGZyb20gJy4vNDYtb3B0aW1pemUtc3Rvcmllcyc7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDcgZnJvbSAnLi80Ny1mdXJ0aGVyLW9wdGltaXplJztcbmltcG9ydCB1cGRhdGVUb1NjaGVtYVZlcnNpb240OCBmcm9tICcuLzQ4LWZpeC11c2VyLWluaXRpYXRlZC1pbmRleCc7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDkgZnJvbSAnLi80OS1maXgtcHJldmlldy1pbmRleCc7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTAgZnJvbSAnLi81MC1maXgtbWVzc2FnZXMtdW5yZWFkLWluZGV4JztcbmltcG9ydCB1cGRhdGVUb1NjaGVtYVZlcnNpb241MSBmcm9tICcuLzUxLWNlbnRyYWxpemUtY29udmVyc2F0aW9uLWpvYnMnO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjUyIGZyb20gJy4vNTItb3B0aW1pemUtc3Rvcmllcyc7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTMgZnJvbSAnLi81My1ndjItYmFubmVkLW1lbWJlcnMnO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU0IGZyb20gJy4vNTQtdW5wcm9jZXNzZWQtcmVjZWl2ZWQtYXQtY291bnRlcic7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTUgZnJvbSAnLi81NS1yZXBvcnQtbWVzc2FnZS1hY2knO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU2IGZyb20gJy4vNTYtYWRkLXVuc2Vlbi10by1tZXNzYWdlJztcbmltcG9ydCB1cGRhdGVUb1NjaGVtYVZlcnNpb241NyBmcm9tICcuLzU3LXJtLW1lc3NhZ2UtaGlzdG9yeS11bnN5bmNlZCc7XG5pbXBvcnQgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTggZnJvbSAnLi81OC11cGRhdGUtdW5yZWFkJztcbmltcG9ydCB1cGRhdGVUb1NjaGVtYVZlcnNpb241OSBmcm9tICcuLzU5LXVucHJvY2Vzc2VkLXJlY2VpdmVkLWF0LWNvdW50ZXItaW5kZXgnO1xuaW1wb3J0IHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjYwIGZyb20gJy4vNjAtdXBkYXRlLWV4cGlyaW5nLWluZGV4JztcblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xOiBzdGFydGluZy4uLicpO1xuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIENSRUFURSBUQUJMRSBtZXNzYWdlcyhcbiAgICAgICAgaWQgU1RSSU5HIFBSSU1BUlkgS0VZIEFTQyxcbiAgICAgICAganNvbiBURVhULFxuXG4gICAgICAgIHVucmVhZCBJTlRFR0VSLFxuICAgICAgICBleHBpcmVzX2F0IElOVEVHRVIsXG4gICAgICAgIHNlbnRfYXQgSU5URUdFUixcbiAgICAgICAgc2NoZW1hVmVyc2lvbiBJTlRFR0VSLFxuICAgICAgICBjb252ZXJzYXRpb25JZCBTVFJJTkcsXG4gICAgICAgIHJlY2VpdmVkX2F0IElOVEVHRVIsXG4gICAgICAgIHNvdXJjZSBTVFJJTkcsXG4gICAgICAgIHNvdXJjZURldmljZSBTVFJJTkcsXG4gICAgICAgIGhhc0F0dGFjaG1lbnRzIElOVEVHRVIsXG4gICAgICAgIGhhc0ZpbGVBdHRhY2htZW50cyBJTlRFR0VSLFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzIElOVEVHRVJcbiAgICAgICk7XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdW5yZWFkIE9OIG1lc3NhZ2VzIChcbiAgICAgICAgdW5yZWFkXG4gICAgICApO1xuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX2V4cGlyZXNfYXQgT04gbWVzc2FnZXMgKFxuICAgICAgICBleHBpcmVzX2F0XG4gICAgICApO1xuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3JlY2VpcHQgT04gbWVzc2FnZXMgKFxuICAgICAgICBzZW50X2F0XG4gICAgICApO1xuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3NjaGVtYVZlcnNpb24gT04gbWVzc2FnZXMgKFxuICAgICAgICBzY2hlbWFWZXJzaW9uXG4gICAgICApO1xuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX2NvbnZlcnNhdGlvbiBPTiBtZXNzYWdlcyAoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICByZWNlaXZlZF9hdFxuICAgICAgKTtcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19kdXBsaWNhdGVfY2hlY2sgT04gbWVzc2FnZXMgKFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIHNvdXJjZURldmljZSxcbiAgICAgICAgc2VudF9hdFxuICAgICAgKTtcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19oYXNBdHRhY2htZW50cyBPTiBtZXNzYWdlcyAoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBoYXNBdHRhY2htZW50cyxcbiAgICAgICAgcmVjZWl2ZWRfYXRcbiAgICAgICk7XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfaGFzRmlsZUF0dGFjaG1lbnRzIE9OIG1lc3NhZ2VzIChcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGhhc0ZpbGVBdHRhY2htZW50cyxcbiAgICAgICAgcmVjZWl2ZWRfYXRcbiAgICAgICk7XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyBPTiBtZXNzYWdlcyAoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzLFxuICAgICAgICByZWNlaXZlZF9hdFxuICAgICAgKTtcbiAgICAgIENSRUFURSBUQUJMRSB1bnByb2Nlc3NlZChcbiAgICAgICAgaWQgU1RSSU5HLFxuICAgICAgICB0aW1lc3RhbXAgSU5URUdFUixcbiAgICAgICAganNvbiBURVhUXG4gICAgICApO1xuICAgICAgQ1JFQVRFIElOREVYIHVucHJvY2Vzc2VkX2lkIE9OIHVucHJvY2Vzc2VkIChcbiAgICAgICAgaWRcbiAgICAgICk7XG4gICAgICBDUkVBVEUgSU5ERVggdW5wcm9jZXNzZWRfdGltZXN0YW1wIE9OIHVucHJvY2Vzc2VkIChcbiAgICAgICAgdGltZXN0YW1wXG4gICAgICApO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxJyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjE6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjIoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMjogc3RhcnRpbmcuLi4nKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgICBBREQgQ09MVU1OIGV4cGlyZVRpbWVyIElOVEVHRVI7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wIElOVEVHRVI7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gdHlwZSBTVFJJTkc7XG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19leHBpcmluZyBPTiBtZXNzYWdlcyAoXG4gICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICAgIGV4cGlyZXNfYXRcbiAgICAgICk7XG5cbiAgICAgIFVQREFURSBtZXNzYWdlcyBTRVRcbiAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wID0ganNvbl9leHRyYWN0KGpzb24sICckLmV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCcpLFxuICAgICAgICBleHBpcmVUaW1lciA9IGpzb25fZXh0cmFjdChqc29uLCAnJC5leHBpcmVUaW1lcicpLFxuICAgICAgICB0eXBlID0ganNvbl9leHRyYWN0KGpzb24sICckLnR5cGUnKTtcbiAgICBgKTtcbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDInKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjI6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjMoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMzogc3RhcnRpbmcuLi4nKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBEUk9QIElOREVYIG1lc3NhZ2VzX2V4cGlyaW5nO1xuICAgICAgRFJPUCBJTkRFWCBtZXNzYWdlc191bnJlYWQ7XG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc193aXRob3V0X3RpbWVyIE9OIG1lc3NhZ2VzIChcbiAgICAgICAgZXhwaXJlVGltZXIsXG4gICAgICAgIGV4cGlyZXNfYXQsXG4gICAgICAgIHR5cGVcbiAgICAgICkgV0hFUkUgZXhwaXJlc19hdCBJUyBOVUxMIEFORCBleHBpcmVUaW1lciBJUyBOT1QgTlVMTDtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3VucmVhZCBPTiBtZXNzYWdlcyAoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICB1bnJlYWRcbiAgICAgICkgV0hFUkUgdW5yZWFkIElTIE5PVCBOVUxMO1xuXG4gICAgICBBTkFMWVpFO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAzJyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjM6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDogc3RhcnRpbmcuLi4nKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBDUkVBVEUgVEFCTEUgY29udmVyc2F0aW9ucyhcbiAgICAgICAgaWQgU1RSSU5HIFBSSU1BUlkgS0VZIEFTQyxcbiAgICAgICAganNvbiBURVhULFxuXG4gICAgICAgIGFjdGl2ZV9hdCBJTlRFR0VSLFxuICAgICAgICB0eXBlIFNUUklORyxcbiAgICAgICAgbWVtYmVycyBURVhULFxuICAgICAgICBuYW1lIFRFWFQsXG4gICAgICAgIHByb2ZpbGVOYW1lIFRFWFRcbiAgICAgICk7XG4gICAgICBDUkVBVEUgSU5ERVggY29udmVyc2F0aW9uc19hY3RpdmUgT04gY29udmVyc2F0aW9ucyAoXG4gICAgICAgIGFjdGl2ZV9hdFxuICAgICAgKSBXSEVSRSBhY3RpdmVfYXQgSVMgTk9UIE5VTEw7XG5cbiAgICAgIENSRUFURSBJTkRFWCBjb252ZXJzYXRpb25zX3R5cGUgT04gY29udmVyc2F0aW9ucyAoXG4gICAgICAgIHR5cGVcbiAgICAgICkgV0hFUkUgdHlwZSBJUyBOT1QgTlVMTDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNCcpO1xuICB9KSgpO1xuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb240OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb242KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSA2KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb242OiBzdGFydGluZy4uLicpO1xuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIC0tIGtleS12YWx1ZSwgaWRzIGFyZSBzdHJpbmdzLCBvbmUgZXh0cmEgY29sdW1uXG4gICAgICBDUkVBVEUgVEFCTEUgc2Vzc2lvbnMoXG4gICAgICAgIGlkIFNUUklORyBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIG51bWJlciBTVFJJTkcsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcbiAgICAgIENSRUFURSBJTkRFWCBzZXNzaW9uc19udW1iZXIgT04gc2Vzc2lvbnMgKFxuICAgICAgICBudW1iZXJcbiAgICAgICkgV0hFUkUgbnVtYmVyIElTIE5PVCBOVUxMO1xuICAgICAgLS0ga2V5LXZhbHVlLCBpZHMgYXJlIHN0cmluZ3NcbiAgICAgIENSRUFURSBUQUJMRSBncm91cHMoXG4gICAgICAgIGlkIFNUUklORyBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcbiAgICAgIENSRUFURSBUQUJMRSBpZGVudGl0eUtleXMoXG4gICAgICAgIGlkIFNUUklORyBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcbiAgICAgIENSRUFURSBUQUJMRSBpdGVtcyhcbiAgICAgICAgaWQgU1RSSU5HIFBSSU1BUlkgS0VZIEFTQyxcbiAgICAgICAganNvbiBURVhUXG4gICAgICApO1xuICAgICAgLS0ga2V5LXZhbHVlLCBpZHMgYXJlIGludGVnZXJzXG4gICAgICBDUkVBVEUgVEFCTEUgcHJlS2V5cyhcbiAgICAgICAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcbiAgICAgIENSRUFURSBUQUJMRSBzaWduZWRQcmVLZXlzKFxuICAgICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFTQyxcbiAgICAgICAganNvbiBURVhUXG4gICAgICApO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA2Jyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjY6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjcoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjc6IHN0YXJ0aW5nLi4uJyk7XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgLS0gU1FMaXRlIGhhcyBiZWVuIGNvZXJjaW5nIG91ciBTVFJJTkdzIGludG8gbnVtYmVycywgc28gd2UgZm9yY2UgaXQgd2l0aCBURVhUXG4gICAgICAtLSBXZSBjcmVhdGUgYSBuZXcgdGFibGUgdGhlbiBjb3B5IHRoZSBkYXRhIGludG8gaXQsIHNpbmNlIHdlIGNhbid0IG1vZGlmeSBjb2x1bW5zXG4gICAgICBEUk9QIElOREVYIHNlc3Npb25zX251bWJlcjtcbiAgICAgIEFMVEVSIFRBQkxFIHNlc3Npb25zIFJFTkFNRSBUTyBzZXNzaW9uc19vbGQ7XG5cbiAgICAgIENSRUFURSBUQUJMRSBzZXNzaW9ucyhcbiAgICAgICAgaWQgVEVYVCBQUklNQVJZIEtFWSxcbiAgICAgICAgbnVtYmVyIFRFWFQsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcbiAgICAgIENSRUFURSBJTkRFWCBzZXNzaW9uc19udW1iZXIgT04gc2Vzc2lvbnMgKFxuICAgICAgICBudW1iZXJcbiAgICAgICkgV0hFUkUgbnVtYmVyIElTIE5PVCBOVUxMO1xuICAgICAgSU5TRVJUIElOVE8gc2Vzc2lvbnMoaWQsIG51bWJlciwganNvbilcbiAgICAgICAgU0VMRUNUIFwiK1wiIHx8IGlkLCBudW1iZXIsIGpzb24gRlJPTSBzZXNzaW9uc19vbGQ7XG4gICAgICBEUk9QIFRBQkxFIHNlc3Npb25zX29sZDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNycpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNzogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uOChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uODogc3RhcnRpbmcuLi4nKTtcbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgLS0gRmlyc3QsIHdlIHB1bGwgYSBuZXcgYm9keSBmaWVsZCBvdXQgb2YgdGhlIG1lc3NhZ2UgdGFibGUncyBqc29uIGJsb2JcbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIEFERCBDT0xVTU4gYm9keSBURVhUO1xuICAgICAgVVBEQVRFIG1lc3NhZ2VzIFNFVCBib2R5ID0ganNvbl9leHRyYWN0KGpzb24sICckLmJvZHknKTtcblxuICAgICAgLS0gVGhlbiB3ZSBjcmVhdGUgb3VyIGZ1bGwtdGV4dCBzZWFyY2ggdGFibGUgYW5kIHBvcHVsYXRlIGl0XG4gICAgICBDUkVBVEUgVklSVFVBTCBUQUJMRSBtZXNzYWdlc19mdHNcbiAgICAgICAgVVNJTkcgZnRzNShpZCBVTklOREVYRUQsIGJvZHkpO1xuXG4gICAgICBJTlNFUlQgSU5UTyBtZXNzYWdlc19mdHMoaWQsIGJvZHkpXG4gICAgICAgIFNFTEVDVCBpZCwgYm9keSBGUk9NIG1lc3NhZ2VzO1xuXG4gICAgICAtLSBUaGVuIHdlIHNldCB1cCB0cmlnZ2VycyB0byBrZWVwIHRoZSBmdWxsLXRleHQgc2VhcmNoIHRhYmxlIHVwIHRvIGRhdGVcbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX2luc2VydCBBRlRFUiBJTlNFUlQgT04gbWVzc2FnZXMgQkVHSU5cbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzIChcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBib2R5XG4gICAgICAgICkgVkFMVUVTIChcbiAgICAgICAgICBuZXcuaWQsXG4gICAgICAgICAgbmV3LmJvZHlcbiAgICAgICAgKTtcbiAgICAgIEVORDtcbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX2RlbGV0ZSBBRlRFUiBERUxFVEUgT04gbWVzc2FnZXMgQkVHSU5cbiAgICAgICAgREVMRVRFIEZST00gbWVzc2FnZXNfZnRzIFdIRVJFIGlkID0gb2xkLmlkO1xuICAgICAgRU5EO1xuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlIEFGVEVSIFVQREFURSBPTiBtZXNzYWdlcyBCRUdJTlxuICAgICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgaWQgPSBvbGQuaWQ7XG4gICAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzX2Z0cyhcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBib2R5XG4gICAgICAgICkgVkFMVUVTIChcbiAgICAgICAgICBuZXcuaWQsXG4gICAgICAgICAgbmV3LmJvZHlcbiAgICAgICAgKTtcbiAgICAgIEVORDtcbiAgICBgKTtcblxuICAgIC8vIEZvciBmb3JtYXR0aW5nIHNlYXJjaCByZXN1bHRzOlxuICAgIC8vICAgaHR0cHM6Ly9zcWxpdGUub3JnL2Z0czUuaHRtbCN0aGVfaGlnaGxpZ2h0X2Z1bmN0aW9uXG4gICAgLy8gICBodHRwczovL3NxbGl0ZS5vcmcvZnRzNS5odG1sI3RoZV9zbmlwcGV0X2Z1bmN0aW9uXG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDgnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjg6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjkoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjk6IHN0YXJ0aW5nLi4uJyk7XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQ1JFQVRFIFRBQkxFIGF0dGFjaG1lbnRfZG93bmxvYWRzKFxuICAgICAgICBpZCBTVFJJTkcgcHJpbWFyeSBrZXksXG4gICAgICAgIHRpbWVzdGFtcCBJTlRFR0VSLFxuICAgICAgICBwZW5kaW5nIElOVEVHRVIsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIGF0dGFjaG1lbnRfZG93bmxvYWRzX3RpbWVzdGFtcFxuICAgICAgICBPTiBhdHRhY2htZW50X2Rvd25sb2FkcyAoXG4gICAgICAgICAgdGltZXN0YW1wXG4gICAgICApIFdIRVJFIHBlbmRpbmcgPSAwO1xuICAgICAgQ1JFQVRFIElOREVYIGF0dGFjaG1lbnRfZG93bmxvYWRzX3BlbmRpbmdcbiAgICAgICAgT04gYXR0YWNobWVudF9kb3dubG9hZHMgKFxuICAgICAgICAgIHBlbmRpbmdcbiAgICAgICkgV0hFUkUgcGVuZGluZyAhPSAwO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA5Jyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjk6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjEwKFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAxMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTA6IHN0YXJ0aW5nLi4uJyk7XG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIERST1AgSU5ERVggdW5wcm9jZXNzZWRfaWQ7XG4gICAgICBEUk9QIElOREVYIHVucHJvY2Vzc2VkX3RpbWVzdGFtcDtcbiAgICAgIEFMVEVSIFRBQkxFIHVucHJvY2Vzc2VkIFJFTkFNRSBUTyB1bnByb2Nlc3NlZF9vbGQ7XG5cbiAgICAgIENSRUFURSBUQUJMRSB1bnByb2Nlc3NlZChcbiAgICAgICAgaWQgU1RSSU5HLFxuICAgICAgICB0aW1lc3RhbXAgSU5URUdFUixcbiAgICAgICAgdmVyc2lvbiBJTlRFR0VSLFxuICAgICAgICBhdHRlbXB0cyBJTlRFR0VSLFxuICAgICAgICBlbnZlbG9wZSBURVhULFxuICAgICAgICBkZWNyeXB0ZWQgVEVYVCxcbiAgICAgICAgc291cmNlIFRFWFQsXG4gICAgICAgIHNvdXJjZURldmljZSBURVhULFxuICAgICAgICBzZXJ2ZXJUaW1lc3RhbXAgSU5URUdFUlxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIHVucHJvY2Vzc2VkX2lkIE9OIHVucHJvY2Vzc2VkIChcbiAgICAgICAgaWRcbiAgICAgICk7XG4gICAgICBDUkVBVEUgSU5ERVggdW5wcm9jZXNzZWRfdGltZXN0YW1wIE9OIHVucHJvY2Vzc2VkIChcbiAgICAgICAgdGltZXN0YW1wXG4gICAgICApO1xuXG4gICAgICBJTlNFUlQgSU5UTyB1bnByb2Nlc3NlZCAoXG4gICAgICAgIGlkLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIGF0dGVtcHRzLFxuICAgICAgICBlbnZlbG9wZSxcbiAgICAgICAgZGVjcnlwdGVkLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIHNvdXJjZURldmljZSxcbiAgICAgICAgc2VydmVyVGltZXN0YW1wXG4gICAgICApIFNFTEVDVFxuICAgICAgICBpZCxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICBqc29uX2V4dHJhY3QoanNvbiwgJyQudmVyc2lvbicpLFxuICAgICAgICBqc29uX2V4dHJhY3QoanNvbiwgJyQuYXR0ZW1wdHMnKSxcbiAgICAgICAganNvbl9leHRyYWN0KGpzb24sICckLmVudmVsb3BlJyksXG4gICAgICAgIGpzb25fZXh0cmFjdChqc29uLCAnJC5kZWNyeXB0ZWQnKSxcbiAgICAgICAganNvbl9leHRyYWN0KGpzb24sICckLnNvdXJjZScpLFxuICAgICAgICBqc29uX2V4dHJhY3QoanNvbiwgJyQuc291cmNlRGV2aWNlJyksXG4gICAgICAgIGpzb25fZXh0cmFjdChqc29uLCAnJC5zZXJ2ZXJUaW1lc3RhbXAnKVxuICAgICAgRlJPTSB1bnByb2Nlc3NlZF9vbGQ7XG5cbiAgICAgIERST1AgVEFCTEUgdW5wcm9jZXNzZWRfb2xkO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxMCcpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTA6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjExKFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAxMSkge1xuICAgIHJldHVybjtcbiAgfVxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTE6IHN0YXJ0aW5nLi4uJyk7XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgRFJPUCBUQUJMRSBncm91cHM7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDExJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xMTogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMTIoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDEyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjEyOiBzdGFydGluZy4uLicpO1xuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBDUkVBVEUgVEFCTEUgc3RpY2tlcl9wYWNrcyhcbiAgICAgICAgaWQgVEVYVCBQUklNQVJZIEtFWSxcbiAgICAgICAga2V5IFRFWFQgTk9UIE5VTEwsXG5cbiAgICAgICAgYXV0aG9yIFNUUklORyxcbiAgICAgICAgY292ZXJTdGlja2VySWQgSU5URUdFUixcbiAgICAgICAgY3JlYXRlZEF0IElOVEVHRVIsXG4gICAgICAgIGRvd25sb2FkQXR0ZW1wdHMgSU5URUdFUixcbiAgICAgICAgaW5zdGFsbGVkQXQgSU5URUdFUixcbiAgICAgICAgbGFzdFVzZWQgSU5URUdFUixcbiAgICAgICAgc3RhdHVzIFNUUklORyxcbiAgICAgICAgc3RpY2tlckNvdW50IElOVEVHRVIsXG4gICAgICAgIHRpdGxlIFNUUklOR1xuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIFRBQkxFIHN0aWNrZXJzKFxuICAgICAgICBpZCBJTlRFR0VSIE5PVCBOVUxMLFxuICAgICAgICBwYWNrSWQgVEVYVCBOT1QgTlVMTCxcblxuICAgICAgICBlbW9qaSBTVFJJTkcsXG4gICAgICAgIGhlaWdodCBJTlRFR0VSLFxuICAgICAgICBpc0NvdmVyT25seSBJTlRFR0VSLFxuICAgICAgICBsYXN0VXNlZCBJTlRFR0VSLFxuICAgICAgICBwYXRoIFNUUklORyxcbiAgICAgICAgd2lkdGggSU5URUdFUixcblxuICAgICAgICBQUklNQVJZIEtFWSAoaWQsIHBhY2tJZCksXG4gICAgICAgIENPTlNUUkFJTlQgc3RpY2tlcnNfZmtcbiAgICAgICAgICBGT1JFSUdOIEtFWSAocGFja0lkKVxuICAgICAgICAgIFJFRkVSRU5DRVMgc3RpY2tlcl9wYWNrcyhpZClcbiAgICAgICAgICBPTiBERUxFVEUgQ0FTQ0FERVxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIHN0aWNrZXJzX3JlY2VudHNcbiAgICAgICAgT04gc3RpY2tlcnMgKFxuICAgICAgICAgIGxhc3RVc2VkXG4gICAgICApIFdIRVJFIGxhc3RVc2VkIElTIE5PVCBOVUxMO1xuXG4gICAgICBDUkVBVEUgVEFCTEUgc3RpY2tlcl9yZWZlcmVuY2VzKFxuICAgICAgICBtZXNzYWdlSWQgU1RSSU5HLFxuICAgICAgICBwYWNrSWQgVEVYVCxcbiAgICAgICAgQ09OU1RSQUlOVCBzdGlja2VyX3JlZmVyZW5jZXNfZmtcbiAgICAgICAgICBGT1JFSUdOIEtFWShwYWNrSWQpXG4gICAgICAgICAgUkVGRVJFTkNFUyBzdGlja2VyX3BhY2tzKGlkKVxuICAgICAgICAgIE9OIERFTEVURSBDQVNDQURFXG4gICAgICApO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxMicpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTI6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjEzKFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAxMykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xMzogc3RhcnRpbmcuLi4nKTtcbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQUxURVIgVEFCTEUgc3RpY2tlcl9wYWNrcyBBREQgQ09MVU1OIGF0dGVtcHRlZFN0YXR1cyBTVFJJTkc7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDEzJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xMzogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMTQoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDE0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjE0OiBzdGFydGluZy4uLicpO1xuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBDUkVBVEUgVEFCTEUgZW1vamlzKFxuICAgICAgICBzaG9ydE5hbWUgU1RSSU5HIFBSSU1BUlkgS0VZLFxuICAgICAgICBsYXN0VXNhZ2UgSU5URUdFUlxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIGVtb2ppc19sYXN0VXNhZ2VcbiAgICAgICAgT04gZW1vamlzIChcbiAgICAgICAgICBsYXN0VXNhZ2VcbiAgICAgICk7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDE0Jyk7XG4gIH0pKCk7XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjE0OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24xNShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMTUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTU6IHN0YXJ0aW5nLi4uJyk7XG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIC0tIFNRTGl0ZSBoYXMgYWdhaW4gY29lcmNlZCBvdXIgU1RSSU5HcyBpbnRvIG51bWJlcnMsIHNvIHdlIGZvcmNlIGl0IHdpdGggVEVYVFxuICAgICAgLS0gV2UgY3JlYXRlIGEgbmV3IHRhYmxlIHRoZW4gY29weSB0aGUgZGF0YSBpbnRvIGl0LCBzaW5jZSB3ZSBjYW4ndCBtb2RpZnkgY29sdW1uc1xuXG4gICAgICBEUk9QIElOREVYIGVtb2ppc19sYXN0VXNhZ2U7XG4gICAgICBBTFRFUiBUQUJMRSBlbW9qaXMgUkVOQU1FIFRPIGVtb2ppc19vbGQ7XG5cbiAgICAgIENSRUFURSBUQUJMRSBlbW9qaXMoXG4gICAgICAgIHNob3J0TmFtZSBURVhUIFBSSU1BUlkgS0VZLFxuICAgICAgICBsYXN0VXNhZ2UgSU5URUdFUlxuICAgICAgKTtcbiAgICAgIENSRUFURSBJTkRFWCBlbW9qaXNfbGFzdFVzYWdlXG4gICAgICAgIE9OIGVtb2ppcyAoXG4gICAgICAgICAgbGFzdFVzYWdlXG4gICAgICApO1xuXG4gICAgICBERUxFVEUgRlJPTSBlbW9qaXMgV0hFUkUgc2hvcnROYW1lID0gMTtcbiAgICAgIElOU0VSVCBJTlRPIGVtb2ppcyhzaG9ydE5hbWUsIGxhc3RVc2FnZSlcbiAgICAgICAgU0VMRUNUIHNob3J0TmFtZSwgbGFzdFVzYWdlIEZST00gZW1vamlzX29sZDtcblxuICAgICAgRFJPUCBUQUJMRSBlbW9qaXNfb2xkO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxNScpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTU6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjE2KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAxNikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xNjogc3RhcnRpbmcuLi4nKTtcbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgIEFERCBDT0xVTU4gbWVzc2FnZVRpbWVyIElOVEVHRVI7XG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgQUREIENPTFVNTiBtZXNzYWdlVGltZXJTdGFydCBJTlRFR0VSO1xuICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgIEFERCBDT0xVTU4gbWVzc2FnZVRpbWVyRXhwaXJlc0F0IElOVEVHRVI7XG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgQUREIENPTFVNTiBpc0VyYXNlZCBJTlRFR0VSO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfbWVzc2FnZV90aW1lciBPTiBtZXNzYWdlcyAoXG4gICAgICAgIG1lc3NhZ2VUaW1lcixcbiAgICAgICAgbWVzc2FnZVRpbWVyU3RhcnQsXG4gICAgICAgIG1lc3NhZ2VUaW1lckV4cGlyZXNBdCxcbiAgICAgICAgaXNFcmFzZWRcbiAgICAgICkgV0hFUkUgbWVzc2FnZVRpbWVyIElTIE5PVCBOVUxMO1xuXG4gICAgICAtLSBVcGRhdGluZyBmdWxsLXRleHQgdHJpZ2dlcnMgdG8gYXZvaWQgYW55dGhpbmcgd2l0aCBhIG1lc3NhZ2VUaW1lciBzZXRcblxuICAgICAgRFJPUCBUUklHR0VSIG1lc3NhZ2VzX29uX2luc2VydDtcbiAgICAgIERST1AgVFJJR0dFUiBtZXNzYWdlc19vbl9kZWxldGU7XG4gICAgICBEUk9QIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlO1xuXG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5tZXNzYWdlVGltZXIgSVMgTlVMTFxuICAgICAgQkVHSU5cbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzIChcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBib2R5XG4gICAgICAgICkgVkFMVUVTIChcbiAgICAgICAgICBuZXcuaWQsXG4gICAgICAgICAgbmV3LmJvZHlcbiAgICAgICAgKTtcbiAgICAgIEVORDtcbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX2RlbGV0ZSBBRlRFUiBERUxFVEUgT04gbWVzc2FnZXMgQkVHSU5cbiAgICAgICAgREVMRVRFIEZST00gbWVzc2FnZXNfZnRzIFdIRVJFIGlkID0gb2xkLmlkO1xuICAgICAgRU5EO1xuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlIEFGVEVSIFVQREFURSBPTiBtZXNzYWdlc1xuICAgICAgV0hFTiBuZXcubWVzc2FnZVRpbWVyIElTIE5VTExcbiAgICAgIEJFR0lOXG4gICAgICAgIERFTEVURSBGUk9NIG1lc3NhZ2VzX2Z0cyBXSEVSRSBpZCA9IG9sZC5pZDtcbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzKFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIGJvZHlcbiAgICAgICAgKSBWQUxVRVMgKFxuICAgICAgICAgIG5ldy5pZCxcbiAgICAgICAgICBuZXcuYm9keVxuICAgICAgICApO1xuICAgICAgRU5EO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxNicpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTY6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjE3KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAxNykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xNzogc3RhcnRpbmcuLi4nKTtcbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBkYi5leGVjKGBcbiAgICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgICAgQUREIENPTFVNTiBpc1ZpZXdPbmNlIElOVEVHRVI7XG5cbiAgICAgICAgRFJPUCBJTkRFWCBtZXNzYWdlc19tZXNzYWdlX3RpbWVyO1xuICAgICAgYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFxuICAgICAgICAndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTc6IE1lc3NhZ2UgdGFibGUgYWxyZWFkeSBoYWQgaXNWaWV3T25jZSBjb2x1bW4nXG4gICAgICApO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBkYi5leGVjKCdEUk9QIElOREVYIG1lc3NhZ2VzX3ZpZXdfb25jZTsnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgICd1cGRhdGVUb1NjaGVtYVZlcnNpb24xNzogSW5kZXggbWVzc2FnZXNfdmlld19vbmNlIGRpZCBub3QgYWxyZWFkeSBleGlzdCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGIuZXhlYyhgXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdmlld19vbmNlIE9OIG1lc3NhZ2VzIChcbiAgICAgICAgaXNFcmFzZWRcbiAgICAgICkgV0hFUkUgaXNWaWV3T25jZSA9IDE7XG5cbiAgICAgIC0tIFVwZGF0aW5nIGZ1bGwtdGV4dCB0cmlnZ2VycyB0byBhdm9pZCBhbnl0aGluZyB3aXRoIGlzVmlld09uY2UgPSAxXG5cbiAgICAgIERST1AgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQ7XG4gICAgICBEUk9QIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlO1xuXG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5pc1ZpZXdPbmNlICE9IDFcbiAgICAgIEJFR0lOXG4gICAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzX2Z0cyAoXG4gICAgICAgICAgaWQsXG4gICAgICAgICAgYm9keVxuICAgICAgICApIFZBTFVFUyAoXG4gICAgICAgICAgbmV3LmlkLFxuICAgICAgICAgIG5ldy5ib2R5XG4gICAgICAgICk7XG4gICAgICBFTkQ7XG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl91cGRhdGUgQUZURVIgVVBEQVRFIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5pc1ZpZXdPbmNlICE9IDFcbiAgICAgIEJFR0lOXG4gICAgICAgIERFTEVURSBGUk9NIG1lc3NhZ2VzX2Z0cyBXSEVSRSBpZCA9IG9sZC5pZDtcbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzKFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIGJvZHlcbiAgICAgICAgKSBWQUxVRVMgKFxuICAgICAgICAgIG5ldy5pZCxcbiAgICAgICAgICBuZXcuYm9keVxuICAgICAgICApO1xuICAgICAgRU5EO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxNycpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTc6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjE4KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAxOCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xODogc3RhcnRpbmcuLi4nKTtcbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgLS0gRGVsZXRlIGFuZCByZWJ1aWxkIGZ1bGwtdGV4dCBzZWFyY2ggaW5kZXggdG8gY2FwdHVyZSBldmVyeXRoaW5nXG5cbiAgICAgIERFTEVURSBGUk9NIG1lc3NhZ2VzX2Z0cztcbiAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzX2Z0cyhtZXNzYWdlc19mdHMpIFZBTFVFUygncmVidWlsZCcpO1xuXG4gICAgICBJTlNFUlQgSU5UTyBtZXNzYWdlc19mdHMoaWQsIGJvZHkpXG4gICAgICBTRUxFQ1QgaWQsIGJvZHkgRlJPTSBtZXNzYWdlcyBXSEVSRSBpc1ZpZXdPbmNlIElTIE5VTEwgT1IgaXNWaWV3T25jZSAhPSAxO1xuXG4gICAgICAtLSBGaXhpbmcgZnVsbC10ZXh0IHRyaWdnZXJzXG5cbiAgICAgIERST1AgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQ7XG4gICAgICBEUk9QIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlO1xuXG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5pc1ZpZXdPbmNlIElTIE5VTEwgT1IgbmV3LmlzVmlld09uY2UgIT0gMVxuICAgICAgQkVHSU5cbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzIChcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBib2R5XG4gICAgICAgICkgVkFMVUVTIChcbiAgICAgICAgICBuZXcuaWQsXG4gICAgICAgICAgbmV3LmJvZHlcbiAgICAgICAgKTtcbiAgICAgIEVORDtcbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX3VwZGF0ZSBBRlRFUiBVUERBVEUgT04gbWVzc2FnZXNcbiAgICAgIFdIRU4gbmV3LmlzVmlld09uY2UgSVMgTlVMTCBPUiBuZXcuaXNWaWV3T25jZSAhPSAxXG4gICAgICBCRUdJTlxuICAgICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgaWQgPSBvbGQuaWQ7XG4gICAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzX2Z0cyhcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBib2R5XG4gICAgICAgICkgVkFMVUVTIChcbiAgICAgICAgICBuZXcuaWQsXG4gICAgICAgICAgbmV3LmJvZHlcbiAgICAgICAgKTtcbiAgICAgIEVORDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMTgnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjE4OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24xOShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMTkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMTk6IHN0YXJ0aW5nLi4uJyk7XG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIEFMVEVSIFRBQkxFIGNvbnZlcnNhdGlvbnNcbiAgICAgIEFERCBDT0xVTU4gcHJvZmlsZUZhbWlseU5hbWUgVEVYVDtcbiAgICAgIEFMVEVSIFRBQkxFIGNvbnZlcnNhdGlvbnNcbiAgICAgIEFERCBDT0xVTU4gcHJvZmlsZUZ1bGxOYW1lIFRFWFQ7XG5cbiAgICAgIC0tIFByZWxvYWQgbmV3IGZpZWxkIHdpdGggdGhlIHByb2ZpbGVOYW1lIHdlIGFscmVhZHkgaGF2ZVxuICAgICAgVVBEQVRFIGNvbnZlcnNhdGlvbnMgU0VUIHByb2ZpbGVGdWxsTmFtZSA9IHByb2ZpbGVOYW1lO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAxOScpO1xuICB9KSgpO1xuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24xOTogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjAoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDIwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjIwOiBzdGFydGluZy4uLicpO1xuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgLy8gVGhlIHRyaWdnZXJzIG9uIHRoZSBtZXNzYWdlcyB0YWJsZSBzbG93IGRvd24gdGhpcyBtaWdyYXRpb25cbiAgICAvLyBzaWduaWZpY2FudGx5LCBzbyB3ZSBkcm9wIHRoZW0gYW5kIHJlY3JlYXRlIHRoZW0gbGF0ZXIuXG4gICAgLy8gRHJvcCB0cmlnZ2Vyc1xuICAgIGNvbnN0IHRyaWdnZXJzID0gZGJcbiAgICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KFxuICAgICAgICAnU0VMRUNUICogRlJPTSBzcWxpdGVfbWFzdGVyIFdIRVJFIHR5cGUgPSBcInRyaWdnZXJcIiBBTkQgdGJsX25hbWUgPSBcIm1lc3NhZ2VzXCInXG4gICAgICApXG4gICAgICAuYWxsKCk7XG5cbiAgICBmb3IgKGNvbnN0IHRyaWdnZXIgb2YgdHJpZ2dlcnMpIHtcbiAgICAgIGRiLmV4ZWMoYERST1AgVFJJR0dFUiAke3RyaWdnZXIubmFtZX1gKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgbmV3IGNvbHVtbnMgYW5kIGluZGljZXNcbiAgICBkYi5leGVjKGBcbiAgICAgIEFMVEVSIFRBQkxFIGNvbnZlcnNhdGlvbnMgQUREIENPTFVNTiBlMTY0IFRFWFQ7XG4gICAgICBBTFRFUiBUQUJMRSBjb252ZXJzYXRpb25zIEFERCBDT0xVTU4gdXVpZCBURVhUO1xuICAgICAgQUxURVIgVEFCTEUgY29udmVyc2F0aW9ucyBBREQgQ09MVU1OIGdyb3VwSWQgVEVYVDtcbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzIEFERCBDT0xVTU4gc291cmNlVXVpZCBURVhUO1xuICAgICAgQUxURVIgVEFCTEUgc2Vzc2lvbnMgUkVOQU1FIENPTFVNTiBudW1iZXIgVE8gY29udmVyc2F0aW9uSWQ7XG4gICAgICBDUkVBVEUgSU5ERVggY29udmVyc2F0aW9uc19lMTY0IE9OIGNvbnZlcnNhdGlvbnMoZTE2NCk7XG4gICAgICBDUkVBVEUgSU5ERVggY29udmVyc2F0aW9uc191dWlkIE9OIGNvbnZlcnNhdGlvbnModXVpZCk7XG4gICAgICBDUkVBVEUgSU5ERVggY29udmVyc2F0aW9uc19ncm91cElkIE9OIGNvbnZlcnNhdGlvbnMoZ3JvdXBJZCk7XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfc291cmNlVXVpZCBvbiBtZXNzYWdlcyhzb3VyY2VVdWlkKTtcblxuICAgICAgLS0gTWlncmF0ZSBleGlzdGluZyBJRHNcbiAgICAgIFVQREFURSBjb252ZXJzYXRpb25zIFNFVCBlMTY0ID0gJysnIHx8IGlkIFdIRVJFIHR5cGUgPSAncHJpdmF0ZSc7XG4gICAgICBVUERBVEUgY29udmVyc2F0aW9ucyBTRVQgZ3JvdXBJZCA9IGlkIFdIRVJFIHR5cGUgPSAnZ3JvdXAnO1xuICAgIGApO1xuXG4gICAgLy8gRHJvcCBpbnZhbGlkIGdyb3VwcyBhbmQgYW55IGFzc29jaWF0ZWQgbWVzc2FnZXNcbiAgICBjb25zdCBtYXliZUludmFsaWRHcm91cHMgPSBkYlxuICAgICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICAgIFwiU0VMRUNUICogRlJPTSBjb252ZXJzYXRpb25zIFdIRVJFIHR5cGUgPSAnZ3JvdXAnIEFORCBtZW1iZXJzIElTIE5VTEw7XCJcbiAgICAgIClcbiAgICAgIC5hbGwoKTtcbiAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIG1heWJlSW52YWxpZEdyb3Vwcykge1xuICAgICAgY29uc3QganNvbjogeyBpZDogc3RyaW5nOyBtZW1iZXJzOiBBcnJheTx1bmtub3duPiB9ID0gSlNPTi5wYXJzZShcbiAgICAgICAgZ3JvdXAuanNvblxuICAgICAgKTtcbiAgICAgIGlmICghanNvbi5tZW1iZXJzIHx8ICFqc29uLm1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgIGRiLnByZXBhcmU8UXVlcnk+KCdERUxFVEUgRlJPTSBjb252ZXJzYXRpb25zIFdIRVJFIGlkID0gJGlkOycpLnJ1bih7XG4gICAgICAgICAgaWQ6IGpzb24uaWQsXG4gICAgICAgIH0pO1xuICAgICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgICAnREVMRVRFIEZST00gbWVzc2FnZXMgV0hFUkUgY29udmVyc2F0aW9uSWQgPSAkaWQ7J1xuICAgICAgICApLnJ1bih7IGlkOiBqc29uLmlkIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbmVyYXRlIG5ldyBJRHMgYW5kIGFsdGVyIGRhdGFcbiAgICBjb25zdCBhbGxDb252ZXJzYXRpb25zID0gZGJcbiAgICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KCdTRUxFQ1QgKiBGUk9NIGNvbnZlcnNhdGlvbnM7JylcbiAgICAgIC5hbGwoKTtcbiAgICBjb25zdCBhbGxDb252ZXJzYXRpb25zQnlPbGRJZCA9IGtleUJ5KGFsbENvbnZlcnNhdGlvbnMsICdpZCcpO1xuXG4gICAgZm9yIChjb25zdCByb3cgb2YgYWxsQ29udmVyc2F0aW9ucykge1xuICAgICAgY29uc3Qgb2xkSWQgPSByb3cuaWQ7XG4gICAgICBjb25zdCBuZXdJZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuICAgICAgYWxsQ29udmVyc2F0aW9uc0J5T2xkSWRbb2xkSWRdLmlkID0gbmV3SWQ7XG4gICAgICBjb25zdCBwYXRjaE9iajogeyBpZDogc3RyaW5nOyBlMTY0Pzogc3RyaW5nOyBncm91cElkPzogc3RyaW5nIH0gPSB7XG4gICAgICAgIGlkOiBuZXdJZCxcbiAgICAgIH07XG4gICAgICBpZiAocm93LnR5cGUgPT09ICdwcml2YXRlJykge1xuICAgICAgICBwYXRjaE9iai5lMTY0ID0gYCske29sZElkfWA7XG4gICAgICB9IGVsc2UgaWYgKHJvdy50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHBhdGNoT2JqLmdyb3VwSWQgPSBvbGRJZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhdGNoID0gSlNPTi5zdHJpbmdpZnkocGF0Y2hPYmopO1xuXG4gICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBVUERBVEUgY29udmVyc2F0aW9uc1xuICAgICAgICBTRVQgaWQgPSAkbmV3SWQsIGpzb24gPSBKU09OX1BBVENIKGpzb24sICRwYXRjaClcbiAgICAgICAgV0hFUkUgaWQgPSAkb2xkSWRcbiAgICAgICAgYFxuICAgICAgKS5ydW4oe1xuICAgICAgICBuZXdJZCxcbiAgICAgICAgb2xkSWQsXG4gICAgICAgIHBhdGNoLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBtZXNzYWdlUGF0Y2ggPSBKU09OLnN0cmluZ2lmeSh7IGNvbnZlcnNhdGlvbklkOiBuZXdJZCB9KTtcbiAgICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFVQREFURSBtZXNzYWdlc1xuICAgICAgICBTRVQgY29udmVyc2F0aW9uSWQgPSAkbmV3SWQsIGpzb24gPSBKU09OX1BBVENIKGpzb24sICRwYXRjaClcbiAgICAgICAgV0hFUkUgY29udmVyc2F0aW9uSWQgPSAkb2xkSWRcbiAgICAgICAgYFxuICAgICAgKS5ydW4oeyBuZXdJZCwgb2xkSWQsIHBhdGNoOiBtZXNzYWdlUGF0Y2ggfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXBDb252ZXJzYXRpb25zOiBBcnJheTx7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgbWVtYmVyczogc3RyaW5nO1xuICAgICAganNvbjogc3RyaW5nO1xuICAgIH0+ID0gZGJcbiAgICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFNFTEVDVCBpZCwgbWVtYmVycywganNvbiBGUk9NIGNvbnZlcnNhdGlvbnMgV0hFUkUgdHlwZSA9ICdncm91cCc7XG4gICAgICAgIGBcbiAgICAgIClcbiAgICAgIC5hbGwoKTtcblxuICAgIC8vIFVwZGF0ZSBncm91cCBjb252ZXJzYXRpb25zLCBwb2ludCBtZW1iZXJzIGF0IG5ldyBjb252ZXJzYXRpb24gaWRzXG4gICAgZ3JvdXBDb252ZXJzYXRpb25zLmZvckVhY2goZ3JvdXBSb3cgPT4ge1xuICAgICAgY29uc3QgbWVtYmVycyA9IGdyb3VwUm93Lm1lbWJlcnMuc3BsaXQoL1xccz9cXCsvKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBjb25zdCBuZXdNZW1iZXJzID0gW107XG4gICAgICBmb3IgKGNvbnN0IG0gb2YgbWVtYmVycykge1xuICAgICAgICBjb25zdCBtZW1iZXJSb3cgPSBhbGxDb252ZXJzYXRpb25zQnlPbGRJZFttXTtcblxuICAgICAgICBpZiAobWVtYmVyUm93KSB7XG4gICAgICAgICAgbmV3TWVtYmVycy5wdXNoKG1lbWJlclJvdy5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2UgZGlkbid0IHByZXZpb3VzbHkgaGF2ZSBhIHByaXZhdGUgY29udmVyc2F0aW9uIGZvciB0aGlzIG1lbWJlcixcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGNyZWF0ZSBvbmVcbiAgICAgICAgICBjb25zdCBpZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWRDb252ZXJzYXRpb24gPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGUxNjQ6IG0sXG4gICAgICAgICAgICB0eXBlOiAncHJpdmF0ZScsXG4gICAgICAgICAgICB2ZXJzaW9uOiAyLFxuICAgICAgICAgICAgdW5yZWFkQ291bnQ6IDAsXG4gICAgICAgICAgICB2ZXJpZmllZDogMCxcblxuICAgICAgICAgICAgLy8gTm90IGRpcmVjdGx5IHVzZWQgYnkgc2F2ZUNvbnZlcnNhdGlvbiwgYnV0IGFyZSBuZWNlc3NhcnlcbiAgICAgICAgICAgIC8vIGZvciBjb252ZXJzYXRpb24gbW9kZWxcbiAgICAgICAgICAgIGluYm94X3Bvc2l0aW9uOiAwLFxuICAgICAgICAgICAgaXNQaW5uZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbGFzdE1lc3NhZ2VEZWxldGVkRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgICAgICAgICAgbWFya2VkVW5yZWFkOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2VDb3VudDogMCxcbiAgICAgICAgICAgIHNlbnRNZXNzYWdlQ291bnQ6IDAsXG4gICAgICAgICAgICBwcm9maWxlU2hhcmluZzogZmFsc2UsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICAgICAgYFxuICAgICAgICAgICAgVVBEQVRFIGNvbnZlcnNhdGlvbnNcbiAgICAgICAgICAgIFNFVFxuICAgICAgICAgICAgICBqc29uID0gJGpzb24sXG4gICAgICAgICAgICAgIGUxNjQgPSAkZTE2NCxcbiAgICAgICAgICAgICAgdHlwZSA9ICR0eXBlLFxuICAgICAgICAgICAgV0hFUkVcbiAgICAgICAgICAgICAgaWQgPSAkaWQ7XG4gICAgICAgICAgICBgXG4gICAgICAgICAgKS5ydW4oe1xuICAgICAgICAgICAgaWQ6IHVwZGF0ZWRDb252ZXJzYXRpb24uaWQsXG4gICAgICAgICAgICBqc29uOiBvYmplY3RUb0pTT04odXBkYXRlZENvbnZlcnNhdGlvbiksXG4gICAgICAgICAgICBlMTY0OiB1cGRhdGVkQ29udmVyc2F0aW9uLmUxNjQsXG4gICAgICAgICAgICB0eXBlOiB1cGRhdGVkQ29udmVyc2F0aW9uLnR5cGUsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBuZXdNZW1iZXJzLnB1c2goaWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBqc29uID0ge1xuICAgICAgICAuLi5qc29uVG9PYmplY3Q8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KGdyb3VwUm93Lmpzb24pLFxuICAgICAgICBtZW1iZXJzOiBuZXdNZW1iZXJzLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld01lbWJlcnNWYWx1ZSA9IG5ld01lbWJlcnMuam9pbignICcpO1xuICAgICAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgIGBcbiAgICAgICAgVVBEQVRFIGNvbnZlcnNhdGlvbnNcbiAgICAgICAgU0VUIG1lbWJlcnMgPSAkbmV3TWVtYmVyc1ZhbHVlLCBqc29uID0gJG5ld0pzb25WYWx1ZVxuICAgICAgICBXSEVSRSBpZCA9ICRpZFxuICAgICAgICBgXG4gICAgICApLnJ1bih7XG4gICAgICAgIGlkOiBncm91cFJvdy5pZCxcbiAgICAgICAgbmV3TWVtYmVyc1ZhbHVlLFxuICAgICAgICBuZXdKc29uVmFsdWU6IG9iamVjdFRvSlNPTihqc29uKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHNlc3Npb25zIHRvIHN0YWJsZSBJRHNcbiAgICBjb25zdCBhbGxTZXNzaW9ucyA9IGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oJ1NFTEVDVCAqIEZST00gc2Vzc2lvbnM7JykuYWxsKCk7XG4gICAgZm9yIChjb25zdCBzZXNzaW9uIG9mIGFsbFNlc3Npb25zKSB7XG4gICAgICAvLyBOb3QgdXNpbmcgcGF0Y2ggaGVyZSBzbyB3ZSBjYW4gZXhwbGljaXRseSBkZWxldGUgYSBwcm9wZXJ0eSByYXRoZXIgdGhhblxuICAgICAgLy8gaW1wbGljaXRseSBkZWxldGUgdmlhIG51bGxcbiAgICAgIGNvbnN0IG5ld0pzb24gPSBKU09OLnBhcnNlKHNlc3Npb24uanNvbik7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBhbGxDb252ZXJzYXRpb25zQnlPbGRJZFtuZXdKc29uLm51bWJlci5zdWJzdHIoMSldO1xuICAgICAgaWYgKGNvbnZlcnNhdGlvbikge1xuICAgICAgICBuZXdKc29uLmNvbnZlcnNhdGlvbklkID0gY29udmVyc2F0aW9uLmlkO1xuICAgICAgICBuZXdKc29uLmlkID0gYCR7bmV3SnNvbi5jb252ZXJzYXRpb25JZH0uJHtuZXdKc29uLmRldmljZUlkfWA7XG4gICAgICB9XG4gICAgICBkZWxldGUgbmV3SnNvbi5udW1iZXI7XG4gICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBVUERBVEUgc2Vzc2lvbnNcbiAgICAgICAgU0VUIGlkID0gJG5ld0lkLCBqc29uID0gJG5ld0pzb24sIGNvbnZlcnNhdGlvbklkID0gJG5ld0NvbnZlcnNhdGlvbklkXG4gICAgICAgIFdIRVJFIGlkID0gJG9sZElkXG4gICAgICAgIGBcbiAgICAgICkucnVuKHtcbiAgICAgICAgbmV3SWQ6IG5ld0pzb24uaWQsXG4gICAgICAgIG5ld0pzb246IG9iamVjdFRvSlNPTihuZXdKc29uKSxcbiAgICAgICAgb2xkSWQ6IHNlc3Npb24uaWQsXG4gICAgICAgIG5ld0NvbnZlcnNhdGlvbklkOiBuZXdKc29uLmNvbnZlcnNhdGlvbklkLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGlkZW50aXR5IGtleXMgdG8gc3RhYmxlIElEc1xuICAgIGNvbnN0IGFsbElkZW50aXR5S2V5cyA9IGRiXG4gICAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PignU0VMRUNUICogRlJPTSBpZGVudGl0eUtleXM7JylcbiAgICAgIC5hbGwoKTtcbiAgICBmb3IgKGNvbnN0IGlkZW50aXR5S2V5IG9mIGFsbElkZW50aXR5S2V5cykge1xuICAgICAgY29uc3QgbmV3SnNvbiA9IEpTT04ucGFyc2UoaWRlbnRpdHlLZXkuanNvbik7XG4gICAgICBuZXdKc29uLmlkID0gYWxsQ29udmVyc2F0aW9uc0J5T2xkSWRbbmV3SnNvbi5pZF07XG4gICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBVUERBVEUgaWRlbnRpdHlLZXlzXG4gICAgICAgIFNFVCBpZCA9ICRuZXdJZCwganNvbiA9ICRuZXdKc29uXG4gICAgICAgIFdIRVJFIGlkID0gJG9sZElkXG4gICAgICAgIGBcbiAgICAgICkucnVuKHtcbiAgICAgICAgbmV3SWQ6IG5ld0pzb24uaWQsXG4gICAgICAgIG5ld0pzb246IG9iamVjdFRvSlNPTihuZXdKc29uKSxcbiAgICAgICAgb2xkSWQ6IGlkZW50aXR5S2V5LmlkLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVjcmVhdGUgdHJpZ2dlcnNcbiAgICBmb3IgKGNvbnN0IHRyaWdnZXIgb2YgdHJpZ2dlcnMpIHtcbiAgICAgIGRiLmV4ZWModHJpZ2dlci5zcWwpO1xuICAgIH1cblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMjAnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjIwOiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24yMShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMjEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBVUERBVEUgY29udmVyc2F0aW9uc1xuICAgICAgU0VUIGpzb24gPSBqc29uX3NldChcbiAgICAgICAganNvbixcbiAgICAgICAgJyQubWVzc2FnZUNvdW50JyxcbiAgICAgICAgKFNFTEVDVCBjb3VudCgqKSBGUk9NIG1lc3NhZ2VzIFdIRVJFIG1lc3NhZ2VzLmNvbnZlcnNhdGlvbklkID0gY29udmVyc2F0aW9ucy5pZClcbiAgICAgICk7XG4gICAgICBVUERBVEUgY29udmVyc2F0aW9uc1xuICAgICAgU0VUIGpzb24gPSBqc29uX3NldChcbiAgICAgICAganNvbixcbiAgICAgICAgJyQuc2VudE1lc3NhZ2VDb3VudCcsXG4gICAgICAgIChTRUxFQ1QgY291bnQoKikgRlJPTSBtZXNzYWdlcyBXSEVSRSBtZXNzYWdlcy5jb252ZXJzYXRpb25JZCA9IGNvbnZlcnNhdGlvbnMuaWQgQU5EIG1lc3NhZ2VzLnR5cGUgPSAnb3V0Z29pbmcnKVxuICAgICAgKTtcbiAgICBgKTtcbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDIxJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24yMTogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjIoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDIyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQUxURVIgVEFCTEUgdW5wcm9jZXNzZWRcbiAgICAgICAgQUREIENPTFVNTiBzb3VyY2VVdWlkIFNUUklORztcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMjInKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjIyOiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24yMyhcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMjMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICAtLSBSZW1vdmUgdHJpZ2dlcnMgd2hpY2gga2VlcCBmdWxsLXRleHQgc2VhcmNoIHVwIHRvIGRhdGVcbiAgICAgIERST1AgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQ7XG4gICAgICBEUk9QIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlO1xuICAgICAgRFJPUCBUUklHR0VSIG1lc3NhZ2VzX29uX2RlbGV0ZTtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMjMnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjIzOiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24yNChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMjQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBBTFRFUiBUQUJMRSBjb252ZXJzYXRpb25zXG4gICAgICBBREQgQ09MVU1OIHByb2ZpbGVMYXN0RmV0Y2hlZEF0IElOVEVHRVI7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDI0Jyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24yNDogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjUoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDI1KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQUxURVIgVEFCTEUgbWVzc2FnZXNcbiAgICAgIFJFTkFNRSBUTyBvbGRfbWVzc2FnZXNcbiAgICBgKTtcblxuICAgIGNvbnN0IGluZGljZXNUb0Ryb3AgPSBbXG4gICAgICAnbWVzc2FnZXNfZXhwaXJlc19hdCcsXG4gICAgICAnbWVzc2FnZXNfcmVjZWlwdCcsXG4gICAgICAnbWVzc2FnZXNfc2NoZW1hVmVyc2lvbicsXG4gICAgICAnbWVzc2FnZXNfY29udmVyc2F0aW9uJyxcbiAgICAgICdtZXNzYWdlc19kdXBsaWNhdGVfY2hlY2snLFxuICAgICAgJ21lc3NhZ2VzX2hhc0F0dGFjaG1lbnRzJyxcbiAgICAgICdtZXNzYWdlc19oYXNGaWxlQXR0YWNobWVudHMnLFxuICAgICAgJ21lc3NhZ2VzX2hhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMnLFxuICAgICAgJ21lc3NhZ2VzX3dpdGhvdXRfdGltZXInLFxuICAgICAgJ21lc3NhZ2VzX3VucmVhZCcsXG4gICAgICAnbWVzc2FnZXNfdmlld19vbmNlJyxcbiAgICAgICdtZXNzYWdlc19zb3VyY2VVdWlkJyxcbiAgICBdO1xuICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kaWNlc1RvRHJvcCkge1xuICAgICAgZGIuZXhlYyhgRFJPUCBJTkRFWCBJRiBFWElTVFMgJHtpbmRleH07YCk7XG4gICAgfVxuXG4gICAgZGIuZXhlYyhgXG4gICAgICAtLVxuICAgICAgLS0gQ3JlYXRlIGEgbmV3IHRhYmxlIHdpdGggYSBkaWZmZXJlbnQgcHJpbWFyeSBrZXlcbiAgICAgIC0tXG5cbiAgICAgIENSRUFURSBUQUJMRSBtZXNzYWdlcyhcbiAgICAgICAgcm93aWQgSU5URUdFUiBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIGlkIFNUUklORyBVTklRVUUsXG4gICAgICAgIGpzb24gVEVYVCxcbiAgICAgICAgdW5yZWFkIElOVEVHRVIsXG4gICAgICAgIGV4cGlyZXNfYXQgSU5URUdFUixcbiAgICAgICAgc2VudF9hdCBJTlRFR0VSLFxuICAgICAgICBzY2hlbWFWZXJzaW9uIElOVEVHRVIsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkIFNUUklORyxcbiAgICAgICAgcmVjZWl2ZWRfYXQgSU5URUdFUixcbiAgICAgICAgc291cmNlIFNUUklORyxcbiAgICAgICAgc291cmNlRGV2aWNlIFNUUklORyxcbiAgICAgICAgaGFzQXR0YWNobWVudHMgSU5URUdFUixcbiAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzIElOVEVHRVIsXG4gICAgICAgIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMgSU5URUdFUixcbiAgICAgICAgZXhwaXJlVGltZXIgSU5URUdFUixcbiAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wIElOVEVHRVIsXG4gICAgICAgIHR5cGUgU1RSSU5HLFxuICAgICAgICBib2R5IFRFWFQsXG4gICAgICAgIG1lc3NhZ2VUaW1lciBJTlRFR0VSLFxuICAgICAgICBtZXNzYWdlVGltZXJTdGFydCBJTlRFR0VSLFxuICAgICAgICBtZXNzYWdlVGltZXJFeHBpcmVzQXQgSU5URUdFUixcbiAgICAgICAgaXNFcmFzZWQgSU5URUdFUixcbiAgICAgICAgaXNWaWV3T25jZSBJTlRFR0VSLFxuICAgICAgICBzb3VyY2VVdWlkIFRFWFQpO1xuXG4gICAgICAtLSBDcmVhdGUgaW5kZXggaW4gbGlldSBvZiBvbGQgUFJJTUFSWSBLRVlcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19pZCBPTiBtZXNzYWdlcyAoaWQgQVNDKTtcblxuICAgICAgLS1cbiAgICAgIC0tIFJlY3JlYXRlIGluZGljZXNcbiAgICAgIC0tXG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19leHBpcmVzX2F0IE9OIG1lc3NhZ2VzIChleHBpcmVzX2F0KTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3JlY2VpcHQgT04gbWVzc2FnZXMgKHNlbnRfYXQpO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfc2NoZW1hVmVyc2lvbiBPTiBtZXNzYWdlcyAoc2NoZW1hVmVyc2lvbik7XG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19jb252ZXJzYXRpb24gT04gbWVzc2FnZXNcbiAgICAgICAgKGNvbnZlcnNhdGlvbklkLCByZWNlaXZlZF9hdCk7XG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19kdXBsaWNhdGVfY2hlY2sgT04gbWVzc2FnZXNcbiAgICAgICAgKHNvdXJjZSwgc291cmNlRGV2aWNlLCBzZW50X2F0KTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX2hhc0F0dGFjaG1lbnRzIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgaGFzQXR0YWNobWVudHMsIHJlY2VpdmVkX2F0KTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX2hhc0ZpbGVBdHRhY2htZW50cyBPTiBtZXNzYWdlc1xuICAgICAgICAoY29udmVyc2F0aW9uSWQsIGhhc0ZpbGVBdHRhY2htZW50cywgcmVjZWl2ZWRfYXQpO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyBPTiBtZXNzYWdlc1xuICAgICAgICAoY29udmVyc2F0aW9uSWQsIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMsIHJlY2VpdmVkX2F0KTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3dpdGhvdXRfdGltZXIgT04gbWVzc2FnZXNcbiAgICAgICAgKGV4cGlyZVRpbWVyLCBleHBpcmVzX2F0LCB0eXBlKVxuICAgICAgICBXSEVSRSBleHBpcmVzX2F0IElTIE5VTEwgQU5EIGV4cGlyZVRpbWVyIElTIE5PVCBOVUxMO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdW5yZWFkIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgdW5yZWFkKSBXSEVSRSB1bnJlYWQgSVMgTk9UIE5VTEw7XG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc192aWV3X29uY2UgT04gbWVzc2FnZXNcbiAgICAgICAgKGlzRXJhc2VkKSBXSEVSRSBpc1ZpZXdPbmNlID0gMTtcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3NvdXJjZVV1aWQgb24gbWVzc2FnZXMoc291cmNlVXVpZCk7XG5cbiAgICAgIC0tIE5ldyBpbmRleCBmb3Igc2VhcmNoTWVzc2FnZXNcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19zZWFyY2hPcmRlciBvbiBtZXNzYWdlcyhyZWNlaXZlZF9hdCwgc2VudF9hdCk7XG5cbiAgICAgIC0tXG4gICAgICAtLSBSZS1jcmVhdGUgbWVzc2FnZXNfZnRzIGFuZCBhZGQgdHJpZ2dlcnNcbiAgICAgIC0tXG5cbiAgICAgIERST1AgVEFCTEUgbWVzc2FnZXNfZnRzO1xuXG4gICAgICBDUkVBVEUgVklSVFVBTCBUQUJMRSBtZXNzYWdlc19mdHMgVVNJTkcgZnRzNShib2R5KTtcblxuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25faW5zZXJ0IEFGVEVSIElOU0VSVCBPTiBtZXNzYWdlc1xuICAgICAgV0hFTiBuZXcuaXNWaWV3T25jZSBJUyBOVUxMIE9SIG5ldy5pc1ZpZXdPbmNlICE9IDFcbiAgICAgIEJFR0lOXG4gICAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzX2Z0c1xuICAgICAgICAocm93aWQsIGJvZHkpXG4gICAgICAgIFZBTFVFU1xuICAgICAgICAobmV3LnJvd2lkLCBuZXcuYm9keSk7XG4gICAgICBFTkQ7XG5cbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX2RlbGV0ZSBBRlRFUiBERUxFVEUgT04gbWVzc2FnZXMgQkVHSU5cbiAgICAgICAgREVMRVRFIEZST00gbWVzc2FnZXNfZnRzIFdIRVJFIHJvd2lkID0gb2xkLnJvd2lkO1xuICAgICAgRU5EO1xuXG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl91cGRhdGUgQUZURVIgVVBEQVRFIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5pc1ZpZXdPbmNlIElTIE5VTEwgT1IgbmV3LmlzVmlld09uY2UgIT0gMVxuICAgICAgQkVHSU5cbiAgICAgICAgREVMRVRFIEZST00gbWVzc2FnZXNfZnRzIFdIRVJFIHJvd2lkID0gb2xkLnJvd2lkO1xuICAgICAgICBJTlNFUlQgSU5UTyBtZXNzYWdlc19mdHNcbiAgICAgICAgKHJvd2lkLCBib2R5KVxuICAgICAgICBWQUxVRVNcbiAgICAgICAgKG5ldy5yb3dpZCwgbmV3LmJvZHkpO1xuICAgICAgRU5EO1xuXG4gICAgICAtLVxuICAgICAgLS0gQ29weSBkYXRhIG92ZXJcbiAgICAgIC0tXG5cbiAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzXG4gICAgICAoXG4gICAgICAgIGlkLCBqc29uLCB1bnJlYWQsIGV4cGlyZXNfYXQsIHNlbnRfYXQsIHNjaGVtYVZlcnNpb24sIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICByZWNlaXZlZF9hdCwgc291cmNlLCBzb3VyY2VEZXZpY2UsIGhhc0F0dGFjaG1lbnRzLCBoYXNGaWxlQXR0YWNobWVudHMsXG4gICAgICAgIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMsIGV4cGlyZVRpbWVyLCBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsIHR5cGUsXG4gICAgICAgIGJvZHksIG1lc3NhZ2VUaW1lciwgbWVzc2FnZVRpbWVyU3RhcnQsIG1lc3NhZ2VUaW1lckV4cGlyZXNBdCwgaXNFcmFzZWQsXG4gICAgICAgIGlzVmlld09uY2UsIHNvdXJjZVV1aWRcbiAgICAgIClcbiAgICAgIFNFTEVDVFxuICAgICAgICBpZCwganNvbiwgdW5yZWFkLCBleHBpcmVzX2F0LCBzZW50X2F0LCBzY2hlbWFWZXJzaW9uLCBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgcmVjZWl2ZWRfYXQsIHNvdXJjZSwgc291cmNlRGV2aWNlLCBoYXNBdHRhY2htZW50cywgaGFzRmlsZUF0dGFjaG1lbnRzLFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzLCBleHBpcmVUaW1lciwgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wLCB0eXBlLFxuICAgICAgICBib2R5LCBtZXNzYWdlVGltZXIsIG1lc3NhZ2VUaW1lclN0YXJ0LCBtZXNzYWdlVGltZXJFeHBpcmVzQXQsIGlzRXJhc2VkLFxuICAgICAgICBpc1ZpZXdPbmNlLCBzb3VyY2VVdWlkXG4gICAgICBGUk9NIG9sZF9tZXNzYWdlcztcblxuICAgICAgLS0gRHJvcCBvbGQgZGF0YWJhc2VcbiAgICAgIERST1AgVEFCTEUgb2xkX21lc3NhZ2VzO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAyNScpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMjU6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjI2KFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAyNikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIERST1AgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQ7XG4gICAgICBEUk9QIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlO1xuXG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5pc1ZpZXdPbmNlIElTIE5VTEwgT1IgbmV3LmlzVmlld09uY2UgIT0gMVxuICAgICAgQkVHSU5cbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzXG4gICAgICAgIChyb3dpZCwgYm9keSlcbiAgICAgICAgVkFMVUVTXG4gICAgICAgIChuZXcucm93aWQsIG5ldy5ib2R5KTtcbiAgICAgIEVORDtcblxuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlIEFGVEVSIFVQREFURSBPTiBtZXNzYWdlc1xuICAgICAgV0hFTiBuZXcuYm9keSAhPSBvbGQuYm9keSBBTkRcbiAgICAgICAgKG5ldy5pc1ZpZXdPbmNlIElTIE5VTEwgT1IgbmV3LmlzVmlld09uY2UgIT0gMSlcbiAgICAgIEJFR0lOXG4gICAgICAgIERFTEVURSBGUk9NIG1lc3NhZ2VzX2Z0cyBXSEVSRSByb3dpZCA9IG9sZC5yb3dpZDtcbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzXG4gICAgICAgIChyb3dpZCwgYm9keSlcbiAgICAgICAgVkFMVUVTXG4gICAgICAgIChuZXcucm93aWQsIG5ldy5ib2R5KTtcbiAgICAgIEVORDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMjYnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjI2OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24yNyhcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMjcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgcm93aWQgSU5cbiAgICAgICAgKFNFTEVDVCByb3dpZCBGUk9NIG1lc3NhZ2VzIFdIRVJFIGJvZHkgSVMgTlVMTCk7XG5cbiAgICAgIERST1AgVFJJR0dFUiBtZXNzYWdlc19vbl91cGRhdGU7XG5cbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX3VwZGF0ZSBBRlRFUiBVUERBVEUgT04gbWVzc2FnZXNcbiAgICAgIFdIRU5cbiAgICAgICAgbmV3LmJvZHkgSVMgTlVMTCBPUlxuICAgICAgICAoKG9sZC5ib2R5IElTIE5VTEwgT1IgbmV3LmJvZHkgIT0gb2xkLmJvZHkpIEFORFxuICAgICAgICAgKG5ldy5pc1ZpZXdPbmNlIElTIE5VTEwgT1IgbmV3LmlzVmlld09uY2UgIT0gMSkpXG4gICAgICBCRUdJTlxuICAgICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgcm93aWQgPSBvbGQucm93aWQ7XG4gICAgICAgIElOU0VSVCBJTlRPIG1lc3NhZ2VzX2Z0c1xuICAgICAgICAocm93aWQsIGJvZHkpXG4gICAgICAgIFZBTFVFU1xuICAgICAgICAobmV3LnJvd2lkLCBuZXcuYm9keSk7XG4gICAgICBFTkQ7XG5cbiAgICAgIENSRUFURSBUUklHR0VSIG1lc3NhZ2VzX29uX3ZpZXdfb25jZV91cGRhdGUgQUZURVIgVVBEQVRFIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOXG4gICAgICAgIG5ldy5ib2R5IElTIE5PVCBOVUxMIEFORCBuZXcuaXNWaWV3T25jZSA9IDFcbiAgICAgIEJFR0lOXG4gICAgICAgIERFTEVURSBGUk9NIG1lc3NhZ2VzX2Z0cyBXSEVSRSByb3dpZCA9IG9sZC5yb3dpZDtcbiAgICAgIEVORDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMjcnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjI3OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24yOChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMjgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBDUkVBVEUgVEFCTEUgam9icyhcbiAgICAgICAgaWQgVEVYVCBQUklNQVJZIEtFWSxcbiAgICAgICAgcXVldWVUeXBlIFRFWFQgU1RSSU5HIE5PVCBOVUxMLFxuICAgICAgICB0aW1lc3RhbXAgSU5URUdFUiBOT1QgTlVMTCxcbiAgICAgICAgZGF0YSBTVFJJTkcgVEVYVFxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIGpvYnNfdGltZXN0YW1wIE9OIGpvYnMgKHRpbWVzdGFtcCk7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDI4Jyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24yODogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjkoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDI5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQ1JFQVRFIFRBQkxFIHJlYWN0aW9ucyhcbiAgICAgICAgY29udmVyc2F0aW9uSWQgU1RSSU5HLFxuICAgICAgICBlbW9qaSBTVFJJTkcsXG4gICAgICAgIGZyb21JZCBTVFJJTkcsXG4gICAgICAgIG1lc3NhZ2VSZWNlaXZlZEF0IElOVEVHRVIsXG4gICAgICAgIHRhcmdldEF1dGhvclV1aWQgU1RSSU5HLFxuICAgICAgICB0YXJnZXRUaW1lc3RhbXAgSU5URUdFUixcbiAgICAgICAgdW5yZWFkIElOVEVHRVJcbiAgICAgICk7XG5cbiAgICAgIENSRUFURSBJTkRFWCByZWFjdGlvbnNfdW5yZWFkIE9OIHJlYWN0aW9ucyAoXG4gICAgICAgIHVucmVhZCxcbiAgICAgICAgY29udmVyc2F0aW9uSWRcbiAgICAgICk7XG5cbiAgICAgIENSRUFURSBJTkRFWCByZWFjdGlvbl9pZGVudGlmaWVyIE9OIHJlYWN0aW9ucyAoXG4gICAgICAgIGVtb2ppLFxuICAgICAgICB0YXJnZXRBdXRob3JVdWlkLFxuICAgICAgICB0YXJnZXRUaW1lc3RhbXBcbiAgICAgICk7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDI5Jyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24yOTogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzAoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDMwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQ1JFQVRFIFRBQkxFIHNlbmRlcktleXMoXG4gICAgICAgIGlkIFRFWFQgUFJJTUFSWSBLRVkgTk9UIE5VTEwsXG4gICAgICAgIHNlbmRlcklkIFRFWFQgTk9UIE5VTEwsXG4gICAgICAgIGRpc3RyaWJ1dGlvbklkIFRFWFQgTk9UIE5VTEwsXG4gICAgICAgIGRhdGEgQkxPQiBOT1QgTlVMTCxcbiAgICAgICAgbGFzdFVwZGF0ZWREYXRlIE5VTUJFUiBOT1QgTlVMTFxuICAgICAgKTtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMzAnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjMwOiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24zMShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMzEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjMxOiBzdGFydGluZy4uLicpO1xuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICBEUk9QIElOREVYIHVucHJvY2Vzc2VkX2lkO1xuICAgICAgRFJPUCBJTkRFWCB1bnByb2Nlc3NlZF90aW1lc3RhbXA7XG4gICAgICBBTFRFUiBUQUJMRSB1bnByb2Nlc3NlZCBSRU5BTUUgVE8gdW5wcm9jZXNzZWRfb2xkO1xuXG4gICAgICBDUkVBVEUgVEFCTEUgdW5wcm9jZXNzZWQoXG4gICAgICAgIGlkIFNUUklORyBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIHRpbWVzdGFtcCBJTlRFR0VSLFxuICAgICAgICB2ZXJzaW9uIElOVEVHRVIsXG4gICAgICAgIGF0dGVtcHRzIElOVEVHRVIsXG4gICAgICAgIGVudmVsb3BlIFRFWFQsXG4gICAgICAgIGRlY3J5cHRlZCBURVhULFxuICAgICAgICBzb3VyY2UgVEVYVCxcbiAgICAgICAgc291cmNlRGV2aWNlIFRFWFQsXG4gICAgICAgIHNlcnZlclRpbWVzdGFtcCBJTlRFR0VSLFxuICAgICAgICBzb3VyY2VVdWlkIFNUUklOR1xuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIHVucHJvY2Vzc2VkX3RpbWVzdGFtcCBPTiB1bnByb2Nlc3NlZCAoXG4gICAgICAgIHRpbWVzdGFtcFxuICAgICAgKTtcblxuICAgICAgSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyB1bnByb2Nlc3NlZFxuICAgICAgICAoaWQsIHRpbWVzdGFtcCwgdmVyc2lvbiwgYXR0ZW1wdHMsIGVudmVsb3BlLCBkZWNyeXB0ZWQsIHNvdXJjZSxcbiAgICAgICAgIHNvdXJjZURldmljZSwgc2VydmVyVGltZXN0YW1wLCBzb3VyY2VVdWlkKVxuICAgICAgU0VMRUNUXG4gICAgICAgIGlkLCB0aW1lc3RhbXAsIHZlcnNpb24sIGF0dGVtcHRzLCBlbnZlbG9wZSwgZGVjcnlwdGVkLCBzb3VyY2UsXG4gICAgICAgICBzb3VyY2VEZXZpY2UsIHNlcnZlclRpbWVzdGFtcCwgc291cmNlVXVpZFxuICAgICAgRlJPTSB1bnByb2Nlc3NlZF9vbGQ7XG5cbiAgICAgIERST1AgVEFCTEUgdW5wcm9jZXNzZWRfb2xkO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAzMScpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMzE6IHN1Y2Nlc3MhJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjMyKFxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyLFxuICBkYjogRGF0YWJhc2UsXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZVxuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50VmVyc2lvbiA+PSAzMikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICBBREQgQ09MVU1OIHNlcnZlckd1aWQgU1RSSU5HIE5VTEw7XG5cbiAgICAgIEFMVEVSIFRBQkxFIHVucHJvY2Vzc2VkXG4gICAgICBBREQgQ09MVU1OIHNlcnZlckd1aWQgU1RSSU5HIE5VTEw7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDMyJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24zMjogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzMoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDMzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgLS0gVGhlc2UgaW5kZXhlcyBzaG91bGQgZXhpc3QsIGJ1dCB3ZSBhZGQgXCJJRiBFWElTVFNcIiBmb3Igc2FmZXR5LlxuICAgICAgRFJPUCBJTkRFWCBJRiBFWElTVFMgbWVzc2FnZXNfZXhwaXJlc19hdDtcbiAgICAgIERST1AgSU5ERVggSUYgRVhJU1RTIG1lc3NhZ2VzX3dpdGhvdXRfdGltZXI7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICBBREQgQ09MVU1OXG4gICAgICBleHBpcmVzQXQgSU5UXG4gICAgICBHRU5FUkFURUQgQUxXQVlTXG4gICAgICBBUyAoZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wICsgKGV4cGlyZVRpbWVyICogMTAwMCkpO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZV9leHBpcmVzX2F0IE9OIG1lc3NhZ2VzIChcbiAgICAgICAgZXhwaXJlc0F0XG4gICAgICApO1xuXG4gICAgICBDUkVBVEUgSU5ERVggb3V0Z29pbmdfbWVzc2FnZXNfd2l0aG91dF9leHBpcmF0aW9uX3N0YXJ0X3RpbWVzdGFtcCBPTiBtZXNzYWdlcyAoXG4gICAgICAgIGV4cGlyZVRpbWVyLCBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsIHR5cGVcbiAgICAgIClcbiAgICAgIFdIRVJFIGV4cGlyZVRpbWVyIElTIE5PVCBOVUxMIEFORCBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgSVMgTlVMTDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMzMnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjMzOiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24zNChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMzQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhgXG4gICAgICAtLSBUaGlzIGluZGV4IHNob3VsZCBleGlzdCwgYnV0IHdlIGFkZCBcIklGIEVYSVNUU1wiIGZvciBzYWZldHkuXG4gICAgICBEUk9QIElOREVYIElGIEVYSVNUUyBvdXRnb2luZ19tZXNzYWdlc193aXRob3V0X2V4cGlyYXRpb25fc3RhcnRfdGltZXN0YW1wO1xuXG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdW5leHBlY3RlZGx5X21pc3NpbmdfZXhwaXJhdGlvbl9zdGFydF90aW1lc3RhbXAgT04gbWVzc2FnZXMgKFxuICAgICAgICBleHBpcmVUaW1lciwgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wLCB0eXBlXG4gICAgICApXG4gICAgICBXSEVSRSBleHBpcmVUaW1lciBJUyBOT1QgTlVMTCBBTkQgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wIElTIE5VTEw7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDM0Jyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24zNDogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzUoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDM1KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgQ1JFQVRFIElOREVYIGV4cGlyaW5nX21lc3NhZ2VfYnlfY29udmVyc2F0aW9uX2FuZF9yZWNlaXZlZF9hdFxuICAgICAgT04gbWVzc2FnZXNcbiAgICAgIChcbiAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wLFxuICAgICAgICBleHBpcmVUaW1lcixcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHJlY2VpdmVkX2F0XG4gICAgICApO1xuICAgIGApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSAzNScpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uMzU6IHN1Y2Nlc3MhJyk7XG59XG5cbi8vIFJldmVydGVkXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24zNihcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMzYpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDM2Jyk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24zNjogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzcoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDM3KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoYFxuICAgICAgLS0gQ3JlYXRlIHNlbmQgbG9nIHByaW1hcnkgdGFibGVcblxuICAgICAgQ1JFQVRFIFRBQkxFIHNlbmRMb2dQYXlsb2FkcyhcbiAgICAgICAgaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBU0MsXG5cbiAgICAgICAgdGltZXN0YW1wIElOVEVHRVIgTk9UIE5VTEwsXG4gICAgICAgIGNvbnRlbnRIaW50IElOVEVHRVIgTk9UIE5VTEwsXG4gICAgICAgIHByb3RvIEJMT0IgTk9UIE5VTExcbiAgICAgICk7XG5cbiAgICAgIENSRUFURSBJTkRFWCBzZW5kTG9nUGF5bG9hZHNCeVRpbWVzdGFtcCBPTiBzZW5kTG9nUGF5bG9hZHMgKHRpbWVzdGFtcCk7XG5cbiAgICAgIC0tIENyZWF0ZSBzZW5kIGxvZyByZWNpcGllbnRzIHRhYmxlIHdpdGggZm9yZWlnbiBrZXkgcmVsYXRpb25zaGlwIHRvIHBheWxvYWRzXG5cbiAgICAgIENSRUFURSBUQUJMRSBzZW5kTG9nUmVjaXBpZW50cyhcbiAgICAgICAgcGF5bG9hZElkIElOVEVHRVIgTk9UIE5VTEwsXG5cbiAgICAgICAgcmVjaXBpZW50VXVpZCBTVFJJTkcgTk9UIE5VTEwsXG4gICAgICAgIGRldmljZUlkIElOVEVHRVIgTk9UIE5VTEwsXG5cbiAgICAgICAgUFJJTUFSWSBLRVkgKHBheWxvYWRJZCwgcmVjaXBpZW50VXVpZCwgZGV2aWNlSWQpLFxuXG4gICAgICAgIENPTlNUUkFJTlQgc2VuZExvZ1JlY2lwaWVudHNGb3JlaWduS2V5XG4gICAgICAgICAgRk9SRUlHTiBLRVkgKHBheWxvYWRJZClcbiAgICAgICAgICBSRUZFUkVOQ0VTIHNlbmRMb2dQYXlsb2FkcyhpZClcbiAgICAgICAgICBPTiBERUxFVEUgQ0FTQ0FERVxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIHNlbmRMb2dSZWNpcGllbnRzQnlSZWNpcGllbnRcbiAgICAgICAgT04gc2VuZExvZ1JlY2lwaWVudHMgKHJlY2lwaWVudFV1aWQsIGRldmljZUlkKTtcblxuICAgICAgLS0gQ3JlYXRlIHNlbmQgbG9nIG1lc3NhZ2VzIHRhYmxlIHdpdGggZm9yZWlnbiBrZXkgcmVsYXRpb25zaGlwIHRvIHBheWxvYWRzXG5cbiAgICAgIENSRUFURSBUQUJMRSBzZW5kTG9nTWVzc2FnZUlkcyhcbiAgICAgICAgcGF5bG9hZElkIElOVEVHRVIgTk9UIE5VTEwsXG5cbiAgICAgICAgbWVzc2FnZUlkIFNUUklORyBOT1QgTlVMTCxcblxuICAgICAgICBQUklNQVJZIEtFWSAocGF5bG9hZElkLCBtZXNzYWdlSWQpLFxuXG4gICAgICAgIENPTlNUUkFJTlQgc2VuZExvZ01lc3NhZ2VJZHNGb3JlaWduS2V5XG4gICAgICAgICAgRk9SRUlHTiBLRVkgKHBheWxvYWRJZClcbiAgICAgICAgICBSRUZFUkVOQ0VTIHNlbmRMb2dQYXlsb2FkcyhpZClcbiAgICAgICAgICBPTiBERUxFVEUgQ0FTQ0FERVxuICAgICAgKTtcblxuICAgICAgQ1JFQVRFIElOREVYIHNlbmRMb2dNZXNzYWdlSWRzQnlNZXNzYWdlXG4gICAgICAgIE9OIHNlbmRMb2dNZXNzYWdlSWRzIChtZXNzYWdlSWQpO1xuXG4gICAgICAtLSBSZWNyZWF0ZSBtZXNzYWdlcyB0YWJsZSBkZWxldGUgdHJpZ2dlciB3aXRoIHNlbmQgbG9nIHN1cHBvcnRcblxuICAgICAgRFJPUCBUUklHR0VSIG1lc3NhZ2VzX29uX2RlbGV0ZTtcblxuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fZGVsZXRlIEFGVEVSIERFTEVURSBPTiBtZXNzYWdlcyBCRUdJTlxuICAgICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgcm93aWQgPSBvbGQucm93aWQ7XG4gICAgICAgIERFTEVURSBGUk9NIHNlbmRMb2dQYXlsb2FkcyBXSEVSRSBpZCBJTiAoXG4gICAgICAgICAgU0VMRUNUIHBheWxvYWRJZCBGUk9NIHNlbmRMb2dNZXNzYWdlSWRzXG4gICAgICAgICAgV0hFUkUgbWVzc2FnZUlkID0gb2xkLmlkXG4gICAgICAgICk7XG4gICAgICBFTkQ7XG5cbiAgICAgIC0tLSBBZGQgbWVzc2FnZUlkIGNvbHVtbiB0byByZWFjdGlvbnMgdGFibGUgdG8gcHJvcGVybHkgdHJhY2sgcHJvdG8gYXNzb2NpYXRpb25zXG5cbiAgICAgIEFMVEVSIFRBQkxFIHJlYWN0aW9ucyBBREQgY29sdW1uIG1lc3NhZ2VJZCBTVFJJTkc7XG4gICAgYCk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDM3Jyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb24zNzogc3VjY2VzcyEnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzgoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDM4KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIC8vIFRPRE86IFJlbW92ZSBkZXByZWNhdGVkIGNvbHVtbnMgb25jZSBzcWxjaXBoZXIgaXMgdXBkYXRlZCB0byBzdXBwb3J0IGl0XG4gICAgZGIuZXhlYyhgXG4gICAgICBEUk9QIElOREVYIElGIEVYSVNUUyBtZXNzYWdlc19kdXBsaWNhdGVfY2hlY2s7XG5cbiAgICAgIEFMVEVSIFRBQkxFIG1lc3NhZ2VzXG4gICAgICAgIFJFTkFNRSBDT0xVTU4gc291cmNlRGV2aWNlIFRPIGRlcHJlY2F0ZWRTb3VyY2VEZXZpY2U7XG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlc1xuICAgICAgICBBREQgQ09MVU1OIHNvdXJjZURldmljZSBJTlRFR0VSO1xuXG4gICAgICBVUERBVEUgbWVzc2FnZXNcbiAgICAgIFNFVFxuICAgICAgICBzb3VyY2VEZXZpY2UgPSBDQVNUKGRlcHJlY2F0ZWRTb3VyY2VEZXZpY2UgQVMgSU5URUdFUiksXG4gICAgICAgIGRlcHJlY2F0ZWRTb3VyY2VEZXZpY2UgPSBOVUxMO1xuXG4gICAgICBBTFRFUiBUQUJMRSB1bnByb2Nlc3NlZFxuICAgICAgICBSRU5BTUUgQ09MVU1OIHNvdXJjZURldmljZSBUTyBkZXByZWNhdGVkU291cmNlRGV2aWNlO1xuICAgICAgQUxURVIgVEFCTEUgdW5wcm9jZXNzZWRcbiAgICAgICAgQUREIENPTFVNTiBzb3VyY2VEZXZpY2UgSU5URUdFUjtcblxuICAgICAgVVBEQVRFIHVucHJvY2Vzc2VkXG4gICAgICBTRVRcbiAgICAgICAgc291cmNlRGV2aWNlID0gQ0FTVChkZXByZWNhdGVkU291cmNlRGV2aWNlIEFTIElOVEVHRVIpLFxuICAgICAgICBkZXByZWNhdGVkU291cmNlRGV2aWNlID0gTlVMTDtcbiAgICBgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMzgnKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjM4OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb24zOShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gMzkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYygnQUxURVIgVEFCTEUgbWVzc2FnZXMgUkVOQU1FIENPTFVNTiB1bnJlYWQgVE8gcmVhZFN0YXR1czsnKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gMzknKTtcbiAgfSkoKTtcbiAgbG9nZ2VyLmluZm8oJ3VwZGF0ZVRvU2NoZW1hVmVyc2lvbjM5OiBzdWNjZXNzIScpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb240MChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gNDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhcbiAgICAgIGBcbiAgICAgIENSRUFURSBUQUJMRSBncm91cENhbGxSaW5ncyhcbiAgICAgICAgcmluZ0lkIElOVEVHRVIgUFJJTUFSWSBLRVksXG4gICAgICAgIGlzQWN0aXZlIElOVEVHRVIgTk9UIE5VTEwsXG4gICAgICAgIGNyZWF0ZWRBdCBJTlRFR0VSIE5PVCBOVUxMXG4gICAgICApO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDQwJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb240MDogc3VjY2VzcyEnKTtcbn1cblxuZXhwb3J0IGNvbnN0IFNDSEVNQV9WRVJTSU9OUyA9IFtcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMSxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMixcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMyxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNCxcbiAgKF92OiBudW1iZXIsIF9pOiBEYXRhYmFzZSwgX2w6IExvZ2dlclR5cGUpOiB2b2lkID0+IHVuZGVmaW5lZCwgLy8gdmVyc2lvbiA1IHdhcyBkcm9wcGVkXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjYsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjcsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjgsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjksXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjEwLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24xMSxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMTIsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjEzLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24xNCxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMTUsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjE2LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24xNyxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMTgsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjE5LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24yMCxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjEsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjIyLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24yMyxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjQsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjI1LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24yNixcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMjcsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjI4LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24yOSxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzAsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjMxLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24zMixcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzMsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjM0LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24zNSxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzYsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjM3LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb24zOCxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uMzksXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQwLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb240MSxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDIsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQzLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb240NCxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDUsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ2LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb240NyxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDgsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjQ5LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb241MCxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTEsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjUyLFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb241MyxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTQsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU1LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb241NixcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTcsXG4gIHVwZGF0ZVRvU2NoZW1hVmVyc2lvbjU4LFxuICB1cGRhdGVUb1NjaGVtYVZlcnNpb241OSxcbiAgdXBkYXRlVG9TY2hlbWFWZXJzaW9uNjAsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU2NoZW1hKGRiOiBEYXRhYmFzZSwgbG9nZ2VyOiBMb2dnZXJUeXBlKTogdm9pZCB7XG4gIGNvbnN0IHNxbGl0ZVZlcnNpb24gPSBnZXRTUUxpdGVWZXJzaW9uKGRiKTtcbiAgY29uc3Qgc3FsY2lwaGVyVmVyc2lvbiA9IGdldFNRTENpcGhlclZlcnNpb24oZGIpO1xuICBjb25zdCB1c2VyVmVyc2lvbiA9IGdldFVzZXJWZXJzaW9uKGRiKTtcbiAgY29uc3QgbWF4VXNlclZlcnNpb24gPSBTQ0hFTUFfVkVSU0lPTlMubGVuZ3RoO1xuICBjb25zdCBzY2hlbWFWZXJzaW9uID0gZ2V0U2NoZW1hVmVyc2lvbihkYik7XG5cbiAgbG9nZ2VyLmluZm8oXG4gICAgJ3VwZGF0ZVNjaGVtYTpcXG4nLFxuICAgIGAgQ3VycmVudCB1c2VyX3ZlcnNpb246ICR7dXNlclZlcnNpb259O1xcbmAsXG4gICAgYCBNb3N0IHJlY2VudCBkYiBzY2hlbWE6ICR7bWF4VXNlclZlcnNpb259O1xcbmAsXG4gICAgYCBTUUxpdGUgdmVyc2lvbjogJHtzcWxpdGVWZXJzaW9ufTtcXG5gLFxuICAgIGAgU1FMQ2lwaGVyIHZlcnNpb246ICR7c3FsY2lwaGVyVmVyc2lvbn07XFxuYCxcbiAgICBgIChkZXByZWNhdGVkKSBzY2hlbWFfdmVyc2lvbjogJHtzY2hlbWFWZXJzaW9ufTtcXG5gXG4gICk7XG5cbiAgaWYgKHVzZXJWZXJzaW9uID4gbWF4VXNlclZlcnNpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgU1FMOiBVc2VyIHZlcnNpb24gaXMgJHt1c2VyVmVyc2lvbn0gYnV0IHRoZSBleHBlY3RlZCBtYXhpbXVtIHZlcnNpb24gYCArXG4gICAgICAgIGBpcyAke21heFVzZXJWZXJzaW9ufS4gRGlkIHlvdSB0cnkgdG8gc3RhcnQgYW4gb2xkIHZlcnNpb24gb2YgU2lnbmFsP2BcbiAgICApO1xuICB9XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1heFVzZXJWZXJzaW9uOyBpbmRleCArPSAxKSB7XG4gICAgY29uc3QgcnVuU2NoZW1hVXBkYXRlID0gU0NIRU1BX1ZFUlNJT05TW2luZGV4XTtcblxuICAgIHJ1blNjaGVtYVVwZGF0ZSh1c2VyVmVyc2lvbiwgZGIsIGxvZ2dlcik7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG9C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
