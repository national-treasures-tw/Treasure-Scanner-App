import { NativeModules, Alert } from 'react-native';
import PropTypes from 'prop-types';

const SBScanbot = NativeModules.SBScanbot;

/*
 * This file is not strictly necessary, this would also work:
 *
 *    export default SBScanbot
 *
 * But this file makes sure IDEs can autocomplete all the consts and methods that we provide
 */

// Consts

export const SBSDKImageModeColor = SBScanbot.SBSDKImageModeColor;
export const SBSDKImageModeGrayscale = SBScanbot.SBSDKImageModeGrayscale;

export const SBSDKShutterModeSmart = SBScanbot.SBSDKShutterModeSmart;
export const SBSDKShutterModeAlwaysAuto = SBScanbot.SBSDKShutterModeAlwaysAuto;
export const SBSDKShutterModeAlwaysManual = SBScanbot.SBSDKShutterModeAlwaysManual;

export const SBSDKDocumentDetectionStatusOK = SBScanbot.SBSDKDocumentDetectionStatusOK;
export const SBSDKDocumentDetectionStatusOK_SmallSize = SBScanbot.SBSDKDocumentDetectionStatusOK_SmallSize;
export const SBSDKDocumentDetectionStatusOK_BadAngles = SBScanbot.SBSDKDocumentDetectionStatusOK_BadAngles;
export const SBSDKDocumentDetectionStatusOK_BadAspectRatio = SBScanbot.SBSDKDocumentDetectionStatusOK_BadAspectRatio;
export const SBSDKDocumentDetectionStatusOK_Capturing = SBScanbot.SBSDKDocumentDetectionStatusOK_Capturing;

export const SBSDKDocumentDetectionStatusError_NothingDetected = SBScanbot.SBSDKDocumentDetectionStatusError_NothingDetected;
export const SBSDKDocumentDetectionStatusError_Brightness = SBScanbot.SBSDKDocumentDetectionStatusError_Brightness;
export const SBSDKDocumentDetectionStatusError_Noise = SBScanbot.SBSDKDocumentDetectionStatusError_Noise;

// Methods

const Scanbot = {
  /**
   * SBScanbot.setLicense(string);
   *
   * Installs the Scanbot SDK license from a string.
   * Will terminate the app if license is invalid
   **/
  setLicense: SBScanbot.setLicense,

  /**
   * SBScanbot.scan(options);
   *
   * Options:
   *
   * - imageScale:
   *    Scaling factor being applied to captured still shots before processing (0.0...1.0).
   *    Invalid values are threated as 1.0. Defaults to 0.8.
   *    Used to scale images before processing them. Lower numbers reduce memory pressure.
   *
   * - autoCaptureSensitivity:
   *    Sensitivity factor for automatic capturing (0.0...1.0).
   *    Invalid values are threated as 1.0. Defaults to 0.66 (1 sec).s
   *    A value of 1.0 triggers automatic capturing immediately, a value of 0.0 delays the automatic by 3 seconds.
   *
   * - acceptedSizeScore:
   *    The minimum size in percent of the screen size to accept a detected document (0...100).
   *    It is sufficient that height or width match the score. Default is 80.0.
   *
   * - acceptedAngleScore:
   *    The minimum score in percent of the perspective distortion to accept a detected document. (0...100).
   *    Set lower values to accept more perspective distortion. Default is 75.0.
   *
   * - initialImageMode:
   *    Specifies the format of the captured images handled via the delegate methods.
   *    Use SBSDKImageMode.SBSDKImageModeGrayscale if a grayscale image is sufficient and to avoid memory pressure.
   *    Defaults to SBSDKImageMode.SBSDKImageModeColor.
   *
   * - initialShutterMode:
   *    One SBSDKShutterModeSmart (default), SBSDKShutterModeAlwaysAuto or SBSDKShutterModeAlwaysManual
   *
   *    - SBSDKShutterModeSmart:
   *        Toggles the automatic shutter in a smart way. If there, for 3 seconds,
   *        is no significant device motion and no document was detected the automatic snapping is turned off.
   *        Significant device motion turns it on again.
   *    - SBSDKShutterModeAlwaysAuto:
   *        The camera will always take a photo automatically when a document was detected.
   *    - SBSDKShutterModeAlwaysManual:
   *        The camera will only take a photo when the user presses the shutter button
   *
   * - labelTranslations:
   *    Object with translations keys, see scanPropTypes function below for required translations
   */
  scan: (options) => {
    PropTypes.checkPropTypes(scanPropTypes, options, 'prop', 'scan');
    return SBScanbot.scan(options);
  },

  /**
   * SBScanbot.scan(document);
   *
   * Document:
   *
   * - image:
   *    Base64 encoded image (Cropped)
   *
   * - originalImage:
   *    Base64 encoded image (Not cropped)
   *
   * - polygons:
   *    An array of 8 floats containing the normalized coordinates of the crop
   *    in the form [x1, y1, x2, y2, x3, y3, x4, y4].
   *
   * - rotation:
   *    rotation of image in degrees
   */
  crop: (document) => {
    PropTypes.checkPropTypes(documentPropTypes, document, 'prop', 'scan');
    return SBScanbot.crop(document);
  },

  /**
   * SBScanbot.rotate(image);
   *
   * - image:
   *    string to file on disk
   *
   * Rotates image and returns new filepath
   */
  rotate: (image) => {
    return SBScanbot.rotate(image);
  },
};

