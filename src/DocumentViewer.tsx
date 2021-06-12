import React from "react";
import { Platform } from "react-native";
import { DocumentView } from "react-native-pdftron";
import { DocumentViewerProps } from "../App";

const DocumentViewer = ({ route, navigation }: DocumentViewerProps) => {
  const { document } = route.params;
  return (
    <DocumentView
      document={document}
      showLeadingNavButton={true}
      CollabEnabled={true}
      autoSaveEnabled={false}
      onLeadingNavButtonPressed={() => navigation.goBack()}
      selectAnnotationAfterCreation={false}
      pageIndicatorEnabled={false}
      leadingNavButtonIcon={
        Platform.OS === "ios"
          ? "ic_close_black_24px.png"
          : "ic_arrow_back_white_24dp"
      }
    />
  );
};

export default DocumentViewer;
