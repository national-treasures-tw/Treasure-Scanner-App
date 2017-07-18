//
// Created by Tieme van Veen on 17/07/2017.
// Copyright (c) 2017 Facebook. All rights reserved.
//

#import "RCTConvert+Enums.h"
#import "SBConsts.h"

@implementation RCTConvert (Enums)

RCT_ENUM_CONVERTER(SBSDKImageMode, (@{
	@"SBSDKImageModeColor" : @(SBSDKImageModeColor),
	@"SBSDKImageModeGrayscale" : @(SBSDKImageModeGrayscale)
}), SBSDKImageModeColor, intValue)

RCT_ENUM_CONVERTER(SBSDKShutterMode, (@{
	@"SBSDKShutterModeSmart" : @(SBSDKShutterModeSmart),
	@"SBSDKShutterModeAlwaysAuto" : @(SBSDKShutterModeAlwaysAuto),
	@"SBSDKShutterModeAlwaysManual" : @(SBSDKShutterModeAlwaysManual)
}), SBSDKShutterModeSmart, intValue)

RCT_ENUM_CONVERTER(SBSDKDocumentDetectionStatus, (@{
	@"SBSDKDocumentDetectionStatusOK" : @(SBSDKDocumentDetectionStatusOK),
	@"SBSDKDocumentDetectionStatusOK_SmallSize" : @(SBSDKDocumentDetectionStatusOK_SmallSize),
	@"SBSDKDocumentDetectionStatusOK_BadAngles" : @(SBSDKDocumentDetectionStatusOK_BadAngles),
	@"SBSDKDocumentDetectionStatusOK_BadAspectRatio" : @(SBSDKDocumentDetectionStatusOK_BadAspectRatio),
	@"SBSDKDocumentDetectionStatusOK_Capturing" : @(SBSDKDocumentDetectionStatusOK_Capturing),
	@"SBSDKDocumentDetectionStatusError_NothingDetected" : @(SBSDKDocumentDetectionStatusError_NothingDetected),
	@"SBSDKDocumentDetectionStatusError_Brightness" : @(SBSDKDocumentDetectionStatusError_Brightness),
	@"SBSDKDocumentDetectionStatusError_Noise" : @(SBSDKDocumentDetectionStatusError_Noise)
}), SBSDKDocumentDetectionStatusError_NothingDetected, intValue)

@end