const rangeProptype = (min, max) => (props, propName, componentName) => {
  if(typeof props[propName] !== 'undefined' && (props[propName] < min || props[propName] > max)) {
    return new Error(
      `Invalid prop '${propName}' supplied to '${componentName}'.` +
      `${props[propName]} is not in ${min}...${max} range.`
    );
  }
};

const documentPropTypes = {
  image: PropTypes.string.isRequired,
  originalImage: PropTypes.string.isRequired,
  polygons: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.number,
};

const scanPropTypes = {
  imageScale: rangeProptype(0, 1),
  autoCaptureSensitivity: rangeProptype(0, 1),
  acceptedSizeScore: rangeProptype(0, 100),
  acceptedAngleScore: rangeProptype(0, 100),
  initialImageMode: PropTypes.oneOf([SBSDKImageModeColor, SBSDKImageModeGrayscale]).isRequired,
  initialShutterMode: PropTypes.oneOf([SBSDKShutterModeSmart, SBSDKShutterModeAlwaysAuto, SBSDKShutterModeAlwaysManual]).isRequired,
  labelTranslations: PropTypes.shape({
    cancelButton: PropTypes.string.isRequired,
    singularDocument: PropTypes.string.isRequired,
    pluralDocuments: PropTypes.string.isRequired,
    imageMode: PropTypes.shape({
      [SBSDKImageModeColor]: PropTypes.string.isRequired,
      [SBSDKImageModeGrayscale]: PropTypes.string.isRequired,
    }).isRequired,
    shutterMode: PropTypes.shape({
      [SBSDKShutterModeSmart]: PropTypes.string.isRequired,
      [SBSDKShutterModeAlwaysAuto]: PropTypes.string.isRequired,
      [SBSDKShutterModeAlwaysManual]: PropTypes.string.isRequired,
    }).isRequired,
    detectionStatus: PropTypes.shape({
      [SBSDKDocumentDetectionStatusOK]: PropTypes.string.isRequired,
      [SBSDKDocumentDetectionStatusOK_SmallSize]: PropTypes.string.isRequired,
      [SBSDKDocumentDetectionStatusOK_BadAngles]: PropTypes.string.isRequired,
      [SBSDKDocumentDetectionStatusOK_BadAspectRatio]: PropTypes.string.isRequired,
      [SBSDKDocumentDetectionStatusError_NothingDetected]: PropTypes.string.isRequired,
      [SBSDKDocumentDetectionStatusError_Brightness]: PropTypes.string.isRequired,
      [SBSDKDocumentDetectionStatusError_Noise]:PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Scanbot;
