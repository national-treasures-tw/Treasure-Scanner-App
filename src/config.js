
import {
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
} from './Scanbot/Scanbot';

// env variable not to be checked into GH
import { scanbotLicense, uploadUrl } from './env';

const config = {
  scanbotLicense,

  bucket: uploadUrl,

  autoUploadAllButLastN: 3,
  autoArchiveAllButLastN: 5,

  // See 'Scanbot.js' for all options and documentation
  scanOptions: {
    imageScale: 0.5,
    autoCaptureSensitivity: 0.83, // delay of 0.5s
    acceptedSizeScore: 50,
    acceptedAngleScore: 70,
    initialImageMode: SBSDKImageModeColor,
    initialShutterMode: SBSDKShutterModeSmart,
  },

  labelTranslations: {
    // These can be translated to Mandrin
    "cancel": "Cancel",
    "done": "Done",

    "singularDocument": "1 page",
    "pluralDocuments": "%d pages",

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
  }
};

export default config;
