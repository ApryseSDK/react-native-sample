import React, { Component } from "react";
import { Platform } from "react-native";
import { DocumentView } from "react-native-pdftron";

// const DocumentView = require('react-native-pdftron');

type ViewerProps = {
  filePath: string;
  exitViewer: Function;
};

const DocumentViewer = ({ filePath, exitViewer }: ViewerProps) => {
  return (
    <DocumentView
      document={filePath}
      showLeadingNavButton={true}
      leadingNavButtonIcon={
        Platform.OS === "ios"
          ? "ic_close_black_24px.png"
          : "ic_arrow_back_white_24dp"
      }
      onLeadingNavButtonPressed={exitViewer}
    />
  );
};

export default DocumentViewer;
