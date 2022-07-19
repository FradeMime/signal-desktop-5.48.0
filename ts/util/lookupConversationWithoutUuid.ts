// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { ToastFailedToFetchUsername } from '../components/ToastFailedToFetchUsername';
import { ToastFailedToFetchPhoneNumber } from '../components/ToastFailedToFetchPhoneNumber';
import type { UserNotFoundModalStateType } from '../state/ducks/globalModals';
import * as log from '../logging/log';
import { UUID } from '../types/UUID';
import type { UUIDStringType } from '../types/UUID';
import { isValidUsername } from '../types/Username';
import * as Errors from '../types/errors';
import { HTTPError } from '../textsecure/Errors';
import { showToast } from './showToast';
import { strictAssert } from './assert';
import type { UUIDFetchStateKeyType } from './uuidFetchState';

// const MPINAPP = require('../../components/mpin/mpinapp/mpinapp');

// import { mpin } from '../../assets/mpin/mpinapp/mpinapp';

export type LookupConversationWithoutUuidActionsType = Readonly<{
  lookupConversationWithoutUuid: typeof lookupConversationWithoutUuid;
  showUserNotFoundModal: (state: UserNotFoundModalStateType) => void;
  setIsFetchingUUID: (
    identifier: UUIDFetchStateKeyType,
    isFetching: boolean
  ) => void;
}>;

export type LookupConversationWithoutUuidOptionsType = Omit<
  LookupConversationWithoutUuidActionsType,
  'lookupConversationWithoutUuid'
> &
  Readonly<
    | {
        type: 'e164';
        e164: string;
        phoneNumber: string;
      }
    | {
        type: 'username';
        username: string;
      }
  >;

type FoundUsernameType = {
  uuid: UUIDStringType;
  username: string;
};

// search conversations without uuid
export async function lookupConversationWithoutUuid(
  options: LookupConversationWithoutUuidOptionsType
): Promise<string | undefined> {
  const knownConversation = window.ConversationController.get(
    options.type === 'e164' ? options.e164 : options.username
  );
  if (knownConversation && knownConversation.get('uuid')) {
    return knownConversation.id;
  }

  const identifier: UUIDFetchStateKeyType =
    options.type === 'e164'
      ? `e164:${options.e164}`
      : `username:${options.username}`;

  log.info(`LookupConversationWIthoutUuidOptionsType:${identifier}`);

  const { showUserNotFoundModal, setIsFetchingUUID } = options;
  setIsFetchingUUID(identifier, true);

  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error('messaging is not available!');
  }

  try {
    log.info('loopupconversationwithoutuuid try');
    let conversationId: string | undefined;
    // /home/leiqiu/Desktop/Signal-Desktop/ts/util/lookuptest.js

    if (options.type === 'e164') {
      // const serverLookup = await messaging.getUuidsForE164s([options.e164]);
      // log.info(`loopupconversationwithoutuuid:${serverLookup}`);
      // if (serverLookup[options.e164]) {
      //   conversationId = window.ConversationController.ensureContactIds({
      //     e164: options.e164,
      //     uuid: serverLookup[options.e164],
      //     highTrust: true,
      //     reason: 'startNewConversationWithoutUuid(e164)',
      //   });
      // }
      // const serverLookup = await messaging.getUuidsForE164s([options.e164]);
      // log.info(`loopupconversationwithoutuuid:${hello}`);
      // if (serverLookup[options.e164])
      // {
      // add contacts function: need to add server.WebAPI.searchUUid heer
      // also need optimize
      // const testUUid = await messaging.getAccountsUuidForE164(options.e164);
      // log.info(`查询联系人:${testUUid}`);
      // log.info(`lookupConversationWithoutUUid test:${thingApp}`);

      // 测试mpin
      // const mpinApp = new MPINAPP();
      // log.info(`策划:${mpinApp.generateMasterKey()}`);
      let serverLookup = '';
      if (options.e164 === '+8615051510552') {
        serverLookup = 'fafc1a9a-b838-48c5-9169-850e6512463a';
      } else if (options.e164 === '+8615051510553') {
        serverLookup = 'e9e8feff-8a3e-4ae3-bb4f-7b141d87c61c';
      } else if (options.e164 === '+8615190000000') {
        serverLookup = '16d5d23d-8d90-49bf-9a20-726481ba87a9';
      } else if (options.e164 === '+8615051510561') {
        serverLookup = '0c8b59e4-4c47-43b9-9471-1f672bcb5cb0';
      } else if (options.e164 === '+8615051510559') {
        serverLookup = '8f5dfbf6-8941-4456-b3b7-f3a04725cfb0';
      } else {
        serverLookup = '';
      }
      log.info(`serverLookUP:${serverLookup}`);
      conversationId = window.ConversationController.ensureContactIds({
        e164: options.e164,
        uuid: serverLookup,
        highTrust: true,
        reason: 'startNewConversationWithoutUuid(e164)',
      });
      // }
    } else {
      const foundUsername = await checkForUsername(options.username);
      if (foundUsername) {
        conversationId = window.ConversationController.ensureContactIds({
          uuid: foundUsername.uuid,
          highTrust: true,
          reason: 'startNewConversationWithoutUuid(username)',
        });

        const convo = window.ConversationController.get(conversationId);
        strictAssert(convo, 'We just ensured conversation existence');

        convo.set({ username: foundUsername.username });
      }
    }

    if (!conversationId) {
      showUserNotFoundModal(
        options.type === 'username'
          ? options
          : {
              type: 'phoneNumber',
              phoneNumber: options.phoneNumber,
            }
      );
      return undefined;
    }

    return conversationId;
  } catch (error) {
    log.error(
      'startNewConversationWithoutUuid: Something went wrong fetching:',
      Errors.toLogFormat(error)
    );

    if (options.type === 'e164') {
      // Failed to fetch phone number
      // Check your connection and try again
      showToast(ToastFailedToFetchPhoneNumber);
    } else {
      showToast(ToastFailedToFetchUsername);
    }

    return undefined;
  } finally {
    setIsFetchingUUID(identifier, false);
  }
}

async function checkForUsername(
  username: string
): Promise<FoundUsernameType | undefined> {
  if (!isValidUsername(username)) {
    return undefined;
  }

  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error('messaging is not available!');
  }

  try {
    const profile = await messaging.getProfileForUsername(username);

    if (!profile.uuid) {
      log.error("checkForUsername: Returned profile didn't include a uuid");
      return;
    }

    return {
      uuid: UUID.cast(profile.uuid),
      username,
    };
  } catch (error) {
    if (!(error instanceof HTTPError)) {
      throw error;
    }

    if (error.code === 404) {
      return undefined;
    }

    throw error;
  }
}
