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
