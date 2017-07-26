#import "SBScanbot.h"

#import "SBScanbotViewController.h"
#import "SBScanbotCropViewController.h"
#import "SBConsts.h"

#import "UIImage+Rotate.h"

@interface SBScanbot ()

@property (strong, nonatomic) NSDictionary *translations;

@end

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

RCT_EXPORT_METHOD(setTranslations:(NSDictionary *)labels) {
	_translations = labels;
}

RCT_EXPORT_METHOD(scan:(NSDictionary *)options
									resolver:(RCTPromiseResolveBlock)resolve
									rejecter:(RCTPromiseRejectBlock)reject) {

	SBScanbotViewController* scanController = [[[NSBundle mainBundle] loadNibNamed:@"SBScanbotViewController" owner:self options:nil] firstObject];
	[scanController scan:options translations:[self translations] resolve:resolve reject:reject];

	dispatch_async(dispatch_get_main_queue(), ^{
		UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
		[rootViewController presentViewController:scanController animated:YES completion:NULL];
	});
}

RCT_EXPORT_METHOD(crop:(NSDictionary *)document
									resolver:(RCTPromiseResolveBlock)resolve
									rejecter:(RCTPromiseRejectBlock)reject) {

	SBScanbotCropViewController* cropController = [[[NSBundle mainBundle] loadNibNamed:@"SBScanbotCropViewController" owner:self options:nil] firstObject];
	[cropController crop:document translations:[self translations] resolve:resolve reject:reject];

	dispatch_async(dispatch_get_main_queue(), ^{
		UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
		[rootViewController presentViewController:cropController animated:YES completion:NULL];
	});
}


RCT_EXPORT_METHOD(rotate:(NSString *)imgStr
									resolver:(RCTPromiseResolveBlock)resolve
									rejecter:(RCTPromiseRejectBlock)reject) {

	dispatch_async(dispatch_get_main_queue(), ^{
		NSError *error;
		NSString *newPath = [self rotateImageAtFilePath:imgStr error:&error];
		if(error) {
			reject(@"Could not rotate image", [error localizedDescription], nil);
			return;
		}

		resolve(newPath);
	});
}

# pragma Helper functions

- (NSString *) rotateImageAtFilePath:(NSString *)path error:(NSError **)rotateError {

	// Read image in form filesystem
	if (![[NSFileManager defaultManager] fileExistsAtPath:path]) {
		*rotateError = [NSError errorWithDomain:[NSString stringWithFormat:@"File does not exist at location %@", path] code:0 userInfo:nil];
		return nil;
	}

	NSError *error;
	NSData *imageData = [NSData dataWithContentsOfFile:path options:0 error:&error];
	if(error) {
		*rotateError = error;
		return nil;
	}

	UIImage *newImage = [[UIImage imageWithData:imageData] imageRotatedByDegrees:90];

	// Write back to disk
	imageData = UIImageJPEGRepresentation(newImage, 0.9);

	NSURL *newPath = [NSURL fileURLWithPath:path];
	newPath = [newPath URLByDeletingLastPathComponent];
	newPath = [newPath URLByAppendingPathComponent:[[NSUUID UUID] UUIDString]];
	newPath = [newPath URLByAppendingPathExtension:@"jpg"];

	[imageData writeToFile:[newPath relativePath] options:NSDataWritingAtomic error:&error];
	if (error) {
		*rotateError = error;
	}

	// Delete old file
	[[NSFileManager defaultManager] removeItemAtPath:path error:&error];
	if (error) {
		*rotateError = error;
	}

	return newPath.relativePath;
}




@end
