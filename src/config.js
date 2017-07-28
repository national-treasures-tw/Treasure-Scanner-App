
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

const config = {
  scanbotLicense: 'Px/ikVYDSTzigYnpa+pwcXluzh/sk6B+16D2zqRf2fK2HgvBDRI6ofHV+DmVSLJMgcXprW7h4bEMKkczYth3SsPeV7B0CLQJdnblxXTnC/DAAFmJxQMK+0Icl9deZWuzeZW/YDT4fCvQRLAFgaFLQKWzYzBmoZj+Sanl0R5OOdG+/thIvTQMXJF+vSvW3NGQzr1ADUKsZ8ye3O5ERLKsMtQo+kAMA/krKVPpMStHN+8lP+CU1Qb4Z7cWjSjCcqIBT3HS5e3oPDqDrp9Spy81XXYfr/KTlRIT9G7ZZIsi3650tpB1KE3zJvUzolBlKMuUVNpGHC4NjFyBUbPU6mS9Ow==\nU2NhbmJvdFNESwpUTlQuVGFpd2FuLVRyZWF1c3JlCjE1MDE4OTExOTkKNzgKMQ==\n',

  bucket: 'https://requestb.in/11d6jet1',
  // bucket: 'https://76k76zdzzl.execute-api.us-east-1.amazonaws.com/stage/upload',

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

    "singularDocument": "1", // or "1 page" if you like
    "pluralDocuments": "%d", // or "%d pages" if you like

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