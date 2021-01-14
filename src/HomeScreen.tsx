import React, { useState } from "react";
import {
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ImageSourcePropType,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import coverList from "./../assets/file-covers/cover";
import { HomeScreenProps } from "../App";

// Constants for convenience
const GRID_ASPECT_RATIO = 1224 / 1584;

const NUM_COLUMNS_PORTRAIT: number = 2;
const NUM_COLUMNS_LANDSCAPE: number = 3;

const NAVIGATION_COLOR: string = Platform.OS === "ios" ? "#fff" : "#48a1e0";
const TITLE_COLOR: string = Platform.OS === "ios" ? "#007aff" : "#fff";

const BACKGROUND_COLOR: string = "#f2f2f2";

const PDF_URLS: Array<string> = [
  "https://www.pdftron.com/webviewer/demo/gallery/PDFTRON_about.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/Report_2011.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/floorplan.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/chart_supported.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/form-1040.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/magazine.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/comp_sci_cheatsheet.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/legal-contract-doc.pdf",
  "https://www.pdftron.com/webviewer/demo/gallery/construction_drawing-final.pdf",
];

type File = {
  filePath: string;
  id: string;
  cover: ImageSourcePropType;
};

const files: Array<File> = [];

for (let i = 0; i < PDF_URLS.length; i++) {
  files.push({
    filePath: PDF_URLS[i],
    id: "HomeScreenThumbnail" + i,
    cover: coverList[i],
  });
}

const getPortrait = (): boolean => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return screenWidth < screenHeight;
};

const HomeScreenStack = createStackNavigator();

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [portrait, setPortrait] = useState(getPortrait());

  const numColumns: number = portrait
    ? NUM_COLUMNS_PORTRAIT
    : NUM_COLUMNS_LANDSCAPE;

  return (
    <HomeScreenStack.Navigator
      screenOptions={{ headerTitleAlign: "center" }}
      mode="card"
    >
      <HomeScreenStack.Screen
        name="PDFTron React Native Sample"
        options={{
          headerStyle: {
            backgroundColor: NAVIGATION_COLOR,
          },
          headerTintColor: TITLE_COLOR,
        }}
      >
        {(props) => (
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              onLayout={() => {
                setPortrait(getPortrait);
              }}
              style={{ backgroundColor: BACKGROUND_COLOR }}
              data={files}
              renderItem={({ index, item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      margin: "1.5%",
                      width: portrait ? "47%" : "30.33%",
                      aspectRatio: GRID_ASPECT_RATIO,

                      // shadow
                      shadowColor: "#000",
                      shadowOffset: { width: 3, height: 3 },
                      shadowOpacity: 0.2,
                      shadowRadius: 5,
                      elevation: 10,
                      backgroundColor: "#fff",
                    }}
                    activeOpacity={0.5}
                    onPress={() => {
                      navigation.navigate("DocumentViewer", {
                        document: item.filePath,
                      });
                    }}
                  >
                    <Image
                      style={{
                        resizeMode: "center",
                        width: "100%",
                        height: undefined,
                        ...StyleSheet.absoluteFillObject,
                      }}
                      source={item.cover}
                    />
                  </TouchableOpacity>
                );
              }}
              numColumns={numColumns}
              key={portrait ? "portrait" : "landscape"}
              keyExtractor={(item) => item.id}
              {...props}
            />
          </SafeAreaView>
        )}
      </HomeScreenStack.Screen>
    </HomeScreenStack.Navigator>
  );
};

export default HomeScreen;
