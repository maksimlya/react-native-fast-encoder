#include <jni.h>
#include "react-native-fast-encoder.h"
#include <android/log.h>
#include <libencoder_bridge.h>

extern "C"
JNIEXPORT void JNICALL
Java_com_fastencoder_FastEncoderModule_initialize(JNIEnv *env, jobject thiz,
                                                             jlong jsi_ptr) {
    __android_log_print(ANDROID_LOG_VERBOSE, "react-native-fast-encoder",
                        "Initializing");
    fastEncoder::install(*reinterpret_cast<facebook::jsi::Runtime *>(jsi_ptr));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_fastencoder_FastEncoderModule_destruct(JNIEnv *env, jobject thiz) {
    fastEncoder::cleanup();
}

extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_fastencoder_FastEncoderModule_callJSI(JNIEnv *env, jobject thiz, jlong jsi_ptr,
                                                          jstring name, jstring payload) {
    auto &runtime = *reinterpret_cast<jsi::Runtime *>(jsi_ptr);
    auto nameConstChar = env->GetStringUTFChars(name, nullptr);
    auto payloadConstChar = env->GetStringUTFChars(payload, nullptr);

    auto payloadValue = jsi::String::createFromAscii(runtime, payloadConstChar);
    env->ReleaseStringUTFChars(payload, payloadConstChar);

    auto nameValue = jsi::String::createFromAscii(runtime, nameConstChar);
    env->ReleaseStringUTFChars(name, nameConstChar);

    auto response = fastEncoder::call(runtime, nameValue, payloadValue);
    auto result = env->NewByteArray(0);
    return result;
}
