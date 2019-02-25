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
- ion-back-button didn't work fully as expected.
Wanted to use it to return to the todo list page, but after the back button was clicked, the menu would open only the todo page no matter which menu item was clicked. So, set the detail page backbutton to return the home page, which allowed the menu to work as expected, but is less than ideal. Probably should try routerLink or create a popup for todo details. Replaced the todo page menu with a backbutton as well.
