//
// Created by Tieme van Veen on 17/07/2017.
// Copyright (c) 2017 Facebook. All rights reserved.
//

#import "RCTConvert+Enums.h"

@implementation RCTConvert (Enums)

RCT_ENUM_CONVERTER(SBSDKShutterMode, (@{
		@"SBSDKShutterModeSmart" : @(SBSDKShutterModeSmart),
		@"SBSDKShutterModeAlwaysAuto" : @(SBSDKShutterModeAlwaysAuto),
		@"SBSDKShutterModeAlwaysManual" : @(SBSDKShutterModeAlwaysManual)
}), SBSDKShutterModeSmart, integerValue)

RCT_ENUM_CONVERTER(SBSDKImageMode, (@{
		@"SBSDKImageModeColor" : @(SBSDKImageModeColor),
		@"SBSDKImageModeGrayscale" : @(SBSDKImageModeGrayscale)
}), SBSDKImageModeColor, integerValue)

@end
