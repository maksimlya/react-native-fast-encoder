#include "react-native-fast-encoder.h"
#include <android/log.h>
#include <libencoder_bridge.h>
#include <ReactCommon/CallInvokerHolder.h>
#include <fbjni/fbjni.h>
#include <jni.h>
#include <jsi/jsi.h>
#include <typeinfo>


namespace jsi = facebook::jsi;
namespace react = facebook::react;
namespace jni = facebook::jni;



struct FastEncoderBridge : jni::JavaClass<FastEncoderBridge> {
  static constexpr auto kJavaDescriptor = "Lcom/fastencoder/FastEncoderBridge;";

  static void registerNatives() {
    javaClassStatic()->registerNatives(
        {makeNativeMethod("installNativeJsi", FastEncoderBridge::installNativeJsi),
         makeNativeMethod("clearStateNativeJsi",
                          FastEncoderBridge::clearStateNativeJsi)});
  }
private:
  static void installNativeJsi(
      jni::alias_ref<jni::JObject> thiz,
      jlong jsiRuntimePtr,
      jni::alias_ref<react::CallInvokerHolder::javaobject> jsCallInvokerHolder) {
    auto jsiRuntime = reinterpret_cast<jsi::Runtime *>(jsiRuntimePtr);
    auto jsCallInvoker = jsCallInvokerHolder->cthis()->getCallInvoker();
    fastEncoder::install(*jsiRuntime, jsCallInvoker);
  }

  static void clearStateNativeJsi(jni::alias_ref<jni::JObject> thiz) {
      fastEncoder::cleanup();
  }
};

JNIEXPORT jint JNI_OnLoad(JavaVM *vm, void *) {
  return jni::initialize(vm, [] { FastEncoderBridge::registerNatives(); });
}