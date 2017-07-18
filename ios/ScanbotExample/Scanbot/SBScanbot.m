#import "SBScanbot.h"

#import "SBScanbotViewController.h"
#import "SBConsts.h"

@implementation SBScanbot

- (dispatch_queue_t)methodQueue {
	return dispatch_get_main_queue();
}

- (UIViewController *) getRootViewController {
	UIViewController *root = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
	while (root.presentedViewController != nil) {
		root = root.presentedViewController;
	}

	return root;
}

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport {
	return @{
		@"SBSDKImageModeColor" : @(SBSDKImageModeColor),
		@"SBSDKImageModeGrayscale" : @(SBSDKImageModeGrayscale),

		@"SBSDKShutterModeSmart" : @(SBSDKShutterModeSmart),
		@"SBSDKShutterModeAlwaysAuto" : @(SBSDKShutterModeAlwaysAuto),
		@"SBSDKShutterModeAlwaysManual" : @(SBSDKShutterModeAlwaysManual),

		@"SBSDKDocumentDetectionStatusOK" : @(SBSDKDocumentDetectionStatusOK),
		@"SBSDKDocumentDetectionStatusOK_SmallSize" : @(SBSDKDocumentDetectionStatusOK_SmallSize),
		@"SBSDKDocumentDetectionStatusOK_BadAngles" : @(SBSDKDocumentDetectionStatusOK_BadAngles),
		@"SBSDKDocumentDetectionStatusOK_BadAspectRatio" : @(SBSDKDocumentDetectionStatusOK_BadAspectRatio),
		@"SBSDKDocumentDetectionStatusOK_Capturing" : @(SBSDKDocumentDetectionStatusOK_Capturing),

		@"SBSDKDocumentDetectionStatusError_NothingDetected" : @(SBSDKDocumentDetectionStatusError_NothingDetected),
		@"SBSDKDocumentDetectionStatusError_Brightness" : @(SBSDKDocumentDetectionStatusError_Brightness),
		@"SBSDKDocumentDetectionStatusError_Noise" : @(SBSDKDocumentDetectionStatusError_Noise)
	};
};

RCT_EXPORT_METHOD(setLicense:(NSString *)license) {
	[ScanbotSDK setLicense: license];
}

RCT_EXPORT_METHOD(scan:(NSDictionary *)options
		resolver:(RCTPromiseResolveBlock)resolve
		rejecter:(RCTPromiseRejectBlock)reject) {

	SBScanbotViewController* scanController = [[[NSBundle mainBundle] loadNibNamed:@"SBScanbotViewController" owner:self options:nil] firstObject];
	[scanController scan:options resolve:resolve reject:reject];
}


@end
