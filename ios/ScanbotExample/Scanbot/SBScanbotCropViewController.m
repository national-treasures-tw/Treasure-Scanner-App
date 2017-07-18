#import "SBScanbotCropViewController.h"

#import <UIKit/UIKit.h>
#import <React/RCTUtils.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

#import "SBConsts.h"
#import "UIColor+Hex.h"


@interface SBScanbotCropViewController ()

@property (strong, nonatomic) NSDictionary *document;
@property (strong, nonatomic) RCTPromiseResolveBlock resolve;
@property (strong, nonatomic) RCTPromiseRejectBlock reject;

@property (strong, nonatomic) SBSDKCropViewController *cropController;
@property (weak, nonatomic) IBOutlet UIButton *cancelButton;
@property (weak, nonatomic) IBOutlet UIButton *doneButton;

@end

@implementation SBScanbotCropViewController

#pragma mark - Lifecycle methods

- (void)viewDidLoad {
	[super viewDidLoad];

	self.cropController = [[SBSDKCropViewController alloc] initWithParentViewController:self containerView:self.view];
}

#pragma mark - User actions

- (void) crop:(NSDictionary *)document
			resolve:(RCTPromiseResolveBlock)resolver
			 reject:(RCTPromiseRejectBlock)rejecter {

	self.document = document;
	self.resolve = resolver;
	self.reject = rejecter;

	NSString *originalImage = self.document[@"originalImage"];
	NSData *imageData = [[NSData alloc] initWithBase64EncodedString:originalImage options:NSDataBase64DecodingIgnoreUnknownCharacters];

	self.cropController.image = [UIImage imageWithData:imageData];

	if([self.document[@"polygon"] isKindOfClass:[NSArray class]]) {
		self.cropController.polygon = [[SBSDKPolygon alloc] initWithNormalizedDoubleValues:self.document[@"polygon"]];
	}
}

- (IBAction)onDone:(id)sender {
	if(!self.resolve) {
		return;
	}

	NSData *data = UIImageJPEGRepresentation(self.cropController.croppedImage, 0.9);

	NSMutableDictionary *newDocument = self.document.mutableCopy;
	newDocument[@"image"] = [data base64EncodedStringWithOptions: NSDataBase64Encoding64CharacterLineLength];
	newDocument[@"polygon"] = [self.cropController.polygon normalizedDoubleValues];
	[self close:newDocument];
}

- (IBAction)onCancel:(id)sender {
	if (self.resolve != nil) {
		[self close:@{}];
	}
}

- (void) close:(NSDictionary *) document {
	self.resolve(document);

	self.resolve = nil;
	self.reject = nil;

	[self dismissViewControllerAnimated:NO completion:nil];
}

@end
