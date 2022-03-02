import React, { useRef, useEffect } from "react";
import { Platform } from "react-native";
import { DocumentView } from "@pdftron/react-native-pdf";
import { DocumentViewerProps } from "../App";

const DocumentViewer = ({ route, navigation }: DocumentViewerProps) => {
  const xfdf = '<?xml version="1.0" encoding="UTF-8"?>\n<xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve">\n\t<add>\n\t\t<freetext TextColor="#E34133" style="solid" width="0" opacity="1" creationdate="D:20220302223024Z" flags="print" date="D:20220302223024Z" name="08f8fd4e-8e6c-4fd9-92b3-739ea9bb0a47" page="0" fringe="0,0,0,0" rect="13.6,0.476132,171.7,26.0787" title="">\n\t\t\t<defaultstyle>font: Roboto-Regular 15pt;color: #E34133</defaultstyle>\n\t\t\t<defaultappearance> 1 1 1 RG 1 1 1 rg /Roboto 16 Tf </defaultappearance>\n\t\t\t<contents>Welcome to PDFTron!</contents>\n\t\t\t<apref y="26.0787" x="13.6" gennum="0" objnum="928" />\n\t\t</freetext>\n\t</add>\n\t<modify />\n\t<delete />\n\t<pdf-info import-version="4" version="2" xmlns="http://www.pdftron.com/pdfinfo" />\n</xfdf>';
  const { document } = route.params;
  let _viewer = useRef();

  let onLeadingNavButtonPressed = () => {
    console.log("leading nav button pressed");
    navigation.goBack();
    }
  
  return (
    <DocumentView
      ref={(c) => _viewer = c}
      document={document}
      onDocumentLoaded = {(path) => { 
        _viewer.importAnnotationCommand(xfdf);
      }}
      showLeadingNavButton={true}
      leadingNavButtonIcon={
        Platform.OS === "ios"
          ? "ic_close_black_24px.png"
          : "ic_arrow_back_white_24dp"
      }
      onLeadingNavButtonPressed={() => { onLeadingNavButtonPressed();}}
    />
  );
};

export default DocumentViewer;
