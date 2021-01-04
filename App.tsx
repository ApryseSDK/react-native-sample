import React, {Component} from 'react';
import {Platform, View, PermissionsAndroid} from 'react-native';
const {RNPdftron} = require('react-native-pdftron');
import HomeScreen from './src/HomeScreen';
import DocumentViewer from './src/DocumentViewer';

type AppStates = {
  onHomeScreen: boolean,
  document: string,
  permissionGranted: boolean,
}

export default class App extends Component<{}, AppStates> {
  constructor(props : {}) {
    super(props);

    this.state = {
      onHomeScreen: true,
      document: '',
      permissionGranted: Platform.OS === 'ios' ? true : false,
    };

    RNPdftron.initialize('');
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestStoragePermission();
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          permissionGranted: true,
        });
        console.log('Storage permission granted');
      } else {
        this.setState({
          permissionGranted: false,
        });
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  openDocument = (filePath : string) => {
    console.log('Opening document with url', filePath);
    this.setState({
      document: filePath,
      onHomeScreen: false,
    });
  };

  exitViewer = () => {
    console.log('Viewer exited');
    this.setState({
      onHomeScreen: true,
    });
  };

  render() {
    if (this.state.permissionGranted) {
      if (this.state.onHomeScreen) {
        return <HomeScreen openDocument={this.openDocument.bind(this)} />;
      } else {
        return (
          <DocumentViewer
            exitViewer={this.exitViewer.bind(this)}
            filePath={this.state.document}
          />
        );
      }
    } else {
      return <View></View>;
    }
  }
}
