#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <ScanbotSDK/ScanbotSDK.h>

#define RCT_ACCOUNTKIT_FAILED @"RCT_ACCOUNTKIT_FAILED"
#define RCT_ACCOUNTKIT_USER_CANCELED @"RCT_ACCOUNTKIT_USER_CANCELED"

@interface SBScanbotViewController : UIViewController<SBSDKScannerViewControllerDelegate>

@property (strong, nonatomic) SBSDKScannerViewController *scannerViewController;
@property (strong, nonatomic) SBSDKImageStorage *imageStorage;
@property (assign, nonatomic) BOOL viewAppeared;

- (void) scan:(NSDictionary *)options
			resolve:(RCTPromiseResolveBlock)resolve
			 reject:(RCTPromiseRejectBlock)reject;

@end

