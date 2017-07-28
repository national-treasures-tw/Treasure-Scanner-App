#import "SBScanbotViewController.h"

#import <React/RCTUtils.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

#import "SBConsts.h"
#import "UIColor+Hex.h"

@interface SBScanbotViewController () <SBSDKScannerViewControllerDelegate>

@property (strong, nonatomic) NSDictionary *options;
@property (strong, nonatomic) NSDictionary *translations;
@property (strong, nonatomic) RCTPromiseResolveBlock resolve;
@property (strong, nonatomic) void (^callback)(NSDictionary *scan);

@property (strong, nonatomic) SBSDKScannerViewController *scannerViewController;

@property (strong, nonatomic) UIImage *capturedImage;
@property (strong, nonatomic) UIImage *capturedDocumentImage;
@property (strong, nonatomic) NSDictionary *metaData;

@property (assign, nonatomic) int imageCount;
@property (assign, nonatomic) BOOL viewAppeared;
@property (assign, nonatomic) BOOL isCapturing;
@property (assign, nonatomic) BOOL nextIsNonDocument;
@property (assign, nonatomic) SBSDKShutterMode previousShutterMode;

@property (weak, nonatomic) IBOutlet UIButton *doneButton;
@property (weak, nonatomic) IBOutlet UIButton *shutterModeButton;
@property (weak, nonatomic) IBOutlet UIButton *imageModeButton;
@property (weak, nonatomic) IBOutlet UIButton *typeButton;

@end

@implementation SBScanbotViewController

- (BOOL)shouldAutorotate {
	// No autorotations.
	return NO;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
	// Only portrait.
	return UIInterfaceOrientationMaskPortrait;
}

#pragma mark - Lifecycle methods

- (void)viewDidLoad {
	[super viewDidLoad];

	self.imageCount = 0;

	// Embed in this viewcontroller. No automatic image storage.
	self.scannerViewController = [[SBSDKScannerViewController alloc] initWithParentViewController:self
																																									 imageStorage:nil];
	self.scannerViewController.delegate = self;

	// Set initial UI elements
	[self setHud];
}

- (void) setScannerOptions {

	if (self.options[@"imageScale"]) {
		self.scannerViewController.imageScale = [self.options[@"imageScale"] floatValue];
	}

	if (self.options[@"autoCaptureSensitivity"]) {
		self.scannerViewController.autoCaptureSensitivity = [self.options[@"autoCaptureSensitivity"] floatValue];
	}

	if (self.options[@"acceptedSizeScore"]) {
		self.scannerViewController.acceptedSizeScore = [self.options[@"acceptedSizeScore"] doubleValue];
	}

	if (self.options[@"acceptedAngleScore"]) {
		self.scannerViewController.acceptedAngleScore = [self.options[@"acceptedAngleScore"] doubleValue];
	}

	if (self.options[@"imageMode"]) {
		self.scannerViewController.imageMode = (SBSDKImageMode)[self.options[@"imageMode"] integerValue];
	}

	if (self.options[@"initialImageMode"]) {
		self.scannerViewController.imageMode = (SBSDKImageMode)[self.options[@"initialImageMode"] integerValue];
	}

	if (self.options[@"initialShutterMode"]) {
		self.scannerViewController.shutterMode = (SBSDKShutterMode)[self.options[@"initialShutterMode"] integerValue];
	}

	[self.doneButton setTitle:[self translationLabelForKey:@"done"] forState:UIControlStateNormal];
}

- (void) setHud {
	// Remove color from interface builder (easier building)
	self.doneButton.backgroundColor = [UIColor clearColor];

	// Customize this xib file to add some UI between the scanner preview and the shutter button
	UIView *grayBG = [[[NSBundle mainBundle] loadNibNamed:@"SBHud" owner:self options:nil] firstObject];
	// fix grayBG position
	grayBG.frame = self.scannerViewController.view.frame;
	[self.scannerViewController.HUDView addSubview:grayBG];
}

- (void) updateDoneButton {
	if([self imageCount] == 0) {
		[self.doneButton setTitle:[self translationLabelForKey:@"cancel"] forState:UIControlStateNormal];
	} else if([self imageCount] == 1) {
		[self.doneButton setTitle:[self translationLabelForKey:@"singularDocument"] forState:UIControlStateNormal];
	} else {
		[self.doneButton setTitle:[NSString stringWithFormat:[self translationLabelForKey:@"pluralDocuments"], [self imageCount]] forState:UIControlStateNormal];
	}
}

