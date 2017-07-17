import { NativeModules } from 'react-native';

const SBScanbot = NativeModules.SBScanbot;

/*
 * This file is not strictly necessary, this would also work:
 *
 *    export default SBScanbot
 *
 * But this file makes sure IDE's can autocomplete all the consts and methods that we provide
 */

// Consts

const { SBSDKImageModeColor, SBSDKImageModeGrayscale } = SBScanbot.SBSDKImageMode;
export const SBSDKImageMode = {
  SBSDKImageModeGrayscale,
  SBSDKImageModeColor
};

// Methods

/**
 * SBScanbot.setLicense(string);
 *
 * Installs the Scanbot SDK license from a string.
 * Will terminate the app if license is invalid
 **/

export const setLicense = SBScanbot.setLicense;

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
 * - imageMode:
 *    Specifies the format of the captured images handled via the delegate methods.
 *    Use SBSDKImageMode.SBSDKImageModeGrayscale if a grayscale image is sufficient and to avoid memory pressure.
 *    Defaults to SBSDKImageMode.SBSDKImageModeColor.
 */
export const scan = SBScanbot.scan;
