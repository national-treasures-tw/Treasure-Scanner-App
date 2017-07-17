//
//  SBHud.h
//  ScanbotExample
//
//  Created by Tieme van Veen on 17/07/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface SBHud : UIView
@property (weak, nonatomic) IBOutlet UILabel *documentCountLabel;

@property (weak, nonatomic) IBOutlet UIButton *cancelButton;
- (IBAction)onCancel:(UIButton *)sender;

@end
