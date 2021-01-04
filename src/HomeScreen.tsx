import React, { useState } from "react";
import {
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import coverList from "./../assets/file-covers/cover";

// Constants for convenience
const MARGIN: number = 2;
const ASPECT_RATIO: number = 1584 / 1224;

const NUM_COLUMNS_PORTRAIT: number = 2;
const NUM_COLUMNS_LANDSCAPE: number = 3;

const NAVIGATION_COLOR: string = Platform.OS === "ios" ? "#fff" : "#48a1e0";
const TITLE_COLOR: string = Platform.OS === "ios" ? "#007aff" : "#fff";

const PDF_URLS: Array<string> = [
  "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_about.pdf",
  "https://pdftron.s3.amazonaws.com/custom/ID-zJWLuhTffd3c/sgong/getting_started.pdf",
  "http://www.africau.edu/images/default/sample.pdf",
  "https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf",
  "https://ocw.mit.edu/courses/mathematics/18-821-project-laboratory-in-mathematics-spring-2013/writing/MIT18_821S13_latexsample.pdf",
  "https://planetpdf.com/planetpdf/pdfs/jpn.pdf",
  "https://www.irs.gov/pub/irs-pdf/f1040.pdf",
];

type File = {
  filePath: string;
  id: string;
};

const files: Array<File> = [];

for (let i = 0; i < PDF_URLS.length; i++) {
  files.push({
    filePath: PDF_URLS[i],
    id: "HomeScreenThumbnail" + i,
  });
}

const getPortrait = (): boolean => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return screenWidth < screenHeight;
};

const Stack = createStackNavigator();

type HomeScreenProps = {
  openDocument: Function;
};

const HomeScreen = ({ openDocument }: HomeScreenProps) => {
  const [portrait, setPortrait] = useState(getPortrait());

  const numColumns: number = portrait
    ? NUM_COLUMNS_PORTRAIT
    : NUM_COLUMNS_LANDSCAPE;
  const imageWidth: number = Dimensions.get("window").width / numColumns;
  const imageHeight: number = imageWidth * ASPECT_RATIO;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="PDFTron React Native Sample"
          options={{
            headerStyle: {
              backgroundColor: NAVIGATION_COLOR,
            },
            headerTintColor: TITLE_COLOR,
          }}
        >
          {(props) => (
            <FlatList
              onLayout={() => {
                setPortrait(getPortrait);
              }}
              style={{ backgroundColor: "#efeff5" }}
              data={files}
              renderItem={({ index, item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: imageWidth,
                      height: imageHeight,
                      margin: MARGIN,
                    }}
                    activeOpacity={0.5}
                    onPress={() => {
                      openDocument(item.filePath);
                    }}
                  >
                    <Image
                      style={{
                        width: imageWidth,
                        height: imageHeight,
                      }}
                      source={coverList[index]}
                    />
                  </TouchableOpacity>
                );
              }}
              numColumns={numColumns}
              key={portrait ? "portrait" : "landscape"}
              keyExtractor={(item) => item.id}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
