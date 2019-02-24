# ionfire
ionic 4 - firebase

## Add cordova firebase plugin

    ionic cordova plugin add cordova-plugin-firebase
    npm install @ionic-native/firebase

## Update local files with changes made at Github

    git pull origin master

## Issues
- NOTE: Some issues may be a result of my coding setup: VS Code running under Crostini/Linux on a PixelBook
- Could never get the VS COde Chrome debugger extension to connect to the Chrome OS or Chromium browser. Had To install Chrome as a Linux app using wget.
- Couldn't fully resolve issues with SigninWithRedirect on the bult-in Chrome instance; or the SighnInWithPopup on the Linux instance.
- Had to replace ion-checkbox with ion-buttons/icons and toggle with ngif. The checbox seemed to block functionality of other buttons.
- Had to add form component to entryComponents in todo module to eliminate error about no component factory found

