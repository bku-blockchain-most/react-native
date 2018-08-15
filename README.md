# Decentralized Voting Application - React Native

Demo application on mobile platform

## Run iOS
View package.json
```bash
npm run ios
# run on iPhone X
npm run ios:X
```

## Start react native
View package.json
```bash
npm start
# after link libraries, shoud be restart with reset cache
npm run restart
```

## Link libraries to iOS and Android
```bash
npm install --save [name]
# or run by yarn
yarn add [name]
```

Link libraries to iOS and Android
```bash
react-native link [name]
```

## React Native Portrait Device Orientation
https://medium.com/react-native-training/react-native-portrait-device-orientation-9bcdeeac0b03


## Shortcuts
### Debug JS Remote
+ XCode Simulator: `Cmd + D`
+ Android Emulator: `Cmd + M`

### Reload
+ XCode Simulator: `Cmd + R`
+ Andriod Emulator: `R + R`


## Development
Server NodeJS only work on android with actually API url, therefore change field `apiUrl` in `config/dev.conf.js` to current ip address of your local machine. You can use `ipconfig` on Windows, or `ifconfig` on Linux/OSX to find your local ip address. With debug on XCode Simulator, `localhost`

## react-navite-vector-icons
Browse all here. https://oblador.github.io/react-native-vector-icons/
