import React, { Component } from "react";
import { Platform, View, PermissionsAndroid, SafeAreaView } from "react-native";
const { RNPdftron } = require("react-native-pdftron");
import HomeScreen from "./src/HomeScreen";
import DocumentViewer from "./src/DocumentViewer";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

type AppStates = {
  permissionGranted: boolean;
};

const MainStack = createStackNavigator();

type MainStackParamList = {
  HomeScreen: undefined;
  DocumentViewer: { document: string };
};

export type HomeScreenProps = {
  navigation: StackNavigationProp<MainStackParamList, "HomeScreen">;
};

export type DocumentViewerProps = {
  route: RouteProp<MainStackParamList, "DocumentViewer">;
  navigation: StackNavigationProp<MainStackParamList, "DocumentViewer">;
};

export default class App extends Component<{}, AppStates> {
  constructor(props: {}) {
    super(props);

    this.state = {
      permissionGranted: Platform.OS === "ios",
    };

    RNPdftron.initialize("");
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this.requestStoragePermission();
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          permissionGranted: true,
        });
        console.log("Storage permission granted");
      } else {
        this.setState({
          permissionGranted: false,
        });
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    if (this.state.permissionGranted) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <MainStack.Navigator mode="card" headerMode="none">
              <MainStack.Screen name="HomeScreen" component={HomeScreen} />
              <MainStack.Screen
                name="DocumentViewer"
                component={DocumentViewer}
              />
            </MainStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      );
    } else {
      return <View></View>;
    }
  }
}
