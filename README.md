# React Native

Mobile Application using React Native

## Snapshots - Android

[View here](./snapshots.md)

## Development

### Quickstart

#### Clone the project

```bash
git clone https://github.com/decentralized-voting/react-native.git
cd react-native
```

#### Installation

Installing packages
```bash
npm install
# or run by yarn
yarn
```

Link packages to native Android and iOS
```bash
### Run via package.json
npm run link
# or use yarn
yarn link

### Run directly by react-native cli
react-native link
```

### Build Android

#### Keystore
Download file `unite-stack-release.keystore`, put it in `android/app/src/`

#### Config properties
+ Edit file `android/local.propertites` with
```bash
MYAPP_RELEASE_STORE_FILE=unite-stack-release.keystore
MYAPP_RELEASE_KEY_ALIAS=unite-stack
MYAPP_RELEASE_STORE_PASSWORD=???
MYAPP_RELEASE_KEY_PASSWORD=???
```

+ Edit file `android/gradle.propertites` with the same lines as `local.propertites`


#### Build
```
npm run build:android
```
Output file: `android/app/build/outputs/apk/release/app-release.apk`

**IMPORTANT**
Discard changes from `android/gradle.propertites`

#### Run iOS

```bash
### Run via package.json
npm run ios
# run on iPhone X
npm run ios:X
# or use yarn
yarn ios
yarn ios:X

### Run directly by react-native cli
react-native run-ios
```

Also open on XCode and run simulator. Start http://localhost:8081 by
```bash
npm start
# or
yarn start
```

#### Run Android

Require virtual device or real device connected start before running
```bash
### Run via package.json
npm run android
# or yarn
yarn android

### Run directly by react-native cli
react-native run-android
```

+ Real device: connect your phone via a cap.
+ Virtual device: use Android Emulator (use Android Virtual Device Manager - AVD Manager in Android Studio) or use Genymotion or another VM.


### React Native

Use detail command in package.json
```bash
npm start

# after link libraries, shoud be restart with reset cache
npm run restart
```

#### Link libraries to iOS and Android
```bash
npm install --save [name]
# or run by yarn
yarn add [name]
```

Link libraries to iOS and Android
```bash
# should use the command
react-native link [name]

## following command link all libraries and assets
react-native link
# or use
npm run link # or yarn link
```

#### Assets
Add images, fonts, icons, audios, videos to assets. After add, you should link assets, that will add to your `./android/` and `./ios/`


#### Icons - react-navite-vector-icons
Browse all here. https://oblador.github.io/react-native-vector-icons/


#### Shortcuts on OSX


|                 | MacOS (XCode) | MacOS (Android) | MacOS (Genymotion) | Linux/Windows (Android) | Linux/Windows (Genymotion) |
|-----------------|:-------------:|:---------------:|:------------------:|:-----------------------:|:--------------------------:|
| Debug JS Remote | `Cmd + D`     | `Cmd + M`       |                    | `Ctrl + M`              | `Ctrl + M`                 |
| Reload          | `Cmd + R`     | `R + R`         |                    | `R + R`                 | `R + R`                    |


### Utility Commands

#### Clean build android and ios
Remove `build` in Android and iOS
```bash
npm run clean:android
npm run clean:ios
# clean both android and ios
npm run clean

# or use yarn
yarn clean:android
yarn clean:ios
yarn clean
```

#### Linting code with Eslint
```bash
npm run lint
yarn lint

### Fix warning with eslint
npm run lint:fix
yarn lint:fix
```




#### React Native Portrait Device Orientation
https://medium.com/react-native-training/react-native-portrait-device-orientation-9bcdeeac0b03







### Server Node.JS
Clone project [server](https://github.com/decentralized-voting/server) to start server Node.JS

#### API Usage
Server NodeJS only work on android with actually API url, therefore change field `apiUrl` in `config/dev.conf.js` to current ip address of your local machine. You can use `ipconfig` on Windows, or `ifconfig` on Linux/OSX to find your local ip address. With debug on XCode Simulator, `localhost`
