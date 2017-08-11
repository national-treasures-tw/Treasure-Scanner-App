
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
  scanbotLicense: 'VXMvtFUgalNpBeyjO8F2kwC+KEvoooRTxemKTvEZrdTf6EmiJ+zx4I/8Fb7FTxyZoU3Vh4Z7/mYp8Yw8OEnvGCnfLc6P0Lfb8RwSopcL2SxFGou6TH3sH3nEw8giXiMTzkhdMBA0xvaGuagPA/Sk2/l3t/PRD65Q0mdEmql37nXs1i53QkMTY5Q5x4bDkDlvytopayVU8BLZhKIWcDbGdzWQWhsqPX4FodsEAGrSWdzdfdz/uiLFaQKzhb0BtzOfWoyWWTvhDokxGD2HXSjCvGRPHKGopJBIndhEG2uG7FmSLKEFWXXobQ3lzo4pG83SjuC1LWuEXrbdkpUm9Lvs7w==\nU2NhbmJvdFNESwpUTlQuVGFpd2FuLVRyZWF1c3JlCjE1MDU0MzM1OTkKNzgKMQ==\n',

  // bucket: 'https://requestb.in/11d6jet1',
  bucket: 'https://76k76zdzzl.execute-api.us-east-1.amazonaws.com/stage/upload',

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
