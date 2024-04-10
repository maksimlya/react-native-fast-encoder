#import "FastEncoderModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#include "libencoder_bridge.h"

@implementation FastEncoderModule

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
    if (!cxxBridge.runtime) {
        NSNumber * val = [NSNumber numberWithBool:NO];
        return val;
    }
    jsi::Runtime * runtime = (jsi::Runtime *)cxxBridge.runtime;

    fastEncoder::install(runtime);
    NSNumber * val = [NSNumber numberWithBool:TRUE];
    return val;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)setBridge:(RCTBridge *)bridge
{
    _bridge = bridge;
    _setBridgeOnMainQueue = RCTIsMainQueue();
}

- (void)invalidate {
    fastEncoder::cleanup();
}

@end
