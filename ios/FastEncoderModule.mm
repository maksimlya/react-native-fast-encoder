#import "FastEncoderModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#include "libencoder_bridge.h"
#import <ReactCommon/RCTTurboModule.h>
#import <jsi/jsi.h>

@implementation FastEncoderModule

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)_bridge;
    if (cxxBridge == nil) {
        return @false;
    }
    
    auto jsiRuntime = (facebook::jsi::Runtime *)cxxBridge.runtime;
    if (jsiRuntime == nil) {
        return @false;
    }
    
    auto &runtime = *jsiRuntime;
    auto callInvoker = _bridge.jsCallInvoker;
    fastEncoder::install(runtime, callInvoker);
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
