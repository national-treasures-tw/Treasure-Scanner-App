#import "SBScanbotViewController.h"

#import <React/RCTUtils.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "SBHud.h"

@implementation SBScanbotViewController {
	NSDictionary *_options;
	RCTPromiseResolveBlock _resolve;
	RCTPromiseRejectBlock _reject;

	SBHud *hud;
}

- (void)viewDidLoad {
	[super viewDidLoad];

	// Create an image storage to save the captured document images to
	self.imageStorage = [[SBSDKImageStorage alloc] init];

	// Create the SBSDKScannerViewController.
	// We want it to be embedded into self.
	// As we do not want automatic image storage we pass nil here for the image storage.
	self.scannerViewController = [[SBSDKScannerViewController alloc] initWithParentViewController:self
	                                                                                 imageStorage:nil];

	// Set the delegate to self.
	self.scannerViewController.delegate = self;

	if (_options[@"imageScale"]) {
		self.scannerViewController.imageScale = [_options[@"imageScale"] floatValue];
	}

	if (_options[@"autoCaptureSensitivity"]) {
		self.scannerViewController.autoCaptureSensitivity = [_options[@"autoCaptureSensitivity"] floatValue];
	}

	if (_options[@"acceptedSizeScore"]) {
		self.scannerViewController.acceptedSizeScore = [_options[@"acceptedSizeScore"] doubleValue];
	}

	if (_options[@"acceptedAngleScore"]) {
		self.scannerViewController.acceptedAngleScore = [_options[@"acceptedAngleScore"] doubleValue];
	}

	if (_options[@"imageMode"]) {
		self.scannerViewController.imageMode = (SBSDKImageMode)[_options[@"imageMode"] integerValue];
	}

	[self setupHUD];
}

- (void) setupHUD {
	hud = [[[NSBundle mainBundle] loadNibNamed:@"SBHud" owner:self options:nil] firstObject];

	[hud setBackgroundColor:[UIColor clearColor]];
	[hud.documentCountLabel setText:@""];

	[self.scannerViewController.HUDView addSubview:hud];
}

- (void) scan:(NSDictionary *)options
			resolve:(RCTPromiseResolveBlock)resolve
			 reject:(RCTPromiseRejectBlock)reject {

	_options = options;
	_resolve = resolve;
	_reject = reject;

	dispatch_async(dispatch_get_main_queue(), ^{
		UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
		[rootViewController presentViewController:self animated:YES completion:NULL];
	});
}

- (void)viewWillDisappear:(BOOL)animated {
	[super viewWillDisappear:animated];
	self.viewAppeared = NO;
}

- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];
	self.viewAppeared = YES;
}

- (BOOL)shouldAutorotate {
	// No autorotations.
	return NO;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
	// Only portrait.
	return UIInterfaceOrientationMaskPortrait;
}

- (UIStatusBarStyle)preferredStatusBarStyle {
	// White statusbar.
	return UIStatusBarStyleLightContent;
}

- (void)dismissController {
	if (_resolve != nil) {

		NSUInteger imageCount = [self.imageStorage imageCount];
		NSMutableArray *images = [NSMutableArray arrayWithCapacity:imageCount];

		for (int i = 0; i < imageCount; i++) {
			UIImage *image = [self.imageStorage imageAtIndex:i];
			NSData *data = UIImageJPEGRepresentation(image, 0.9);
			[images addObject:[data base64EncodedStringWithOptions: NSDataBase64Encoding64CharacterLineLength]];
		}

		_resolve(images);
		_resolve = nil;

		[self dismissViewControllerAnimated:NO completion:nil];
	}
}



#pragma mark - SBSDKScannerViewControllerDelegate

- (BOOL)scannerControllerShouldAnalyseVideoFrame:(SBSDKScannerViewController *)controller {
	// We want to only process video frames when self is visible on screen and front most view controller
	return self.viewAppeared && self.presentedViewController == nil;
}

- (void)scannerController:(SBSDKScannerViewController *)controller
	didCaptureDocumentImage:(UIImage *)image {

	[self.imageStorage addImage:image];

	NSUInteger imageCount = [self.imageStorage imageCount];
	hud.documentCountLabel.text = [NSString stringWithFormat:@"%d Document%@", (int)imageCount, imageCount == 1 ? @"" : @"s"];
	if(imageCount == 3) {
		[self dismissController];
	}
}

- (UIView *)scannerController:(SBSDKScannerViewController *)controller
			 viewForDetectionStatus:(SBSDKDocumentDetectionStatus)status {
	// Here we can return a custom view that we want to use to visualize the latest detection status.
	// We return nil for now to use the standard label.
	return nil;
}

- (UIColor *)scannerController:(SBSDKScannerViewController *)controller
polygonColorForDetectionStatus:(SBSDKDocumentDetectionStatus)status {
	// If the detector has found an acceptable polygon we show it with green color
	if (status == SBSDKDocumentDetectionStatusOK) {
		return [UIColor greenColor];
	}
	// Otherwise red colored.
	return [UIColor redColor];
}
@end
