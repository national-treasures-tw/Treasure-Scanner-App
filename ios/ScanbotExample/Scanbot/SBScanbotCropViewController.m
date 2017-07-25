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
	if (![[NSFileManager defaultManager] fileExistsAtPath:originalImage]) {
		[self onError:@"File does not exist" message:[NSString stringWithFormat:@"At location %@", originalImage]];
		return;
	}

	NSData *imageData = [NSData dataWithContentsOfFile:originalImage];
	self.cropController.image = [UIImage imageWithData:imageData];

	if (!self.cropController.image) {
		[self onError:@"Something went wrong loading the image" message:[NSString stringWithFormat:@"At location %@", originalImage]];
		return;
	}

	if([self.document[@"polygon"] isKindOfClass:[NSArray class]]) {
		self.cropController.polygon = [[SBSDKPolygon alloc] initWithNormalizedDoubleValues:self.document[@"polygon"]];
	}
}

- (IBAction)onDone:(id)sender {
	NSData *data = UIImageJPEGRepresentation(self.cropController.croppedImage, 0.9);

	NSURL *path = [NSURL fileURLWithPath:self.document[@"image"]];
	path = [path URLByDeletingLastPathComponent];
	path = [path URLByAppendingPathComponent:[[NSUUID UUID] UUIDString]];
	path = [path URLByAppendingPathExtension:@"jpg"];

	NSError *error;
	[data writeToFile:[path relativePath] options:NSDataWritingAtomic error:&error];
	if (error) {
		[self onError:@"Cropping failed, could not write image" message:[NSString stringWithFormat:@"At location %@", path]];
		return;
	}

	// Delete old file
	[[NSFileManager defaultManager] removeItemAtPath:self.document[@"image"] error:&error];

	NSMutableDictionary *newDocument = self.document.mutableCopy;
	newDocument[@"image"] = [path relativePath];
	newDocument[@"polygon"] = [self.cropController.polygon normalizedDoubleValues];
	[self close:newDocument];
}

- (IBAction)onCancel:(id)sender {
	[self close:self.document];
}

- (void) close:(NSDictionary *) document {
	if(self.resolve) {
		self.resolve(document);
	}

	self.resolve = nil;
	self.reject = nil;

	[self dismissViewControllerAnimated:YES completion:nil];
}

- (void) onError:(NSString *)code message:(NSString *)message {
	if(self.reject) {
		self.reject(code, message, nil);
	}

	self.resolve = nil;
	self.reject = nil;

	[self dismissViewControllerAnimated:YES completion:nil];
}

@end
