//
//  UIImage+Rotate.m
//  TaiwanNationalTreasure
//
//  Created by Tieme van Veen on 26/07/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "UIImage+Rotate.h"

@implementation UIImage (Rotate)

static CGFloat DegreesToRadians(CGFloat degrees) {return degrees * M_PI / 180;}

- (CGSize)rotatedImageSize:(CGFloat)degrees
{
	CGAffineTransform t = CGAffineTransformMakeRotation(DegreesToRadians(degrees));
	CGRect originalImageRect = CGRectMake(0, 0, self.size.width, self.size.height);
	CGRect rotatedImageRect = CGRectApplyAffineTransform(originalImageRect, t);
	CGSize rotatedSize = rotatedImageRect.size;

	return rotatedSize;
}

- (UIImage*)imageRotatedByDegrees:(CGFloat)degrees
{
	// calculate the size of the rotated view's containing box for our drawing space
	CGSize rotatedSize = [self rotatedImageSize:degrees];

	// Create the bitmap context
	UIGraphicsBeginImageContext(rotatedSize);
	CGContextRef bitmap = UIGraphicsGetCurrentContext();

	// Move the origin to the middle of the image so we will rotate and scale around the center.
	CGContextTranslateCTM(bitmap, rotatedSize.width/2, rotatedSize.height/2);

	//   // Rotate the image context
	CGContextRotateCTM(bitmap, DegreesToRadians(degrees));

	// Now, draw the rotated/scaled image into the context
	CGContextScaleCTM(bitmap, 1.0, -1.0);
	CGContextDrawImage(bitmap, CGRectMake(-self.size.width / 2, -self.size.height / 2, self.size.width, self.size.height), [self CGImage]);

	UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
	UIGraphicsEndImageContext();
	return newImage;
}

@end;
