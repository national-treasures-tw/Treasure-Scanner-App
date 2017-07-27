//
//  UIColor+Hex.m
//  TaiwanNationalTreasure
//
//  Created by Tieme van Veen on 18/07/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "UIColor+Hex.h"

@implementation UIColor(Hex)

+ (UIColor *)colorWithHex:(NSString *)hexString {
	unsigned rgbValue = 0;
	NSScanner *scanner = [NSScanner scannerWithString:hexString];
	[scanner setScanLocation:1]; // bypass '#' character
	[scanner scanHexInt:&rgbValue];

	return [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
}

@end
