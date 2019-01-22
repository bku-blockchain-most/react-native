https://stackoverflow.com/a/52498639/8828489


Delete localhost item from info.plist

App transport security settings -> Exception domains

Bundle ios

react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
In Xcode

Products->Scheme->Edit scheme -> Change build configuration to RELEASE

In AppDelegate.m 

Replace

jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
with

jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
Change device -> Generic iOS device

Product -> Clean

Product -> Build

.app file can be found at

~/Library/Developer/Xcode/DerivedData/<app name>/Build/Products/Release-iphoneos/<appname>
Create folder Payload. 

Paste .app file into Payload folder. 

Compress the Payload folder. 

Change the name you want and put extension as .ipa