- (void) updateImageModeButton {
	if(self.scannerViewController.imageMode == SBSDKImageModeColor) {
		[self.imageModeButton setTitle:[self translationLabelForKey:@"imageMode" enumValue:SBSDKImageModeColor] forState:UIControlStateNormal];
	} else {
		[self.imageModeButton setTitle:[self translationLabelForKey:@"imageMode" enumValue:SBSDKImageModeGrayscale] forState:UIControlStateNormal];
	}

	self.imageModeButton.enabled = !self.isCapturing;
	self.imageModeButton.alpha = self.isCapturing ? 0.5 : 1;
}

- (void) updateShutterModeButton {
	if(self.scannerViewController.shutterMode == SBSDKShutterModeSmart) {
		[self.shutterModeButton setTitle:[self translationLabelForKey:@"shutterMode" enumValue:SBSDKShutterModeSmart] forState:UIControlStateNormal];
	} else if(self.scannerViewController.shutterMode == SBSDKShutterModeAlwaysAuto) {
		[self.shutterModeButton setTitle:[self translationLabelForKey:@"shutterMode" enumValue:SBSDKShutterModeAlwaysAuto] forState:UIControlStateNormal];
	} else {
		[self.shutterModeButton setTitle:[self translationLabelForKey:@"shutterMode" enumValue:SBSDKShutterModeAlwaysManual] forState:UIControlStateNormal];
	}

	self.shutterModeButton.enabled = !self.isCapturing;
	self.shutterModeButton.alpha = self.isCapturing ? 0.5 : 1;
}

- (void) updateTypeButton {
	if(self.nextIsNonDocument) {
		[self.typeButton setTitle:@"📦" forState:UIControlStateNormal];
	} else {
		[self.typeButton setTitle:@"📄" forState:UIControlStateNormal];
	}

	self.typeButton.enabled = !self.isCapturing;
	self.typeButton.alpha = self.isCapturing ? 0.5 : 1;
}

- (void)viewWillDisappear:(BOOL)animated {
	[super viewWillDisappear:animated];
	self.viewAppeared = NO;
}

- (void)viewDidAppear:(BOOL)animated {
	[super viewDidAppear:animated];
	self.viewAppeared = YES;
}

#pragma mark - User actions


- (void) scan:(NSDictionary *)options
 translations:(NSDictionary *)translations
			resolve:(RCTPromiseResolveBlock)resolve
 imageScanned:(void (^)(NSDictionary *scan))callback {

	self.callback = callback;
	self.translations = translations;
	self.options = options;
	self.resolve = resolve;

	[self setScannerOptions];
	[self updateDoneButton];
	[self updateImageModeButton];
	[self updateShutterModeButton];
	[self updateTypeButton];
}

- (IBAction)onChangeShutterMode:(UIButton *)sender {
	if(self.scannerViewController.shutterMode == SBSDKShutterModeAlwaysManual) {
		self.scannerViewController.shutterMode = SBSDKShutterModeSmart;
	} else if(self.scannerViewController.shutterMode == SBSDKShutterModeSmart) {
		self.scannerViewController.shutterMode = SBSDKShutterModeAlwaysAuto;
	} else {
		self.scannerViewController.shutterMode = SBSDKShutterModeAlwaysManual;
	}

	[self updateShutterModeButton];
}

- (IBAction)onImageMode:(UIButton *)sender {
	if(self.scannerViewController.imageMode == SBSDKImageModeColor) {
		self.scannerViewController.imageMode = SBSDKImageModeGrayscale;
	} else {
		self.scannerViewController.imageMode = SBSDKImageModeColor;
	}

	[self updateImageModeButton];
}

- (IBAction)onTypeChange:(UIButton *)sender {
	self.previousShutterMode = self.scannerViewController.shutterMode;
	self.scannerViewController.shutterMode = SBSDKShutterModeAlwaysManual;
	[self updateShutterModeButton];

	self.nextIsNonDocument = !self.nextIsNonDocument;
	[self updateTypeButton];
}

#pragma mark - Done / Cancel

- (IBAction)onDone:(id)sender {
	self.resolve(@{});
	[self dismissViewControllerAnimated:YES completion:nil];
}

