# PDFTron React Native Sample
React Native sample project that integrates a document viewer using [PDFTron React Native](https://github.com/PDFTron/pdftron-react-native). Check out the [integration guides](https://www.pdftron.com/documentation/android/guides/react-native) to learn how to add PDFTron to your React Native App.

## Preparation

### Android
Add your [AWS credentials](https://www.pdftron.com/documentation/android/guides/getting-started/integrate-gradle) to the gradle.properties file:
```
AWS_ACCESS_KEY=YOUR_ACCESS_KEY_GOES_HERE
AWS_SECRET_KEY=YOUR_SECRET_KEY_GOES_HERE
```
Your AWS credentials are confidential. Please make sure that they are not publicly available.

### iOS
Add your [pod link](https://www.pdftron.com/documentation/ios/guides/getting-started/integrate-cocoapods) to the Podfile:
```
target 'ReactNativeSample' do
  # Uncomment the next line if you're using Swift or would like to use dynamic frameworks
  use_frameworks!
  pod 'PDFNet', podspec: 'POD_LINK_GOES_HERE'

end
```
Your pod link is confidential. Please make sure that they are not publicly available.

### Run
```
npm install
```

#### Android
```
react-native run-android
```

#### iOS
```
react-native run-ios
```


## License
See [License](./LICENSE)
