#ifdef __cplusplus
#import "test-lib.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTestLibSpec.h"

@interface TestLib : NSObject <NativeTestLibSpec>
#else
#import <React/RCTBridgeModule.h>

@interface TestLib : NSObject <RCTBridgeModule>
#endif

@end