- (void) saveLastImage  {
	NSError *error;
	NSDictionary *document = [self getScannedDocument:&error];
	if(error) {
		self.callback(@{@"error": [error localizedDescription]});
		return;
	}

	self.callback(@{@"document": document});
}

- (NSDictionary *) getScannedDocument:(NSError **)saveError {

	NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
	NSString *scansPath = [documentsDirectory stringByAppendingPathComponent:@"/Scans"];

	NSError *error;
	// Create folder if we need to
	if (![[NSFileManager defaultManager] fileExistsAtPath:scansPath]) {
		[[NSFileManager defaultManager] createDirectoryAtPath:scansPath withIntermediateDirectories:NO attributes:nil error:&error];
		if(error) {
			NSLog(@"Creating folder failed %@", error);
			*saveError = error;
			return @{};
		}
	}

	NSMutableDictionary *document = [self.metaData mutableCopy];

	// create random filepath
	NSURL *url = [NSURL URLWithString:scansPath];
	url = [url URLByAppendingPathComponent:[[NSUUID UUID] UUIDString]];
	url = [url URLByAppendingPathExtension:@"jpg"];

	document[@"image"] = [url relativePath];

	NSData *data = UIImageJPEGRepresentation(self.capturedDocumentImage, 0.9);
	[data writeToFile:[url relativePath] options:NSDataWritingAtomic error:&error];
	if (error) {
		*saveError = error;
		return @{};
	}

	url = [NSURL URLWithString:scansPath];
	url = [url URLByAppendingPathComponent: [NSString stringWithFormat:@"%@-original", [[NSUUID UUID] UUIDString]]];
	url = [url URLByAppendingPathExtension:@"jpg"];

	document[@"originalImage"] = [url relativePath];

	data = UIImageJPEGRepresentation(self.capturedImage, 0.9);
	[data writeToFile:[url relativePath] options:NSDataWritingAtomic error:&error];
	if (error) {
		*saveError = error;
		return @{};
	}

	return document;
}

- (void) resetState {
	self.capturedImage = nil;
	self.capturedDocumentImage = nil;
	self.metaData = nil;
}

#pragma mark - Translation / Label helper functions

- (NSString *) translationLabelForKey:(NSString *)key {
	@try {
		return [self.translations valueForKeyPath:key];
	}
	@catch (NSException * e) {
		return key;
	}
}

- (NSString *) translationLabelForKey:(NSString *)key enumValue:(int) enumValue {
	NSString* keyPath = [NSString stringWithFormat:@"%@.%d", key, enumValue];
	@try {
		return [self.translations valueForKeyPath:keyPath];
	}
	@catch (NSException * e) {
		return keyPath;
	}
}

#pragma mark - SBSDKScannerViewControllerDelegate


/**
 * Asks the delegate whether the camera UI, shutter button and guidance UI, should be rotated to
 * reflect the device orientation or not.
 * Optional.
 * @param controller The calling SBSDKScannerViewController.
 * @param orientation The new device orientation the device is rotated to.
 * @param transform The CGAffineTransform that will be used to rotate UI elements.
 */
- (BOOL)scannerController:(nonnull SBSDKScannerViewController *)controller
shouldRotateInterfaceForDeviceOrientation:(UIDeviceOrientation)orientation
								transform:(CGAffineTransform)transform {
	return !self.shouldAutorotate;
}

/**
 * Asks the delegate whether to detect on the next video frame or not.
 * Return NO if you dont want detection on video frames, e.g. when a view controller is presented modally or when your
 * view contollers view currently is not in the view hierarchy.
 * @param controller The calling SBSDKScannerViewController.
 * @return YES if the video frame should be analyzed, NO otherwise.
 */
- (BOOL)scannerControllerShouldAnalyseVideoFrame:(SBSDKScannerViewController *)controller {
	// We want to only process video frames when self is visible on screen and front most view controller
	return (self.viewAppeared &&
					self.presentedViewController == nil &&
					self.scannerViewController.autoShutterEnabled == YES);
}

/**
 * Tells the delegate that a still image is about to be captured. Here you can change the appearance of you custom
 * shutter button or HUD to reflect in the UI that we are now busy taking an image.
 * @param controller The calling SBSDKScannerViewController.
 */
