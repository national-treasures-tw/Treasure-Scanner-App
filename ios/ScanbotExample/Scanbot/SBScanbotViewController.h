#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <ScanbotSDK/ScanbotSDK.h>

#define RCT_ACCOUNTKIT_FAILED @"RCT_ACCOUNTKIT_FAILED"
#define RCT_ACCOUNTKIT_USER_CANCELED @"RCT_ACCOUNTKIT_USER_CANCELED"

@interface SBScanbotViewController : UIViewController<SBSDKScannerViewControllerDelegate>

@property (strong, nonatomic) SBSDKScannerViewController *scannerViewController;
@property (assign, nonatomic) BOOL viewAppeared;

- (IBAction) once: (RCTPromiseResolveBlock)resolve
         rejecter: (RCTPromiseRejectBlock)reject;

@end

