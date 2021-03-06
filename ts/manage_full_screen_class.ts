// Copyright 2021 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

{
  const updateFullScreenClass = (isFullScreen: boolean) => {
    document.body.classList.toggle('full-screen', isFullScreen);
  };
  updateFullScreenClass(window.isFullScreen());
  window.onFullScreenChange = updateFullScreenClass;
}