- (void)scannerControllerWillCaptureStillImage:(SBSDKScannerViewController *)controller {
	//NSLog(@"willCapture");

	self.isCapturing = true;
	[self updateDoneButton];
	[self updateImageModeButton];
	[self updateShutterModeButton];
	[self updateTypeButton];

	// Flash screen
	[UIView animateWithDuration:0.2 animations:^{
		controller.HUDView.backgroundColor = [[UIColor whiteColor] colorWithAlphaComponent:0.75];
	} completion:^(BOOL finished) {
		[UIView animateWithDuration:0.2 animations:^{
			controller.HUDView.backgroundColor = [UIColor clearColor];
		}];
	}];
}

/**
 * Tells the delegate that a still image has been captured and its orientation has been corrected. Optional.
 * @param controller The calling SBSDKScannerViewController.
 * @param image The captured original image, rotated depending on the device orientation.
 * @param polygon The polygon that was detected on the image.
 * @param properties The properties of the camera and lens. Useful to calculate the aspect ratio of the cropped image.
 */
- (void)scannerController:(nonnull SBSDKScannerViewController *)controller didCaptureImage:(nullable UIImage *)image
			withDetectedPolygon:(nullable SBSDKPolygon *)polygon
		 lensCameraProperties:(nullable SBSDKLensCameraProperties *)properties {
	//NSLog(@"didCapture");
	
	self.metaData = @{
										@"isNotDocument": @(self.nextIsNonDocument),
										@"polygon": polygon ? [polygon normalizedDoubleValues] : [NSNull null],
										};

	// Save non cropped image
	self.capturedImage = image;

	// Change UI back to normal if this was a Non-Document
	if(self.nextIsNonDocument) {
		self.nextIsNonDocument = false;
		self.scannerViewController.shutterMode = self.previousShutterMode;
	}
}

/**
 * Tells the delegate that a document image has been cropped out of an orientation corrected still image.
 * @param controller The calling SBSDKScannerViewController.
 * @param documentImage The cropped and perspective corrected documents image, rotated depending on the device orientation.
 */
- (void)scannerController:(SBSDKScannerViewController *)controller didCaptureDocumentImage:(UIImage *)documentImage {
	//NSLog(@"didCaptureDocumentImage");

	// Save cropped image
	self.capturedDocumentImage = documentImage;
	self.imageCount++;

	self.isCapturing = false;
	[self updateDoneButton];
	[self updateImageModeButton];
	[self updateShutterModeButton];
	[self updateTypeButton];
	[self saveLastImage];
}

/**
 * Tells the delegate that capturing a still image has been failed The underlying error is provided. Optional.
 * @param controller The calling SBSDKScannerViewController.
 * @param error The reason for the failure.
 */
- (void)scannerController:(SBSDKScannerViewController *)controller didFailCapturingImage:(NSError *)error {
	NSLog(@"%@", [error localizedDescription]);
	// TODO: Display the error ?
	self.isCapturing = false;
	[self updateDoneButton];
	[self updateImageModeButton];
	[self updateShutterModeButton];
	[self updateTypeButton];
	[self resetState];
}

/**
 * Asks the delegate for a view to visualize the current detection status. Optional.
 * @param status The status of the detection.
 * @param controller The calling SBSDKScannerViewController.
 * @return Your custom view to visualize the detection status, e.g. a label with localized text or
 * an image view with an icon.
 * If you return nil the standard label is displayed. If you want to show nothing just return an empty view ([UIView new]).
 * If possible reuse the views per status or just use one single configurable view.
 * The scanner view controller takes care of adding and removing your view from/to the view hierarchy.
 */
