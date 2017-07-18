#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <ScanbotSDK/ScanbotSDK.h>

#define RCT_ACCOUNTKIT_FAILED @"RCT_ACCOUNTKIT_FAILED"
#define RCT_ACCOUNTKIT_USER_CANCELED @"RCT_ACCOUNTKIT_USER_CANCELED"

@interface SBScanbotViewController : UIViewController<SBSDKScannerViewControllerDelegate>

- (void) scan:(NSDictionary *)options
			resolve:(RCTPromiseResolveBlock)resolver
			 reject:(RCTPromiseRejectBlock)rejecter;

@end

