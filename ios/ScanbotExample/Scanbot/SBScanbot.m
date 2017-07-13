#import "SBScanbot.h"

#import "SBScanbotViewController.h"

@implementation SBScanbot

- (dispatch_queue_t)methodQueue
{
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

- (NSDictionary *)constantsToExport
{
    return @{};
}

RCT_EXPORT_METHOD(setLicense:(NSString *)license)
{
		[ScanbotSDK setLicense: license];
}

RCT_EXPORT_METHOD(scan:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    SBScanbotViewController* view = [[SBScanbotViewController alloc] init];
    [view once:resolve rejecter:reject];
}


@end