- (UIView *)scannerController:(SBSDKScannerViewController *)controller
			 viewForDetectionStatus:(SBSDKDocumentDetectionStatus)status {
	if(controller.shutterMode == SBSDKShutterModeAlwaysManual && !self.isCapturing) {
		// No label when mode is manual
		return nil;
	}

	UILabel *label = [UILabel new];
	label.textColor = [UIColor whiteColor];
	UIColor *backgroundColor;

	switch (status) {
		case SBSDKDocumentDetectionStatusOK:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusOK];
			backgroundColor = [UIColor colorWithHex:@"#3c763d"];
			break;

		case SBSDKDocumentDetectionStatusOK_SmallSize:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusOK_SmallSize];
			backgroundColor = [UIColor colorWithHex:@"#F4C019"];
			break;

		case SBSDKDocumentDetectionStatusOK_BadAngles:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusOK_BadAngles];
			backgroundColor = [UIColor colorWithHex:@"#F4C019"];
			break;

		case SBSDKDocumentDetectionStatusOK_BadAspectRatio:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusOK_BadAspectRatio];
			backgroundColor = [UIColor colorWithHex:@"#F4C019"];
			break;

		case SBSDKDocumentDetectionStatusError_NothingDetected:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusError_NothingDetected];
			backgroundColor = [UIColor blackColor];
			break;

		case SBSDKDocumentDetectionStatusError_Brightness:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusError_Brightness];
			backgroundColor = [UIColor colorWithHex:@"#a94442"];
			break;

		case SBSDKDocumentDetectionStatusError_Noise:
			label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusError_Noise];
			backgroundColor = [UIColor colorWithHex:@"#a94442"];
			break;

		default:
			break;
	}

	if(self.isCapturing) {
		// Show special "Saving document..." label
		label.text = [self translationLabelForKey:@"detectionStatus" enumValue:SBSDKDocumentDetectionStatusOK_Capturing];
		label.textColor = [UIColor blackColor];
		backgroundColor = [UIColor whiteColor];
	}

	[label sizeToFit];

	label.frame = CGRectInset(label.frame, -10.f, -6.f);
	label.layer.cornerRadius = 10;
	label.layer.masksToBounds = true;
	label.backgroundColor = [backgroundColor colorWithAlphaComponent:0.5];
	label.textAlignment = NSTextAlignmentCenter;

	return label;
}

/**
 * Asks the delegate for shutter release buttons position in its superview. Optional.
 * @param controller The calling SBSDKScannerViewController.
 * @return A CGPoint defining the center position of the shutter button.
 */
- (CGPoint) scannerControllerCenterForShutterButton:(SBSDKScannerViewController *)controller {
	// Same height as doneButton (a bit lower than default)
	return CGPointMake(self.view.center.x, self.doneButton.center.y);
}

/**
 * Implement this method to customize the detected documents polygon drawing. If you implement this method you are
 * responsible for correct configuration of the shape layer and setting the shape layers path property.
 * Implementing this method also disables calling of the delegate
 * method -(UIColor *)scannerController:polygonColorForDetectionStatus:
 * @param controller The calling SBSDKScannerViewController.
 * @param pointValues NSArray of 4 NSValues, containing CGPointValues. Or nil if there was no polygon detected.
 * Extract each point: CGPoint point = [pointValues[index] CGPointValue]. The points are already converted to
 * layer coordinate system and therefore can directly be used for drawing or creating a bezier path.
 * @param detectionStatus The current detection status.
 * @param layer The shape layer that draws the bezier path of the polygon points.
 * You can configure the layers stroke and fill color, the line width and other parameters.
 * See the documentation for CAShapeLayer.
 */
- (void)scannerController:(SBSDKScannerViewController *)controller
				drawPolygonPoints:(NSArray *)pointValues
			withDetectionStatus:(SBSDKDocumentDetectionStatus)detectStatus
									onLayer:(CAShapeLayer *)layer {

	UIColor *baseColor;
	if(self.isCapturing) {
		baseColor = [UIColor clearColor];
	} else if(detectStatus == SBSDKDocumentDetectionStatusOK) {
		baseColor = [UIColor colorWithHex:@"#c1e2b3"];
	} else {
		baseColor = [UIColor colorWithHex:@"#e4b9b9"];
	}

	// Set the stroke color for the polygon path on the layer.
	layer.strokeColor = baseColor.CGColor;
	layer.lineWidth = 2.0f;

	// Set the fill color for the polygon path on the layer.
	layer.fillColor = self.isCapturing ? nil : [baseColor colorWithAlphaComponent:0.5f].CGColor;

	// Create the bezier path from the polygons points.
	UIBezierPath *path = nil;
	for (NSUInteger index = 0; index < pointValues.count; index ++) {
		if (index == 0) {
			path = [UIBezierPath bezierPath];
			[path moveToPoint:[pointValues[index] CGPointValue]];
		} else {
			[path addLineToPoint:[pointValues[index] CGPointValue]];
		}
	}
	[path closePath];

	// Set the layers path. This automatically animates and creates nice and fluid transition between polygons.
	layer.path = path.CGPath;
}

@end
