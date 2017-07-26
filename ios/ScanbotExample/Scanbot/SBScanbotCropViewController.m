#import "SBScanbotCropViewController.h"

#import <UIKit/UIKit.h>
#import <React/RCTUtils.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

#import "SBConsts.h"

#import "UIColor+Hex.h"
#import "UIImage+Rotate.h"

@interface SBScanbotCropViewController ()

@property (strong, nonatomic) NSDictionary *document;
@property (strong, nonatomic) NSDictionary *translations;
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

- (NSString *) translationLabelForKey:(NSString *)key {
	@try {
		return [self.translations valueForKeyPath:key];
	}
	@catch (NSException * e) {
		return key;
	}
}

#pragma mark - User actions

- (void) crop:(NSDictionary *)document
 translations:(NSDictionary *)translations
			resolve:(RCTPromiseResolveBlock)resolver
			 reject:(RCTPromiseRejectBlock)rejecter {

	self.translations = translations;
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

	[self.cancelButton setTitle: [self translationLabelForKey:@"cancel"]
									 forState:UIControlStateNormal];
	[self.doneButton setTitle: [self translationLabelForKey:@"done"]
									 forState:UIControlStateNormal];
}

- (IBAction)onDone:(id)sender {
	// apply rotation
	NSNumber *rotation = self.document[@"rotation"];

	UIImage *newImage = [self.cropController.croppedImage imageRotatedByDegrees:rotation.floatValue];

	NSData *data = UIImageJPEGRepresentation(newImage, 0.9);

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
