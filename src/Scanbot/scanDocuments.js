import { StatusBar } from 'react-native';

import Scanbot, {
  SBSDKImageModeColor,
  SBSDKImageModeGrayscale,
  SBSDKShutterModeSmart,
  SBSDKShutterModeAlwaysAuto,
  SBSDKShutterModeAlwaysManual,
  SBSDKDocumentDetectionStatusOK,
  SBSDKDocumentDetectionStatusOK_SmallSize,
  SBSDKDocumentDetectionStatusOK_BadAngles,
  SBSDKDocumentDetectionStatusOK_BadAspectRatio,
  SBSDKDocumentDetectionStatusOK_Capturing,
  SBSDKDocumentDetectionStatusError_NothingDetected,
  SBSDKDocumentDetectionStatusError_Brightness,
  SBSDKDocumentDetectionStatusError_Noise,
} from './Scanbot';

// These can be translated to Mandrin
const labelTranslations = {
  "cancelButton": "Cancel",
  "singularDocument": "1 Page",
  "pluralDocuments": "%d Pages",

  "imageMode": {
    [SBSDKImageModeColor]: "Color",
    [SBSDKImageModeGrayscale]: "Grayscale",
  },

  "shutterMode": {
    [SBSDKShutterModeSmart]: "Smart",
    [SBSDKShutterModeAlwaysAuto]: "Automatic",
    [SBSDKShutterModeAlwaysManual]: "Manual",
  },

  "detectionStatus": {
    "capturing": "Capturing",
    [SBSDKDocumentDetectionStatusOK]: "Don't move... capturing!",
    [SBSDKDocumentDetectionStatusOK_SmallSize]: "Move closer.",
    [SBSDKDocumentDetectionStatusOK_BadAngles]: "Turn your device a bit.",
    [SBSDKDocumentDetectionStatusOK_BadAspectRatio]: "Rotate your device.",
    [SBSDKDocumentDetectionStatusOK_Capturing]: "Saving Document...",
    [SBSDKDocumentDetectionStatusError_NothingDetected]: "Searching for document...",
    [SBSDKDocumentDetectionStatusError_Brightness]: "Not enough light!",
    [SBSDKDocumentDetectionStatusError_Noise]:"Background too noisy!"
  },
};

/*
 * Helper function for calling the scan API of Scanbot
 * By adding this file we can just call `scanDocuments`
 * instead of having to pass all the options and translations all the time
 * This file should be changed depending on the project's needs while Scanbot.js should stay unchanged.
 */
const scanDocuments = async () => {
  StatusBar.setHidden(true, true);

  // See 'Scanbot/Scanbot.js' for all options and documentation
  let documents = await Scanbot.scan({
    imageScale: 1,
    autoCaptureSensitivity: 0.83, // delay of 0.5s
    acceptedSizeScore: 50,
    acceptedAngleScore: 70,
    initialImageMode: SBSDKImageModeColor,
    initialShutterMode: SBSDKShutterModeSmart,
    labelTranslations: labelTranslations,
  });
  StatusBar.setHidden(false, true);

  // return require('../../__test_data__/sampleMockScanData').default;

  if(!documents || documents.length === 0) {
    // User cancelled
    return;
  }

  // filter only valid documents
  documents = documents.filter(document => document && document.image);

  if(documents.length === 0) {
    throw new Error('Error while scanning');
  }

  return documents;
};

export default scanDocuments;
