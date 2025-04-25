#import "FastEncoderModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#include "libencoder_bridge.h"
#import <jsi/jsi.h>

@implementation FastEncoderModule
#import <React/RCTUtils.h>

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;
RCT_EXPORT_MODULE()
#ifdef NEW_ARCH_ENABLED
static facebook::jsi::Value install(facebook::jsi::Runtime& runtime,
                                  facebook::react::TurboModule& turboModule,
                                  const facebook::jsi::Value* args,
                                  size_t count)
{
    try {
        fastEncoder::install(runtime);
        return jsi::Value(true);
    } catch (const std::exception& e) {
        return jsi::Value(false);
    }
}
#else
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
    if (!cxxBridge.runtime) {
        NSNumber * val = [NSNumber numberWithBool:NO];
        return val;
    }
    jsi::Runtime * runtime = (jsi::Runtime *)cxxBridge.runtime;

    fastEncoder::install(*runtime);
    NSNumber * val = [NSNumber numberWithBool:TRUE];
    return val;
}
#endif
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


- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeFastEncoderModuleSpecJSI>(params);
}

@end
