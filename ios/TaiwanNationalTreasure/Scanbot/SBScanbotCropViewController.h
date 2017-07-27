#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <ScanbotSDK/ScanbotSDK.h>

#define RCT_ACCOUNTKIT_FAILED @"RCT_ACCOUNTKIT_FAILED"
#define RCT_ACCOUNTKIT_USER_CANCELED @"RCT_ACCOUNTKIT_USER_CANCELED"

@interface SBScanbotCropViewController : UIViewController

- (void) crop:(NSDictionary *)document
 translations:(NSDictionary *)translations
			resolve:(RCTPromiseResolveBlock)resolver
			 reject:(RCTPromiseRejectBlock)rejecter;

@end

