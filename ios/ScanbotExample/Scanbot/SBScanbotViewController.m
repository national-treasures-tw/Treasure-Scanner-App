#import "SBScanbotViewController.h"

#import <React/RCTUtils.h>
#import <React/RCTLog.h>

@implementation SBScanbotViewController
{
    NSDictionary *_options;
    RCTPromiseResolveBlock _resolver;
    RCTPromiseRejectBlock _rejecter;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    // Create the SBSDKScannerViewController.
    // We want it to be embedded into self.
    // As we do not want automatic image storage we pass nil here for the image storage.
    self.scannerViewController
    = [[SBSDKScannerViewController alloc] initWithParentViewController:self imageStorage:nil];
    
    // Set the delegate to self.
    self.scannerViewController.delegate = self;
    // We want unscaled images in full 5 or 8 MPixel size.
    self.scannerViewController.imageScale = 1.0f;
}


- (void)once: (RCTPromiseResolveBlock)resolve
    rejecter: (RCTPromiseRejectBlock)reject;
{
    _resolver = resolve;
    _rejecter = reject;
    
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

- (NSUInteger)supportedInterfaceOrientations {
    // Only portrait.
    return UIInterfaceOrientationMaskPortrait;
}

- (UIStatusBarStyle)preferredStatusBarStyle {
    // White statusbar.
    return UIStatusBarStyleLightContent;
}

#pragma mark - SBSDKScannerViewControllerDelegate
- (BOOL)scannerControllerShouldAnalyseVideoFrame:(SBSDKScannerViewController *)controller {
    // We want to only process video frames when self is visible on screen and front most view controller
    return self.viewAppeared && self.presentedViewController == nil;
}

- (void)scannerController:(SBSDKScannerViewController *)controller didCaptureDocumentImage:(UIImage *)image {
    if (_resolver != nil) {//
        NSData *data = UIImageJPEGRepresentation(image, 0.9);
				NSString *img = [data base64EncodedStringWithOptions: NSDataBase64Encoding64CharacterLineLength];
        _resolver(img);
        _resolver = nil;
        
        [self dismissViewControllerAnimated:NO completion:nil];
    }
}

- (void)scannerController:(SBSDKScannerViewController *)controller didCaptureImage:(CMSampleBufferRef)sampleBuffer {
    // Here we get the full image from the camera. We could run another manual detection here or use the latest
    // detected polygon from the video stream to process the image with.
}

- (void)scannerController:(SBSDKScannerViewController *)controller
         didDetectPolygon:(SBSDKPolygon *)polygon
               withStatus:(SBSDKDocumentDetectionStatus)status {
    // Everytime the document detector finishes detection it calls this delegate method.
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
