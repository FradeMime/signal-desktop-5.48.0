// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { app } from 'electron';

import packageJson from '../package.json';
import * as GlobalErrors from './global_errors';

GlobalErrors.addHandler();

// Set umask early on in the process lifecycle to ensure file permissions are
// set such that only we have read access to our files
process.umask(0o077);

const appUserModelId = `org.whispersystems.${packageJson.name}`;
console.log('Set Windows Application User Model ID (AUMID)', {
  appUserModelId,
});
// 输出node  electron  node_module_version版本
console.log(`Node Version:${process.versions.node}`);
console.log(`Electron Version:${process.versions.electron}`);
console.log(`Node_Module_Version:${process.versions.modules}`);

app.setAppUserModelId(appUserModelId);
