import React from "react";
import { Platform } from "react-native";
import { DocumentView } from "@pdftron/react-native-pdf";
import { DocumentViewerProps } from "../App";

const DocumentViewer = ({ route, navigation }: DocumentViewerProps) => {
  const { document } = route.params;
  return (
    <DocumentView
      document={document}
      showLeadingNavButton={true}
      leadingNavButtonIcon={
        Platform.OS === "ios"
          ? "ic_close_black_24px.png"
          : "ic_arrow_back_white_24dp"
      }
      onLeadingNavButtonPressed={() => navigation.goBack()}
    />
  );
};

export default DocumentViewer;
